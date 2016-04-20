<?php
include_once "dbset.php";

$get_windinterval = $_GET["wind_interval"];
$get_windmin = $_GET["wind_min"]/1000;
$get_windmax = $_GET["wind_max"]/1000;

$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);

if($mysql->connect_errno)die("error".$mysql->connect_error);
$mysql->query("SET time_zone = '+00:00'");

if($get_windinterval && $get_windmin && $get_windmax ){
    $res = $mysql->query("SELECT DATE_FORMAT(`datetime`,'%Y,%m,%d,%H,%i,%S') AS `datetime`,`value` FROM `log_wind_p` WHERE UNIX_TIMESTAMP(`datetime`) BETWEEN $get_windmin AND $get_windmax ORDER BY `datetime` ASC");
}
else{
    $res = $mysql->query("SELECT DATE_FORMAT(`datetime`,'%Y,%m,%d,%H,%i,%S') AS `datetime`,`value` FROM `log_wind_p` WHERE minute(datetime) BETWEEN 0 AND 4 ORDER BY `datetime` ASC");
}
$row = $res->fetch_assoc();
echo "[";
while($row){
    $answer_json=json_encode($row);
    echo $answer_json;
    $row = $res->fetch_assoc();
    if($row) echo ",";
}
//echo "]";
$res->close();
$res = $mysql->query("SELECT DATE_FORMAT(`datetime`,'%Y,%m,%d,%H,%i,%S') AS `datetime`,`value` FROM `log_wind_p` WHERE `datetime`=(SELECT MAX(`datetime`) FROM `log_wind_p`)");
$row = $res->fetch_assoc();
echo ",";
echo json_encode($row);
echo "]";
$mysql->close();