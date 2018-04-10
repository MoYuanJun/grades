<?php
/* 获取所有订单 
*模式：post get可以获取到所有数据
*参数：{u_id：xxx}  ==> 可选
*若没有给定参数：则默认获取所有数据  ==> 后台就是获取所有数据
*/

header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
require_once '../config/MySQL.php';     //导入数据库连接请求方法+数据库参数

/* 获取用户 ID */
//$u_id = 'uid_7d71f8df381b7b53e1eb29ede7424e98';
if(isset($_POST['u_id'])){
    $u_id = $_POST['u_id'];
    $where = " where u_id='{$u_id}' ";
}else {
    $where = " ";
}

/* 编写 SQL查询语句 */
$sql = "select * from {$salesrecord} {$where} order by sal_time desc ";
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

    /* 获取用户ID  编写并编写获取用户信息 添加到结果集中 */
    $getUserSql = "select * from {$users} where u_id='{$rows['u_id']}'";
    $getUser = db_implement($getUserSql);

    while($row = mysql_fetch_assoc($getUser )){
        $rows['user'] = $row;
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


 