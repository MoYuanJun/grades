<?php
/* 根据给定给定状态和时间戳 ==> 修改当前订单状态并设置时间 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
require_once '../config/MySQL.php';     //导入数据库连接请求方法+数据库参数


$state = '1';
$time_type = '';
switch($state){
    case '1' : $time_type = 'cart_time'; break;
    case '2' : $time_type = 'buy_time'; break;
    case '3' : $time_type = 'shipments_time'; break;
    case '4' : $time_type = 'receiving_time'; break;
    default : $time_type = null;
}

$orderInfo = array();
$orderInfoStr = '';
foreach($orderInfo as $key => $value){
    $orderInfoStr += " ,".$key."='"."$value"."' ";
}

$time = '213213';
$sal_id = 'salid_4b1167c5aa07da62954df1c8bb56ff37';

$sql = "update ".$salesrecord." set state='".$state."', ".$time_type."='".$time.$orderInfoStr."' where sal_id='".$sal_id."';";

echo $sql;

/* 执行SQL语句 */
$get = db_implement($sql);

//获取数据库操作影响行数
$row = mysql_affected_rows();

if($row > 0){
    echo $row;
}

/*
UPDATE table_name
SET column1=value1,column2=value2,...
WHERE some_column=some_value;





*/






















