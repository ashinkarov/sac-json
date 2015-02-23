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
      const yajl_val attrtype = YAJL_OBJECT_VALUES (attrtypes)[i];

      /* Check that the node name of the AST matcehs the RXP_ATTRTYPE_NAME
         regular expression.  */
      if (!match_regexp (rxp_node_name, name))
        {
          json_err ("the attribute type name `%s' doesn't match the regexp `%s'",
                    name, regexp_txt[rxp_attrtype_name]);
          return false;
        }

      /* Check that the node is unique.  */
      HASH_FIND_STR (attrtype_names, name, atn);
      if (atn)
        {
          json_err ("the node name `%s' is specified more than once", name);
          return false;
        }

      const yajl_val copy = yajl_tree_get (attrtype, (const char *[]){"copy", 0}, yajl_t_string);
      const yajl_val ctype = yajl_tree_get (attrtype, (const char *[]){"ctype", 0}, yajl_t_string);
      const yajl_val init = yajl_tree_get (attrtype, (const char *[]){"init", 0}, yajl_t_string);
    
      /* Check that the `copy' attribute exists.  */
      enum attrtype_copy_type copy_type;
      if (!copy)
        {
          json_err ("attrtype `%s' does not have `copy' tag", name);
          return false;
        }

      const char *  copy_val = YAJL_GET_STRING (copy);
      /* Check that `copy' tag is either "function" or "literal" or "hash".  */
      if (!strcmp (copy_val, "function"))
        copy_type = act_function;
      else if (!strcmp (copy_val, "literal"))
        copy_type = act_literal;
      else if (!strcmp (copy_val, "hash"))
        copy_type = act_hash;
      else
        {
          json_err ("attrtype `%s' copy attribute contains invalid value `%s';"
                    "allowed values are: `function', `hash' or `literal'",
                    name, YAJL_GET_STRING (copy));
          return false;
        }

      /* Check that ctype exists.  */
      if (!ctype)
        {
          json_err ("attrtype `%s' does not contain `ctype' tag", name);
          return false;
        }
      const char *  ctype_name = YAJL_GET_STRING (ctype);

      /* Check that `init' exists.  */
      if (!init)
        {
          json_err ("attrtype `%s' does not contain `init' tag", name);
          return false;
        }     
      const char *  init_name = YAJL_GET_STRING (init);

      assert (name && ctype_name && init_name);
      atn = malloc (sizeof *atn);
      atn->name = strdup (name);
      atn->copy_type = copy_type;
      atn->ctype = strdup (ctype_name);
      atn->init = strdup (init_name);
      HASH_ADD_KEYPTR (hh, attrtype_names, atn->name,
                       strlen (atn->name), atn);
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
      free (atn->init);
      free (atn->ctype);
      free (atn);
    }
}

