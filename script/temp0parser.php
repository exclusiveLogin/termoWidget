<?php
include_once "dbset.php";

$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);

if($mysql->connect_errno)die("error".$mysql->connect_error);
$mysql->query("SET time_zone = '+00:00'");
$res = $mysql->query("SELECT DATE_FORMAT(`datetime`,'%Y,%m,%d,%H,%i,%S') AS `datetime`,`value` FROM `log_temp0` WHERE minute(datetime) BETWEEN 0 AND 4 ORDER BY `datetime`");

$row = $res->fetch_assoc();
echo "[";
while($row){
    $answer_json=json_encode($row);
    echo $answer_json;
    $row = $res->fetch_assoc();
    if($row) echo ",";
}
echo "]";
$res->close();
$mysql->close();