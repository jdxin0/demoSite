<?php
// $callback=$_GET['callback'];
// $result=json_encode(array('data'=>array('places'=>6),'ret'=>100,'msg'=>'获取成功！'));
// echo $callback."($result)"; 
header("Access-Control-Allow-Origin: *");
echo json_encode(array('data'=>array('places'=>6),'ret'=>100,'msg'=>'获取成功！'));
// echo json_encode({a:1,b:2});
?>

