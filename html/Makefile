

AST        := ../ast-upd.json
NODESETS   := ../nodesets.json
TRAVERSALS := ../traversals.json
ATTRTYPES  := ../attr-types.json


ast.js: $(AST) $(NODESETS) $(TRAVERSALS) $(ATTRTYPES)
	@echo Generating $@
	@echo -e        "\
var syntaxtree_json =    \n\
`cat $(AST)`;\n          \n\
var traversals_json =    \n\
`cat $(TRAVERSALS)`;     \n\
var nodesets_json =      \n\
`cat $(NODESETS)`;       \n\
var attrtypes_json =     \n\
`cat $(ATTRTYPES)`;      \n" > $@
