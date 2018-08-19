// here defined are function for reading/writing JSON and displaying it
// SaC Team (C) 2018
//
// this files needs jQuery ($).


/* JSON to HTML transformations */

function nodes_to_hreflist (nodes) {
    var t = ""
    var len = nodes.length;
    for (var i = 0; i < len; i++) {
        t += "<a href='#' onclick='return goTo(\"#node_" + nodes[i] + "\")'>"
            + nodes[i]
            + "</a>";

        if (i != len - 1)
            t += ", ";
    }
    return t;
}

function nodes_to_list (nodes) {
    var t = ""
    var len = nodes.length;
    for (var i = 0; i < len; i++) {
        t += nodes[i];
        if (i != len - 1)
            t += ", ";
    }
    return t;
}


var transform_traversals = {"<>":"tr", "class":"traversal_row", "html":[
    {"<>":"td","class":"editable","id":"trav_${id}","html":"${id}"},
    {"<>":"td","class":"editable","html":"${name}"},
    {"<>":"td","align":"left","html": function () {
        t =  "<table class='trav_prop_table'><tr><td class='trav_prop_name'>Default:</td><td class='editable'>" + this.default + "</td></tr>";
        t += "<tr><td class='trav_prop_name'>Include:</td><td class='editable'>" + this.include + "</td></tr>";

        var ifndef_class = this.hasOwnProperty ("ifndef")  ? "" : "class='dontshow'";
        var ifndef_value = this.hasOwnProperty ("ifndef")  ? this.ifndef : "";
        t += "<tr "+ ifndef_class + "><td class='trav_prop_name'>Ifndef:</td><td class='editable'>"+ ifndef_value +"</td></tr>";

        var prefun_class = this.hasOwnProperty ("prefun")  ? "" : "class='dontshow'";
        var prefun_value = this.hasOwnProperty ("prefun")  ? this.prefun : "";
        t += "<tr "+ prefun_class + "><td class='trav_prop_name'>PreFun:</td><td class='editable'>"+ prefun_value +"</td></tr>";

        var postfun_class = this.hasOwnProperty ("postfun")  ? "" : "class='dontshow'";
        var postfun_value = this.hasOwnProperty ("postfun")  ? this.postfun : "";
        t += "<tr "+ postfun_class + "><td class='trav_prop_name'>PostFun:</td><td class='editable'>"+ postfun_value +"</td></tr>";
        return t + "</table>"

    }},
    {"<>":"td","class":"editable travuser", "html": function () {
        var t = "";
        if (this.hasOwnProperty ("travuser"))
            return nodes_to_hreflist (this.travuser);
        else
            return ""
    }},
    {"<>":"td", "class":"editable traverror", "html": function () {
        var t = "";
        if (this.hasOwnProperty ("traverror"))
            return nodes_to_hreflist (this.traverror);
        else
            return ""
    }},
    {"<>":"td","class":"editable travnone", "html": function () {
        var t = "";
        if (this.hasOwnProperty ("travnone"))
            return nodes_to_hreflist (this.travnone);
        else
            return ""
    }},
    {"<>":"td","class":"cntr","html":[
        {"<>":"div","class":"button","onclick": function(e) {
            if (confirm ("Are you sure you want to delete " + e.obj.id + "?" )) {
                $(e.event.target).closest("tr").remove();
                // FIXME Update json object as well!
            }},
            "html":"✗"}
    ]},
    {"<>":"td","class":"cntr","html":[
        {"<>":"div","class":"button","onclick": function(e) {
                $(e.event.target).closest("tr").find(".dontshow").css("visibility", "visible");
                $(e.event.target).closest("tr").find(".editable").prop("contenteditable", "true");
                // Make travuser editable
                var l = $(e.event.target).closest("tr").find(".travuser");
                var o = traversals_json[e.obj.id];
                // In case we didn't save JSON yet, `o` can be undefined.
                if (typeof o != 'undefined') {
                    if (o.hasOwnProperty ("travuser"))
                        l.html (nodes_to_list (o.travuser));
                    // Make travnone editable
                    l = $(e.event.target).closest("tr").find(".travnone");
                    o = traversals_json[e.obj.id];
                    if (o.hasOwnProperty ("travnone"))
                        l.html (nodes_to_list (o.travnone));
                    // Make traverror editable
                    l = $(e.event.target).closest("tr").find(".traverror");
                    o = traversals_json[e.obj.id];
                    if (o.hasOwnProperty ("traverror"))
                        l.html (nodes_to_list (o.traverror));
                }
            },
            "html":"Edit"}
    ]}

]};

function update_traversals () {
    ids = [];
    $("#traversals-table tr.traversal_row").each (function (i, n) {
        var r = $(n);
        var id = r.find('td:eq(0)').text();
        ids.push (id);

        var o = {};
        if (attrtypes_json.hasOwnProperty (id))
            o = attrtypes_json[name];

        o['name'] = r.find('td:eq(1)').text();

        var tab = r.find('.trav_prop_table');
        o['default'] = tab.find ('td:eq(1)').text();
        o['include'] = tab.find ('td:eq(3)').text();
        let ifndef = tab.find ('td:eq(5)').text();
        if (ifndef != "")
            o['ifndef'] = ifndef;
        let prefun = tab.find ('td:eq(7)').text();
        if (prefun != "")
            o['prefun'] = prefun;
        let postfun = tab.find ('td:eq(9)').text();
        if (postfun != "")
            o['postfun'] = postfun;

        let sep = /\s*,\s*/;
        let travuser = r.find (".travuser").text ();
        // XXX I am not sure this can be ever empty...
        if (travuser != "")
            o['travuser'] = travuser.split (sep);

        let traverror = r.find (".traverror").text ();
        if (traverror != "")
            o['traverror'] = traverror.split (sep);

        let travnone = r.find (".travnone").text ();
        if (travnone != "")
            o['travnone'] = travnone.split (sep);

        traversals_json[id] = o;
    });

    // Get rid of the old keys that are not in the table
    // --- they might have been renamed or derleted.
    Object.keys (traversals_json).forEach (function(id) {
        if (!ids.includes (id)) {
            delete traversals_json[id];
        }
    });

    // FIXME Sort the object over the key.
}

function get_traversals_json () {
    update_traversals ();
    get_json (traversals_json, "traversals_ast.json")
}

function add_traversals_row () {
    $("#traversals-table").json2html({
        'id': 'TravID',
        'name': 'TravName',
        'default': 'sons',
        'include': '&lt;headerfile&gt;.h'},
        transform_traversals);
}



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

// uses FileSaver.js
function update_attrtypes () {
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
        o['persist'] = r.find('td:eq(4)').text();
        o['vtype'] = r.find('td:eq(5)').text();
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
}

function get_attrtypes_json () {
    update_attrtypes ();
    get_json (attrtypes_json, "attrtype_ast.json")
}

function add_attrtypes_row () {
    // FIXME we need to generalise this
    $("#attrtype-table").json2html({
        'id': 'name',
        'ctype': 'ctype',
        'init': 'init',
        'copy': 'copy',
        'persist': '',
        'vtype': ''}, transform_attr);
}



function get_json (o, fname) {
    var blob = new Blob([JSON.stringify(o, undefined, 4)], {type: "application/json;charset=utf-8"});
    saveAs(blob, fname);
}



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
