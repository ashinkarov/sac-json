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

The main file with actual AST description is `ast.json`.  The `nodeset.json`
defines "shortcut" names for groups of nodes used in the description of targets
in the `ast.json`.  The file `attrtype.json` defines a list of types that node
attributes can possibly have.

Nodesets
--------

The top level file must contain an object where keys are the names of the
nodesets.  Each nodeset is an array of strings, where each entry is a valid
node as defined by `ast.json`.

### Validation ###

   * Types of the json objects are as specified.
   * Each nodeset name corresponds to the following regexp:
     `[A-Z][a-zA-Z0-9_]*`.
   * Each nodeset array contains at least one element.
   * Each element in nodeset arrays are valid node names.
   * Nodeset names are unique.
   * Nodeset names are different from node names.


### Example ###

A typical nodeset entry looks as follows:


```
 "Interface": [
     "Import",
     "Export",
     "Use",
     "Provide"
 ]

```


Attribute types
---------------

The file at the top level contains an object where each key defines the name of
the attribute.  Each attribute is an object with the following fields:

   * `copy` (type string) specifies how to copy the attribute of the given
     type.  Allowed values are `literal`, `function` and `hash`.  `literal` attributes
     can be processed like basic C types (e.g. int).  `function` attributes
     require a copy function to be present.  `hash` attributes are references to
     to nodes in the tree and thus have to be processed using a hash table.

   * `ctype` (type string) C representation of the type.
   * `vtype` (type string) C type used in `va_arg` during the
     serialisation/deserialisation.  If not present, `ctype` is used.
   * `init` (type string) initial value.
   * `persist` (type boolean) specifies whether the attribute has to be stored
     and restored during serialisation.  Default value (or if the field is
     not present is _true_).

Mandatory fields are `copy`, `ctype` and `init`.


### Validation ###

   * Json types match the specification.
   * The name of the attribute type matches the regular expression
     `^[A-Z][a-zA-Z0-9_]*$`.
   * The name of the attribute type is unique.
   * Mandatory fields are present.
   * Only fields from the above list are present within attribute type objects.


### Example ###

A typical example for the attribute type looks like:

```
 "FileType": {
     "copy": "literal",
     "ctype": "file_type",
     "init": "FT_unknown"
 }, 
```


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

Each name of the traversal must correspond to the `^[A-Z][A-Z0-9]*$` regular expression,
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
   * None of the additional fields are allowed within traversal objects.
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
