#include <stdbool.h>

#include <regex.h>
#include <yajl/yajl_tree.h>

#include "validator.h"
#include "validate-nodes.h"


/* Load the list of node names into NODE_NAMES structure and
   verify that:

      1. Top-level json in the ast.json is an object.
      2. Every node name is unique.
      3. Every node name matches the node_name regular expression.  */
bool
load_node_names (yajl_val ast, const char *  fname)
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
      struct node_name *  an;
      const char *  name = YAJL_OBJECT_KEYS (ast)[i];

      /* Check that the node name of the AST matcehs the RXP_NODE_NAME
         regular expression.  */
      if (!match_regexp (rxp_node_name, name))
        {
          json_err ("the node name `%s' doesn't match node regexp `%s'",
                      name, regexp_txt[rxp_node_name]);
          return false;
        }

      HASH_FIND_STR (node_names, name, an);
      if (!an)
        {
          an = malloc (sizeof (struct node_name));
          an->name = strdup (name);
          an->name_type = nnt_node;
          HASH_ADD_KEYPTR (hh, node_names, an->name,
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
void
node_names_free ()
{
  struct node_name *  an;
  struct node_name *  tmp;

  HASH_ITER (hh, node_names, an, tmp)
    {
      HASH_DEL (node_names, an);
      free (an->name);
      free (an);
    }
}

