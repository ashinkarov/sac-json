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
  GET_OUT_IF (!validate_ast (ast_node));

  /* TODO Files to generate:

     [x] ./types/types_trav.h.xsl
     [x] ./types/types_nodetype.h.xsl
     [x] ./tree/traverse_tables.h.xsl
     [x] ./tree/traverse_tables.c.xsl
     [x] ./tree/traverse_helper.c.xsl
     [x] ./tree/sons.h.xsl
     [x] ./tree/node_basic.h.xsl
     [x] ./tree/node_basic.c.xsl
     [x] ./tree/node_alloc.h.xsl
     [x] ./tree/free_node.h.xsl
     [x] ./tree/free_node.c.xsl
     [x] ./tree/free_attribs.h.xsl
     [x] ./tree/check_reset.h.xsl
     [x] ./tree/check_reset.c.xsl
     [x] ./tree/check_node.h.xsl
     [x] ./tree/check_node.c.xsl
     [x] ./tree/check.h.xsl
     [x] ./tree/check.c.xsl
     [x] ./tree/attribs.h.xsl
     [x] ./serialize/serialize_node.h.xsl
     [x] ./serialize/serialize_node.c.xsl
     [x] ./serialize/serialize_link.h.xsl
     [x] ./serialize/serialize_link.c.xsl
     [x] ./serialize/serialize_helper.c.xsl
     [x] ./serialize/serialize_buildstack.h.xsl
     [x] ./serialize/serialize_buildstack.c.xsl
     [x] ./serialize/serialize_attribs.h.xsl
     [x] ./global/node_info.mac.xsl  */

  gen_types_trav_h (traversal_node, "gen/types_trav.h");
  gen_types_nodetype_h (ast_node, "gen/types_nodetype.h");
  gen_traverse_tables_h (ast_node, traversal_node, "gen/traverse_tables.h");
  gen_traverse_tables_c (ast_node, traversal_node, "gen/traverse_tables.c");
  gen_traverse_helper_c (ast_node, "gen/traverse_helper.c");
  gen_sons_h (ast_node, "gen/sons.h");
  gen_node_info_mac (ast_node, "gen/node_info.mac");
  gen_free_node_h (ast_node, "gen/free_node.h");
  gen_attribs_h (ast_node, "gen/attribs.h");
  gen_node_alloc_h (ast_node, "gen/node_alloc.h");
  gen_node_basic_h (ast_node, "gen/node_basic.h");
  gen_free_attribs_h ("gen/free_attribs.h");
  gen_check_reset_h ("gen/check_reset.h");
  gen_check_node_h ("gen/check_node.h");
  gen_check_h ("gen/check.h");
  gen_node_basic_c (ast_node, nodeset_node, "gen/node_basic.c");
  gen_free_node_c (ast_node, "gen/free_node.c");
  gen_check_reset_c (ast_node, "gen/check_reset.c");
  gen_check_nodes_c (ast_node, "gen/check_node.c");
  gen_check_c (ast_node, nodeset_node, "gen/check.c");

  gen_serialize_attribs_h ("gen/serialize_attribs.h");
  gen_serialize_node_h ("gen/serialize_node.h");
  gen_serialize_link_h ("gen/serialize_link.h");
  gen_serialize_buildstack_h ("gen/serialize_buildstack.h");
  gen_serialize_node_c (ast_node, "gen/serialize_node.c");
  gen_serialize_link_c (ast_node, "gen/serialize_link.c");
  gen_serialize_helper_c (ast_node, "gen/serialize_helper.c");
  gen_serialize_buildstack_c (ast_node, "gen/serialize_buildstack.c");

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
