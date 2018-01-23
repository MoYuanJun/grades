<?php
/* 通过商品ID获取单个商品信息 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php';

//查询语句
$sql = "select * from ".$commodity." where com_id=".$_GET['comId'];

//调用封装的方法：执行可执行SQL语句
$get = db_implement($sql);

//对查询语句结果进行处理 格式化==> 只有一条数据 无需循环
$result = mysql_fetch_assoc($get);

/* 对查询结果进行分析 并添加状态位 200查有所值 404并没有查询到任何东西 */
if($result){
  $result['error'] = 200;
}else{
  $result['error'] = 404;
}
/* 对查询的数据进行JSON编码 并输出 */
echo json_encode($result);







