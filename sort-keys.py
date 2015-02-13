import json
import sys

print json.dumps (json.load (open (sys.argv[1])), indent=4, sort_keys=True)
