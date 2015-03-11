#include <stdio.h>
#include <stdbool.h>
#include <regex.h>
#include <err.h>
#include <yajl/yajl_tree.h>
#include "validator.h"
#include "gen.h"


/* Generate is<nodeset> functions for every nodeset, checking if the
   argument passed to such a function is of allowed node type.  */
static inline bool
check_gen_is_functions (FILE *  f, yajl_val nodesets)
{
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodesets); i++)
    {
      const char *  nname = YAJL_OBJECT_KEYS (nodesets)[i];
      const yajl_val nnodes = YAJL_OBJECT_VALUES (nodesets)[i];

      fprintf (f, "static inline bool\n"
                  "is%s (node *  arg_node)\n"
                  "{\n"
                  "  return ",
               nname);

      for (size_t i = 0; i < YAJL_ARRAY_LENGTH (nnodes); i++)
        {
          const char *  node_name = YAJL_STRING_VALUE (YAJL_ARRAY_VALUES (nnodes)[i]);
          char * node_name_lower = string_tolower (node_name);

          fprintf (f, "%sNODE_TYPE (arg_node) == N_%s%s\n",
                   /* put `||' if it is not the first occurrence.  */
                   i == 0 ? "" : "         || ",
                   node_name_lower,
                   /* put `;' if it is the last occurrence.  */
                   i == YAJL_ARRAY_LENGTH (nnodes) - 1 ? ";" : "");

          free (node_name_lower);
        }

      fprintf (f, "}\n\n");
    }

  /* the original XSL file also generates `isDummy' function, but as far as it
     is not being used anywhere in the sac2c code, we don't generate it.  */

  return true;
}


/* Convert a value of a phase into the appropriate condition:

       * If it is a string, it means that this string encodes a phase,
         thus the condition will be:

                   global.compiler_anyphase == PH_<phase>

       * If it is an object containing keys `from' and `to', it encodes
         a range and results in the condition:

                  global.compiler_anyphase >= PH_<from>
                  && global.compiler_anyphase < PH_<to>  */

static inline void
gen_phase_condition (FILE *  f, yajl_val phase)
{
  if (YAJL_IS_STRING (phase))
    fprintf (f, "global.compiler_anyphase == PH_%s", YAJL_GET_STRING (phase));
  else if (YAJL_IS_OBJECT (phase))
    {
      yajl_val fr = yajl_tree_get (phase, (const char *[]){"from", 0}, yajl_t_string);
      yajl_val to = yajl_tree_get (phase, (const char *[]){"to", 0}, yajl_t_string);
      assert (fr && to);

      fprintf (f, "(global.compiler_anyphase >= PH_%s &&"
                  " global.compiler_anyphase < PH_%s)",
                  YAJL_GET_STRING (fr), YAJL_GET_STRING (to));
    }
  else
    assert (0);
}


/* Phases may be of type array, in which case, evey value inside
   the array is either a string or an object.  */
static inline void
gen_phases_condition (FILE *  f, yajl_val phases)
{
  if (YAJL_IS_STRING (phases) || YAJL_IS_OBJECT (phases))
    gen_phase_condition (f, phases);
  else if (YAJL_IS_ARRAY (phases))
    for (size_t i = 0; i < YAJL_ARRAY_LENGTH (phases); i++)
      {
        if (i > 0)
          fprintf (f, " || ");

        gen_phase_condition (f, YAJL_ARRAY_VALUES (phases)[i]);
      }
}


/* Convert `contains' to text which later will be used to produce
   an error message in case a node is not within the range of values
   allowed by `contains'.  */
static inline void
gen_contains_expected (FILE *  f, yajl_val contains)
{
  struct node_name *  nn;

  if (YAJL_IS_STRING (contains))
    {
      const char *  contains_name = YAJL_GET_STRING (contains);
      HASH_FIND_STR (node_names, contains_name, nn);
      //assert (nn);

      fprintf (f, "%s `%s'",
                 (!nn || nn->name_type == nnt_node) ? "node" : "nodeset",
                 contains_name);
    }
  else if (YAJL_IS_ARRAY (contains))
    for (size_t i = 0; i < YAJL_ARRAY_LENGTH (contains); i++)
      {
        const char *  contains_name = YAJL_GET_STRING (YAJL_ARRAY_VALUES (contains)[i]);

        HASH_FIND_STR (node_names, contains_name, nn);
        assert (nn);

        fprintf (f, "%s%s `%s'",
                 i == 0 ? "either " : " or ",
                 nn->name_type == nnt_node ? "node" : "nodeset",
                 nn->name);
      }

}



/* Helper function for GEN_CONTAINS_CONDITION.  Generates part of the condition resulting
   for a particular node or nodeset from the `contains' specification of a `target'.
   CONTAINS_NAME is the node of the name or a node or nodeset;
   IS_FIRST specifies whether to generate `||' before the condition.  */
static inline void
gen_contains_item (FILE *  f, const char *  contains_name, const char *  node_name_upper,
                   const char *  son_name_upper, bool is_first)
{
  struct node_name *  nn;

  HASH_FIND_STR (node_names, contains_name, nn);
  if (!nn)
      /* FIXME this is lethal and should be replaced with assert when the problem is
         fixed in the ast.json.  */
      json_warn ("the node/nodeset `%s' in the target of son `%s' of the "
                 "node `%s' is not found!",
                 contains_name, son_name_upper, node_name_upper);

  if (!nn || nn->name_type == nnt_node)
    {
      char *  contains_name_lower = string_tolower (contains_name);
      fprintf (f, "%sNODE_TYPE (%s_%s (arg_node)) != N_%s",
               is_first ? "" : " && ",
               son_name_upper, node_name_upper,
               contains_name_lower);
      free (contains_name_lower);
    }
  else
    fprintf (f, "%s!is%s (%s_%s (arg_node))",
             is_first ? "" : " && ",
             contains_name,
             son_name_upper, node_name_upper);

}


/* FIXME This can be unified with the similar code in `gen-node-basic.c'  */
static inline void
gen_contains_condition (FILE *  f, yajl_val contains, const char *  node_name_upper,
                       const char *  son_name_upper)
{
  fprintf (f, "%s_%s (arg_node) && ",
           node_name_upper, son_name_upper);

  if (YAJL_IS_STRING (contains))
    gen_contains_item (f, YAJL_GET_STRING (contains), node_name_upper, son_name_upper, true);
  else if (YAJL_IS_ARRAY (contains))
    for (size_t i = 0; i < YAJL_ARRAY_LENGTH (contains); i++)
      gen_contains_item (f, YAJL_GET_STRING (YAJL_ARRAY_VALUES (contains)[i]),
                         node_name_upper, son_name_upper, i == 0);
  else
    abort ();
}


static inline void
gen_son_target_check_body (FILE *  f, const yajl_val mandatory, const yajl_val contains,
                           const char *  node_name_upper, const char *  son_name_upper,
                           const char *  indent)
{
  if (YAJL_IS_TRUE (mandatory))
    fprintf (f, "%s  CHKexistSon (%s_%s (arg_node), arg_node,\n"
                "%s               \"mandatory son %s_%s is NULL\");\n",
             indent, node_name_upper, son_name_upper,
             indent, node_name_upper, son_name_upper);

  fprintf (f, "%s  if (", indent);
  gen_contains_condition (f, contains, node_name_upper, son_name_upper);
  fprintf (f, ")\n"
              "%s    CHKcorrectTypeInsertError (arg_node, \"%s_%s hasnt the right type.\"\n"
              "%s                               \"It should be: ",
           indent, node_name_upper, son_name_upper,
           indent);
  gen_contains_expected (f, contains);
  fprintf (f, "\");\n");

}


static inline void
gen_node_son_check_target (FILE *  f, yajl_val targets, const char *  node_name_upper,
                           const char *  son_name_upper, bool last_target_p)
{
  yajl_val phases = yajl_tree_get (targets, (const char *[]){"phases", 0}, yajl_t_any);
  yajl_val contains = yajl_tree_get (targets, (const char *[]){"contains", 0}, yajl_t_any);
  yajl_val mandatory = yajl_tree_get (targets, (const char *[]){"mandatory", 0}, yajl_t_any);
  const char * s;

  /*if (!contains)
    json_warn ("the target of son `%s' of the node `%s' does not have `contains' tag",
               son_name_upper, node_name_upper);*/
  assert (contains);

  /* For `all' phases we do not have a case when a son must be NULL.  */
  if (YAJL_IS_STRING (phases) && !strcmp (s = YAJL_GET_STRING (phases), "all"))
    gen_son_target_check_body (f, mandatory, contains, node_name_upper, son_name_upper, "");

  /* If it is specified just per one phase.  */
  else
    {
      fprintf (f, "  if (");
      gen_phases_condition (f, phases);
      fprintf (f, ")\n"
                  "    {\n");
      gen_son_target_check_body (f, mandatory, contains, node_name_upper, son_name_upper, "    ");
      fprintf (f, "    }\n");

      if (last_target_p)
        fprintf (f, "  else\n"
                    "    CHKnotExist ((intptr_t) %s_%s (arg_node), arg_node,\n"
                    "                 \"attribute %s_%s must be NULL\");\n\n",
                 node_name_upper, son_name_upper,
                 node_name_upper, son_name_upper);
    }
}





static inline void
gen_attrib_target_check_body (FILE *  f, const yajl_val mandatory, const yajl_val contains,
                              const char *  node_name_upper, const char *  attrib_name_upper,
                              bool attr_type_node_p, const char *  indent)
{
  const char *  s;

  if (YAJL_IS_TRUE (mandatory))
    fprintf (f, "%s  CHKexistAttribute ((intptr_t) %s_%s (arg_node), arg_node,\n"
                "%s                     \"mandatory attribute %s_%s is NULL\");\n",
             indent, node_name_upper, attrib_name_upper,
             indent, node_name_upper, attrib_name_upper);

  /* If the type of an attribute is not 'Node' and `contains' is not `any',
     do the value check of an attribute.  */
  if (!attr_type_node_p
      || (YAJL_IS_STRING (contains) && !strcmp (s = YAJL_GET_STRING (contains), "any")))
    return;

  fprintf (f, "%s  if (", indent);
  gen_contains_condition (f, contains, node_name_upper, attrib_name_upper);
  fprintf (f, ")\n"
              "%s    CHKcorrectTypeInsertError (arg_node, \"%s_%s hasnt the right type.\"\n"
              "%s                               \"It should be: ",
           indent, node_name_upper, attrib_name_upper,
           indent);
  gen_contains_expected (f, contains);
  fprintf (f, "\");\n");

}



/* Attribute checking routines.  */
static inline void
gen_node_attrib_check_target (FILE *  f, yajl_val targets, const char *  node_name_upper,
                              const char *  attrib_name_upper, bool attr_type_node_p,
                              bool last_target_p)
{
  yajl_val phases = yajl_tree_get (targets, (const char *[]){"phases", 0}, yajl_t_any);
  yajl_val contains = yajl_tree_get (targets, (const char *[]){"contains", 0}, yajl_t_any);
  yajl_val mandatory = yajl_tree_get (targets, (const char *[]){"mandatory", 0}, yajl_t_any);
  const char * s;

  /*if (!contains)
    json_warn ("the target of son `%s' of the node `%s' does not have `contains' tag",
               son_name_upper, node_name_upper);*/
  assert (contains);

  /* For `all' phases we do not have a case when a son must be NULL.  */
  if (YAJL_IS_STRING (phases) && !strcmp (s = YAJL_GET_STRING (phases), "all"))
    gen_attrib_target_check_body (f, mandatory, contains, node_name_upper, attrib_name_upper,
                               attr_type_node_p, "");

  /* If it is specified just per one phase.  */
  else
    {
      fprintf (f, "  if (");
      gen_phases_condition (f, phases);
      fprintf (f, ")\n"
                  "    {\n");
      gen_attrib_target_check_body (f, mandatory, contains, node_name_upper, attrib_name_upper,
                                 attr_type_node_p, "    ");
      fprintf (f, "    }\n");

      if (last_target_p)
        fprintf (f, "  else\n"
                    "    CHKnotExist ((intptr_t) %s_%s (arg_node), arg_node,\n"
                    "                 \"attribute %s_%s must be NULL\");\n\n",
                 node_name_upper, attrib_name_upper,
                 node_name_upper, attrib_name_upper);
    }
}




bool
gen_check_c (yajl_val nodes, yajl_val nodesets, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "   Functions needed by check traversal");

  fprintf (f, "#ifndef DBUG_OFF\n"
              "\n"
              "#include \"check.h\"\n"
              "#include \"globals.h\"\n"
              "#include \"tree_basic.h\"\n"
              "#include \"traverse.h\"\n"
              "#define DBUG_PREFIX \"CHK\"\n"
              "#include \"debug.h\"\n"
              "#include \"check_lib.h\"\n"
              "#include \"check_mem.h\"\n"
              "\n"
              "\n"
              "node *\n"
              "CHKdoTreeCheck (node *arg_node)\n"
              "{\n"
              "  node *  keep_next;\n"
              "\n"
              "  DBUG_ENTER ();\n"
              "  DBUG_ASSERT (NODE_TYPE (arg_node) == N_module\n"
              "               || NODE_TYPE (arg_node) == N_fundef,\n"
              "               \"Illegal argument node!\");\n"
              "\n"
              "  DBUG_ASSERT (NODE_TYPE (arg_node) == N_module\n"
              "               || global.local_funs_grouped,\n"
              "               \"If run fun-based, special funs must be grouped.\");\n"
              "\n"
              "  /* If this check is called function-based, we do not want to traverse into the\n"
              "     next fundef, but restrict ourselves to this function and its subordinate\n"
              "     special functions.  */\n"
              "  if (NODE_TYPE (arg_node) == N_fundef)\n"
              "   {\n"
              "     keep_next = FUNDEF_NEXT (arg_node);\n"
              "     FUNDEF_NEXT (arg_node) = NULL;\n"
              "   }\n"
              "\n"
              "  DBUG_PRINT (\"Starting the check mechanism\");\n"
              "\n"
              "  TRAVpush (TR_chk);\n"
              "  arg_node = TRAVdo (arg_node, NULL);\n"
              "  TRAVpop ();\n"
              "\n"
              "  DBUG_PRINT (\"Check mechanism complete\");\n"
              "\n"
              "  /* If this check is called function-based, we must restore the original\n"
              "     fundef chain here.  */\n"
              "  if (NODE_TYPE (arg_node) == N_fundef)\n"
              "    FUNDEF_NEXT (arg_node) = keep_next;\n"
              "\n"
              "  DBUG_RETURN (arg_node);\n"
              "}\n\n");

  check_gen_is_functions (f, nodesets);

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const char *  node_name = YAJL_OBJECT_KEYS (nodes)[i];
      char *  node_name_lower = string_tolower (node_name);
      char *  node_name_upper = string_toupper (node_name);
      const yajl_val node = YAJL_OBJECT_VALUES (nodes)[i];
      const yajl_val attribs = yajl_tree_get (node, (const char *[]){"attributes", 0}, yajl_t_object);
      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_object);
      const yajl_val checks = yajl_tree_get (node, (const char *[]){"checks", 0}, yajl_t_array);

      fprintf (f, "node *\n"
                  "CHK%s (node *  arg_node, info *  arg_info)\n"
                  "{\n"
                  "  DBUG_ENTER ();\n\n",
               node_name_lower);

      fprintf (f, "  if (NODE_CHECKVISITED (arg_node))\n"
                  "    NODE_ERROR (arg_node) = CHKinsertError (NODE_ERROR (arg_node),\n"
                  "                                            \"Node illegally shared: N_%s\");\n"
                  "  else\n"
                  "    NODE_CHECKVISITED (arg_node) = TRUE;\n\n",
               node_name_lower);

      for (size_t i = 0; sons && i < YAJL_OBJECT_LENGTH (sons); i++)
        {
          const char *  son_name = YAJL_OBJECT_KEYS (sons)[i];
          char *  son_name_upper = string_toupper (son_name);
          const yajl_val son = YAJL_OBJECT_VALUES (sons)[i];
          const yajl_val targets = yajl_tree_get (son, (const char *[]){"targets", 0}, yajl_t_any);

          fprintf (f, "  /* Checking `%s' son.  */\n", son_name);

          assert (targets);
          if (YAJL_IS_OBJECT (targets))
            gen_node_son_check_target (f, targets, node_name_upper, son_name_upper, true);

          else if (YAJL_IS_ARRAY (targets))
            for (size_t j = 0; j < YAJL_ARRAY_LENGTH (targets); j++)
              {
                if (j > 0)
                  fprintf (f, "  else");

                gen_node_son_check_target (f, YAJL_ARRAY_VALUES (targets)[j],
                                           node_name_upper, son_name_upper,
                                           j == YAJL_ARRAY_LENGTH (targets) - 1);
              }

          free (son_name_upper);
        }

      for (size_t i = 0; attribs && i < YAJL_OBJECT_LENGTH (attribs); i++)
        {
          const char *  attrib_name = YAJL_OBJECT_KEYS (attribs)[i];
          const yajl_val attrib = YAJL_OBJECT_VALUES (attribs)[i];
          const yajl_val type = yajl_tree_get (attrib, (const char *[]){"type", 0}, yajl_t_string);
          const yajl_val targets = yajl_tree_get (attrib, (const char *[]){"targets", 0}, yajl_t_any);

          /* Skip the attribute if its type prescribes literal copying.  */
          const char *  type_name = YAJL_GET_STRING (type);
          struct attrtype_name *  an;
          HASH_FIND_STR (attrtype_names, type_name, an);
          assert (an);

          if (an->copy_type == act_literal)
            continue;

          char *  attrib_name_upper = string_toupper (attrib_name);
          fprintf (f, "  /* Checking `%s' attribute.  */\n", attrib_name);

          assert (targets);
          if (YAJL_IS_OBJECT (targets))
            gen_node_attrib_check_target (f, targets, node_name_upper, attrib_name_upper,
                                          !strcmp (an->name, "Node"), true);

          else if (YAJL_IS_ARRAY (targets))
            for (size_t j = 0; j < YAJL_ARRAY_LENGTH (targets); j++)
              {
                if (j > 0)
                  fprintf (f, "  else");

                gen_node_attrib_check_target (f, YAJL_ARRAY_VALUES (targets)[j],
                                              node_name_upper, attrib_name_upper,
                                              !strcmp (an->name, "Node"),
                                              j == YAJL_ARRAY_LENGTH (targets) - 1);
              }

          free (attrib_name_upper);
        }


      /* Generate custom checks.  */
      for (size_t i = 0; checks && i < YAJL_ARRAY_LENGTH (checks); i++)
        {
          if (i == 0)
            fprintf (f, "\n  /* Custom checks for the `%s' node.  */\n", node_name);

          const yajl_val check = YAJL_ARRAY_VALUES (checks)[i];
          assert (YAJL_IS_STRING (check));
          fprintf (f, "  arg_node = %s (arg_node);\n", YAJL_GET_STRING (check));
        }


      /* Generate traversals into sons.  */
      for (size_t i = 0; sons && i < YAJL_OBJECT_LENGTH (sons); i++)
        {
          if (i == 0)
            fprintf (f, "\n  /* Traversals into sons of the `%s' node.  */\n", node_name);

          const char *  son_name = YAJL_OBJECT_KEYS (sons)[i];
          char *  son_name_upper = string_toupper (son_name);

          fprintf (f, "  if (NULL != %s_%s (arg_node))\n"
                      "    %s_%s (arg_node) = TRAVdo (%s_%s (arg_node), arg_info);\n\n",
                   node_name_upper, son_name_upper,
                   node_name_upper, son_name_upper,
                   node_name_upper, son_name_upper);

          free (son_name_upper);
        }

      fprintf (f, "  DBUG_RETURN (arg_node);\n"
                  "}\n\n");
      free (node_name_lower);
      free (node_name_upper);
    }

  fprintf (f, "#else // !DBUG_OFF\n"
              "static int this_translation_unit = 0xdead;\n"
              "#endif // !DBUG_OFF\n\n");
  GEN_FLUSH_AND_CLOSE (f);
  return true;
}

