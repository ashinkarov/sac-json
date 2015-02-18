#include <stdio.h>
#include <ctype.h>
#include <stdbool.h>
#include <regex.h>
#include <yajl/yajl_tree.h>
#include <err.h>

#include "validator.h"
#include "gen.h"


static inline char *
string_tolower (const char *  s)
{
  char *  x = strdup (s);
  for (size_t i = 0; i < strlen (x); i++)
    x[i] = (char) tolower (x[i]);

  return x;
}


bool
gen_types_trav_h (yajl_val traversals, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "__TYPES_TRAV_H__",
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

  GEN_FOOTER (f, "__TYPES_TRAV_H__");
  GEN_FLUSH_AND_CLOSE (f);

  return true;
}


bool
gen_types_nodetype_h (yajl_val nodes, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "__TYPES_NODETYPE_H__",
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

  GEN_FOOTER (f, "__TYPES_NODETYPE_H__");
  GEN_FLUSH_AND_CLOSE (f);

  return true;
}


bool
gen_traverse_tables_h (yajl_val nodes, yajl_val traversals, const char *  fname)
{
  FILE *  f;
  GEN_OPEN_FILE (f, fname);
  GEN_HEADER (f, "__TRAVERSE_TABLES_H__",
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


  GEN_FOOTER (f, "__TRAVERSE_TABLES_H__");
  GEN_FLUSH_AND_CLOSE (f);

  return true;
}

