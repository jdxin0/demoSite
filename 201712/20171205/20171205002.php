<?php
$timestamp = time();
$myfile = fopen("timestamp.ssi", "w") or die("Unable to open file!");
$txt = "<!--#set var='version' value='".$timestamp."'-->\n";
fwrite($myfile, $txt);
$txt = "<!--#set var='domain' value='http://www.xuliehaonet.com/'-->\n";
fwrite($myfile, $txt);
fclose($myfile);
?>