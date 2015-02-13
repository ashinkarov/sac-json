import json

fp = open ('traversals.json')
t = json.load (fp)

res = {}
for trav in t["traversals"]:
    trav_name = trav["id"]
    trav.pop ("id", None)
    
    res[trav_name] = trav

print json.dumps (res, indent=4, sort_keys=True)
