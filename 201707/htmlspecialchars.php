<?php
	header("Access-Control-Allow-Origin: *");
	$jsoncallback = htmlspecialchars($_REQUEST ['callback']);
	$arr=array(
		"result"=>"20",
		"msg"=>"ok",
		"data"=>array(
			"joinTimes"=>"1599",
			"noticeTimes"=>"799",
			"prizelist"=>array(
				array("prize"=>"大疆无人机","nickname"=>"Man***r"),
				array("prize"=>"会员限量版T恤","nickname"=>"Sun***颖"),
				array("prize"=>"iPhone 7 Plus","nickname"=>"Man***r"),
				array("prize"=>"10元红包","nickname"=>"裤裆里***炮"),
				array("prize"=>"会员限量版T恤","nickname"=>"愿隐山***间"),
				array("prize"=>"17元红包","nickname"=>"枫叶***语"),
				array("prize"=>"Insta360","nickname"=>"[良辰***]"),
				array("prize"=>"35元红包","nickname"=>"Car***e"),
			)
		)
	);
	$ret=$jsoncallback."(".json_encode($arr).")";
	echo $ret;
	// echo 'hello '.$_REQUEST['nickname'];
?>