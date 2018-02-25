<?php
/* 注册插入语句*/
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

/* 导入封装的方法 */
require_once '../config/MySQL.php';  //数据库连接 执行方法
require_once '../func/judgeUserFunc.php'; //获取判断用户是否存在的封装函数
require_once '../func/getIDFunc.php';   //生成唯一ID方法

/* 获取账号密码  生成唯一ID */
$userName = $_POST['userName'];
$password = md5($_POST['password']);
$id = getIDFunc('uid') ;

//后端再次进行验证 ： 当前用户是否已存在
if(judgeUserFunc($userName, "db_implement") === 404){
  $sql = "insert into ".$users." (`u_id`,`username`,`password`) values ('".$id."','".$userName."','".$password."');";
  /* 调用封装的 SQL执行方法 */
  db_implement($sql);

  //获取数据库操作影响行数
  $row = mysql_affected_rows();

  /* 判断是否插入语句成功：即注册成功 */
  if($row === 1){
    /* 注册成功则返回1 接下来登录 ==> 获取用户数据 */
    $sql = "select * from `users` where `username`='".$userName."' and `password`='".$password."'";
    $set = db_implement($sql); //执行可执行SQL语句
    $result = mysql_fetch_assoc($set);//对查询语句结果进行处理 格式化
    $result['error'] = 200;
  }else{
    /* 注册失败则返回404 */
    $result['error'] = 404;
  }
}else{
  //注册失败，当前用户存在返回403
  $result['error'] = 403;
}
echo json_encode($result);













