#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
//#include <stdarg.h>

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
  [rxp_node_name] = "[A-Z][a-zA-Z0-9_]*",
  [rxp_attrtype_name] = "[A-Z][a-zA-Z0-9_]",
  [rxp_traversal_name] = "[A-Z][A-Z]*"
};


/* This is a list where we keep compiler regular expressions.  */
regex_t regexps[rxp_max];



/* A hash table of the node-names in the ast.  */
struct node_name *  node_names = NULL;


/* A hash table of the attribute types in the ast.  */
struct attrtype_name *  attrtype_names = NULL;


/* A hash table of the traversal names.  */
struct traversal_name *  traversal_names = NULL;


static yajl_val
get_yajl_tree_from_file (const char *  fname)
{
  char *  text = get_file_content (fname);
  yajl_val node;

  if (!text)
    return NULL;

  parse_json (text, &node);
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

int
main (void)
{
  //../ast.json  ../attributes.json  ../nodesets.json  ../traversals.json
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

  /* TODO Files to generate:

     [x] ./types/types_trav.h.xsl
     [x] ./types/types_nodetype.h.xsl
     [x] ./tree/traverse_tables.h.xsl
         ./tree/traverse_tables.c.xsl
         ./tree/traverse_helper.c.xsl
         ./tree/sons.h.xsl
         ./tree/node_basic.h.xsl
         ./tree/node_basic.c.xsl
         ./tree/node_alloc.h.xsl
         ./tree/free_node.h.xsl
         ./tree/free_node.c.xsl
         ./tree/free_attribs.h.xsl
         ./tree/check_reset.h.xsl
         ./tree/check_reset.c.xsl
         ./tree/check_node.h.xsl
         ./tree/check_node.c.xsl
         ./tree/check.h.xsl
         ./tree/check.c.xsl
         ./tree/attribs.h.xsl
         ./serialize/serialize_node.h.xsl
         ./serialize/serialize_node.c.xsl
         ./serialize/serialize_link.h.xsl
         ./serialize/serialize_link.c.xsl
         ./serialize/serialize_helper.c.xsl
         ./serialize/serialize_buildstack.h.xsl
         ./serialize/serialize_buildstack.c.xsl
         ./serialize/serialize_attribs.h.xsl
         ./global/node_info.mac.xsl  */

  gen_types_trav_h (traversal_node, "gen/types_trav.h");
  gen_types_nodetype_h (ast_node, "gen/types_nodetype.h");
  gen_traverse_tables_h (ast_node, traversal_node, "gen/traverse_tables.h");

  /*struct node_name *  an;
  struct node_name *  tmp;
  HASH_ITER (hh, node_names, an, tmp)
    printf ("-- %s [%s]\n", an->name, an->name_type == nnt_node ? "node" : "nodeset"); */


out:
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