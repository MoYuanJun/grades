<?php
/* <!-- 获取唯一ID方法 --> */
/**
 * @param { string } prefix 设置固定前缀 
 * @return { string } 返回唯一ID ；长度为：前缀 + 下划线 + 32位度经md5加密过的字符串
 */
function getIDFunc($prefix){
  $str = md5(uniqid(rand(), true)); //返字符长32位
  return $prefix.'_'.$str;
}

// echo getID('uid');   ==>  uid_80420b09a1e54b252922f50d029bbba0 
/**
 * rand()    函数返回随机整数。可选参数 min和max为随机数指定范围
 * uniqid()  函数基于以微秒计的当前时间，生成一个唯一的 ID。可选参数：
 *       ==> prefix 可选。为 ID 规定前缀。如果两个脚本恰好在相同的微秒生成 ID，该参数很有用。
 *       ==> more_entropy可选。规定位于返回值末尾的更多的熵
 * md5()    函数将给定字符进行MD5加密
 */