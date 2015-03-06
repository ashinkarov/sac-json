import json
import collections


def change_yes_no (item, field):
    if field not in item:
        return item

    if item[field] == 'yes':
        item[field] = True
    elif item[field] == 'no':
        item[field] = False
    else:
        raise Exception ("the yes/no field %s contains value '%s'" % (filed, item[field]))

    return item

def update_desc (s):
    s_l = s.split ()
    r = []
    cs = ""
    csl = 0
    first = True
    for w in s_l:
        if csl < 80:
            if first:
                cs = w
                csl = len (w)
                first = False
            else:
                cs += " " + w
                csl += len (w) + 1
        else:
            r.append (cs)
            cs = w
            csl = len (w)

    if cs != "":
        r.append (cs)

    return r


t = json.load (open ('ast.json'), object_pairs_hook=collections.OrderedDict)

ast = collections.OrderedDict ()
for node in t['syntaxtree']:
    node_name = node['name']
    node.pop ('name', None)

    if 'attributes' in node:
        new_attrs = collections.OrderedDict ()
        for attr in node['attributes']:
            attr_name = attr['name']
            attr.pop ('name')

            attr = change_yes_no (attr, 'mandatory')
            attr = change_yes_no (attr, 'inconstructor')

            if 'targets' in attr:
                if isinstance (attr['targets'], dict):
                    attr['targets'] = change_yes_no (attr['targets'], 'mandatory')
                    if attr['targets']['phases'] == "":
                        attr['targets']['phases'] = "all"

                elif isinstance (attr['targets'], list):
                    for target in attr['targets']:
                        # XXX Check that it actually works.
                        target = change_yes_no (target, 'mandatory')
                        
                        if target['phases'] == "":
                           target['phases'] = "all"

            if 'description' in attr:
                attr['description'] = update_desc (attr['description'])

            new_attrs[attr_name] = attr
        node['attributes'] = new_attrs

    if 'sons' in node:
        new_sons = collections.OrderedDict ()
        for son in node['sons']:
            son_name = son['name']
            son.pop ('name', None)
            
            if 'targets' in son:
                if isinstance (son['targets'], dict):
                    son['targets'] = change_yes_no (son['targets'], 'mandatory')
                    
                    if son['targets']['phases'] == "":
                        son['targets']['phases'] = "all"

                elif isinstance (son['targets'], list):
                    for target in son['targets']:
                        # XXX Check that it actually works.
                        target = change_yes_no (target, 'mandatory')
                        
                        if target['phases'] == "":
                           target['phases'] = "all"

            if 'description' in son:
                son['description'] = update_desc (son['description'])

            new_sons[son_name] = son
        node['sons'] = new_sons

    if 'flags' in node:
        new_flags = collections.OrderedDict ()
        for flag in node['flags']:
            flag_name = flag['name']
            flag.pop ('name', None)
            if 'desc' in flag:
                flag['desc'] = update_desc (flag['desc'])

            new_flags[flag_name] = flag
        node['flags'] = new_flags

    if 'description' in node:
        node['description'] = update_desc (node['description'])

    ast[node_name] = node

print json.dumps (ast, indent=4)
