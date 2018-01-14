<?php
/* 获取商品信息 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php'; 

/* get方法调用  参数获取 */
$size = isset($_GET['size']) ?$_GET['size'] : '10' ;                     //获取数据条数
$orderBy = isset($_GET['orderBy']) ? " order by ".$_GET['orderBy'] : ''; //是否对数据进行排序
$orderByType = isset($_GET['orderByType']) ? $_GET['orderByType'] : '';  //排序的方式：desc 为降序 asc为升序，默认为升序

//查询语句
$sql = "select * from ".$commodity." ".$orderBy." ".$orderByType." limit 0,".$size."";

//调用封装的方法：执行可执行SQL语句
$get = db_implement($sql);

//对查询语句结果进行处理 格式化==> 每次只能处理一条数据若查询结果有多条数据则需要进行循环遍历
while($row = mysql_fetch_assoc($get)){
  $result['content'][] = $row;
}

/* 对查询结果进行分析 并添加状态位 200查有所值 404并没有查询到任何东西 */
if($result){
  $result['error'] = 200;
}else{
  $result['error'] = 404;
}
/* 对查询的数据进行JSON编码 并输出 */
echo json_encode($result);
