#include <stdio.h>
#include <stdbool.h>
#include <regex.h>
#include <err.h>
#include <yajl/yajl_tree.h>

#include "validator.h"
#include "gen.h"


/* Build a enum of all the traversals.  The first item in the enum
   is TR_undefined, after that traversal names from TRAVERSALS in the
   format TR_<traversal-name> in the lower case and the last item is
   TR_anonymous.  */
bool
gen_types_trav_h (yajl_val traversals, const char *  fname)
{
  FILE *  f;
  const char *  protector = "__TYPES_TRAV_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
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

  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);

  return true;
}


/* Generatre a enum of all the possible nodes.  The first item is
   N_undefined, then follow N_<node-name> from NODES.

   Also define the MAX_NODES macro.  */
bool
gen_types_nodetype_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  const char *  protector = "__TYPES_NODETYPE_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
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

  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);

  return true;
}



/* Generate structures for evey sons for the nodes that have sons.
   A strcuture for a son is called `struct SONS_N_<node-name>' in
   uppercase.  The union is called `union SONUNION'.  */
bool
gen_sons_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  const char *  protector = "__SONS_H__";

  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
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

  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


/* Generate a .mac file with the list of the nodes in the format:

            NIF ("N_<nodename>"),

   This is used to define an array of node names.  */
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


/* Generate function prototypes for FREE functions.  Every node gets
   its prototype in the following format: FREE<node-name> in lower case.  */
bool
gen_free_node_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  const char *  protector = "__FREE_NODE_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
                "   Functions to free node structures");

  fprintf (f, "#include \"types.h\"\n\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      char *  node_name_lower = string_tolower (YAJL_OBJECT_KEYS (nodes)[i]);
      fprintf (f, "node *  FREE%s (node *  arg_node, node *  arg_info);\n", node_name_lower);
      free (node_name_lower);
    }

  fprintf (f, "\n\n");
  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


/* Generate data structures for node attributes and the overall union.
   Every node that has attributes or flags initiates a structure called
   ATTRIBS_N_<node-name> in upper case.  The union is called ATTRIBUNION.
   Flags are stored in the anonymous structure called `flags' which is a
   part of the ATTRIB_N_<node> structure.  */
bool
gen_attribs_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  const char *  protector = "__ATTRIBS_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
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

  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


/* Generate NODE_ALLOC_<node-name> in uppercase structures that contain a common
   node structure and the corresponding sons or attribute structure in case the
   node has them.  */
bool
gen_node_alloc_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  const char *  protector = "__NODE_ALLOC_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
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

  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


/* Generate a header file containings prototpes for functions that free
   attributes of nodes.  Each attribute which copy tag is not `literal'
   gets a function called FREEattrib<attribute-type-name>.  */
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
      if (nn->name_type == nnt_nodeset)
        continue;

      char *  name_lower = string_tolower (nn->name);
      fprintf (f, "node *  CHK%s (node *  arg_node, info *  arg_info);\n", name_lower);
      free (name_lower);
    }

  fprintf (f, "\n\n");
  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


/* For each node the FREE<node-name> function is generated.  The body
   contains calls to free for all nodes and attributes.  For each attribute a
   unique free function is called.  This function has to decide whether to free an
   attribute or not.  This includes a test for non-null if the attribute is a
   pointer type!

   The return value is the value of the NEXT son, or if no NEXT son is
   present the result of Free.  This way, depending on the TRAVCOND macro, the
   full chain of nodes or only one node can be freed.

   There is an exception for FREEfundef.  Fundef nodes are never freed.
   Instead, they are zombiealised, thus their status is set to zombie and all
   attributes and sons are freed, except for:

                NAME, MOD, LINKMOD, TYPE and TYPES

   Furthermore, the node structure itself is not freed. This has to be
   done by a cal of FreeAllZombies.  */
bool
gen_free_node_c (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "   Functions needed by free traversal");

  fprintf (f, "#include \"free.h\"\n"
              "#include \"free_node.h\"\n"
              "#include \"free_attribs.h\"\n"
              "#include \"free_info.h\"\n"
              "#include \"tree_basic.h\"\n"
              "#include \"traverse.h\"\n"
              "#include \"str.h\"\n"
              "#include \"memory.h\"\n"
              "#define DBUG_PREFIX \"FREE\"\n"
              "#include \"debug.h\"\n"
              "#include \"globals.h\"\n"
              "\n"
              "#define FREETRAV(node, info) (node != NULL ? TRAVdo (node, info) : node)\n"
              "#define FREECOND(node, info)             \\\n"
              "   (INFO_FREE_FLAG (info) != arg_node    \\\n"
              "    ? FREETRAV (node, info)              \\\n"
              "    : node)\n\n");


  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const char *  node_name = YAJL_OBJECT_KEYS (nodes)[i];
      char *  node_name_lower = string_tolower (node_name);
      char *  node_name_upper = string_toupper (node_name);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val attribs = yajl_tree_get (node, (const char *[]){"attributes", 0}, yajl_t_object);
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);

      fprintf (f, "node *\n"
                  "FREE%s (node *  arg_node, info *  arg_info)\n"
                  "{\n",
               node_name_lower);

      fprintf (f, "  DBUG_ENTER ();\n\n");

      if (!strcmp (node_name, "Fundef"))
        fprintf (f, "  DBUG_PRINT(\"transforming %%s at \" F_PTR \" into a zombie\", "
                                 "FUNDEF_NAME (arg_node), arg_node);\n"
                    "  arg_node = FREEzombify (arg_node);\n");
      else
        fprintf (f, "  node *  result = NULL;\n"
                    "\n"
                    "  DBUG_PRINT (\"Processing node %%s at \" F_PTR, "
                                  "NODE_TEXT (arg_node), arg_node);\n");

      fprintf (f, "  NODE_ERROR (arg_node) = FREETRAV (NODE_ERROR (arg_node), arg_info);\n");

      /* Check if we have a son called Next and free it first.

         FIXME is it necessary to free things in this order?  */
      const yajl_val next = yajl_tree_get (sons, (const char *[]){"Next", 0}, yajl_t_object);
      if (next)
        fprintf (f, "  %s_NEXT (arg_node) = FREECOND (%s_NEXT (arg_node), arg_info);\n",
                 node_name_upper, node_name_upper);


      for (size_t i = 0; attribs && i < YAJL_OBJECT_LENGTH (attribs); i++)
        {
          const char *  attrib_name = YAJL_OBJECT_KEYS (attribs)[i];
          const yajl_val attrib = YAJL_OBJECT_VALUES (attribs)[i];
          const yajl_val type = yajl_tree_get (attrib, (const char *[]){"type", 0}, yajl_t_string);

          struct attrtype_name *  atn;
          char *  type_name = YAJL_GET_STRING (type);
          HASH_FIND_STR (attrtype_names, type_name, atn);
          assert (atn);

          if (atn->copy_type == act_literal)
            continue;

          /* Skip exceptions in case of FREEfundef.  */
          if (!strcmp (node_name, "Fundef")
              && (!strcmp (attrib_name, "Name")
                  || !strcmp (attrib_name, "Mod")
                  || !strcmp (attrib_name, "LinkMod")
                  || !strcmp (attrib_name, "Types")
                  || !strcmp (attrib_name, "Type")
                  || !strcmp (attrib_name, "Impl")))
            continue;

          char *  attrib_name_upper = string_toupper (attrib_name);
          fprintf (f, "  %s_%s (arg_node) = FREEattrib%s (%s_%s (arg_node), arg_node);\n",
                   node_name_upper, attrib_name_upper, atn->name, node_name_upper, attrib_name_upper);

          free (attrib_name_upper);
        }

      for (size_t i = 0; sons && i < YAJL_OBJECT_LENGTH (sons); i++)
        {
          const char *  son_name = YAJL_OBJECT_KEYS (sons)[i];

          /* We did Next already before the attributes.  */
          if (!strcmp (son_name, "Next"))
            continue;

          char *  son_name_upper = string_toupper (son_name);
          fprintf (f, "  %s_%s (arg_node) = FREETRAV (%s_%s (arg_node), arg_info);\n",
                    node_name_upper, son_name_upper, node_name_upper, son_name_upper);

          free (son_name_upper);
        }

      if (!strcmp (node_name, "Fundef"))
        fprintf (f, "  DBUG_RETURN (result);\n"
                    "}\n\n");
      else
        {
          if (next)
            fprintf (f, "  result = %s_NEXT (arg_node);\n", node_name_upper);

          fprintf (f, "  DBUG_PRINT (\"Freeing node %%s at \" F_PTR, NODE_TEXT (arg_node), arg_node);\n"
                      "  arg_node = MEMfree (arg_node);\n"
                      "\n"
                      "  DBUG_RETURN (result);\n"
                      "}\n\n");
        }

      free (node_name_upper);
      free (node_name_lower);
    }

  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


bool
gen_check_reset_c (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "   Functions needed by test check environment");

  fprintf (f, "#include \"check_reset.h\"\n"
              "#include \"globals.h\"\n"
              "#include \"tree_basic.h\"\n"
              "#include \"traverse.h\"\n"
              "#define DBUG_PREFIX \"CHKRST\"\n"
              "#include \"debug.h\"\n"
              "\n"
              "\n"
              "node *\n"
              "CHKRSTdoTreeCheckReset (node *  arg_node)\n"
              "{\n"
              "  node *keep_next = NULL;\n"
              "\n"
              "  DBUG_ENTER ();\n"
              "  DBUG_ASSERT (NODE_TYPE( arg_node) == N_module\n"
              "               || NODE_TYPE( arg_node) == N_fundef,\n"
              "               \"Illegal argument node!\");\n"
              "\n"
              "  DBUG_ASSERT (NODE_TYPE( arg_node) == N_module\n"
              "               || global.local_funs_grouped,\n"
              "               \"If run fun-based, special funs must be grouped.\");\n"
              "\n"
              "  if (NODE_TYPE (arg_node) == N_fundef)\n"
              "    {\n"
              "      /* If this check is called function-based, we do not want to traverse\n"
              "         into the next fundef, but restrict ourselves to this function and\n"
              "         its subordinate special functions.  */\n"
              "      keep_next = FUNDEF_NEXT (arg_node);\n"
              "      FUNDEF_NEXT (arg_node) = NULL;\n"
              "    }\n"
              "\n"
              "  DBUG_PRINT (\"Reset tree check mechanism\");\n"
              "\n"
              "  TRAVpush (TR_chkrst);\n"
              "  arg_node = TRAVdo (arg_node, NULL);\n"
              "  TRAVpop ();\n"
              "\n"
              "  DBUG_PRINT (\"Reset tree check mechanism completed\");\n"
              "\n"
              "  if (NODE_TYPE (arg_node) == N_fundef)\n"
              "    /* If this check is called function-based, we must restore the original\n"
              "       fundef chain here.  */\n"
              "    FUNDEF_NEXT (arg_node) = keep_next;\n"
              "\n"
              "  DBUG_RETURN (arg_node);\n"
              "}\n\n");


  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      char *  node_name_lower = string_tolower (YAJL_OBJECT_KEYS (nodes)[i]);
      char *  node_name_upper = string_toupper (YAJL_OBJECT_KEYS (nodes)[i]);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);

      fprintf (f, "node *\n"
                  "CHKRST%s (node *  arg_node, info *  arg_info)\n"
                  "{\n"
                  "  DBUG_ENTER ();\n"
                  "  NODE_CHECKVISITED (arg_node) = FALSE;\n\n",
               node_name_lower);

      for (size_t i = 0; sons && i < YAJL_OBJECT_LENGTH (sons); i++)
        {
            const char *  son_name = YAJL_OBJECT_KEYS (sons)[i];
            char *  son_name_upper = string_toupper (son_name);

            fprintf (f, "  if (%s_%s (arg_node) != NULL)\n"
                        "    %s_%s (arg_node) = TRAVdo (%s_%s (arg_node), arg_info);\n\n",
                     node_name_upper, son_name_upper,
                     node_name_upper, son_name_upper,
                     node_name_upper, son_name_upper);

            free (son_name_upper);
        }


      fprintf (f, "  DBUG_RETURN (arg_node);\n"
                  "}\n\n");
      free (node_name_upper);
      free (node_name_lower);
    }


  fprintf (f, "\n\n");
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}

/* The function generates a CHKM<node-name> functions for all the nodes
   where each function calls Touch for all attributes and traverses into
   all sons.

   The return value is ARG_NODE.  */

bool
gen_check_nodes_c (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "   Functions needed by test check environment");

  fprintf (f, "#include \"check_node.h\"\n"
              "#include \"tree_basic.h\"\n"
              "#include \"traverse.h\"\n"
              "#define DBUG_PREFIX \"CHKM\"\n"
              "#include \"debug.h\"\n"
              "#include \"check_mem.h\"\n"
              "\n"
              "#define CHKMTRAV(node, info) (node != NULL ? TRAVdo (node, info) : node)\n\n");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      char *  node_name_lower = string_tolower (YAJL_OBJECT_KEYS (nodes)[i]);
      char *  node_name_upper = string_toupper (YAJL_OBJECT_KEYS (nodes)[i]);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);
      const yajl_val attribs = yajl_tree_get (node, (const char *[]){"attributes", 0}, yajl_t_object);

      fprintf (f, "node *\n"
                  "CHKM%s (node *  arg_node, info *  arg_info)\n"
                  "{\n"
                  "  DBUG_ENTER ();\n"
                  "  CHKMtouch (arg_node, arg_info);\n"
                  "  NODE_ERROR (arg_node) = CHKMTRAV (NODE_ERROR (arg_node), arg_info);\n\n",
               node_name_lower);


      /* Check if we have a son called Next and free it first.

         FIXME is it necessary to do the Next first?  */
      const yajl_val next = yajl_tree_get (sons, (const char *[]){"Next", 0}, yajl_t_object);
      if (next)
        fprintf (f, "  %s_NEXT (arg_node) = CHKMTRAV (%s_NEXT (arg_node), arg_info);\n",
                 node_name_upper, node_name_upper);


      for (size_t i = 0; attribs && i < YAJL_OBJECT_LENGTH (attribs); i++)
        {
          const char *  attrib_name = YAJL_OBJECT_KEYS (attribs)[i];
          const yajl_val attrib = YAJL_OBJECT_VALUES (attribs)[i];
          const yajl_val type = yajl_tree_get (attrib, (const char *[]){"type", 0}, yajl_t_string);
          struct attrtype_name *  atn;
          char *  type_name = YAJL_GET_STRING (type);

          HASH_FIND_STR (attrtype_names, type_name, atn);
          assert (atn);

          if (atn->copy_type == act_literal || atn->copy_type == act_function)
            continue;

          char *  attrib_name_upper = string_toupper (attrib_name);
          fprintf (f, "  CHKMtouch ((void *) %s_%s (arg_node), arg_info);\n",
                   node_name_upper, attrib_name_upper);

          free (attrib_name_upper);
        }

      for (size_t i = 0; sons && i < YAJL_OBJECT_LENGTH (sons); i++)
        {
            const char *  son_name = YAJL_OBJECT_KEYS (sons)[i];

            /* We did Next already before the attributes.  */
            if (!strcmp (son_name, "Next"))
              continue;

            char *  son_name_upper = string_toupper (son_name);
            fprintf (f, "  %s_%s (arg_node) = CHKMTRAV (%s_%s (arg_node), arg_info);\n",
                     node_name_upper, son_name_upper,
                     node_name_upper, son_name_upper);
            free (son_name_upper);
        }

      fprintf (f, "  DBUG_RETURN (arg_node);\n"
                  "}\n\n");
      free (node_name_upper);
      free (node_name_lower);
    }


  fprintf (f, "\n\n");
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}

/* Generate a header file containings prototpes for functions that serialise
   attributes of nodes.  Each attribute with `persist = true' (which is assumed
   by default if `persist' is not present gets a function called
   SATserialize<attribute-type-name>.  */
bool
gen_serialize_attribs_h (const char *  fname)
{
  FILE *  f;
  const char *  protector = "__SERIALIZE_ATTRIBS_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
                "   Functions to serialize the attributes of node structures");

  fprintf (f, "#include \"types.h\"\n\n");

  struct attrtype_name *  atn;
  struct attrtype_name *  tmp;

  HASH_ITER (hh, attrtype_names, atn, tmp)
    {
      const char *  const_qual = "";

      if (!atn->persist)
        continue;

      /* This is a hack for C++ compilers, to resolve constant parameter
         passing from SharedString to String.

         FIXME: During the seriliazation all the parameters may become constant
         as serialization should not change them.  */
      if (!strcmp (atn->name, "String"))
        const_qual = "char ";

      fprintf (f, "void SATserialize%s (info *, %s%s, node *);\n",
               atn->name, const_qual, atn->ctype);
    }

  fprintf (f, "\n\n");
  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}


bool
gen_serialize_node_h (const char *  fname)
{
  FILE *  f;
  const char *  protector = "__SERIALIZE_NODE_H__";
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER_H (f, protector,
                "   Functions to serialize node structures");

  fprintf (f, "#include \"types.h\"\n\n");

  struct node_name *  nn;
  struct node_name *  tmp;

  HASH_ITER (hh, node_names, nn, tmp)
    {
      if (nn->name_type == nnt_nodeset)
        continue;

      char *  name_lower = string_tolower (nn->name);
      fprintf (f, "node *  SET%s (node *  arg_node, info *  arg_info);\n", name_lower);
      free (name_lower);
    }

  fprintf (f, "\n\n");
  GEN_FOOTER_H (f, protector);
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}
