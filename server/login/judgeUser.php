<?php
/* 判断用户是否存在 */
/**
 * 通过post方式调用接口
 * 传入userName
 * 输出：200 或 404 #200表示存在该用户，404表示不存在
 */
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');

//数据获取封装函数库 
require_once '../config/MySQL.php';
//获取封装的判断用户是否存在函数
require_once '../func/judgeUserFunc.php';

/* 获取通过post方法传来的用户名 */
$userName = $_POST['userName'];

//执行：判断当前用户是否已经存在
echo judgeUserFunc($userName,"db_implement");

