#include <stdbool.h>

#include <regex.h>
#include <yajl/yajl_tree.h>

#include "validator.h"
#include "validate-attrtypes.h"

bool
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
          atn = malloc (sizeof (struct node_name));
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


/* Free the ast node name  hash-table.  */
void
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

