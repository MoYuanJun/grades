
<!-- 注册 ： 插入语句 -->
<?php
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

require_once '../config/MySQL.php';

/* 获取账号密码 */
$userName = $_POST['userName'];
$password = md5($_POST['password']);

$sql = "insert into ".$users." (`username`,`password`) values ('".$userName."','".$password."');";
db_implement($sql);

//获取数据库操作影响行数
$row = mysql_affected_rows();

/* 判断是否插入语句成功：即注册成功 */
if($row === 1){
  /* 注册成功则返回1 */
  echo 1;
}else{
  /* 注册失败则返回0 */
  echo 0;
}










