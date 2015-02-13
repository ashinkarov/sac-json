
YAJL_FLAGS    := $(shell pkg-config --cflags yajl)
YAJL_LDFLAGS  := $(shell pkg-config --libs yajl)


CFLAGS        := -Wall -Wextra -std=gnu99 -pedantic $(YAJL_FLAGS)
LDFLAGS       := $(YAJL_LDFLAGS)

all: validate-nodesets

validate-nodesets: validator-common.o validate-nodesets.o
