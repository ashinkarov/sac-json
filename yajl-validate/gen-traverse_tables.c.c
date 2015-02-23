#include <stdio.h>
#include <stdbool.h>
#include <regex.h>
#include <err.h>
#include <yajl/yajl_tree.h>
#include "validator.h"
#include "gen.h"


/* A enum to differentiate pre-table from posttable while generating
   tables for traversal pre and post functions.  */
enum pre_or_post
{
  pp_pre_table,
  pp_post_table
};

/* Generate a travtable where all the functions are TRAVerror.
   This is used for phantom traversals like TR_undefined and in the
   else branch of the ifndef.  See GEN_TRAVTABLE for more details.  */
static inline void
gen_error_travtable (FILE *  f, yajl_val nodes)
{
  fprintf (f, "  {\n"
              "    /* %30s  */ &TRAVerror,\n",
           "<undefined-node>");
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      const char *  node_name = YAJL_OBJECT_KEYS (nodes)[i];
      fprintf (f, "    /* %30s  */ &TRAVerror,\n", node_name);
    }
  fprintf (f, "  },\n\n");
}

/* Generate a travtable for the TRAVNAME traversal, where the default value
   is specidied by TRAVDEFUALT.  */
static inline void
gen_travtable (FILE *  f, yajl_val nodes, const char *  travname, const char *  travdefault)
{
  struct traversal_name *  tn;

  /* Find traversal in TRAVERSAL_NAMES --- global variable that is initialised
     during the validation.  */
  HASH_FIND_STR (traversal_names, travname, tn);
  assert (tn);

  fprintf (f, "  {\n"
              "    /* %30s  */ &TRAVerror,\n",
           "<undefined-node>");
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodes); i++)
    {
      struct traversal_node *  trn;
      const char *  node_name = YAJL_OBJECT_KEYS (nodes)[i];

      HASH_FIND_STR (tn->traversal_nodes, node_name, trn);

      fprintf (f, "    /* %30s  */ ", node_name);
      if (trn)
        {
          switch (trn->node_type)
            {
            case tnt_sons: fprintf (f, "&TRAVsons"); break;
            case tnt_none: fprintf (f, "&TRAVnone"); break;
            case tnt_error: fprintf (f, "&TRAVerror"); break;
            case tnt_user:
              {
                char *  node_name_lower = string_tolower (node_name);
                fprintf (f, "&%s%s", travname, node_name_lower);
                free (node_name_lower);
                break;
              }
            default: assert (0);
            }
        }
      else if (!strcmp (travdefault, "user"))
        {
          char *  node_name_lower = string_tolower (node_name);
          fprintf (f, "&%s%s", travname, node_name_lower);
          free (node_name_lower);
        }
      else if (!strcmp (travdefault, "sons"))
        fprintf (f, "&TRAVsons");
      else if (!strcmp (travdefault, "none"))
        fprintf (f, "&TRAVnone");
      else if (!strcmp (travdefault, "error"))
        fprintf (f, "&TRAVerror");
      else
        fprintf (f, "&%s", travdefault);

      fprintf (f, ",\n");
    }
  fprintf (f, "  },\n\n");
}


/* Generate pre- or post- table for traversals.  */
static inline void
gen_prepost_table (FILE *  f, yajl_val traversals, enum pre_or_post prepost)
{
  fprintf (f, "preposttable_t %s =\n"
              "{\n"
              "  /* TR_undefined  */\n"
              "  NULL,\n\n",
           prepost == pp_pre_table ? "pretable" : "posttable");

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (traversals); i++)
    {
      const yajl_val traversal = YAJL_OBJECT_VALUES (traversals)[i];
      const char *  prepostfuntag = (prepost == pp_pre_table ? "prefun" : "postfun");

      const yajl_val prepostfun
        = yajl_tree_get (traversal, (const char *[]){prepostfuntag, 0}, yajl_t_string);

      const yajl_val ifndef
        = yajl_tree_get (traversal, (const char *[]){"ifndef", 0}, yajl_t_string);

      char *  trav_lower = string_tolower (YAJL_OBJECT_KEYS (traversals)[i]);
      fprintf (f, "  /* TR_%s  */\n", trav_lower);
      free (trav_lower);

      if (NULL == prepostfun)
        fprintf (f, "  NULL,\n\n");
      else if (ifndef)
        {
          fprintf (f, "# ifndef %s\n", YAJL_GET_STRING (ifndef));
          fprintf (f, "    &%s,\n", YAJL_GET_STRING (prepostfun));
          fprintf (f, "# else\n"
                      "    NULL,\n"
                      "# endif\n\n");
        }
      else
        fprintf (f, "  &%s,\n\n", YAJL_GET_STRING (prepostfun));
    }
  fprintf (f, "  /* TR_anonymous  */\n"
              "  NULL\n"
              "};\n\n");

}

/* Main function to generate includes, traversal table, pretable, posttable and
   the table of traversal names.  */
bool
gen_traverse_tables_c (yajl_val nodes, yajl_val traversals, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "   This file defines the function tables for traversal");

  /* First we generate the list of includes.  */
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (traversals); i++)
    {
      const yajl_val traversal = YAJL_OBJECT_VALUES (traversals)[i];
      const yajl_val include = yajl_tree_get (traversal, (const char *[]){"include", 0}, yajl_t_string);

      fprintf (f, "#include \"%s\"\n", YAJL_GET_STRING (include));
    }

  /* Generate travtables.  */
  fprintf (f, "travtables_t travtables = \n"
              "{\n");

  fprintf (f, "  /* TR_undefined  */\n");
  gen_error_travtable (f, nodes);

  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (traversals); i++)
    {
      const yajl_val traversal = YAJL_OBJECT_VALUES (traversals)[i];
      const yajl_val travdefault = yajl_tree_get (traversal, (const char *[]){"default", 0}, yajl_t_string);
      const yajl_val ifndef = yajl_tree_get (traversal, (const char *[]){"ifndef", 0}, yajl_t_string);
      const char *  travname = YAJL_OBJECT_KEYS (traversals)[i];

      char * travname_lower = string_tolower (travname);
      fprintf (f, "  /* TR_%s  */\n", travname_lower);
      free (travname_lower);

      if (ifndef)
        {
          fprintf (f, "# ifndef %s\n", YAJL_GET_STRING (ifndef));
          gen_travtable (f, nodes, travname, YAJL_GET_STRING (travdefault));
          fprintf (f, "# else\n");
          gen_error_travtable (f, nodes);
          fprintf (f, "# endif\n\n");
        }
      else
        gen_travtable (f, nodes, travname, YAJL_GET_STRING (travdefault));
    }

  fprintf (f, "  /* TR_anonymous  */\n"
              "  /* FIXME cuurently there is no table defined, so as a result,\n"
              "           as TRAVTABLES is a gloval object, the travtable for\n"
              "           TR_anonymous, will be filled with 0s, which means that\n"
              "           every function pointer will be NULL.  I don't think\n"
              "           that it is what we want.  */\n"
              "};\n\n");

  /* Generate pretable.  */
  gen_prepost_table (f, traversals, pp_pre_table);

  /* Generate posttable.  */
  gen_prepost_table (f, traversals, pp_post_table);

  /* Generate traversal names.  */
  fprintf (f, "const char *travnames[] =\n"
              "{\n"
              "  \"undefined\",\n");
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (traversals); i++)
    {
      char *  trav_lower = string_tolower (YAJL_OBJECT_KEYS (traversals)[i]);
      fprintf (f, "  \"%s\",\n", trav_lower);
      free (trav_lower);
    }

  fprintf (f, "  \"anonymous\"\n"
              "};\n\n");

  GEN_FLUSH_AND_CLOSE (f);

  return true;
}

