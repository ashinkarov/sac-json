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



/* FIXME write some comments to these funtions.  */
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

