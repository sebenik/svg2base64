"use strict";
var system = require('system');
/*global phantom: false*/

var webpage   = require("webpage");
var svgSource = system.stdin.read();

if (phantom.args.length !== 2) {
    console.error("Usage: converter.js svgSource scale id");
    phantom.exit();
} else {
    convert(svgSource, Number(phantom.args[0]), phantom.args[1]);
}

function convert(source, scale, id) {
    var page = webpage.create();

	try {
		page.content = source;
	}
	catch (e) {
		console.error(e);
		phantom.exit();
	}

    setTimeout(function () {
        page.zoomFactor = scale;
  		//page.render('./'+id+'.png');
        console.log(id + page.renderBase64('PNG')); //Output to stdout
        phantom.exit();
    }, 0);
}
