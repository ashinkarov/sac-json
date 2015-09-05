
YAJL_CFLAGS    := $(shell pkg-config --cflags yajl)
YAJL_LDFLAGS  := $(shell pkg-config --libs yajl)

CFLAGS        := -g  -Wall -Wextra -std=gnu99 -pedantic $(YAJL_CFLAGS)
LDFLAGS       := $(YAJL_LDFLAGS)

all: ast-builder

ast-builder: ast-builder-common.o ast-builder.o validate-nodes.o validate-attrtypes.o \
             validate-nodesets.o validate-traversals.o gen.o \
             gen-traverse-tables.o gen-traverse-helper.o gen-node-basic.o \
             gen-check.o

ast-builder.o: ast-builder.h validate-nodes.h uthash.h validate-nodes.h \
               validate-attrtypes.h validate-nodesets.h validate-traversals.h \
               gen.h

ast-builder-common.o: ast-builder.h
validate-nodes.o: ast-builder.h validate-nodes.h
validate-attrtypes.o: ast-builder.h validate-attrtypes.h
validate-nodesets.o: ast-builder.h validate-nodesets.h
validate-traversals.o: ast-builder.h validate-traversals.h
gen.o: ast-builder.h gen.h
gen-traverse-tables.o: ast-builder.h gen.h
gen-traverse-helper.o: ast-builder.h gen.h
gen-node-basic.o: ast-builder.h gen.h
gen-check.o: ast-builder.h gen.h


clean:
	$(RM) *.o ast-builder
