<?php
header("Access-Control-Allow-Origin: *");
$result=json_encode(array('data'=>array('tbUrl'=>'http://www.yanhu.com/201708/images/images01.png','tbWidth'=>319,'tbHeight'=>158),'result'=>0,'msg'=>'获取成功！'));
echo $result; 
// echo json_encode(array('data'=>array('places'=>6),'ret'=>100,'msg'=>'获取成功！'));
// echo json_encode({a:1,b:2});
?>

