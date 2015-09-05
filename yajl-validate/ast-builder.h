#ifndef __VALIDATOR_H__
#define __VALIDATOR_H__

#include <assert.h>

#include "uthash.h"


#ifdef __GNUC__
#   define PRINTF_FORMAT(x, y)  __attribute__ ((format (printf, x, y)))
#else
#   define PRINTF_FORMAT(x, y)
#endif

#define err_func(name)                          \
    err (EXIT_FAILURE, "system call `" #name "' failed")

#define YAJL_OBJECT_LENGTH(v) ((v)->u.object.len)
#define YAJL_OBJECT_KEYS(v) ((v)->u.object.keys)
#define YAJL_OBJECT_VALUES(v) ((v)->u.object.values)
#define YAJL_ARRAY_LENGTH(v) ((v)->u.array.len)
#define YAJL_ARRAY_VALUES(v) ((v)->u.array.values)
#define YAJL_STRING_VALUE(v) ((v)->u.string)

enum file_names
{
  f_types_trav_h,
  f_types_nodetype_h,
  f_traverse_tables_h,
  f_traverse_tables_c,
  f_traverse_helper_c,
  f_sons_h,
  f_node_info_mac,
  f_free_node_h,
  f_attribs_h,
  f_node_alloc_h,
  f_node_basic_h,
  f_free_attribs_h,
  f_check_reset_h,
  f_check_node_h,
  f_check_h,
  f_node_basic_c,
  f_free_node_c,
  f_check_reset_c,
  f_check_node_c,
  f_check_c,
  f_serialize_attribs_h,
  f_serialize_node_h,
  f_serialize_link_h,
  f_serialize_buildstack_h,
  f_serialize_node_c,
  f_serialize_link_c,
  f_serialize_helper_c,
  f_serialize_buildstack_c,
  f_max
};

enum tree_regexps
{
  rxp_node_name,
  rxp_attrtype_name,
  rxp_traversal_name,
  rxp_max
};


enum ast_node_name_type
{
  nnt_node,
  nnt_nodeset
};

enum trav_node_type
{
  tnt_user,
  tnt_sons,
  tnt_error,
  tnt_none
};

static inline const char *
trav_node_type_name (enum trav_node_type n)
{
  switch (n)
    {
    case tnt_user:
      return "travuser";
    case tnt_sons:
      return "travsons";
    case tnt_error:
      return "traverror";
    case tnt_none:
      return "travnone";
    default:
      assert (false);
    }
}

static inline const char *
trav_node_type_fun_name (enum trav_node_type n)
{
  switch (n)
    {
    case tnt_user:
      return "TRAVuser";
    case tnt_sons:
      return "TRAVsons";
    case tnt_error:
      return "TRAVerror";
    case tnt_none:
      return "TRAVnone";
    default:
      assert (false);
    }
}


/* A structure for the hash table to store the ast node names.  */
struct node_name
{
  char *  name;
  enum ast_node_name_type name_type;
  UT_hash_handle hh;
};


enum attrtype_copy_type
{
  act_literal,
  act_function,
  act_hash
};

/* A structure for the hash table to store the attribute type names.  */
struct attrtype_name
{
  char *  name;
  enum attrtype_copy_type copy_type;
  char *  ctype;
  char *  vtype;
  char *  init;
  bool persist;
  UT_hash_handle hh;
};


struct traversal_node
{
  char *  name;
  enum trav_node_type node_type;
  UT_hash_handle hh;
};

/* A structure for the hash table to store the names of traversals.  */
struct traversal_name
{
  char *  name;
  struct traversal_node *  traversal_nodes;
  UT_hash_handle hh;
};

extern struct node_name *  node_names;
extern struct attrtype_name *  attrtype_names;
extern struct traversal_name *  traversal_names;
extern char *  sac2cbase;
extern const char *gen_file_pathes[];

/* A list of the regular expressions we might ever want to use
   during the validation.  We keep it in a list to avoid potential
   recompilation of the regular expression at every match.  */
extern const char *regexp_txt[];


/* This is a list where we keep compiler regular expressions.  */
extern regex_t regexps[];


/* Checks whether TXT matches the regular expression R from
   the REXPS list.  */
bool match_regexp (enum tree_regexps r, const char *txt);


/* Initialise the REXPS list --- compile all regular expressions.  */
void init_regexps ();


/* Free regular expressions from REXPS.  */
void free_regexps ();


/* Wrapper for printing errors on STDERR.  */
void ab_err (const char *format, ...) PRINTF_FORMAT (1, 2);


/* Wrapper for printing warnings on STDERR.  */
void ab_warn (const char *format, ...) PRINTF_FORMAT (1, 2);


/* Parse json file TXT or print an error and return FALSE.  */
bool parse_json (const char *txt, yajl_val *t);


/* Read the file FNAME and return its content.  */
char * get_file_content (const char *fname);

bool find_file (const char *  dirname, const char *  fname);

#endif // __VALIDATOR_H__
