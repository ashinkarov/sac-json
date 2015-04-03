#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <stdarg.h>
#include <err.h>
#include <fcntl.h>
#include <dirent.h>  
#include <unistd.h>
#include <limits.h>
#include <errno.h>

#include <sys/types.h>
#include <sys/stat.h>

#include <regex.h>
#include <yajl/yajl_tree.h>
#include <yajl/yajl_parse.h>

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

void
json_warn (const char *format, ...)
{
  va_list args;

  fprintf (stderr, "json-warning: ");
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
  size_t txt_len = strlen (txt);

  /* This is a workaround of a bug in the yajl library to show the
     correct position in the error message produced by the library.
     In case this is fixed in yajl, one should avoid double parsing
     and pring the error message produced by yajl_tree_parse.  */
  yajl_status stat;
  yajl_handle hand = yajl_alloc(NULL, NULL, NULL);
  stat = yajl_parse(hand, (const unsigned char *)txt, txt_len);

  if (stat != yajl_status_ok)
    {
      unsigned char * str;
      str = yajl_get_error(hand, 1, (const unsigned char *) txt, txt_len);
      json_err ("%s", (const char *) str);
      yajl_free_error(hand, str);
      yajl_free (hand);
      return false;
    }
  else
    yajl_free (hand);

  *t = yajl_tree_parse ((const char *)txt, errbuf, sizeof (errbuf));

  assert (*t != NULL); 
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
    {
      warn ("failed to open `%s'", fname);
      return NULL;
    }


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


static char *
xgetcwd ()
{
  size_t size = PATH_MAX;

  while (true)
    {
      char *buffer = malloc (size);
      
      if (getcwd (buffer, size) == buffer)
        return buffer;
      
      free (buffer);
      
      if (errno != ERANGE)
        return 0;
      
      size *= 2;
    }
} 


static bool
_find_file (const char *  fname)
{
  DIR *  dir;
  struct dirent* entry;
  struct stat dir_stat;
  bool ret = false;

  if (!(dir = opendir (".")))
    err_func (opendir);

  while ((entry = readdir (dir)))
    {
      if (-1 == stat (entry->d_name, &dir_stat))
        err_func (stat);

      if (!strcmp (entry->d_name, ".") || !strcmp (entry->d_name, ".."))
        continue;
      
      if (!S_ISDIR (dir_stat.st_mode))
        {
          if (!strcmp (entry->d_name, fname))
            {
              ret = true;
              goto out;
            }
        }
      else
        {
          bool found;

          chdir (entry->d_name);
          found = _find_file (fname);
          chdir ("..");
          
          if (found)
            {
              ret = true;
              goto out;
            }
        }
    }

out:
  closedir (dir);
  return ret;
}

bool
find_file (const char *  dirname, const char *  fname)
{
  char *  cwd = xgetcwd ();
  bool res;

  chdir (dirname);
  res = _find_file (fname);
  chdir (cwd);
  free (cwd);
  return res;
}
