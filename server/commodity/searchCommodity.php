<?php
/* 搜索 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

//导入数据库连接请求方法+数据库参数
require_once '../config/MySQL.php'; 

//参数处理
if(isset($_GET['searchText'])){ //获取搜索词条
  $searchText = $_GET['searchText'];
  $where = " where com_title like '%".$searchText."%' ";
}
if(isset($_GET['startIndex']) && isset($_GET['dataNumber'])){  //获取搜索索引 以及条数
  $limit = " limit ".$_GET['startIndex'].",".$_GET['dataNumber'];
}
if(isset( $_GET['orderBy']) && isset($_GET['orderType']) ){
  $orderBy = " order by ".$_GET['orderBy']." ".$_GET['orderType'];
}else{
  $orderBy = '';
}
//查询语句
$sql = "select * from ".$commodity.$where.$orderBy.$limit;

//调用封装的方法：执行可执行SQL语句
$get = db_implement($sql);

//对查询语句结果进行处理 格式化==> 每次只能处理一条数据若查询结果有多条数据则需要进行循环遍历
while($row = mysql_fetch_assoc($get)){
  $result['content'][] = $row;
}

/* 对查询结果进行分析 并添加状态位 200查有所值 404并没有查询到任何东西 */
if($result){
  $result['error'] = 200;
}else{
  $result['error'] = 404;
}
/* 对查询的数据进行JSON编码 并输出 */
echo json_encode($result);




/* 
select * from Car where Name like '%型' %通配符代表任意多个字符
select * from Car order by Price asc 按照价格升序排列  desc降序
select count(Code) from Car 查询表中有多少条数据
select max(Price) from Car 取价格的最大值
select min(Price) from Car 取价格的最小值
select sum(Price) from Car 取价格的总和
select avg(Price) from Car 取价格的平均值
select * from Car limit 0,5 跳过几条数据取几条数据
select * from Info where Code='p001' 一个条件查询
select * from Info where Code='p001' and Nation='n001' 多条件 并关系 查询
select * from Info where Name='胡军' or Nation='n001' 多条件 或关系 查询
select * from Car where Price>=50 and Price<=60 范围查询
select * from Car where Price between 50 and 60 范围查询

$sql = "select * from ".$commodity." ".$orderBy." ".$orderByType." limit 0,".$size."";
*/