#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <getopt.h>

#include <sys/types.h>
#include <sys/stat.h>

#include <regex.h>
#include <yajl/yajl_tree.h>

#include "validator.h"
#include "validate-nodes.h"
#include "validate-attrtypes.h"
#include "validate-nodesets.h"
#include "validate-traversals.h"

#include "gen.h"


const char *regexp_txt[] = {
  [rxp_node_name] = "^[A-Z][a-zA-Z0-9_]*$",
  [rxp_attrtype_name] = "^[A-Z][a-zA-Z0-9_]*$",
  [rxp_traversal_name] = "^[A-Z][A-Z0-9]*$"
};


/* This is a list where we keep compiler regular expressions.  */
regex_t regexps[rxp_max];



/* A hash table of the node-names in the ast.  */
struct node_name *  node_names = NULL;


/* A hash table of the attribute types in the ast.  */
struct attrtype_name *  attrtype_names = NULL;


/* A hash table of the traversal names.  */
struct traversal_name *  traversal_names = NULL;


/* Path to sac2c sources.  */
char *  sac2cbase = NULL;


/* Path of each file in sac2c source tree.  */
char *gen_file_pathes[] =
{
  [f_types_trav_h] =           "types/types_trav.h",
  [f_types_nodetype_h] =       "types/types_nodetype.h",
  [f_traverse_tables_h] =      "tree/traverse_tables.h",
  [f_traverse_tables_c] =      "tree/traverse_tables.c",
  [f_traverse_helper_c] =      "tree/traverse_helper.c",
  [f_sons_h] =                 "tree/sons.h",
  [f_node_info_mac] =          "global/node_info.mac",
  [f_free_node_h] =            "tree/free_node.h",
  [f_attribs_h] =              "tree/attribs.h",
  [f_node_alloc_h] =           "tree/node_alloc.h",
  [f_node_basic_h] =           "tree/node_basic.h",
  [f_free_attribs_h] =         "tree/free_attribs.h",
  [f_check_reset_h] =          "tree/check_reset.h",
  [f_check_node_h] =           "tree/check_node.h",
  [f_check_h] =                "tree/check.h",
  [f_node_basic_c] =           "tree/node_basic.c",
  [f_free_node_c] =            "tree/free_node.c",
  [f_check_reset_c] =          "tree/check_reset.c",
  [f_check_node_c] =           "tree/check_node.c",
  [f_check_c] =                "tree/check.c",
  [f_serialize_attribs_h] =    "serialize/serialize_attribs.h",
  [f_serialize_node_h] =       "serialize/serialize_node.h",
  [f_serialize_link_h] =       "serialize/serialize_link.h",
  [f_serialize_buildstack_h] = "serialize/serialize_buildstack.h",
  [f_serialize_node_c] =       "serialize/serialize_node.c",
  [f_serialize_link_c] =       "serialize/serialize_link.c",
  [f_serialize_helper_c] =     "serialize/serialize_helper.c",
  [f_serialize_buildstack_c] = "serialize/serialize_buildstack.c"
};

static yajl_val
get_yajl_tree_from_file (const char *  fname)
{
  char *  text = get_file_content (fname);
  yajl_val node;

  if (!text)
    return NULL;

  if (!parse_json (text, &node))
    node = NULL;

  free (text);
  return node;
}

#define GET_OUT_IF(__expr)    \
do {                          \
  if (__expr)                 \
    {                         \
      ret = EXIT_FAILURE;     \
      goto out;               \
    }                         \
} while (0)



static int
usage (const char *  prog_name)
{
  fprintf (stderr, "usage: %s [flags]\n"
                   "    --sac2cbase, -s  Set the location of sac2c.\n"
                   "    --help, -h       Print help message and exit.\n\n",
           prog_name);

  return EXIT_FAILURE;
}


static struct option long_options[] =
{
  {"sac2cbase", required_argument, NULL, 's'},
  {"help", no_argument, NULL, 'h'},
  {NULL, 0, NULL, 0}
};




int
main (int argc, char *argv[])
{
  const char *  prog_name = argv[0];
  int ch;

  while ((ch = getopt_long(argc, argv, "s:h", long_options, NULL)) != -1)
    switch (ch)
    {
    case 's':
      sac2cbase = strdup (optarg);
      break;

    case 'h':
      exit (usage (prog_name));

    case '?':
      break;

    default:
      abort ();
    }

  if (!sac2cbase && !getenv ("SAC2CBASE"))
    {
      json_err ("The location of sac2c is unknown");
      return EXIT_FAILURE;
    }
  else
    sac2cbase = strdup (getenv ("SAC2CBASE"));

  int ret = EXIT_SUCCESS;

  yajl_val ast_node = NULL;
  yajl_val nodeset_node = NULL;
  yajl_val attrtype_node = NULL;
  yajl_val traversal_node = NULL;

  const char ast_fname[] = "../ast-upd.json";
  const char attrtype_fname[] = "../attr-types.json";
  const char nodeset_fname[] = "../nodesets.json";
  const char traversal_fname[] = "../traversals.json";

  init_regexps ();

  GET_OUT_IF (NULL == (ast_node = get_yajl_tree_from_file (ast_fname)));
  GET_OUT_IF (NULL == (attrtype_node = get_yajl_tree_from_file (attrtype_fname)));
  GET_OUT_IF (NULL == (nodeset_node = get_yajl_tree_from_file (nodeset_fname)));
  GET_OUT_IF (NULL == (traversal_node = get_yajl_tree_from_file (traversal_fname)));
  GET_OUT_IF (!load_node_names (ast_node, ast_fname));
  GET_OUT_IF (!load_attrtype_names (attrtype_node, attrtype_fname));
  GET_OUT_IF (!load_and_validate_nodesets (nodeset_node, nodeset_fname));
  GET_OUT_IF (!load_and_validate_traversals (traversal_node, traversal_fname));
  GET_OUT_IF (!validate_ast (ast_node));

  /* Make a full path to each file including sac2cbase prefix.  */
  char *prefixed_pathes[f_max];

  for (size_t i = 0; i < f_max; i++)
    {
      const char *  p = "/src/libsac2c/";
      prefixed_pathes[i] = malloc (strlen (sac2cbase)
                                   + strlen (p)
                                   + strlen (gen_file_pathes[i])
                                   + 1);
      sprintf (prefixed_pathes[i], "%s%s%s", sac2cbase, p, gen_file_pathes[i]);
    }

#define PP(x) prefixed_pathes[x]

  gen_types_trav_h (traversal_node, PP (f_types_trav_h));
  gen_types_nodetype_h (ast_node, PP (f_types_nodetype_h));
  gen_traverse_tables_h (ast_node, traversal_node, PP (f_traverse_tables_h));
  gen_traverse_tables_c (ast_node, traversal_node, PP (f_traverse_tables_c));
  gen_traverse_helper_c (ast_node, PP (f_traverse_helper_c));
  gen_sons_h (ast_node, PP (f_sons_h));
  gen_node_info_mac (ast_node, PP (f_node_info_mac));
  gen_free_node_h (ast_node, PP (f_free_node_h));
  gen_attribs_h (ast_node, PP (f_attribs_h));
  gen_node_alloc_h (ast_node, PP (f_node_alloc_h));
  gen_node_basic_h (ast_node, PP (f_node_basic_h));
  gen_free_attribs_h (PP (f_free_attribs_h));
  gen_check_reset_h (PP (f_check_reset_h));
  gen_check_node_h (PP (f_check_node_h));
  gen_check_h (PP (f_check_h));
  gen_node_basic_c (ast_node, nodeset_node, PP (f_node_basic_c));
  gen_free_node_c (ast_node, PP (f_free_node_c));
  gen_check_reset_c (ast_node, PP (f_check_reset_c));
  gen_check_node_c (ast_node, PP (f_check_node_c));
  gen_check_c (ast_node, nodeset_node, PP (f_check_c));
  gen_serialize_attribs_h (PP (f_serialize_attribs_h));
  gen_serialize_node_h (PP (f_serialize_node_h));
  gen_serialize_link_h (PP (f_serialize_link_h));
  gen_serialize_buildstack_h (PP (f_serialize_buildstack_h));
  gen_serialize_node_c (ast_node, PP (f_serialize_node_c));
  gen_serialize_link_c (ast_node, PP (f_serialize_link_c));
  gen_serialize_helper_c (ast_node, PP (f_serialize_helper_c));
  gen_serialize_buildstack_c (ast_node, PP (f_serialize_buildstack_c));

#undef PP
  for (size_t i = 0; i < f_max; i++)
    free (prefixed_pathes[i]);

out:
  free (sac2cbase);
  yajl_tree_free (ast_node);
  yajl_tree_free (attrtype_node);
  yajl_tree_free (nodeset_node);
  yajl_tree_free (traversal_node);
  node_names_free ();
  attrype_names_free ();
  traversal_names_free ();
  free_regexps ();
  return ret;
}
