#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <stdarg.h>

#include <sys/types.h>
#include <sys/stat.h>

#include <regex.h>
#include <yajl/yajl_tree.h>

#include "uthash.h"
#include "validator.h"


const char *regexp_txt[] = {
  [rxp_node_name] = "[A-Z][a-zA-Z0-9_]*",
};


/* This is a list where we keep compiler regular expressions.  */
regex_t regexps[rxp_max];


/* A structure for the hash table to store the ast node names.  */
struct ast_node_name
{
  char *  name;
  UT_hash_handle hh;
};


struct attrtype_name
{
  char *  name;
  UT_hash_handle hh;
};


/* A hash table of the node-names in the ast.  */
struct ast_node_name *  ast_node_names = NULL;


/* A hash table of the attribute types in the ast.  */
struct attrtype_name *  attrtype_names = NULL;


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

/* Load the list of node names into AST_NODE_NAMES structure and 
   verify that:

      1. Top-level json in the ast.json is an object.
      2. Every node name is unique.
      3. Every node name matches the node_name regular expression.  */
static bool
load_ast_node_names (yajl_val ast)
{
  /* The top-level AST has to be an object.  */
  if (!YAJL_IS_OBJECT (ast))
    {
      json_err ("top-level node of `%s' must be an object");
      return false;
    }

  /* Traverse all the nodes.  */
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (ast); i++)
    {
      struct ast_node_name *  an;
      const char *  name = YAJL_OBJECT_KEYS (ast)[i];

      /* Check that the node name of the AST matcehs the RXP_NODE_NAME
         regular expression.  */
      if (!match_regexp (rxp_node_name, name))
        {
          json_err ("the node name `%s' doesn't match node regexp `%s'",
                      name, regexp_txt[rxp_node_name]);
          return false;
        }

      HASH_FIND_STR (ast_node_names, name, an);
      if (!an)
        {
          an = malloc (sizeof (struct ast_node_name));
          an->name = strdup (name);
          HASH_ADD_KEYPTR (hh, ast_node_names, an->name,
                           strlen (an->name), an);
        }
      else
        {
          json_err ("the node name `%s' is specified more than once", name);
          return false;
        }

      printf ("-- %s\n", name);
    }

  return true;
}


/* Free the ast node name  hash-table.  */
static void
ast_node_names_free ()
{
  struct ast_node_name *  an;
  struct ast_node_name *  tmp;

  HASH_ITER (hh, ast_node_names, an, tmp)
    {
      HASH_DEL (ast_node_names, an);
      free (an->name);
      free (an);
    }
}

int
main (void)
{
  //../ast.json  ../attributes.json  ../nodesets.json  ../traversals.json
  int ret = EXIT_SUCCESS;

  yajl_val ast_node = NULL;
  yajl_val nodeset_node = NULL;
  yajl_val attrtypes_node = NULL;
  yajl_val traversals_node = NULL;

  init_regexps ();

  if (NULL == (ast_node = get_yajl_tree_from_file ("../ast-upd.json")))
    {
      ret = EXIT_FAILURE;
      goto out;
    }

  if (NULL == (attrtypes_node = get_yajl_tree_from_file ("../attr-types.json")))
    {
      ret = EXIT_FAILURE;
      goto out;
    }

  if (NULL == (nodeset_node = get_yajl_tree_from_file ("../nodesets.json")))
    {
      ret = EXIT_FAILURE;
      goto out;
    }

  if (NULL == (traversals_node = get_yajl_tree_from_file ("../traversals.json")))
    {
      ret = EXIT_FAILURE;
      goto out;
    }

  load_ast_node_names (ast_node);

out:
  yajl_tree_free (ast_node);
  yajl_tree_free (attrtypes_node);
  yajl_tree_free (nodeset_node);
  yajl_tree_free (traversals_node);
  ast_node_names_free ();
  free_regexps ();
  return ret;
}
