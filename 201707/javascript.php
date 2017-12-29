<?php
	echo htmlspecialchars('<script type="text/javascript">alert(1);</script>');
	$a=1;
	echo $a?'</br>true':'</br>false';
?>