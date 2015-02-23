
YAJL_FLAGS    := $(shell pkg-config --cflags yajl)
YAJL_LDFLAGS  := $(shell pkg-config --libs yajl)

CFLAGS        := -g  -Wall -Wextra -std=gnu99 -pedantic $(YAJL_FLAGS)
LDFLAGS       := $(YAJL_LDFLAGS)

all: validator

validator: validator-common.o validator.o validate-nodes.o validate-attrtypes.o \
           validate-nodesets.o validate-traversals.o gen.o \
           gen-traverse-tables.o gen-traverse-helper.o gen-node-basic.o

validator.o: validator.h validate-nodes.h uthash.h validate-nodes.h \
             validate-attrtypes.h validate-nodesets.h validate-traversals.h \
             gen.h

validator-common.o: validator.h
validate-nodes.o: validator.h validate-nodes.h
validate-attrtypes.o: validator.h validate-attrtypes.h
validate-nodesets.o: validator.h validate-nodesets.h
validate-traversals.o: validator.h validate-traversals.h
gen.o: validator.h gen.h
gen-traverse-tables.o: validator.h gen.h
gen-traverse-helper.o: validator.h gen.h
gen-node-basic.o: validator.h gen.h


clean:
	$(RM) *.o validator
