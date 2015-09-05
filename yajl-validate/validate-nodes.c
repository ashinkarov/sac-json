#include <stdbool.h>
#include <stdio.h>
#include <err.h>

#include <regex.h>
#include <yajl/yajl_tree.h>

#include "ast-builder.h"
#include "validate-nodes.h"


static inline bool
node_field_allowed_p (const char *  x)
{
  return !strcmp (x, "description")
         || !strcmp (x, "sons")
         || !strcmp (x, "flags")
         || !strcmp (x, "attributes")
         || !strcmp (x, "checks");
}

static inline bool
attribute_field_allowed_p (const char *  x)
{
  return !strcmp (x, "description")
         || !strcmp (x, "inconstructor")
         || !strcmp (x, "type")
         || !strcmp (x, "targets")
         || !strcmp (x, "default");
}

static inline bool
son_field_allowed_p (const char *  x)
{
  return !strcmp (x, "description")
         || !strcmp (x, "targets")
         || !strcmp (x, "default");
}

static inline bool
flag_field_allowed_p (const char *  x)
{
  return !strcmp (x, "desc")
         || !strcmp (x, "default");
}

static inline bool
target_field_allowed_p (const char *  x)
{
  return !strcmp (x, "phases")
         || !strcmp (x, "contains")
         || !strcmp (x, "mandatory");
}



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
      ab_err ("top-level node of `%s' must be an object", fname);
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
          ab_err ("the node name `%s' doesn't match node regexp `%s'",
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
          ab_err ("the node name `%s' is specified more than once", name);
          return false;
        }
    }

  return true;
}

static inline bool
validate_description (const char *  node_name, const char *  text, const yajl_val desc)
{
  /* Check that description is of type array.  */
  if (desc && !YAJL_IS_ARRAY (desc))
    {
      ab_err ("`description' field %s of node `%s' must be an array of strings",
              text, node_name);
      return false;
    }

  for (size_t i = 0; desc && i < YAJL_ARRAY_LENGTH (desc); i++)
    if (!YAJL_IS_STRING (YAJL_ARRAY_VALUES (desc)[i]))
      {
        ab_err ("`description' field %s of node `%s' must be an array of strings",
                text, node_name);
        return false;
      }

  return true;
}


static inline bool
valid_range_p (const yajl_val phases)
{
  if (YAJL_OBJECT_LENGTH (phases) != 2)
    return false;

  const char *  key1 = YAJL_OBJECT_KEYS (phases)[0];
  const char *  key2 = YAJL_OBJECT_KEYS (phases)[1];

  if ((!strcmp (key1, "from") && !strcmp (key2, "to"))
      || (!strcmp (key1, "to") && !strcmp (key2, "from")))
    ;
  else
    return false;

  if (!YAJL_IS_STRING (YAJL_OBJECT_VALUES (phases)[0]))
    return false;

  if (!YAJL_IS_STRING (YAJL_OBJECT_VALUES (phases)[1]))
    return false;

  return true;
}


/* This is a function to validate the target object.

    SON_ATTR_NAME refers to either a son or an attribute that
                  contains the target.
    SON_P         is a flag that determines whether a target belongs
                  to a son.
    ARRAY_IDX     is a position of the target in the `targets` array,
                  counting from 1.  In case `targets` was specified as
                  an object, the value of ARRAY_IDX shall be 0.  */

static inline bool
validate_target (const char *  node_name, const char *  son_attr_name,
                 const yajl_val target, bool son_p, size_t array_idx)
{
  /* String we use for error messages: "(son|attribute) `<son-attr-name>'".  */
  char sa[strlen (son_attr_name) + 32];
  sprintf (sa, "%s `%s' ", son_p ? "son" : "attribute", son_attr_name);

  /* A string that contains either the number of the target in the array of
     targets or an empty string in case there was only one target.  */
  char tn[32] = {'\0'};
  if (array_idx > 0)
    sprintf (tn, "#%zu ", array_idx);


  /* Verify fields of the target object.  */
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (target); i++)
    {
      const char *  x = YAJL_OBJECT_KEYS (target)[i];
      if (!target_field_allowed_p (x))
        {
          ab_err ("`%s' field of the target %sof %sof the node `%s' is not allowed",
                  x, tn, sa, node_name);
          //return false;
        }
    }

  /* Check `phases' field of the target.  */
  const yajl_val phases = yajl_tree_get (target, (const char *[]){"phases", 0}, yajl_t_any);
  if (!phases)
    {
      ab_err ("the target %sof %sof the node `%s' does not have `phases' field",
              tn, sa, node_name);
      return false;
    }

  if (!YAJL_IS_STRING (phases) && !YAJL_IS_OBJECT (phases) && !YAJL_IS_ARRAY (phases))
    {
      ab_err ("the `phases' field of the target %sof %sof the node `%s' must be of "
              "type string, object or array", tn, sa, node_name);
      return false;
    }

  if (YAJL_IS_OBJECT (phases) && !valid_range_p (phases))
    {
      ab_err ("the `phases' field of the target %sof %sof the node `%s' "
              "define an invalid range", tn, sa, node_name);
      return false;
    }

  if (YAJL_IS_ARRAY (phases))
    for (size_t i = 0; i < YAJL_ARRAY_LENGTH (phases); i++)
      {
        const yajl_val x = YAJL_ARRAY_VALUES (phases)[i];

        if (!YAJL_IS_STRING (x) && !YAJL_IS_OBJECT (x))
          {
            ab_err ("the item #%zu of `phases' of the target %sof %sof the node `%s' "
                    "is not a string or an object", i+1, tn, sa, node_name);
            return false;
          }

        if (YAJL_IS_OBJECT (x) && !valid_range_p (x))
          {
            ab_err ("the item #%zu of `phases' of the target %sof %sof the node `%s' "
                    "specified invalid range", i+1, tn, sa, node_name);
            return false;
          }
      }

  /* Verify `contains'.  */
  const yajl_val contains = yajl_tree_get (target, (const char *[]){"contains", 0}, yajl_t_any);
  if (!contains)
    {
      ab_err ("the target %sof %sof the node `%s' does not have `contains' field",
              tn, sa, node_name);
      return false;
    }

  if (!YAJL_IS_STRING (contains) && !YAJL_IS_ARRAY (contains))
    {
      ab_err ("the `contains' field of the target %sof %sof the node `%s' must be of "
              "type string or array", tn, sa, node_name);
      return false;
    }

  if (YAJL_IS_STRING (contains))
    {
      const char *  x = YAJL_GET_STRING (contains);
      if (son_p && !strcmp (x, "any"))
        {
          ab_err ("the value of `contains' in the target %sof %sof the node `%s' must not "
                  "be `any'", tn, sa, node_name);
          return false;
        }
     
      /* Check that the value of the string is a node or a nodeset.  */
      struct node_name *  nn;
      HASH_FIND_STR (node_names, x, nn);
      if (!nn && strcmp (x, "any"))
        {
          ab_err ("the value `%s' of `contains' in the target %sof %sof the node `%s' is not "
                  "a valid node or nodeset", x, tn, sa, node_name);
          return false;
        }
    }

  if (YAJL_IS_ARRAY (contains))
    for (size_t i = 0; i < YAJL_ARRAY_LENGTH (contains); i++)
      if (!YAJL_IS_STRING (YAJL_ARRAY_VALUES (contains)[i]))
        {
          ab_err ("the value of the #%zu item in `contains' of the target %sof %sof the "
                  "node `%s' is not string", i+1, tn, sa, node_name);
          return false;
        }
      else
        {
          /* Check that the value of the string is a node or a nodeset.  */
          const char *  x = YAJL_GET_STRING (YAJL_ARRAY_VALUES (contains)[i]);
          struct node_name *  nn;
          HASH_FIND_STR (node_names, x, nn);
          if (!nn && strcmp (x, "any"))
            {
              ab_err ("the value `%s' of the #%zu item in `contains' of the target %sof %sof the "
                      "node `%s' is not a node or a nodeset", x, i+1, tn, sa, node_name);
              return false;
            }
        }

  /* Verify `mandatory'.  */
  const yajl_val mandatory = yajl_tree_get (target, (const char *[]){"mandatory", 0}, yajl_t_any);
  if (!mandatory)
    {
      ab_err ("the target %sof %sof the node `%s' does not have `mandatory' field",
              tn, sa, node_name);
      return false;
    }

  if (!YAJL_IS_TRUE (mandatory) && !YAJL_IS_FALSE (mandatory))
    {
      ab_err ("the `mandatory' of the target %sof %sof the node `%s' must be boolean",
              tn, sa, node_name);
      return false;
    }

  return true;
}


/* Check that in the array of targets there is no target that
   is specified for `all' phases.  */
static bool
target_all_speicified_once_p (const yajl_val targets, const char *  node_name,
                              const char *  son_attr_name, bool son_p)
{
  assert (YAJL_IS_ARRAY (targets));
  
  /* If this is an array of one element we don't care.  */
  if (YAJL_ARRAY_LENGTH (targets) == 1)
    return true;

  for (size_t i = 0; i < YAJL_ARRAY_LENGTH (targets); i++)
    {
      const yajl_val target = YAJL_ARRAY_VALUES (targets)[i];
      const yajl_val phases = yajl_tree_get (target, (const char *[]){"phases", 0}, yajl_t_any);
      const char *  x;
      if (phases && YAJL_IS_STRING (phases) && !strcmp (x=YAJL_GET_STRING (phases), "all"))
        {
          ab_err ("target #%zu of %s `%s' of node `%s' is specified for all phases, "
                  "but there are other targets for this son/attribute",
                  i+1, son_p ? "son" : "attribute", son_attr_name, node_name);
          return false;
        }
    }

  return true;
}


static bool
validate_attribute (const char *  node_name, const char *  attr_name, const yajl_val attribute)
{
  /* Verify fields of the attribute object.  */
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (attribute); i++)
    {
      const char *  x = YAJL_OBJECT_KEYS (attribute)[i];
      if (!attribute_field_allowed_p (x))
        {
          ab_err ("`%s' field of attribute `%s' of the node `%s' is not allowed",
                  x, attr_name, node_name);
          //return false;
        }
    }

  /* Check if description is of allowed type.  */
  const yajl_val desc = yajl_tree_get (attribute, (const char *[]){"description", 0}, yajl_t_any);
  if (desc)
    {
      char s[strlen (attr_name) + 32];
      sprintf (s, "of attribute `%s'", attr_name);
      if (!validate_description (node_name, s, desc))
        return false;
    }

  /* Check if inconstructor is boolean.  */
  const yajl_val incons = yajl_tree_get (attribute, (const char *[]){"inconstructor", 0}, yajl_t_any);
  if (incons && !YAJL_IS_TRUE (incons) && !YAJL_IS_FALSE (incons))
    {
      ab_err ("`inconstructor' field of attribute `%s' of node `%s' must be of type boolean",
              attr_name, node_name);
      return false;
    }

  /* Check that the type of the attribute is valid.  */
  const yajl_val type = yajl_tree_get (attribute, (const char *[]){"type", 0}, yajl_t_string);
  if (!type)
    {
      ab_err ("`type' field of attribute `%s' of node `%s' is mandatory and "
              "must be of type string", attr_name, node_name);
      return false;
    }

  /* Make sure that the type is valid.  */
  const char *  type_name = YAJL_GET_STRING (type);
  struct attrtype_name *  atn;

  HASH_FIND_STR (attrtype_names, type_name, atn);
  if (!atn)
    {
      ab_err ("invalid `type' value of attribute `%s' of node `%s'", attr_name, node_name);
      return false;
    }

  /* Check that the targets are present.  */
  const yajl_val targets = yajl_tree_get (attribute, (const char *[]){"targets", 0}, yajl_t_any);
  if (!targets)
    {
      ab_err ("attribute `%s' of node `%s' does not specify `targets'",
              attr_name, node_name);
      return false;
    }

  bool res = true;

  if (YAJL_IS_OBJECT (targets))
    res = res && validate_target (node_name, attr_name, targets, false, 0);
  else if (YAJL_IS_ARRAY (targets))
    {
      for (size_t i = 0; i < YAJL_ARRAY_LENGTH (targets); i++)
        res = res && validate_target (node_name, attr_name, YAJL_ARRAY_VALUES (targets)[i], false, i+1);
      
      res = res && target_all_speicified_once_p (targets, node_name, attr_name, false);
    }
  else
    {
      ab_err ("`targets' of attribute `%s' of node `%s' must be of type object or array",
              attr_name, node_name);
      return false;
    }

  return res;


  /* Check tahat `default' is of type string if present.  */
  const yajl_val def = yajl_tree_get (attribute, (const char *[]){"default", 0}, yajl_t_any);
  if (def && !YAJL_IS_STRING (def))
    {
      ab_err ("`default' field of attribute `%s' of node `%s' must be of type string",
              attr_name, node_name);
      return false;
    }

  return true;
}

static bool
validate_son (const char *  node_name, const char *  son_name, const yajl_val son)
{
  /* Verify fields of the attribute object.  */
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (son); i++)
    {
      const char *  x = YAJL_OBJECT_KEYS (son)[i];
      if (!son_field_allowed_p (x))
        {
          ab_err ("`%s' field of son `%s' of the node `%s' is not allowed",
                  x, son_name, node_name);
          //return false;
        }
    }

  /* Check if description is of allowed type.  */
  const yajl_val desc = yajl_tree_get (son, (const char *[]){"description", 0}, yajl_t_any);
  if (desc)
    {
      char s[strlen (son_name) + 32];
      sprintf (s, "of son `%s'", son_name);
      if (!validate_description (node_name, s, desc))
        return false;
    }

  /* Check tahat `default' is of type string if present.  */
  const yajl_val def = yajl_tree_get (son, (const char *[]){"default", 0}, yajl_t_any);
  if (def && !YAJL_IS_STRING (def))
    {
      ab_err ("`default' field of son `%s' of node `%s' must be of type string",
              son_name, node_name);
      return false;
    }

  const yajl_val targets = yajl_tree_get (son, (const char *[]){"targets", 0}, yajl_t_any);
  if (!targets)
    {
      ab_err ("son `%s' of node `%s' does not specify `targets'", son_name, node_name);
      return false;
    }

  bool res = true;

  if (YAJL_IS_OBJECT (targets))
    res = res && validate_target (node_name, son_name, targets, true, 0);
  else if (YAJL_IS_ARRAY (targets))
    {
      for (size_t i = 0; i < YAJL_ARRAY_LENGTH (targets); i++)
        res = res && validate_target (node_name, son_name, YAJL_ARRAY_VALUES (targets)[i], true, i);

      res = res && target_all_speicified_once_p (targets, node_name, son_name, true);
    }
  else
    {
      ab_err ("`targets' of son `%s' of node `%s' must be of type object or array",
              son_name, node_name);
      return false;
    }

  return res;
}


static bool
validate_flag (const char *  node_name, const char *  flag_name, const yajl_val flag)
{
  /* Verify fields of the attribute object.  */
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (flag); i++)
    {
      const char *  x = YAJL_OBJECT_KEYS (flag)[i];
      if (!flag_field_allowed_p (x))
        {
          ab_err ("`%s' field of flag `%s' of the node `%s' is not allowed",
                  x, flag_name, node_name);
          //return false;
        }
    }

  /* Check if description is of allowed type.  */
  const yajl_val desc = yajl_tree_get (flag, (const char *[]){"desc", 0}, yajl_t_any);
  if (desc)
    {
      char s[strlen (flag_name) + 32];
      sprintf (s, "of flag `%s'", flag_name);
      if (!validate_description (node_name, s, desc))
        return false;
    }

  /* Check tahat `default' is of type string if present.  */
  // FIXME make it boolean!
  const yajl_val def = yajl_tree_get (flag, (const char *[]){"default", 0}, yajl_t_any);
  if (def && !YAJL_IS_STRING (def))
    {
      ab_err ("`default' field of flag `%s' of node `%s' must be of type string",
              flag_name, node_name);
      return false;
    }

  return true;
}



bool
validate_ast (const yajl_val ast)
{
  for (size_t i = 0; i < YAJL_OBJECT_LENGTH (ast); i++)
    {
      const char *  name = YAJL_OBJECT_KEYS (ast)[i];
      const yajl_val node = YAJL_OBJECT_VALUES (ast)[i];

      /* Check that the node object contains only allowed attributes.  */
      for (size_t i = 0; i < YAJL_OBJECT_LENGTH (node); i++)
        {
          const char *  x = YAJL_OBJECT_KEYS (node)[i];
          if (!node_field_allowed_p (x))
            {
              ab_err ("non allowed field `%s' found in the ast node `%s'",
                      x, name);
              return false;
            }
        }

      const yajl_val description = yajl_tree_get (node, (const char *[]){"description", 0}, yajl_t_any);

      /* Check that description is present.  */
      if (!description)
        {
          //ab_err ("node `%s' does not specify mandatory field `description'", name);
          // FIXME turn this on when all the descriptions are fixed;
          //return false;
        }

      if (!validate_description (name, "", description))
        return false;


      const yajl_val attribs = yajl_tree_get (node, (const char *[]){"attributes", 0}, yajl_t_any);
      /* If attributes exist, check that they are of the right json type.  */
      if (attribs && !YAJL_IS_OBJECT (attribs))
        {
          ab_err ("`attributes` field of node `%s' must be of type object", name);
          return false;
        }

      for (size_t i = 0; attribs && i < YAJL_OBJECT_LENGTH (attribs); i++)
        {
          const char *  attrib_name = YAJL_OBJECT_KEYS (attribs)[i];
          const yajl_val attrib = YAJL_OBJECT_VALUES (attribs)[i];
          if (!validate_attribute (name, attrib_name, attrib))
            return false;
        }

      const yajl_val sons = yajl_tree_get (node, (const char *[]){"sons", 0}, yajl_t_any);
      /* If sons exist, check that they are of the right json type.  */
      if (sons && !YAJL_IS_OBJECT (sons))
        {
          ab_err ("`sons` field of node `%s' must be of type object", name);
          return false;
        }

      for (size_t i = 0; sons && i < YAJL_OBJECT_LENGTH (sons); i++)
        {
          const char *  son_name = YAJL_OBJECT_KEYS (sons)[i];
          const yajl_val son = YAJL_OBJECT_VALUES (sons)[i];
          if (!validate_son (name, son_name, son))
            return false;
        }

      const yajl_val flags = yajl_tree_get (node, (const char *[]){"flags", 0}, yajl_t_any);
      /* If flags exist, check that they are of the right json type.  */
      if (flags && !YAJL_IS_OBJECT (flags))
        {
          ab_err ("`flags` field of node `%s' must be of type object", name);
          return false;
        }

      for (size_t i = 0; flags && i < YAJL_OBJECT_LENGTH (flags); i++)
        {
          const char *  flag_name = YAJL_OBJECT_KEYS (flags)[i];
          const yajl_val flag = YAJL_OBJECT_VALUES (flags)[i];
          if (!validate_flag (name, flag_name, flag))
            return false;
        }

      const yajl_val checks = yajl_tree_get (node, (const char *[]){"checks", 0}, yajl_t_any);
      if (checks)
        if (!YAJL_IS_ARRAY (checks))
          {
            ab_err ("`checks' field of node `%s' must be of type array", name);
            return false;
          }

      for (size_t i = 0; checks && i < YAJL_ARRAY_LENGTH (checks); i++)
        if (!YAJL_IS_STRING (YAJL_ARRAY_VALUES (checks)[i]))
          {
            ab_err ("the item #%zu of `checks' in the node `%s' must be string",
                    i+1, name);
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

