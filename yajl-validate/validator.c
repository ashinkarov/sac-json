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


/* ret
       1. The top-level json in the traversals is object
       2. The name of each traversal matches the RXP_TRAVERSAL_NAME regexp
       3. */
static bool
load_and_validate_traversals (yajl_val traversals, const char *  fname)
{
  /* The top-level AST has to be an object.  */
  if (!YAJL_IS_OBJECT (traversals))
    {
      json_err ("top-level node of `%s' must be an object", fname);
      return false;
    }

  /* Traverse all the nodes.  */
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (traversals); i++)
    {
      //struct traversal_name *  tn;
      const char *  name = YAJL_OBJECT_KEYS (traversals)[i];

      /* Check that the node name of the AST matcehs the RXP_NODE_NAME
         regular expression.  */
      if (!match_regexp (rxp_traversal_name, name))
        {
          json_err ("the traversal name `%s' doesn't match the regexp `%s'",
                     name, regexp_txt[rxp_traversal_name]);
          return false;
        }

       
      yajl_val traversal = YAJL_OBJECT_VALUES (traversals)[i];
      if (!YAJL_IS_OBJECT (traversal))
        {
          json_err ("traversal `%s' must be of json type object", name);
          return false;
        }

      /* Check that `default' of the traversal is valid.  */
      yajl_val xdefault = yajl_tree_get (traversal, (const char *[]){"default", 0}, yajl_t_string);
      if (!xdefault)
        {
          json_err ("traversal `%s' does not specify `default'", name);
          return false;
        }
      
      /* TODO Check that the include file exists.  */

      /* TODO Traverror, Travuser, Travnone, Travsons 
              contain nodes, and warn empty arrays.*/ 
      //printf ("%s\n", YAJL_GET_STRING (xdefault));
    }

  return true;
}


/* Free the ast node name  hash-table.  */
void
traversal_names_free ()
{
  struct traversal_name *  tn;
  struct traversal_name *  tmp;

  HASH_ITER (hh, traversal_names, tn, tmp)
    {
      HASH_DEL (traversal_names, tn);
      free (tn->name);
      free (tn);
    }
}





#define GET_OUT_IF(__expr)     \
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
