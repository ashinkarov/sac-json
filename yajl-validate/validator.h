#ifndef __VALIDATOR_H__
#define __VALIDATOR_H__

#define err_func(name)                          \
    err (EXIT_FAILURE, "system call `" #name "' failed")

#define YAJL_OBJECT_LENGTH(v) ((v)->u.object.len)
#define YAJL_OBJECT_KEYS(v) ((v)->u.object.keys)
#define YAJL_OBJECT_VALUES(v) ((v)->u.object.values)


enum tree_regexps
{
  rxp_node_name,
  rxp_max
};


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
void json_err (const char *format, ...);


/* Parse json file TXT or print an error and return FALSE.  */
bool parse_json (const char *txt, yajl_val *t);


/* Read the file FNAME and return its content.  */
char * get_file_content (const char *fname);

#endif // __VALIDATOR_H__
