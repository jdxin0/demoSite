<meta charset="utf-8">
<?php

$file = $_FILES['file'];//得到传输的数据

//得到文件名称
$name = $file['name'];
$type = strtolower(substr($name,strrpos($name,'.')+1)); //得到文件类型，并且都转化成小写
$allow_type = array('jpg','jpeg','gif','png'); //定义允许上传的类型
//判断文件类型是否被允许上传
if(!in_array($type, $allow_type)){
    //如果不被允许，则直接停止程序运行
    return ;
}
//判断是否是通过HTTP POST上传的
if(!is_uploaded_file($file['tmp_name'])){
    //如果不是通过HTTP POST上传的
    return ;
}
$upload_path = "./img/"; //上传文件的存放路径
//开始移动文件到相应的文件夹
if(move_uploaded_file($file['tmp_name'],$upload_path.$file['name'])){
	$json_string = file_get_contents("headimg.json");// 从文件中读取数据到PHP变量
	$data = json_decode($json_string,true);// 把JSON字符串转成PHP数组
	$data["img"]=$upload_path.$file['name'];
	$json_strings = json_encode($data);
	if (file_put_contents("headimg.json",$json_strings)) {
		echo "写入成功";
	}else{
		echo "写入失败";
	}
    echo "Successfully!";
}else{
    echo "Failed!";
}

?>