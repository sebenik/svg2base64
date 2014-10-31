"use strict";
process.stdout.setMaxListeners(0);

var path         = require("path");
var stream       = require("stream");
var childProcess = require("child_process");
var phantomjsCmd = require("phantomjs").path;

var converterFileName = path.resolve(__dirname, "./converter.js");

module.exports = function svgToPngBase64(sourceSvg, options) {
	if (typeof options.scale === "undefined") var scale = 1;
	if (typeof options.id === "undefined") {
		var id = '';
	} else {
		var id = options.id + ' ';
	}

    var args    = [converterFileName, scale, id];
	var phantom = childProcess.spawn(phantomjsCmd, args);
	//phantom.stdout.pipe(process.stdout);
	var buffer = '';
	phantom.stdout.on('data', function(data){
		buffer += ('' + data);
	});
	phantom.stdout.on('end', function(){
		console.log(buffer.trim());
	});

	var readable   = new stream.Readable();
	readable._read = function noop() {};
	readable.push(sourceSvg);
	readable.push(null);

	readable.pipe(phantom.stdin);
};
