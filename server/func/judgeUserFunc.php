<?php
/* 判断用户是否存在 */
/**
 * @param { string } $userName 要检测的用户名
 * @param { function } $db_implement 可执行sql语句的方法 
 */
function judgeUserFunc($userName,$db_implement){
  //编写SQL并通过封装的函数db_implement传入可执行SQL返回结果
  $sql = "select * from `users` where `username`='".$userName."'";

  //执行可执行SQL语句
  $set = $db_implement($sql);
  
  //查询语句执行后返回的是一堆字符集；
  //那么我们需要对返回的字符集进行处理才能够供我们使用；
  //PHP提供了很多对查询结果进行处理的函数；这里我们只选择一种进行测试
  $result = mysql_fetch_assoc($set);//对查询语句结果进行处理 格式化
  /* 对查询结果进行判断  => 在这之前需要对查询结果进行处理 格式化 否则将永远是200 */
  if($result){
    /* 存在该用户返回200 */
    return 200;
  }else{
    //不存在该用户返回404
    return 404;
  }
}








