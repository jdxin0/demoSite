<?php
//获取回调函数名
$jsoncallback = htmlspecialchars($_REQUEST ['callback']);
//json数据
//输出jsonp格式的数据
// $return=["result"=>"0","msg"=>"ok","data"=>[["name"=>"getuserinfo","title"=>"获取用户详情"],["name"=>"changeuserstatus","title"=>"修改用户状态"],["name"=>"deleteuserinfo","title"=>"删除用户信息"]]];
$return=array("result"=>"0","msg"=>"ok","data"=>array(array("name"=>"getuserinfo","title"=>"获取用户详情"),array("name"=>"changeuserstatus","title"=>"修改用户状态"),array("name"=>"deleteuserinfo","title"=>"删除用户信息")));
$test=$jsoncallback . "(" . json_encode($return) . ")";
echo $test;
?>