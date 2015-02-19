var syntaxtree_json = {
    "syntaxtree": [
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Namespace", 
                    "name": "Namespace", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "FileType", 
                    "name": "FileType", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "LUT", 
                    "name": "WrapperFuns", 
                    "targets": {
                        "phases": {
                            "to": "tc_swr", 
                            "from": "ptc_cwf"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "Deprecated", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Interface", 
                        "mandatory": "no"
                    }, 
                    "name": "Interface", 
                    "description": "symbols imported and exported by the module"
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfspec", 
                        "mandatory": "no"
                    }, 
                    "name": "Typefamilies", 
                    "description": "Specification of type families"
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Structdef", 
                        "mandatory": "no"
                    }, 
                    "name": "Structs", 
                    "description": "structs defined within the module"
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Typedef", 
                        "mandatory": "no"
                    }, 
                    "name": "Types", 
                    "description": "types defined within the module"
                }, 
                {
                    "name": "Objs", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Objdef", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Funs", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }, 
                    "name": "ThreadFuns", 
                    "description": "Contains thread functions for mutc back-end."
                }, 
                {
                    "name": "FunDecs", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "tc_esp", 
                            "from": "scp_prs"
                        }, 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }, 
                    "name": "FunSpecs", 
                    "description": "contains the signatures of forced specializations"
                }, 
                {
                    "default": "NULL", 
                    "name": "SPMDStore", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "Assign", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "FPFrameStore", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "Assign", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Module", 
            "description": "node for a module declaration"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "CopyConstructor", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Structelem", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Structelem", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Structdef", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Structdef", 
            "description": "definition of a struct"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Defs", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfvertex", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Rels", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfrel", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Tfspec", 
            "description": "Declaration of type families and relations"
        }, 
        {
            "attributes": [
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Root", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfvertex", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "CompInfo", 
                    "name": "Info", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Int", 
                    "name": "Dirty", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Defs", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfvertex", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Tfdag", 
            "description": "Type hierarchy DAG"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "pre", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "premax", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "post", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "topo", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "eulerid", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "depth", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "numtopovisits", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "mineqchildvisits", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "numparents", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "numchildren", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "row", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "reachcola", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "reachcolb", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "lubcol", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "distcol", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "NodeList", 
                    "name": "Ancestors", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "VertexWrapper", 
                    "name": "wrapperlink", 
                    "targets": {
                        "phases": "all", 
                        "contains": "vertex", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Parents", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfedge", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Children", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfedge", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfvertex", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "IsCompRoot"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsTopoVisited"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsDFSVisited"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsRchColaMarked"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsRchColbMarked"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsRowMarked"
                }
            ], 
            "name": "Tfvertex", 
            "description": "Vertices in a graph"
        }, 
        {
            "attributes": [
                {
                    "default": "NULL", 
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Subtag", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Supertag", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Cond", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfexpr", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfrel", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Tfrel", 
            "description": "Type family relations"
        }, 
        {
            "attributes": [
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "Assigneeid", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Int", 
                    "name": "Value", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Operator", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Operand1", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfexpr", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Operand2", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfexpr", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Tfexpr", 
            "description": "Expression for type family relation"
        }, 
        {
            "attributes": [
                {
                    "default": "NULL", 
                    "inconstructor": "yes", 
                    "type": "Link", 
                    "name": "Target", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfvertex", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Int", 
                    "name": "Edgetype", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Tfedge", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "WasClassified"
                }
            ], 
            "name": "Tfedge", 
            "description": "Parents and children of a vertex"
        }, 
        {
            "attributes": [
                {
                    "default": "NULL", 
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "tag", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "tagtype", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "TypeComponentArg", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "TypeComponentArg", 
            "description": "Arguments to type families"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Namespace", 
                    "name": "Ns", 
                    "targets": [
                        {
                            "phases": {
                                "to": "final", 
                                "from": "pc_rid"
                            }, 
                            "contains": "any", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "pc_rid", 
                                "from": "mod_ans"
                            }, 
                            "contains": "any", 
                            "mandatory": "no"
                        }
                    ]
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Component", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "NewType", 
                    "name": "NType", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Pragma", 
                    "targets": {
                        "phases": {
                            "to": "pre_rpr", 
                            "from": "scp"
                        }, 
                        "contains": "Pragma", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "CopyFun", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pre_rpr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "InitFun", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pre_rpr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "FreeFun", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pre_rpr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Icm", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "Icm", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "SymbolName", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "mod_imp"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "name": "Structdef", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Structdef", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Args", 
                    "targets": {
                        "phases": "all", 
                        "contains": "TypeComponentArg", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Typedef", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsAbstract"
                }, 
                {
                    "name": "IsBuiltin"
                }, 
                {
                    "name": "IsExported"
                }, 
                {
                    "name": "IsProvided"
                }, 
                {
                    "default": "TRUE", 
                    "name": "IsLocal"
                }, 
                {
                    "name": "IsUnique"
                }, 
                {
                    "name": "IsAlias"
                }, 
                {
                    "name": "IsNested"
                }
            ], 
            "name": "Typedef", 
            "description": "definition of a user defined type"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "NewType", 
                    "name": "Type", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Namespace", 
                    "name": "Ns", 
                    "targets": [
                        {
                            "phases": {
                                "to": "final", 
                                "from": "pc_rid"
                            }, 
                            "contains": "any", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "pc_rid", 
                                "from": "mod_ans"
                            }, 
                            "contains": "any", 
                            "mandatory": "yes"
                        }
                    ]
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "LinkName", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pre_rpr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Pragma", 
                    "targets": {
                        "phases": {
                            "to": "pre_rpr", 
                            "from": "scp"
                        }, 
                        "contains": "Pragma", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "ArgAvis", 
                    "targets": {
                        "phases": [
                            "ptc_rso"
                        ], 
                        "contains": "Id", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "NT_Tag", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Icm", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "Icm", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "name": "InitFun", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "SymbolName", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "mod_imp"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Expr", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Objdef", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsExported"
                }, 
                {
                    "name": "IsProvided"
                }, 
                {
                    "default": "TRUE", 
                    "name": "IsLocal"
                }, 
                {
                    "name": "IsExtern"
                }, 
                {
                    "name": "IsAlias"
                }, 
                {
                    "default": "TRUE", 
                    "name": "IsNeeded"
                }
            ], 
            "name": "Objdef"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Namespace", 
                    "name": "Ns", 
                    "targets": [
                        {
                            "phases": {
                                "to": "final", 
                                "from": "pc_rid"
                            }, 
                            "contains": "any", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "pc_rid", 
                                "from": "mod_ans"
                            }, 
                            "contains": "any", 
                            "mandatory": "yes"
                        }
                    ]
                }, 
                {
                    "mandatory": "no", 
                    "name": "SymbolName", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "mod_imp"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "CudaLinkName", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pre_rpr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "Symbol name of cuda version of this function"
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "LinkName", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pre_rpr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "NewType", 
                    "name": "WrapperType", 
                    "targets": {
                        "phases": {
                            "to": "opt_fdi", 
                            "from": "mod_imp"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "mandatory": "no", 
                    "name": "FunNo", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "opt_pfap"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Pragma", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Pragma", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "OldType", 
                    "name": "Types", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_ctr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "Specs", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "tc"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Return", 
                    "targets": {
                        "phases": {
                            "to": "cg_ctr", 
                            "from": "ptc_l2f"
                        }, 
                        "contains": "Return", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "ussa_f2l", 
                            "from": "ptc_l2f"
                        }, 
                        "contains": "Ap", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "LoopRecursiveAp", 
                    "description": "In a LOOPFUN, this is the N_ap that is the recursive\n\t   call within the LOOPFUN."
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "mod_imp"
                        }, 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "name": "Impl", 
                    "description": "Points to the implementation. In case of a wrapper function this is the\n      only available instance. In case of an objectwrapper this is the wrapped\n      function instance."
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "popt_cspf"
                        }, 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "name": "SpawnFun", 
                    "description": "Points to the copy of this function that can be used as target for a \n      spawn operation in the mutc backend."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Namespace", 
                    "name": "SpecNs", 
                    "targets": {
                        "phases": {
                            "to": "tc_swr", 
                            "from": "tc_esp"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "Icm", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "IcmDefBegin", 
                    "description": "ICM for the beginning function definitions"
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "Icm", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "IcmDecl", 
                    "description": "ICM for function decelerations"
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "Icm", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "IcmDefEnd", 
                    "description": "ICM to mark the end of a function definition"
                }, 
                {
                    "inconstructor": "no", 
                    "type": "TypeCheckingStatus", 
                    "name": "TCStat", 
                    "targets": {
                        "phases": [
                            "tc"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMaskBase", 
                    "name": "DFM_Base", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "ArgTab", 
                    "name": "ArgTab", 
                    "targets": {
                        "phases": {
                            "to": "icc_frtr", 
                            "from": "pc_fpc"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "targets": {
                        "phases": [
                            "mt_mtstf"
                        ], 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "name": "Companion", 
                    "description": "This link points to the companion function of the current function. In case this is the sequential version (as encoded by ISSTFUN) of the function, the companion will be the parallel version (as encoded by ISMTFUN) and vice versa. The attribute is used in both implementations of MT."
                }, 
                {
                    "targets": {
                        "phases": [
                            "mt_mtstf"
                        ], 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "name": "XTCompanion", 
                    "description": "This link points to the XT companion function of the current function. This is used in the module version of create MT/ST/XT functions (MTSTFMOD)."
                }, 
                {
                    "targets": {
                        "phases": [
                            "mt_mtstf"
                        ], 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "name": "MTCompanion", 
                    "description": "This link points to the MT companion function of the current function. This is used in the module version of create MT/ST functions (MTSTFMOD)."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "MTExecMode", 
                    "name": "ExecMode", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "AkvId", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "description": "Identifier for function instances with akv-arguments \n            (used for function naming in renameidentifiers.c)"
                }, 
                {
                    "name": "InlineCounter", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": [
                            "opt_cyc_linl"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "description": "Counter for how many times the function has been recursively\n            inlined."
                }, 
                {
                    "name": "LastChange", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": {
                            "to": "tc_ti", 
                            "from": "tc_sossk"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "description": "This attribute indicates in which iteration round the PV of the\n            function itself was changed the last time during the specialization\n            oracle for static shape knowledge."
                }, 
                {
                    "name": "LastIterationRound", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": {
                            "to": "tc_ti", 
                            "from": "tc_sossk"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "description": "This attribute indicates in which iteration round this function was\n            the last time \"iterated\" (fully or partially) during the\n            specialization oracle for static shape knowledge"
                }, 
                {
                    "name": "Depth", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "description": "Used to count the depth in the static call graph.\n            (see distribute_threads.c)"
                }, 
                {
                    "name": "Height", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "description": "Used to count the height in the static call graph.\n            (see distribute_threads.c)"
                }, 
                {
                    "name": "Structgetter", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Structelem", 
                        "mandatory": "no"
                    }, 
                    "description": "If this function is a getter for a struct element, this attribute points to that element."
                }, 
                {
                    "name": "Structsetter", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Structelem", 
                        "mandatory": "no"
                    }, 
                    "description": "If this function is a setter for a struct element, this attribute points to that element."
                }, 
                {
                    "name": "Callfun", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }, 
                    "description": "This attribute is used by check_lacfuns to determine unique call sites of LaC functions."
                }, 
                {
                    "name": "Callap", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "targets": {
                        "phases": {
                            "to": "opt_saacyc_edfa", 
                            "from": "opt_saacyc_edfa"
                        }, 
                        "contains": "Ap", 
                        "mandatory": "no"
                    }, 
                    "description": "If this function is a LACFUN, this attribute points to\n\t  the N_ap node that invokes it from outside the\n\t  LACFUN. Valid only during EDFA."
                }, 
                {
                    "name": "SlowClone", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pc_msc"
                        }, 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }, 
                    "description": "This attribute points to the slow clone implementation if this\n            fundef is the fast clone"
                }, 
                {
                    "mandatory": "no", 
                    "name": "NumSpawnSync", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "fp_css"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "mandatory": "no", 
                    "name": "WLCount", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cuda_cutem"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Livevars", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Livevars", 
                    "description": "Contains a union of all livevars inside the body"
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pc_msc"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "FPFrameName", 
                    "description": "When this function contains spawn, unique function name is saved\n            here for the name used in the task frame."
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "cg_cpl", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "WithOp", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "withops", 
                    "description": "Used by mutc backend for lifting desc mallocs up"
                }
            ], 
            "sons": [
                {
                    "name": "Rets", 
                    "targets": [
                        {
                            "phases": {
                                "to": "final", 
                                "from": "ussa_rera"
                            }, 
                            "contains": "Ret", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "ussa_rera", 
                                "from": "ptc_rrp"
                            }, 
                            "contains": "Ret", 
                            "mandatory": "yes"
                        }
                    ]
                }, 
                {
                    "name": "Args", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Arg", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Asserts", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Udcs", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Body", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Objects", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Set", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "AffectedObjects", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "LocalFuns", 
                    "targets": {
                        "phases": {
                            "to": "opt_uglf", 
                            "from": "opt_glf"
                        }, 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsMain", 
                    "desc": "This function is the main function of a program."
                }, 
                {
                    "name": "IsExported", 
                    "desc": "This function is being exported from the current namespace and will thus be fully visible from outside."
                }, 
                {
                    "name": "IsProvided", 
                    "desc": "This function is being provided from the current namespace and will thus be available for use from outside, only."
                }, 
                {
                    "name": "WasImported", 
                    "desc": "This function was imported from another namespace. This as well means that it is local now."
                }, 
                {
                    "name": "WasUsed", 
                    "desc": "This function was used from another namespace. This as well means that it is not local."
                }, 
                {
                    "default": "TRUE", 
                    "name": "IsLocal", 
                    "desc": "This function is defined locally in the current namespace. That is, it was defined locally or imported."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsSticky", 
                    "desc": "This function should not be removed by DeadFunctionRemoval. This is mainly used by the module system to ensure that for all exported functions code is generated. Furthermore, it is used to ensure that the prelude functions are not removed during compilation."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsSACargConversion", 
                    "desc": "This function is a special SACarg conversion function used by the C interface. This tag is mainly used to ensure that these functions do not turn up in the resulting C header file."
                }, 
                {
                    "name": "IsNeeded", 
                    "desc": "This flag is used in multiple phases, usually to tag functions that are referenced in some sense. It has always to be reset to FALSE at the end of each phase."
                }, 
                {
                    "name": "IsCondFun", 
                    "desc": "This is a lifted conditional. The function is only referenced once from the context the conditional was lifted from."
                }, 
                {
                    "name": "IsLoopFun", 
                    "desc": "This function is a functional representation of a do loop; it is only referenced twice: Once from the context the loop was lifted from and once from the inner recursive application."
                }, 
                {
                    "name": "IsObjInitFun", 
                    "desc": "This function is a global object initialiser function derived from the objdef expression."
                }, 
                {
                    "name": "IsThreadFun", 
                    "desc": "This function is a mutc thread function."
                }, 
                {
                    "name": "WasWith3Body"
                }, 
                {
                    "name": "IsSpmdfun", 
                    "desc": "This function is a lifted region (usually one withloop) from a SPMD-block; it is only called once from within the region it was lifted from. From a backend perspective, the SPMD function is the transition from sequential to parallel execution. It is called while in sequential mode, its body is exectuted in parallel by multiple threads and it syncronizes on the return."
                }, 
                {
                    "name": "IsXtSpmdfun", 
                    "desc": "Same as IsSpmdFun, will be TRUE for XT SPMD functions."
                }, 
                {
                    "name": "IsMtfun", 
                    "desc": "This is (potentially) a copy of the original function that will be executed in parallel by multiple threads during runtime. Note that all functions called from such a function need to be MT-funs, as well. If the function is only used in parallel context, this may in fact be the original function that has been reused."
                }, 
                {
                    "name": "IsStfun", 
                    "desc": "This is (potentially) a copy of the original function that will be executed sequentially by a single thread during runtime. If the function is only used in sequential context, this may in fact be the original function that has been reused."
                }, 
                {
                    "name": "IsXtfun", 
                    "desc": "This is (potentially) a copy of the original function that will be executed in a multi-threaded context and might go parallel."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsCudastGlobalfun", 
                    "desc": "This is a single threaded cuda global kernel function."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsCudaGlobalfun", 
                    "desc": "This is a cuda global kernel function."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsCudaDevicefun", 
                    "desc": "This is a cuda device function (called within a global kernel function)."
                }, 
                {
                    "name": "IsWrapperfun"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsWrapperEntryfun"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsIndirectWrapperfun"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsSpawnFun", 
                    "desc": "True if the function is the target of a spawn operation in the mutc backend"
                }, 
                {
                    "name": "IsZombie"
                }, 
                {
                    "name": "IsExtern"
                }, 
                {
                    "name": "IsGeneric", 
                    "desc": "True if the function definition contains generic arguments."
                }, 
                {
                    "name": "IsInline"
                }, 
                {
                    "name": "IsInlineCompleted"
                }, 
                {
                    "name": "IsLacInline"
                }, 
                {
                    "name": "AllowsInfix"
                }, 
                {
                    "name": "HasDotArgs", 
                    "desc": "True if the function may take an arbitrary number of arguments. E.g., printf"
                }, 
                {
                    "name": "HasDotRets", 
                    "desc": "True if the function may generate an arbitrary number of results."
                }, 
                {
                    "default": "FALSE", 
                    "name": "HasStepWidthArgs"
                }, 
                {
                    "default": "FALSE", 
                    "name": "RefcountDots"
                }, 
                {
                    "name": "IsSpecialisation"
                }, 
                {
                    "name": "IsTypeError", 
                    "desc": "TRUE if the given function is a bodyless type error and thus has at least one bottom return type"
                }, 
                {
                    "name": "IsObjectWrapper", 
                    "desc": "TRUE if the given function is a wrapper for an instance whose instance needed to be extended in the current namespace due to added objects."
                }, 
                {
                    "default": "TRUE", 
                    "name": "WasOptimized", 
                    "desc": "TRUE if function should be accounted for next optimization cycle again"
                }, 
                {
                    "name": "WasUpgraded", 
                    "desc": "TRUE iff the return type has changed during the last run of type-upgrade"
                }, 
                {
                    "default": "FALSE", 
                    "name": "FixpointFound", 
                    "desc": "TRUE iff the fixpoint of this function has been found in SOSSK."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsStructConstr", 
                    "desc": "TRUE iff this function was created by the HS pass as a constructor for structs."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsCudaLacFun", 
                    "desc": "TRUE iff this function is a lac fun that can be executed on the CUDA card."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsForLoop", 
                    "desc": "TRUE iff this loop function is generated into for loop in the backend."
                }, 
                {
                    "default": "FALSE", 
                    "name": "NoInline", 
                    "desc": "This function MUST NOT be inlined.  This is set from #pragma noinline."
                }, 
                {
                    "default": "TRUE", 
                    "name": "NeedsDynamicMemory", 
                    "desc": "This functions needs dynamic memory (malloc)"
                }, 
                {
                    "default": "FALSE", 
                    "name": "ContainsSpawn", 
                    "desc": "This function contains a spawn statement"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsSlowClone", 
                    "desc": "This function is a slow clone"
                }
            ], 
            "name": "Fundef", 
            "checks": [
                "CHKfundefVardecExtrema", 
                "CHKcondfun", 
                "CHKfundefReturn"
            ]
        }, 
        {
            "name": "Arg", 
            "sons": [
                {
                    "name": "Avis", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Avis", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Arg", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsReadonly"
                }, 
                {
                    "name": "IsReference", 
                    "desc": "Set to true if the given argument is a reference argument. The flag is reset to false when resolving reference arguments and WasReference is set to true instead. For all other kinds of arguments it is set to false."
                }, 
                {
                    "name": "WasReference", 
                    "desc": "Set to true after resolving reference args if the given argument was a reference argument before. Set to false otherwise."
                }, 
                {
                    "name": "IsArtificial", 
                    "desc": "Set to true after resolving objects if the given argument was introduced by an object dependency and thus will be removed once the objects are reintroduced in precompile. Set to false otherwise."
                }, 
                {
                    "name": "IsPadded"
                }, 
                {
                    "default": "TRUE", 
                    "name": "IsAliasing"
                }, 
                {
                    "default": "TRUE", 
                    "name": "IsRefcounted"
                }, 
                {
                    "name": "HasLinksignInfo"
                }, 
                {
                    "name": "IsUnique"
                }, 
                {
                    "default": "FALSE", 
                    "phases": {
                        "to": "final", 
                        "from": ""
                    }, 
                    "name": "IsInUse", 
                    "desc": "Used to mark unused function arguments in DeadCodeRemoval. Marked arguments are removed in signature simplification."
                }, 
                {
                    "default": "FALSE", 
                    "phases": {
                        "to": "opt_saacyc_edfa", 
                        "from": "opt_saacyc_edfa"
                    }, 
                    "name": "IsDuplicate", 
                    "desc": "Used to mark duplicated function arguments in\n\t    EDFA. Marked arguments are removed by EDFA, but this\n\t    flag allows us to simplify outer-level calls in a cleaner\n\t    fashion."
                }, 
                {
                    "default": "FALSE", 
                    "phases": {
                        "to": "opt_saacyc_petl", 
                        "from": "opt_saacyc_petl"
                    }, 
                    "name": "IsNeedsMin", 
                    "desc": "Used to mark LACFUN arguments that have a\n\t  non-NULL AVIS_MIN in the calling environment, but not (yet)\n\t  in the local environment. This flag is used only in PETL."
                }, 
                {
                    "default": "FALSE", 
                    "phases": {
                        "to": "opt_saacyc_petl", 
                        "from": "opt_saacyc_petl"
                    }, 
                    "name": "IsNeedsMax", 
                    "desc": "Used to mark LACFUN arguments that have a\n\t  non-NULL AVIS_MAX in the calling environment, but not (yet)\n\t  in the local environment. This flag is used only in PETL."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsCudaDefined"
                }
            ], 
            "attributes": [
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "OldType", 
                    "name": "Type", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_ctr"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "TypeString", 
                    "targets": {
                        "phases": [
                            "rid"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "name": "Objdef", 
                    "targets": {
                        "phases": {
                            "to": "ussa_reso", 
                            "from": "mod_uss"
                        }, 
                        "contains": "Objdef", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "Linksign", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pre_rpr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "checks": [
                "CHKisNullSsaassign"
            ], 
            "description": "One formal argument of a defined function definition."
        }, 
        {
            "sons": [
                {
                    "name": "Udc", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Udcs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "name": "Udcs"
        }, 
        {
            "attributes": [
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "CacheSim", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "SPMD_Prolog_ICMs", 
                    "targets": {
                        "phases": [
                            "comp"
                        ], 
                        "contains": "Fundef", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "SSACounter", 
                    "targets": {
                        "phases": [
                            "ssa", 
                            "wltssa", 
                            "ssawc"
                        ], 
                        "contains": "SSAcnt", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Dataflowgraph", 
                    "targets": {
                        "phases": {
                            "to": "mt3_concel", 
                            "from": "mt3_cdfg"
                        }, 
                        "contains": "Dataflowgraph", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "In_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Out_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Local_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Assigns", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Assign", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Vardecs", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Vardec", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Shareds", 
                    "targets": {
                        "phases": [
                            "lw3"
                        ], 
                        "contains": "Arg", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsMtParallelBranch", 
                    "desc": "This block contains the parallel branch of a conditional that implements dynamic parallelisation decisions in the MT backend.."
                }, 
                {
                    "name": "IsMtSequentialBranch", 
                    "desc": "This block contains the sequential branch of a conditional that implements dynamic parallelisation decisions in the MT backend.."
                }
            ], 
            "name": "Block"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "NewType", 
                    "name": "Type", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Typedef", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Typedef", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Structelem", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Structelem", 
            "description": "declaration of an element of a struct"
        }, 
        {
            "attributes": [
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "OldType", 
                    "name": "Type", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_ctr"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Icm", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "Icm", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Avis", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Avis", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Vardec", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Init", 
                    "targets": {
                        "phases": {
                            "to": "cg_cpl", 
                            "from": "pc_mc"
                        }, 
                        "contains": "Expr", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsPadded"
                }, 
                {
                    "name": "HasBeenEliminated", 
                    "desc": "Used in ArrayElimination to mark vardecs that are not used anymore. These are later freed by DCR"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsSticky", 
                    "desc": "This vardec should not be removed by DeadFunctionRemoval. This is exclusively used by MT code generation within SPMD functions to ensure that dummy vardecs in intriduced when creating the SPMD functions that only become vital during code generation do not vanish until then."
                }
            ], 
            "name": "Vardec"
        }, 
        {
            "name": "Assign", 
            "sons": [
                {
                    "name": "Stmt", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Stmt", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Assign", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsUnused"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsNotAllowedToBeMovedUp", 
                    "desc": "This flag is used during the \"Withloop Lock Optimization\" process.\n            It indicates that certain assignments are not allowed to be moved\n            above the global object-lock."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsNotAllowedToBeMovedDown", 
                    "desc": "This flag is used during the \"Withloop Lock Optimization\" process.\n            It indicates that certain assignments are not allowed to be moved\n            below the global object-lock release."
                }, 
                {
                    "default": "FALSE", 
                    "name": "HasMoved", 
                    "desc": "This flag is used during moving sync statements phase in FP to\n            indicate that a node has been tried to move before."
                }
            ], 
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "MTExecMode", 
                    "name": "ExecMode", 
                    "targets": {
                        "phases": {
                            "to": "mt3_repfun", 
                            "from": "mt3_crwiw"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "CellId", 
                    "targets": {
                        "phases": {
                            "to": "mt3_crece", 
                            "from": "mt3_asmra"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "Level", 
                    "targets": {
                        "phases": [
                            "daa"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Visited_With", 
                    "targets": {
                        "phases": [
                            "wlf"
                        ], 
                        "contains": "With", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Tag", 
                    "targets": {
                        "phases": [
                            "wlf"
                        ], 
                        "contains": "With", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Dataflownode", 
                    "targets": {
                        "phases": {
                            "to": "mt3_concel", 
                            "from": "mt3_cdfg"
                        }, 
                        "contains": "Dataflownode", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "IndexInfo", 
                    "name": "Index", 
                    "targets": {
                        "phases": {
                            "to": "opt_cyc_wlf", 
                            "from": "opt_cyc_wli"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Containing_Block", 
                    "targets": {
                        "phases": [
                            "imem"
                        ], 
                        "contains": "Block", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "CudaAccessInfo", 
                    "name": "Access_Info", 
                    "targets": {
                        "phases": "", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "checks": [
                "CHKassignAvisSSAAssign"
            ], 
            "description": "Spine of an N_block"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "LIRFlag", 
                    "targets": {
                        "phases": [
                            "lir"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Let", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "MatchingSpawnSync", 
                    "description": "If the node contains a spawned ap or a sync statement, this\n            will point to the matching spawn or sync statement."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Livevars", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Livevars", 
                    "description": "If the let node is a spawn or sync statement, this attribute will\n            contain a list of all live variables at this point in the code."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "SpawnSyncIndex", 
                    "description": "If the let node is a spawn or sync statement, this attribute\n            indicates the index of that statement"
                }
            ], 
            "sons": [
                {
                    "name": "Ids", 
                    "targets": [
                        {
                            "phases": {
                                "to": "ptc_ivd", 
                                "from": "initial"
                            }, 
                            "contains": "SPIds", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "final", 
                                "from": "ptc_ivd"
                            }, 
                            "contains": "Ids", 
                            "mandatory": "no"
                        }
                    ]
                }, 
                {
                    "name": "Expr", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Let", 
            "description": "Assignment of value to identifier"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Link", 
                    "name": "Avis", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Avis", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Livevars", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Livevars"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "NewType", 
                    "name": "NType", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Expr", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Cast"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "CRet", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Exprs", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Return"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "In_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Out_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Local_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Cond", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Then", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Else", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "IsThenNoop"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsElseNoop"
                }
            ], 
            "name": "Cond"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "Label", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "initial"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "In_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Out_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Local_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Iterator", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pc_pfg"
                        }, 
                        "contains": "Avis", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Upper_Bound", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pc_pfg"
                        }, 
                        "contains": "Avis", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Prf", 
                    "name": "Relational_Op", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pc_pfg"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Cond", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Body", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Skip", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "IsCudarizable", 
                    "desc": "TRUE iff this loop can be executed on the GPU."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsForLoop", 
                    "desc": "TRUE iff this do/while loop is generated into for loop in the backend."
                }
            ], 
            "name": "Do"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Cond", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Body", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "While"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Tag", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "FunNumber", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "FunApNumber", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Annotate"
        }, 
        {
            "name": "Ap", 
            "sons": [
                {
                    "name": "Args", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "TRUE", 
                    "name": "ConsiderInline"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsRecursiveDoFunCall"
                }, 
                {
                    "name": "IsSpawned", 
                    "desc": "This function call should be spawned"
                }, 
                {
                    "name": "IsRemote", 
                    "desc": "This function call should be spawned on another resource"
                }, 
                {
                    "name": "ToSpawn", 
                    "desc": "This node calls a function which contains spawns"
                }
            ], 
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "ExtLink", 
                    "name": "Fundef", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "ArgTab", 
                    "name": "ArgTab", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pc_fpc"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "SpawnPlace", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "checks": [
                "CHKapArgCount"
            ], 
            "description": "Application of a user-defined function."
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Ops", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Exprs", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsFixed"
                }
            ], 
            "name": "SPMop"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Expr", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Exprs"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "If", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Then", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Else", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Funcond", 
            "description": "A SaC expression of the form: cond ? truevalue : elsevalue."
        }, 
        {
            "attributes": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "yes", 
                    "type": "NewType", 
                    "name": "Elemtype", 
                    "description": "The type of all array elements. The Elemtype may be used\n           to deduce the common shape of those elements."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "yes", 
                    "type": "Shape", 
                    "name": "FrameShape", 
                    "description": "The frameshape of the array. \n\t\t\tThe frameshape may NOT be an empty vector, \n\t\t\twith one simple scalar (e.g., N_num) hanging from\n\t\t\tAELEMS. Simple scalars must be represented directly\n\t\t\tas themselves, or via an N_id node."
                }, 
                {
                    "name": "String", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "In case of constant character arrays defined\n            as strings, this attribute holds the original\n            definition. The definition needs to be safe for printing as\n            a C string, e.g. special characters need to be escaped.\n            TODO: This should be eliminated as soon as possible."
                }
            ], 
            "sons": [
                {
                    "name": "AElems", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Array", 
            "description": "Constant array of array elements. In early phases, \n     the elements are exprs; after the array flattening phase, the\n     elements may be an arbitrary mixture of N_id nodes and/or \n     scalar constant nodes.\n     The shapes of all elements must match. The shape of the array\n     represented by the N_array is the catenation of the ARRAY_FRAMESHAPE\n     and the shape specified by the ELEMTYPE."
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Link", 
                    "name": "Avis", 
                    "targets": [
                        {
                            "phases": {
                                "to": "cg_cpl", 
                                "from": "initial"
                            }, 
                            "contains": "Avis", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": {
                                "to": "final", 
                                "from": "cg_cpl"
                            }, 
                            "contains": "Avis", 
                            "mandatory": "no"
                        }
                    ]
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "WL", 
                    "targets": {
                        "phases": [
                            "wlf"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "ICMtext", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "Deprecated. Will be removed as soon as it has been confirmed that this attribute is no longer used."
                }, 
                {
                    "name": "NT_Tag", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "Deprecated. Still used in the compiler backend until major redesign of backend node structure."
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "name": "IsSclPrf", 
                    "desc": "Set by AL and DL to indicate that the N_id is the result of\n                  a primitive dyadic function operating on simple scalars."
                }
            ], 
            "name": "Id"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Num", 
            "description": "Integer scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Byte", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumByte", 
            "description": "Byte scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Short", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumShort", 
            "description": "Short scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Int", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumInt", 
            "description": "Int scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Long", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumLong", 
            "description": "Long scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Longlong", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumLonglong", 
            "description": "Long Long scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Ubyte", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumUbyte", 
            "description": "Ubyte scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Ushort", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumUshort", 
            "description": "Ushort scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Uint", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumUint", 
            "description": "Uint scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Ulong", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumUlong", 
            "description": "Ulong scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Ulonglong", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "NumUlonglong", 
            "description": "ULongLong scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Char", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Char", 
            "description": "Character scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Float", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Float", 
            "description": "Floating-point scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Floatvec", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Floatvec", 
            "description": "Floating-point scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Double", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Double", 
            "description": "Double-precision real scalar"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Bool", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Bool", 
            "description": "Boolean scalar"
        }, 
        {
            "attributes": [], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Nested_init", 
            "description": "Nested init value"
        }, 
        {
            "attributes": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "String", 
                    "description": "The value of this string. Note that the string needs to be\n            in an encoding which is safe for printing in C code, e.g.\n            special characters like quotation marks need to be escaped."
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Str"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "NewType", 
                    "name": "Type", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Type"
        }, 
        {
            "attributes": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "yes", 
                    "type": "Prf", 
                    "name": "Prf", 
                    "description": "Describes the type of function this node\n            represents. A list of possible values is\n            found in src/libsac2c/tree/prf_info.mac"
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "NoteintersectInsertionCycle", 
                    "description": "This is used for analysis of AWLF performance. It is initialized\n\t   to global.cycle_counter when an F_noteintersect is inserted\n\t   into the AST, and referenced when AWLF actually performs\n\t   a WL fold. The intent is to see if we should make AWLF give\n\t   up on a folding attempt after some N iterations."
                }
            ], 
            "sons": [
                {
                    "name": "Args", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "IsNoteIntersectPresent", 
                    "desc": "Set by AWLFI for _sel_VxA_(iv, PWL) to\n                  indicate that an _noteintersect_ node has been\n                  generated for iv."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsInplaceSelect"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsNop", 
                    "desc": "Some optimization has decided that this N_prf is\n\t    a no-op. I.e., it can be (carefully) removed from\n\t    the AST, but is not in a position within the AST\n\t    traversal to remove it directly.\n\t    At present, the only case where this happens \n\t    is in ixxx. CF performs the actual removal,\n\t    typically on a traversal after the one that\n\t    has set this flag."
                }, 
                {
                    "default": "FALSE", 
                    "phases": {
                        "to": "opt_saacyc_cubsl", 
                        "from": "opt_saacyc_cubsl"
                    }, 
                    "name": "IsFoldNow", 
                    "desc": "Set to true by CUBSL if this sel is in a consumer-WL and\n\t    has been determined to be foldable by AWLF."
                }
            ], 
            "name": "Prf", 
            "description": "Primitive (built-in) SAC function"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Num", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Dot"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Vec", 
                    "targets": [
                        {
                            "phases": "all", 
                            "contains": "Exprs", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": "all", 
                            "contains": "SPId", 
                            "mandatory": "yes"
                        }
                    ]
                }, 
                {
                    "name": "Expr", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "SetWL"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "SharedString", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Indent_Before", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "description": "the default value has to be fixed!"
                }, 
                {
                    "name": "Indent_After", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "description": "the default value has to be fixed!"
                }
            ], 
            "sons": [
                {
                    "name": "Args", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsEndOfStatement"
                }
            ], 
            "name": "Icm"
        }, 
        {
            "attributes": [
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "LinkName", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "CudaLinkName", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "String", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "Declaration of cuda version of an external function"
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "StringSet", 
                    "name": "LinkMod", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "StringSet", 
                    "name": "LinkObj", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "WLComp_APS", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "APL", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Ap", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "NumParams", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "InitFun", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "CopyFun", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "FreeFun", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "wldist", 
                    "targets": {
                        "phases": "", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "default": "NULL", 
                    "name": "ReadOnly", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Nums", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Refcounting", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Nums", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Effect", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "LinkSign", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Nums", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "RefcountDots"
                }, 
                {
                    "default": "FALSE", 
                    "name": "MutcThreadFun"
                }, 
                {
                    "default": "FALSE", 
                    "name": "NoInline"
                }
            ], 
            "name": "Pragma"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Count", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "BaseId", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "SSAcnt", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "SSAcnt"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Link", 
                    "name": "Avis", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Avis", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "NestLevel", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "SSAstack", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "InUse"
                }
            ], 
            "name": "SSAstack"
        }, 
        {
            "name": "Avis", 
            "sons": [
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "opt_esaa", 
                            "from": "opt_saacyc_isaa"
                        }, 
                        "contains": "Expr", 
                        "mandatory": "no"
                    }, 
                    "name": "Dim", 
                    "description": "An N_num or N_id specifying the array's rank\n          as a symbolic array attribute. The expression is a numeric\n          constant (N_num) for AKS, AKD, and AKV arrays, and an\n          identifier (N_id) for AUD arrays."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "opt_esaa", 
                            "from": "opt_saacyc_isaa"
                        }, 
                        "contains": "Expr", 
                        "mandatory": "no"
                    }, 
                    "name": "Shape", 
                    "description": "An N_array or N_id specifying the array's shape\n\t  as a symbolic array attribute. The array is\n\t  comprised of integer constants (N_num) for AKV and AKS arrays,\n\t  a mixed array of integer constants and identifiers (N_num, N_id)\n\t  for AKD arrays with partial shape information, or an\n\t  identifier (N_id) for AUD and some AKD arrays."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "opt_esaa", 
                            "from": "opt_saacyc"
                        }, 
                        "contains": "Id", 
                        "mandatory": "no"
                    }, 
                    "name": "Min", 
                    "description": "This field is an N_id for the\n          minimum value that this variable can have. \n          The field is valid only for integer-like\n          types, i.e., it does not apply to doubles, etc.\n          For example, the Min of the lower bound of a WL index \n          vector might be\n          an N_id pointing to an N_array with value [0,0,0],"
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "opt_esaa", 
                            "from": "opt_saacyc"
                        }, 
                        "contains": "Id", 
                        "mandatory": "no"
                    }, 
                    "name": "Max", 
                    "description": "See AVIS_MIN description; MAX points to the avis of the maximum, \n           rather than the minimum, value of a WL index vector.\n           However, like WL index vectors, MAX is\n           part of a semi-closed interval; MAX(X) is at least 1+maxreduce(X),\n           much the same as GENERATOR_BOUND2 in a with-loop."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "opt_esaa", 
                            "from": "opt"
                        }, 
                        "contains": "Array", 
                        "mandatory": "no"
                    }, 
                    "name": "Scalars", 
                    "description": "For small arrays, such as shape vectors and \n\t  index vectors, this field comprises the scalars constituting\n\t  those arrays as an N_array. This allows us to manipulate the\n\t  scalars in optimizations such as AWLF, and avoids the need\n\t  to build an N_array within LACFUNs."
                }
            ], 
            "flags": [
                {
                    "name": "SSADefined"
                }, 
                {
                    "name": "SSALPINV"
                }, 
                {
                    "default": "TRUE", 
                    "name": "IsAlias", 
                    "desc": "Set by the Alias Analysis traversel, AVIS_ISALIAS \n            denotes whether there can be more than one identifier for a \n            given data object."
                }, 
                {
                    "name": "IsDead", 
                    "desc": "Used to indicate \n            which VARDECS are no longer needed and can thus be eliminated."
                }, 
                {
                    "name": "IsDeadReturn", 
                    "desc": "Used to indicate a dead N_return value.\n\t   This is used solely by DCI/DCR to mark return values that\n\t   are not used by the external caller. We must not use\n\t   AVIS_ISDEAD for this purpose, because the value may be\n\t   in use elsewhere, such as for an AVIS_SHAPE."
                }, 
                {
                    "name": "IsLifted", 
                    "desc": "Used by SpmdLift traversal in order to indicate \n            which VARDECS are no longer needed and can thus be eliminated."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsUniqueConsumed", 
                    "desc": "Used by the uniqueness checker to determine whether\n\t  a unique type has been consumed earlier on."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsUniqueConsumedThen", 
                    "desc": "Used by the uniqueness checker to determine whether\n\t  a unique type has been consumed earlier on, before the THEN\n\t  branch of an N_cond."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsUniqueConsumedElse", 
                    "desc": "Used by the uniqueness checker to determine whether\n\t  a unique type has been consumed earlier on, before the ELSE\n\t  branch of an N_cond."
                }, 
                {
                    "default": "FALSE", 
                    "name": "HasDTThenProxy"
                }, 
                {
                    "default": "FALSE", 
                    "name": "HasDTElseProxy"
                }, 
                {
                    "default": "FALSE", 
                    "name": "HasSAAArguments", 
                    "desc": "Within the optimisation cycle we may introduce new parameters to functions, representing shape or dimension of other parameters. If this is done for this parameter, we may set this value to TRUE."
                }, 
                {
                    "default": "FALSE", 
                    "name": "HasMinvalArg", 
                    "desc": "This value has its AVIS_MIN present in LACFUN calls, in\n\t  the same manner as AVIS_DIM/SHAPE.\n\t  This flag ensures that we do not do repeated insertions of\n\t  extrema into LACFUN calls."
                }, 
                {
                    "default": "FALSE", 
                    "name": "HasMaxvalArg", 
                    "desc": "This value has its AVIS_MAX present in LACFUN calls,\n\t  the same manner as AVIS_DIM/SHAPE.\n\t  This flag ensures that we do not do repeated insertions of\n\t  extrema into LACFUN calls."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsUsed", 
                    "desc": "Used by Loop Scalarization to determine whether\n          a variable is used otherwise than within array position of\n          selections.\n\t  Furthermore, used by partial reuse candidate filtering to check\n\t  whether a reuse candidate appears somewhere other than in selections."
                }, 
                {
                    "default": "FALSE", 
                    "name": "BelongingAssignmentIsNotAllowedToBeMovedUp", 
                    "desc": "This flag is used during the \"Withloop Lock Optimization\" process.\n            It indicates that the belonging assignment is not allowed to be\n            moved above the global object-lock."
                }, 
                {
                    "default": "FALSE", 
                    "name": "BelongingAssignmentIsNotAllowedToBeMovedDown", 
                    "desc": "This flag is used during the \"Withloop Lock Optimization\" process.\n            It indicates that the belonging assignment is not allowed to be\n            moved below the global object-lock release."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsThreadIndex", 
                    "desc": "If true, the given variable is the dedicated index variable for\n\t    this thread function. Used by the mutc backend."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsWLFolded", 
                    "desc": "If true, the given variable is the result of a producerWL\n             that has been folded out of existence."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsHostReferenced"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsMinHandled", 
                    "desc": "If true, indicates that IVEXI/IVEXP have performed whatever\n                  needs to be done to generate AVIS_MIN for this node.\n                  For N_array assignments, the extrema are not directly\n                  attached to the LHS (v), but to v' or v'', so looking\n                  for non-NULL AVIS_MIN will not work."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsMaxHandled", 
                    "desc": "Like IsMinHandled, but for AVIS_MAX."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsCudaLocal", 
                    "desc": "If true, this (array) variable should be allocated locally on CUDA."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsDefinedInCurrentBlock", 
                    "desc": "This flags marks AVIS nodes that are assigned in the current block.\n                  This is used in AL to separate identifiers from different blocks\n                  to confine the effect of AL to single blocks."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsALActive", 
                    "desc": "This flags marks AVIS nodes as potential roots of multi-operand\n                  expressions; it is used to avoid starting another go on AL for\n                  any subexpression."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsLoopInvariant", 
                    "desc": "This flags marks AVIS nodes as loop invariant, i.e. the variable\n                  is a parameter of a do-loop function and appears in the corresponding\n                  argument position of the recursive application."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsDLActive", 
                    "desc": "This flags marks AVIS nodes as active in the current context.\n                  This is used in DL to mark identifiers that are part of\n                  an expression to be simplified."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsOmpPrivate", 
                    "desc": "If true, the given variable is private OpenMP variable."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsOmpReduction", 
                    "desc": "If true, the given variable is reduction OpenMP variable used in fold."
                }, 
                {
                    "default": "FALSE", 
                    "name": "suballoc", 
                    "desc": "MUTC: This var is from a suballoc where the desc is passed in to \n            this function"
                }, 
                {
                    "default": "FALSE", 
                    "name": "NeedBlocked", 
                    "desc": "If true, the given variable is a loop index and the loop needs to be blocked"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsGenarrayMemval", 
                    "desc": "Marks genarray with-loo operatorp memval identifier.\n             Only used in SPMD functions."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsModarrayMemval", 
                    "desc": "Marks modarray with-loop operator memval identifier.\n             Only used in SPMD functions."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsBreakMemval", 
                    "desc": "Marks break with-loop operator memval identifier.\n             Only used in SPMD functions."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsPropagateDefault", 
                    "desc": "Marks propagate with-loop operator default identifier.\n             Only used in SPMD functions."
                }, 
                {
                    "default": "FALSE", 
                    "name": "FinverseSwap", 
                    "desc": "If true, the AVIS_MIN and AVIS_MAX values for this\n                  index vector have to be swapped."
                }, 
                {
                    "default": "FALSE", 
                    "name": "GenericMarker", 
                    "desc": "This Boolean may be used by any local traversal,\n\t  as long as you promise to reset it to its default\n\t  value when you are done. At present, it is used\n\t  by EDFA and LFU."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsScalarized", 
                    "desc": "Used by LACSO to indicate that a small array\n\t  argument or result has been scalarized. Its only\n\t  function is to prevent us from doing the scalarization\n\t  more than once."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsAffineHandled", 
                    "desc": "Used by PHUT to mark N_avis nodes whose values have\n\t  been traversed."
                }
            ], 
            "attributes": [
                {
                    "name": "Decl", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "targets": [
                        {
                            "phases": "all", 
                            "contains": "Vardec", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": "all", 
                            "contains": "Arg", 
                            "mandatory": "yes"
                        }
                    ], 
                    "description": "If this variable is a local, this is a link to its\n                  N_vardec. Otherwise, it is a function parameter,\n                  and this is a link to its N_arg."
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "cg_ctr", 
                            "from": "initial"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "yes", 
                    "type": "NewType", 
                    "name": "Type", 
                    "description": "the inferred type, which may be more precise than DeclType."
                }, 
                {
                    "name": "DeclType", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "NewType", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "the declared type, iff present."
                }, 
                {
                    "name": "ConstrType", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "NewType", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "type constraint as imposed by the applied use of the variable, iff present."
                }, 
                {
                    "name": "ConstrVar", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Avis", 
                        "mandatory": "no"
                    }, 
                    "description": "pointer to the avis of the predicat that results from the type constraint in ConstrType, iff present"
                }, 
                {
                    "name": "ConstrSet", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Constraint", 
                        "mandatory": "no"
                    }, 
                    "description": "pointer to set of non-type constraints  as imposed by the applied use of the variable, iff present"
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "Pos", 
                    "targets": {
                        "phases": [
                            "idc"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "ussa_ussa", 
                            "from": "ptc_ssa"
                        }, 
                        "contains": "Assign", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "SSAAssign", 
                    "description": "provides a direct link to the N_assign node containing the definition of the identifier represented by this AVIS node. In SSA form, AVIS_SSAASSIGN must only be NULL for identifiers for function arguments and with-loop index variables."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "SSACount", 
                    "targets": {
                        "phases": [
                            "ptc_ssa", 
                            "wlt_ssa", 
                            "popt_ssa"
                        ], 
                        "contains": "SSAcnt", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "SSAstack", 
                    "targets": {
                        "phases": [
                            "ptc_ssa", 
                            "wlt_ssa", 
                            "popt_ssa"
                        ], 
                        "contains": "SSAstack", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "SSAThen", 
                    "targets": {
                        "phases": [
                            "ptc_ssa", 
                            "wlt_ssa", 
                            "popt_ssa"
                        ], 
                        "contains": "Avis", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "SSAElse", 
                    "targets": {
                        "phases": [
                            "ptc_ssa", 
                            "wlt_ssa", 
                            "popt_ssa"
                        ], 
                        "contains": "Avis", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "targets": {
                        "phases": [
                            "opt_lir"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "NeedCount", 
                    "description": "xxx"
                }, 
                {
                    "targets": {
                        "phases": [
                            "opt_al", 
                            {
                                "to": "opt_ivexc", 
                                "from": "opt_saacyc_isaa"
                            }
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "WL_NeedCount", 
                    "description": "This is a count of the number of producerWL references\n             that occur in _sel_VxA_(iv, producerWL)\n             and _idxsel_( offset, producerWL) operations within \n             a consumerWL."
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "opt_ivexc", 
                            "from": "opt_saacyc_isaa"
                        }, 
                        "contains": "With", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Counting_WL", 
                    "description": "This field is the number of references to the producerWL that\n            created this value, from one, arbitrary-chosen consumerWL.\n            The field is used as a crude cost function on the producerWL,\n            so that the AWLF is performed only if all references to the\n            producerWL are from one other (consumerWL) WL."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "VarNo", 
                    "targets": {
                        "phases": [
                            "mem_rc", 
                            "mem_rcm"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "BotRT", 
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "NewType", 
                    "targets": {
                        "phases": [
                            "tc_ebt"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "Used in order to memorize a replacement type for bottom funcond variables."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Subst", 
                    "targets": [
                        {
                            "phases": [
                                "opt_scc", 
                                "opt_cyc_cse", 
                                "opt_lir", 
                                "pc_ussa", 
                                "wlt_ussa", 
                                "ussa_rera", 
                                "mem_racc"
                            ], 
                            "contains": "Avis", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": [
                                "pc_reso"
                            ], 
                            "contains": "Objdef", 
                            "mandatory": "no"
                        }
                    ]
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Avis", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Alt", 
                    "description": "Used by CompareTree to remember alpha conversion"
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "DefDepth", 
                    "targets": {
                        "phases": [
                            "lir", 
                            "awlf"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "BitField", 
                    "name": "LirMove", 
                    "targets": {
                        "phases": [
                            "lir"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Bool", 
                    "name": "ExpResult", 
                    "targets": {
                        "phases": [
                            "lir"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "targets": {
                        "phases": [
                            "ia"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "AliasMask", 
                    "description": "Used by Interface Analysis in order to \n            obtain the transitive hull of variable aliases."
                }, 
                {
                    "targets": {
                        "phases": [
                            "cu"
                        ], 
                        "contains": "Id", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "UniqueRef", 
                    "description": "First reference to this unique object declaration. Used to generate useful error messages in case of uniqueness violation."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "WithLoopLevel", 
                    "targets": {
                        "phases": [
                            "popt_unq"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Constant", 
                    "name": "Demand", 
                    "description": "This attribute constitutes the demand of a variable during the\n            specializing oracle for static shape knowledge."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "With3Fold", 
                    "targets": {
                        "phases": {
                            "to": "pc_lw3", 
                            "from": "wlt_ass"
                        }, 
                        "contains": "Fold", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "BlockSize", 
                    "targets": {
                        "phases": [
                            "daa"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Count", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": [
                            "pc_mc"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "Used to count number of times the variable is used on the lhs."
                }, 
                {
                    "name": "Lacso", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "targets": {
                        "phases": {
                            "to": "opt_saacyc_lacso", 
                            "from": "opt_saacyc_lacso"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "Hidey-hole used by LACSO to link the being-scalarized array to its\n\t   scalar elements. Strictly local, and could be eliminated with\n\t   a bit of work."
                }, 
                {
                    "default": "-1", 
                    "targets": {
                        "phases": [
                            "opt_saacyc_pogo"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "type": "Integer", 
                    "name": "PolylibColumnIndex", 
                    "description": "This is used by PHUTcollectAffineExprs to assign an\n\t  origin-1 column number to each distinct name found in\n\t  any particular affine expression tree."
                }
            ], 
            "checks": [
                "CHKavisReflection"
            ], 
            "description": "Arg and vardec information structure"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "ExtLink", 
                    "name": "Fundef", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Region", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "MT"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Region", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "EX"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Region", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "ST"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Region", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Cudast"
        }, 
        {
            "attributes": [
                {
                    "name": "Parts", 
                    "default": "-1", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "description": "The number of partitions in this with-loop.\n          I have no idea what the -1 indicates."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Pragma", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "scp_prs"
                        }, 
                        "contains": "Pragma", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "In_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Out_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Local_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "opt_saacyc_awlf", 
                            "from": "opt_saacyc_awlfi"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "Referenced", 
                    "description": "The total number of RHS references to the result of this WL."
                }, 
                {
                    "default": "0", 
                    "targets": {
                        "phases": {
                            "to": "opt_saacyc_awlf", 
                            "from": "opt_saacyc_awlfi"
                        }, 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "type": "Integer", 
                    "name": "Referenced_Fold", 
                    "description": "The number of RHS references, within a potential consumerWL,  \n            to the result of this WL, by the WL at\n            Referenced_consumerWL. WLF and AWLF can fold WLs only\n            if this field and WITH_REFERENCED are equal.\n            The only rationale for this restriction is that it prevents\n            the same producerWL element from being computed more than once."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "opt_saacyc_awlf", 
                            "from": "opt_saacyc_awlfi"
                        }, 
                        "contains": "Avis", 
                        "mandatory": "no"
                    }, 
                    "type": "Link", 
                    "name": "Referenced_consumerWL", 
                    "description": "The first consumerWL that refers to the result created by\n            this putative producerWL. See Referenced_Fold."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "References_Folded", 
                    "targets": {
                        "phases": [
                            "opt_cyc_wlf"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "targets": {
                        "phases": [
                            "opt_cyc_wlprop", 
                            "opt_cyc_wlprop"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "SelMax", 
                    "description": "Maximum number of F_sel_VxA_ selections found in any of\n            the code parts. This information is inferred by the WLSELC\n            (WithLoopSelectionCount) traversal."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "Cost", 
                    "targets": {
                        "phases": [
                            "opt_cyc_awlf"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "Dist", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "targets": {
                        "phases": [
                            "pc_ima"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "LUT", 
                    "name": "Access", 
                    "description": "A LUT containing information about the memory access patterns of\n            relatively free arrays, for the distributed backend."
                }
            ], 
            "sons": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Part", 
                        "mandatory": "yes"
                    }, 
                    "name": "Part", 
                    "description": "Definition of one partition of a with-loop."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Code", 
                        "mandatory": "yes"
                    }, 
                    "name": "Code", 
                    "description": "Chain of codes associated with one or more partitions \n\t    in the WL. Codes may be shared by more than one partition:\n\t    each partition has an attribute, PART_CODE, that points to\n\t    a WITH_CODE block."
                }, 
                {
                    "name": "WithOp", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WithOp", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsFoldable"
                }, 
                {
                    "default": "FALSE", 
                    "name": "Cudarizable"
                }, 
                {
                    "default": "FALSE", 
                    "name": "hasRC"
                }, 
                {
                    "name": "IsDependent"
                }, 
                {
                    "default": "FALSE", 
                    "name": "isAWLFFoldable"
                }, 
                {
                    "name": "containsFunAps", 
                    "desc": "indicates whether any partition contains an application\n             of a user defined function. This information is inferred in\n             the WLSELC (WithLoopSelectionCount) traversal."
                }
            ], 
            "name": "With"
        }, 
        {
            "attributes": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Code", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "yes", 
                    "type": "CodeLink", 
                    "name": "Code", 
                    "description": "A pointer to the WITH_CODE block that contains the code\n\t  for this partition.  if present, the used counter for the code\n            needs to be increased."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "InnerWlidxAssign", 
                    "targets": {
                        "phases": "", 
                        "contains": "Assign", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "ThreadBlockShape", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "cuda_acuwl"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "WithId", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Withid", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Generator", 
                    "targets": {
                        "phases": "all", 
                        "contains": [
                            "Generator", 
                            "Default"
                        ], 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Part", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsCopy", 
                    "desc": "Set to true if this WL partition is a copy partition.\n\t    I.e., it copies, without an index vector offset, elements of the\n\t    producer-WL partition.\n\t    This value is critical to optimizations that reuse\n\t    memory by performing in-placed indexed assigns into a small\n\t    part of a matrix. E.g., Gaussian Elimination."
                }, 
                {
                    "default": "TRUE", 
                    "name": "IsRefcounted"
                }, 
                {
                    "default": "FALSE", 
                    "name": "Cudarizable"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsConsumerPart", 
                    "desc": "Set to true if this WL partition has been determined\n            to be a consumer-WL, and a noteintersect has\n            been attached to it.\n            This is used by the cubeslicer to allow it to slice\n            cubes in CUBSLpart."
                }
            ], 
            "name": "Part"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "targets": [
                        {
                            "phases": {
                                "to": "ptc_ivd", 
                                "from": "initial"
                            }, 
                            "contains": "SPIds", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": {
                                "to": "mem_alloc", 
                                "from": "ptc_ivd"
                            }, 
                            "contains": "Ids", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": {
                                "to": "final", 
                                "from": "mem_alloc"
                            }, 
                            "contains": "Id", 
                            "mandatory": "yes"
                        }
                    ], 
                    "name": "Vec", 
                    "description": "This is the vector form of a WL generator. After explicit allocation (EMAL), Vec points to \n            an N_id node."
                }, 
                {
                    "targets": [
                        {
                            "phases": {
                                "to": "mem_alloc", 
                                "from": "ptc_ivd"
                            }, 
                            "contains": "Ids", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "ptc_ivd", 
                                "from": "initial"
                            }, 
                            "contains": "SPIds", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "final", 
                                "from": "mem_alloc"
                            }, 
                            "contains": "Exprs", 
                            "mandatory": "no"
                        }
                    ], 
                    "name": "Ids", 
                    "description": "This is the scalarized form of a WL generator. After explicit allocation (EMAL), Ids points to \n            an N_exprs-list of N_id nodes."
                }, 
                {
                    "default": "NULL", 
                    "targets": [
                        {
                            "phases": {
                                "to": "mem_alloc", 
                                "from": "opt_wlidx"
                            }, 
                            "contains": "Ids", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "final", 
                                "from": "mem_alloc"
                            }, 
                            "contains": "Exprs", 
                            "mandatory": "no"
                        }
                    ], 
                    "name": "Idxs", 
                    "description": "This is a chain of indices into the ravels of the results of genarray and modarray withloops. Once they are explicitly allocated in mem_alloc, they are transformed from identifier definitions (N_ids) into use sites (N_exprs of N_id)."
                }
            ], 
            "flags": [
                {
                    "name": "VecNeeded"
                }
            ], 
            "name": "Withid"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Prf", 
                    "name": "Op1", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Prf", 
                    "name": "Op2", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "targets": [
                        {
                            "phases": {
                                "to": "final", 
                                "from": "scp_prs"
                            }, 
                            "contains": "Expr", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": {
                                "to": "pre_acn", 
                                "from": "scp_prs"
                            }, 
                            "contains": "Dot", 
                            "mandatory": "yes"
                        }
                    ], 
                    "name": "Bound1", 
                    "description": "Bound must be an N_id or an N_array, except that, in \n                  saacyc, it must be an N_id."
                }, 
                {
                    "targets": [
                        {
                            "phases": {
                                "to": "final", 
                                "from": "scp_prs"
                            }, 
                            "contains": "Expr", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": {
                                "to": "pre_acn", 
                                "from": "scp_prs"
                            }, 
                            "contains": "Dot", 
                            "mandatory": "yes"
                        }
                    ], 
                    "name": "Bound2", 
                    "description": "Bound must be an N_id or an N_array, except that, \n                  in saacycit must be an N_id."
                }, 
                {
                    "name": "Step", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Width", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "opt_wrci", 
                            "from": "opt_cyc"
                        }, 
                        "contains": "Expr", 
                        "mandatory": "no"
                    }, 
                    "name": "GenWidth", 
                    "description": "GENWIDTH contains a vector resulting from subtracting BOUND1 from BOUND2. \n            GENWIDTH is introduced by wlsimplification which puts the operations performing the subtraction \n            in front of the loop. In many cases, the partial evaluation infrastructure can determine \n            a value for GENWIDTH although the bounds are not known at compile time.\n            Example: BOUND1 = [a], BOUND2 = [b], where b = a + [1] => GENWIDTH = [1].\n             GENWIDTH then serves three purposes: First, it is used by wlsimplicition to identify \n             empty generators which can then be eliminated. Second, it is used in constant folding \n             to propagate static index vector knowledge for one-element generators. \n             Finally, it is used by the with-loop reuse candidate inference mechanism \n             to identify further reuse candidates in situations where a WL A performs \n             mainly B[iv] except in exactly one generator where B[iv+off] is selected.\n             If off >= GENWIDTH, then B is a reuse candidate for A. \n             All GENWIDTH annotations are removed by wrci, the remaining computations are removed by dcr."
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Generator"
        }, 
        {
            "attributes": [], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Default"
        }, 
        {
            "attributes": [
                {
                    "mandatory": "yes", 
                    "name": "Used", 
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "Reference count - the number of PART_CODE\n\t entries that point to this code block."
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "Id", 
                    "targets": {
                        "phases": [
                            "final"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "AccessInfo", 
                    "name": "WLAA_Info", 
                    "targets": {
                        "phases": [
                            "initial"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "ReuseInfo", 
                    "name": "IRA_Info", 
                    "targets": {
                        "phases": "", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "ShpSeg", 
                    "name": "TSI_TileShp", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "no"
                    }, 
                    "name": "CBlock", 
                    "description": "A possibly empty list of N_assigns that correspond to the set\n\t of expressions that appear within the curly braces\n\t that (may) follow a WL generator specification."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }, 
                    "name": "CExprs", 
                    "description": "A non-empty list of N_exprs that represent the expressions\n\t that create the result elements associated with\n\t each WL partition generator."
                }, 
                {
                    "default": "NULL", 
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Code", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "Visited"
                }, 
                {
                    "name": "HasResolveableDependencies"
                }, 
                {
                    "default": "FALSE", 
                    "name": "HasExtrema", 
                    "desc": "Set to true if the WITHIDs for this code block have\n            extrema attached to them. This keeps IVEXI from\n            attaching extrema more than once per block."
                }
            ], 
            "name": "Code"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Dims", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Pragma", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Pragma", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "In_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Out_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Local_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "Omp_Private_List", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "ReUse", 
                    "targets": {
                        "phases": [
                            "rci"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "Dist", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "targets": {
                        "phases": [
                            "pc_ima"
                        ], 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "inconstructor": "no", 
                    "type": "LUT", 
                    "name": "Access", 
                    "description": "A LUT containing information about the memory access patterns of\n            relatively free arrays, for the Distributed backend."
                }
            ], 
            "sons": [
                {
                    "name": "WithId", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Withid", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Segs", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLseg", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Code", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Code", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "WithOp", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WithOp", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "NeedsOffset"
                }, 
                {
                    "name": "Parallelize"
                }, 
                {
                    "default": "FALSE", 
                    "name": "HasNaiveOrdering", 
                    "desc": "True, iff the naive compilation scheme was used and thus the with-loop is not computed in canonical order."
                }, 
                {
                    "default": "FALSE", 
                    "name": "Cudarizable"
                }
            ], 
            "name": "With2"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "SPEXPR", 
                    "targets": {
                        "phases": [
                            "sp"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Idx", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "opt_wlidx"
                        }, 
                        "contains": "Avis", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }, 
                    "name": "Shape", 
                    "description": "The frame shape of the result. The WL result shape\n            is: Shape ++ shape(Default)."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "no"
                    }, 
                    "name": "Default", 
                    "description": "The default cell of the result."
                }, 
                {
                    "default": "NULL", 
                    "name": "Mem", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "mem_alloc"
                        }, 
                        "contains": "Id", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Sub", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pc_mmv"
                        }, 
                        "contains": "Id", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "mem_rci", 
                            "from": "opt_wrci"
                        }, 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }, 
                    "name": "RC", 
                    "description": "RC(xxx) encodes that xxx is a reuse candidate for this WL, \n                   i.e., that the result of this WL or, more specifically,\n                   the operator the RC(xxx) is attached to, can potentially \n                   be stored in xxx. This information is inferred at the end\n                   of the optimisations, IIRC but only used later on \n                   in reference counting to perform memory reuse."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "mem_rci", 
                            "from": "opt_wrci"
                        }, 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }, 
                    "name": "PRC", 
                    "description": "PRC(xxx) encodes that xxx is a partial reuse candidate for \n\t\t   this WL, i.e., that the result of this WL or, more \n\t\t   specifically, the operator the PRC(xxx) is attached to, \n\t\t   can potentially be stored in an extension of xxx. This \n\t\t   information is inferred at the end of the optimisations, \n\t\t   but only used later on in reference counting to perform \n\t\t   data reuse of xxx is a prefix of the result."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wlsd"
                        }, 
                        "contains": "Array", 
                        "mandatory": "no"
                    }, 
                    "name": "DefShapeExpr", 
                    "description": "For with3 loops, the default element is given by genarray( DefShapeExpr, Default) where default denotes the default element of the genarray. Only present if a default element is present, as well."
                }, 
                {
                    "default": "NULL", 
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WithOp", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Genarray", 
            "description": "withloop generate array operation."
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "SPEXPR", 
                    "targets": {
                        "phases": [
                            "sp"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Idx", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "opt_wlidx"
                        }, 
                        "contains": "Avis", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Array", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Mem", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "mem_alloc"
                        }, 
                        "contains": "Id", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Sub", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pc_mmv"
                        }, 
                        "contains": "Id", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "mem_rci", 
                            "from": "opt_wrci"
                        }, 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }, 
                    "name": "RC", 
                    "description": "RC(xxx) encodes that xxx is a reuse candidate for this WL, \n                   i.e., that the result of this WL or, more specifically,\n                   the operator the RC(xxx) is attached to, can potentially \n                   be stored in xxx. This information is inferred at the end\n                   of the optimisations, IIRC but only used later on \n                   in reference counting to perform memory reuse."
                }, 
                {
                    "default": "NULL", 
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WithOp", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Modarray", 
            "description": "withloop operation"
        }, 
        {
            "attributes": [
                {
                    "targets": {
                        "phases": [
                            "sp"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "SPEXPR", 
                    "description": "Used in sac.y only in order to ship the WL body result\n                        into the N_code!"
                }
            ], 
            "sons": [
                {
                    "name": "Neutral", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Guard", 
                    "targets": [
                        {
                            "phases": {
                                "to": "sim_flt", 
                                "from": "scp"
                            }, 
                            "contains": "Expr", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "ptc_ivd", 
                                "from": "sim_flt"
                            }, 
                            "contains": "SPId", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": {
                                "to": "ptc_cwf", 
                                "from": "ptc_ivd"
                            }, 
                            "contains": "Id", 
                            "mandatory": "no"
                        }
                    ]
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": "all", 
                        "contains": "SPId", 
                        "mandatory": "no"
                    }, 
                    "name": "Fn", 
                    "description": "The reduction function."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }, 
                    "name": "Args", 
                    "description": "Relatively free arguments to the reduction function\n                       in case of the partial application."
                }, 
                {
                    "default": "NULL", 
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WithOp", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "SPFold", 
            "description": "withloop operation (SP version)"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "ExtLink", 
                    "name": "Fundef", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "OmpReductionOp", 
                    "default": "(omp_reduction_op)0", 
                    "inconstructor": "no", 
                    "type": "OmpOP", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }, 
                    "description": "This attribute indicates the type of OpenMP reducation operator."
                }
            ], 
            "sons": [
                {
                    "name": "Neutral", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Args", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Guard", 
                    "targets": {
                        "phases": {
                            "to": "ewl_accu", 
                            "from": "ptc_cwf"
                        }, 
                        "contains": "Id", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WithOp", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wlsd"
                        }, 
                        "contains": "Id", 
                        "mandatory": "no"
                    }, 
                    "name": "Initial", 
                    "description": "MUTC the value to start folding from."
                }, 
                {
                    "default": "NULL", 
                    "name": "PartialMem", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Id", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsPartialFold", 
                    "desc": "Flag to indicate if the fold performs a partial CUDA fold."
                }
            ], 
            "name": "Fold", 
            "description": "withloop operation"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "default": "NULL", 
                    "name": "Mem", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "mem_alloc"
                        }, 
                        "contains": "Id", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WithOp", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Break", 
            "description": "Withloop operation for stopping folding"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Default", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Expr", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WithOp", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Propagate", 
            "description": "Withloop operation for propagating objects between iterations"
        }, 
        {
            "attributes": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Dims", 
                    "description": "Gives the number of dimensions of this segment, i.e., the rank of the computed result."
                }, 
                {
                    "default": "0", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "Blocks", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Scheduling", 
                    "name": "Scheduling", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wltr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "TaskSel", 
                    "name": "TaskSel", 
                    "targets": {
                        "phases": [
                            "pc_mmv"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Contents", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLstride", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wltr"
                        }, 
                        "contains": "WLseg", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wltr"
                        }, 
                        "contains": "Array", 
                        "mandatory": "yes"
                    }, 
                    "name": "IdxInf", 
                    "description": "Gives the infimum of all indices in the iteration space of this segment. Note that for static segments (ISDYNAMIC == FALSE), this must be an array of integer constants."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wltr"
                        }, 
                        "contains": "Array", 
                        "mandatory": "yes"
                    }, 
                    "name": "IdxSup", 
                    "description": "Gives the supremum of all indices in the iteration space of this segment. Note that for non-dynamic segments (ISDYNAMIC == FALSE), this must be an array of integer constants."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wltr"
                        }, 
                        "contains": "Array", 
                        "mandatory": "no"
                    }, 
                    "name": "UBV", 
                    "description": "This son is only present if the segment is static (ISDYNAMIC == FALSE). The length of the vector is replicated by the BLOCKS attribute."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wltr"
                        }, 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }, 
                    "name": "BV", 
                    "description": "This son contains an N_exprs chain of integer vectors encoded as N_array nodes. The number of expressions in the chain needs to be equal to the BLOCKS attribute. Each vector, in turn, needs to have exactly DIMS many elements."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wltr"
                        }, 
                        "contains": "Array", 
                        "mandatory": "no"
                    }, 
                    "name": "SV", 
                    "description": "This son is only present if the segment is static (ISDYNAMIC == FALSE). The length of the vector is replicated by the BLOCKS attribute."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wltr"
                        }, 
                        "contains": "Array", 
                        "mandatory": "no"
                    }, 
                    "name": "HomSV", 
                    "description": "This son is only present if the segment is static (ISDYNAMIC == FALSE). The length of the vector is replicated by the BLOCKS attribute."
                }
            ], 
            "flags": [
                {
                    "name": "IsDynamic", 
                    "desc": "Signals that this segment has bounds that are not statically known."
                }
            ], 
            "name": "WLseg"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Level", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Dim", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Bound1", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Num", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Bound2", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Num", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Step", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Num", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "NextDim", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLblock", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Contents", 
                    "targets": [
                        {
                            "phases": "all", 
                            "contains": "WLublock", 
                            "mandatory": "no"
                        }, 
                        {
                            "phases": "all", 
                            "contains": "WLstride", 
                            "mandatory": "no"
                        }
                    ]
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLblock", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "WLblock"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Level", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Dim", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Bound1", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Num", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Bound2", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Num", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Step", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Num", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "NextDim", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLublock", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Contents", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLstride", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLublock", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "WLublock"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Level", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Dim", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "Part", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "wlt_wltr"
                        }, 
                        "contains": "Part", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": [
                            "Num", 
                            "Id"
                        ], 
                        "mandatory": "yes"
                    }, 
                    "name": "Bound1", 
                    "description": "Gives the lower bound of this stride. This needs to be an N_num if ISDYNAMIC is not set."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": [
                            "Num", 
                            "Id"
                        ], 
                        "mandatory": "yes"
                    }, 
                    "name": "Bound2", 
                    "description": "Gives the lower bound of this stride. This needs to be an N_num if ISDYNAMIC is not set."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": [
                            "Num", 
                            "Id"
                        ], 
                        "mandatory": "yes"
                    }, 
                    "name": "Step", 
                    "description": "Gives the step of this stride. This needs to be an N_num if ISDYNAMIC is not set."
                }, 
                {
                    "name": "Contents", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLgrid", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLstride", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "DoUnroll"
                }, 
                {
                    "name": "IsModified", 
                    "desc": "Used in wltransform."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsDynamic", 
                    "desc": "Signals that this stride has bounds or a step that are not statically known."
                }
            ], 
            "name": "WLstride"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Level", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Dim", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Code", 
                        "mandatory": "yes"
                    }, 
                    "inconstructor": "yes", 
                    "type": "CodeLink", 
                    "name": "Code", 
                    "description": "if present, the used counter for the code\n            needs to be increased"
                }
            ], 
            "sons": [
                {
                    "targets": [
                        {
                            "phases": "all", 
                            "contains": "Num", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": "all", 
                            "contains": "Id", 
                            "mandatory": "yes"
                        }
                    ], 
                    "name": "Bound1", 
                    "description": "Encodes the lower bound of the grid. This needs to be a N_num node if ISDYNAMIC is not set."
                }, 
                {
                    "targets": [
                        {
                            "phases": "all", 
                            "contains": "Num", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": "all", 
                            "contains": "Id", 
                            "mandatory": "yes"
                        }
                    ], 
                    "name": "Bound2", 
                    "description": "Encodes the upper bound of the grid. This needs to be a N_num node if ISDYNAMIC is not set."
                }, 
                {
                    "name": "NextDim", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLstride", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "WLgrid", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsFitted"
                }, 
                {
                    "name": "DoUnroll"
                }, 
                {
                    "name": "IsNoOp"
                }, 
                {
                    "name": "IsModified", 
                    "desc": "Used in wltransform."
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsDynamic", 
                    "desc": "Signals that this grid has bounds that are not statically known."
                }
            ], 
            "name": "WLgrid"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Link", 
                    "name": "Graph", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Dataflowgraph", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Link", 
                    "name": "Assign", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Assign", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "NodeList", 
                    "name": "Dependent", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "NodeList", 
                    "name": "UsedNodes", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "1", 
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "RefCount", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "MUTH_ANY", 
                    "inconstructor": "no", 
                    "type": "MTExecMode", 
                    "name": "ExecMode", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "DFGThen", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Link", 
                    "name": "DFGElse", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "RefLeft", 
                    "targets": {
                        "phases": [
                            "AssignmentsRearrange"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "name": "IsUsed"
                }
            ], 
            "name": "Dataflownode"
        }, 
        {
            "attributes": [
                {
                    "default": "NULL", 
                    "type": "NodeList", 
                    "name": "Members", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Source", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Dataflownode", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "Sink", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Dataflownode", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "default": "NULL", 
                    "inconstructor": "no", 
                    "type": "Node", 
                    "name": "MyHomeDFN", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Dataflownode", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Dataflowgraph"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Mod", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Interface", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Symbol", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Symbol", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "All"
                }
            ], 
            "name": "Import"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Interface", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Symbol", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Symbol", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "All"
                }
            ], 
            "name": "Export"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Mod", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Interface", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Symbol", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Symbol", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "All"
                }
            ], 
            "name": "Use"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Interface", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Symbol", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Symbol", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "All"
                }
            ], 
            "name": "Provide"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Id", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Symbol", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "Used", 
                    "desc": "Used to flag those symbols that are in fact used, that is, those that do exist in the module."
                }
            ], 
            "name": "Symbol"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "ExtLink", 
                    "name": "Member", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Objdef", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Set", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Set"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Link", 
                    "name": "PredAvis", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Avis", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Expr", 
                    "targets": {
                        "phases": "all", 
                        "contains": [
                            "Prf", 
                            "Ap"
                        ], 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Constraint", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Constraint"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "NewType", 
                    "name": "Type", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "Integer", 
                    "name": "Linksign", 
                    "targets": {
                        "phases": {
                            "to": "final", 
                            "from": "pre_rpr"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Ret", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "TRUE", 
                    "name": "IsAliasing"
                }, 
                {
                    "name": "IsArtificial", 
                    "desc": "Set to true if the given return value was introduced when resolving reference arguments and thus will be removed again later on. Set to false for all other return values."
                }, 
                {
                    "default": "TRUE", 
                    "name": "IsRefcounted"
                }, 
                {
                    "name": "HasLinksignInfo"
                }, 
                {
                    "name": "IsCReturn"
                }, 
                {
                    "default": "FALSE", 
                    "name": "WasRemoved"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsUnique"
                }
            ], 
            "name": "Ret"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Link", 
                    "name": "Avis", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Avis", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Ids", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Ids"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Val", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Nums", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Nums", 
            "description": "Linked list of Integers, used only in scanner/parser"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "ExtLink", 
                    "name": "Objdef", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Objdef", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Globobj"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Namespace", 
                    "name": "Ns", 
                    "targets": {
                        "phases": {
                            "to": "ptc_goi", 
                            "from": "initial"
                        }, 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "SPId"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "SPIds", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "SPIds"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "SpawnPlace", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Id", 
                    "targets": {
                        "phases": "all", 
                        "contains": "SPId", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Args", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsSpawned", 
                    "desc": "This function is spawned when using functional\n          parallelism"
                }, 
                {
                    "name": "IsRemote", 
                    "desc": "This function call should be spawned on another resource"
                }
            ], 
            "name": "SPAp"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "message", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "CompilerPhase", 
                    "name": "anyphase", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Error", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Error"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "Name", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Namespace", 
                    "name": "Ns", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "String", 
                    "name": "ExtName", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "yes", 
                    "type": "Integer", 
                    "name": "Arity", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Fundef", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Fundef", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": [
                            "Fundef", 
                            "FunBundle"
                        ], 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "name": "IsXtBundle", 
                    "desc": "Used to tack a funbundle as an XT version of another\n            bundler"
                }, 
                {
                    "name": "IsStBundle", 
                    "desc": "Used to tack a funbundle as an ST version of another\n            bundler"
                }
            ], 
            "name": "FunBundle"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "In_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Out_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "DFMask", 
                    "name": "Local_Mask", 
                    "targets": {
                        "phases": [
                            "ptc_l2f", 
                            "popt_l2f", 
                            "pc_lw3"
                        ], 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "inconstructor": "no", 
                    "type": "String", 
                    "name": "Dist", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "no"
                    }
                }
            ], 
            "sons": [
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Range", 
                        "mandatory": "yes"
                    }, 
                    "name": "Ranges", 
                    "description": "Gives the set of ranges (generators) this with-loop is defined for. Needs to be a full partition of the outer-most dimension of the result."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "WithOp", 
                        "mandatory": "yes"
                    }, 
                    "name": "Operations", 
                    "description": "The operations this with-loop computes."
                }
            ], 
            "flags": [
                {
                    "default": "TRUE", 
                    "name": "UseConcurrentRanges", 
                    "desc": "Controls whether the ranges of a with3 will be computed concurrently, or whether the ranges are sequentialised"
                }, 
                {
                    "default": "TRUE", 
                    "name": "Dense", 
                    "desc": "This with3 covers all of the index space without gaps"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsTopLevel", 
                    "desc": "This with3 represents a top-level stride of a former with2. This is used to indetify into what array the IIRR (see N_range) indexes."
                }
            ], 
            "name": "With3", 
            "description": "Used to model the 1d with-loop used by the mutc backend.  The with3 loop is nested to provide the needed number of detentions"
        }, 
        {
            "attributes": [
                {
                    "default": "0", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }, 
                    "type": "Integer", 
                    "name": "BlockSize", 
                    "description": "Used for resource allocation. Corresponds to the blocksize argument of the create instruction in mutc."
                }, 
                {
                    "default": "0", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Assign", 
                        "mandatory": "no"
                    }, 
                    "type": "Link", 
                    "name": "G2SInstrs", 
                    "description": "Used for temporarily storing global to shared memory data load instructions."
                }
            ], 
            "sons": [
                {
                    "targets": [
                        {
                            "phases": {
                                "to": "mem_alloc", 
                                "from": "wlt_wlsd"
                            }, 
                            "contains": "Ids", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": {
                                "to": "pc_lw3", 
                                "from": "mem_alloc"
                            }, 
                            "contains": "Id", 
                            "mandatory": "yes"
                        }
                    ], 
                    "name": "Index", 
                    "description": "Scalar index of this range."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": [
                            "Num", 
                            "Id"
                        ], 
                        "mandatory": "yes"
                    }, 
                    "name": "LowerBound", 
                    "description": "Lower bound of this range."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": [
                            "Num", 
                            "Id"
                        ], 
                        "mandatory": "yes"
                    }, 
                    "name": "UpperBound", 
                    "description": "Upper bound of this range."
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": [
                            "Num", 
                            "Id"
                        ], 
                        "mandatory": "no"
                    }, 
                    "name": "ChunkSize", 
                    "description": "Chunk size of this range. If non-NULL, this range is not computed by computing each cell alone, but by computing vectors of ChunkSize many elements per iteration. Note that the total number of elements computed by this range needs to be a multiple of ChunkSize! If the range is 0 then the chunk must be 1!"
                }, 
                {
                    "targets": {
                        "phases": "all", 
                        "contains": "Block", 
                        "mandatory": "yes"
                    }, 
                    "name": "Body", 
                    "description": "Block computed for each iteration."
                }, 
                {
                    "targets": [
                        {
                            "phases": {
                                "to": "pc_lw3", 
                                "from": "wlt_wlsd"
                            }, 
                            "contains": "Exprs", 
                            "mandatory": "yes"
                        }, 
                        {
                            "phases": {
                                "to": "final", 
                                "from": "pc_lw3"
                            }, 
                            "contains": "Ap", 
                            "mandatory": "yes"
                        }
                    ], 
                    "name": "Results", 
                    "description": "Values assigned to the result for each iteration."
                }, 
                {
                    "targets": {
                        "phases": {
                            "to": "mem_dr", 
                            "from": "wlt_wlsd"
                        }, 
                        "contains": "Ids", 
                        "mandatory": "no"
                    }, 
                    "name": "Idxs", 
                    "description": "This is a chain of indices into the ravels of the results of genarray and modarray withloops. Once they are explicitly used in mem_alloc and mem_dr, this special reference is freed."
                }, 
                {
                    "default": "NULL", 
                    "targets": {
                        "phases": {
                            "to": "mem_dr", 
                            "from": "wlt_wlsd"
                        }, 
                        "contains": "Exprs", 
                        "mandatory": "no"
                    }, 
                    "name": "IIRR", 
                    "description": "This is a chain of indices into the ravel of the overall result of genarray/modarray withloops. It corresponds (value-wise) to the wlidx of the origininal with2 and is used in optimisations like data-reuse to identify selections into the reused array. This chain only exists for the ranges of the innermost with3 of a transformed with2, as it is only defined in that level."
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Range", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "IsGlobal", 
                    "desc": "True iff this range should be distributed globally over multiple cores"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsBlocked", 
                    "desc": "True iff this range is blocked by the blocking pragma"
                }, 
                {
                    "default": "FALSE", 
                    "name": "IsFitting", 
                    "desc": "True iff this range is a fitting range"
                }, 
                {
                    "default": "FALSE", 
                    "name": "NeedCudaUnroll", 
                    "desc": "True iff this range needs to be unrolled by the CUDA compiler"
                }
            ], 
            "name": "Range", 
            "description": "The generator of a with3"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Dag", 
                    "name": "Dag", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "VFams", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Idagvfam", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "EFams", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Idagefam", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Idag", 
            "description": "Node to represent infinite graphs as needed for the subtyping relation\n        of the array shape type component"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "IdagFun", 
                    "name": "Cmpfun", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "default": "NULL", 
                    "name": "Vertices", 
                    "targets": {
                        "phases": "all", 
                        "contains": "IdagVertices", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Froms", 
                    "targets": {
                        "phases": "all", 
                        "contains": "IdagEFams", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "default": "NULL", 
                    "name": "Tos", 
                    "targets": {
                        "phases": "all", 
                        "contains": "IdagEFams", 
                        "mandatory": "no"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "IdagVFam", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "IdagVFam", 
            "description": "represents the head entry of a vertex family chain"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "IdagFun", 
                    "name": "Checkfun", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "From", 
                    "targets": {
                        "phases": "all", 
                        "contains": "IdagVFam", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "To", 
                    "targets": {
                        "phases": "all", 
                        "contains": "IdagVFam", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "IdagEFam", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "IdagEFam", 
            "description": "represents the head entry of a edge family chain"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "Vertex", 
                    "name": "Vertex", 
                    "targets": {
                        "phases": "all", 
                        "contains": "any", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Idagvertices", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "IdagVertices", 
            "description": "a simple chain of links to vertices"
        }, 
        {
            "attributes": [
                {
                    "inconstructor": "yes", 
                    "type": "ExtLink", 
                    "name": "EFam", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Idagefam", 
                        "mandatory": "yes"
                    }
                }
            ], 
            "sons": [
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Idagefams", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "IdagEFams", 
            "description": "a simple chain of links to edge family entries"
        }, 
        {
            "attributes": [], 
            "sons": [
                {
                    "name": "With", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Withloop", 
                        "mandatory": "yes"
                    }
                }, 
                {
                    "name": "Next", 
                    "targets": {
                        "phases": "all", 
                        "contains": "Withs", 
                        "mandatory": "no"
                    }
                }
            ], 
            "flags": [
                {
                    "default": "FALSE", 
                    "name": "DummyFlag"
                }
            ], 
            "name": "Withs", 
            "description": "a simple chain of with-loops, used by distributed backend to support\n            different transformations of with-loop code for each target architecture."
        }
    ]
}