import json

fp = open ('traversals.json')
t = json.load (fp)

res = {}
for trav in t["traversals"]:
    trav_name = trav["id"]
    trav.pop ("id", None)
    
    if "travuser" in trav and trav["travuser"] == []:
      trav.pop ("travuser")
    
    if "traverror" in trav and trav["traverror"] == []:
      trav.pop ("traverror")

    if "travsons" in trav and trav["travsons"] == []:
      trav.pop ("travsons")

    if "travnone" in trav and trav["travnone"] == []:
      trav.pop ("travnone")

    res[trav_name] = trav

print json.dumps (res, indent=4, sort_keys=True)
