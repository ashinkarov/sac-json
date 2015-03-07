Intorduction
============

In the [SaC](http://www.sac-home.org/) codebase a number of `*.c` and `*.h` files are
generated automatically using XSLT transformations and the `ast.xml` file which
describes the internal structure of the AST and traversals as well as criteria
for their internal consistency.  

Currently the structure of `ast.xml` is nowhere documented, and most importantly, is not
checked for consistency.  Also, the XSLT-based file generation is slow.

The purpose of this project is to:
  * introduced [JSON](http://json.org/)-based configuration files that would replace `ast.xml`
  * document the format of the configuration files
  * write a fast validator that will check consistency of the configuration files
  * replace XSLT-based generation with faster and cleaner C99-based.
  

If the project will be successful, then we will get a verified and fast source file generation
in a more compact and simpler format, without dependencies on `xsltproc` and `indent`.
This might enable us to:
  * add more JSON-based configuration files, for example:
    * replacing `prf_info.mac` as it got too complex for a header file
    * unifying options and flags in a single config file
    * `types_info.mac`?
  * Replace existing serialisation facilities by those that producing JSON files.  That 
    should save compilation time, as we won't need to compile tree files anymore.  Also,
    given that such a serialisation can happen in the middle of the compilation, it will
    be possible to restart the compilation with a potentially modified AST.
    This opens up a great potential for experiments and debugging.


Progress
========

The migration plan includes:
  - [x] Converting `xml.ast' into `*.json'
  - [x] Writing a validator for `*.json'
  - [ ] Documenting the structure of `*.json' files
  - [ ] Porting the HTML page (partially done)
  - [ ] Porting the existing XSLT files
   - [x] ./types/types_trav.h.xsl
   - [x] ./types/types_nodetype.h.xsl
   - [x] ./tree/traverse_tables.h.xsl
   - [x] ./tree/traverse_tables.c.xsl
   - [x] ./tree/traverse_helper.c.xsl
   - [x] ./tree/sons.h.xsl
   - [x] ./tree/node_basic.h.xsl
   - [x] ./tree/node_basic.c.xsl
   - [x] ./tree/node_alloc.h.xsl
   - [x] ./tree/free_node.h.xsl
   - [x] ./tree/free_node.c.xsl
   - [x] ./tree/free_attribs.h.xsl
   - [x] ./tree/check_reset.h.xsl
   - [x] ./tree/check_reset.c.xsl
   - [x] ./tree/check_node.h.xsl
   - [x] ./tree/check_node.c.xsl
   - [x] ./tree/check.h.xsl
   - [x] ./tree/check.c.xsl
   - [x] ./tree/attribs.h.xsl
   - [x] ./serialize/serialize_node.h.xsl
   - [ ] ./serialize/serialize_node.c.xsl
   - [x] ./serialize/serialize_link.h.xsl
   - [ ] ./serialize/serialize_link.c.xsl
   - [ ] ./serialize/serialize_helper.c.xsl
   - [x] ./serialize/serialize_buildstack.h.xsl
   - [ ] ./serialize/serialize_buildstack.c.xsl
   - [x] ./serialize/serialize_attribs.h.xsl
   - [x] ./global/node_info.mac.xsl
  - [ ] Replacing serialisation with json-based conversions
  - [ ] Introducing dump/restore at every phase.


Structure of the code
=====================

  * The `ast.xml' is the current XML-based description of the AST.
  * `*.py' are scripts to convert XML to JSON and do some cleanup.
  * The validation and code generation are in `yajl-validate`.
  * The HTML page is in the `html' directory.


Performance
===========

Currently the validation with large number of checks takes `0.2` seconds
versus `28.4` taken by the XML/XSLT.

```bash
time (for f in $(find src/libsac2c -name '*.c.xsl' -or -name '*.h.xsl' -or -name '*.mac.xsl'); do \
         xsltproc $f src/libsac2c/xml/ast.xml | indent > "/tmp/x" ; done)
```
