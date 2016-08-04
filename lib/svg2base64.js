"use strict";
//process.stdout.setMaxListeners(0);

var path = require("path");
var stream = require("stream");
var childProcess = require("child_process");
var phantomjsCmd = require("phantomjs").path;
var DOMparser = require('xmldom').DOMParser;

var converterFileName = path.resolve(__dirname, "./converter.js");

module.exports = function svgToPngBase64(sourceSvg, options) {
  var scale  = (typeof options.scale === "undefined") ? 1 : options.scale;
  var id     = (typeof options.id === "undefined") ? '' : options.id + ' ';
  var type   = (typeof options.type === "undefined") ? 'PNG' : options.type;
  var width  = (typeof options.width === "undefined") ? 1 : options.width;
  var height = (typeof options.height === "undefined") ? 1 : options.height;
  var defs   = (typeof options.defs === "undefined") ? "" : options.defs;
  var css    = (typeof options.css === "undefined") ? "" : options.css;

  if(defs !== "" || css !== "") {
    sourceSvg = appendDefs(sourceSvg, defs, css);
  }

  var args = [converterFileName, scale, type, width, height];
  var phantom = childProcess.spawn(phantomjsCmd, args);
  //phantom.stdout.pipe(process.stdout);
  var buffer = id;
  phantom.stdout.on('data', function(data){
    buffer += ('' + data);
  });
  phantom.stdout.on('end', function(){
    console.log(buffer.trim());
  });

  var readable = new stream.Readable();
  readable._read = function noop() {};
  readable.push(sourceSvg);
  readable.push(null);

  readable.pipe(phantom.stdin);
};

function appendDefs(svgString, defs, css) {
  var svg = new DOMparser().parseFromString(svgString);
  var defsNode = svg.createElement("defs");
  var styleNode = svg.createElement("style");
  var svgNode = svg.getElementsByTagName("svg")[0];

  if(defs !== "") {
    var defsContent = new DOMparser().parseFromString(defs);
    defsNode.appendChild(defsContent);
  }

  var cdata = svg.createCDATASection(css);
  styleNode.setAttribute("type", "text/css");
  styleNode.appendChild(cdata);
  defsNode.appendChild(styleNode);
  svgNode.appendChild(defsNode);

  return svgNode.toString();
}

