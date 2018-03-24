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

$request = $_POST['request']; //json对象
$requestObj = json_decode($request); //json => object
$params = getStr($requestObj->params); //获取要修改的参数并转为字符串， key='value' , key='value'
$where = "{$requestObj->where->column}='{$requestObj->where->value}'"; //获取条件
$sql = "update {$requestObj->tableName} set $params where {$where} ;";


//将对象转为字符串：{key: 'a', key: 'b'} ==> key = 'a' , key = 'b'
function getStr($obj){
    $str = "";
    foreach($obj as $key => $value) {
        $str = "{$str}{$key}='{$value}' , ";
    }
    return substr($str,0, strlen($str)-2);
}

echo $sql;




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