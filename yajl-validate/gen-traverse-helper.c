#include <stdio.h>
#include <stdbool.h>
#include <regex.h>
#include <err.h>
#include <yajl/yajl_tree.h>
#include "validator.h"
#include "gen.h"


/* Generate traversal helper functions:

       * TRAVsons --- traverse into sons of the node depending on
         the type of the node.

       * TRAVnumSons --- returns number of sons for the given node.
       
       * TRAVgetSon --- gets a son by its number in the node.  */
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
