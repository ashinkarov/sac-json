var syntaxtree_json =    
{
    "Module": {
        "attributes": {
            "Namespace": {
                "inconstructor": true, 
                "type": "Namespace", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "FileType": {
                "inconstructor": true, 
                "type": "FileType", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "WrapperFuns": {
                "inconstructor": false, 
                "type": "LUT", 
                "targets": {
                    "phases": {
                        "to": "tc_swr", 
                        "from": "ptc_cwf"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Deprecated": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Interface": {
                "targets": {
                    "phases": "all", 
                    "contains": "Interface", 
                    "mandatory": false
                }, 
                "description": [
                    "symbols imported and exported by the module"
                ]
            }, 
            "Typefamilies": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Tfspec", 
                    "mandatory": false
                }, 
                "description": [
                    "Specification of type families"
                ]
            }, 
            "Structs": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Structdef", 
                    "mandatory": false
                }, 
                "description": [
                    "structs defined within the module"
                ]
            }, 
            "Types": {
                "targets": {
                    "phases": "all", 
                    "contains": "Typedef", 
                    "mandatory": false
                }, 
                "description": [
                    "types defined within the module"
                ]
            }, 
            "Objs": {
                "targets": {
                    "phases": "all", 
                    "contains": "Objdef", 
                    "mandatory": false
                }
            }, 
            "Funs": {
                "targets": {
                    "phases": "all", 
                    "contains": "Fundef", 
                    "mandatory": false
                }
            }, 
            "ThreadFuns": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc_lw3"
                    }, 
                    "contains": "Fundef", 
                    "mandatory": false
                }, 
                "description": [
                    "Contains thread functions for mutc back-end."
                ]
            }, 
            "FunDecs": {
                "targets": {
                    "phases": "all", 
                    "contains": "Fundef", 
                    "mandatory": false
                }
            }, 
            "FunSpecs": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "tc_esp", 
                        "from": "scp_prs"
                    }, 
                    "contains": "Fundef", 
                    "mandatory": false
                }, 
                "description": [
                    "contains the signatures of forced specializations"
                ]
            }, 
            "SPMDStore": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "Assign", 
                    "mandatory": false
                }
            }, 
            "FPFrameStore": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "Assign", 
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
            "node for a module declaration"
        ]
    }, 
    "Structdef": {
        "attributes": {
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "CopyConstructor": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Fundef", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Structelem": {
                "targets": {
                    "phases": "all", 
                    "contains": "Structelem", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Structdef", 
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
            "definition of a struct"
        ]
    }, 
    "Tfspec": {
        "attributes": {}, 
        "sons": {
            "Defs": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfvertex", 
                    "mandatory": true
                }
            }, 
            "Rels": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfrel", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Declaration of type families and relations"
        ]
    }, 
    "Tfdag": {
        "attributes": {
            "Root": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Tfvertex", 
                    "mandatory": false
                }
            }, 
            "Info": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "CompInfo", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Dirty": {
                "inconstructor": false, 
                "type": "Int", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Defs": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfvertex", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Type hierarchy DAG"
        ]
    }, 
    "Tfvertex": {
        "attributes": {
            "pre": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "premax": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "post": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "topo": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "eulerid": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "depth": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "numtopovisits": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "mineqchildvisits": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "numparents": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "numchildren": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "row": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "reachcola": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "reachcolb": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "lubcol": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "distcol": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Ancestors": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "NodeList", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "wrapperlink": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "VertexWrapper", 
                "targets": {
                    "phases": "all", 
                    "contains": "Tfvertex", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Parents": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfedge", 
                    "mandatory": false
                }
            }, 
            "Children": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfedge", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfvertex", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsCompRoot": {
                "default": "FALSE"
            }, 
            "IsTopoVisited": {
                "default": "FALSE"
            }, 
            "IsDFSVisited": {
                "default": "FALSE"
            }, 
            "IsRchColaMarked": {
                "default": "FALSE"
            }, 
            "IsRchColbMarked": {
                "default": "FALSE"
            }, 
            "IsRowMarked": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Vertices in a graph"
        ]
    }, 
    "Tfrel": {
        "attributes": {
            "Subtag": {
                "default": "NULL", 
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Supertag": {
                "default": "NULL", 
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Cond": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfexpr", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfrel", 
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
            "Type family relations"
        ]
    }, 
    "Tfexpr": {
        "attributes": {
            "Assigneeid": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Value": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Int", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Operator": {
                "default": "NULL", 
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Operand1": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfexpr", 
                    "mandatory": false
                }
            }, 
            "Operand2": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfexpr", 
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
            "Expression for type family relation"
        ]
    }, 
    "Tfedge": {
        "attributes": {
            "Target": {
                "default": "NULL", 
                "inconstructor": true, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Tfvertex", 
                    "mandatory": false
                }
            }, 
            "Edgetype": {
                "inconstructor": false, 
                "type": "Int", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Tfedge", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "WasClassified": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Parents and children of a vertex"
        ]
    }, 
    "TypeComponentArg": {
        "attributes": {
            "tag": {
                "default": "NULL", 
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "tagtype": {
                "default": "NULL", 
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "TypeComponentArg", 
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
            "Arguments to type families"
        ]
    }, 
    "Typedef": {
        "attributes": {
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Ns": {
                "inconstructor": true, 
                "type": "Namespace", 
                "targets": [
                    {
                        "phases": [
                            {
                                "to": "mod_ans", 
                                "from": "initial"
                            }, 
                            {
                                "to": "final", 
                                "from": "pc_rid"
                            }
                        ], 
                        "contains": "any", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "pc_rid", 
                            "from": "mod_ans"
                        }, 
                        "contains": "any", 
                        "mandatory": false
                    }
                ]
            }, 
            "Component": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "NType": {
                "inconstructor": true, 
                "type": "NewType", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Pragma": {
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": {
                        "to": "pre_rpr", 
                        "from": "scp"
                    }, 
                    "contains": "Pragma", 
                    "mandatory": false
                }
            }, 
            "CopyFun": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pre_rpr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "InitFun": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pre_rpr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "FreeFun": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pre_rpr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Icm": {
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "Icm", 
                    "mandatory": false
                }
            }, 
            "SymbolName": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "mod_imp"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Structdef": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "Structdef", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Args": {
                "targets": {
                    "phases": "all", 
                    "contains": "TypeComponentArg", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Typedef", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsAbstract": {}, 
            "IsBuiltin": {}, 
            "IsExported": {}, 
            "IsProvided": {}, 
            "IsLocal": {
                "default": "TRUE"
            }, 
            "IsUnique": {}, 
            "IsAlias": {}, 
            "IsNested": {}
        }, 
        "description": [
            "definition of a user defined type"
        ]
    }, 
    "Objdef": {
        "attributes": {
            "Type": {
                "inconstructor": true, 
                "type": "NewType", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Ns": {
                "inconstructor": true, 
                "type": "Namespace", 
                "targets": [
                    {
                        "phases": [
                            {
                                "to": "mod_ans", 
                                "from": "initial"
                            }, 
                            {
                                "to": "final", 
                                "from": "pc_rid"
                            }
                        ], 
                        "contains": "any", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "pc_rid", 
                            "from": "mod_ans"
                        }, 
                        "contains": "any", 
                        "mandatory": true
                    }
                ]
            }, 
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "LinkName": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pre_rpr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Pragma": {
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": {
                        "to": "pre_rpr", 
                        "from": "scp"
                    }, 
                    "contains": "Pragma", 
                    "mandatory": true
                }
            }, 
            "ArgAvis": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "ptc_rso", 
                    "contains": "Id", 
                    "mandatory": true
                }
            }, 
            "NT_Tag": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Icm": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "Icm", 
                    "mandatory": false
                }
            }, 
            "InitFun": {
                "inconstructor": false, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "Fundef", 
                    "mandatory": false
                }
            }, 
            "SymbolName": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "mod_imp"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Expr": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Objdef", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsExported": {}, 
            "IsProvided": {}, 
            "IsLocal": {
                "default": "TRUE"
            }, 
            "IsExtern": {}, 
            "IsAlias": {}, 
            "IsNeeded": {
                "default": "TRUE"
            }
        }
    }, 
    "Fundef": {
        "attributes": {
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Ns": {
                "inconstructor": true, 
                "type": "Namespace", 
                "targets": [
                    {
                        "phases": [
                            {
                                "to": "mod_ans", 
                                "from": "initial"
                            }, 
                            {
                                "to": "final", 
                                "from": "pc_rid"
                            }
                        ], 
                        "contains": "any", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "pc_rid", 
                            "from": "mod_ans"
                        }, 
                        "contains": "any", 
                        "mandatory": true
                    }
                ]
            }, 
            "SymbolName": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "mod_imp"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "CudaLinkName": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pre_rpr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "Symbol name of cuda version of this function"
                ]
            }, 
            "LinkName": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pre_rpr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "WrapperType": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "NewType", 
                "targets": {
                    "phases": {
                        "to": "opt_fdi", 
                        "from": "mod_imp"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "FunNo": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "opt_pfap"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Pragma": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": "all", 
                    "contains": "Pragma", 
                    "mandatory": false
                }
            }, 
            "Types": {
                "inconstructor": false, 
                "type": "OldType", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_ctr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Specs": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "tc"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Return": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "cg_ctr", 
                        "from": "ptc_l2f"
                    }, 
                    "contains": "Return", 
                    "mandatory": false
                }
            }, 
            "LoopRecursiveAp": {
                "targets": {
                    "phases": {
                        "to": "ussa_f2l", 
                        "from": "ptc_l2f"
                    }, 
                    "contains": "Ap", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Link", 
                "description": [
                    "In a LOOPFUN, this is the N_ap that is the recursive call within the LOOPFUN."
                ]
            }, 
            "Impl": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "mod_imp"
                    }, 
                    "contains": "Fundef", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "ExtLink", 
                "description": [
                    "Points to the implementation. In case of a wrapper function this is the only available", 
                    "instance. In case of an objectwrapper this is the wrapped function instance."
                ]
            }, 
            "SpawnFun": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "popt_cspf"
                    }, 
                    "contains": "Fundef", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "ExtLink", 
                "description": [
                    "Points to the copy of this function that can be used as target for a spawn operation", 
                    "in the mutc backend."
                ]
            }, 
            "SpecNs": {
                "inconstructor": false, 
                "type": "Namespace", 
                "targets": {
                    "phases": {
                        "to": "tc_swr", 
                        "from": "tc_esp"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "IcmDefBegin": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "Icm", 
                    "mandatory": true
                }, 
                "inconstructor": false, 
                "type": "Node", 
                "description": [
                    "ICM for the beginning function definitions"
                ]
            }, 
            "IcmDecl": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "Icm", 
                    "mandatory": true
                }, 
                "inconstructor": false, 
                "type": "Node", 
                "description": [
                    "ICM for function decelerations"
                ]
            }, 
            "IcmDefEnd": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "Icm", 
                    "mandatory": true
                }, 
                "inconstructor": false, 
                "type": "Node", 
                "description": [
                    "ICM to mark the end of a function definition"
                ]
            }, 
            "TCStat": {
                "inconstructor": false, 
                "type": "TypeCheckingStatus", 
                "targets": {
                    "phases": "tc", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "DFM_Base": {
                "inconstructor": false, 
                "type": "DFMaskBase", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "ArgTab": {
                "inconstructor": false, 
                "type": "ArgTab", 
                "targets": {
                    "phases": {
                        "to": "icc_frtr", 
                        "from": "pc_fpc"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Companion": {
                "targets": {
                    "phases": "mt_mtstf", 
                    "contains": "Fundef", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "ExtLink", 
                "description": [
                    "This link points to the companion function of the current function. In case this", 
                    "is the sequential version (as encoded by ISSTFUN) of the function, the companion", 
                    "will be the parallel version (as encoded by ISMTFUN) and vice versa. The attribute", 
                    "is used in both implementations of MT."
                ]
            }, 
            "XTCompanion": {
                "targets": {
                    "phases": "mt_mtstf", 
                    "contains": "Fundef", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "ExtLink", 
                "description": [
                    "This link points to the XT companion function of the current function. This is used", 
                    "in the module version of create MT/ST/XT functions (MTSTFMOD)."
                ]
            }, 
            "MTCompanion": {
                "targets": {
                    "phases": "mt_mtstf", 
                    "contains": "Fundef", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "ExtLink", 
                "description": [
                    "This link points to the MT companion function of the current function. This is used", 
                    "in the module version of create MT/ST functions (MTSTFMOD)."
                ]
            }, 
            "ExecMode": {
                "inconstructor": false, 
                "type": "MTExecMode", 
                "targets": {
                    "phases": {
                        "to": "pc", 
                        "from": "mt"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "AkvId": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "description": [
                    "Identifier for function instances with akv-arguments (used for function naming in", 
                    "renameidentifiers.c)"
                ]
            }, 
            "InlineCounter": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "opt_cyc_linl", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "description": [
                    "Counter for how many times the function has been recursively inlined."
                ]
            }, 
            "LastChange": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": {
                        "to": "tc_ti", 
                        "from": "tc_sossk"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "description": [
                    "This attribute indicates in which iteration round the PV of the function itself was", 
                    "changed the last time during the specialization oracle for static shape knowledge."
                ]
            }, 
            "LastIterationRound": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": {
                        "to": "tc_ti", 
                        "from": "tc_sossk"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "description": [
                    "This attribute indicates in which iteration round this function was the last time", 
                    "\"iterated\" (fully or partially) during the specialization oracle for static shape", 
                    "knowledge"
                ]
            }, 
            "Depth": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "description": [
                    "Used to count the depth in the static call graph. (see distribute_threads.c)"
                ]
            }, 
            "Height": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "description": [
                    "Used to count the height in the static call graph. (see distribute_threads.c)"
                ]
            }, 
            "Structgetter": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "Structelem", 
                    "mandatory": false
                }, 
                "description": [
                    "If this function is a getter for a struct element, this attribute points to that", 
                    "element."
                ]
            }, 
            "Structsetter": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "Structelem", 
                    "mandatory": false
                }, 
                "description": [
                    "If this function is a setter for a struct element, this attribute points to that", 
                    "element."
                ]
            }, 
            "Callfun": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "Fundef", 
                    "mandatory": false
                }, 
                "description": [
                    "This attribute is used by check_lacfuns to determine unique call sites of LaC functions."
                ]
            }, 
            "SlowClone": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc_msc"
                    }, 
                    "contains": "Fundef", 
                    "mandatory": false
                }, 
                "description": [
                    "This attribute points to the slow clone implementation if this fundef is the fast", 
                    "clone"
                ]
            }, 
            "NumSpawnSync": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "tp_css"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "WLCount": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cuda_cutem"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Livevars": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "tp_lva"
                    }, 
                    "contains": "Livevars", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Node", 
                "description": [
                    "Contains a union of all livevars inside the body"
                ]
            }, 
            "FPFrameName": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc_msc"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "String", 
                "description": [
                    "When this function contains spawn, unique function name is saved here for the name", 
                    "used in the task frame."
                ]
            }, 
            "withops": {
                "targets": {
                    "phases": {
                        "to": "cg_cpl", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "WithOp", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Link", 
                "description": [
                    "Used by mutc backend for lifting desc mallocs up"
                ]
            }
        }, 
        "sons": {
            "Rets": {
                "targets": [
                    {
                        "phases": [
                            {
                                "to": "ptc_rrp", 
                                "from": "initial"
                            }, 
                            {
                                "to": "final", 
                                "from": "ussa_rera"
                            }
                        ], 
                        "contains": "Ret", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "ussa_rera", 
                            "from": "ptc_rrp"
                        }, 
                        "contains": "Ret", 
                        "mandatory": true
                    }
                ]
            }, 
            "Args": {
                "targets": {
                    "phases": "all", 
                    "contains": "Arg", 
                    "mandatory": false
                }
            }, 
            "Asserts": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Udcs", 
                    "mandatory": false
                }
            }, 
            "Body": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Fundef", 
                    "mandatory": false
                }
            }, 
            "Objects": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Set", 
                    "mandatory": false
                }
            }, 
            "AffectedObjects": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }
            }, 
            "LocalFuns": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "opt_uglf", 
                        "from": "opt_glf"
                    }, 
                    "contains": "Fundef", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsMain": {
                "desc": [
                    "This function is the main function of a program."
                ]
            }, 
            "IsExported": {
                "desc": [
                    "This function is being exported from the current namespace and will thus be fully", 
                    "visible from outside."
                ]
            }, 
            "IsProvided": {
                "desc": [
                    "This function is being provided from the current namespace and will thus be available", 
                    "for use from outside, only."
                ]
            }, 
            "WasImported": {
                "desc": [
                    "This function was imported from another namespace. This as well means that it is", 
                    "local now."
                ]
            }, 
            "WasUsed": {
                "desc": [
                    "This function was used from another namespace. This as well means that it is not", 
                    "local."
                ]
            }, 
            "IsLocal": {
                "default": "TRUE", 
                "desc": [
                    "This function is defined locally in the current namespace. That is, it was defined", 
                    "locally or imported."
                ]
            }, 
            "IsSticky": {
                "default": "FALSE", 
                "desc": [
                    "This function should not be removed by DeadFunctionRemoval. This is mainly used by", 
                    "the module system to ensure that for all exported functions code is generated. Furthermore,", 
                    "it is used to ensure that the prelude functions are not removed during compilation."
                ]
            }, 
            "IsSACargConversion": {
                "default": "FALSE", 
                "desc": [
                    "This function is a special SACarg conversion function used by the C interface. This", 
                    "tag is mainly used to ensure that these functions do not turn up in the resulting", 
                    "C header file."
                ]
            }, 
            "IsNeeded": {
                "desc": [
                    "This flag is used in multiple phases, usually to tag functions that are referenced", 
                    "in some sense. It has always to be reset to FALSE at the end of each phase."
                ]
            }, 
            "IsCondFun": {
                "desc": [
                    "This is a lifted conditional. The function is only referenced once from the context", 
                    "the conditional was lifted from."
                ]
            }, 
            "IsLoopFun": {
                "desc": [
                    "This function is a functional representation of a do loop; it is only referenced", 
                    "twice: Once from the context the loop was lifted from and once from the inner recursive", 
                    "application."
                ]
            }, 
            "IsObjInitFun": {
                "desc": [
                    "This function is a global object initialiser function derived from the objdef expression."
                ]
            }, 
            "IsThreadFun": {
                "desc": [
                    "This function is a mutc thread function."
                ]
            }, 
            "WasWith3Body": {}, 
            "IsSpmdfun": {
                "desc": [
                    "This function is a lifted region (usually one withloop) from a SPMD-block; it is", 
                    "only called once from within the region it was lifted from. From a backend perspective,", 
                    "the SPMD function is the transition from sequential to parallel execution. It is", 
                    "called while in sequential mode, its body is exectuted in parallel by multiple threads", 
                    "and it syncronizes on the return."
                ]
            }, 
            "IsXtSpmdfun": {
                "desc": [
                    "Same as IsSpmdFun, will be TRUE for XT SPMD functions."
                ]
            }, 
            "IsMtfun": {
                "desc": [
                    "This is (potentially) a copy of the original function that will be executed in parallel", 
                    "by multiple threads during runtime. Note that all functions called from such a function", 
                    "need to be MT-funs, as well. If the function is only used in parallel context, this", 
                    "may in fact be the original function that has been reused."
                ]
            }, 
            "IsStfun": {
                "desc": [
                    "This is (potentially) a copy of the original function that will be executed sequentially", 
                    "by a single thread during runtime. If the function is only used in sequential context,", 
                    "this may in fact be the original function that has been reused."
                ]
            }, 
            "IsXtfun": {
                "desc": [
                    "This is (potentially) a copy of the original function that will be executed in a", 
                    "multi-threaded context and might go parallel."
                ]
            }, 
            "IsCudastGlobalfun": {
                "default": "FALSE", 
                "desc": [
                    "This is a single threaded cuda global kernel function."
                ]
            }, 
            "IsCudaGlobalfun": {
                "default": "FALSE", 
                "desc": [
                    "This is a cuda global kernel function."
                ]
            }, 
            "IsWrapperfun": {}, 
            "IsWrapperEntryfun": {
                "default": "FALSE"
            }, 
            "IsIndirectWrapperfun": {
                "default": "FALSE"
            }, 
            "IsSpawnFun": {
                "default": "FALSE", 
                "desc": [
                    "True if the function is the target of a spawn operation in the mutc backend"
                ]
            }, 
            "IsZombie": {}, 
            "IsExtern": {}, 
            "IsGeneric": {
                "desc": [
                    "True if the function definition contains generic arguments."
                ]
            }, 
            "IsInline": {}, 
            "IsInlineCompleted": {}, 
            "IsLacInline": {}, 
            "AllowsInfix": {}, 
            "HasDotArgs": {
                "desc": [
                    "True if the function may take an arbitrary number of arguments. E.g., printf"
                ]
            }, 
            "HasDotRets": {
                "desc": [
                    "True if the function may generate an arbitrary number of results."
                ]
            }, 
            "HasStepWidthArgs": {
                "default": "FALSE"
            }, 
            "RefcountDots": {
                "default": "FALSE"
            }, 
            "IsSpecialisation": {}, 
            "IsTypeError": {
                "desc": [
                    "TRUE if the given function is a bodyless type error and thus has at least one bottom", 
                    "return type"
                ]
            }, 
            "IsObjectWrapper": {
                "desc": [
                    "TRUE if the given function is a wrapper for an instance whose instance needed to", 
                    "be extended in the current namespace due to added objects."
                ]
            }, 
            "WasOptimized": {
                "default": "TRUE", 
                "desc": [
                    "TRUE if function should be accounted for next optimization cycle again"
                ]
            }, 
            "WasUpgraded": {
                "desc": [
                    "TRUE iff the return type has changed during the last run of type-upgrade"
                ]
            }, 
            "FixpointFound": {
                "default": "FALSE", 
                "desc": [
                    "TRUE iff the fixpoint of this function has been found in SOSSK."
                ]
            }, 
            "IsStructConstr": {
                "default": "FALSE", 
                "desc": [
                    "TRUE iff this function was created by the HS pass as a constructor for structs."
                ]
            }, 
            "IsCudaLacFun": {
                "default": "FALSE", 
                "desc": [
                    "TRUE iff this function is a lac fun that can be executed on the CUDA card."
                ]
            }, 
            "IsForLoop": {
                "default": "FALSE", 
                "desc": [
                    "TRUE iff this loop function is generated into for loop in the backend."
                ]
            }, 
            "NoInline": {
                "default": "FALSE", 
                "desc": [
                    "This function MUST NOT be inlined. This is set from #pragma noinline."
                ]
            }, 
            "NeedsDynamicMemory": {
                "default": "TRUE", 
                "desc": [
                    "This functions needs dynamic memory (malloc)"
                ]
            }, 
            "ContainsSpawn": {
                "default": "FALSE", 
                "desc": [
                    "This function contains a spawn statement"
                ]
            }, 
            "IsSlowClone": {
                "default": "FALSE", 
                "desc": [
                    "This function is a slow clone"
                ]
            }
        }, 
        "checks": [
            "CHKfundefVardecExtrema", 
            "CHKcondfun", 
            "CHKfundefReturn"
        ]
    }, 
    "Arg": {
        "sons": {
            "Avis": {
                "targets": {
                    "phases": "all", 
                    "contains": "Avis", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Arg", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsReadonly": {}, 
            "IsReference": {
                "desc": [
                    "Set to true if the given argument is a reference argument. The flag is reset to false", 
                    "when resolving reference arguments and WasReference is set to true instead. For all", 
                    "other kinds of arguments it is set to false."
                ]
            }, 
            "WasReference": {
                "desc": [
                    "Set to true after resolving reference args if the given argument was a reference", 
                    "argument before. Set to false otherwise."
                ]
            }, 
            "IsArtificial": {
                "desc": [
                    "Set to true after resolving objects if the given argument was introduced by an object", 
                    "dependency and thus will be removed once the objects are reintroduced in precompile.", 
                    "Set to false otherwise."
                ]
            }, 
            "IsAliasing": {
                "default": "TRUE"
            }, 
            "IsRefcounted": {
                "default": "TRUE"
            }, 
            "HasLinksignInfo": {}, 
            "IsUnique": {}, 
            "IsInUse": {
                "default": "FALSE", 
                "desc": [
                    "Used to mark unused function arguments in DeadCodeRemoval. Marked arguments are removed", 
                    "in signature simplification."
                ]
            }, 
            "IsDuplicate": {
                "default": "FALSE", 
                "desc": [
                    "Used to mark duplicated function arguments in EDFA. Marked arguments are removed", 
                    "by EDFA, but this flag allows us to simplify outer-level calls in a cleaner fashion."
                ]
            }, 
            "IsCudaDefined": {
                "default": "FALSE"
            }
        }, 
        "attributes": {
            "Type": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "OldType", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_ctr"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "TypeString": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "pc_rid", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Objdef": {
                "inconstructor": false, 
                "type": "ExtLink", 
                "targets": {
                    "phases": {
                        "to": "ussa_reso", 
                        "from": "mod_uss"
                    }, 
                    "contains": "Objdef", 
                    "mandatory": false
                }
            }, 
            "Linksign": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pre_rpr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "checks": [
            "CHKisNullSsaassign"
        ], 
        "description": [
            "One formal argument of a defined function definition."
        ]
    }, 
    "Udcs": {
        "sons": {
            "Udc": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Udcs", 
                    "mandatory": false
                }
            }
        }
    }, 
    "Block": {
        "attributes": {
            "CacheSim": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "SSACounter": {
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": [
                        "ptc_ssa", 
                        "popt_ssa", 
                        "opt_cyc_wlfssa", 
                        "opt_cyc_lurssa", 
                        "opt_cyc_wlurssa", 
                        "opt_saacyc_lurssa", 
                        "opt_saacyc_wlurssa"
                    ], 
                    "contains": "SSAcnt", 
                    "mandatory": false
                }
            }, 
            "Dataflowgraph": {
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": {
                        "to": "mt3_concel", 
                        "from": "mt3_cdfg"
                    }, 
                    "contains": "Dataflowgraph", 
                    "mandatory": false
                }
            }, 
            "In_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Out_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Local_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Assigns": {
                "targets": {
                    "phases": "all", 
                    "contains": "Assign", 
                    "mandatory": false
                }
            }, 
            "Vardecs": {
                "targets": {
                    "phases": "all", 
                    "contains": "Vardec", 
                    "mandatory": false
                }
            }, 
            "Shareds": {
                "default": "NULL", 
                "targets": {
                    "phases": "pc_lw3", 
                    "contains": "Arg", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsMtParallelBranch": {
                "desc": [
                    "This block contains the parallel branch of a conditional that implements dynamic", 
                    "parallelisation decisions in the MT backend.."
                ]
            }, 
            "IsMtSequentialBranch": {
                "desc": [
                    "This block contains the sequential branch of a conditional that implements dynamic", 
                    "parallelisation decisions in the MT backend.."
                ]
            }
        }
    }, 
    "Structelem": {
        "attributes": {
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Type": {
                "inconstructor": true, 
                "type": "NewType", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Typedef": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Typedef", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Structelem", 
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
            "declaration of an element of a struct"
        ]
    }, 
    "Vardec": {
        "attributes": {
            "Type": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "OldType", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_ctr"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Icm": {
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "Icm", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Avis": {
                "targets": {
                    "phases": "all", 
                    "contains": "Avis", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Vardec", 
                    "mandatory": false
                }
            }, 
            "Init": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "cg_cpl", 
                        "from": "pc_mc"
                    }, 
                    "contains": "Expr", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsSticky": {
                "default": "FALSE", 
                "desc": [
                    "This vardec should not be removed by DeadFunctionRemoval. This is exclusively used", 
                    "by MT code generation within SPMD functions to ensure that dummy vardecs in intriduced", 
                    "when creating the SPMD functions that only become vital during code generation do", 
                    "not vanish until then."
                ]
            }
        }
    }, 
    "Assign": {
        "sons": {
            "Stmt": {
                "targets": {
                    "phases": "all", 
                    "contains": "Stmt", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Assign", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsNotAllowedToBeMovedUp": {
                "default": "FALSE", 
                "desc": [
                    "This flag is used during the \"Withloop Lock Optimization\" process. It indicates that", 
                    "certain assignments are not allowed to be moved above the global object-lock."
                ]
            }, 
            "IsNotAllowedToBeMovedDown": {
                "default": "FALSE", 
                "desc": [
                    "This flag is used during the \"Withloop Lock Optimization\" process. It indicates that", 
                    "certain assignments are not allowed to be moved below the global object-lock release."
                ]
            }
        }, 
        "attributes": {
            "ExecMode": {
                "inconstructor": false, 
                "type": "MTExecMode", 
                "targets": {
                    "phases": {
                        "to": "mt3_repfun", 
                        "from": "mt3_crwiw"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "CellId": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": {
                        "to": "mt3_crece", 
                        "from": "mt3_asmra"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Level": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "daa", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Visited_With": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "opt_wlfs", 
                    "contains": "With", 
                    "mandatory": false
                }
            }, 
            "Tag": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "opt_wlfs", 
                    "contains": "With", 
                    "mandatory": false
                }
            }, 
            "Dataflownode": {
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": {
                        "to": "mt3_concel", 
                        "from": "mt3_cdfg"
                    }, 
                    "contains": "Dataflownode", 
                    "mandatory": false
                }
            }, 
            "Index": {
                "inconstructor": false, 
                "type": "IndexInfo", 
                "targets": {
                    "phases": {
                        "to": "opt_cyc_wlf", 
                        "from": "opt_cyc_wli"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Containing_Block": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "cuda_mtran", 
                    "contains": "Block", 
                    "mandatory": false
                }
            }, 
            "Access_Info": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "CudaAccessInfo", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "checks": [
            "CHKattribsAssign"
        ], 
        "description": [
            "Spine of an N_block"
        ]
    }, 
    "Let": {
        "attributes": {
            "LIRFlag": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "lir", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "MatchingSpawnSync": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "tp_syn"
                    }, 
                    "contains": "Let", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Link", 
                "description": [
                    "If the node contains a spawned ap or a sync statement, this will point to the matching", 
                    "spawn or sync statement."
                ]
            }, 
            "Livevars": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "tp_lva"
                    }, 
                    "contains": "Livevars", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Node", 
                "description": [
                    "If the let node is a spawn or sync statement, this attribute will contain a list", 
                    "of all live variables at this point in the code."
                ]
            }, 
            "SpawnSyncIndex": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "tp_css"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Integer", 
                "description": [
                    "If the let node is a spawn or sync statement, this attribute indicates the index", 
                    "of that statement"
                ]
            }
        }, 
        "sons": {
            "Ids": {
                "targets": [
                    {
                        "phases": {
                            "to": "ptc_ivd", 
                            "from": "initial"
                        }, 
                        "contains": "SPIds", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "final", 
                            "from": "ptc_ivd"
                        }, 
                        "contains": "Ids", 
                        "mandatory": false
                    }
                ]
            }, 
            "Expr": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Assignment of value to identifier"
        ]
    }, 
    "Livevars": {
        "attributes": {
            "Avis": {
                "inconstructor": true, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Avis", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Livevars", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Cast": {
        "attributes": {
            "NType": {
                "inconstructor": true, 
                "type": "NewType", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Expr": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Return": {
        "attributes": {
            "CRet": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc"
                    }, 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Exprs": {
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
        }
    }, 
    "Cond": {
        "attributes": {
            "In_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Out_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Local_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Cond": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }, 
            "Then": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": true
                }
            }, 
            "Else": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "IsThenNoop": {
                "default": "FALSE"
            }, 
            "IsElseNoop": {
                "default": "FALSE"
            }
        }
    }, 
    "Do": {
        "attributes": {
            "Label": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "initial"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "In_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Out_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Local_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Iterator": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc_pfg"
                    }, 
                    "contains": "Avis", 
                    "mandatory": false
                }
            }, 
            "Upper_Bound": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc_pfg"
                    }, 
                    "contains": "Avis", 
                    "mandatory": false
                }
            }, 
            "Relational_Op": {
                "inconstructor": false, 
                "type": "Prf", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc_pfg"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Cond": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }, 
            "Body": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": true
                }
            }, 
            "Skip": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsCudarizable": {
                "default": "FALSE", 
                "desc": [
                    "TRUE iff this loop can be executed on the GPU."
                ]
            }, 
            "IsForLoop": {
                "default": "FALSE", 
                "desc": [
                    "TRUE iff this do/while loop is generated into for loop in the backend."
                ]
            }
        }
    }, 
    "While": {
        "attributes": {}, 
        "sons": {
            "Cond": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }, 
            "Body": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Annotate": {
        "attributes": {
            "Tag": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "FunNumber": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "FunApNumber": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Ap": {
        "sons": {
            "Args": {
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "ConsiderInline": {
                "default": "TRUE"
            }, 
            "IsRecursiveDoFunCall": {
                "default": "FALSE"
            }, 
            "IsSpawned": {
                "desc": [
                    "This function call should be spawned"
                ]
            }, 
            "IsRemote": {
                "desc": [
                    "This function call should be spawned on another resource"
                ]
            }, 
            "ToSpawn": {
                "desc": [
                    "This node calls a function which contains spawns"
                ]
            }
        }, 
        "attributes": {
            "Fundef": {
                "inconstructor": true, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "Fundef", 
                    "mandatory": true
                }
            }, 
            "ArgTab": {
                "inconstructor": false, 
                "type": "ArgTab", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc_fpc"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "SpawnPlace": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "checks": [
            "CHKapArgCount"
        ], 
        "description": [
            "Application of a user-defined function."
        ]
    }, 
    "SPMop": {
        "attributes": {}, 
        "sons": {
            "Ops": {
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": true
                }
            }, 
            "Exprs": {
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsFixed": {}
        }
    }, 
    "Exprs": {
        "attributes": {}, 
        "sons": {
            "Expr": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Expr", 
                        "Exprs"
                    ], 
                    "mandatory": true
                }
            }, 
            "Next": {
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
        }
    }, 
    "Funcond": {
        "attributes": {}, 
        "sons": {
            "If": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }, 
            "Then": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }, 
            "Else": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "A SaC expression of the form: cond ? truevalue : elsevalue."
        ]
    }, 
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
    }, 
    "Id": {
        "attributes": {
            "Avis": {
                "inconstructor": true, 
                "type": "Link", 
                "targets": [
                    {
                        "phases": {
                            "to": "cg_cpl", 
                            "from": "initial"
                        }, 
                        "contains": "Avis", 
                        "mandatory": true
                    }, 
                    {
                        "phases": {
                            "to": "final", 
                            "from": "cg_cpl"
                        }, 
                        "contains": "Avis", 
                        "mandatory": false
                    }
                ]
            }, 
            "WL": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "opt_cyc_wlf", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "ICMtext": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "Deprecated. Will be removed as soon as it has been confirmed that this attribute", 
                    "is no longer used."
                ]
            }, 
            "NT_Tag": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cg_cpl"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "Deprecated. Still used in the compiler backend until major redesign of backend node", 
                    "structure."
                ]
            }
        }, 
        "sons": {}, 
        "flags": {
            "IsSclPrf": {
                "desc": [
                    "Set by AL and DL to indicate that the N_id is the result of a primitive dyadic function", 
                    "operating on simple scalars."
                ]
            }
        }
    }, 
    "Num": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Integer scalar"
        ]
    }, 
    "NumByte": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Byte", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Byte scalar"
        ]
    }, 
    "NumShort": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Short", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Short scalar"
        ]
    }, 
    "NumInt": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Int", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Int scalar"
        ]
    }, 
    "NumLong": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Long", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Long scalar"
        ]
    }, 
    "NumLonglong": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Longlong", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Long Long scalar"
        ]
    }, 
    "NumUbyte": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Ubyte", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Ubyte scalar"
        ]
    }, 
    "NumUshort": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Ushort", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Ushort scalar"
        ]
    }, 
    "NumUint": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Uint", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Uint scalar"
        ]
    }, 
    "NumUlong": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Ulong", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Ulong scalar"
        ]
    }, 
    "NumUlonglong": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Ulonglong", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "ULongLong scalar"
        ]
    }, 
    "Char": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Char", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Character scalar"
        ]
    }, 
    "Float": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Float", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Floating-point scalar"
        ]
    }, 
    "Floatvec": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Floatvec", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Floating-point scalar"
        ]
    }, 
    "Double": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Double", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Double-precision real scalar"
        ]
    }, 
    "Bool": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Bool", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Boolean scalar"
        ]
    }, 
    "Nested_init": {
        "attributes": {}, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "description": [
            "Nested init value"
        ]
    }, 
    "Str": {
        "attributes": {
            "String": {
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "inconstructor": true, 
                "type": "String", 
                "description": [
                    "The value of this string. Note that the string needs to be in an encoding which is", 
                    "safe for printing in C code, e.g. special characters like quotation marks need to", 
                    "be escaped."
                ]
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Type": {
        "attributes": {
            "Type": {
                "inconstructor": true, 
                "type": "NewType", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Prf": {
        "attributes": {
            "Prf": {
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "inconstructor": true, 
                "type": "Prf", 
                "description": [
                    "Describes the type of function this node represents. A list of possible values is", 
                    "found in src/libsac2c/tree/prf_info.mac"
                ]
            }, 
            "NoteintersectInsertionCycle": {
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Integer", 
                "description": [
                    "This is used for analysis of AWLF performance. It is initialized to global.cycle_counter", 
                    "when an F_noteintersect is inserted into the AST, and referenced when AWLF actually", 
                    "performs a WL fold. The intent is to see if we should make AWLF give up on a folding", 
                    "attempt after some N iterations."
                ]
            }
        }, 
        "sons": {
            "Args": {
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsInplaceSelect": {
                "default": "FALSE"
            }, 
            "IsNop": {
                "default": "FALSE", 
                "desc": [
                    "Some optimization has decided that this N_prf is a no-op. I.e., it can be (carefully)", 
                    "removed from the AST, but is not in a position within the AST traversal to remove", 
                    "it directly. At present, the only case where this happens is in ixxx. CF performs", 
                    "the actual removal, typically on a traversal after the one that has set this flag."
                ]
            }, 
            "IsFoldNow": {
                "default": "FALSE", 
                "desc": [
                    "Set to true by CUBSL if this sel is in a consumer-WL and has been determined to be", 
                    "foldable by AWLF."
                ]
            }
        }, 
        "description": [
            "Primitive (built-in) SAC function"
        ]
    }, 
    "Dot": {
        "attributes": {
            "Num": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "SetWL": {
        "attributes": {}, 
        "sons": {
            "Vec": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Exprs", 
                        "SPId"
                    ], 
                    "mandatory": true
                }
            }, 
            "Expr": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Icm": {
        "attributes": {
            "Name": {
                "inconstructor": true, 
                "type": "SharedString", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Indent_Before": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "description": [
                    "the default value has to be fixed!"
                ]
            }, 
            "Indent_After": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "description": [
                    "the default value has to be fixed!"
                ]
            }
        }, 
        "sons": {
            "Args": {
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }
            }
        }
    }, 
    "Pragma": {
        "attributes": {
            "LinkName": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "CudaLinkName": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "Declaration of cuda version of an external function"
                ]
            }, 
            "LinkMod": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "StringSet", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "LinkObj": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "StringSet", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "WLComp_APS": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }
            }, 
            "APL": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Ap", 
                    "mandatory": false
                }
            }, 
            "NumParams": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "InitFun": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "popt", 
                        "from": "mod"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "CopyFun": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "popt", 
                        "from": "mod"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "FreeFun": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": {
                        "to": "popt", 
                        "from": "mod"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "ReadOnly": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Nums", 
                    "mandatory": false
                }
            }, 
            "Refcounting": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Nums", 
                    "mandatory": false
                }
            }, 
            "Effect": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }
            }, 
            "LinkSign": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Nums", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "RefcountDots": {
                "default": "FALSE"
            }, 
            "MutcThreadFun": {
                "default": "FALSE"
            }, 
            "NoInline": {
                "default": "FALSE"
            }
        }
    }, 
    "SSAcnt": {
        "attributes": {
            "Count": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "BaseId": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "SSAcnt", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "SSAstack": {
        "attributes": {
            "Avis": {
                "inconstructor": true, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Avis", 
                    "mandatory": true
                }
            }, 
            "NestLevel": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "SSAstack", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "InUse": {}
        }
    }, 
    "Avis": {
        "sons": {
            "Dim": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "opt_esaa", 
                        "from": "opt_saacyc_isaa"
                    }, 
                    "contains": "Expr", 
                    "mandatory": false
                }, 
                "description": [
                    "An N_num or N_id specifying the array's rank as a symbolic array attribute. The expression", 
                    "is a numeric constant (N_num) for AKS, AKD, and AKV arrays, and an identifier (N_id)", 
                    "for AUD arrays."
                ]
            }, 
            "Shape": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "opt_esaa", 
                        "from": "opt_saacyc_isaa"
                    }, 
                    "contains": "Expr", 
                    "mandatory": false
                }, 
                "description": [
                    "An N_array or N_id specifying the array's shape as a symbolic array attribute. The", 
                    "array is comprised of integer constants (N_num) for AKV and AKS arrays, a mixed array", 
                    "of integer constants and identifiers (N_num, N_id) for AKD arrays with partial shape", 
                    "information, or an identifier (N_id) for AUD and some AKD arrays."
                ]
            }, 
            "Min": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "opt_esaa", 
                        "from": "opt_saacyc"
                    }, 
                    "contains": "Id", 
                    "mandatory": false
                }, 
                "description": [
                    "This field is an N_id for the minimum value that this variable can have. The field", 
                    "is valid only for integer-like types, i.e., it does not apply to doubles, etc. For", 
                    "example, the Min of the lower bound of a WL index vector might be an N_id pointing", 
                    "to an N_array with value [0,0,0],"
                ]
            }, 
            "Max": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "opt_esaa", 
                        "from": "opt_saacyc"
                    }, 
                    "contains": "Id", 
                    "mandatory": false
                }, 
                "description": [
                    "See AVIS_MIN description; MAX points to the avis of the maximum, rather than the", 
                    "minimum, value of a WL index vector. However, like WL index vectors, MAX is part", 
                    "of a semi-closed interval; MAX(X) is at least 1+maxreduce(X), much the same as GENERATOR_BOUND2", 
                    "in a with-loop."
                ]
            }, 
            "Scalars": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "opt_esaa", 
                        "from": "opt"
                    }, 
                    "contains": "Array", 
                    "mandatory": false
                }, 
                "description": [
                    "For small arrays, such as shape vectors and index vectors, this field comprises the", 
                    "scalars constituting those arrays as an N_array. This allows us to manipulate the", 
                    "scalars in optimizations such as AWLF, and avoids the need to build an N_array within", 
                    "LACFUNs."
                ]
            }
        }, 
        "flags": {
            "SSADefined": {}, 
            "SSALPINV": {}, 
            "IsAlias": {
                "default": "TRUE", 
                "desc": [
                    "Set by the Alias Analysis traversel, AVIS_ISALIAS denotes whether there can be more", 
                    "than one identifier for a given data object."
                ]
            }, 
            "IsDead": {
                "desc": [
                    "Used to indicate which VARDECS are no longer needed and can thus be eliminated."
                ]
            }, 
            "IsUniqueConsumed": {
                "default": "FALSE", 
                "desc": [
                    "Used by the uniqueness checker to determine whether a unique type has been consumed", 
                    "earlier on."
                ]
            }, 
            "IsUniqueConsumedThen": {
                "default": "FALSE", 
                "desc": [
                    "Used by the uniqueness checker to determine whether a unique type has been consumed", 
                    "earlier on, before the THEN branch of an N_cond."
                ]
            }, 
            "IsUniqueConsumedElse": {
                "default": "FALSE", 
                "desc": [
                    "Used by the uniqueness checker to determine whether a unique type has been consumed", 
                    "earlier on, before the ELSE branch of an N_cond."
                ]
            }, 
            "HasDTThenProxy": {
                "default": "FALSE"
            }, 
            "HasDTElseProxy": {
                "default": "FALSE"
            }, 
            "HasSAAArguments": {
                "default": "FALSE", 
                "desc": [
                    "Within the optimisation cycle we may introduce new parameters to functions, representing", 
                    "shape or dimension of other parameters. If this is done for this parameter, we may", 
                    "set this value to TRUE."
                ]
            }, 
            "HasMinvalArg": {
                "default": "FALSE", 
                "desc": [
                    "This value has its AVIS_MIN present in LACFUN calls, in the same manner as AVIS_DIM/SHAPE.", 
                    "This flag ensures that we do not do repeated insertions of extrema into LACFUN calls."
                ]
            }, 
            "HasMaxvalArg": {
                "default": "FALSE", 
                "desc": [
                    "This value has its AVIS_MAX present in LACFUN calls, the same manner as AVIS_DIM/SHAPE.", 
                    "This flag ensures that we do not do repeated insertions of extrema into LACFUN calls."
                ]
            }, 
            "IsUsed": {
                "default": "FALSE", 
                "desc": [
                    "Used by Loop Scalarization to determine whether a variable is used otherwise than", 
                    "within array position of selections. Furthermore, used by partial reuse candidate", 
                    "filtering to check whether a reuse candidate appears somewhere other than in selections."
                ]
            }, 
            "BelongingAssignmentIsNotAllowedToBeMovedUp": {
                "default": "FALSE", 
                "desc": [
                    "This flag is used during the \"Withloop Lock Optimization\" process. It indicates that", 
                    "the belonging assignment is not allowed to be moved above the global object-lock."
                ]
            }, 
            "BelongingAssignmentIsNotAllowedToBeMovedDown": {
                "default": "FALSE", 
                "desc": [
                    "This flag is used during the \"Withloop Lock Optimization\" process. It indicates that", 
                    "the belonging assignment is not allowed to be moved below the global object-lock", 
                    "release."
                ]
            }, 
            "IsThreadIndex": {
                "default": "FALSE", 
                "desc": [
                    "If true, the given variable is the dedicated index variable for this thread function.", 
                    "Used by the mutc backend."
                ]
            }, 
            "IsWLFolded": {
                "default": "FALSE", 
                "desc": [
                    "If true, the given variable is the result of a producerWL that has been folded out", 
                    "of existence."
                ]
            }, 
            "IsHostReferenced": {
                "default": "FALSE"
            }, 
            "IsMinHandled": {
                "default": "FALSE", 
                "desc": [
                    "If true, indicates that IVEXI/IVEXP have performed whatever needs to be done to generate", 
                    "AVIS_MIN for this node. For N_array assignments, the extrema are not directly attached", 
                    "to the LHS (v), but to v' or v'', so looking for non-NULL AVIS_MIN will not work."
                ]
            }, 
            "IsMaxHandled": {
                "default": "FALSE", 
                "desc": [
                    "Like IsMinHandled, but for AVIS_MAX."
                ]
            }, 
            "IsCudaLocal": {
                "default": "FALSE", 
                "desc": [
                    "If true, this (array) variable should be allocated locally on CUDA."
                ]
            }, 
            "IsDefinedInCurrentBlock": {
                "default": "FALSE", 
                "desc": [
                    "This flags marks AVIS nodes that are assigned in the current block. This is used", 
                    "in AL to separate identifiers from different blocks to confine the effect of AL to", 
                    "single blocks."
                ]
            }, 
            "IsALActive": {
                "default": "FALSE", 
                "desc": [
                    "This flags marks AVIS nodes as potential roots of multi-operand expressions; it is", 
                    "used to avoid starting another go on AL for any subexpression."
                ]
            }, 
            "IsLoopInvariant": {
                "default": "FALSE", 
                "desc": [
                    "This flags marks AVIS nodes as loop invariant, i.e. the variable is a parameter of", 
                    "a do-loop function and appears in the corresponding argument position of the recursive", 
                    "application."
                ]
            }, 
            "IsDLActive": {
                "default": "FALSE", 
                "desc": [
                    "This flags marks AVIS nodes as active in the current context. This is used in DL", 
                    "to mark identifiers that are part of an expression to be simplified."
                ]
            }, 
            "IsOmpPrivate": {
                "default": "FALSE", 
                "desc": [
                    "If true, the given variable is private OpenMP variable."
                ]
            }, 
            "IsOmpReduction": {
                "default": "FALSE", 
                "desc": [
                    "If true, the given variable is reduction OpenMP variable used in fold."
                ]
            }, 
            "suballoc": {
                "default": "FALSE", 
                "desc": [
                    "MUTC: This var is from a suballoc where the desc is passed in to this function"
                ]
            }, 
            "NeedBlocked": {
                "default": "FALSE", 
                "desc": [
                    "If true, the given variable is a loop index and the loop needs to be blocked"
                ]
            }, 
            "FinverseSwap": {
                "default": "FALSE", 
                "desc": [
                    "If true, the AVIS_MIN and AVIS_MAX values for this index vector have to be swapped."
                ]
            }, 
            "IsScalarized": {
                "default": "FALSE", 
                "desc": [
                    "Used by LACSO to indicate that a small array argument or result has been scalarized.", 
                    "Its only function is to prevent us from doing the scalarization more than once."
                ]
            }
        }, 
        "attributes": {
            "Decl": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Vardec", 
                        "Arg"
                    ], 
                    "mandatory": true
                }, 
                "description": [
                    "If this variable is a local, this is a link to its N_vardec. Otherwise, it is a function", 
                    "parameter, and this is a link to its N_arg."
                ]
            }, 
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Type": {
                "targets": {
                    "phases": {
                        "to": "cg_ctr", 
                        "from": "initial"
                    }, 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "inconstructor": true, 
                "type": "NewType", 
                "description": [
                    "the inferred type, which may be more precise than DeclType."
                ]
            }, 
            "DeclType": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "NewType", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "the declared type, iff present."
                ]
            }, 
            "ConstrType": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "NewType", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "type constraint as imposed by the applied use of the variable, iff present."
                ]
            }, 
            "ConstrVar": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Avis", 
                    "mandatory": false
                }, 
                "description": [
                    "pointer to the avis of the predicat that results from the type constraint in ConstrType,", 
                    "iff present"
                ]
            }, 
            "ConstrSet": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Constraint", 
                    "mandatory": false
                }, 
                "description": [
                    "pointer to set of non-type constraints as imposed by the applied use of the variable,", 
                    "iff present"
                ]
            }, 
            "Pos": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "idc", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "SSAAssign": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "ussa_ussa", 
                        "from": "ptc_ssa"
                    }, 
                    "contains": "Assign", 
                    "mandatory": false
                }, 
                "description": [
                    "provides a direct link to the N_assign node containing the definition of the identifier", 
                    "represented by this AVIS node. In SSA form, AVIS_SSAASSIGN must only be NULL for", 
                    "identifiers for function arguments and with-loop index variables."
                ]
            }, 
            "SSACount": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": [
                        "ptc_ssa", 
                        "popt_ssa", 
                        "opt_cyc_wlfssa", 
                        "opt_cyc_lurssa", 
                        "opt_cyc_wlurssa", 
                        "opt_saacyc_lurssa", 
                        "opt_saacyc_wlurssa"
                    ], 
                    "contains": "SSAcnt", 
                    "mandatory": false
                }
            }, 
            "SSAstack": {
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": [
                        "ptc_ssa", 
                        "popt_ssa", 
                        "opt_cyc_wlfssa", 
                        "opt_cyc_lurssa", 
                        "opt_cyc_wlurssa", 
                        "opt_saacyc_lurssa", 
                        "opt_saacyc_wlurssa"
                    ], 
                    "contains": "SSAstack", 
                    "mandatory": false
                }
            }, 
            "SSAThen": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": [
                        "ptc_ssa", 
                        "popt_ssa", 
                        "opt_cyc_wlfssa", 
                        "opt_cyc_lurssa", 
                        "opt_cyc_wlurssa", 
                        "opt_saacyc_lurssa", 
                        "opt_saacyc_wlurssa"
                    ], 
                    "contains": "Avis", 
                    "mandatory": false
                }
            }, 
            "SSAElse": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": [
                        "ptc_ssa", 
                        "popt_ssa", 
                        "opt_cyc_wlfssa", 
                        "opt_cyc_lurssa", 
                        "opt_cyc_wlurssa", 
                        "opt_saacyc_lurssa", 
                        "opt_saacyc_wlurssa"
                    ], 
                    "contains": "Avis", 
                    "mandatory": false
                }
            }, 
            "NeedCount": {
                "targets": {
                    "phases": {
                        "to": "cuda", 
                        "from": "opt"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Integer", 
                "description": [
                    "xxx"
                ]
            }, 
            "WL_NeedCount": {
                "targets": {
                    "phases": [
                        "opt_al", 
                        {
                            "to": "opt_ivexc", 
                            "from": "opt_saacyc_isaa"
                        }
                    ], 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Integer", 
                "description": [
                    "This is a count of the number of producerWL references that occur in _sel_VxA_(iv,", 
                    "producerWL) and _idxsel_( offset, producerWL) operations within a consumerWL."
                ]
            }, 
            "Counting_WL": {
                "targets": {
                    "phases": {
                        "to": "opt_ivexc", 
                        "from": "opt_saacyc_isaa"
                    }, 
                    "contains": "With", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Link", 
                "description": [
                    "This field is the number of references to the producerWL that created this value,", 
                    "from one, arbitrary-chosen consumerWL. The field is used as a crude cost function", 
                    "on the producerWL, so that the AWLF is performed only if all references to the producerWL", 
                    "are from one other (consumerWL) WL."
                ]
            }, 
            "VarNo": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": [
                        "mem_rc", 
                        "mem_rcm"
                    ], 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "BotRT": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "NewType", 
                "targets": {
                    "phases": "tc_ebt", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "Used in order to memorize a replacement type for bottom funcond variables."
                ]
            }, 
            "Subst": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": [
                    {
                        "phases": [
                            "opt_scc", 
                            "opt_cyc_cse", 
                            "opt_dlir", 
                            "opt_wlir", 
                            "opt_cyc_dlir", 
                            "opt_cyc_wlir", 
                            "opt_saacyc_dlir", 
                            "opt_saacyc_wlir", 
                            {
                                "to": "mt", 
                                "from": "ussa"
                            }, 
                            "mem_racc"
                        ], 
                        "contains": "Avis", 
                        "mandatory": false
                    }, 
                    {
                        "phases": "ussa_reso", 
                        "contains": "Objdef", 
                        "mandatory": false
                    }
                ]
            }, 
            "Alt": {
                "targets": {
                    "phases": "all", 
                    "contains": "Avis", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Link", 
                "description": [
                    "Used by CompareTree to remember alpha conversion"
                ]
            }, 
            "DefDepth": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": [
                        "lir", 
                        "awlf"
                    ], 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "LirMove": {
                "inconstructor": false, 
                "type": "BitField", 
                "targets": {
                    "phases": "lir", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "ExpResult": {
                "inconstructor": false, 
                "type": "Bool", 
                "targets": {
                    "phases": "lir", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "AliasMask": {
                "targets": {
                    "phases": "mem_ia", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "DFMask", 
                "description": [
                    "Used by Interface Analysis in order to obtain the transitive hull of variable aliases."
                ]
            }, 
            "UniqueRef": {
                "targets": {
                    "phases": "popt_cuq", 
                    "contains": "Id", 
                    "mandatory": true
                }, 
                "inconstructor": false, 
                "type": "Link", 
                "description": [
                    "First reference to this unique object declaration. Used to generate useful error", 
                    "messages in case of uniqueness violation."
                ]
            }, 
            "WithLoopLevel": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "popt_unq", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Demand": {
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Constant", 
                "description": [
                    "This attribute constitutes the demand of a variable during the specializing oracle", 
                    "for static shape knowledge."
                ]
            }, 
            "With3Fold": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "pc_lw3", 
                        "from": "wlt_ass"
                    }, 
                    "contains": "Fold", 
                    "mandatory": false
                }
            }, 
            "BlockSize": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "daa", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Count": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "pc_mc", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "Used to count number of times the variable is used on the lhs."
                ]
            }, 
            "Lacso": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": [
                        {
                            "to": "opt_cyc_lacso", 
                            "from": "opt_cyc_lacso"
                        }, 
                        {
                            "to": "opt_saacyc_lacso", 
                            "from": "opt_saacyc_lacso"
                        }
                    ], 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "Hidey-hole used by LACSO to link the being-scalarized array to its scalar elements.", 
                    "Strictly local, and could be eliminated with a bit of work."
                ]
            }, 
            "PolylibColumnIndex": {
                "default": "-1", 
                "targets": {
                    "phases": {
                        "to": "opt_saacyc_pogo", 
                        "from": "opt_saacyc_pogo"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "type": "Integer", 
                "description": [
                    "This is used by PHUTcollectAffineExprs to assign an origin-1 column number to each", 
                    "distinct name found in any particular affine expression tree."
                ]
            }, 
            "Npart": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "opt_saacyc_pogo", 
                        "from": "opt_saacyc_pogo"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "type": "Link", 
                "description": [
                    "Pointer to the N_part that defines this variable, if the variable is a WITHID_IDS", 
                    "or WITHID_VEC. It is used by POGO (and other polyhedral codes) to locate the N_part", 
                    "that defines the variable, along with its generators. It is NOT defined except within", 
                    "the scope of a specific traversal that descends through N_part nodes. In particular,", 
                    "it is set to NULL when we exit the N_part."
                ]
            }
        }, 
        "checks": [
            "CHKavisReflection", 
            "CHKavisSsaassignNodeType"
        ], 
        "description": [
            "Arg and vardec information structure"
        ]
    }, 
    "MT": {
        "sons": {
            "Region": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "EX": {
        "attributes": {}, 
        "sons": {
            "Region": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "ST": {
        "attributes": {}, 
        "sons": {
            "Region": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Cudast": {
        "attributes": {}, 
        "sons": {
            "Region": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "With": {
        "attributes": {
            "Parts": {
                "default": "-1", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "description": [
                    "The number of partitions in this with-loop. I have no idea what the -1 indicates."
                ]
            }, 
            "Pragma": {
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "scp_prs"
                    }, 
                    "contains": "Pragma", 
                    "mandatory": false
                }
            }, 
            "In_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Out_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Local_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Referenced": {
                "targets": {
                    "phases": [
                        {
                            "to": "opt_cyc_wlf", 
                            "from": "opt_cyc_wlf"
                        }, 
                        {
                            "to": "opt_saacyc_awlf", 
                            "from": "opt_saacyc_awlfi"
                        }
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "inconstructor": false, 
                "type": "Integer", 
                "description": [
                    "The total number of RHS references to the result of this WL."
                ]
            }, 
            "Referenced_Fold": {
                "default": "0", 
                "targets": {
                    "phases": [
                        {
                            "to": "opt_cyc_wlf", 
                            "from": "opt_cyc_wlf"
                        }, 
                        {
                            "to": "opt_saacyc_awlf", 
                            "from": "opt_saacyc_awlfi"
                        }
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "type": "Integer", 
                "description": [
                    "The number of RHS references, within a potential consumerWL, to the result of this", 
                    "WL, by the WL at Referenced_consumerWL. WLF and AWLF can fold WLs only if this field", 
                    "and WITH_REFERENCED are equal. The only rationale for this restriction is that it", 
                    "prevents the same producerWL element from being computed more than once."
                ]
            }, 
            "Referenced_consumerWL": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "opt_saacyc_awlf", 
                        "from": "opt_saacyc_awlfi"
                    }, 
                    "contains": "Avis", 
                    "mandatory": false
                }, 
                "type": "Link", 
                "description": [
                    "The first consumerWL that refers to the result created by this putative producerWL.", 
                    "See Referenced_Fold."
                ]
            }, 
            "References_Folded": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "opt_cyc_wlf", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "SelMax": {
                "targets": {
                    "phases": [
                        "opt_cyc_wlprop", 
                        "opt_cyc_wlprop"
                    ], 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "Integer", 
                "description": [
                    "Maximum number of F_sel_VxA_ selections found in any of the code parts. This information", 
                    "is inferred by the WLSELC (WithLoopSelectionCount) traversal."
                ]
            }, 
            "Cost": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "opt_cyc_awlf", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Dist": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Access": {
                "targets": {
                    "phases": "pc_imemdist", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "LUT", 
                "description": [
                    "A LUT containing information about the memory access patterns of relatively free", 
                    "arrays, for the distributed backend."
                ]
            }
        }, 
        "sons": {
            "Part": {
                "targets": {
                    "phases": "all", 
                    "contains": "Part", 
                    "mandatory": true
                }, 
                "description": [
                    "Definition of one partition of a with-loop."
                ]
            }, 
            "Code": {
                "targets": {
                    "phases": "all", 
                    "contains": "Code", 
                    "mandatory": true
                }, 
                "description": [
                    "Chain of codes associated with one or more partitions in the WL. Codes may be shared", 
                    "by more than one partition: each partition has an attribute, PART_CODE, that points", 
                    "to a WITH_CODE block."
                ]
            }, 
            "WithOp": {
                "targets": {
                    "phases": "all", 
                    "contains": "WithOp", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsFoldable": {}, 
            "Cudarizable": {
                "default": "FALSE"
            }, 
            "hasRC": {
                "default": "FALSE"
            }, 
            "IsDependent": {}, 
            "containsFunAps": {
                "desc": [
                    "indicates whether any partition contains an application of a user defined function.", 
                    "This information is inferred in the WLSELC (WithLoopSelectionCount) traversal."
                ]
            }
        }
    }, 
    "Part": {
        "attributes": {
            "Code": {
                "targets": {
                    "phases": "all", 
                    "contains": "Code", 
                    "mandatory": true
                }, 
                "inconstructor": true, 
                "type": "CodeLink", 
                "description": [
                    "A pointer to the WITH_CODE block that contains the code for this partition. if present,", 
                    "the used counter for the code needs to be increased."
                ]
            }, 
            "InnerWlidxAssign": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Assign", 
                    "mandatory": false
                }
            }, 
            "ThreadBlockShape": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "cuda_acuwl"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "WithId": {
                "targets": {
                    "phases": "all", 
                    "contains": "Withid", 
                    "mandatory": true
                }
            }, 
            "Generator": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Generator", 
                        "Default"
                    ], 
                    "mandatory": true
                }
            }, 
            "Next": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Part", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsCopy": {
                "desc": [
                    "Set to true if this WL partition is a copy partition. I.e., it copies, without an", 
                    "index vector offset, elements of the producer-WL partition. This value is critical", 
                    "to optimizations that reuse memory by performing in-placed indexed assigns into a", 
                    "small part of a matrix. E.g., Gaussian Elimination."
                ]
            }, 
            "Cudarizable": {
                "default": "FALSE"
            }, 
            "IsConsumerPart": {
                "default": "FALSE", 
                "desc": [
                    "Set to true if this WL partition has been determined to be a consumer-WL, and a noteintersect", 
                    "has been attached to it. This is used by the cubeslicer to allow it to slice cubes", 
                    "in CUBSLpart."
                ]
            }
        }
    }, 
    "Withid": {
        "attributes": {}, 
        "sons": {
            "Vec": {
                "targets": [
                    {
                        "phases": {
                            "to": "ptc_ivd", 
                            "from": "initial"
                        }, 
                        "contains": "SPIds", 
                        "mandatory": true
                    }, 
                    {
                        "phases": {
                            "to": "mem_alloc", 
                            "from": "ptc_ivd"
                        }, 
                        "contains": "Ids", 
                        "mandatory": true
                    }, 
                    {
                        "phases": {
                            "to": "final", 
                            "from": "mem_alloc"
                        }, 
                        "contains": "Id", 
                        "mandatory": true
                    }
                ], 
                "description": [
                    "This is the vector form of a WL generator. After explicit allocation (EMAL), Vec", 
                    "points to an N_id node."
                ]
            }, 
            "Ids": {
                "targets": [
                    {
                        "phases": {
                            "to": "mem_alloc", 
                            "from": "ptc_ivd"
                        }, 
                        "contains": "Ids", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "ptc_ivd", 
                            "from": "initial"
                        }, 
                        "contains": "SPIds", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "final", 
                            "from": "mem_alloc"
                        }, 
                        "contains": "Exprs", 
                        "mandatory": false
                    }
                ], 
                "description": [
                    "This is the scalarized form of a WL generator. After explicit allocation (EMAL),", 
                    "Ids points to an N_exprs-list of N_id nodes."
                ]
            }, 
            "Idxs": {
                "default": "NULL", 
                "targets": [
                    {
                        "phases": {
                            "to": "mem_alloc", 
                            "from": "opt_wlidx"
                        }, 
                        "contains": "Ids", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "final", 
                            "from": "mem_alloc"
                        }, 
                        "contains": "Exprs", 
                        "mandatory": false
                    }
                ], 
                "description": [
                    "This is a chain of indices into the ravels of the results of genarray and modarray", 
                    "withloops. Once they are explicitly allocated in mem_alloc, they are transformed", 
                    "from identifier definitions (N_ids) into use sites (N_exprs of N_id)."
                ]
            }
        }, 
        "flags": {
            "VecNeeded": {}
        }
    }, 
    "Generator": {
        "attributes": {
            "Op1": {
                "inconstructor": true, 
                "type": "Prf", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Op2": {
                "inconstructor": true, 
                "type": "Prf", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Bound1": {
                "targets": [
                    {
                        "phases": {
                            "to": "final", 
                            "from": "scp_prs"
                        }, 
                        "contains": "Expr", 
                        "mandatory": true
                    }, 
                    {
                        "phases": {
                            "to": "pre_acn", 
                            "from": "scp_prs"
                        }, 
                        "contains": "Dot", 
                        "mandatory": true
                    }
                ], 
                "description": [
                    "Bound must be an N_id or an N_array, except that, in saacyc, it must be an N_id."
                ]
            }, 
            "Bound2": {
                "targets": [
                    {
                        "phases": {
                            "to": "final", 
                            "from": "scp_prs"
                        }, 
                        "contains": "Expr", 
                        "mandatory": true
                    }, 
                    {
                        "phases": {
                            "to": "pre_acn", 
                            "from": "scp_prs"
                        }, 
                        "contains": "Dot", 
                        "mandatory": true
                    }
                ], 
                "description": [
                    "Bound must be an N_id or an N_array, except that, in saacycit must be an N_id."
                ]
            }, 
            "Step": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": false
                }
            }, 
            "Width": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": false
                }
            }, 
            "GenWidth": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "opt_wrci", 
                        "from": "opt_cyc"
                    }, 
                    "contains": "Expr", 
                    "mandatory": false
                }, 
                "description": [
                    "GENWIDTH contains a vector resulting from subtracting BOUND1 from BOUND2. GENWIDTH", 
                    "is introduced by wlsimplification which puts the operations performing the subtraction", 
                    "in front of the loop. In many cases, the partial evaluation infrastructure can determine", 
                    "a value for GENWIDTH although the bounds are not known at compile time. Example:", 
                    "BOUND1 = [a], BOUND2 = [b], where b = a + [1] => GENWIDTH = [1]. GENWIDTH then serves", 
                    "three purposes: First, it is used by wlsimplicition to identify empty generators", 
                    "which can then be eliminated. Second, it is used in constant folding to propagate", 
                    "static index vector knowledge for one-element generators. Finally, it is used by", 
                    "the with-loop reuse candidate inference mechanism to identify further reuse candidates", 
                    "in situations where a WL A performs mainly B[iv] except in exactly one generator", 
                    "where B[iv+off] is selected. If off >= GENWIDTH, then B is a reuse candidate for", 
                    "A. All GENWIDTH annotations are removed by wrci, the remaining computations are removed", 
                    "by dcr."
                ]
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Default": {
        "attributes": {}, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Code": {
        "attributes": {
            "Used": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "Reference count - the number of PART_CODE entries that point to this code block."
                ]
            }, 
            "Id": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "final", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "WLAA_Info": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "AccessInfo", 
                "targets": {
                    "phases": "initial", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "IRA_Info": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "ReuseInfo", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "TSI_TileShp": {
                "inconstructor": false, 
                "type": "ShpSeg", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "CBlock": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": false
                }, 
                "description": [
                    "A possibly empty list of N_assigns that correspond to the set of expressions that", 
                    "appear within the curly braces that (may) follow a WL generator specification."
                ]
            }, 
            "CExprs": {
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }, 
                "description": [
                    "A non-empty list of N_exprs that represent the expressions that create the result", 
                    "elements associated with each WL partition generator."
                ]
            }, 
            "Next": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Code", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "Visited": {}, 
            "HasResolveableDependencies": {}, 
            "HasExtrema": {
                "default": "FALSE", 
                "desc": [
                    "Set to true if the WITHIDs for this code block have extrema attached to them. This", 
                    "keeps IVEXI from attaching extrema more than once per block."
                ]
            }
        }
    }, 
    "With2": {
        "attributes": {
            "Dims": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Pragma": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": "all", 
                    "contains": "Pragma", 
                    "mandatory": false
                }
            }, 
            "In_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Out_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Local_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Omp_Private_List": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Dist": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Access": {
                "targets": {
                    "phases": "pc_imemdist", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "inconstructor": false, 
                "type": "LUT", 
                "description": [
                    "A LUT containing information about the memory access patterns of relatively free", 
                    "arrays, for the Distributed backend."
                ]
            }
        }, 
        "sons": {
            "WithId": {
                "targets": {
                    "phases": "all", 
                    "contains": "Withid", 
                    "mandatory": true
                }
            }, 
            "Segs": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLseg", 
                    "mandatory": true
                }
            }, 
            "Code": {
                "targets": {
                    "phases": "all", 
                    "contains": "Code", 
                    "mandatory": true
                }
            }, 
            "WithOp": {
                "targets": {
                    "phases": "all", 
                    "contains": "WithOp", 
                    "mandatory": true
                }
            }
        }, 
        "flags": {
            "NeedsOffset": {}, 
            "Parallelize": {}, 
            "HasNaiveOrdering": {
                "default": "FALSE", 
                "desc": [
                    "True, iff the naive compilation scheme was used and thus the with-loop is not computed", 
                    "in canonical order."
                ]
            }, 
            "Cudarizable": {
                "default": "FALSE"
            }
        }
    }, 
    "Genarray": {
        "attributes": {
            "Idx": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "opt_wlidx"
                    }, 
                    "contains": "Avis", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Shape": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }, 
                "description": [
                    "The frame shape of the result. The WL result shape is: Shape ++ shape(Default)."
                ]
            }, 
            "Default": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": false
                }, 
                "description": [
                    "The default cell of the result."
                ]
            }, 
            "Mem": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "mem_alloc"
                    }, 
                    "contains": "Id", 
                    "mandatory": true
                }
            }, 
            "Sub": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc_mmv"
                    }, 
                    "contains": "Id", 
                    "mandatory": false
                }
            }, 
            "RC": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "mem_rci", 
                        "from": "opt_wrci"
                    }, 
                    "contains": "Exprs", 
                    "mandatory": false
                }, 
                "description": [
                    "RC(xxx) encodes that xxx is a reuse candidate for this WL, i.e., that the result", 
                    "of this WL or, more specifically, the operator the RC(xxx) is attached to, can potentially", 
                    "be stored in xxx. This information is inferred at the end of the optimisations, IIRC", 
                    "but only used later on in reference counting to perform memory reuse."
                ]
            }, 
            "PRC": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "mem_rci", 
                        "from": "opt_wrci"
                    }, 
                    "contains": "Exprs", 
                    "mandatory": false
                }, 
                "description": [
                    "PRC(xxx) encodes that xxx is a partial reuse candidate for this WL, i.e., that the", 
                    "result of this WL or, more specifically, the operator the PRC(xxx) is attached to,", 
                    "can potentially be stored in an extension of xxx. This information is inferred at", 
                    "the end of the optimisations, but only used later on in reference counting to perform", 
                    "data reuse of xxx is a prefix of the result."
                ]
            }, 
            "DefShapeExpr": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wlsd"
                    }, 
                    "contains": "Array", 
                    "mandatory": false
                }, 
                "description": [
                    "For with3 loops, the default element is given by genarray( DefShapeExpr, Default)", 
                    "where default denotes the default element of the genarray. Only present if a default", 
                    "element is present, as well."
                ]
            }, 
            "Next": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "WithOp", 
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
            "withloop generate array operation."
        ]
    }, 
    "Modarray": {
        "attributes": {
            "Idx": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "opt_wlidx"
                    }, 
                    "contains": "Avis", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Array": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }, 
            "Mem": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "mem_alloc"
                    }, 
                    "contains": "Id", 
                    "mandatory": true
                }
            }, 
            "Sub": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pc_mmv"
                    }, 
                    "contains": "Id", 
                    "mandatory": false
                }
            }, 
            "RC": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "mem_rci", 
                        "from": "opt_wrci"
                    }, 
                    "contains": "Exprs", 
                    "mandatory": false
                }, 
                "description": [
                    "RC(xxx) encodes that xxx is a reuse candidate for this WL, i.e., that the result", 
                    "of this WL or, more specifically, the operator the RC(xxx) is attached to, can potentially", 
                    "be stored in xxx. This information is inferred at the end of the optimisations, IIRC", 
                    "but only used later on in reference counting to perform memory reuse."
                ]
            }, 
            "Next": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "WithOp", 
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
            "withloop operation"
        ]
    }, 
    "SPFold": {
        "sons": {
            "Neutral": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }, 
            "Guard": {
                "default": "NULL", 
                "targets": [
                    {
                        "phases": {
                            "to": "sim_flt", 
                            "from": "scp"
                        }, 
                        "contains": "Expr", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "ptc_ivd", 
                            "from": "sim_flt"
                        }, 
                        "contains": "SPId", 
                        "mandatory": false
                    }, 
                    {
                        "phases": {
                            "to": "ptc_cwf", 
                            "from": "ptc_ivd"
                        }, 
                        "contains": "Id", 
                        "mandatory": false
                    }
                ]
            }, 
            "Fn": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "SPId", 
                    "mandatory": false
                }, 
                "description": [
                    "The reduction function."
                ]
            }, 
            "Args": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }, 
                "description": [
                    "Relatively free arguments to the reduction function in case of the partial application."
                ]
            }, 
            "Next": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "WithOp", 
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
            "withloop operation (SP version)"
        ]
    }, 
    "Fold": {
        "attributes": {
            "Fundef": {
                "inconstructor": true, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "Fundef", 
                    "mandatory": true
                }
            }, 
            "OmpReductionOp": {
                "default": "(omp_reduction_op)0", 
                "inconstructor": false, 
                "type": "OmpOP", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }, 
                "description": [
                    "This attribute indicates the type of OpenMP reducation operator."
                ]
            }
        }, 
        "sons": {
            "Neutral": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }, 
            "Args": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }
            }, 
            "Guard": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "ewl_accu", 
                        "from": "ptc_cwf"
                    }, 
                    "contains": "Id", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "WithOp", 
                    "mandatory": false
                }
            }, 
            "Initial": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wlsd"
                    }, 
                    "contains": "Id", 
                    "mandatory": false
                }, 
                "description": [
                    "MUTC the value to start folding from."
                ]
            }, 
            "PartialMem": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "Id", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsPartialFold": {
                "desc": [
                    "Flag to indicate if the fold performs a partial CUDA fold."
                ]
            }
        }, 
        "description": [
            "withloop operation"
        ]
    }, 
    "Break": {
        "attributes": {}, 
        "sons": {
            "Mem": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "mem_alloc"
                    }, 
                    "contains": "Id", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "WithOp", 
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
            "Withloop operation for stopping folding"
        ]
    }, 
    "Propagate": {
        "attributes": {}, 
        "sons": {
            "Default": {
                "targets": {
                    "phases": "all", 
                    "contains": "Expr", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "WithOp", 
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
            "Withloop operation for propagating objects between iterations"
        ]
    }, 
    "WLseg": {
        "attributes": {
            "Dims": {
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "inconstructor": true, 
                "type": "Integer", 
                "description": [
                    "Gives the number of dimensions of this segment, i.e., the rank of the computed result."
                ]
            }, 
            "Blocks": {
                "default": "0", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Scheduling": {
                "inconstructor": false, 
                "type": "Scheduling", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wltr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "TaskSel": {
                "inconstructor": false, 
                "type": "TaskSel", 
                "targets": {
                    "phases": "pc_mmv", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Contents": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLstride", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wltr"
                    }, 
                    "contains": "WLseg", 
                    "mandatory": false
                }
            }, 
            "IdxInf": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wltr"
                    }, 
                    "contains": "Array", 
                    "mandatory": true
                }, 
                "description": [
                    "Gives the infimum of all indices in the iteration space of this segment. Note that", 
                    "for static segments (ISDYNAMIC == FALSE), this must be an array of integer constants."
                ]
            }, 
            "IdxSup": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wltr"
                    }, 
                    "contains": "Array", 
                    "mandatory": true
                }, 
                "description": [
                    "Gives the supremum of all indices in the iteration space of this segment. Note that", 
                    "for non-dynamic segments (ISDYNAMIC == FALSE), this must be an array of integer constants."
                ]
            }, 
            "UBV": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wltr"
                    }, 
                    "contains": "Array", 
                    "mandatory": false
                }, 
                "description": [
                    "This son is only present if the segment is static (ISDYNAMIC == FALSE). The length", 
                    "of the vector is replicated by the BLOCKS attribute."
                ]
            }, 
            "BV": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wltr"
                    }, 
                    "contains": "Exprs", 
                    "mandatory": false
                }, 
                "description": [
                    "This son contains an N_exprs chain of integer vectors encoded as N_array nodes. The", 
                    "number of expressions in the chain needs to be equal to the BLOCKS attribute. Each", 
                    "vector, in turn, needs to have exactly DIMS many elements."
                ]
            }, 
            "SV": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wltr"
                    }, 
                    "contains": "Array", 
                    "mandatory": false
                }, 
                "description": [
                    "This son is only present if the segment is static (ISDYNAMIC == FALSE). The length", 
                    "of the vector is replicated by the BLOCKS attribute."
                ]
            }, 
            "HomSV": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wltr"
                    }, 
                    "contains": "Array", 
                    "mandatory": false
                }, 
                "description": [
                    "This son is only present if the segment is static (ISDYNAMIC == FALSE). The length", 
                    "of the vector is replicated by the BLOCKS attribute."
                ]
            }
        }, 
        "flags": {
            "IsDynamic": {
                "desc": [
                    "Signals that this segment has bounds that are not statically known."
                ]
            }
        }
    }, 
    "WLblock": {
        "attributes": {
            "Level": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Dim": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Bound1": {
                "targets": {
                    "phases": "all", 
                    "contains": "Num", 
                    "mandatory": true
                }
            }, 
            "Bound2": {
                "targets": {
                    "phases": "all", 
                    "contains": "Num", 
                    "mandatory": true
                }
            }, 
            "Step": {
                "targets": {
                    "phases": "all", 
                    "contains": "Num", 
                    "mandatory": true
                }
            }, 
            "NextDim": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLblock", 
                    "mandatory": false
                }
            }, 
            "Contents": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "WLublock", 
                        "WLstride"
                    ], 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLblock", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "WLublock": {
        "attributes": {
            "Level": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Dim": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Bound1": {
                "targets": {
                    "phases": "all", 
                    "contains": "Num", 
                    "mandatory": true
                }
            }, 
            "Bound2": {
                "targets": {
                    "phases": "all", 
                    "contains": "Num", 
                    "mandatory": true
                }
            }, 
            "Step": {
                "targets": {
                    "phases": "all", 
                    "contains": "Num", 
                    "mandatory": true
                }
            }, 
            "NextDim": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLublock", 
                    "mandatory": false
                }
            }, 
            "Contents": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLstride", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLublock", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "WLstride": {
        "attributes": {
            "Level": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Dim": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Part": {
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "wlt_wltr"
                    }, 
                    "contains": "Part", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Bound1": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Num", 
                        "Id"
                    ], 
                    "mandatory": true
                }, 
                "description": [
                    "Gives the lower bound of this stride. This needs to be an N_num if ISDYNAMIC is not", 
                    "set."
                ]
            }, 
            "Bound2": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Num", 
                        "Id"
                    ], 
                    "mandatory": true
                }, 
                "description": [
                    "Gives the lower bound of this stride. This needs to be an N_num if ISDYNAMIC is not", 
                    "set."
                ]
            }, 
            "Step": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Num", 
                        "Id"
                    ], 
                    "mandatory": true
                }, 
                "description": [
                    "Gives the step of this stride. This needs to be an N_num if ISDYNAMIC is not set."
                ]
            }, 
            "Contents": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLgrid", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLstride", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DoUnroll": {}, 
            "IsModified": {
                "desc": [
                    "Used in wltransform."
                ]
            }, 
            "IsDynamic": {
                "default": "FALSE", 
                "desc": [
                    "Signals that this stride has bounds or a step that are not statically known."
                ]
            }
        }
    }, 
    "WLgrid": {
        "attributes": {
            "Level": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Dim": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Code": {
                "targets": {
                    "phases": "all", 
                    "contains": "Code", 
                    "mandatory": true
                }, 
                "inconstructor": true, 
                "type": "CodeLink", 
                "description": [
                    "if present, the used counter for the code needs to be increased"
                ]
            }
        }, 
        "sons": {
            "Bound1": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Num", 
                        "Id"
                    ], 
                    "mandatory": true
                }, 
                "description": [
                    "Encodes the lower bound of the grid. This needs to be a N_num node if ISDYNAMIC is", 
                    "not set."
                ]
            }, 
            "Bound2": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Num", 
                        "Id"
                    ], 
                    "mandatory": true
                }, 
                "description": [
                    "Encodes the upper bound of the grid. This needs to be a N_num node if ISDYNAMIC is", 
                    "not set."
                ]
            }, 
            "NextDim": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLstride", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "WLgrid", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsFitted": {}, 
            "DoUnroll": {}, 
            "IsNoOp": {}, 
            "IsModified": {
                "desc": [
                    "Used in wltransform."
                ]
            }, 
            "IsDynamic": {
                "default": "FALSE", 
                "desc": [
                    "Signals that this grid has bounds that are not statically known."
                ]
            }
        }
    }, 
    "Dataflownode": {
        "attributes": {
            "Graph": {
                "inconstructor": true, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Dataflowgraph", 
                    "mandatory": true
                }
            }, 
            "Assign": {
                "inconstructor": true, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Assign", 
                    "mandatory": true
                }
            }, 
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Dependent": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "NodeList", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "UsedNodes": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "NodeList", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "RefCount": {
                "default": "1", 
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "ExecMode": {
                "default": "MUTH_ANY", 
                "inconstructor": false, 
                "type": "MTExecMode", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "DFGThen": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": false
                }
            }, 
            "DFGElse": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": false
                }
            }, 
            "RefLeft": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": "AssignmentsRearrange", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "IsUsed": {}
        }
    }, 
    "Dataflowgraph": {
        "attributes": {
            "Members": {
                "default": "NULL", 
                "type": "NodeList", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Source": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": "all", 
                    "contains": "Dataflownode", 
                    "mandatory": false
                }
            }, 
            "Sink": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": "all", 
                    "contains": "Dataflownode", 
                    "mandatory": true
                }
            }, 
            "MyHomeDFN": {
                "default": "NULL", 
                "inconstructor": false, 
                "type": "Node", 
                "targets": {
                    "phases": "all", 
                    "contains": "Dataflownode", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Import": {
        "attributes": {
            "Mod": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Interface", 
                    "mandatory": false
                }
            }, 
            "Symbol": {
                "targets": {
                    "phases": "all", 
                    "contains": "Symbol", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "All": {}
        }
    }, 
    "Export": {
        "attributes": {}, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Interface", 
                    "mandatory": false
                }
            }, 
            "Symbol": {
                "targets": {
                    "phases": "all", 
                    "contains": "Symbol", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "All": {}
        }
    }, 
    "Use": {
        "attributes": {
            "Mod": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Interface", 
                    "mandatory": false
                }
            }, 
            "Symbol": {
                "targets": {
                    "phases": "all", 
                    "contains": "Symbol", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "All": {}
        }
    }, 
    "Provide": {
        "attributes": {}, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Interface", 
                    "mandatory": false
                }
            }, 
            "Symbol": {
                "targets": {
                    "phases": "all", 
                    "contains": "Symbol", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "All": {}
        }
    }, 
    "Symbol": {
        "attributes": {
            "Id": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Symbol", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "Used": {
                "default": "FALSE", 
                "desc": [
                    "Used to flag those symbols that are in fact used, that is, those that do exist in", 
                    "the module."
                ]
            }
        }
    }, 
    "Set": {
        "attributes": {
            "Member": {
                "inconstructor": true, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "Objdef", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Set", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Constraint": {
        "attributes": {
            "PredAvis": {
                "inconstructor": true, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Avis", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Expr": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Prf", 
                        "Ap"
                    ], 
                    "mandatory": true
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Constraint", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "Ret": {
        "attributes": {
            "Type": {
                "inconstructor": true, 
                "type": "NewType", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Linksign": {
                "inconstructor": false, 
                "type": "Integer", 
                "targets": {
                    "phases": {
                        "to": "final", 
                        "from": "pre_rpr"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Ret", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsAliasing": {
                "default": "TRUE"
            }, 
            "IsArtificial": {
                "desc": [
                    "Set to true if the given return value was introduced when resolving reference arguments", 
                    "and thus will be removed again later on. Set to false for all other return values."
                ]
            }, 
            "IsRefcounted": {
                "default": "TRUE"
            }, 
            "HasLinksignInfo": {}, 
            "IsCReturn": {}, 
            "WasRemoved": {
                "default": "FALSE"
            }, 
            "IsUnique": {
                "default": "FALSE"
            }
        }
    }, 
    "Ids": {
        "attributes": {
            "Avis": {
                "inconstructor": true, 
                "type": "Link", 
                "targets": {
                    "phases": "all", 
                    "contains": "Avis", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Ids", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }, 
        "checks": [
            "CHKattribsIds"
        ]
    }, 
    "Nums": {
        "attributes": {
            "Val": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Nums", 
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
            "Linked list of Integers, used only in scanner/parser"
        ]
    }, 
    "Globobj": {
        "attributes": {
            "Objdef": {
                "inconstructor": true, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "Objdef", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "SPId": {
        "attributes": {
            "Ns": {
                "inconstructor": true, 
                "type": "Namespace", 
                "targets": {
                    "phases": {
                        "to": "ptc_goi", 
                        "from": "initial"
                    }, 
                    "contains": "any", 
                    "mandatory": false
                }
            }, 
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {}, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "SPIds": {
        "attributes": {
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "SPIds", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "SPAp": {
        "attributes": {
            "SpawnPlace": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Id": {
                "targets": {
                    "phases": "all", 
                    "contains": "SPId", 
                    "mandatory": true
                }
            }, 
            "Args": {
                "targets": {
                    "phases": "all", 
                    "contains": "Exprs", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsSpawned": {
                "desc": [
                    "This function is spawned when using functional parallelism"
                ]
            }, 
            "IsRemote": {
                "desc": [
                    "This function call should be spawned on another resource"
                ]
            }
        }
    }, 
    "Error": {
        "attributes": {
            "message": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "anyphase": {
                "inconstructor": true, 
                "type": "CompilerPhase", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Error", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "DummyFlag": {
                "default": "FALSE"
            }
        }
    }, 
    "FunBundle": {
        "attributes": {
            "Name": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Ns": {
                "inconstructor": true, 
                "type": "Namespace", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "ExtName": {
                "inconstructor": true, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Arity": {
                "inconstructor": true, 
                "type": "Integer", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Fundef": {
                "targets": {
                    "phases": "all", 
                    "contains": "Fundef", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Fundef", 
                        "FunBundle"
                    ], 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsXtBundle": {
                "desc": [
                    "Used to tack a funbundle as an XT version of another bundler"
                ]
            }, 
            "IsStBundle": {
                "desc": [
                    "Used to tack a funbundle as an ST version of another bundler"
                ]
            }
        }
    }, 
    "With3": {
        "attributes": {
            "In_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Out_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Local_Mask": {
                "inconstructor": false, 
                "type": "DFMask", 
                "targets": {
                    "phases": [
                        "ptc_l2f", 
                        "popt_l2f", 
                        "pc_lw3"
                    ], 
                    "contains": "any", 
                    "mandatory": true
                }
            }, 
            "Dist": {
                "inconstructor": false, 
                "type": "String", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": false
                }
            }
        }, 
        "sons": {
            "Ranges": {
                "targets": {
                    "phases": "all", 
                    "contains": "Range", 
                    "mandatory": true
                }, 
                "description": [
                    "Gives the set of ranges (generators) this with-loop is defined for. Needs to be a", 
                    "full partition of the outer-most dimension of the result."
                ]
            }, 
            "Operations": {
                "targets": {
                    "phases": "all", 
                    "contains": "WithOp", 
                    "mandatory": true
                }, 
                "description": [
                    "The operations this with-loop computes."
                ]
            }
        }, 
        "flags": {
            "UseConcurrentRanges": {
                "default": "TRUE", 
                "desc": [
                    "Controls whether the ranges of a with3 will be computed concurrently, or whether", 
                    "the ranges are sequentialised"
                ]
            }, 
            "Dense": {
                "default": "TRUE", 
                "desc": [
                    "This with3 covers all of the index space without gaps"
                ]
            }, 
            "IsTopLevel": {
                "default": "FALSE", 
                "desc": [
                    "This with3 represents a top-level stride of a former with2. This is used to indetify", 
                    "into what array the IIRR (see N_range) indexes."
                ]
            }
        }, 
        "description": [
            "Used to model the 1d with-loop used by the mutc backend. The with3 loop is nested", 
            "to provide the needed number of detentions"
        ]
    }, 
    "Range": {
        "attributes": {
            "BlockSize": {
                "default": "0", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }, 
                "type": "Integer", 
                "description": [
                    "Used for resource allocation. Corresponds to the blocksize argument of the create", 
                    "instruction in mutc."
                ]
            }, 
            "G2SInstrs": {
                "default": "0", 
                "targets": {
                    "phases": "all", 
                    "contains": "Assign", 
                    "mandatory": false
                }, 
                "type": "Link", 
                "description": [
                    "Used for temporarily storing global to shared memory data load instructions."
                ]
            }
        }, 
        "sons": {
            "Index": {
                "targets": [
                    {
                        "phases": {
                            "to": "mem_alloc", 
                            "from": "wlt_wlsd"
                        }, 
                        "contains": "Ids", 
                        "mandatory": true
                    }, 
                    {
                        "phases": {
                            "to": "pc_lw3", 
                            "from": "mem_alloc"
                        }, 
                        "contains": "Id", 
                        "mandatory": true
                    }
                ], 
                "description": [
                    "Scalar index of this range."
                ]
            }, 
            "LowerBound": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Num", 
                        "Id"
                    ], 
                    "mandatory": true
                }, 
                "description": [
                    "Lower bound of this range."
                ]
            }, 
            "UpperBound": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Num", 
                        "Id"
                    ], 
                    "mandatory": true
                }, 
                "description": [
                    "Upper bound of this range."
                ]
            }, 
            "ChunkSize": {
                "targets": {
                    "phases": "all", 
                    "contains": [
                        "Num", 
                        "Id"
                    ], 
                    "mandatory": false
                }, 
                "description": [
                    "Chunk size of this range. If non-NULL, this range is not computed by computing each", 
                    "cell alone, but by computing vectors of ChunkSize many elements per iteration. Note", 
                    "that the total number of elements computed by this range needs to be a multiple of", 
                    "ChunkSize! If the range is 0 then the chunk must be 1!"
                ]
            }, 
            "Body": {
                "targets": {
                    "phases": "all", 
                    "contains": "Block", 
                    "mandatory": true
                }, 
                "description": [
                    "Block computed for each iteration."
                ]
            }, 
            "Results": {
                "targets": [
                    {
                        "phases": {
                            "to": "pc_lw3", 
                            "from": "wlt_wlsd"
                        }, 
                        "contains": "Exprs", 
                        "mandatory": true
                    }, 
                    {
                        "phases": {
                            "to": "final", 
                            "from": "pc_lw3"
                        }, 
                        "contains": "Ap", 
                        "mandatory": true
                    }
                ], 
                "description": [
                    "Values assigned to the result for each iteration."
                ]
            }, 
            "Idxs": {
                "targets": {
                    "phases": {
                        "to": "mem_dr", 
                        "from": "wlt_wlsd"
                    }, 
                    "contains": "Ids", 
                    "mandatory": false
                }, 
                "description": [
                    "This is a chain of indices into the ravels of the results of genarray and modarray", 
                    "withloops. Once they are explicitly used in mem_alloc and mem_dr, this special reference", 
                    "is freed."
                ]
            }, 
            "IIRR": {
                "default": "NULL", 
                "targets": {
                    "phases": {
                        "to": "mem_dr", 
                        "from": "wlt_wlsd"
                    }, 
                    "contains": "Exprs", 
                    "mandatory": false
                }, 
                "description": [
                    "This is a chain of indices into the ravel of the overall result of genarray/modarray", 
                    "withloops. It corresponds (value-wise) to the wlidx of the origininal with2 and is", 
                    "used in optimisations like data-reuse to identify selections into the reused array.", 
                    "This chain only exists for the ranges of the innermost with3 of a transformed with2,", 
                    "as it is only defined in that level."
                ]
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Range", 
                    "mandatory": false
                }
            }
        }, 
        "flags": {
            "IsGlobal": {
                "default": "FALSE", 
                "desc": [
                    "True iff this range should be distributed globally over multiple cores"
                ]
            }, 
            "IsBlocked": {
                "default": "FALSE", 
                "desc": [
                    "True iff this range is blocked by the blocking pragma"
                ]
            }, 
            "IsFitting": {
                "default": "FALSE", 
                "desc": [
                    "True iff this range is a fitting range"
                ]
            }, 
            "NeedCudaUnroll": {
                "default": "FALSE", 
                "desc": [
                    "True iff this range needs to be unrolled by the CUDA compiler"
                ]
            }
        }, 
        "description": [
            "The generator of a with3"
        ]
    }, 
    "Idag": {
        "attributes": {
            "Dag": {
                "inconstructor": true, 
                "type": "Dag", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "VFams": {
                "targets": {
                    "phases": "all", 
                    "contains": "IdagVFam", 
                    "mandatory": false
                }
            }, 
            "EFams": {
                "targets": {
                    "phases": "all", 
                    "contains": "IdagEFam", 
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
            "Node to represent infinite graphs as needed for the subtyping relation of the array", 
            "shape type component"
        ]
    }, 
    "IdagVFam": {
        "attributes": {
            "Cmpfun": {
                "inconstructor": true, 
                "type": "IdagFun", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Vertices": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "IdagVertices", 
                    "mandatory": false
                }
            }, 
            "Froms": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "IdagEFams", 
                    "mandatory": false
                }
            }, 
            "Tos": {
                "default": "NULL", 
                "targets": {
                    "phases": "all", 
                    "contains": "IdagEFams", 
                    "mandatory": false
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "IdagVFam", 
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
            "represents the head entry of a vertex family chain"
        ]
    }, 
    "IdagEFam": {
        "attributes": {
            "Checkfun": {
                "inconstructor": true, 
                "type": "IdagFun", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "From": {
                "targets": {
                    "phases": "all", 
                    "contains": "IdagVFam", 
                    "mandatory": true
                }
            }, 
            "To": {
                "targets": {
                    "phases": "all", 
                    "contains": "IdagVFam", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "IdagEFam", 
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
            "represents the head entry of a edge family chain"
        ]
    }, 
    "IdagVertices": {
        "attributes": {
            "Vertex": {
                "inconstructor": true, 
                "type": "Vertex", 
                "targets": {
                    "phases": "all", 
                    "contains": "any", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "IdagVertices", 
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
            "a simple chain of links to vertices"
        ]
    }, 
    "IdagEFams": {
        "attributes": {
            "EFam": {
                "inconstructor": true, 
                "type": "ExtLink", 
                "targets": {
                    "phases": "all", 
                    "contains": "IdagEFam", 
                    "mandatory": true
                }
            }
        }, 
        "sons": {
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "IdagEFams", 
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
            "a simple chain of links to edge family entries"
        ]
    }, 
    "Withs": {
        "attributes": {}, 
        "sons": {
            "With": {
                "targets": {
                    "phases": "all", 
                    "contains": "Withloop", 
                    "mandatory": true
                }
            }, 
            "Next": {
                "targets": {
                    "phases": "all", 
                    "contains": "Withs", 
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
            "a simple chain of with-loops, used by distributed backend to support different transformations", 
            "of with-loop code for each target architecture."
        ]
    }
};
          
var traversals_json =    
{
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
    }, 
    "ACUPTN": {
        "default": "sons", 
        "include": "annotate_cuda_partition.h", 
        "name": "Annotate CUDA partitions", 
        "travuser": [
            "With", 
            "Part", 
            "Generator"
        ]
    }, 
    "ACUWL": {
        "default": "sons", 
        "include": "annotate_cuda_withloop2.h", 
        "name": "Annotate CUDA withloops", 
        "travuser": [
            "With", 
            "Code", 
            "Fundef", 
            "Ap", 
            "Fold", 
            "Break", 
            "Propagate", 
            "Genarray", 
            "Id", 
            "Let"
        ]
    }, 
    "AFB": {
        "default": "sons", 
        "include": "add_function_body.h", 
        "name": "Add Function Body Traversal", 
        "travuser": [
            "Fundef", 
            "Return", 
            "Block", 
            "Arg", 
            "Ap"
        ]
    }, 
    "AL": {
        "default": "sons", 
        "include": "associative_law.h", 
        "name": "Associative Law Optimization", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Arg", 
            "Block", 
            "Assign", 
            "Let", 
            "Ids", 
            "Prf", 
            "With", 
            "Part", 
            "Code"
        ]
    }, 
    "AMTRAN": {
        "default": "sons", 
        "include": "annotate_memory_transfers.h", 
        "name": "Annoate a memory transfer", 
        "travuser": [
            "Assign", 
            "Fundef", 
            "Prf", 
            "Ap", 
            "Id", 
            "Arg", 
            "Let", 
            "Funcond"
        ]
    }, 
    "ANS": {
        "default": "sons", 
        "include": "annotatenamespace.h", 
        "name": "Annotate Namespaces", 
        "travuser": [
            "Symbol", 
            "Use", 
            "Import", 
            "Export", 
            "Provide", 
            "Fundef", 
            "Typedef", 
            "Objdef", 
            "While", 
            "Do", 
            "SPAp", 
            "SPMop", 
            "Avis", 
            "Array", 
            "Arg", 
            "Ret", 
            "Vardec", 
            "SPIds", 
            "SPId", 
            "Let", 
            "With", 
            "SPFold", 
            "Module", 
            "Cast"
        ]
    }, 
    "APC": {
        "default": "sons", 
        "include": "pad_collect.h", 
        "name": "Array Padding Collect"
    }, 
    "APT": {
        "default": "sons", 
        "include": "pad_transform.h", 
        "name": "Array Padding Transform"
    }, 
    "ARMP": {
        "default": "sons", 
        "include": "add_rc_mode_prf.h", 
        "name": "Add RC Mode PRF", 
        "travuser": [
            "With3", 
            "Assign", 
            "Ap", 
            "Id", 
            "Fundef"
        ]
    }, 
    "AS": {
        "default": "sons", 
        "include": "arithmetic_simplification.h", 
        "name": "Arithmetic Simplification", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Prf"
        ]
    }, 
    "ASD": {
        "default": "sons", 
        "include": "audscldist.h", 
        "name": "AUD SCL distinction", 
        "traverror": [
            "Do"
        ], 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Let", 
            "Ap", 
            "Cond", 
            "With", 
            "With2", 
            "Code", 
            "Prf", 
            "Funcond"
        ]
    }, 
    "ASHA": {
        "default": "sons", 
        "include": "adjust_shmem_access.h", 
        "name": "CUDA Adjust shared memory access", 
        "travnone": [
            "With2"
        ], 
        "travuser": [
            "Let", 
            "With", 
            "Part", 
            "Code", 
            "Prf", 
            "Assign", 
            "Arg", 
            "Vardec"
        ]
    }, 
    "ASMRA": {
        "default": "sons", 
        "include": "assignments_rearrange.h", 
        "name": "Assignments Rearrange", 
        "travuser": [
            "Block"
        ]
    }, 
    "ASS": {
        "default": "sons", 
        "include": "addSyncs.h", 
        "name": "Add Syncs", 
        "travuser": [
            "Vardec", 
            "Range", 
            "With3"
        ]
    }, 
    "AWLF": {
        "default": "sons", 
        "include": "algebraic_wlf.h", 
        "name": "Algebraic With-Loop-Folding", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "With", 
            "Code", 
            "Part", 
            "Prf"
        ]
    }, 
    "AWLFI": {
        "default": "sons", 
        "include": "algebraic_wlfi.h", 
        "name": "Algebraic With-Loop-Folding Inference", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Assign", 
            "Let", 
            "Id", 
            "Cond", 
            "With", 
            "Modarray", 
            "Part", 
            "Prf"
        ]
    }, 
    "BTF": {
        "default": "sons", 
        "include": "bundle_to_fundef.h", 
        "name": "Bundle to Fundef", 
        "travuser": [
            "FunBundle", 
            "Fundef"
        ]
    }, 
    "CADT": {
        "default": "sons", 
        "include": "change_arrays_to_dist.h", 
        "name": "Change arrays to distributed type", 
        "travuser": [
            "Fundef", 
            "Ret", 
            "Avis"
        ]
    }, 
    "CBL": {
        "default": "sons", 
        "include": "construct_bundles.h", 
        "name": "Construct Bundles", 
        "travuser": [
            "Fundef", 
            "Module"
        ]
    }, 
    "CCF": {
        "default": "sons", 
        "include": "create_cond_fun.h", 
        "name": "Create conditional functions", 
        "travuser": [
            "Assign", 
            "Ids", 
            "Id"
        ]
    }, 
    "CCWB": {
        "default": "sons", 
        "include": "create_c_wrapper_body.h", 
        "name": "Create C wrapper body", 
        "travuser": [
            "FunBundle"
        ]
    }, 
    "CCWH": {
        "default": "sons", 
        "include": "create_c_wrapper_header.h", 
        "name": "Create C wrapper header", 
        "travuser": [
            "FunBundle", 
            "Fundef", 
            "Arg", 
            "Ret", 
            "Typedef", 
            "Module"
        ]
    }, 
    "CDFG": {
        "default": "sons", 
        "include": "create_dataflowgraph.h", 
        "name": "Create Dataflowgraph", 
        "travuser": [
            "Assign", 
            "Block", 
            "Id", 
            "Withid"
        ]
    }, 
    "CEGRO": {
        "default": "sons", 
        "include": "cell_growth.h", 
        "name": "Cell Growth", 
        "travuser": [
            "Assign", 
            "Block"
        ]
    }, 
    "CF": {
        "default": "sons", 
        "include": "constant_folding.h", 
        "name": "Constant Folding", 
        "travnone": [
            "Withid"
        ], 
        "travuser": [
            "Fundef", 
            "Block", 
            "Assign", 
            "Cond", 
            "Let", 
            "Ids", 
            "Array", 
            "Prf", 
            "With", 
            "Code", 
            "Part", 
            "Funcond"
        ]
    }, 
    "CFP": {
        "default": "sons", 
        "include": "create_function_pairs.h", 
        "name": "MUTC create function pairs", 
        "travuser": [
            "Fundef"
        ]
    }, 
    "CHK": {
        "default": "user", 
        "ifndef": "DBUG_OFF", 
        "include": "check.h", 
        "name": "Check the Tree"
    }, 
    "CHKLACF": {
        "default": "sons", 
        "include": "check_lacfuns.h", 
        "name": "Check LaC functions", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Block", 
            "Ap"
        ]
    }, 
    "CHKM": {
        "default": "user", 
        "ifndef": "DBUG_OFF", 
        "include": "check_node.h", 
        "name": "Check the memspace"
    }, 
    "CHKRST": {
        "default": "user", 
        "ifndef": "DBUG_OFF", 
        "include": "check_reset.h", 
        "name": "Reset for Tree Check"
    }, 
    "CLF": {
        "default": "sons", 
        "include": "create_loop_fun.h", 
        "name": "Create loop functions", 
        "travuser": [
            "Assign", 
            "Ids", 
            "Id"
        ]
    }, 
    "CMPT": {
        "default": "CMPTunknown", 
        "include": "compare_tree.h", 
        "name": "Compare Tree Traversal", 
        "prefun": "CMPTnodeType", 
        "travuser": [
            "Num", 
            "NumByte", 
            "NumShort", 
            "NumInt", 
            "NumLong", 
            "NumLonglong", 
            "NumUbyte", 
            "NumUshort", 
            "NumUint", 
            "NumUlong", 
            "NumUlonglong", 
            "Char", 
            "Bool", 
            "Float", 
            "Floatvec", 
            "Double", 
            "Type", 
            "Str", 
            "Id", 
            "Ids", 
            "Array", 
            "Prf", 
            "Ap", 
            "Generator", 
            "Fold", 
            "Block", 
            "Assign", 
            "Let", 
            "Return", 
            "Cond", 
            "Do", 
            "Funcond", 
            "Exprs", 
            "With", 
            "Part", 
            "Withid", 
            "Code", 
            "Genarray", 
            "Modarray"
        ]
    }, 
    "CNSTASS": {
        "default": "sons", 
        "include": "create_constant_assignments.h", 
        "name": "Insert shape, lower bound and upper bound constant assignments", 
        "travuser": [
            "Assign", 
            "With", 
            "Withs", 
            "Fundef", 
            "Generator"
        ]
    }, 
    "COMP": {
        "default": "sons", 
        "include": "compile.h", 
        "name": "Compile", 
        "traverror": [
            "Cast", 
            "While", 
            "Funcond"
        ], 
        "travnone": [
            "Icm"
        ], 
        "travuser": [
            "Ap", 
            "Array", 
            "Assign", 
            "Block", 
            "Cond", 
            "Fundef", 
            "Id", 
            "Let", 
            "Do", 
            "Module", 
            "Objdef", 
            "Prf", 
            "Return", 
            "Typedef", 
            "Vardec", 
            "Num", 
            "NumByte", 
            "NumShort", 
            "NumInt", 
            "NumLong", 
            "NumLonglong", 
            "NumUbyte", 
            "NumUshort", 
            "NumUint", 
            "NumUlong", 
            "NumUlonglong", 
            "Char", 
            "Bool", 
            "Float", 
            "Floatvec", 
            "Double", 
            "With", 
            "Withid", 
            "Part", 
            "Generator", 
            "With2", 
            "WLseg", 
            "WLblock", 
            "WLublock", 
            "WLstride", 
            "WLgrid", 
            "Code", 
            "With3", 
            "Range"
        ]
    }, 
    "CONCEL": {
        "default": "sons", 
        "include": "consolidate_cells.h", 
        "name": "Consolidate Cells", 
        "travuser": [
            "EX", 
            "Fundef", 
            "MT", 
            "ST"
        ]
    }, 
    "COSMI": {
        "default": "sons", 
        "include": "movesharedmeminstr.h", 
        "name": "Collect shared memory management instructions", 
        "traverror": [
            "With"
        ], 
        "travuser": [
            "Fundef", 
            "Ret", 
            "Arg", 
            "Block", 
            "Vardec", 
            "Assign", 
            "Let", 
            "Prf", 
            "With2", 
            "Genarray", 
            "Modarray", 
            "Fold"
        ]
    }, 
    "CP": {
        "default": "sons", 
        "include": "constant_propagation.h", 
        "name": "Constant Propagation", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Prf", 
            "Id", 
            "Array", 
            "Genarray", 
            "Avis"
        ]
    }, 
    "CRECE": {
        "default": "sons", 
        "include": "create_cells.h", 
        "name": "Create Cells", 
        "travuser": [
            "Assign", 
            "Block"
        ]
    }, 
    "CRTWRP": {
        "default": "sons", 
        "include": "create_wrappers.h", 
        "name": "Create Wrappers", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Let", 
            "SPAp", 
            "Genarray", 
            "SPFold"
        ]
    }, 
    "CRWIW": {
        "default": "sons", 
        "include": "create_withinwith.h", 
        "name": "Create Withinwith Replication", 
        "travuser": [
            "Ap", 
            "Assign", 
            "Fundef"
        ]
    }, 
    "CS": {
        "default": "sons", 
        "include": "constraint_statistics.h", 
        "name": "Print Constraint Statistics", 
        "travuser": [
            "Fundef", 
            "Prf"
        ]
    }, 
    "CSE": {
        "default": "sons", 
        "include": "SSACSE.h", 
        "name": "Common Subexpression Elimination", 
        "travnone": [
            "Withid"
        ], 
        "travuser": [
            "Module", 
            "Fundef", 
            "Avis", 
            "Block", 
            "Assign", 
            "Let", 
            "Code", 
            "Cond", 
            "With", 
            "Ap", 
            "Ids", 
            "Id", 
            "Return"
        ]
    }, 
    "CSGD": {
        "default": "sons", 
        "include": "check_and_simplify_generic_definitions.h", 
        "name": "Check and Simplify Generic Definitions", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Arg", 
            "Ret", 
            "Avis", 
            "Cast", 
            "Return", 
            "Assign"
        ]
    }, 
    "CSPF": {
        "default": "sons", 
        "include": "create_spawn_funs.h", 
        "name": "MUTC create spawn functions", 
        "travuser": [
            "Module", 
            "Ap"
        ]
    }, 
    "CSS": {
        "default": "sons", 
        "include": "count_spawn_sync.h", 
        "name": "Count Spawns and Syncs", 
        "travuser": [
            "Fundef", 
            "Let", 
            "Ap", 
            "Prf"
        ]
    }, 
    "CTR": {
        "default": "sons", 
        "include": "convert_type_representation.h", 
        "name": "Converting to old type representation", 
        "travuser": [
            "Fundef", 
            "Arg", 
            "Block", 
            "Vardec", 
            "Ret"
        ]
    }, 
    "CTZ": {
        "default": "sons", 
        "include": "comparison_to_zero.h", 
        "name": "Comparison to Zero", 
        "travuser": [
            "Block", 
            "Assign", 
            "Let", 
            "Prf", 
            "Fundef", 
            "Module"
        ]
    }, 
    "CTZG": {
        "default": "sons", 
        "include": "comparison_to_zero_guards.h", 
        "name": "Comparison to Zero for Guards", 
        "travuser": [
            "Assign", 
            "Let", 
            "Prf", 
            "Fundef"
        ]
    }, 
    "CU": {
        "default": "sons", 
        "include": "check_uniqueness.h", 
        "name": "Check uniqueness", 
        "travuser": [
            "Avis", 
            "Block", 
            "Code", 
            "Cond", 
            "Funcond", 
            "Fundef", 
            "Id", 
            "Ids", 
            "Prf"
        ]
    }, 
    "CUA": {
        "default": "sons", 
        "include": "check_uniqueness_annotations.h", 
        "name": "Check uniqueness annotations", 
        "travuser": [
            "Objdef", 
            "Arg", 
            "Ret"
        ]
    }, 
    "CUASR": {
        "default": "sons", 
        "include": "adjust_stknl_rets.h", 
        "name": "CUDA Adjust return ids of single threaded kernel", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Ap", 
            "Return", 
            "Id", 
            "Ids", 
            "Module", 
            "Let", 
            "Arg", 
            "Ret"
        ]
    }, 
    "CUBSL": {
        "default": "sons", 
        "include": "cubeslicer.h", 
        "name": "Algebraic With-Loop-Folding Cube Slicer", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "With", 
            "Part", 
            "Prf"
        ]
    }, 
    "CUCC": {
        "default": "sons", 
        "include": "cuda_create_cells.h", 
        "name": "CUDA Create cells", 
        "travuser": [
            "Fundef", 
            "Assign"
        ]
    }, 
    "CUCM": {
        "default": "sons", 
        "include": "cuda_cost_model.h", 
        "name": "CUDA cost model", 
        "travuser": [
            "Fundef", 
            "Let", 
            "With", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Part"
        ]
    }, 
    "CUD": {
        "default": "sons", 
        "include": "cleanup_decls.h", 
        "name": "Cleanup Declarations", 
        "travuser": [
            "Block", 
            "Fundef", 
            "Id", 
            "Ids", 
            "Vardec"
        ]
    }, 
    "CUDR": {
        "default": "sons", 
        "include": "cuda_data_reuse.h", 
        "name": "CUDA Exploiting data reuse with cuda shared memory", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Ap", 
            "Assign", 
            "With", 
            "Part", 
            "Code", 
            "With3", 
            "Range", 
            "Prf"
        ]
    }, 
    "CUKNL": {
        "default": "sons", 
        "include": "create_cuda_kernels.h", 
        "name": "Create cuda kernel functions", 
        "travuser": [
            "Assign", 
            "Do", 
            "Let", 
            "With", 
            "With2", 
            "Withid", 
            "Id", 
            "Ids", 
            "Fundef", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Part", 
            "Code", 
            "Generator", 
            "Prf"
        ]
    }, 
    "CUSKC": {
        "default": "sons", 
        "include": "cuda_sink_code.h", 
        "name": "CUDA Sink scalar code into CUDA withloop", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Ids", 
            "Id", 
            "Let", 
            "Block", 
            "With"
        ]
    }, 
    "CUTEM": {
        "default": "sons", 
        "include": "cuda_tag_executionmode.h", 
        "name": "CUDA Tag execution mode", 
        "travnone": [
            "Return", 
            "Funcond"
        ], 
        "travuser": [
            "With", 
            "Assign", 
            "Id", 
            "Ids", 
            "Ap", 
            "Let", 
            "Fundef", 
            "Vardec", 
            "Cond", 
            "Block", 
            "Arg"
        ]
    }, 
    "CWC": {
        "default": "sons", 
        "include": "create_wrapper_code.h", 
        "name": "Create Wrapper Code", 
        "travuser": [
            "Fundef"
        ]
    }, 
    "CWLE": {
        "default": "sons", 
        "include": "copywlelim.h", 
        "name": "Copy With-Loop Elimination", 
        "travuser": [
            "Fundef", 
            "With", 
            "Let", 
            "Code", 
            "Assign", 
            "Ids", 
            "Arg"
        ]
    }, 
    "DAA": {
        "default": "sons", 
        "include": "data_access_analysis.h", 
        "name": "CUDA Data access analysis", 
        "travuser": [
            "Fundef", 
            "Ap", 
            "Assign", 
            "With", 
            "Part", 
            "Code", 
            "Prf"
        ]
    }, 
    "DCI": {
        "default": "sons", 
        "include": "deadcodeinference.h", 
        "name": "Dead Code Inference", 
        "travuser": [
            "Fundef", 
            "Arg", 
            "Vardec", 
            "Block", 
            "Assign", 
            "Return", 
            "Cond", 
            "Let", 
            "Ap", 
            "Id", 
            "Ids", 
            "Code", 
            "Withid", 
            "Range"
        ]
    }, 
    "DCR": {
        "default": "sons", 
        "include": "deadcoderemoval.h", 
        "name": "Dead Code Removal", 
        "travuser": [
            "Fundef", 
            "Arg", 
            "Ret", 
            "Vardec", 
            "Block", 
            "Assign", 
            "Annotate", 
            "Let", 
            "Ids", 
            "Code", 
            "Cond", 
            "Ap", 
            "Return", 
            "Module"
        ]
    }, 
    "DDEPEND": {
        "default": "sons", 
        "include": "detectdependencies.h", 
        "name": "Detect Dependencies", 
        "travuser": [
            "Assign", 
            "Prf", 
            "Id", 
            "With", 
            "Code"
        ]
    }, 
    "DES": {
        "default": "sons", 
        "include": "destruct.h", 
        "name": "Remove Structs", 
        "travuser": [
            "Module", 
            "Typedef", 
            "Structdef", 
            "Fundef", 
            "Arg", 
            "Ret", 
            "Assign", 
            "Exprs", 
            "Let", 
            "Ids", 
            "Vardec"
        ]
    }, 
    "DFC": {
        "default": "sons", 
        "include": "dispatchfuncalls.h", 
        "name": "Dispatch Funcalls and Create Foldfuns", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Ap", 
            "With", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Propagate", 
            "Let"
        ]
    }, 
    "DFR": {
        "default": "sons", 
        "include": "DeadFunctionRemoval.h", 
        "name": "Dead Function Removal", 
        "travuser": [
            "Module", 
            "Objdef", 
            "Fundef", 
            "Arg", 
            "Ap", 
            "Fold"
        ]
    }, 
    "DISTCOND": {
        "default": "sons", 
        "include": "create_dist_wl_cond.h", 
        "name": "Create distributed with-loop conditional", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "Withs", 
            "With", 
            "With2"
        ]
    }, 
    "DL": {
        "default": "sons", 
        "include": "distributive_law.h", 
        "name": "Distributive Law Optimization", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Assign", 
            "Let", 
            "Ids", 
            "Prf"
        ]
    }, 
    "DLIR": {
        "default": "sons", 
        "include": "loop_invariant_removal.h", 
        "name": "Do-Loop Invariants Traversal", 
        "travuser": [
            "Ids", 
            "Assign", 
            "Fundef", 
            "Arg", 
            "Vardec", 
            "Block", 
            "Let", 
            "Id", 
            "Ap", 
            "Cond", 
            "Return", 
            "With", 
            "Withid", 
            "Exprs", 
            "Module"
        ]
    }, 
    "DLIRMOV": {
        "default": "sons", 
        "include": "loop_invariant_removal.h", 
        "name": "Loop Invariants Move Traversal", 
        "travuser": [
            "Id", 
            "Withid", 
            "Assign", 
            "Block", 
            "Let", 
            "Ids"
        ]
    }, 
    "DMUI": {
        "default": "sons", 
        "include": "dynamic_memory_usage_inference.h", 
        "name": "Dynamic memory usage inference", 
        "travuser": [
            "Fundef", 
            "Prf"
        ]
    }, 
    "DST": {
        "default": "sons", 
        "include": "distribute_threads.h", 
        "name": "Distribute threads", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Ap", 
            "With3", 
            "Range"
        ]
    }, 
    "DUP": {
        "default": "user", 
        "include": "DupTree.h", 
        "name": "Tree duplication", 
        "travsons": [
            "Idag", 
            "IdagVFam", 
            "IdagEFam", 
            "IdagEFams", 
            "IdagVertices"
        ]
    }, 
    "DVR": {
        "default": "sons", 
        "include": "dead_vardec_removal.h", 
        "name": "Dead vardec removal", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Block", 
            "Id", 
            "Ids", 
            "Vardec"
        ]
    }, 
    "EA": {
        "default": "sons", 
        "include": "ExplicitAccumulate.h", 
        "name": "Explicit Accumulate", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Let", 
            "With", 
            "Propagate", 
            "Fold", 
            "Code"
        ]
    }, 
    "EAT": {
        "default": "sons", 
        "include": "elim_alpha_types.h", 
        "name": "Eliminate type variables and do some cleanup", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Ap", 
            "Avis", 
            "Array", 
            "Block", 
            "Let", 
            "Part", 
            "Withid", 
            "With"
        ]
    }, 
    "EBT": {
        "default": "sons", 
        "include": "elim_bottom_types.h", 
        "name": "Eliminate bottom types", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Ap", 
            "Block", 
            "Ids", 
            "Vardec", 
            "Let", 
            "Assign", 
            "Cond", 
            "Funcond"
        ]
    }, 
    "EDFA": {
        "default": "sons", 
        "include": "eliminate_duplicate_fundef_args.h", 
        "name": "Eliminate Duplicate Fundef Args", 
        "travuser": [
            "Fundef", 
            "Ap"
        ]
    }, 
    "ELF": {
        "default": "sons", 
        "include": "extend_lac_funs.h", 
        "name": "Extend LaC funs", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Ap"
        ]
    }, 
    "EMAA": {
        "default": "none", 
        "include": "aliasanalysis.h", 
        "name": "Alias analysis", 
        "travsons": [
            "Module", 
            "Block", 
            "Exprs", 
            "Range"
        ], 
        "travuser": [
            "Ap", 
            "Arg", 
            "Assign", 
            "Code", 
            "Cond", 
            "Fold", 
            "Funcond", 
            "Fundef", 
            "Genarray", 
            "Id", 
            "Let", 
            "Modarray", 
            "Prf", 
            "With", 
            "With2", 
            "With3", 
            "Vardec"
        ]
    }, 
    "EMAL": {
        "default": "none", 
        "include": "alloc.h", 
        "name": "Allocation", 
        "travsons": [
            "Module", 
            "Cond", 
            "Block"
        ], 
        "travuser": [
            "Num", 
            "NumByte", 
            "NumShort", 
            "NumInt", 
            "NumLong", 
            "NumLonglong", 
            "NumUbyte", 
            "NumUshort", 
            "NumUint", 
            "NumUlong", 
            "NumUlonglong", 
            "Char", 
            "Bool", 
            "Float", 
            "Floatvec", 
            "Double", 
            "Ap", 
            "Array", 
            "Assign", 
            "Break", 
            "Code", 
            "Fold", 
            "Funcond", 
            "Fundef", 
            "Genarray", 
            "Id", 
            "Let", 
            "Modarray", 
            "Prf", 
            "Propagate", 
            "With", 
            "With2", 
            "Withid", 
            "Withs", 
            "With3", 
            "Range"
        ]
    }, 
    "EMDR": {
        "default": "none", 
        "include": "datareuse.h", 
        "name": "Data reuse", 
        "travsons": [
            "Module", 
            "Block"
        ], 
        "travuser": [
            "Ap", 
            "Assign", 
            "Withid", 
            "With", 
            "With2", 
            "With3", 
            "Range", 
            "Code", 
            "Cond", 
            "Fundef", 
            "Let", 
            "Prf", 
            "Genarray", 
            "Modarray"
        ]
    }, 
    "EMEC": {
        "default": "none", 
        "include": "explicitcopy.h", 
        "name": "Explicit Copy", 
        "travsons": [
            "Module", 
            "Let", 
            "With", 
            "With2", 
            "Cond", 
            "Code", 
            "Block"
        ], 
        "travuser": [
            "Assign", 
            "Fundef", 
            "Ap", 
            "Prf"
        ]
    }, 
    "EMIA": {
        "default": "none", 
        "include": "interfaceanalysis.h", 
        "name": "Interface Analysis", 
        "travsons": [
            "Module", 
            "Exprs"
        ], 
        "travuser": [
            "Ap", 
            "Arg", 
            "Assign", 
            "Block", 
            "Cond", 
            "Fold", 
            "Funcond", 
            "Fundef", 
            "Genarray", 
            "Id", 
            "Let", 
            "Modarray", 
            "Ret", 
            "Return", 
            "Vardec", 
            "With", 
            "With2"
        ]
    }, 
    "EMIP": {
        "default": "sons", 
        "include": "inplacecomp.h", 
        "name": "Inplace Computation", 
        "travnone": [
            "Objdef"
        ], 
        "travuser": [
            "Ap", 
            "Code", 
            "Cond", 
            "Fundef", 
            "Let", 
            "Prf", 
            "Range"
        ]
    }, 
    "EMIPH": {
        "default": "sons", 
        "include": "inplacecomp.h", 
        "name": "Inplace Computation helper", 
        "travnone": [
            "Objdef"
        ], 
        "travuser": [
            "Ap", 
            "Assign", 
            "Id"
        ]
    }, 
    "EMLAO": {
        "default": "sons", 
        "include": "loopallocopt.h", 
        "name": "Loop allocation optimization", 
        "travuser": [
            "Ap", 
            "Assign", 
            "Fundef", 
            "Arg", 
            "Modarray", 
            "Prf", 
            "With", 
            "With2"
        ]
    }, 
    "EMLR": {
        "default": "none", 
        "include": "loopreuseopt.h", 
        "name": "Loop reuse", 
        "travsons": [
            "Module", 
            "Let", 
            "With", 
            "With2", 
            "Cond", 
            "Code", 
            "Block"
        ], 
        "travuser": [
            "Ap", 
            "Assign", 
            "Fundef"
        ]
    }, 
    "EMLRO": {
        "default": "none", 
        "include": "loopreuseopt.h", 
        "name": "Loop reuse optimization", 
        "travsons": [
            "Exprs", 
            "Module", 
            "Let", 
            "Assign", 
            "With", 
            "With2", 
            "Cond", 
            "Code", 
            "Block"
        ], 
        "travuser": [
            "Ap", 
            "Arg", 
            "Fundef", 
            "Id", 
            "Prf"
        ]
    }, 
    "EMRACC": {
        "default": "sons", 
        "include": "rm_alias_results_cc.h", 
        "name": "Remove Alias Results from Conformity Checks", 
        "travuser": [
            "Fundef", 
            "Arg", 
            "Block", 
            "Vardec", 
            "Assign", 
            "Let", 
            "Prf", 
            "Id"
        ]
    }, 
    "EMRB": {
        "default": "none", 
        "include": "reusebranching.h", 
        "name": "Reuse branching", 
        "travsons": [
            "Module", 
            "Let", 
            "Cond", 
            "Block", 
            "Fold"
        ], 
        "travuser": [
            "Assign", 
            "Code", 
            "Fundef", 
            "Genarray", 
            "Ids", 
            "Modarray", 
            "Prf", 
            "With", 
            "With2", 
            "With3", 
            "Range", 
            "Withid"
        ]
    }, 
    "EMRCO": {
        "default": "none", 
        "include": "rcopt.h", 
        "name": "Reference counting optimizations", 
        "travsons": [
            "Module", 
            "Cond", 
            "Withs", 
            "With", 
            "With2", 
            "With3", 
            "Range", 
            "Code"
        ], 
        "travuser": [
            "Assign", 
            "Block", 
            "Fold", 
            "Fundef", 
            "Genarray", 
            "Let", 
            "Modarray", 
            "Prf"
        ]
    }, 
    "EMRE": {
        "default": "none", 
        "include": "reuseelimination.h", 
        "name": "Reuse elimination", 
        "travsons": [
            "Module", 
            "Withs", 
            "With", 
            "With2", 
            "With3", 
            "Range", 
            "Fold", 
            "Code"
        ], 
        "travuser": [
            "Assign", 
            "Block", 
            "Cond", 
            "Fundef", 
            "Genarray", 
            "Let", 
            "Modarray", 
            "Prf", 
            "Vardec"
        ]
    }, 
    "EMRI": {
        "default": "sons", 
        "include": "reuse.h", 
        "name": "Reuse inference", 
        "travuser": [
            "Assign", 
            "Let", 
            "Prf", 
            "Genarray", 
            "Modarray"
        ]
    }, 
    "EMSR": {
        "default": "none", 
        "include": "staticreuse.h", 
        "name": "Static Reuse", 
        "travsons": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Let", 
            "Withs", 
            "With", 
            "With2", 
            "Code", 
            "Block", 
            "Cond"
        ], 
        "travuser": [
            "Prf"
        ]
    }, 
    "ESBL": {
        "default": "sons", 
        "include": "expand_shmem_boundary_load.h", 
        "name": "CUDA Expand shared memory boundary load", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Prf"
        ]
    }, 
    "ESD": {
        "default": "sons", 
        "include": "ElimSubDiv.h", 
        "name": "ElimSubDiv", 
        "travuser": [
            "Block", 
            "Assign", 
            "Let", 
            "Prf", 
            "Fundef", 
            "Module"
        ]
    }, 
    "ESP": {
        "default": "sons", 
        "include": "enforce_specialization.h", 
        "name": "Enforce Specialization", 
        "travuser": [
            "Module", 
            "Fundef"
        ]
    }, 
    "ESV": {
        "default": "sons", 
        "include": "elim_shapevars.h", 
        "name": "Eliminate Shape Variables", 
        "travnone": [
            "Withid"
        ], 
        "travuser": [
            "Fundef", 
            "Avis", 
            "Assign", 
            "Let", 
            "Id", 
            "Prf"
        ]
    }, 
    "ETC": {
        "default": "sons", 
        "include": "elimtypeconv.h", 
        "name": "TypeConv Elimination", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Prf"
        ]
    }, 
    "EWT": {
        "default": "sons", 
        "include": "extend_wrapper_types.h", 
        "name": "Extend Wrapper Types", 
        "travuser": [
            "Fundef"
        ]
    }, 
    "EXP": {
        "default": "sons", 
        "include": "export.h", 
        "name": "Export Symbols", 
        "travuser": [
            "Use", 
            "Import", 
            "Provide", 
            "Export", 
            "Symbol", 
            "Fundef", 
            "Typedef", 
            "Objdef", 
            "Module"
        ]
    }, 
    "F2L": {
        "default": "sons", 
        "include": "fun2lac.h", 
        "name": "Fun2Lac Traversal", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Cond", 
            "Arg"
        ]
    }, 
    "FDI": {
        "default": "sons", 
        "include": "free_dispatch_information.h", 
        "name": "Free Dispatch Information", 
        "travuser": [
            "Ap", 
            "Module", 
            "Fundef"
        ]
    }, 
    "FLAS": {
        "default": "sons", 
        "include": "free_lhs_avis_sons.h", 
        "name": "Free Lhs Avis Sons", 
        "travuser": [
            "Ids"
        ]
    }, 
    "FLAT": {
        "default": "sons", 
        "include": "flatten.h", 
        "name": "Flatten", 
        "travuser": [
            "Assign", 
            "Module", 
            "Fundef", 
            "Cast", 
            "Exprs", 
            "SPAp", 
            "Block", 
            "Cond", 
            "Do", 
            "Array", 
            "Return", 
            "Prf", 
            "With", 
            "Withid", 
            "Part", 
            "Generator", 
            "Genarray", 
            "Modarray", 
            "Propagate", 
            "SPFold", 
            "Code"
        ]
    }, 
    "FLATG": {
        "default": "sons", 
        "include": "flattengenerators.h", 
        "name": "Flattengenerators", 
        "travuser": [
            "Module", 
            "Fundef", 
            "With", 
            "Part", 
            "Generator", 
            "Assign", 
            "Cond", 
            "Do", 
            "While", 
            "Funcond", 
            "Prf", 
            "Let", 
            "Exprs"
        ]
    }, 
    "FPC": {
        "default": "sons", 
        "include": "functionprecompile.h", 
        "name": "Function Precompilation", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Let", 
            "Ret", 
            "Arg", 
            "Ap", 
            "Range"
        ]
    }, 
    "FPRC": {
        "default": "sons", 
        "include": "filter_partial_reuse_candidates.h", 
        "name": "Filter Partial Reuse Candidates", 
        "traverror": [
            "With2"
        ], 
        "travuser": [
            "Block", 
            "Avis", 
            "Assign", 
            "With", 
            "Genarray", 
            "Id", 
            "Prf"
        ]
    }, 
    "FRC": {
        "default": "sons", 
        "include": "filterrc.h", 
        "name": "Filter Reuse Candidates", 
        "travnone": [
            "Objdef"
        ], 
        "travuser": [
            "Ap", 
            "Arg", 
            "Assign", 
            "Break", 
            "Code", 
            "Cond", 
            "Fold", 
            "Funcond", 
            "Fundef", 
            "Genarray", 
            "Id", 
            "Modarray", 
            "Prf", 
            "Range", 
            "With", 
            "With2", 
            "With3"
        ]
    }, 
    "FREE": {
        "default": "user", 
        "include": "free_node.h", 
        "name": "Free Tree"
    }, 
    "FSFS": {
        "default": "sons", 
        "include": "spmdfun_fix.h", 
        "name": "SPMD Function Signature Fix", 
        "travuser": [
            "Ap", 
            "Fundef", 
            "Let", 
            "Return", 
            "With2"
        ]
    }, 
    "GCF": {
        "default": "sons", 
        "include": "generate_copy_and_free.h", 
        "name": "Generate Copy And Free", 
        "travuser": [
            "Typedef", 
            "Module"
        ]
    }, 
    "GDP": {
        "default": "sons", 
        "include": "gatherdependencies.h", 
        "name": "Gather Dependencies", 
        "travuser": [
            "Use", 
            "Import", 
            "Typedef", 
            "Objdef", 
            "Avis", 
            "Ret", 
            "SPId", 
            "SPFold", 
            "Cast", 
            "Module"
        ]
    }, 
    "GGS": {
        "default": "sons", 
        "include": "generate_guard_solvers.h", 
        "name": "Generate Guard Solvers", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Prf"
        ]
    }, 
    "GGTC": {
        "default": "sons", 
        "include": "generate_generic_type_conversions.h", 
        "name": "Generate Generic Type Conversions", 
        "travuser": [
            "Module", 
            "Typedef", 
            "Export", 
            "Provide", 
            "Symbol"
        ]
    }, 
    "GLF": {
        "default": "sons", 
        "include": "group_local_funs.h", 
        "name": "Group Local functions", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Ap"
        ]
    }, 
    "GNTC": {
        "default": "sons", 
        "include": "generate_nested_type_conversions.h", 
        "name": "Generate Nested Type Conversions", 
        "travuser": [
            "Module", 
            "Typedef"
        ]
    }, 
    "GOI": {
        "default": "sons", 
        "include": "generate_object_initialiser.h", 
        "name": "Generating Object Initialiser", 
        "travuser": [
            "Fundef", 
            "Module"
        ]
    }, 
    "HCE": {
        "default": "sons", 
        "include": "handle_condexpr.h", 
        "name": "Handle conditional expressions", 
        "travuser": [
            "Assign", 
            "Code", 
            "Cond", 
            "Do", 
            "Funcond", 
            "With"
        ]
    }, 
    "HD": {
        "default": "sons", 
        "include": "handle_dots.h", 
        "name": "Handle Dots", 
        "travuser": [
            "SPId", 
            "With", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Part", 
            "Generator", 
            "Dot", 
            "SPAp", 
            "Prf", 
            "Assign", 
            "SetWL"
        ]
    }, 
    "HM": {
        "default": "sons", 
        "include": "handle_mops.h", 
        "name": "Handle Mops", 
        "travuser": [
            "SPMop"
        ]
    }, 
    "HS": {
        "default": "sons", 
        "include": "hidestructs.h", 
        "name": "Hide Structs", 
        "travuser": [
            "Module", 
            "Structdef", 
            "Structelem"
        ]
    }, 
    "HWLG": {
        "default": "sons", 
        "include": "handle_with_loop_generators.h", 
        "name": "Handle multi-generator with-loops", 
        "travuser": [
            "Let", 
            "Assign", 
            "With", 
            "Genarray", 
            "Modarray", 
            "SPFold", 
            "Propagate"
        ]
    }, 
    "HWLO": {
        "default": "sons", 
        "include": "handle_with_loop_operators.h", 
        "name": "Handle multi-operator with-loops", 
        "travuser": [
            "Assign", 
            "Let", 
            "With", 
            "Genarray", 
            "Modarray", 
            "SPFold", 
            "Propagate"
        ]
    }, 
    "HZGWL": {
        "default": "sons", 
        "include": "handle_zero_generator_with_loops.h", 
        "name": "Handle zero-generator withloops", 
        "travuser": [
            "With", 
            "Modarray", 
            "Genarray", 
            "SPFold", 
            "Propagate", 
            "Let", 
            "Assign", 
            "Return"
        ]
    }, 
    "IAL": {
        "default": "sons", 
        "include": "introduce_availability_loop.h", 
        "name": "Introduce Availability Loops", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Prf", 
            "With", 
            "Part", 
            "Generator", 
            "Exprs", 
            "Genarray", 
            "Modarray"
        ]
    }, 
    "ICC": {
        "default": "sons", 
        "include": "insert_conformity_checks.h", 
        "name": "Insert Conformity Checks", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Prf", 
            "Let", 
            "With", 
            "Generator", 
            "Code", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Propagate", 
            "Block"
        ]
    }, 
    "ICSMEM": {
        "default": "sons", 
        "include": "insert_cudast_memtran.h", 
        "name": "Insert CUDA memory transfer primitives for cudasts", 
        "travnone": [
            "Return"
        ], 
        "travuser": [
            "Assign", 
            "Id", 
            "Ids", 
            "Fundef", 
            "Ap", 
            "Cudast", 
            "Let", 
            "Funcond"
        ]
    }, 
    "IDC": {
        "default": "sons", 
        "include": "insert_domain_constraints.h", 
        "name": "Insert Domain Constraints", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Assign", 
            "Let", 
            "Ids", 
            "Cond", 
            "With", 
            "Part", 
            "Code", 
            "Id", 
            "Avis"
        ]
    }, 
    "IIPI": {
        "default": "sons", 
        "include": "iteration_invariant_parameter_inference.h", 
        "name": "Iteration Invariant Parameter Inference", 
        "travuser": [
            "Fundef", 
            "Arg", 
            "Ap"
        ]
    }, 
    "IMA": {
        "default": "sons", 
        "include": "infer_memory_accesses.h", 
        "name": "Infer memory accesses", 
        "travuser": [
            "Fundef", 
            "Let", 
            "With", 
            "With2", 
            "Genarray", 
            "Modarray", 
            "Prf"
        ]
    }, 
    "IMEMDIST": {
        "default": "sons", 
        "include": "insert_memtrans_dist.h", 
        "name": "Insert memory transfer primitives for distributed variables", 
        "travuser": [
            "Let", 
            "Ap", 
            "Block", 
            "Assign", 
            "With", 
            "With2", 
            "Id", 
            "Ids", 
            "Fundef", 
            "Prf", 
            "Return"
        ]
    }, 
    "IMP": {
        "default": "sons", 
        "include": "importsymbols.h", 
        "name": "Import Symbols", 
        "travuser": [
            "Module", 
            "Import", 
            "Export", 
            "Use", 
            "Provide", 
            "Symbol"
        ]
    }, 
    "INB": {
        "default": "sons", 
        "include": "identify_noop_branch.h", 
        "name": "Identify noop conditional branch", 
        "travuser": [
            "Code", 
            "Part", 
            "Assign", 
            "Funcond", 
            "Ap", 
            "Cond", 
            "Fundef"
        ]
    }, 
    "INFDFMS": {
        "default": "sons", 
        "include": "infer_dfms.h", 
        "name": "Infer DataFlowMask Traversal", 
        "traverror": [
            "Icm"
        ], 
        "travuser": [
            "Assign", 
            "Do", 
            "Fundef", 
            "Let", 
            "Arg", 
            "Code", 
            "Range", 
            "Ap", 
            "Id", 
            "Ids", 
            "With", 
            "With2", 
            "With3", 
            "Cond", 
            "Block"
        ]
    }, 
    "INFNC": {
        "default": "sons", 
        "include": "inferneedcounters.h", 
        "name": "NeedCounter Inference", 
        "travuser": [
            "Block", 
            "Fundef", 
            "Prf", 
            "Avis", 
            "Id"
        ]
    }, 
    "INL": {
        "default": "sons", 
        "include": "inlining.h", 
        "name": "Inline Traversal", 
        "travuser": [
            "Module", 
            "Assign", 
            "Fundef", 
            "Let", 
            "Ap"
        ]
    }, 
    "INSTC": {
        "default": "sons", 
        "include": "insert_type_conv.h", 
        "name": "Insert Type Conversions", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Avis", 
            "Assign", 
            "Ids", 
            "Id", 
            "With", 
            "Return"
        ]
    }, 
    "INSVD": {
        "default": "sons", 
        "include": "insert_vardec.h", 
        "name": "Insert Vardecs", 
        "travuser": [
            "Module", 
            "Fundef", 
            "SPAp", 
            "SPFold", 
            "SPId", 
            "SPIds", 
            "With", 
            "Let", 
            "Part", 
            "Code", 
            "Do"
        ]
    }, 
    "IRA": {
        "default": "sons", 
        "include": "infer_reusable_arrays.h", 
        "name": "CUDA Infer reusable arrays in withloops", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "With", 
            "Part", 
            "Code", 
            "Prf"
        ]
    }, 
    "ISAA": {
        "default": "sons", 
        "include": "insert_symb_arrayattr.h", 
        "name": "Insert Symbolic Array Attributes", 
        "travnone": [
            "Withid"
        ], 
        "travuser": [
            "Fundef", 
            "Avis", 
            "Block", 
            "Assign", 
            "Let", 
            "Ids", 
            "Id", 
            "With", 
            "Part", 
            "Code", 
            "Cond", 
            "Funcond", 
            "Ap"
        ]
    }, 
    "IUCFB": {
        "default": "sons", 
        "include": "insert_udc_funbody.h", 
        "name": "Insert user-defined constraint to function body", 
        "travuser": [
            "Fundef", 
            "Udcs"
        ]
    }, 
    "IUTC": {
        "default": "sons", 
        "include": "introduce_user_tracing_calls.h", 
        "name": "Introduce User Trace Calls", 
        "travnone": [
            "Withid"
        ], 
        "travuser": [
            "Fundef", 
            "Arg", 
            "SPIds", 
            "Assign", 
            "Return", 
            "Block"
        ]
    }, 
    "IVERAS": {
        "default": "sons", 
        "include": "ive_reusewl_and_scalarize.h", 
        "name": "Index Vector Elimination (Reuse WL-offsets and Scalarize)", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "Prf", 
            "With", 
            "Part", 
            "Code"
        ]
    }, 
    "IVESLI": {
        "default": "sons", 
        "include": "ive_split_loop_invariants.h", 
        "name": "Index Vector Elimination (Split Loop Invariants)", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Prf", 
            "With", 
            "With2"
        ]
    }, 
    "IVESPLIT": {
        "default": "sons", 
        "include": "ive_split_selections.h", 
        "name": "Index Vector Elimination (Split Selections)", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Prf"
        ]
    }, 
    "IVEXC": {
        "default": "sons", 
        "include": "ivexcleanup.h", 
        "name": "Index Vector Extrema Cleanup", 
        "travuser": [
            "Part", 
            "Code", 
            "Let", 
            "Avis", 
            "Prf", 
            "Id", 
            "Ids"
        ]
    }, 
    "IVEXI": {
        "default": "sons", 
        "include": "ivextrema.h", 
        "name": "Index Variable Extrema Insertion", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Funcond", 
            "Cond", 
            "While", 
            "Assign", 
            "Let", 
            "Prf", 
            "With", 
            "Part", 
            "Ap"
        ]
    }, 
    "IVEXP": {
        "default": "sons", 
        "include": "ivexpropagation.h", 
        "name": "Index Variable Extrema Propagation", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "With", 
            "Part", 
            "Cond", 
            "Funcond", 
            "While"
        ]
    }, 
    "IWLMEM": {
        "default": "sons", 
        "include": "insert_withloop_memtran.h", 
        "name": "Insert CUDA memory transfer primitives for withloops", 
        "travuser": [
            "Let", 
            "Assign", 
            "With", 
            "Id", 
            "Ids", 
            "Fundef", 
            "Ap", 
            "Genarray", 
            "Modarray", 
            "Code", 
            "Funcond"
        ]
    }, 
    "KPP": {
        "default": "sons", 
        "include": "kernel_post_processing.h", 
        "name": "Kernel post processing", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Id", 
            "Let", 
            "Prf", 
            "With3", 
            "Range", 
            "Genarray"
        ]
    }, 
    "L2F": {
        "default": "sons", 
        "include": "lac2fun.h", 
        "name": "Lac2Fun Traversal", 
        "travuser": [
            "Assign", 
            "Do", 
            "Fundef", 
            "Cond"
        ]
    }, 
    "LACSI": {
        "default": "sons", 
        "include": "loop_and_cond_scalarization_in.h", 
        "name": "Lacfun Argument Scalarization", 
        "travnone": [
            "Withid"
        ], 
        "travuser": [
            "Module", 
            "Fundef", 
            "Exprs", 
            "Assign", 
            "Ap", 
            "Id"
        ]
    }, 
    "LACSO": {
        "default": "sons", 
        "include": "loop_and_cond_scalarization_out.h", 
        "name": "Lacfun Result Scalarization", 
        "travnone": [
            "Withid"
        ], 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Let", 
            "Ap", 
            "Id", 
            "Return", 
            "Cond", 
            "Funcond"
        ]
    }, 
    "LINL": {
        "default": "sons", 
        "include": "lacinlining.h", 
        "name": "LAC Inline Traversal", 
        "travuser": [
            "Module", 
            "Assign", 
            "Fundef", 
            "Let", 
            "Ap"
        ]
    }, 
    "LOF": {
        "default": "sons", 
        "include": "liftoptflags.h", 
        "name": "Lift OptFlags", 
        "travuser": [
            "Fundef"
        ]
    }, 
    "LS": {
        "default": "sons", 
        "include": "loop_scalarization.h", 
        "name": "Loop Scalarization", 
        "travnone": [
            "Withid"
        ], 
        "travuser": [
            "Module", 
            "Fundef", 
            "Arg", 
            "Assign", 
            "Ap", 
            "Prf", 
            "Id"
        ]
    }, 
    "LUR": {
        "default": "sons", 
        "include": "SSALUR.h", 
        "name": "Loop Unrolling Traversal", 
        "travuser": [
            "Ap", 
            "Assign", 
            "Fundef"
        ]
    }, 
    "LVA": {
        "default": "sons", 
        "include": "live_variable_analysis.h", 
        "name": "Live Variable Analysis", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "Ids", 
            "Id"
        ]
    }, 
    "LW3": {
        "default": "sons", 
        "include": "lift_with3_bodies.h", 
        "name": "Lift with3s into functions", 
        "travuser": [
            "Module", 
            "Range", 
            "With3", 
            "Fundef"
        ]
    }, 
    "MA": {
        "default": "sons", 
        "include": "move_assigns.h", 
        "name": "MUTC move assigns", 
        "travuser": [
            "Let", 
            "Assign"
        ]
    }, 
    "MAT": {
        "default": "sons", 
        "include": "map_avis_trav.h", 
        "name": "Map Traversal on Avis nodes", 
        "travuser": [
            "Fundef", 
            "Avis", 
            "Block"
        ]
    }, 
    "MBTRAN2": {
        "default": "sons", 
        "include": "minimize_block_transfers2.h", 
        "name": "Minimise the number of device-host data transfers in code blocks", 
        "travuser": [
            "Block", 
            "Assign", 
            "Prf"
        ]
    }, 
    "MC": {
        "default": "sons", 
        "include": "move_const.h", 
        "name": "Move Const", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let"
        ]
    }, 
    "MCG": {
        "default": "sons", 
        "include": "map_call_graph.h", 
        "name": "Map Call Graph", 
        "travuser": [
            "Fundef", 
            "Ap"
        ]
    }, 
    "MCSTRAN": {
        "default": "sons", 
        "include": "minimize_cudast_transfers.h", 
        "name": "Minimise the number of device-host data transfers in a Cudast", 
        "travuser": [
            "Assign", 
            "Let", 
            "Prf", 
            "Cudast"
        ]
    }, 
    "MCTRAN": {
        "default": "sons", 
        "include": "minimize_cond_transfers.h", 
        "name": "Minimise the number of device-host data transfers in a cond-fun", 
        "travuser": [
            "Assign", 
            "Let", 
            "Fundef", 
            "Prf", 
            "Ap", 
            "Id", 
            "Arg", 
            "Funcond", 
            "Return", 
            "Cudast"
        ]
    }, 
    "MDE": {
        "default": "error", 
        "include": "makedimexpr.h", 
        "name": "Make Dim Expression", 
        "travuser": [
            "Id", 
            "Funcond", 
            "Ap", 
            "Array", 
            "Prf", 
            "With", 
            "Bool", 
            "Char", 
            "Num", 
            "NumByte", 
            "NumShort", 
            "NumInt", 
            "NumLong", 
            "NumLonglong", 
            "NumUbyte", 
            "NumUshort", 
            "NumUint", 
            "NumUlong", 
            "NumUlonglong", 
            "Float", 
            "Floatvec", 
            "Double"
        ]
    }, 
    "MFT": {
        "default": "sons", 
        "include": "map_fun_trav.h", 
        "name": "Map Traversal on Fundefs", 
        "travuser": [
            "Fundef"
        ]
    }, 
    "MLTRAN": {
        "default": "sons", 
        "include": "minimize_loop_transfers.h", 
        "name": "Minimise the number of device-host data transfers in a loop", 
        "travuser": [
            "Assign", 
            "Let", 
            "Fundef", 
            "Prf", 
            "Ap", 
            "Id", 
            "Arg", 
            "Funcond", 
            "Return"
        ]
    }, 
    "MMV": {
        "default": "sons", 
        "include": "markmemvals.h", 
        "name": "MarkMemVals", 
        "travuser": [
            "Block", 
            "Break", 
            "Code", 
            "Do", 
            "Fold", 
            "Fundef", 
            "Module", 
            "Genarray", 
            "Propagate", 
            "Id", 
            "Ids", 
            "Ap", 
            "Let", 
            "Modarray", 
            "Prf", 
            "With", 
            "With2", 
            "With3", 
            "WLseg", 
            "Return", 
            "Ret"
        ]
    }, 
    "MNG": {
        "default": "sons", 
        "include": "mark_noop_grids.h", 
        "name": "Mark NoOp Grids", 
        "travuser": [
            "WLgrid", 
            "WLstride", 
            "WLblock", 
            "WLublock", 
            "Code", 
            "Let"
        ]
    }, 
    "MOI": {
        "default": "sons", 
        "include": "manage_object_initialisers.h", 
        "name": "Manage object initialisers", 
        "travuser": [
            "Assign", 
            "Id", 
            "Fundef"
        ]
    }, 
    "MS": {
        "default": "sons", 
        "include": "move_syncs.h", 
        "name": "MUTC move syncs"
    }, 
    "MSA": {
        "default": "sons", 
        "include": "marksuballoc.h", 
        "name": "MarkSubAlloc", 
        "travuser": [
            "Prf", 
            "Let", 
            "Ids"
        ]
    }, 
    "MSC": {
        "default": "sons", 
        "include": "make_slow_clones.h", 
        "name": "Make Slow Clones", 
        "travuser": [
            "Fundef"
        ]
    }, 
    "MSE": {
        "default": "error", 
        "include": "makeshapeexpr.h", 
        "name": "Make Shape Expression", 
        "travuser": [
            "Id", 
            "Funcond", 
            "Ap", 
            "Array", 
            "Prf", 
            "With", 
            "Bool", 
            "Char", 
            "Num", 
            "NumByte", 
            "NumShort", 
            "NumInt", 
            "NumLong", 
            "NumLonglong", 
            "NumUbyte", 
            "NumUshort", 
            "NumUint", 
            "NumUlong", 
            "NumUlonglong", 
            "Float", 
            "Floatvec", 
            "Double"
        ]
    }, 
    "MSS": {
        "default": "sons", 
        "include": "move_sync_statement.h", 
        "name": "Moving Sync Statements"
    }, 
    "MTAS": {
        "default": "sons", 
        "include": "annotate_scheduling.h", 
        "name": "Annotate scheduling", 
        "travuser": [
            "Module", 
            "Fundef", 
            "With2", 
            "Withs", 
            "WLseg"
        ]
    }, 
    "MTCM": {
        "default": "sons", 
        "include": "cost_model.h", 
        "name": "Multithreading cost model", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Block", 
            "Assign", 
            "Let", 
            "With2", 
            "With", 
            "Withs", 
            "Fold", 
            "Genarray", 
            "Modarray"
        ]
    }, 
    "MTDCR": {
        "default": "sons", 
        "include": "mtdcr.h", 
        "name": "MT dead code removal", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Block", 
            "Assign", 
            "Let", 
            "Ids", 
            "Id", 
            "Prf"
        ]
    }, 
    "MTRAN": {
        "default": "sons", 
        "include": "minimize_transfers.h", 
        "name": "Minimise the number of device-host data transfers"
    }, 
    "MTRMI": {
        "default": "sons", 
        "include": "restore_mem_instr.h", 
        "name": "Restore memory instructions", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Block", 
            "Assign", 
            "Withs", 
            "With", 
            "With2", 
            "Id", 
            "Withid"
        ]
    }, 
    "MTSPMDF": {
        "default": "sons", 
        "include": "create_spmd_funs.h", 
        "name": "Create SPMD functions", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Do", 
            "Withs", 
            "With2", 
            "With", 
            "Let", 
            "Id", 
            "Ids", 
            "Withid"
        ]
    }, 
    "MTSTF": {
        "default": "sons", 
        "include": "create_mtst_funs.h", 
        "name": "Create MT/ST functions (programs)", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Cond", 
            "With2", 
            "Ap", 
            "Fold"
        ]
    }, 
    "MTSTFMOD": {
        "default": "sons", 
        "include": "create_mtst_funs_module.h", 
        "name": "Create MT/ST functions (modules)", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Cond", 
            "With2", 
            "Ap", 
            "Fold"
        ]
    }, 
    "MVSMI": {
        "default": "sons", 
        "include": "movesharedmeminstr.h", 
        "name": "Move shared memory management instructions", 
        "travuser": [
            "Assign", 
            "Fundef", 
            "Ap"
        ]
    }, 
    "NTC": {
        "default": "sons", 
        "include": "new_typecheck.h", 
        "name": "New Type Inference", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Block", 
            "Vardec", 
            "Assign", 
            "Cond", 
            "Funcond", 
            "Let", 
            "Return", 
            "Ap", 
            "Prf", 
            "Array", 
            "Cast", 
            "Exprs", 
            "Id", 
            "Globobj", 
            "Type", 
            "Num", 
            "NumByte", 
            "NumShort", 
            "NumInt", 
            "NumLong", 
            "NumLonglong", 
            "NumUbyte", 
            "NumUshort", 
            "NumUint", 
            "NumUlong", 
            "NumUlonglong", 
            "Bool", 
            "Nested_init", 
            "Char", 
            "Double", 
            "Float", 
            "Floatvec", 
            "With", 
            "Generator", 
            "Part", 
            "Withid", 
            "Code", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Break", 
            "Propagate", 
            "Str"
        ]
    }, 
    "OAN": {
        "default": "sons", 
        "include": "object_analysis.h", 
        "name": "Object Analysis", 
        "travuser": [
            "Module", 
            "Globobj", 
            "Fundef", 
            "Ap", 
            "Objdef"
        ]
    }, 
    "OFP": {
        "default": "sons", 
        "include": "omp_find_private.h", 
        "name": "OpenMP Find Private", 
        "travuser": [
            "Module", 
            "With", 
            "With2", 
            "Fundef", 
            "Let", 
            "Ids", 
            "Id", 
            "Withid"
        ]
    }, 
    "OI": {
        "default": "sons", 
        "include": "object_init.h", 
        "name": "Object Initializer", 
        "travuser": [
            "Module", 
            "Objdef"
        ]
    }, 
    "PDS": {
        "default": "sons", 
        "include": "prepare_dist_scheduler.h", 
        "name": "Prepare distributed with-loop schedulers", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Cond"
        ]
    }, 
    "PEM": {
        "default": "sons", 
        "include": "propagate_executionmode.h", 
        "name": "Propagate Executionmode", 
        "travuser": [
            "Ap", 
            "Assign", 
            "Cond", 
            "Fundef", 
            "With2"
        ]
    }, 
    "PETL": {
        "default": "sons", 
        "include": "propagate_extrema_thru_lacfuns.h", 
        "name": "Propagate Extrema Thru Lacfuns", 
        "travuser": [
            "Fundef", 
            "Ap", 
            "Block", 
            "Cond"
        ]
    }, 
    "PEW3": {
        "default": "sons", 
        "include": "prune_empty_with3.h", 
        "name": "Prune Empty With3", 
        "travuser": [
            "With3", 
            "Range", 
            "Id", 
            "Assign", 
            "Let"
        ]
    }, 
    "PF": {
        "default": "sons", 
        "include": "annotate_fun_calls.h", 
        "name": "Annotate Function Calls ", 
        "travuser": [
            "Ap", 
            "Assign", 
            "Fundef"
        ]
    }, 
    "PFD": {
        "default": "sons", 
        "include": "partial_fold.h", 
        "name": "CUDA Partial folding", 
        "travuser": [
            "With", 
            "Withid", 
            "Part", 
            "Generator", 
            "Fold", 
            "Let", 
            "Fundef", 
            "Assign", 
            "Code", 
            "Prf", 
            "Module"
        ]
    }, 
    "PFG": {
        "default": "sons", 
        "include": "prepare_forloop_generation.h", 
        "name": "Prepare for loop generation", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "Do", 
            "Id", 
            "Prf"
        ]
    }, 
    "PINL": {
        "default": "sons", 
        "include": "prepare_inlining.h", 
        "name": "Prepare inlining", 
        "travuser": [
            "Fundef", 
            "Vardec", 
            "Avis", 
            "Block", 
            "Assign", 
            "Arg", 
            "Id", 
            "Ids"
        ]
    }, 
    "PKNLG": {
        "default": "sons", 
        "include": "prepare_kernel_generation.h", 
        "name": "Prepare cuda kernel generation", 
        "travuser": [
            "Fundef", 
            "With", 
            "With2", 
            "Genarray", 
            "Assign", 
            "Let", 
            "Prf", 
            "Cond"
        ]
    }, 
    "PMBL": {
        "default": "sons", 
        "include": "pattern_match_build_lut.h", 
        "name": "Pattern Matching Build Lut", 
        "travuser": [
            "Fundef", 
            "Ap", 
            "Arg"
        ]
    }, 
    "POGO": {
        "default": "sons", 
        "include": "polyhedral_guard_optimization.h", 
        "name": "Polyhedral Guard Optimization", 
        "travuser": [
            "Fundef", 
            "Part", 
            "With", 
            "Assign", 
            "Let", 
            "Prf"
        ]
    }, 
    "PPI": {
        "default": "sons", 
        "include": "prepareinline.h", 
        "name": "Prepare Inline", 
        "travuser": [
            "Fundef", 
            "Module", 
            "Ap", 
            "Fold"
        ]
    }, 
    "PRA": {
        "default": "sons", 
        "include": "polyhedral_reuse_analysis.h", 
        "name": "Reuse With-loop arrays based on polyhedral model", 
        "travuser": [
            "Prf", 
            "Part", 
            "Assign", 
            "With", 
            "Ap", 
            "Cond", 
            "Fundef"
        ]
    }, 
    "PRT": {
        "default": "user", 
        "include": "print.h", 
        "name": "Print Syntax Tree", 
        "travsons": [
            "SSAstack", 
            "Nums", 
            "Idag", 
            "IdagVFam", 
            "IdagEFam", 
            "IdagEFams", 
            "IdagVertices"
        ]
    }, 
    "PWLF": {
        "default": "sons", 
        "include": "polyhedral_wlf.h", 
        "name": "Polyhedral With-Loop-Folding", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Assign", 
            "Let", 
            "Id", 
            "Cond", 
            "With", 
            "Modarray", 
            "Part", 
            "Prf"
        ]
    }, 
    "RC": {
        "default": "sons", 
        "include": "rmcasts.h", 
        "name": "Remove Cast", 
        "travuser": [
            "Let", 
            "Cast", 
            "Avis", 
            "Array", 
            "Ret", 
            "Objdef", 
            "Type"
        ]
    }, 
    "RCI": {
        "default": "sons", 
        "include": "referencecounting.h", 
        "name": "Reference Counting Inference", 
        "travnone": [
            "Objdef", 
            "Arg", 
            "Vardec"
        ], 
        "travuser": [
            "Ap", 
            "Array", 
            "Assign", 
            "Code", 
            "Cond", 
            "Fold", 
            "Funcond", 
            "Fundef", 
            "Genarray", 
            "Id", 
            "Ids", 
            "Let", 
            "Modarray", 
            "Prf", 
            "Propagate", 
            "Range", 
            "Return", 
            "Withs", 
            "With", 
            "With2", 
            "With3", 
            "Withid"
        ]
    }, 
    "RCM": {
        "default": "sons", 
        "include": "rcminimize.h", 
        "name": "Reference counting minimization", 
        "travnone": [
            "Objdef", 
            "Withid"
        ], 
        "travuser": [
            "Ap", 
            "Arg", 
            "Assign", 
            "Code", 
            "Cond", 
            "Funcond", 
            "Fundef", 
            "Id", 
            "Ids", 
            "Let", 
            "Prf", 
            "Range", 
            "Return"
        ]
    }, 
    "RCS": {
        "default": "sons", 
        "include": "resolve_code_sharing.h", 
        "name": "Resolve Code Sharing", 
        "travuser": [
            "With", 
            "With2", 
            "Code", 
            "Part", 
            "WLgrid"
        ]
    }, 
    "RDEPEND": {
        "default": "sons", 
        "include": "resolvedependencies.h", 
        "name": "Resolve Dependencies", 
        "travuser": [
            "Assign", 
            "Prf"
        ]
    }, 
    "RDFMS": {
        "default": "sons", 
        "include": "remove_dfms.h", 
        "name": "Remove DataFlowMask Traversal", 
        "travuser": [
            "Do", 
            "Fundef", 
            "With", 
            "With2", 
            "With3", 
            "Cond", 
            "Block"
        ]
    }, 
    "REA": {
        "default": "sons", 
        "include": "reorder_equalityprf_arguments.h", 
        "name": "Reorder EqualityOperator arguments", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Block", 
            "Assign", 
            "Let", 
            "Prf"
        ]
    }, 
    "REC": {
        "default": "sons", 
        "include": "remove_external_code.h", 
        "name": "Remove External Code", 
        "travuser": [
            "Fundef"
        ]
    }, 
    "REN": {
        "default": "sons", 
        "include": "rename.h", 
        "name": "Rename identifiers", 
        "travuser": [
            "Arg", 
            "Vardec", 
            "Id", 
            "Ids"
        ]
    }, 
    "REPFUN": {
        "default": "sons", 
        "include": "replicate_functions.h", 
        "name": "Replicate Functions", 
        "travuser": [
            "Ap", 
            "Assign", 
            "EX", 
            "Fundef", 
            "Module", 
            "MT", 
            "ST"
        ]
    }, 
    "RERA": {
        "default": "sons", 
        "include": "restore_reference_args.h", 
        "name": "Restore Reference Args", 
        "travuser": [
            "Ap", 
            "Assign", 
            "Let", 
            "Return", 
            "Fundef", 
            "Prf", 
            "Id", 
            "Ids", 
            "Module", 
            "With", 
            "With2", 
            "Block"
        ]
    }, 
    "RESO": {
        "default": "sons", 
        "include": "restore_objects.h", 
        "name": "Restore Global Objects", 
        "travuser": [
            "Ap", 
            "Prf", 
            "Id", 
            "Assign", 
            "Let", 
            "Block", 
            "Fundef", 
            "Module", 
            "Propagate"
        ]
    }, 
    "REUSE": {
        "default": "sons", 
        "include": "ReuseWithArrays.h", 
        "name": "Reuse With Arrays", 
        "travuser": [
            "Let", 
            "Prf", 
            "Id", 
            "Ids", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "With", 
            "Part"
        ]
    }, 
    "RID": {
        "default": "sons", 
        "include": "renameidentifiers.h", 
        "name": "Rename Identifiers", 
        "travuser": [
            "Module", 
            "Typedef", 
            "Objdef", 
            "Fundef", 
            "Arg", 
            "Return", 
            "Ap", 
            "Icm", 
            "WLseg", 
            "Avis"
        ]
    }, 
    "RLAC": {
        "default": "sons", 
        "include": "remove_unused_lac.h", 
        "name": "CUDA Remove unused lac functions", 
        "travuser": [
            "Fundef", 
            "Module", 
            "Ap"
        ]
    }, 
    "RMPR": {
        "default": "sons", 
        "include": "remove_propagates.h", 
        "name": "Remove propagates", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "With2", 
            "Prf"
        ]
    }, 
    "RMTSTF": {
        "default": "sons", 
        "include": "restore_mtst_funs.h", 
        "name": "Restore ST/MT/XT functions (modules)", 
        "travuser": [
            "Module", 
            "Fundef"
        ]
    }, 
    "RMV": {
        "default": "sons", 
        "include": "remove_vardecs.h", 
        "name": "Remove Vardecs", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Vardec", 
            "Ids"
        ]
    }, 
    "RNB": {
        "default": "sons", 
        "include": "remove_noop_branch.h", 
        "name": "Remove noop conditional branch", 
        "travuser": [
            "Code", 
            "Let", 
            "Assign", 
            "With", 
            "With2", 
            "Cond"
        ]
    }, 
    "RRA": {
        "default": "sons", 
        "include": "resolve_reference_args.h", 
        "name": "Resolve Reference Args", 
        "travuser": [
            "Fundef", 
            "Return", 
            "Let", 
            "Ap", 
            "Module"
        ]
    }, 
    "RSA": {
        "default": "sons", 
        "include": "resolveall.h", 
        "name": "Resolve All Flags", 
        "travuser": [
            "Use", 
            "Import", 
            "Provide", 
            "Export", 
            "Module"
        ]
    }, 
    "RSO": {
        "default": "sons", 
        "include": "resolve_objects.h", 
        "name": "Resolve Objects", 
        "travuser": [
            "Ap", 
            "Fundef", 
            "Globobj", 
            "Let", 
            "Module", 
            "Propagate", 
            "With"
        ]
    }, 
    "RSP": {
        "default": "sons", 
        "include": "resolvepragma.h", 
        "name": "Resolve pragmas", 
        "travuser": [
            "Typedef", 
            "Objdef", 
            "Fundef", 
            "Module", 
            "Ret", 
            "Arg"
        ]
    }, 
    "RST": {
        "default": "sons", 
        "include": "resolvesymboltypes.h", 
        "name": "Resolve Symbol Types", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Arg", 
            "Ret", 
            "Avis", 
            "Array", 
            "Typedef", 
            "Objdef", 
            "Type", 
            "Cast"
        ]
    }, 
    "RTFILTER": {
        "default": "sons", 
        "include": "runtime_filtering.h", 
        "name": "Filtering of unneeded functions for runtime optimization", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Arg"
        ]
    }, 
    "RTSPEC": {
        "default": "sons", 
        "include": "runtime_specialization.h", 
        "name": "Runtime Specialization", 
        "travuser": [
            "Module", 
            "Fundef"
        ]
    }, 
    "RW3": {
        "default": "sons", 
        "include": "remove_with3.h", 
        "name": "Remove With3s", 
        "travuser": [
            "Assign", 
            "With3", 
            "Range"
        ]
    }, 
    "RWO": {
        "default": "sons", 
        "include": "reusewithoffset.h", 
        "name": "Reuse With-loop arrays with offsets", 
        "travuser": [
            "Prf", 
            "Id", 
            "Ids"
        ]
    }, 
    "SAFA": {
        "default": "sons", 
        "include": "sortassociativefunctionarguments.h", 
        "name": "SortAssociativeFunctionArguments", 
        "travuser": [
            "Block", 
            "Assign", 
            "Let", 
            "Prf", 
            "Fundef", 
            "Module"
        ]
    }, 
    "SBT": {
        "default": "user", 
        "include": "serialize_buildstack.h", 
        "name": "Serialize Build Stack"
    }, 
    "SCC": {
        "default": "sons", 
        "include": "strip_conformity_checks.h", 
        "name": "Strip Conformity Checks", 
        "travuser": [
            "Block", 
            "Assign", 
            "Prf", 
            "Let", 
            "Id", 
            "Vardec"
        ]
    }, 
    "SCUF": {
        "default": "sons", 
        "include": "split_cuda_fold.h", 
        "name": "CUDA Split CUDA fold withloops", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "With", 
            "Part", 
            "Generator", 
            "Fold", 
            "Code", 
            "Prf", 
            "Withid"
        ]
    }, 
    "SCUWL": {
        "default": "sons", 
        "include": "split_cuda_withloop.h", 
        "name": "Split Cudarizable withloop", 
        "travuser": [
            "Fundef", 
            "Let", 
            "Assign", 
            "With", 
            "Modarray", 
            "Genarray"
        ]
    }, 
    "SEL": {
        "default": "user", 
        "include": "serialize_link.h", 
        "name": "Serialize Link Traversal"
    }, 
    "SER": {
        "default": "sons", 
        "include": "serialize.h", 
        "name": "Serialize Module", 
        "travuser": [
            "Fundef", 
            "Typedef", 
            "Objdef"
        ]
    }, 
    "SET": {
        "default": "user", 
        "include": "serialize_node.h", 
        "name": "Serialize Node Traversal"
    }, 
    "SFWO": {
        "default": "sons", 
        "include": "setfundefwasoptimized.h", 
        "name": "Set Fundef Was Optimized", 
        "travuser": [
            "Module", 
            "Fundef"
        ]
    }, 
    "SHMEM": {
        "default": "sons", 
        "include": "shared_memory_reuse.h", 
        "name": "CUDA Exploiting data reuse with shared memory", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "With", 
            "Part", 
            "Code", 
            "Prf"
        ]
    }, 
    "SISI": {
        "default": "sons", 
        "include": "signature_simplification.h", 
        "name": "Signature Simplification", 
        "travuser": [
            "Assign", 
            "Fundef", 
            "Block", 
            "Let", 
            "Return", 
            "Ret", 
            "Ap", 
            "Ids", 
            "Id", 
            "Exprs", 
            "Arg", 
            "Module"
        ]
    }, 
    "SLS": {
        "default": "sons", 
        "include": "setlinksign.h", 
        "name": "Set Linksign", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Arg", 
            "Ret"
        ]
    }, 
    "SOSSK": {
        "default": "sons", 
        "include": "specialization_oracle_static_shape_knowledge.h", 
        "name": "Specialization Oracle for Static Shape Knowledge", 
        "travuser": [
            "Ap", 
            "Arg", 
            "Assign", 
            "Cond", 
            "Exprs", 
            "Fold", 
            "Genarray", 
            "Modarray", 
            "Generator", 
            "Id", 
            "Ids", 
            "Ret", 
            "Return", 
            "Prf", 
            "Fundef", 
            "Let", 
            "Code", 
            "Part", 
            "Withid", 
            "With"
        ]
    }, 
    "SPTN": {
        "default": "sons", 
        "include": "split_partitions.h", 
        "name": "Split partitions", 
        "travuser": [
            "With", 
            "Part", 
            "Generator"
        ]
    }, 
    "SRCE": {
        "default": "sons", 
        "include": "scoperce.h", 
        "name": "Scope-based reuse-candidate elimination", 
        "travuser": [
            "Fundef", 
            "Arg", 
            "Assign", 
            "Let", 
            "Ids", 
            "Ap", 
            "Code", 
            "Prf", 
            "Exprs"
        ]
    }, 
    "SSAT": {
        "default": "sons", 
        "include": "SSATransform.h", 
        "name": "SSA Transform Traversal", 
        "travuser": [
            "Assign", 
            "Ap", 
            "Fundef", 
            "Cond", 
            "Block", 
            "Code", 
            "Let", 
            "Arg", 
            "Vardec", 
            "Id", 
            "With", 
            "With2", 
            "Part", 
            "Withid", 
            "Funcond", 
            "Return", 
            "Ids"
        ]
    }, 
    "SSPMDLS": {
        "default": "sons", 
        "include": "set_spmd_linksign.h", 
        "name": "Set SPMD linksign", 
        "travuser": [
            "Arg", 
            "Id", 
            "Exprs", 
            "Return", 
            "Propagate", 
            "Genarray", 
            "Modarray", 
            "Break", 
            "With2", 
            "Withs", 
            "Let", 
            "Ret", 
            "Fundef", 
            "Module"
        ]
    }, 
    "STKNL": {
        "default": "sons", 
        "include": "single_thread_kernels.h", 
        "name": "CUDA Create single threaded CUDA kerenls", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Cudast"
        ]
    }, 
    "SWLD": {
        "default": "sons", 
        "include": "set_withloop_depth.h", 
        "name": "Set Withloop Depth", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "With", 
            "Part", 
            "Withid", 
            "Ids", 
            "Vardec", 
            "Arg"
        ]
    }, 
    "SWR": {
        "default": "sons", 
        "include": "split_wrappers.h", 
        "name": "Split Wrappers", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Ap", 
            "With", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Propagate"
        ]
    }, 
    "SYN": {
        "default": "sons", 
        "include": "add_sync.h", 
        "name": "Adding Sync Statements", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let"
        ]
    }, 
    "TCP": {
        "default": "sons", 
        "include": "typeconv_precompile.h", 
        "name": "Type Conversions", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Ap", 
            "Range"
        ]
    }, 
    "TDEPEND": {
        "default": "sons", 
        "include": "tagdependencies.h", 
        "name": "Tag Dependencies", 
        "travuser": [
            "Assign", 
            "Id", 
            "With"
        ]
    }, 
    "TEM": {
        "default": "sons", 
        "include": "tag_executionmode.h", 
        "name": "Tag Executionmode", 
        "travuser": [
            "Ap", 
            "Array", 
            "Assign", 
            "Let", 
            "Prf", 
            "With2"
        ]
    }, 
    "TFA": {
        "default": "sons", 
        "include": "tag_fp_aps.h", 
        "name": "Tag Ap Nodes", 
        "travuser": [
            "Ap"
        ]
    }, 
    "TFCTR": {
        "default": "sons", 
        "include": "ctransitive.h", 
        "name": "Classify edges and build cross-edge based reachability information", 
        "travuser": [
            "Tfdag", 
            "Tfvertex"
        ]
    }, 
    "TFDFW": {
        "default": "sons", 
        "include": "dfwalk.h", 
        "name": "Do a depth first walk of the subtyping hierarchy", 
        "travuser": [
            "Tfdag", 
            "Tfvertex"
        ]
    }, 
    "TFF": {
        "default": "sons", 
        "include": "tag_fp_fundefs.h", 
        "name": "Tag Fundef Nodes", 
        "travuser": [
            "Fundef", 
            "Ap"
        ]
    }, 
    "TFMIN": {
        "default": "sons", 
        "include": "mineq.h", 
        "name": "Computing the minimum equivalent graph", 
        "travuser": [
            "Tfdag", 
            "Tfvertex"
        ]
    }, 
    "TFPLB": {
        "default": "sons", 
        "include": "lub.h", 
        "name": "Preprocess subtyping graph for LUB queries", 
        "travuser": [
            "Tfdag", 
            "Tfvertex"
        ]
    }, 
    "TFRCH": {
        "default": "sons", 
        "include": "reachlabel.h", 
        "name": "Build link count matrix and label vertices for reachability analysis", 
        "travuser": [
            "Tfdag", 
            "Tfvertex"
        ]
    }, 
    "TFT": {
        "default": "sons", 
        "include": "tag_fun_thread.h", 
        "name": "Tag functions as thread functions when needed", 
        "travuser": [
            "Fundef", 
            "Ap", 
            "With3"
        ]
    }, 
    "TFTOP": {
        "default": "sons", 
        "include": "topo.h", 
        "name": "Do a topological sort of the subtyping hierarchy", 
        "travuser": [
            "Tfdag", 
            "Tfvertex"
        ]
    }, 
    "TGTL": {
        "default": "sons", 
        "include": "transform_gtge_to_ltle.h", 
        "name": "Transform all gt and ge operators to lt and le operators ", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Block", 
            "Assign", 
            "Let", 
            "Prf"
        ]
    }, 
    "TMFT": {
        "default": "sons", 
        "include": "tag_main_fun_thread.h", 
        "name": "Tag main function as thread function", 
        "travuser": [
            "Fundef"
        ]
    }, 
    "TP": {
        "default": "sons", 
        "include": "tag_preparation.h", 
        "name": "Tag Preparation", 
        "travuser": [
            "Arg", 
            "Fundef"
        ]
    }, 
    "TS": {
        "default": "sons", 
        "include": "type_statistics.h", 
        "name": "Print Type Statistics", 
        "travuser": [
            "Fundef", 
            "Arg", 
            "Vardec"
        ]
    }, 
    "UCZC": {
        "default": "sons", 
        "include": "UndoCondZeroCmp.h", 
        "name": "UndoCondZeroCmp", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Prf", 
            "Let", 
            "Assign"
        ]
    }, 
    "UESD": {
        "default": "sons", 
        "include": "UndoElimSubDiv.h", 
        "name": "UndoElimSubDiv", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Block", 
            "Let", 
            "Assign", 
            "Prf"
        ]
    }, 
    "UFIV": {
        "default": "sons", 
        "include": "unshare_fold_iv.h", 
        "name": "Unshare index vectors in WL-folds", 
        "travuser": [
            "Code", 
            "Fundef", 
            "Module", 
            "With", 
            "With2", 
            "Part", 
            "Exprs"
        ]
    }, 
    "UGLF": {
        "default": "sons", 
        "include": "ungroup_local_funs.h", 
        "name": "Ungroup Local functions", 
        "travuser": [
            "Module", 
            "Fundef"
        ]
    }, 
    "UPRF": {
        "default": "sons", 
        "include": "prfunroll.h", 
        "name": "Unroll PRFs", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Let", 
            "Prf"
        ]
    }, 
    "USS": {
        "default": "sons", 
        "include": "usesymbols.h", 
        "name": "Use Symbols", 
        "travuser": [
            "Typedef", 
            "Objdef", 
            "SPFold", 
            "Avis", 
            "Cast", 
            "Array", 
            "Ret", 
            "SPAp", 
            "SPId", 
            "SPMop", 
            "Module"
        ]
    }, 
    "USSAI": {
        "default": "sons", 
        "include": "undossaivtransform.h", 
        "name": "Undo SSAIV Transform", 
        "travuser": [
            "Fundef", 
            "With", 
            "Withid", 
            "Block", 
            "Vardec", 
            "Part", 
            "Id"
        ]
    }, 
    "USSAT": {
        "default": "sons", 
        "include": "UndoSSATransform.h", 
        "name": "UndoSSATransform Traversal", 
        "travuser": [
            "Assign", 
            "Fundef", 
            "Let", 
            "Block", 
            "Vardec", 
            "Avis", 
            "Id", 
            "Ids", 
            "Cond", 
            "Funcond"
        ]
    }, 
    "UW3": {
        "default": "sons", 
        "include": "unroll_with3.h", 
        "name": "Unroll With3s", 
        "travuser": [
            "Assign", 
            "With3", 
            "Range", 
            "Fundef"
        ]
    }, 
    "UWT": {
        "default": "sons", 
        "include": "update_wrapper_type.h", 
        "name": "Update Wrapper Types", 
        "travuser": [
            "Fundef"
        ]
    }, 
    "VISUAL": {
        "default": "user", 
        "include": "visualize.h", 
        "name": "Visualize Syntax Tree", 
        "travsons": [
            "SSAstack", 
            "Nums", 
            "Idag", 
            "IdagVFam", 
            "IdagEFam", 
            "IdagEFams", 
            "IdagVertices"
        ]
    }, 
    "VP": {
        "default": "sons", 
        "include": "variable_propagation.h", 
        "name": "Variable Propagation", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Id", 
            "Avis"
        ]
    }, 
    "W2D": {
        "default": "sons", 
        "include": "while2do.h", 
        "name": "While2do", 
        "travuser": [
            "While"
        ]
    }, 
    "WLA": {
        "default": "sons", 
        "include": "wlanalysis.h", 
        "name": "With-Loop Analysis", 
        "travuser": [
            "With", 
            "Part", 
            "Generator", 
            "Genarray"
        ]
    }, 
    "WLBSC": {
        "default": "sons", 
        "include": "wlbounds2structconsts.h", 
        "name": "With-Loop Bounds 2 Structure Constants", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "With", 
            "Part", 
            "Generator", 
            "Genarray"
        ]
    }, 
    "WLCC": {
        "default": "sons", 
        "include": "wl_cost_check.h", 
        "name": "With-Loop Cost Check", 
        "travuser": [
            "With", 
            "Code", 
            "Prf", 
            "Ap"
        ]
    }, 
    "WLDP": {
        "default": "sons", 
        "include": "wldefaultpartition.h", 
        "name": "With-Loop Default Partition", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "With", 
            "Part", 
            "Genarray", 
            "Modarray", 
            "Propagate"
        ]
    }, 
    "WLF": {
        "default": "sons", 
        "include": "SSAWLF.h", 
        "name": "With-Loop-Folding", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Id", 
            "Let", 
            "With", 
            "Code"
        ]
    }, 
    "WLFLT": {
        "default": "sons", 
        "include": "withloop_flattening.h", 
        "name": "Flattening multi-dimensional withloops", 
        "travuser": [
            "Id", 
            "Avis", 
            "With", 
            "Genarray", 
            "Assign", 
            "Let", 
            "Block", 
            "Fundef", 
            "Withid", 
            "Generator", 
            "Ids"
        ]
    }, 
    "WLFS": {
        "default": "sons", 
        "include": "WithloopFusion.h", 
        "name": "With-Loop-Fusion", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Assign", 
            "Id", 
            "With", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Part", 
            "Generator"
        ]
    }, 
    "WLI": {
        "default": "sons", 
        "include": "SSAWLI.h", 
        "name": "With-Loop-Interference", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Id", 
            "Let", 
            "Cond", 
            "With", 
            "Modarray", 
            "Part", 
            "Generator", 
            "Code"
        ]
    }, 
    "WLIDX": {
        "default": "sons", 
        "include": "wlidxs.h", 
        "name": "Annotate withloop idxs", 
        "travuser": [
            "Fundef", 
            "Let", 
            "With", 
            "Withid"
        ]
    }, 
    "WLIR": {
        "default": "sons", 
        "include": "withloop_invariant_removal.h", 
        "name": "Loop Invariants Traversal", 
        "travuser": [
            "Ids", 
            "Assign", 
            "Fundef", 
            "Arg", 
            "Vardec", 
            "Block", 
            "Let", 
            "Module", 
            "Id", 
            "With", 
            "Withid"
        ]
    }, 
    "WLLOM": {
        "default": "sons", 
        "include": "wl_lock_optimization_marking.h", 
        "name": "Withloop lock optimization marking", 
        "travuser": [
            "With", 
            "Code", 
            "Assign", 
            "Let", 
            "Ids", 
            "Id", 
            "Prf", 
            "Fundef"
        ]
    }, 
    "WLLOS": {
        "default": "sons", 
        "include": "wl_lock_optimization_shifting.h", 
        "name": "Withloop lock optimization shifting", 
        "travuser": [
            "With", 
            "Block", 
            "Assign", 
            "Prf"
        ]
    }, 
    "WLNC": {
        "default": "sons", 
        "include": "wl_needcount.h", 
        "name": "With-Loop NeedCount Check", 
        "travuser": [
            "Fundef", 
            "Block", 
            "Avis", 
            "With", 
            "Part", 
            "Code", 
            "Prf", 
            "Ap", 
            "Id"
        ]
    }, 
    "WLPG": {
        "default": "sons", 
        "include": "WLPartitionGeneration.h", 
        "name": "With-Loop Partition Generation", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "With"
        ]
    }, 
    "WLPROP": {
        "default": "sons", 
        "include": "wlpropagation.h", 
        "name": "With-Loop Propagation", 
        "travuser": [
            "Assign", 
            "Fundef", 
            "Ap", 
            "Exprs", 
            "Id"
        ]
    }, 
    "WLS": {
        "default": "sons", 
        "include": "wls.h", 
        "name": "With-Loop Scalarization", 
        "travuser": [
            "Assign", 
            "Fundef", 
            "Module", 
            "With"
        ]
    }, 
    "WLSB": {
        "default": "sons", 
        "include": "wls.h", 
        "name": "With-Loop Scalarization Build traversal", 
        "travuser": [
            "Code", 
            "Generator", 
            "Part", 
            "With", 
            "Withid", 
            "Genarray", 
            "Modarray"
        ]
    }, 
    "WLSC": {
        "default": "sons", 
        "include": "wls.h", 
        "name": "With-Loop Scalarization Check traversal", 
        "travuser": [
            "Block", 
            "Code", 
            "Default", 
            "Id", 
            "Part", 
            "With", 
            "Withid", 
            "Generator", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Propagate"
        ]
    }, 
    "WLSD": {
        "default": "sons", 
        "include": "wl_split_dimensions.h", 
        "name": "With-Loop Split Dimensions", 
        "traverror": [
            "WLublock"
        ], 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "Block", 
            "With", 
            "With2", 
            "Withid", 
            "WLseg", 
            "WLstride", 
            "WLgrid", 
            "WLblock"
        ]
    }, 
    "WLSELC": {
        "default": "sons", 
        "include": "wlselcount.h", 
        "name": "With-Loop Selections Counter", 
        "travuser": [
            "With", 
            "Fundef", 
            "Code", 
            "Ap", 
            "Prf"
        ]
    }, 
    "WLSIMP": {
        "default": "sons", 
        "include": "wlsimplification.h", 
        "name": "With-Loop Simplification", 
        "travuser": [
            "Module", 
            "Fundef", 
            "Assign", 
            "Let", 
            "With", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Break", 
            "Propagate", 
            "Code", 
            "Part", 
            "Generator"
        ]
    }, 
    "WLSW": {
        "default": "sons", 
        "include": "wls.h", 
        "name": "With-Loop Scalarization Withloopification traversal", 
        "travuser": [
            "Code", 
            "Id", 
            "Let", 
            "Part", 
            "With", 
            "Withid"
        ]
    }, 
    "WLTRA": {
        "default": "sons", 
        "include": "wltransform.h", 
        "name": "With-Loop Transformation traversal", 
        "travuser": [
            "Code", 
            "Let", 
            "With"
        ]
    }, 
    "WLUR": {
        "default": "sons", 
        "include": "SSAWLUnroll.h", 
        "name": "With-Loop Unrolling Traversal", 
        "travuser": [
            "Ap", 
            "Assign", 
            "Fundef", 
            "With"
        ]
    }, 
    "WRCI": {
        "default": "sons", 
        "include": "wrci.h", 
        "name": "With-loop reuse candidate inference", 
        "travuser": [
            "Fundef", 
            "Assign", 
            "Let", 
            "With", 
            "Genarray", 
            "Modarray", 
            "Fold", 
            "Generator"
        ]
    }
};     
var nodesets_json =      
{
    "Expr": [
        "Num",
        "NumByte",
        "NumShort",
        "NumInt",
        "NumLong",
        "NumLonglong",
        "NumUbyte",
        "NumUshort",
        "NumUint",
        "NumUlong",
        "NumUlonglong",
        "Double",
        "Float",
        "Floatvec",
        "Char",
        "Bool",
        "Id",
        "SPId",
        "With",
        "With2",
        "With3",
        "Array",
        "Ap",
        "SPAp",
        "Prf",
        "Funcond",
        "Cast",
        "SPMop",
        "SetWL",
        "Dot",
        "Str",
        "Icm",
        "Type",
        "Globobj",
        "Nested_init"
    ],
    "Stmt": [
        "Let",
        "Cond",
        "Return",
        "Do",
        "Annotate",
        "While",
        "Icm",
        "Cudast"
    ],
    "Interface": [
        "Import",
        "Export",
        "Use",
        "Provide"
    ],
    "WithOp": [
        "Genarray",
        "Modarray",
        "SPFold",
        "Fold",
        "Break",
        "Propagate"
    ],
    "IntValue": [
        "Num",
        "Array",
        "Id"
    ],
    "Withloop": [
        "With",
        "With2"
    ]
};       
var attrtypes_json =     
{
    "AccessFeature": {
        "copy": "literal", 
        "ctype": "feature_t", 
        "init": "0"
    }, 
    "AccessInfo": {
        "copy": "function", 
        "ctype": "access_info_t*", 
        "init": "NULL", 
        "persist": false
    }, 
    "ArgTab": {
        "copy": "function", 
        "ctype": "argtab_t*", 
        "init": "NULL"
    }, 
    "BitField": {
        "copy": "literal", 
        "ctype": "int", 
        "init": "0"
    }, 
    "Bool": {
        "copy": "literal", 
        "ctype": "bool", 
        "init": "FALSE", 
        "vtype": "int"
    }, 
    "Byte": {
        "copy": "literal", 
        "ctype": "char", 
        "init": "0", 
        "vtype": "int"
    }, 
    "Char": {
        "copy": "literal", 
        "ctype": "unsigned char", 
        "init": "'\0'", 
        "vtype": "int"
    }, 
    "CodeLink": {
        "copy": "hash", 
        "ctype": "node*", 
        "init": "NULL", 
        "persist": true
    }, 
    "CompInfo": {
        "copy": "function", 
        "ctype": "compinfo*", 
        "init": "NULL"
    }, 
    "CompilerPhase": {
        "copy": "literal", 
        "ctype": "compiler_phase_t", 
        "init": "PH_initial"
    }, 
    "Constant": {
        "copy": "function", 
        "ctype": "constant*", 
        "init": "NULL"
    }, 
    "CudaAccessInfo": {
        "copy": "function", 
        "ctype": "cuda_access_info_t*", 
        "init": "NULL", 
        "persist": false
    }, 
    "DFMask": {
        "copy": "function", 
        "ctype": "dfmask_t*", 
        "init": "NULL", 
        "persist": false
    }, 
    "DFMaskBase": {
        "copy": "function", 
        "ctype": "dfmask_base_t*", 
        "init": "NULL", 
        "persist": false
    }, 
    "Dag": {
        "copy": "function", 
        "ctype": "dag*", 
        "init": "NULL"
    }, 
    "Double": {
        "copy": "literal", 
        "ctype": "double", 
        "init": "0.0"
    }, 
    "ExtLink": {
        "copy": "hash", 
        "ctype": "node*", 
        "init": "NULL", 
        "persist": true
    }, 
    "FileType": {
        "copy": "literal", 
        "ctype": "file_type", 
        "init": "FT_unknown"
    }, 
    "Float": {
        "copy": "literal", 
        "ctype": "float", 
        "init": "0.0", 
        "vtype": "double"
    }, 
    "Floatvec": {
        "copy": "literal", 
        "ctype": "floatvec", 
        "init": "(floatvec){0., 0., 0., 0.}", 
        "vtype": "floatvec"
    }, 
    "IdagFun": {
        "copy": "function", 
        "ctype": "idag_fun_t ", 
        "init": "NULL"
    }, 
    "IndexInfo": {
        "copy": "function", 
        "ctype": "index_info*", 
        "init": "NULL", 
        "persist": false
    }, 
    "Int": {
        "copy": "literal", 
        "ctype": "int", 
        "init": "0", 
        "vtype": "int"
    }, 
    "Integer": {
        "copy": "literal", 
        "ctype": "int", 
        "init": "0"
    }, 
    "LUT": {
        "copy": "function", 
        "ctype": "lut_t*", 
        "init": "NULL", 
        "persist": false
    }, 
    "Link": {
        "copy": "hash", 
        "ctype": "node*", 
        "init": "NULL", 
        "persist": true
    }, 
    "Long": {
        "copy": "literal", 
        "ctype": "long", 
        "init": "0", 
        "vtype": "long long"
    }, 
    "Longlong": {
        "copy": "literal", 
        "ctype": "long long", 
        "init": "0", 
        "vtype": "long long"
    }, 
    "MTExecMode": {
        "copy": "literal", 
        "ctype": "mtexecmode_t", 
        "init": "MUTH_ANY"
    }, 
    "Namespace": {
        "copy": "function", 
        "ctype": "namespace_t*", 
        "init": "NULL"
    }, 
    "NewType": {
        "copy": "function", 
        "ctype": "ntype*", 
        "init": "NULL"
    }, 
    "Node": {
        "copy": "function", 
        "ctype": "node*", 
        "init": "NULL"
    }, 
    "NodeList": {
        "copy": "function", 
        "ctype": "nodelist*", 
        "init": "NULL"
    }, 
    "OldType": {
        "copy": "function", 
        "ctype": "types*", 
        "init": "NULL", 
        "persist": false
    }, 
    "OmpOP": {
        "copy": "literal", 
        "ctype": "omp_reduction_op", 
        "init": "OMP_REDUCTION_NONE"
    }, 
    "Prf": {
        "copy": "literal", 
        "ctype": "prf", 
        "init": "(prf)0"
    }, 
    "ReuseInfo": {
        "copy": "function", 
        "ctype": "reuse_info_t*", 
        "init": "NULL", 
        "persist": false
    }, 
    "Scheduling": {
        "copy": "function", 
        "ctype": "sched_t*", 
        "init": "NULL", 
        "persist": false
    }, 
    "Shape": {
        "copy": "function", 
        "ctype": "shape*", 
        "init": "NULL"
    }, 
    "SharedString": {
        "copy": "function", 
        "ctype": "const char*", 
        "init": "NULL"
    }, 
    "Short": {
        "copy": "literal", 
        "ctype": "short", 
        "init": "0", 
        "vtype": "int"
    }, 
    "ShpSeg": {
        "copy": "function", 
        "ctype": "shpseg*", 
        "init": "NULL"
    }, 
    "SimpleType": {
        "copy": "literal", 
        "ctype": "simpletype", 
        "init": "T_unknown"
    }, 
    "String": {
        "copy": "function", 
        "ctype": "char*", 
        "init": "NULL"
    }, 
    "StringSet": {
        "copy": "function", 
        "ctype": "stringset_t*", 
        "init": "NULL", 
        "persist": false
    }, 
    "TaskSel": {
        "copy": "function", 
        "ctype": "tasksel_t*", 
        "init": "NULL", 
        "persist": false
    }, 
    "TypeCheckingStatus": {
        "copy": "literal", 
        "ctype": "NTC_stat", 
        "init": "NTC_not_checked", 
        "persist": true
    }, 
    "Ubyte": {
        "copy": "literal", 
        "ctype": "unsigned char", 
        "init": "0", 
        "vtype": "unsigned int"
    }, 
    "Uint": {
        "copy": "literal", 
        "ctype": "unsigned int", 
        "init": "0", 
        "vtype": "unsigned int"
    }, 
    "Ulong": {
        "copy": "literal", 
        "ctype": "unsigned long", 
        "init": "0", 
        "vtype": "unsigned long int"
    }, 
    "Ulonglong": {
        "copy": "literal", 
        "ctype": "unsigned long long", 
        "init": "0", 
        "vtype": "unsigned long long int"
    }, 
    "Ushort": {
        "copy": "literal", 
        "ctype": "unsigned short", 
        "init": "0", 
        "vtype": "unsigned int"
    }, 
    "Vertex": {
        "copy": "function", 
        "ctype": "vertex*", 
        "init": "NULL"
    }, 
    "VertexWrapper": {
        "copy": "function", 
        "ctype": "vertex*", 
        "init": "NULL"
    }
};      

