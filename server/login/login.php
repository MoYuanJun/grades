<?php
/* 登录判断 */
/**
 * 通过post方式调用接口
 * 传入userName和password
 * 输出：users表中所有通过username和password查询到的数据;外加一条error数据，表示登录状态
 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

//数据获取封装函数库 
require_once('../config/MySQL.php');

/* 获取通过post方法传来的账号密码 */
$password = md5($_POST['password']);
$userName = $_POST['userName'];


//编写SQL并通过封装的函数db_implement传入可执行SQL返回结果
$sql = "select * from `users` where `username`='".$userName."' and `password`='".$password."'";
$set = db_implement($sql);

//查询语句执行后返回的是一堆字符集；
//那么我们需要对返回的字符集进行处理才能够供我们使用；
//PHP提供了很多对查询结果进行处理的函数；这里我们只选择一种进行测试
$result = mysql_fetch_assoc($set);//对查询语句结果进行处理 格式化

/* 判断数据是否存在 且通过一个error字段来监控 */
if($result){
  $result['error']=200;
}else{
  $result['error']=404;
}
//返回输出==>测试
echo json_encode($result);
/* 输出格式：
addr:"东方学院"
date:"2017-12-31 14:49:42"
error:200    //200表示登录成功，404则是登录失败
password:"2b48d5827d32f72fab2e329f80b4950c"
phone:"13950429872"
u_id:"1"
username:"qianyin"

*/
