<?php
/**通用插入一条数据方法
 * 模式：post
 * 参数：$_POST[request]: json
 * JSON字符串对应JS对象格式：
 * {
 *      tableName: string,                    //表名称
 *      columns：['cal_id', 'age', 'name']    //要更新的字段：值
 *      values: ['前缀id', '12', 'name']      //要插入字段值, 第一个值 ID前缀
 *      key: {column：'xxxx' , value: ''}     //键值，键值，表示将要判断不可重复字段值； 可选；表示多条数据间字段xxx不可重复，value是本次要插入数据xxx字段的值
 * }
 * 返回格式：
 * {
 *      error: '0' || '1'    //1成功   0失败
 *      num:   number , 
 *      sql: ''
 * }
 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php';
//生成唯一ID方法
require_once '../func/getIDFunc.php';

$request = $_POST['request']; //json对象
$requestObj = json_decode($request); //json => object
$columnStr = getColumnStr($requestObj->columns);
$valueStr = getValueStr($requestObj->values);

//若果需要则进行判断 将要插入的数据是否已存在
$num = 0;
if(isset($requestObj->key)){
    $numSql = "select * from {$requestObj->tableName} where {$requestObj->key->column}='{$requestObj->key->value}'";
    $get =  db_implement($numSql);
    $num = mysql_num_rows($get);
    $result['num'] = $num;
}

//不存在则进行插入操作
if( $num === 0){
    $sql = "insert into {$requestObj->tableName} {$columnStr} values {$valueStr};";
    $result['sql'] = $sql ;

    //执行SQL语句
    db_implement($sql);

    //获取数据库操作影响行数
    $row = mysql_affected_rows();

    // 判断是否插入语句成功 : 成功：1 ， 失败：0 
    if($row === 1){
        //添加成功 
        $result['error'] = '1';
    }else{
        //添加失败
        $result['error'] = '0';
}
}else{
    $result['error'] = '0';
    $result['errorText'] = '当前数据已存在！';
}
echo json_encode($result);

/* ********************************************************************** */
//字符串格式化将[a, b, c,]  => (a, b, c)
function getColumnStr($arr){
    $str = '(';
    foreach($arr as $value){
        $str .= "{$value},";
    }
    $str = substr( $str,0, strlen($str)-1 );
    $str .= ')';
    return $str;
}
//字符串格式化将[a, b, c,]  => ('a', 'b', 'c') 
function getValueStr($arr){
    $str = '(';
    foreach($arr as $key => $value){
        if($key === 0 ){
            $id = getIDFunc($value);
            $value = $id;
        }
        $str .= "'{$value}',";
    }
    $str = substr( $str,0, strlen($str)-1 );
    $str .= ')';
    return $str;
}

/* 
INSERT INTO table_name (column1,column2,column3,...)
VALUES (value1,value2,value3,...);
*/
?>