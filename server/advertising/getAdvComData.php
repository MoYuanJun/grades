<?php
/* 获取所有广告商品数据 
*模式：post get可以获取到所有数据
*参数：{u_id：xxx}  ==> 可选
*若没有给定参数：则默认获取所有数据  ==> 后台就是获取所有数据
*/

header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
require_once '../config/MySQL.php';     //导入数据库连接请求方法+数据库参数


/* 编写 SQL查询语句 */
$sql = "select * from {$advertisingcommodity} ;";

/* 执行SQL语句 */
$get = db_implement($sql);

/* 循环遍历结果 => 通过订单表中的商品id获取商品数据，对数据进行处理组成对象 最后输出 */
while($rows = mysql_fetch_assoc($get)){
    /* 获取商品ID  编写并编写获取商品信息 添加到结果集中 */
    $getComSql = "select * from {$commodity} where com_id='{$rows['com_id']}'";
    $getCom = db_implement($getComSql);
    while($row = mysql_fetch_assoc($getCom )){
        $rows['commodity'] = $row;
    }
    $result['content'][] = $rows;
}

/* 添加状态 */
if(isset($result)){
    $result['error'] = '200';
} else {
    $result['error'] = '404';
}

/* json编码并输出 */
echo json_encode($result);


 