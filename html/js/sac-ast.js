// here defined are function for reading/writing JSON and displaying it
// SaC Team (C) 2018
//
// this files needs jQuery ($).


/* JSON to HTML transformations */

var transform_traversals = {"<>":"tr","html":[
    {"<>":"td","id":"trav_${id}","html":"${id}"},
    {"<>":"td","html":"${name}"}
]};

var transform_attr = {"<>":"tr","html":[
    {"<>":"td","id":"attrt_${id}","contenteditable":"true","html":"${id}"},
    {"<>":"td","class":"ctype","contenteditable":"true","html":"${ctype}"},
    {"<>":"td","class":"cntr","contenteditable":"true","html":"${init}"},
    {"<>":"td","contenteditable":"true","html":"${copy}"},
    {"<>":"td","contenteditable":"true","html":"${persist}"},
    {"<>":"td","class": "ctype", "contenteditable":"true","html":"${vtype}"},
    {"<>":"td","class":"cntr","html":[
        {"<>":"div","class":"button","onclick": function(e) {
            if (confirm ("Are you sure you want to delete " + e.obj.name + "?" )) {
                $(e.event.target).closest("tr").remove();
            }},
            "html":"✗"}
    ]}
]};

var transform_nodeset = {"<>":"tr","html":[
    {"<>":"td","id":"ns_${id}","html":"${id}"},
    {"<>":"td","html": function () {
        var t = ""; var len = this.nodes.length;
        for (var i = 0; i < len; i++) {
            t += "<a href='#' onclick='return goTo(\"#node_" + this.nodes[i] + "\")'>"
                + this.nodes[i]
                + "</a>";

            if (i != len - 1)
                t += ", ";
        }
        return t;
}}]};

/*
 * This function taks the AST JSON, which is typically formatted as:
 *   { 'object': { 'attr': 'foo', ... }, ... }
 * and turns it into:
 *   { { 'id': 'object', 'attr': 'foo', ...}, ... }
 * We do this becuase the json2html lib can only deal with this kind of
 * layout. Some of the AST JSON is not formated like this, like for instance
 * the `nodeset` stuff:
 *   { 'object': [ ... ], ... }
 * to
 *   { { 'id': 'object', 'nodes': [ ... ] }, ... }
 */
function ast2Array (ast) {
    var array_data = [];
    $.each(ast, function(name, val) {
        if ($.isArray(val)) {
            array_data.push({'id': name, 'nodes': val});
        } else {
            val['id'] = name;
            array_data.push(val);
        }
    });
    return array_data;
}

/* Table Editing related functions */

function add_row () {
    // FIXME we need to generalise this
    $("#attrtype-table").json2html({
        'id': 'name',
        'ctype': 'ctype',
        'init': 'init',
        'copy': 'copy',
        'persist': '',
        'vtype': ''}, transform_attr);
}

// uses FileSaver.js
function get_json() {
    names = [];
    // FIXME we need to generalise this
    $("#attrtype-table tr").each (function (i, n) {
        if (i == 0)
            return;

        var r = $(n);
        var name = r.find('td:eq(0)').text();
        names.push (name);

        var o = {};
        if (attrtypes_json.hasOwnProperty (name))
            o = attrtypes_json[name];

        o['ctype'] = r.find('td:eq(1)').text();
        o['init'] = r.find('td:eq(2)').text();
        o['copy'] = r.find('td:eq(3)').text();
        attrtypes_json[name] = o;
    });

    // Get rid of the old keys that are not in the table
    // --- they might have been renamed or derleted.
    Object.keys (attrtypes_json).forEach (function(n) {
        if (!names.includes (n)) {
            delete attrtypes_json[n];
        }
    });

    // FIXME Sort the object over the key.
    var blob = new Blob([JSON.stringify(attrtypes_json, undefined, 4)], {type: "application/json;charset=utf-8"});
    saveAs(blob, "attrtypes_ast.json");
}

/* Page movement functions */

function switchTab (tabid) {
    if (! $("section[data-tab='" + tabid + "']").hasClass('selected')) {
        $("section[class*='selected']").removeClass('selected');
        $("section[data-tab='" + tabid + "']").addClass('selected');
    }
    if (! $(".tab-btn[data-tab='" + tabid + "']").hasClass('selected')) {
        $(".tab-btn[class*='selected']").removeClass('selected');
        $(".tab-btn[data-tab='" + tabid + "']").addClass('selected');
    }
}

function goTo (tag) {
    // sane default
    var tab = 0;

    if (tag.startsWith('#attrt_')) {
        // attribute tab/page
        tab = 1;
    } else if (tag.startsWith('#node_')) {
        // tree tab/page
        tab = 0;
    } else if (tag.startsWith('#ns_')) {
        // tree nodeset tab/page
        tab = 2;
    } else {
        console.log ("Unknown tag " + tag + " passed...");
        return true;
    }

    switchTab (tab);
    if (tab == 0) {
        click_tree (tag);
    } else {
        $.scrollTo (tag, {offset: -50});
    }
}
