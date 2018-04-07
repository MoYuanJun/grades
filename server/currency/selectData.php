<?php
/**通用接口 查询数据
 * 模式：post
 * 参数：$_POST['request']: json 格式如下
 * {
 *      tableName: string  //表名
 *      columns: []      //要查询的字段名数组，默认（不传）则表示返回所有字段
 *      where: {    //查询条件，默认（不传）则表示返回所有数据
 *           column: 字段，
 *           value: 值
 *      } 
 *      orderBy: {column：'xxxx' , type: 'DESC'  || 'ASC'} //ASC:升序 默认值 ， 不传则不进行操作,支持多个
 * }
 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php';

/* 先将参数转为对象 */
$request = $_POST['request']; //json对象
$requestObj = json_decode($request); //json => object

//获取要操作的表
$tableName = $requestObj->tableName;

//获取要查询返回的字段数组 => 并按照格式返回字符串
$columnStr = '';
$columnArrInit = array('*');
$columnArr = isset($requestObj->columns) ? $requestObj->columns : Array('*');
$columnStr = getStr($columnArr);

//获取查询条件 
$whereStr = '';
$whereObj = isset($requestObj->where) ? $requestObj->where : false;
if($whereObj){
    //处理查询条件
    //$whereStr = "where {$whereObj->column} = {$whereObj->value}";
    $whereStr = "where {$whereObj->column} = '{$whereObj->value}'";
} else {
    $whereStr = "";
}

//获取排序参数
$orderByStr = '';
$orderByObj = isset($requestObj->orderBy) ? $requestObj->orderBy : false;
if( $orderByObj ){
    //处理排序参数对象
    $orderByStr = "order by {$orderByObj->column} {$orderByObj->type}";
} else {
    $orderByStr = '';
}

//拼接SQL
$sql = "select {$columnStr} from {$tableName} {$whereStr} {$orderByStr}";

//调用封装的方法：执行可执行SQL语句
$get = db_implement($sql);

//对查询语句结果进行处理 格式化==> 每次只能处理一条数据若查询结果有多条数据则需要进行循环遍历
while($row = mysql_fetch_assoc($get)){
  $result['content'][] = $row;
}

/* 对查询结果进行分析 并添加状态位 1查有所值 0并没有查询到任何东西 */
if(isset($result)){
  $result['error'] = '1';
  $result['sql'] = $sql;
}else{
  $result['content'] = array(); //如果查询不到内容 返回空数组
  $result['error'] = '0';
}
/* 对查询的数据进行JSON编码 并输出 */
echo json_encode($result);


//+++++++++++++++ 函数 +++++++++++++++++++++++
function getStr($arr){
    $str = '';
    foreach($arr as $key => $value){
        $str = "{$str}{$value}, ";
    }
    return substr($str, 0, strlen($str)-2);
}

?>