"use strict";
/*global phantom: false*/

var system = require('system');
var webpage = require("webpage");
var svgSource = system.stdin.read();

if (phantom.args.length !== 4) {
  console.error("Usage: converter.js svgSource scale type width height");
  phantom.exit();
} else {
  convert(svgSource, Number(phantom.args[0]), phantom.args[1], Number(phantom.args[2]), Number(phantom.args[3]));
}

function convert(source, scale, type, width, height) {
  var page = webpage.create();

  try {
    page.content = source;
  }
  catch (e) {
    console.error(e);
    phantom.exit();
  }

  page.viewportSize = {
    width: width,
    height: height
  };

  setTimeout(function () {
    page.zoomFactor = scale;
    console.log(page.renderBase64(type));
    phantom.exit();
  }, 0);
}
