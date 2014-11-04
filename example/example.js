var svg2base64 = require('../lib/svg2base64.js');

var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="300px" height="80"><text x="150" y="40" dy=".4em" font-size="50px" text-anchor="middle">Hello World!</text></svg>';

svg2base64(svg,
	{
		"scale":4,
		"id":"mySvg",
		"type":'png'
	});
