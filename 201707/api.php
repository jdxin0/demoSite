<?php
// header("Access-Control-Allow-Origin: *");
// $callback=$_GET['callback'];
// $result=json_encode(array('data'=>array('places'=>6),'ret'=>100,'msg'=>'获取成功！'));
// echo $callback."($result)"; 
// echo json_encode(array('data'=>array('places'=>6),'ret'=>100,'msg'=>'获取成功！'));
// echo json_encode({a:1,b:2});
// echo json_encode($_POST);

// $arr = array("red","green","blue","yellow"); 
// for($x=0;$x<10;$x++){
// 	echo $x." ";
// }
// echo "<br/>";
// foreach ($arr as $key => $value) {
// 	echo $key."=".$value;
// 	echo "<br/>";

// }
// $msgData = array(
//     "url" => "https://open.weixin.qq.com/connect/oauth2/",
//     "first" => "您预约的7月开放日活动，已经开始了！",
//     "keyword1" => "领Q币，送限量版会员周边.iPhone 7、4888元现金红包。错过可要再等1年咯",
//     "keyword2" => date("Y-m-d H:i:s"),
//     "keyword3" => "领Q币抽iPhone7 >>",
//     "keyword4" => "立即前往7月会员开放日",
// );
// foreach ($msgData as $key => $value) {
// 	echo $key."=".$value;
// 	echo "<br>";
// }
// define('OPEN_DAY_DIR','/data/vhosts/xunlei.com/dyactive2.vip.xunlei.com/dyactive/src/activelist/2017/vip2017openday3/');
// echo OPEN_DAY_DIR;
/**
* 
*/
require_once("class.php");
echo "<br>";
// testClass::printHello();
$testClass = new testClass();
echo $testClass->printHello();
// echo testClass::printThis();
?>

