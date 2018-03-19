<?php
//删除商品数据
/*接口参数：
模式：post
参数：
    - where : json对象 ==> 暂时只存储着商品ID,前端对象格式{ com_id: xxxx }，然后进行JSON编码
    - setKeyValue ：json对象 ==> 要修改字段的键值对，支持修改多个，前端JS对象格式{ key: value, key : value ..... }
*/
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php';

//获取数据  ==>  json
$where = $_POST['where'];
$setKeyValue = $_POST['setKeyValue'];

$where_obj = json_decode($where);  //转为对象
$setKeyValue_obj = json_decode($setKeyValue);//转为对象

//遍历要修改的参数数组
$setKeyValue_sql = "";
foreach($setKeyValue_obj as $key => $value) {
    $setKeyValue_sql = $setKeyValue_sql."{$key}='{$value}', ";
}
$setKeyValue_sql = substr($setKeyValue_sql, 0, -2);//移除最后一个逗号

//编写SQL

$sql = "update {$commodity} set {$setKeyValue_sql} where com_id='{$where_obj->com_id}'"; 

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

//PHP文件内容结束后不能有其他内容（包括空行）会被输出
?>