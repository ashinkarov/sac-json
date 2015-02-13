import json
import sys

fp = open ('attributes.json')
t = json.load (fp)

res = {}
for trav in t["attribtypes"]:
    trav_name = trav["name"]
    trav.pop ("name", None)

    if "persist" in trav:
        if trav["persist"] == "no":
            trav["persist"] = False
        elif trav["persist"] == "yes":
            trav["persist"] = True
        else:
            print >>sys.stderr, "Fucking disaster!"
            sys.exit (-1);
    
    res[trav_name] = trav

print json.dumps (res, indent=4, sort_keys=True)
