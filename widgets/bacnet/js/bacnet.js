/*
	ioBroker.vis bacnet Widget-Set

	version: "0.0.1"

	Copyright 2020 dotti-ba dr.dotti@gmx.de
*/
"use strict";

// add translations for edit mode
$.get( "adapter/bacnet/words.js", function(script) {
	let translation = script.substring(script.indexOf("{"), script.length);
	translation = translation.substring(0, translation.lastIndexOf(";"));
	$.extend(systemDictionary, JSON.parse(translation));
});

// this code can be placed directly in bacnet.html
vis.binds["bacnet"] = {
	version: "0.0.1",
	showVersion: function () {
		if (vis.binds["bacnet"].version) {
			console.log("Version bacnet: " + vis.binds["bacnet"].version);
			vis.binds["bacnet"].version = null;
		}
	},
	createWidget: function (widgetID, view, data, style) {
		var $div = $("#" + widgetID);
		// if nothing found => wait
		if (!$div.length) {
			return setTimeout(function () {
				vis.binds["bacnet"].createWidget(widgetID, view, data, style);
			}, 100);
		}

		var text = "";
		text += "OID: " + data.oid + "</div><br>";
		text += 'OID value: <span class="myset-value">' + vis.states[data.oid + ".val"] + "</span><br>";
		text += 'Color: <span style="color: ' + data.myColor + '">' + data.myColor + "</span><br>";
		text += "extraAttr: " + data.extraAttr + "<br>";
		text += "Browser instance: " + vis.instance + "<br>";
		text += 'htmlText: <textarea readonly style="width:100%">' + (data.htmlText || "") + "</textarea><br>";

		$("#" + widgetID).html(text);

		// subscribe on updates of value
		if (data.oid) {
			vis.states.bind(data.oid + ".val", function (e, newVal, oldVal) {
				$div.find(".bacnet-value").html(newVal);
			});
		}
	}
};

vis.binds["bacnet"].showVersion();