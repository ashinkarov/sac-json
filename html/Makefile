

AST        := ../ast-upd.json
NODESETS   := ../nodesets.json
TRAVERSALS := ../traversals.json
ATTRTYPES  := ../attr-types.json


ast.js: $(AST) $(NODESETS) $(TRAVERSALS) $(ATTRTYPES)
	@echo Generating $@
	@echo "var syntaxtree_json =" >  $@
	@cat $(AST)                   >> $@
	@echo ";"                     >> $@
	@echo "var traversals_json =" >> $@
	@cat $(TRAVERSALS)            >> $@
	@echo ";"                     >> $@
	@echo "var nodesets_json ="   >> $@
	@cat $(NODESETS)              >> $@
	@echo ";"                     >> $@
	@echo "var attrtypes_json ="  >> $@
	@cat $(ATTRTYPES)             >> $@
	@echo ";"                     >> $@
