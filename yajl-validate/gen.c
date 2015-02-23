#include <stdio.h>
#include <stdbool.h>
#include <regex.h>
#include <err.h>
#include <yajl/yajl_tree.h>

#include "validator.h"
#include "gen.h"


bool
gen_types_trav_h (yajl_val traversals, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, "__TYPES_TRAV_H__",
                "   This file defines the trav_t phase enumeration");

  fprintf (f, "typedef enum\n"
              "{\n"
              "  TR_undefined = 0,\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (traversals); i++)
    {
      char *  name = string_tolower (YAJL_OBJECT_KEYS (traversals)[i]);
      fprintf (f, "  TR_%s,\n", name);
      free (name);
    }

  fprintf (f, "  TR_anonymous\n"
              "} trav_t;\n"
              "\n");

  GEN_FOOTER_H (f, "__TYPES_TRAV_H__");
  GEN_FLUSH_AND_CLOSE (f);

  return true;
}


bool
gen_types_nodetype_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, "__TYPES_NODETYPE_H__",
                "   This file defines the nodetype node enumeration");

  fprintf (f, "typedef enum\n"
              "{\n"
              "  N_undefined = 0,\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      char *  name = string_tolower (YAJL_OBJECT_KEYS (nodes)[i]);
      fprintf (f, "  N_%s,\n", name);
      free (name);
    }

  fprintf (f, "} nodetype;\n\n");

  /* FIXME this is insane that MAX_NODES is pointing to the last index in
           in the tree not to the (last + 1).  Add N__max_nodes and remove
           MAX_NODES usage.  */
  fprintf (f, "#define MAX_NODES %zu\n\n", YAJL_OBJECT_LENGTH (nodes));

  GEN_FOOTER_H (f, "__TYPES_NODETYPE_H__");
  GEN_FLUSH_AND_CLOSE (f);

  return true;
}


bool
gen_traverse_tables_h (yajl_val nodes, yajl_val traversals, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, "__TRAVERSE_TABLES_H__",
                "   This file defines the nodetype node enumeration");

  /* FIXME This is insane that we use counts instead of values from the enum
           list.  A proper fix requires adding TR__max and N__max to both enums
           and use those values.  */
  fprintf (f, "#include \"types.h\"\n"
              "\n"
              "typedef travfun_p travfunarray_t[%zu];\n"
              "typedef travfunarray_t travtables_t[%zu];\n"
              "typedef travfun_p preposttable_t[%zu];\n"
              "\n"
              "extern travtables_t travtables;\n"
              "extern preposttable_t pretable;\n"
              "extern preposttable_t posttable;\n"
              "extern const char *travnames[%zu];\n"
              "\n\n",
           YAJL_OBJECT_LENGTH (nodes) + 1,
           YAJL_OBJECT_LENGTH (traversals) + 2,
           YAJL_OBJECT_LENGTH (traversals) + 2,
           YAJL_OBJECT_LENGTH (traversals) + 2);


  GEN_FOOTER_H (f, "__TRAVERSE_TABLES_H__");
  GEN_FLUSH_AND_CLOSE (f);

  return true;
}


bool
gen_sons_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, "__SONS_H__",
                "   Defines the NodesUnion and node structures");

  fprintf (f, "#include \"types.h\"\n\n");

  /* Generate individual structures.  */
  fprintf (f, "/* For each node a structure of its sons is defined,\n"
              "   named SONS_N_<nodename>.  */\n\n");
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const char *  node_name = YAJL_OBJECT_KEYS (nodes)[i];
      char *  node_name_upper = string_toupper (node_name);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);

      if (!sons || YAJL_OBJECT_LENGTH (sons) == 0)
        fprintf (f, "/* %s has no sons.  */\n\n", node_name);
      else
        {
          fprintf (f, "struct SONS_N_%s\n"
                      "{\n",
                   node_name_upper);

          for (size_t j = 0; sons && j < YAJL_OBJECT_LENGTH (sons); j++)
            fprintf (f, "  node *  %s;\n", YAJL_OBJECT_KEYS (sons)[j]);

          fprintf (f, "};\n\n");
        }
      free (node_name_upper);
    }

  /* Generate SONUNION.  */
  fprintf (f, "/* This union handles all different types of sons.\n"
              "   Its members are called N_<nodename>.  */\n\n"
              "union SONUNION\n"
              "{\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const char *  node_name = YAJL_OBJECT_KEYS (nodes)[i];
      char *  node_name_lower = string_tolower (node_name);
      char *  node_name_upper = string_toupper (node_name);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);

      if (!sons || YAJL_OBJECT_LENGTH (sons) == 0)
        fprintf (f, "  /* %s has no sons.  */\n", node_name);
      else
        fprintf (f, "  struct SONS_N_%s *  N_%s;\n", node_name_upper, node_name_lower);

      free (node_name_lower);
      free (node_name_upper);
    }
  fprintf (f, "};\n\n");

  GEN_FOOTER_H (f, "__SONS_H__");
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}

bool
gen_traverse_helper_c (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "   Defines the helper function needed by the traversal system");

  fprintf (f, "#include \"traverse_helper.h\"\n"
              "#define DBUG_PREFIX \"TRAVHELP\"\n"
              "#include \"debug.h\"\n"
              "#include \"tree_basic.h\"\n"
              "#include \"traverse.h\"\n"
              "\n"
              "#define TRAV(__son, __info)         \\\n"
              "do {                                \\\n"
              "  if (NULL != __son)                \\\n"
              "    __son = TRAVdo (__son, __info); \\\n"
              "} while (0)\n"
              "\n"
              "\n"
              "node *\n"
              "TRAVnone (node *arg_node, info *arg_info)\n"
              "{\n"
              "  return (arg_node);\n"
              "}\n"
              "\n"
              "\n"
              "node *\n"
              "TRAVerror (node *arg_node, info *arg_info)\n"
              "{\n"
              "  DBUG_UNREACHABLE (\"Traveral error, illegal node type found.\");\n"
              "}\n"
              "\n"
              "\n");

  /* Generate the TRAVsons function.  */
  fprintf (f, "node *\n"
              "TRAVsons (node *arg_node, info *arg_info)\n"
              "{\n"
              "  TRAV (NODE_ERROR (arg_node), arg_info);\n"
              "  switch (NODE_TYPE (arg_node))\n"
              "    {\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const char *  node_name = YAJL_OBJECT_KEYS (nodes)[i];
      char *  node_name_upper = string_toupper (node_name);
      char *  node_name_lower = string_tolower (node_name);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);

      fprintf (f, "    case N_%s:\n", node_name_lower);
      for (size_t j = 0; sons && j < YAJL_OBJECT_LENGTH (sons); j++)
        {
          char *  son_upper = string_toupper (YAJL_OBJECT_KEYS (sons)[j]);

          fprintf (f, "      TRAV (%s_%s (arg_node), arg_info);\n",
                   node_name_upper,  son_upper);

          free (son_upper);
        }
      fprintf (f, "      break;\n\n");
      free (node_name_upper);
      free (node_name_lower);
    }

  fprintf (f, "    default:\n"
              "      DBUG_UNREACHABLE (\"Illegal nodetype found!\");\n"
              "    }\n"
              "\n"
              "  return (arg_node);\n"
              "}\n");

  /* Generate TRAVnumSons  */
  fprintf (f, "int\n"  /* FIXME consider unsigned type here.  */
              "TRAVnumSons (node *node)\n"
              "{\n"
              "  int result = 0;\n"
              "\n"
              "  DBUG_ENTER ();\n"
              "  switch (NODE_TYPE (node))\n"
              "    {\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const char *  node_name = YAJL_OBJECT_KEYS (nodes)[i];
      char *  node_name_lower = string_tolower (node_name);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);

      fprintf (f, "    case N_%s:\n"
                  "      result = %zu;\n"
                  "      break;\n\n",
               node_name_lower, sons ? YAJL_OBJECT_LENGTH (sons) : 0);

      free (node_name_lower);
    }


  fprintf (f, "    default:\n"
              "      DBUG_UNREACHABLE (\"Illegal nodetype found!\");\n"
              "    }\n"
              "\n"
              "  DBUG_RETURN (result);\n"
              "}\n\n");


  /* Generate TRAVgetSon  */
  fprintf (f, "node *\n"
              "TRAVgetSon (int no, node *parent)\n"
              "{\n"
              "  switch (NODE_TYPE (parent))\n"
              "    {\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const char *  node_name = YAJL_OBJECT_KEYS (nodes)[i];
      char *  node_name_upper = string_toupper (node_name);
      char *  node_name_lower = string_tolower (node_name);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);

      fprintf (f, "    case N_%s:\n"
                  "      switch (no)\n"
                  "        {\n",
               node_name_lower);
      for (size_t j = 0; sons && j < YAJL_OBJECT_LENGTH (sons); j++)
        {
          char *  son_upper = string_toupper (YAJL_OBJECT_KEYS (sons)[j]);

          fprintf (f, "        case %zu:\n"
                      "          return %s_%s (parent);\n",
                   j, node_name_upper,  son_upper);

          free (son_upper);
        }
      fprintf (f, "         default:\n"
                  "           DBUG_UNREACHABLE (\"index out of range!\");\n"
                  "         }\n"
                  "       break;\n\n");
      free (node_name_upper);
      free (node_name_lower);
    }

  fprintf (f, "    default:\n"
              "      DBUG_UNREACHABLE (\"Illegal nodetype found!\");\n"
              "    }\n"
              "}\n\n");

  GEN_FLUSH_AND_CLOSE (f);
  return true;
}

bool
gen_node_info_mac (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "   This file defines the node to nodename mapping");

  fprintf (f, "#ifndef NIFname\n"
              "#define NIFname(it_name)\n"
              "#endif\n"
              "\n"
              "#define NIF(it_name) NIFname (it_name)\n\n");

  fprintf (f, "NIF (\"undefined\"),\n");
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      char *  node_name_lower = string_tolower (YAJL_OBJECT_KEYS (nodes)[i]);
      fprintf (f, "NIF (\"N_%s\")%s", node_name_lower,
               i == YAJL_OBJECT_LENGTH (nodes) -1 ? "\n\n" : ",\n");
      free (node_name_lower);
    }

  fprintf (f, "#undef NIFname\n"
              "#undef NIF\n\n");

  GEN_FLUSH_AND_CLOSE (f);
  return true;
}

bool
gen_free_node_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, "__FREE_NODE_H__",
                "   Functions to free node structures");

  fprintf (f, "#include \"types.h\"\n\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      char *  node_name_lower = string_tolower (YAJL_OBJECT_KEYS (nodes)[i]);
      fprintf (f, "node *  FREE%s (node *  arg_node, node *  arg_info);\n", node_name_lower);
      free (node_name_lower);
    }

  fprintf (f, "\n\n");
  GEN_FOOTER_H (f, "__FREE_NODE_H__");
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


bool
gen_attribs_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, "__ATTRIBS_H__",
                "   Defines the AttribUnion and attrib structures");

  fprintf (f, "#include \"types.h\"\n\n"
              "/* For each node a structure of its attributes is defined,\n"
              "   named  ATTRIBS_<nodename>.  */\n\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val attributes = yajl_tree_get (node, (const char *[]){"attributes", 0}, yajl_t_object);
      const yajl_val flags = yajl_tree_get (node, (const char *[]){"flags", 0}, yajl_t_object);

      if ((!flags || YAJL_OBJECT_LENGTH (flags) == 0)
          && (!attributes || YAJL_OBJECT_LENGTH (attributes) == 0))
        {
          fprintf (f, "/* Node %s does not have atributes or flags.  */\n\n",
                   YAJL_OBJECT_KEYS (nodes)[i]);
          continue;
        }

      char *  node_name_upper = string_toupper (YAJL_OBJECT_KEYS (nodes)[i]);
      fprintf (f, "struct ATTRIBS_N_%s\n"
                  "{\n",
               node_name_upper);

      /* Generate atrtibute fields.  */
      for (size_t i = 0; attributes && i < YAJL_OBJECT_LENGTH (attributes); i++)
        {
          const char *  attr_name = YAJL_OBJECT_KEYS (attributes)[i];
          const yajl_val attr = YAJL_OBJECT_VALUES (attributes)[i];
          const yajl_val type = yajl_tree_get (attr, (const char *[]){"type", 0}, yajl_t_string);
          const char *  type_name = YAJL_GET_STRING (type);

          struct attrtype_name *  atn;

          HASH_FIND_STR (attrtype_names, type_name, atn);
          assert (atn);

          fprintf (f, "  %s %s;\n", atn->ctype, attr_name);
        }

      /* Generate attribute flags if present.  */
      if (flags && YAJL_OBJECT_LENGTH (flags) != 0)
        fprintf (f, "  struct\n"
                    "  {\n");

      for (size_t i = 0; flags && i < YAJL_OBJECT_LENGTH (flags); i++)
        fprintf (f, "    unsigned int %s:1;\n", YAJL_OBJECT_KEYS (flags)[i]);

      if (flags && YAJL_OBJECT_LENGTH (flags) != 0)
        fprintf (f, "  } flags;\n");

      fprintf (f, "};\n\n");

      free (node_name_upper);
    }

  /* Generate the union of attributes.  */
  fprintf (f, "/* This union handles all different types of attributes.\n"
              "   Its members are called N_<nodename>.  */\n\n"
              "union ATTRIBUNION\n"
              "{\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val attributes = yajl_tree_get (node, (const char *[]){"attributes", 0}, yajl_t_object);
      const yajl_val flags = yajl_tree_get (node, (const char *[]){"flags", 0}, yajl_t_object);

      if ((!flags || YAJL_OBJECT_LENGTH (flags) == 0)
          && (!attributes || YAJL_OBJECT_LENGTH (attributes) == 0))
        {
          fprintf (f, "  /* Node %s does not have atributes or flags.  */\n",
                   YAJL_OBJECT_KEYS (nodes)[i]);
          continue;
        }

      char *  node_name_upper = string_toupper (YAJL_OBJECT_KEYS (nodes)[i]);
      char *  node_name_lower = string_tolower (YAJL_OBJECT_KEYS (nodes)[i]);
      fprintf (f, "  struct ATTRIBS_N_%s N_%s;\n", node_name_upper, node_name_lower);
      free (node_name_upper);
      free (node_name_lower);
    }
  fprintf (f, "};\n\n");

  GEN_FOOTER_H (f, "__ATTRIBS_H__");
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


bool
gen_node_alloc_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, "__NODE_ALLOC_H__",
                "   Defines the a structure that allows alligned allocation of entire\n"
                "   node structures");

  fprintf (f, "#include \"types.h\"\n"
              "#include \"tree_basic.h\"\n"
              "\n"
              "/* For each node a structure NODE_ALLOC_N_<nodename> containing all\n"
              "   three sub-structures is defined to ensure proper alignment.   */\n\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      char *  node_name_upper = string_toupper (YAJL_OBJECT_KEYS (nodes)[i]);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val attributes = yajl_tree_get (node, (const char *[]){"attributes", 0}, yajl_t_object);
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);
      const yajl_val flags = yajl_tree_get (node, (const char *[]){"flags", 0}, yajl_t_object);

      fprintf (f, "struct NODE_ALLOC_N_%s\n"
                  "{\n"
                  "  node nodestructure;\n",
               node_name_upper);

      if (sons && YAJL_OBJECT_LENGTH (sons) != 0)
        fprintf (f, "  struct SONS_N_%s sonstructure;\n", node_name_upper);

      if ((flags && YAJL_OBJECT_LENGTH (flags) != 0)
          || (attributes && YAJL_OBJECT_LENGTH (attributes) != 0))
        fprintf (f, "  struct ATTRIBS_N_%s attributestructure;\n", node_name_upper);

      fprintf (f, "};\n\n");
      free (node_name_upper);
    }

  GEN_FOOTER_H (f, "__NODE_ALLOC_H__");
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}



enum macro_type
{
  m_sons,
  m_attribs,
  m_flags
};

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
          char *  son_name_upper = string_toupper (son_name);
          const yajl_val son = YAJL_OBJECT_VALUES (sons)[i];
          const yajl_val targets = yajl_tree_get (son, (const char *[]){"targets", 0}, yajl_t_any);
          const yajl_val def = yajl_tree_get (son, (const char *[]){"default", 0}, yajl_t_string);

          if (def)
            continue;

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




bool
gen_free_attribs_h (const char *  fname)
{
  FILE *  f;
  const char *  protector = "__FREE_ATTRIBS_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
                "   Functions to free the attributes of node structures");

  fprintf (f, "#include \"types.h\"\n\n");

  struct attrtype_name *  atn;
  struct attrtype_name *  tmp;

  HASH_ITER (hh, attrtype_names, atn, tmp)
    {
      if (atn->copy_type == act_literal)
        continue;

      fprintf (f, "%s FREEattrib%s (%s attr, node *  parent);\n",
               atn->ctype, atn->name, atn->ctype);
    }

  fprintf (f, "\n\n");
  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}

bool
gen_check_reset_h (const char *  fname)
{
  FILE *  f;
  const char *  protector = "__CHECK_RESET_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
                "   Functions to CheckTest node structures");

  fprintf (f, "#include \"types.h\"\n\n"
              "node *  CHKRSTdoTreeCheckReset (node *  syntax_tree);\n\n");

  struct node_name *  nn;
  struct node_name *  tmp;

  HASH_ITER (hh, node_names, nn, tmp)
    {
      char *  name_lower = string_tolower (nn->name);
      fprintf (f, "node *  CHKRST%s (node *  arg_node, info *  arg_info);\n", name_lower);
      free (name_lower);
    }

  fprintf (f, "\n\n");
  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}

bool
gen_check_node_h (const char *  fname)
{
  FILE *  f;
  const char *  protector = "__CHECK_NODE_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
                "   Functions to check node structures");

  fprintf (f, "#include \"types.h\"\n"
              "#include \"memory.h\"\n\n");

  struct node_name *  nn;
  struct node_name *  tmp;

  HASH_ITER (hh, node_names, nn, tmp)
    {
      if (nn->name_type != nnt_node)
        continue;

      char *  name_lower = string_tolower (nn->name);
      fprintf (f, "node *  CHKM%s (node *  arg_node, info *  arg_info);\n", name_lower);
      free (name_lower);
    }

  fprintf (f, "\n\n");
  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


bool
gen_check_h (const char *  fname)
{
  FILE *  f;
  const char *  protector = "__CHECK_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
                "   Functions to check node structures");

  fprintf (f, "#include \"types.h\"\n\n"
              "node *  CHKdoTreeCheck (node *  syntax_tree);\n\n");

  struct node_name *  nn;
  struct node_name *  tmp;

  HASH_ITER (hh, node_names, nn, tmp)
    {
      char *  name_lower = string_tolower (nn->name);
      fprintf (f, "node *  CHK%s (node *  arg_node, info *  arg_info);\n", name_lower);
      free (name_lower);
    }

  fprintf (f, "\n\n");
  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}

