#include <stdio.h>
#include <stdbool.h>
#include <regex.h>
#include <err.h>
#include <yajl/yajl_tree.h>
#include "validator.h"
#include "gen.h"


/* A helper enum to chose which items we are generating macros for
   in function GEN_ACCESS_MACROS.  */
enum macro_type
{
  m_sons,
  m_attribs,
  m_flags
};


/* Traverse through ITEMS and generate macros depending on the TYPE
   for the case when the node access is being checked and for the case
   when it isn't.  This is decided by a preprocessor flag 
   CHECK_NODE_ACCESS.  */
static inline bool
gen_access_macros (FILE *  f, yajl_val items, const char *  node_name_upper,
                   const char *  node_name_lower, enum macro_type type)
{
  const char *  format_string_check;
  const char *  format_string_nocheck;

  switch (type)
    {
    case m_sons:
      format_string_check = "#  define %s_%s(__n) (NBMacroMatchesType (__n, N_%s)->sons.N_%s->%s)\n";
      break;
    case m_attribs:
      format_string_check = "#  define %s_%s(__n) (NBMacroMatchesType (__n, N_%s)->attribs.N_%s->%s)\n";
      break;
    case m_flags:
      format_string_check = "#  define %s_%s(__n) (NBMacroMatchesType (__n, N_%s)->attribs.N_%s->flags.%s)\n";
      break;
    default:
      assert (0);
    }

  switch (type)
    {
    case m_sons:
      format_string_nocheck = "#  define %s_%s(__n) ((__n)->sons.N_%s->%s)\n";
      break;
    case m_attribs:
      format_string_nocheck = "#  define %s_%s(__n) ((__n)->attribs.N_%s->%s)\n";
      break;
    case m_flags:
      format_string_nocheck = "#  define %s_%s(__n) ((__n)->attribs.N_%s->flags.%s)\n";
      break;
    default:
      assert (0);
    }


  fprintf (f, "#ifdef CHECK_NODE_ACCESS\n");
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (items); i++)
    {
      const char *  item_name = YAJL_OBJECT_KEYS (items)[i];
      char *  item_name_upper = string_toupper (item_name);
      fprintf (f, format_string_check,
               node_name_upper, item_name_upper, node_name_lower,
               node_name_lower, item_name);
      free (item_name_upper);
    }
  fprintf (f, "#else\n");
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (items); i++)
    {
      const char *  item_name = YAJL_OBJECT_KEYS (items)[i];
      char *  item_name_upper = string_toupper (item_name);
      fprintf (f, format_string_nocheck,
               node_name_upper, item_name_upper,
               node_name_lower, item_name);
      free (item_name_upper);
    }
  fprintf (f, "#endif\n\n");
  return true;
}


/* Generate a function header for TBmake<Node-name> function.  This will
   be used in the header file generation and in the C file generation.
   The mode is specified with DECLARATION_AND_MACRO_P parameter, which
   in case it is TRUE, the function declaration and the corresponding
   macro will be genreated.  The function header will be generated 
   otherwise.   */
static inline bool
gen_make_function_header (FILE *  f, const char *  node_name_lower,
                          yajl_val attributes, yajl_val sons,
                          bool declaration_and_macro_p)
{
  /* Keep a constant array of function arguments.
     It cannot be longer than sons and arguments put together, so
     we allocate it on the stack and keep the actual length using
     PARAM_LENGTH variable.  */
  struct {
    const char *  arg_name;
    const char *  arg_type;
  } params[(attributes ? YAJL_OBJECT_LENGTH (attributes) : 0)
           + (sons ? YAJL_OBJECT_LENGTH (sons) : 0)];

  size_t param_length = 0;

  for (size_t i = 0; attributes && i < YAJL_OBJECT_LENGTH (attributes); i++)
    {
      const char *  attr_name = YAJL_OBJECT_KEYS (attributes)[i];
      const yajl_val attr = YAJL_OBJECT_VALUES (attributes)[i];
      const yajl_val incons = yajl_tree_get (attr, (const char *[]){"inconstructor", 0}, yajl_t_any);
      const yajl_val type = yajl_tree_get (attr, (const char *[]){"type", 0}, yajl_t_string);

      if (incons && YAJL_IS_TRUE (incons))
        {
          struct attrtype_name *  atn;
          const char *  type_name = YAJL_GET_STRING (type);
          HASH_FIND_STR (attrtype_names, type_name, atn);
          assert (atn);

          params[param_length].arg_name = attr_name;
          params[param_length].arg_type = atn->ctype;
          param_length++;
        }
    }

  for (size_t i = 0; sons && i < YAJL_OBJECT_LENGTH (sons); i++)
    {
      const char *  son_name = YAJL_OBJECT_KEYS (sons)[i];
      const yajl_val son = YAJL_OBJECT_VALUES (sons)[i];
      const yajl_val def = yajl_tree_get (son, (const char *[]){"default", 0}, yajl_t_string);

      if (!def)
        {
          params[param_length].arg_name = son_name;
          params[param_length].arg_type = "node *";
          param_length++;
        }
    }

  /* Generate function declaration with At.  */
  fprintf (f, "node *%sTBmake%c%sAt (",
           declaration_and_macro_p ? "  " : "\n",
           toupper (node_name_lower[0]), &node_name_lower[1]);
  for (size_t i = 0; i < param_length; i++)
    fprintf (f, "%s %s%s", params[i].arg_type, params[i].arg_name, i < param_length - 1 ? ", " : "");

  /* FIXME those should become const-qualified.  */
  fprintf (f, "%schar *  file, size_t line)%s",
           param_length > 0 ? ", " : "",
           declaration_and_macro_p ? ";\n" : "\n");

  if (!declaration_and_macro_p)
    return true;

  /* Generate a macro that puts __FILE__ and __LINE__ as last two parameters.  */
  fprintf (f, "#define TBmake%c%s(", toupper (node_name_lower[0]), &node_name_lower[1]);
  for (size_t i = 0; i < param_length; i++)
    fprintf (f, "__%s%s", params[i].arg_name, i < param_length - 1 ? ", " : "");

  fprintf (f, ")  TBmake%c%sAt (", toupper (node_name_lower[0]), &node_name_lower[1]);
  for (size_t i = 0; i < param_length; i++)
    fprintf (f, "__%s%s", params[i].arg_name, i < param_length - 1 ? ", " : "");

  fprintf (f, "%s__FILE__, __LINE__)\n\n", param_length > 0 ? ", " : "");
  return true;
}



/* Generate accessor macros for every node and the TBmake<Node-name> function
   prototype.  */
bool 
gen_node_basic_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, "__NODE_BASIC_H__",
                "   Functions to allocate node structures and macros\n"
                "   to access node memebers");

  fprintf (f, "#include <signal.h>\n"
              "#include <unistd.h>\n"
              "\n"
              "#ifndef _SAC_TREE_BASIC_H_\n"
              "#  error node_basic.h should only be included as part of tree_basic.h!\n"
              "#endif\n"
              "\n"
              "/* This function is inlined at each macro call to check whether the nodetype\n"
              "   matches. To allow us to print elaborate error messages instead of a segfault,\n"
              "   we make use of the nodeenum to nodename mapping. As this is a header file, and\n"
              "   as header files are only allowed to reference types.h, we add an explicit\n"
              "   declaration of the globals data type. For the same reason, we cannot use\n"
              "   DBUG_ASSERT directly, but need to mimic it.  */\n"
              "\n"
              "extern global_t global;\n"
              "\n"

              /* FIXME This can be simplified significantly.  Fix it!.  */
              "static inline\n"
              "node *NBMacroMatchesType (node *node, nodetype type)\n"
              "{\n"
              "#ifndef DBUG_OFF\n"
              "  if (node != NULL && node->mnodetype != type)\n"
              "    {\n"
              "      const char *ndtp_name = (node->mnodetype <= MAX_NODES\n"
              "                               ? global.mdb_nodetype[node->mnodetype]\n"
              "                               : \"!invalid!\");\n"
              "      printf (\"TRAVERSE ERROR: node of type %%d:%%s found where \"\n"
              "              \"%%d:%%s was expected!\\n\\n\",\n"
              "              node->mnodetype, ndtp_name,\n"
              "              type, global.mdb_nodetype[type]);\n"
              "      fflush (stdout);\n"
              "      kill (getpid (), SIGSEGV); /* segfault  */\n"
              "    }\n"
              "#endif\n"
              "\n"
              "  return node;\n"
              "}\n\n");



  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      char *  node_name_upper = string_toupper (YAJL_OBJECT_KEYS (nodes)[i]);
      char *  node_name_lower = string_tolower (YAJL_OBJECT_KEYS (nodes)[i]);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val attribs = yajl_tree_get (node, (const char *[]){"attributes", 0}, yajl_t_object);
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);
      const yajl_val flags = yajl_tree_get (node, (const char *[]){"flags", 0}, yajl_t_object);

      fprintf (f, "/* Macros and functions for `%s'.  */\n\n", YAJL_OBJECT_KEYS (nodes)[i]);

      if (sons && YAJL_OBJECT_LENGTH (sons) != 0)
        gen_access_macros (f, sons, node_name_upper, node_name_lower, m_sons);

      if (attribs && YAJL_OBJECT_LENGTH (attribs) != 0)
        gen_access_macros (f, attribs, node_name_upper, node_name_lower, m_attribs);

      if (flags && YAJL_OBJECT_LENGTH (flags) != 0)
        {
          /* FIXME do we want to check access to this structure?  */
          fprintf (f, "#define %s_FLAGSTRUCTURE(__n) ((__n)->attribs.N_%s->flags)\n\n",
                   node_name_upper, node_name_lower);
          gen_access_macros (f, flags, node_name_upper, node_name_lower, m_flags);
        }

      gen_make_function_header (f, node_name_lower, attribs, sons, true);

      free (node_name_upper);
      free (node_name_lower);
    }

  GEN_FOOTER_H (f, "__NODE_BASIC_H__");
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


/* Helper function to generate a predicate in the condition that checks if
   a value assigned to the given son is valid.  */
static inline bool
gen_node_son_check (FILE *  f, yajl_val nodesets, const char *  node_name_upper,
                    const char *  son_name_upper, const char *  x)
{
  const char *  nchk_pattern = "\n      && NODE_TYPE (%s_%s (xthis)) != N_%s";
  struct node_name *  nn;

  if (!strcmp (x, "any"))
    json_err ("the son `%s' of the node `%s' has target that contains \"any\"",
              son_name_upper, node_name_upper);

  HASH_FIND_STR (node_names, x, nn);
  if (NULL == nn)
    json_warn ("the target %s of the son %s of node %s is not found",
              x, son_name_upper, node_name_upper);

  if (!nn || nn->name_type == nnt_node)
    {
      char *  n_lower = string_tolower (x);
      fprintf (f, nchk_pattern, node_name_upper, son_name_upper, n_lower);
      free (n_lower);
    }
  else
    {
      assert (nn->name_type == nnt_nodeset);
      const yajl_val ns = yajl_tree_get (nodesets, (const char *[]){x, 0}, yajl_t_array);

      for (size_t i = 0; i < YAJL_ARRAY_LENGTH (ns); i++)
        {
          const char *  n = YAJL_GET_STRING (YAJL_ARRAY_VALUES (ns)[i]);
          char *  n_lower = string_tolower (n);
          fprintf (f, nchk_pattern, node_name_upper, son_name_upper, n_lower);
          free (n_lower);
        }
    }

  return true;
}



/* Helper function, depending on the format of target attribute generate predicates
   for every allowed node.  */
static inline bool
gen_node_son_check_from_target (FILE *  f, const yajl_val nodesets, const yajl_val targets,
                                const char *  node_name_upper, const char *  son_name_upper)
{
  assert (YAJL_IS_OBJECT (targets));

  const yajl_val contains = yajl_tree_get (targets, (const char *[]){"contains", 0}, yajl_t_any);

  if (YAJL_IS_STRING (contains))
    gen_node_son_check (f, nodesets, node_name_upper, son_name_upper, YAJL_GET_STRING (contains));
  else if (YAJL_IS_ARRAY (contains))
    for (size_t i = 0; i < YAJL_ARRAY_LENGTH (contains); i++)
      {
        assert (YAJL_IS_STRING (YAJL_ARRAY_VALUES (contains)[i]));
        gen_node_son_check (f, nodesets, node_name_upper, son_name_upper,
                            YAJL_GET_STRING (YAJL_ARRAY_VALUES (contains)[i]));
      }

  return true;
}



/* Helprt function to generate checks for the list of targets.  */
static inline bool
gen_node_son_check_from_targets (FILE *  f, const yajl_val nodesets, const yajl_val targets,
                                 const char *  node_name_upper, const char *  son_name_upper)
{
  assert (YAJL_IS_ARRAY (targets));

  for (size_t i = 0; i < YAJL_ARRAY_LENGTH (targets); i++)
    {
      const yajl_val target = YAJL_ARRAY_VALUES (targets)[i];
      gen_node_son_check_from_target (f, nodesets, target, node_name_upper, son_name_upper);
    }

  return true;
}




/* Generate TBmake<Node-name> function for all nodes.  */
bool
gen_node_basic_c (yajl_val nodes, yajl_val nodesets, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "   Functions to allocate node structures");


  fprintf (f, "#include \"node_alloc.h\"\n"
              "#include \"tree_basic.h\"\n"
              "#define DBUG_PREFIX \"NDBASIC\"\n"
              "#include \"debug.h\"\n"
              "#include \"check_mem.h\"\n"
              "#include \"str.h\"\n"
              "#include \"globals.h\"\n"
              "#include \"memory.h\"\n"
              "#include \"ctinfo.h\"\n\n");


  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      char *  node_name_lower = string_tolower (YAJL_OBJECT_KEYS (nodes)[i]);
      char *  node_name_upper = string_toupper (YAJL_OBJECT_KEYS (nodes)[i]);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val attribs = yajl_tree_get (node, (const char *[]){"attributes", 0}, yajl_t_object);
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);
      const yajl_val flags = yajl_tree_get (node, (const char *[]){"flags", 0}, yajl_t_object);

      gen_make_function_header (f, node_name_lower, attribs, sons, false);
      fprintf (f, "{\n"
                  "  struct NODE_ALLOC_N_%s *  nodealloc;\n"
                  "  node *  xthis;\n"
                  "\n"
                  "  DBUG_ENTER ();\n"
                  "  DBUG_PRINT (\"allocating N_%s node\");\n"
                  "  nodealloc = (struct NODE_ALLOC_N_%s *) MEMmallocAt (sizeof *nodealloc, file, line);\n"
                  "  xthis = (node *) &(nodealloc->nodestructure);\n"
                  "  DBUG_PRINT (\"address: \" F_PTR, xthis);\n\n",
               node_name_upper, node_name_lower, node_name_upper);


      fprintf (f, "#ifndef DBUG_OFF\n"
                  "  CHKMisNode (xthis, N_%s);\n"
                  "#endif\n\n",
               node_name_lower);

      fprintf (f, "  DBUG_PRINT (\"setting node type, filename `%%s', line: %%zu, col: %%zu\",\n"
                  "              global.filename, global.linenum, global.colnum);\n"
                  "  NODE_TYPE (xthis) = N_%s;\n"
                  "  NODE_FILE (xthis) = global.filename;\n"
                  "  NODE_LINE (xthis) = global.linenum;\n"
                  "  NODE_COL (xthis) = global.colnum;\n"
                  "  NODE_ERROR (xthis) = NULL;\n\n",
               node_name_lower);

      for (size_t i = 0; sons && i < YAJL_OBJECT_LENGTH (sons); i++)
        {
          const char *  son_name = YAJL_OBJECT_KEYS (sons)[i];
          char *  son_name_upper = string_toupper (son_name);
          const yajl_val son = YAJL_OBJECT_VALUES (sons)[i];
          const yajl_val def = yajl_tree_get (son, (const char *[]){"default", 0}, yajl_t_string);
          const char *  value;

          if (i == 0)
            fprintf (f, "  /* Setting sons.  */\n"
                        "  xthis->sons.N_%s = (struct SONS_N_%s *) &(nodealloc->sonstructure);\n",
                     node_name_lower, node_name_upper);

          if (def)
            value = YAJL_GET_STRING (def);
          else
            value = son_name;

          fprintf (f, "  DBUG_PRINT (\"assigning inital value "
                                   "`\" F_PTR \"' to the son `%%s'\", %s, \"%s\");\n"
                      "  %s_%s (xthis) = %s;\n\n",
                   value, son_name, node_name_upper, son_name_upper, value);

          /* If the current son is an avis, add the backref.  */
          if (!strcmp (son_name, "Avis"))
            fprintf (f, "  if (%s_AVIS (xthis) != NULL)\n"
                        "    AVIS_DECL (%s_AVIS (xthis)) = xthis;\n\n",
                     node_name_upper, node_name_upper);

          free (son_name_upper);
        }

      if ((attribs && YAJL_OBJECT_LENGTH (attribs) != 0)
          || (flags && YAJL_OBJECT_LENGTH (flags) != 0))
        fprintf (f, "  xthis->attribs.N_%s = (struct ATTRIBS_N_%s *) &(nodealloc->attributestructure);\n\n",
                 node_name_lower, node_name_upper);

      for (size_t i = 0; attribs && i < YAJL_OBJECT_LENGTH (attribs); i++)
        {
          const char *  attrib_name = YAJL_OBJECT_KEYS (attribs)[i];
          char *  attrib_name_upper = string_toupper (attrib_name);
          const yajl_val attrib = YAJL_OBJECT_VALUES (attribs)[i];
          const yajl_val def = yajl_tree_get (attrib, (const char *[]){"default", 0}, yajl_t_string);
          const yajl_val incons = yajl_tree_get (attrib, (const char *[]){"inconstructor", 0}, yajl_t_any);
          const yajl_val type = yajl_tree_get (attrib, (const char *[]){"type", 0}, yajl_t_string);
          const char *  value;

          if (i == 0)
            fprintf (f, "  /* Setting attributes.  */\n");

          if (def)
            value = YAJL_GET_STRING (def);
          else if (incons && YAJL_IS_TRUE (incons))
            value = attrib_name;
          else
            {
              char *  type_name = YAJL_GET_STRING (type);
              struct attrtype_name *  atn;
              HASH_FIND_STR (attrtype_names, type_name, atn);
              assert (atn);
              value = atn->init;
            }

          fprintf (f, "  %s_%s (xthis) = %s;\n",
                   node_name_upper, attrib_name_upper, value);

          free (attrib_name_upper);
        }


      for (size_t i = 0; flags && i < YAJL_OBJECT_LENGTH (flags); i++)
        {
          const char *  flag_name = YAJL_OBJECT_KEYS (flags)[i];
          char *  flag_name_upper = string_toupper (flag_name);
          const yajl_val flag = YAJL_OBJECT_VALUES (flags)[i];
          const yajl_val def = yajl_tree_get (flag, (const char *[]){"default", 0}, yajl_t_string);
          const char *  value = "FALSE";

          if (i == 0)
            fprintf (f, "\n"
                        "  /* Setting flags.  */\n");

          /* FIXME make `default' of type boolean.  */
          if (def)
            value = YAJL_GET_STRING (def);

          fprintf (f, "  %s_%s (xthis) = %s;\n",
                   node_name_upper, flag_name_upper, value);

          free (flag_name_upper);
        }


      /* If DBUG enabled, check for valid arguments.  */
      fprintf (f, "\n"
                  "#ifndef DBUG_OFF\n"
                  "  DBUG_PRINT (\"doing son target checks\");\n\n");

      /* For sons without default value defined.  */
      for (size_t i = 0; i < YAJL_OBJECT_LENGTH (sons); i++)
        {
          const char *  son_name = YAJL_OBJECT_KEYS (sons)[i];
          const yajl_val son = YAJL_OBJECT_VALUES (sons)[i];
          const yajl_val targets = yajl_tree_get (son, (const char *[]){"targets", 0}, yajl_t_any);
          const yajl_val def = yajl_tree_get (son, (const char *[]){"default", 0}, yajl_t_string);

          if (def)
            continue;

          char *  son_name_upper = string_toupper (son_name);
          
          fprintf (f, "  if (%s_%s (xthis) != NULL", node_name_upper, son_name_upper);
          if (YAJL_IS_OBJECT (targets))
            gen_node_son_check_from_target (f, nodesets, targets, node_name_upper, son_name_upper);
          else if (YAJL_IS_ARRAY (targets))
            gen_node_son_check_from_targets (f, nodesets, targets, node_name_upper, son_name_upper);

          fprintf (f, ")\n"
                      "    CTIwarn (\"Field `%s' of node N_%s has non-allowed target node: %%s\",\n"
                      "             NODE_TEXT (%s_%s (xthis)));\n\n",
                   son_name, node_name_lower, node_name_upper, son_name_upper);

          free (son_name_upper);
        }

      fprintf (f, "#endif // DBUG_OFF\n"
                  "\n"
                  "  DBUG_RETURN (xthis);\n"
                  "}\n\n");
      free (node_name_lower);
      free (node_name_upper);
    }


  GEN_FLUSH_AND_CLOSE (f);
  return true;
}
