"use strict";

var svg2base64 = require('../lib/svg2base64.js');

// svg string
var svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="300px" height="80">'
  + '<text x="150" y="40" dy=".4em" font-size="50px" text-anchor="middle">'
  + 'Hello World!'
  + '</text>'
  + '</svg>';

var scale = 4;

// convert svg to base64 encoded image
svg2base64(svg, {
  "scale": scale,
  "id": "svg",
  "type": 'png'
});

// convert svg to base64 encoded image with added css
svg2base64(svg, {
  "scale": scale,
  "id": "svgCss",
  "type": 'png',
  "css": "text { fill: #735ce8; stroke: #33d8b8; }"
});

// convert svg to base64 encoded image with gradient (css+defs)
svg2base64(svg, {
  "scale": scale,
  "id": "svgWithGradient",
  "type": 'png',
  "defs": 
  "<linearGradient id='gradient' "
  + "x1='0' y1='0' x2='" + 300 * scale + "' y2='0' "
  + "gradientUnits='userSpaceOnUse'> "
  + "<stop offset='0%' style='stop-color:#735ce8'/> "
  + "<stop offset='100%' style='stop-color:#33d8b8'/> "
  + "</linearGradient>",
  "css": "text { fill: url(#gradient); }"
});

