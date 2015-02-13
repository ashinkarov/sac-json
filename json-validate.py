from jsonschema import validate
import json
import pprint

attribtypes_schema = {
    "type": "object",
    "description": "Attribute types schema",
    "properties" : {
        "attribtypes": {
            "type": "array",
            "items": {
                "description": "This is a description of the real attriute type",
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "init": {"type": "string"},
                    "copy": {"type": "string"},
                    "ctype": {"type": "string"},
                    "vtype": {"type": "string"}
                },
                "required": ["name", "ctype", "init", "copy"]
            }
        }
    }
}

traversals_schema = {
    "type": "object",
    "properties" : {
        "traversals": {
            "type": "array",
            "items": {
                "description": "This is a schema for the traversal itself",
                "properties": {
                    "id": {
                        "type": "string",
                        "pattern": "^[A-Z0-9]+$"
                    },
                    "name": {
                        "type": "string"
                    },
                    "include": {
                        "type": "string",
                        "pattern": "^[a-zA-Z0-9_]+\.h$"
                    },
                    "default": {
                        "description": "FIXME what is the difference here?",
                        "type": "string",
                        # FIXME WTF is CMPTunknown?
                        "enum": ["sons", "user", "error", "none", "CMPTunknown"]
                    },
                    "travuser": {
                        "type": "array"
                    },
                    "travsons": {
                        "type": "array"
                    }
                },
                "required": ["id", "name", "default"]
            }
        }
    },
    "required": ["traversals"]
}


json_data = open ('traversals.json')
example = json.load (json_data)
#pprint.pprint (example)


validate (example, traversals_schema)
json_data.close ()
