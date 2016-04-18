<?php
include_once "dbset.php";

$get_interval = $_GET["wind_interval"];
$get_min = $_GET["wind_min"]/1000;
$get_max = $_GET["wind_max"]/1000;

//echo "interval".$get_interval;
//echo "min: ".$get_min;
//echo "max: ".$get_max;


$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);

if($mysql->connect_errno)die("error".$mysql->connect_error);
$mysql->query("SET time_zone = '+00:00'");
if($get_interval && $get_min && $get_max ){
    $res = $mysql->query("SELECT DATE_FORMAT(`datetime`,'%Y,%m,%d,%H,%i,%S') AS `datetime`,`value` FROM `log_wind` WHERE UNIX_TIMESTAMP(`datetime`) BETWEEN $get_min AND $get_max ORDER BY `datetime` ASC");
}
else{
//    echo "normal mode";
    $res = $mysql->query("SELECT DATE_FORMAT(`datetime`,'%Y,%m,%d,%H,%i,%S') AS `datetime`,`value` FROM `log_wind` WHERE minute(datetime) BETWEEN 0 AND 4 ORDER BY `datetime` ASC");
}

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