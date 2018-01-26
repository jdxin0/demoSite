<?php
session_start();

//注销登录
if (isset($_GET['action'])) {
    echo $_GET['action'];
    if($_GET['action'] == "logout"){
        usset($_SESSION);
        setcookie("userid", "", time() - 3600);
        setcookie(session_name(), "", time() - 3600);
        echo '注销登录成功！点击此处 <a href="login.html">登录</a>';
        exit;
    }
}


//登录
if(!isset($_POST['submit'])){
    exit('非法访问!');
}
$username = htmlspecialchars($_POST['username']);
$password = MD5($_POST['password']);

//包含数据库连接文件
include('conn.php');
//检测用户名及密码是否正确
$check_query = mysql_query("select uid from user where username='$username' and password='$password' limit 1");
if($result = mysql_fetch_array($check_query)){
    //登录成功
    session_regenerate_id();
    $_SESSION['username'] = $username;
    $_SESSION['userid'] = $result['uid'];
    setcookie("userid",$result['uid'], time()+3600*24);
    // setcookie("sessionid",, time()+3600*24);
    echo $username,' 欢迎你！进入 <a href="my.php">用户中心</a><br />';
    echo '点击此处 <a href="login.php?action=logout">注销</a> 登录！<br />';
    exit;
} else {
    exit('登录失败！点击此处 <a href="javascript:history.back(-1);">返回</a> 重试');
}
?>