#ifndef __VALIDATE_NODES_H__
#define __VALIDATE_NODES_H__
    
bool load_node_names (yajl_val ast, const char *  fname);
bool validate_ast (const yajl_val ast);
void node_names_free ();

#endif // __VALIDATE_NODES_H__
