<?php
header("Access-Control-Allow-Origin: *");
$callback = $_REQUEST['callback'];
$schoolName = $_REQUEST['schoolName'];
$tel = $_REQUEST['tel'];
$brandInfo = $_REQUEST['brandInfo'];
$schoolDesc = $_REQUEST['schoolDesc'];
$result=json_encode(array('result'=>0,'msg'=>'获取成功！','data'=>array('schoolName'=>$schoolName,'tel'=>$tel,'brandInfo'=>$brandInfo,'schoolDesc'=>$schoolDesc)));
echo $callback."($result)"; 
// echo json_encode(array('data'=>array('places'=>6),'ret'=>100,'msg'=>'获取成功！'));
// echo json_encode({a:1,b:2});
?>

