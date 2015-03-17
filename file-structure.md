File structure of SaC JSON files
================================

A number of C files in SaC is generated from JSON configuration files.  This 
document describes a structure of these files, things that are validated and
the files that are generated so far.

Currently there are four JSON files:
    * `ast.json`
    * `attrtype.json`
    * `nodeset.json`
    * `traversals.json`

First three files define the structure of the AST and the last file defines
behaviour of every traversal used in `sac2c`.


AST-related JSON files
======================



Traversal-related JSON files
===========================

A traversal file at the top level is an object where each key is a name of the
traversal and the value is an object, describing a traversal.  For example:

```
{
    "TRAVX": { ... },
    "TRAVY": { ... },
    ...
}
```

Each name of the traversal must correspond to the `[A-Z][A-Z]*` regular expression,
and each traversal object must contain fields `name`, `default` and `include`.

Additionally a traversal may contain fields:

   * `travuser`
   * `traverror`
   * `travsons`
   * `travnone`
   * `ifndef`
   * `prefun`
   * `postfun`

For each traversal the generated file will contain a list of functions that will
be called for every node type during the recursive traversal of the AST.



The meaning of the fields are as follows:

   * `name` (type string) gives a short description for the traversal.
      Currently is not used outside the json file.

   * `include` (type string) specifies the include file that each traversal
      has to provide.  The verifier will check the existance of the file in
      `$SAC2CBASE/src/libsac2c/` unless it is one of the generated files.

   * `travsons` (type array of strings) specifies a list of nodes for which
     `TRAVsons` will be used.

   * `traverror` (type array of strings) specifies a list of nodes for which
      `TRAVerror` will be used.

   * `traverror` (type array of strings) specifies a list of nodes for which
      `TRAVerror` will be used.

   * `travuser` (type array of strings) specifies a list of nodes for which
      `<capital-trav-name><small-node-name>` will be used.

   * `default` (type string) specifies which function will be
      called for the nodes that are not specified in `travuser`, `traverror`,
      `travsons` or `travnone` lists.  The value of this field is either the
      name of the function or one of:

      * sons (expands to `TRAVsons`)
      * none (expands to `TRAVnone`)
      * error (expands to `TRAVerror`)
      * user (expands tp `<capital-traversal-name><small-node-name>`, e.g. TRAVXfundef).
    
   * `prefun` (type string) specifies a function that will be called before
      entering the traversal.
    
   * `postfun` (type string) specifies a function that will be called after
      the traversal.

   * `ifndef` (type string) specifies a macro name which will be used as
      an argument to `#ifdef` statement allowing to conditionalise traversal
      functions and pre/post functions.  In case the macro specified by the 
      `ifdef` filed is defined at the moment of compilation,
      the traversal functions will be generated as usual, otherwise pre and
      post functions will be ignored and `TRAVerror` will be called for every
      node type.

Validation
----------

   * The name of the traversal is matched against the regexp.
   * The types of the fields within the traversal object are checked.
   * None of the additional fileds are allowed within traversal objects.
   * The values of `travuser`, `traverror`, `travnone` and `travsons` must be
     valid names of the nodes as specified in `ast.json' and the lists cannot share
     the node.


Example
-------

A typical example of a traversal object looks like:

```
"ACTRAN": {
    "default": "sons",
    "include": "annotate_cond_transfers.h",
    "name": "Annoate memory transfers in conditional function",
    "travuser": [
        "Assign",
        "Fundef",
        "Prf",
        "Id",
        "Let",
        "Funcond"
    ]
}
```

Generated files
===============
   - ./types/types_trav.h.xsl
   - ./types/types_nodetype.h.xsl
   - ./tree/traverse_tables.h.xsl
   - ./tree/traverse_tables.c.xsl
   - ./tree/traverse_helper.c.xsl
   - ./tree/sons.h.xsl
   - ./tree/node_basic.h.xsl
   - ./tree/node_basic.c.xsl
   - ./tree/node_alloc.h.xsl
   - ./tree/free_node.h.xsl
   - ./tree/free_node.c.xsl
   - ./tree/free_attribs.h.xsl
   - ./tree/check_reset.h.xsl
   - ./tree/check_reset.c.xsl
   - ./tree/check_node.h.xsl
   - ./tree/check_node.c.xsl
   - ./tree/check.h.xsl
   - ./tree/check.c.xsl
   - ./tree/attribs.h.xsl
   - ./serialize/serialize_node.h.xsl
   - ./serialize/serialize_node.c.xsl
   - ./serialize/serialize_link.h.xsl
   - ./serialize/serialize_link.c.xsl
   - ./serialize/serialize_helper.c.xsl
   - ./serialize/serialize_buildstack.h.xsl
   - ./serialize/serialize_buildstack.c.xsl
   - ./serialize/serialize_attribs.h.xsl
   - ./global/node_info.mac.xsl

