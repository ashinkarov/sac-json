#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <stdarg.h>

#include <sys/types.h>
#include <sys/stat.h>

#include <regex.h>
#include <yajl/yajl_tree.h>

#include "validator.h"


/* Compiler a regular expression or output an error to stderr in
   case of failure.  Returns TRUE when regular expression is compiled
   successfully or FALSE otherwise.  */
static bool
compile_regexp (regex_t *r, const char *regex_text)
{
  int status = regcomp (r, regex_text, REG_EXTENDED);
  if (status != 0)
    {
      char error_message[BUFSIZ];
      regerror (status, r, error_message, BUFSIZ);
      fprintf (stderr, "failed to compiler regex '%s': %s\n",
               regex_text, error_message);
      return false;
    }

  return true;
}


void
init_regexps ()
{
  for (size_t i = 0; i < rxp_max; i++)
    compile_regexp (&regexps[i], regexp_txt[i]);
}


void
free_regexps ()
{
  for (size_t i = 0; i < rxp_max; i++)
    regfree (&regexps[i]);
}


bool
match_regexp (enum tree_regexps r, const char *txt)
{
  return REG_NOMATCH != regexec (&regexps[r], txt, 0, NULL, 0);
}


void
json_err (const char *format, ...)
{
  va_list args;

  fprintf (stderr, "json-error: ");
  va_start (args, format);
  vfprintf (stderr, format, args);
  va_end (args);
  fprintf (stderr, "\n");
  fflush (stderr);
}


bool
parse_json (const char *txt, yajl_val *t)
{
  char errbuf[BUFSIZ];

  *t = yajl_tree_parse((const char *)txt, errbuf, sizeof (errbuf));

  if (*t == NULL)
    {
      json_err ("%s", errbuf);
      return false;
    }

  return true;
}


char *
get_file_content (const char *fname)
{
  char *buf = NULL;
  char *bufp;

  struct stat st;
  size_t bufsz, cursz, curpos;
  ssize_t ssz;

  int fd;

  /* Open the file.  */
  if (-1 == (fd = open (fname, O_RDONLY)))
    err_func (open);

  /* Get FD status information.  */
  if (0 != fstat (fd, &st))
    err_func (fstat);

  bufsz = (size_t) st.st_blksize;

  buf = (char *) malloc (bufsz);
  curpos = 0;
  cursz = bufsz;

  while ((ssz = read (fd, buf + curpos, bufsz)) > 0)
    {
      curpos += ssz;
      cursz = curpos + bufsz;
      if (NULL == (bufp = (char *) realloc (buf, cursz)))
        err_func (realloc);

      buf = bufp;
    }

  buf[curpos] = 0;
  close (fd);
  return buf;
}

