#include <stdbool.h>
#include <stdio.h>

#include <regex.h>
#include <yajl/yajl_tree.h>

//#include "uthash.h"
#include "validator.h"
#include "validate-traversals.h"


static inline bool
traversal_field_allowed_p (const char *  x)
{
  return !strcmp (x, "name")
         || !strcmp (x, "default")
         || !strcmp (x, "include")
         || !strcmp (x, "travuser")
         || !strcmp (x, "travsons")
         || !strcmp (x, "travnone")
         || !strcmp (x, "traverror")
         || !strcmp (x, "ifndef")
         || !strcmp (x, "prefun")
         || !strcmp (x, "postfun");
}


static inline bool
traversal_validate_nodes (yajl_val traversal, const char *  nodelist_name,
                          struct traversal_name *  tn, enum trav_node_type tnt)
{
  yajl_val trav_nodelist = yajl_tree_get (traversal, (const char *[]){nodelist_name, 0}, yajl_t_array);

  if (trav_nodelist && YAJL_ARRAY_LENGTH (trav_nodelist) == 0)
    {
      json_warn ("the array `%s' in the traversal `%s' is empty, consider removing it",
                 nodelist_name, tn->name);
      return true;
    }

  for (size_t i = 0; trav_nodelist && i < YAJL_ARRAY_LENGTH (trav_nodelist); i++)
    {
      struct traversal_node *  trn;
      char *  trav_node = YAJL_GET_STRING (YAJL_ARRAY_VALUES (trav_nodelist)[i]);

      if (!trav_node)
        {
          json_err ("the element %zu of travuser array of traversal `%s' is not a string",
                    i, tn->name);
          return false;
        }

      HASH_FIND_STR (tn->traversal_nodes, trav_node, trn);
      if (trn)
        {
          json_err ("%s node `%s' in the traversal `%s' has been already specified in `%s'",
                    nodelist_name, trn->name, tn->name, trav_node_type_name (trn->node_type));

          /* FIXME this should be turned on, as it is a real errror.  */
          //return false;
        }

      trn = malloc (sizeof *trn);
      trn->node_type = tnt;
      trn->name = strdup (trav_node);
      HASH_ADD_KEYPTR (hh, tn->traversal_nodes, trn->name, strlen (trn->name), trn);
    }

  return true;
}

/* FIXME write WHAT we are validating.

       1. The top-level json in the traversals is object
       2. The name of each traversal matches the RXP_TRAVERSAL_NAME regexp
       3. */
bool
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
      struct traversal_name *  tn;
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

      /* Check that the object contains only allowed fields.  */
      for (size_t i = 0; i < YAJL_OBJECT_LENGTH (traversal); i++)
        {
          const char *  x = YAJL_OBJECT_KEYS (traversal)[i];
          if (!traversal_field_allowed_p (x))
            {
              json_err ("traversal `%s' contains unallowed field `%s'",
                        name, x);
              return false;
            }
        }

      /* Check that `default' of the traversal is valid.  */
      yajl_val xdefault = yajl_tree_get (traversal, (const char *[]){"default", 0}, yajl_t_string);
      if (!xdefault)
        {
          json_err ("traversal `%s' does not specify `default'", name);
          return false;
        }

      yajl_val include = yajl_tree_get (traversal, (const char *[]){"include", 0}, yajl_t_string);
      if (!include)
        {
          json_err ("traversal `%s' does not specify `include'", name);
          return false;
        }

      /* TODO obtain path to the sac2c externally.  */
      const char *  sac2cbase;
      if (!(sac2cbase = getenv ("SAC2CBASE")))
        {
          json_err ("SAC2CBASE shell variable is not defined");
          return false;
        }

      const char *  p = "/src/libsac2c";
      char path[strlen (sac2cbase) + strlen (p) + 1];
      sprintf (path, "%s%s", sac2cbase, p);

      /* Check that the include file exists.  */
      if (!find_file (path, YAJL_GET_STRING (include)))
        {
          json_err ("file `%s' included in the traversal `%s' not found",
                    YAJL_GET_STRING (include), name);

          /* FIXME exclude auto-generated files and turn this check on.  */
          //return false;
        }

      HASH_FIND_STR (traversal_names, name, tn);
      if (tn)
        {
          json_err ("traversal `%s' is specified more than once", name);
          return false;
        }

      tn = malloc (sizeof *tn);
      tn->traversal_nodes = NULL;
      tn->name = strdup (name);

      HASH_ADD_KEYPTR (hh, traversal_names, tn->name, strlen (tn->name), tn);

      if (!traversal_validate_nodes (traversal, "travuser", tn, tnt_user))
        return false;
      if (!traversal_validate_nodes (traversal, "traverror", tn, tnt_error))
        return false;
      if (!traversal_validate_nodes (traversal, "travnone", tn, tnt_none))
        return false;
      if (!traversal_validate_nodes (traversal, "travsons", tn, tnt_sons))
        return false;
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
      struct traversal_node *  trn;
      struct traversal_node *  tmp1;

      HASH_ITER (hh, tn->traversal_nodes, trn, tmp1)
        {
          HASH_DEL (tn->traversal_nodes, trn);
          free (trn->name);
          free (trn);
        }

      HASH_DEL (traversal_names, tn);
      free (tn->name);
      free (tn);
    }
}


