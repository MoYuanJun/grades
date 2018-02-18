<?PHP
/* 文件上传 */
header('Access-Control-Allow-Origin:*');

//预定义变量  $_FILES    ===> 文件上传变量 
//$_FILES接收提交过来的文件信息
print_r('<pre>');
print_r($_FILES);
print_r('</pre>');




?>