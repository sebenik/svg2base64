#!/usr/bin/php
<?php
	exec('node example.js', $out, $ret);

	foreach($out as $b64)
	{
		$data = explode(' ',trim($b64));
		if(sizeof($data) == 2)
		{
			$id    = $data[0];
			$image = $data[1];
			file_put_contents($id.'.png', base64_decode($image));
		}
	}
?>
