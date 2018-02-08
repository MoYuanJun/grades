<?php
/* 根据给定给定状态和时间戳 ==> 修改当前订单状态并设置时间 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
require_once '../config/MySQL.php';     //导入数据库连接请求方法+数据库参数

//获取修改后的状态
$state = $_POST['state'];
$time_type = '';
switch($state){
    case '1' : $time_type = 'cart_time'; break;
    case '2' : $time_type = 'buy_time'; break;
    case '3' : $time_type = 'shipments_time'; break;
    case '4' : $time_type = 'receiving_time'; break;
    default : $time_type = null;
}

//修改订单信息 格式 , key=value, key=vale 
$orderInfoStr = $_POST['orderInfo'];

//获取时间戳
$time = $_POST['time'];

//获取商品ID字符串 格式： id or id or id 
$sal_idStr = $_POST['sal_id'];



$sql = "update ".$salesrecord." set state='".$state."', ".$time_type."='".$time."'".$orderInfoStr." 
where sal_id in (".$sal_idStr.");";

/* 执行SQL语句 */
$get = db_implement($sql);

//获取数据库操作影响行数
$row = mysql_affected_rows();

if($row > 0){
    echo $row.'';
}else{
    echo '0';
}

/*
UPDATE table_name
SET column1=value1,column2=value2,...
WHERE some_column=some_value;





*/






















