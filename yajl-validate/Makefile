
YAJL_FLAGS    := $(shell pkg-config --cflags yajl)
YAJL_LDFLAGS  := $(shell pkg-config --libs yajl)


CFLAGS        := -Wall -Wextra -std=gnu99 -pedantic $(YAJL_FLAGS)
LDFLAGS       := $(YAJL_LDFLAGS)

all: validator

validator: validator-common.o validator.o

validator.o: validator.h uthash.h
validator-common.o: validator.h

clean:
	$(RM) *.o validator
