import xml.etree.ElementTree as et
import sys
import json

# helper variable to store attributes of a certain node
node_attributes = []

def collect_attribs (n):
    for a in n.attrib:
        if a not in node_attributes:
            node_attributes.append (a)

# generic parsing
def die (s):
    print >>sys.stderr, s
    sys.exit (1)

def warn (s):
    print >>sys.stderr, "wrarning:", s

def dump_stderr (t):
    mystdout = sys.stdout
    mystdout.flush ()
    sys.stderr.flush ()
    sys.stdout = sys.stderr

    et.dump (t)

    sys.stdout.flush ()
    sys.stdout = mystdout

def attrib_list (t):
    return {x : t.attrib[x] for x in t.attrib}

def parse_attrtypes (t):
    return [attrib_list (at) for at in t]

def parse_traversals (t): 
    lst = []
    for tr in t:
        trd = {a: tr.attrib[a] for a in tr.attrib}
        for trc in tr:
            trd[trc.tag] = [x.attrib["name"] for x in trc]
        lst.append (trd)
    
    return lst

# syntaxtree node-specific
def parse_phases (ph):
    # attribs: none
    ph_all = False
    phases = []
    ph_range = None

    for p in ph:
        if p.tag == "all" or p.tag == "unknown":
            ph_all = True
        elif p.tag == "phase":
            if "name" not in p.attrib:
                warn ("phase without the name!")
                dump_stderr (p)
                phase_range = {"from": p.attrib["from"], "to": p.attrib["to"]}
            else:
                phases.append (p.attrib["name"])
        elif p.tag == "range":
            if "from" not in p.attrib or "to" not in p.attrib:
                warn ("range is invalid!")
                dump_stderr (p);
                phases.append (p.attrib["name"])
            else:
                ph_range = {"from": p.attrib["from"], "to": p.attrib["to"]}
        else:
            die ("unknown tag `%s' found in phases" % p.tag)

    if ph_all:
        if not (len (phases) == 0 and ph_range is None):
            warn ("phase %s has <all/> and range or phase specification" % ph)
            dump_stderr (ph)
            pass

        return "all"

    elif phases != []:
        if ph_range is not None:
            phases.append (ph_range)
        
        return phases

    elif ph_range is not None:
        assert not ph_all and len (phases) == 0
        return ph_range
    else:
        warn ("empty phase found")
        dump_stderr (ph)
        return "all"

def parse_target (t):
    # attribs: 'mandatory'
    target_types = []
    target_set = None
    if "mandatory" in t.attrib:
        mandatory = t.attrib["mandatory"]
    else:
        mandatory = "no"

    phases = ""

    for tc in t:
        if tc.tag == "node":
            target_types.append (tc.attrib["name"])
        elif tc.tag == "set":
            assert target_set is None
            target_set = tc.attrib["name"]
        elif tc.tag == "phases":
            phases = parse_phases (tc)
        elif tc.tag == "any":
            target_set = "any"
        elif tc.tag == "unknown":
            taget_set = "any"
        else:
            die ("unknown tag `%s' found in target" % tc.tag)

    # Actually this is attaly stupid, as currently it is allowed to
    # have set and node being set together, which is excessive
    # as just node is enough.

    tt = target_set if target_set is not None else "any"
    if target_types != []:
        tt = target_types
        if len (tt) == 1:
            tt = tt[0]
    return {"mandatory": mandatory, "contains": tt, "phases": phases}


def parse_targets (ts):
    targets = []
    for t in ts:
        if t.tag == "target":
            targets.append (parse_target (t))
        elif t.tag == "node" and t.get ("name") == "Cudast":
            # this is fucking wrong, ignore it
            pass
        else:
            dump_stderr (t)
            die ("unknown tag `%s' found in targets" % t.tag)

    return targets if len (targets) != 1 else targets[0]


def parse_son (s):
    # existing attributes: ['name', 'default']
    name = s.attrib["name"]
    desc = ""
    targets = []
    for t in s:
        if t.tag == "description":
            desc = t.text.strip ()
        elif t.tag == "targets":
            targets = parse_targets (t)
        elif t.tag == "target":
            targets = [ parse_target (t) ]
        else:
            die ("unknown tag `%s' found in son" % t.tag)

    ret = {}
    ret["name"] = name;

    if 'default' in s.attrib:
        ret['default'] = s.attrib['default']

    if desc != "":
        ret["description"] = desc
    if len (targets) == 1:
        ret["targets"] = targets[0]
    else:
        ret["targets"] = targets
    return ret

def parse_attribute (s):
    # attributes: ['inconstructor', 'name', 'default', 'mandatory'] 
    name = s.attrib["name"]
    desc = ""
    attr_targets = None
    attr_type = None

    for t in s:
        if t.tag == "type":
            assert len (t) == 1

            for tt in t:
                if "targets" == tt.tag:
                    attr_targets = parse_targets (tt)
                elif "target" == tt.tag:
                    attr_targets = parse_target (tt)
                else:
                    #dump_stderr (t)
                    die ("unknown tag `%s' found in type" % tt.tag)

            if 'name' not in t.attrib:
                die ("no 'name' in the <type> tag")
            else:
                attr_type = t.attrib["name"]

        elif t.tag == "description":
            desc = "" if t.text is None else t.text
            desc = desc.strip ()
        else:
            die ("unknown tag `%s' found in attribute" % t.tag)
    
    if attr_type is None:
        die ("no type specified to attribute %s" %name)

    ret = {}
    ret["name"] = name
    ret["type"] = attr_type

    if desc != "":
        ret["description"] = desc
    
    if "inconstructor" in s.attrib:
        ret["inconstructor"] = s.attrib["inconstructor"]
    
    if "default" in s.attrib:
        ret["default"] = s.attrib["default"]

    if "mandatory" in s.attrib:
        ret["mandatory"]  = s.attrib["mandatory"]

    ret["targets"] = attr_targets
    return ret

def parse_flag (s):
    # attribs: ['default', 'name']
    name = s.get ("name")
    default = s.get ("default") if "default" in s.attrib else None
    desc = ""
    phases = []
    
    for f in s:
        if f.tag == "description":
            desc = "" if f.text is None else f.text
            desc = desc.strip ()
        elif f.tag == "phases":
            phases = parse_phases (f)
        else:
            die ("unknown tag `%s' found in flag" % f.tag)

    ret = {"name": name}
    if default is not None:
        ret["default"] = default

    if desc != "":
        ret["desc"] = desc

    if phases != []:
        ret["phases"] = phases
    return ret

def parse_check (c):
    if c.tag == "check":
        if 'name' in c.attrib:
            return c.attrib["name"]
        else:
            die ("no name in the 'check' element")
    else:
        die ("unknown tag `%s' found in checks" % c.tag)


def print_array_of (name, node, fun):
    lst = []
    for s in node:
        lst.append (fun (s))
    
    return lst

def parse_node (nd):
    # attribs: name
    ret = {"name": nd.attrib["name"]}

    for t in nd:
        if t.tag == "description":
            ret["description"] = t.text.strip ()
        elif t.tag == "sons":
            ret["sons"] = print_array_of ("sons", t, parse_son)
        elif t.tag == "attributes":
            ret["attributes"] = print_array_of ("attributes", t, parse_attribute)
        elif t.tag == "flags":
            ret["flags"] = print_array_of ("flags", t, parse_flag)
        elif t.tag == "checks":
            ret["checks"] = print_array_of ("checks", t, parse_check)
        else:
            die ("unknown tag `%s' found in node" % t.tag)

    return ret

def parse_syntaxtree (t):
    lst = []
    for nd in t:
        lst.append (parse_node (nd))
    
    return lst

# nodesets
def parse_nodesets (t):
    lst = []
    for ns in t:
        lst.append ({ns.attrib["name"] : [x.attrib["name"] for x in ns.find ("target")]})
    
    return lst

t = et.parse ("ast.xml")
root = t.getroot ()

for child in root:
    if child.tag == "attributetypes":
        print json.dumps ({"attribtypes" : parse_attrtypes (child)}, indent=4)
        pass
    elif child.tag == "traversals":
        print json.dumps ({"traversals" : parse_traversals (child)}, indent=4)
        pass
    elif child.tag == "syntaxtree":
        print json.dumps ({"syntaxtree" : parse_syntaxtree (child)}, indent=4)
        pass
    elif child.tag == "nodesets":
        print json.dumps ({"nodesets" : parse_nodesets (child)}, indent=4)
        pass
    else:
        die ("unknown tag `%s' found in ast.xml" % child.tag)

#print node_attributes
# FIXME attribute/type is not considered (when it is a Link)
