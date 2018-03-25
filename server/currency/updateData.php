<?php

/**通用更新数据库方法
 * 模式：post
 * 参数：request: json
 * JSON字符串对应JS对象格式：
 * {
 *      tableName: string,                          //表名称
 *      params：{ key: value, key: value, .... }    //要更新的字段：值
 *      where: { column: 字段，value: 值 }           //查询条件
 * }
 * 
 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php';


$request = $_POST['request']; //json对象
$requestObj = json_decode($request); //json => object
$requestObj->params->com_img = str_replace('\\', '\\\\', $requestObj->params->com_img);//对URL字符串进行处理
$params = getStr($requestObj->params); //获取要修改的参数并转为字符串， key='value' , key='value'
$where = "{$requestObj->where->column}='{$requestObj->where->value}'"; //获取条件
$sql = "update {$requestObj->tableName} set $params where {$where} ;";

//执行SQL语句
db_implement($sql);

//获取数据库操作影响行数
$row = mysql_affected_rows();

// 判断是否插入语句成功 : 成功：1 ， 失败：0 
if($row === 1){
    //添加成功 
    $result['error'] = '1';
    $updatedDataSql = "select * from {$requestObj->tableName} where {$where}";
    $set = db_implement($updatedDataSql);
    $updatedData = mysql_fetch_assoc($set);//对查询语句结果进行处理 格式化
    $result['updatedData'] = $updatedData;
}else{
    //添加失败
    $result['error'] = '0';
}
echo json_encode($result);

//将对象转为字符串：{key: 'a', key: 'b'} ==> key = 'a' , key = 'b'
function getStr($obj){
    $str = "";
    foreach($obj as $key => $value) {
        $str = "{$str}{$key}='{$value}' , ";
    }
    return substr($str,0, strlen($str)-2);
}
 /*  知识点
    //JSON编码 以及 对象属性获取
    $json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
    $obj = json_decode($json);
    echo $obj ->a; 

    //遍历对象方法
    $obj = new MyClass();
    foreach($obj as $key => $value) {
        print "$key => $value";
    }
    // 截取字符串substr(开始索引，截取长度)
    substr(str,number, number );

    //获取字符串长度
    strlen(str)
*/
?>