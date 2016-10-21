[Click here to get this package from www.npmjs.com.](https://www.npmjs.com/package/svg2base64)

### Convert SVGs to images and output them to stdout as base64 (PhantomJS)

If you want to convert SVG to image from some other script like (PHP, Python, ...) or for whatever reason you need an image to be encoded in base64, you can use this.

#### Changelog:
**v1.0.6** You can specify additional _css_ and _defs_ options to style your SVGs.

#### Examples:
```javascript
var svg2base64 = require('../lib/svg2base64.js');

// svg string
var svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="300px" height="80">'
  + '<text x="150" y="40" dy=".4em" font-size="50px" text-anchor="middle">'
  + 'Hello World!'
  + '</text>'
  + '</svg>';

var scale = 4;
```

Convert svg to base64 encoded image
```javascript
svg2base64(svg, {
  "scale": scale,
  "id": "svg",
  "type": 'png'
});
```
![](https://raw.githubusercontent.com/sebenik/svg2base64/master/example/svg.png)

Convert svg to base64 encoded image with added css
```javascript
svg2base64(svg, {
  "scale": scale,
  "id": "svgCss",
  "type": 'png',
  "css": "text { fill: #735ce8; stroke: #33d8b8; }"
});
```
![](https://raw.githubusercontent.com/sebenik/svg2base64/master/example/svgCss.png)

Convert svg to base64 encoded image with gradient (css+defs)
```javascript
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
```
![](https://raw.githubusercontent.com/sebenik/svg2base64/master/example/svgWithGradient.png)


You can run this from PHP for example:
```php
exec('node example.js', $images);

foreach($images as $img) {
	$img = explode(' ', $trim($img))
	if(sizeof($img) == 2) {
		$imgID = $img[0];
		$imgData = $img[1];
		// Do with your base64 image what you want (we can just save it)
		file_put_contents($imgID.'.png', base64_decode($imgData));
	}
}
```

#### Usage:
svg2base64(svg, {options})

1. svg: svg String
2. options
	* '**_scale_**':  scale factor (default: 1)
	* '**_id_**':     useful (or basically needed) in parallel conversion. If you are converting multiple images in async, id must be used to determine which base64 string represents certain image. (default: empty string)
	* '**_type_**':   image type ('png' or 'jpeg'; default: 'png')
	* '**_width_**':  image width (default: svg width)
	* '**_height_**': image height (default: svg height)
	* '**_defs_**':    defs string (default: empty string) [MDN ref](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs)
	* '**_css_**':     css string (default: empty string)

#### Output:
Each base64 image string is outputted in one row of stdout. If id for the image is set, id and base64 image data are delimited with space char.

id base64_image<br />
id base64_image<br />
...

```
mySvg iVBORw0KGgoAAAANSUhEUgAABNAAAAGACAYAAABshJ+1AAAABHNCSVQICAgIfAhkiAAAAA...
```


