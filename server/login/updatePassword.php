<?php

/* 登录判断 */
/**
 * 通过post方式调用接口
 * old: 原密码
 * new: 新密码
 * uid: 用户ID
 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

//数据获取封装函数库 
require_once('../config/MySQL.php');

$old = md5($_POST['old']);
$new = md5($_POST['new']);
$uid = $_POST['uid'];

$sql = "update {$users} set password = '{$new}' where u_id='{$uid}' and password='{$old}'"; 
$result['sql'] = $sql;
//调用封装的方法：执行可执行SQL语句
$get = db_implement($sql);

//获取数据库操作影响行数
$row = mysql_affected_rows();

/* 判断是否插入语句成功 */
if($row === 1){
    //添加成功
    $result['error'] = '1';
}else{
    //添加失败
    $result['error'] = '0';
}
/* 对查询的数据进行JSON编码 并输出 */
echo json_encode($result);
?>