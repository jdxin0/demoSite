<?php
	$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
	$txt = "Bill Gates\r\n";
	fwrite($myfile, $txt);
	$txt = "Steve Jobs\r\n";
	fwrite($myfile, $txt);
	fclose($myfile);
?>