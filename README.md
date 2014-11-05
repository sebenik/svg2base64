### Convert SVGs to images and output them to stdout as base64 (PhantomJS)

If you want to convert SVG to image from some other script like (PHP, Python, ...) or for whatever reason you need an image to be encoded in base64, you can use this.

#### Example:
```javascript
var svg2base64 = require('svg2base64');

var svg =
		'<svg xmlns="http://www.w3.org/2000/svg" width="300px" height="80">' + 
			'<text x="150" y="40" dy=".4em" font-size="50px" text-anchor="middle">' +
			'Hello World!' +
			'</text>' + 
		'</svg>';                         

svg2base64(svg,
	{
		"scale":4,
		"id":"mySvg",
		"type":'png'
});         
```

That's it.
You can use this from PHP for example:

```php
exec('node example.js', $imges);

foreach($imges as $img)
{
	$img = explode(' ', $trim($img))
	if(sizeof($img) == 2)
	{
		$imgID   = $img[0];
		$imgData = $img[1];
		// Do with your base64 image what you want
		// We can just save it somewhere :)
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

#### Output:
Each base64 image string is outputted in one row of stdout. If id for the image is set, id and base64 image data are delimited with space char.

id base64_image<br />
id base64_image<br />
...

```
mySvg iVBORw0KGgoAAAANSUhEUgAABNAAAAGACAYAAABshJ+1AAAABHNCSVQICAgIfAhkiAAAAA...
```


