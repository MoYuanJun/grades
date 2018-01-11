<?php

/* 数据库信息 */
$users = 'users';  //用户表
$commodity = 'commodity'; //商品列表


/* 封装方法  ==> 连接数据库 并执行可执行SQL语句*/
function db_implement ($sql){
  /* 数据库账号密码 */
  $db_url = 'localhost'; //IP
  $db_name = 'root';  //账号
  $db_password = 'root';  //密码
  $db= 'grades';  //数据库名称

  /* 连接数据库 */
  //【第一步】连接数据库系统 参数：ip 账号 密码
  $con = mysql_connect($db_url,$db_name,$db_password);
  if(!$con){ //进行检测是否连接成功
    echo mysqli_error();//返回上一次连接时的刺猬
  } 

  //【第二步】从数据库系统中选择要操作的数据库 参数：数据库 数据库系统
  mysql_select_db($db,$con);

  //【第三步】请求(执行)SQL语句 并返回
  return mysql_query($sql);
}



