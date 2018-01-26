<?php  
session_start();
	echo preg_match('/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/', "997948808@163.com");
	echo $_SESSION['username'];
	echo $_SESSION['userid'];
	echo $_COOKIE[session_name()];
?>