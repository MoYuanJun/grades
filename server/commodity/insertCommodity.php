<?php
/* 获取商品列表 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php';
//生成唯一ID方法
require_once '../func/getIDFunc.php';

//获取参数
$id = getIDFunc('comid');
$com_title = $_POST['com_title'];
$com_img = $_POST['com_img'];
$com_color = $_POST['com_color'];
$com_number = $_POST['com_number'];
$com_size = $_POST['com_size'];
$com_newPrice = $_POST['com_newPrice'];
$com_oldPrice = $_POST['com_oldPrice'];
$com_birthplace = $_POST['com_birthplace'];

$key = " (`com_id`,
        `com_title`,
        `com_img`,
        `com_color`,
        `com_number`,
        `com_size`,
        `com_newPrice`,
        `com_oldPrice`,
        `com_birthplace`) ";
$value = "('".$id."',
        '".$com_title."',
        '".$com_img."',
        '".$com_color."',
        ".$com_number.",
        '".$com_size."',
        '".$com_newPrice."',
        '".$com_oldPrice."',
        '".$com_birthplace."');";


$sql = "insert into ".$commodity.$key." values ".$value;


//执行SQL语句
db_implement($sql);

//获取数据库操作影响行数
$row = mysql_affected_rows();

/* 判断是否插入语句成功 */
if($row === 1){
    //添加成功
    $result['error'] = '200';
}else{
    //添加失败
    $result['error'] = '404';
}
echo json_encode($result);

/* 
客户端必须参数||数据格式：
{
    com_title:'x'       //标题
    com_img:'x',        //图片路径
    com_color: 'x',     //颜色
    com_number:'xx',    //数量
    com_size:'x',       //大小
    com_newPrice:xx,    //现价
    com_oldPrice:'xx',  //原价
    com_birthplace:'xx',//商品发货地
}

*/

?>