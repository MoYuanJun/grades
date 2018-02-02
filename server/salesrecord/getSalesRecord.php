<?php
/* 根据用户u_id ==> 获取用户的所有订单 */

header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
require_once '../config/MySQL.php';     //导入数据库连接请求方法+数据库参数

/* 获取用户 ID */
//$u_id = 'uid_7d71f8df381b7b53e1eb29ede7424e98';
$u_id = $_POST['u_id'];
/* 编写 SQL查询语句 */
$sql = "select * from ".$salesrecord." where u_id='".$u_id."'";

/* 执行SQL语句 */
$get = db_implement($sql);

/* 循环遍历结果 */
while($rows = mysql_fetch_assoc($get)){
    /* 获取商品ID  编写并编写获取商品信息 添加到结果集中 */
    $getComSql = "select * from ".$commodity." where com_id='".$rows['com_id']."'";
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


 