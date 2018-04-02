<?php

    header('Content-type:text/html;charset=utf-8');
    header('Access-Control-Allow-Origin:*');

    $regex = '/^(http|https|ftp):\/\/[A-Za-z0-9]+\.?[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\'\':+!]*([^<>\"\"])*$/';  
    $url = "http://www.baidu.com/grades/test.php";  
$url = "http://localhost/grades/server/currency/test.php";
$url = "http://localhost/grades/server/img/test/1521940805375798.jpg";

if (preg_match($regex, $url)) {   
    
    
    echo "Ture";   
} else {  
  
    echo "False";  
}   
?>


