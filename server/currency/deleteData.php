<?php
/**通用数据库删除数据接口
 * 模式：post
 * 参数：$_POST[request]: json
 * JSON字符串对应JS对象格式：
 * {
 *    tableName: string,                          //表名称
 *    where: { column: 字段，value: 值 }           //删除条件必选没有返回错误
 * }
 * 
 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php';


$request = $_POST['request']; //json对象


$requestObj = json_decode($request); //json => object
$where = "{$requestObj->where->column}='{$requestObj->where->value}'"; //获取条件


//先获取到要删除的数据
$deleteDataSql = "select * from {$requestObj->tableName} where {$where}";
$get = db_implement($deleteDataSql);
$deleteData = mysql_fetch_assoc($get);//对查询语句结果进行处理 格式化

//删除数据SQL
$sql = "delete from {$requestObj->tableName} where {$where} ;";

//执行SQL语句
db_implement($sql);

//获取数据库操作影响行数
$row = mysql_affected_rows();

// 判断是否插入语句成功 : 成功：1 ， 失败：0 
if($row === 1){
    //删除成功 
    $result['error'] = '1';
    //返回删除掉的数据
    $result['deleteData'] = $deleteData;
    //返回当前SQL
    $result['sql'] = $sql ;
}else{
    //添加失败
    $result['error'] = '0';
    $result['sql'] = $sql;
}
echo json_encode($result);

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