#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <stdarg.h>

#include <sys/types.h>
#include <sys/stat.h>

#include <regex.h>
#include <yajl/yajl_tree.h>

#include "validator.h"


const char *regexp_txt[] = {
  [rxp_node_name] = "[A-Z][a-zA-Z0-9_]*",
  [rxp_attrtype_name] = "[A-Z][a-zA-Z0-9_]"
};


/* This is a list where we keep compiler regular expressions.  */
regex_t regexps[rxp_max];




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
load_ast_node_names (yajl_val ast, const char *  fname)
{
  /* The top-level AST has to be an object.  */
  if (!YAJL_IS_OBJECT (ast))
    {
      json_err ("top-level node of `%s' must be an object", fname);
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
          an->name_type = nnt_node;
          HASH_ADD_KEYPTR (hh, ast_node_names, an->name,
                           strlen (an->name), an);
        }
      else
        {
          json_err ("the node name `%s' is specified more than once", name);
          return false;
        }
    }

  return true;
}


/* Loads names of the nodesets into the AST_NODE_NAMES hash table and
   checks that:

      1. The top-level json in the nodesets is an object.
      2. Nodeset names are different from the existing names in the
         AST_NODE_NAMES table.
      3. Checks that the name matches RXP_NODE_NAME regular expression.
      4. Checks that json type of each nodeset is an array.
      5. Checks that each value of this array is a node name from
         the AST_NODE_NAMES where NAME_TYPE is NNT_NODE.  */
static bool
load_and_validate_nodesets (yajl_val nodesets, const char *  fname)
{
  /* The top-level AST has to be an object.  */
  if (!YAJL_IS_OBJECT (nodesets))
    {
      json_err ("top-level node of `%s' must be an object", fname);
      return false;
    }

  /* Traverse all the nodes.  */
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (nodesets); i++)
    {
      struct ast_node_name *  an;
      const char *  name = YAJL_OBJECT_KEYS (nodesets)[i];

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
          yajl_val nodes = YAJL_OBJECT_VALUES (nodesets)[i];

          /* The definiton of the nodeset is of type ARRAY.  */
          if (!YAJL_IS_ARRAY (nodes))
            {
              json_err ("json value of the key `%s' in the file `%s' "
                        "must be of type array", name, fname);
              return false;
            }

          /* Check that evry value can be found in the hash table and
             that its NAME_TYPE is NNT_NODE.  */
          for (size_t i = 0; i < YAJL_ARRAY_LENGTH (nodes); i++)
            {
              struct ast_node_name *  n;
              yajl_val nname = YAJL_ARRAY_VALUES (nodes)[i];

              if (!YAJL_IS_STRING (nname))
                {
                  json_err ("json value in the node definition of the"
                            "nodeset `%s' at the position %zu must be"
                            "of type string", name, i);
                  return false;
                }

              HASH_FIND_STR (ast_node_names,  YAJL_STRING_VALUE (nname), n);
              if (!n)
                {
                  json_err ("invalid node `%s' in the definition of nodeset `%s'",
                            YAJL_STRING_VALUE (nname), name);
                  return false;
                }

              if (n->name_type != nnt_node)
                {
                  json_err ("the nodeset `%s' contains definition of `%s', which "
                            "is not an ast node", name, YAJL_STRING_VALUE (nname));
                  return false;
                }
            }

          an = malloc (sizeof (struct ast_node_name));
          an->name = strdup (name);
          an->name_type = nnt_nodeset;
          HASH_ADD_KEYPTR (hh, ast_node_names, an->name,
                           strlen (an->name), an);
        }
      else
        {
          json_err ("the node name `%s' is specified more than once", name);
          return false;
        }
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

/* Free the ast node name  hash-table.  */
static void
attrype_names_free ()
{
  struct attrtype_name *  atn;
  struct attrtype_name *  tmp;

  HASH_ITER (hh, attrtype_names, atn, tmp)
    {
      HASH_DEL (attrtype_names, atn);
      free (atn->name);
      free (atn);
    }
}



static bool
load_attrtype_names (yajl_val attrtypes, const char *  fname)
{
  /* The top-level AST has to be an object.  */
  if (!YAJL_IS_OBJECT (attrtypes))
    {
      json_err ("top-level node of `%s' must be an object", fname);
      return false;
    }

  /* Traverse all the nodes.  */
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (attrtypes); i++)
    {
      struct attrtype_name *  atn;
      const char *  name = YAJL_OBJECT_KEYS (attrtypes)[i];

      /* Check that the node name of the AST matcehs the RXP_ATTRTYPE_NAME
         regular expression.  */
      if (!match_regexp (rxp_node_name, name))
        {
          json_err ("the attribute type name `%s' doesn't match the regexp `%s'",
                      name, regexp_txt[rxp_attrtype_name]);
          return false;
        }

      HASH_FIND_STR (attrtype_names, name, atn);
      if (!atn)
        {
          atn = malloc (sizeof (struct ast_node_name));
          atn->name = strdup (name);
          HASH_ADD_KEYPTR (hh, attrtype_names, atn->name,
                           strlen (atn->name), atn);
        }
      else
        {
          json_err ("the node name `%s' is specified more than once", name);
          return false;
        }
    }

  return true;
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
  GET_OUT_IF (!load_ast_node_names (ast_node, ast_fname));
  GET_OUT_IF (!load_attrtype_names (attrtype_node, attrtype_fname));
  GET_OUT_IF (!load_and_validate_nodesets (nodeset_node, nodeset_fname));

  /*struct ast_node_name *  an;
  struct ast_node_name *  tmp;
  HASH_ITER (hh, ast_node_names, an, tmp)
    printf ("-- %s [%s]\n", an->name, an->name_type == nnt_node ? "node" : "nodeset"); */


out:
  yajl_tree_free (ast_node);
  yajl_tree_free (attrtype_node);
  yajl_tree_free (nodeset_node);
  yajl_tree_free (traversal_node);
  ast_node_names_free ();
  attrype_names_free ();
  free_regexps ();
  return ret;
}
