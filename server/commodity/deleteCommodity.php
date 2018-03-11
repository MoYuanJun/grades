<?php
//删除商品数据
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php';

$sql = "delete from {$commodity} where com_id='{$com_id}'";

//调用封装的方法：执行可执行SQL语句
$get = db_implement($sql);

//获取数据库操作影响行数
$row = mysql_affected_rows();

/* 判断是否插入语句成功 */
if($row === 1){
    //添加成功
    echo '200';
}else{
    //添加失败
    echo '404';
}


?>










