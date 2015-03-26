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


```json
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

```json
"FileType": {
    "copy": "literal",
    "ctype": "file_type",
    "init": "FT_unknown"
}
```


Abstract Syntax Tree
--------------------

The `ast.json` file at the top level is an object where every key is the name of
a node.  Every node is an object that may contain the following fields:

   * `description` (type: array of string) specifies the purpose of the node.
   * `sons` (type: object) specifies fields of the node of type `node *`.
   * `attributes` (type: object) specifies fields of the node of varying types.
   * `flags` (type: object) specifies fields of the node of type boolean.
   * `checks` (type: array of strings) specifies a list of functions that will
     be called in `check.c` for the given node type during the checking of node
     consistency.  Each function has to have one parameter of type `node *` and
     return `node *`.  The generated check for the function foo will look like:
     
     ```C
     xnode = foo  (xnode);
     ```

Only `description` is mandatory.  Sons, attributes and flags are of type object,
where every key specifies a son or an attribute or a flag accordingly.  A son,
an attribute or a flag are of json type object.

### Son structure ###

A son object may contain fields:

   * `description` (type: array of strings) explains the purpose of the son.
   * `targets` (type: object or array) specifies possible values that the son may contain
     during a given phase of compilation.
   * `default` (type: string) specifies initial value when constructing the
     node via `TBmake` function.  The absence of this field implies that
     the son will be passed via the arguments of the `TBmake` function.

### Attribute structure ###

An attribute object contains fields:

   * `description` (type: array of strings) explains the purpose of the
     attribute.

   * `inconstructor` (type: boolean) specifies if the attribute should be
     an argument of the `TBmake` function.

   * `type` (type: string) specifies the type of the attribute.  The value of
     `type` must be a valid attribute type as specified by `attrtypes.json`.

   * `targets` (type: object or array) specifies possible values of the
     attribute during a given phase of compilation.

   * `default` (type: string) specifies initial value when constructing the
     node via `TBmake` function.  If `default` is specified, its value
     is being set to the attribute during `TBmake` even if `inconstructor`
     is true.  If `inconstructor` is false or `default` is not specified,
     the `init` value of the attribute type is used.

Fields `type` and `targets` are mandatory.


### Flag structure ###

A flag object contains the following fields:

   * `desc` (type: array of strings) describes the purpose of the flag.
   * `default` (type: string) default value of the flag when the node is
     created.  In case not present the default value `FALSE` is used.


### Targets structure ###

Targets in son or attribute can be either of type object or of type array.
In case targets are of type array it means that array contains a number of
targets of type object.

The target object contains the following fields:

   * `phases` specifies phases for which the target is applicable.  The json
     type  of `phases` can be:

      * string, in which case value `all` specifies that the target is
        applicable fo all the compilation phaes, otherwise the value is treated
        as the name of a phase.

      * object, in which case only two fields are allowed: `from` and `to` which
        specify the starting phase inclusively and the end phase exclusively.

      * array, wherer every element can be a strings or an object.  In such a case
        every element in the array specifies either the name of a phase or the
        range of phases.

   * `contains` (type: string or array of strings)  specifies the type of node
     that a son or an attribute can have.  If the type is string, then only one
     type of node is allowed, in case it is array, a set of nodes is allowed.
     When `contains` is a part of an attribute target, the value of contains can
     be `any`, which means that there are no restrictions on the type of a value.
     Also, if a type of an attribute is not `node` the `contains` check is
     ignored.  For nodes value `any` is not allowed.

   * `mandatory` (type: boolean) specifies if a value of the son or the attribute
     (converted to `intptr_t` type) must be not NULL.


Note that arguments of `TBmake` functions are constructed by means of traversing
sons and attributes, which means that the order in which attributes and sons
are specified in `ast.json` matters.  It is directly reflected in the order
of arguments of `TBmake` functions.  Keep this in mind when adding new sons or
attributes.


### Validation ###

   * JSON types match the specification.
   * Name of each node matches the regular expression `^[A-Z][a-zA-Z0-9_]*$`.
   * Node names are unique.
   * Node, Sons, Attributes, Flags and Targets contains only specified fields.
   * Each node has description and description is of the right type.
   * Mandatory fields are present.


### Example ###

A typical example of an AST node looks like this:
```json
"Array": {
    "attributes": {
        "Elemtype": {
            "targets": {
                "phases": "all", 
                "contains": "any", 
                "mandatory": true
            }, 
            "inconstructor": true, 
            "type": "NewType", 
            "description": [
                "The type of all array elements. The Elemtype may be used to deduce the common shape", 
                "of those elements."
            ]
        }, 
        "FrameShape": {
            "targets": {
                "phases": "all", 
                "contains": "any", 
                "mandatory": true
            }, 
            "inconstructor": true, 
            "type": "Shape", 
            "description": [
                "The frameshape of the array. The frameshape may NOT be an empty vector, with one", 
                "simple scalar (e.g., N_num) hanging from AELEMS. Simple scalars must be represented", 
                "directly as themselves, or via an N_id node."
            ]
        }, 
        "String": {
            "default": "NULL", 
            "inconstructor": false, 
            "type": "String", 
            "targets": {
                "phases": "all", 
                "contains": "any", 
                "mandatory": false
            }, 
            "description": [
                "In case of constant character arrays defined as strings, this attribute holds the", 
                "original definition. The definition needs to be safe for printing as a C string,", 
                "e.g. special characters need to be escaped. TODO: This should be eliminated as soon", 
                "as possible."
            ]
        }
    }, 
    "sons": {
        "AElems": {
            "targets": {
                "phases": "all", 
                "contains": "Exprs", 
                "mandatory": false
            }
        }
    }, 
    "flags": {
        "DummyFlag": {
            "default": "FALSE"
        }
    }, 
    "description": [
        "Constant array of array elements. In early phases, the elements are exprs; after", 
        "the array flattening phase, the elements may be an arbitrary mixture of N_id nodes", 
        "and/or scalar constant nodes. The shapes of all elements must match. The shape of", 
        "the array represented by the N_array is the catenation of the ARRAY_FRAMESHAPE and", 
        "the shape specified by the ELEMTYPE."
    ]
}

```

Traversal-related JSON files
============================

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

```json
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
   - `types/types_trav.h`
   - `types/types_nodetype.h`
   - `tree/traverse_tables.h`
   - `tree/traverse_tables.c`
   - `tree/traverse_helper.c`
   - `tree/sons.h`
   - `tree/node_basic.h`
   - `tree/node_basic.c`
   - `tree/node_alloc.h`
   - `tree/free_node.h`
   - `tree/free_node.c`
   - `tree/free_attribs.h`
   - `tree/check_reset.h`
   - `tree/check_reset.c`
   - `tree/check_node.h`
   - `tree/check_node.c`
   - `tree/check.h`
   - `tree/check.c`
   - `tree/attribs.h`
   - `serialize/serialize_node.h`
   - `serialize/serialize_node.c`
   - `serialize/serialize_link.h`
   - `serialize/serialize_link.c`
   - `serialize/serialize_helper.c`
   - `serialize/serialize_buildstack.h`
   - `serialize/serialize_buildstack.c`
   - `serialize/serialize_attribs.h`
   - `global/node_info.mac`

