#include <stdbool.h>

#include <regex.h>
#include <yajl/yajl_tree.h>

#include "validator.h"
#include "validate-nodesets.h"


/* Loads names of the nodesets into the NODE_NAMES, with the assumption
   that NODE_NAMES contains names of the nodes already, and checks that:

      1. The top-level json in the nodesets is an object.
      2. Nodeset names are different from the existing names in the
         NODE_NAMES table.
      3. Checks that the name matches RXP_NODE_NAME regular expression.
      4. Checks that json type of each nodeset is an array.
      5. Checks that each value of this array is a node name from
         the NODE_NAMES where NAME_TYPE is NNT_NODE.  */
bool
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
      struct node_name *  an;
      const char *  name = YAJL_OBJECT_KEYS (nodesets)[i];

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
              struct node_name *  n;
              yajl_val nname = YAJL_ARRAY_VALUES (nodes)[i];

              if (!YAJL_IS_STRING (nname))
                {
                  json_err ("json value in the node definition of the"
                            "nodeset `%s' at the position %zu must be"
                            "of type string", name, i);
                  return false;
                }

              HASH_FIND_STR (node_names,  YAJL_STRING_VALUE (nname), n);
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

          an = malloc (sizeof (struct node_name));
          an->name = strdup (name);
          an->name_type = nnt_nodeset;
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
