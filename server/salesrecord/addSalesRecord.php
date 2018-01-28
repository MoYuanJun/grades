<?php
/* 添加订单处理接口 */
/* 通过商品ID获取单个商品信息 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');


require_once '../config/MySQL.php';     //导入数据库连接请求方法+数据库参数
require_once '../func/getIDFunc.php';   //生成唯一ID方法

/* 获取参数 共14条数据参数 生成唯一ID*/
$sal_id         = getIDFunc('salid');
$com_id         = $_POST['com_id'];
$u_id           = $_POST['u_id'];
$u_address      = $_POST['u_address'];                                              //收货地址
$u_phone        = $_POST['u_phone'];                                                //联系方式
$com_color      = $_POST['com_color'];                                              //选择的商品颜色
$com_size       = $_POST['com_size'];                                               //选择的商品尺寸
$com_number     = $_POST['com_number'];                                             //购买数量
$paymentMethod  = $_POST['paymentMethod'];                                          //付款方式 ：1表示货到付款 2 表示在线支付
$state          = $_POST['state'];                                                  //订单状态 : 1表示购物车中 2 表示已下单 3 表示已发货  4表示已收货 
$cart_time      = isset($_POST['cart_time']) ? $_POST['cart_time'] : 0;             //添加到购物车时间
$buy_time       = isset($_POST['buy_time']) ? $_POST['buy_time'] : 0;               //下单时间
$shipments_time = isset($_POST['shipments_time']) ? $_POST['shipments_time'] : 0;   //发货时间
$receiving_time = isset($_POST['receiving_time']) ? $_POST['receiving_time'] : 0;   //收货时间

$sql = "insert into ".$salesrecord.
        " (`sal_id`,`com_id`,`u_id`,`u_address`,`u_phone`,
        `com_color`,`com_size`,`com_number`,`paymentMethod`,
        `state`,`cart_time`,`buy_time`,`shipments_time`,`receiving_time`) 
        values ('".$sal_id."','".$com_id."','".$u_id."','".$u_address."','".$u_phone."','".$com_color."'
        ,'".$com_size."','".$com_number."','".$paymentMethod."','".$state."','".$cart_time."','".$buy_time."'
        ,'".$shipments_time."','".$receiving_time."'
        );";
/* 调用封装的 SQL执行方法 */
db_implement($sql);

//获取数据库操作影响行数
$row = mysql_affected_rows();

/* 判断是否插入语句成功：即注册成功 */
if($row === 1){
    echo 200;
}else{
    echo 404;
}






