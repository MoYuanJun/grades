<?php

$str = '{
    "tableName":"commodity",
    "where":\'{
        "column":
        "com_id",
        "value":
        "1123"}\'
    }';
$objs = json_decode($str);
echo $objs->where->com_id;

?>


