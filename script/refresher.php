<?php
$ini_file = "../temp/widget.ini";
$f_exist = file_exists($ini_file);

$logindb="host1418693";
$passdb="b2685de7";
$dbhost="localhost";
$dbname="host1418693_zasyzran";

$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);

if($mysql->connect_errno)die("error db:".$mysql->connect_error);

if ($f_exist){
    $ini_parse = parse_ini_file($ini_file);
    $wind = (float)str_replace(",",".",$ini_parse["windforce"]);
    $wind_p = (float)str_replace(",",".",$ini_parse["windforceprichal"]);
    $temp0 = (float)str_replace(",",".",$ini_parse["temp0"]);
    $temp15 = (float)str_replace(",",".",$ini_parse["temp15"]);
    $temp60 = (float)str_replace(",",".",$ini_parse["temp60"]);
    $upd = $ini_parse["upd"];
    $wind = round($wind,1);
    $wind_p = round($wind_p,1);
    $temp0 = round($temp0,1);
    $temp15 = round($temp15,1);
    $temp60 = round($temp60,1);
    $que = "UPDATE `termort` SET  `value` ='".$wind."' WHERE `name` = 'wind';";
    $que .= "INSERT INTO `log_wind` (`value`) VALUES('$wind')";
    $res = $mysql->multi_query($que);
    while($mysql->next_result()){}

    $que = "UPDATE `termort` SET  `value` ='".$wind_p."' WHERE `name` = 'wind_p';";
    $que .= "INSERT INTO `log_wind_p` (`value`) VALUES('$wind_p')";
    $res = $mysql->multi_query($que);
    while($mysql->next_result()){}

    $que = "UPDATE `termort` SET  `value` ='".$temp0."' WHERE `name` = 'temp0';";
    $que .= "INSERT INTO `log_temp0` (`value`) VALUES('$temp0')";
    $res = $mysql->multi_query($que);
    while($mysql->next_result()){}
    $que = "UPDATE `termort` SET  `value` ='".$temp15."' WHERE `name` = 'temp15';";
    $que .= "INSERT INTO `log_temp15` (`value`) VALUES('$temp15')";
    $res = $mysql->multi_query($que);
    while($mysql->next_result()){}
    $que = "UPDATE `termort` SET  `value` ='".$temp60."' WHERE `name` = 'temp60';";
    $que .= "INSERT INTO `log_temp60` (`value`) VALUES('$temp60')";
    $res = $mysql->multi_query($que);
    while($mysql->next_result()){}
    $que = "UPDATE `termort` SET  `value` ='".$upd."' WHERE `name` = 'updated'";
    $res = $mysql->query($que);
}
else{
    $que = "UPDATE `termort` SET  `value` ='-' WHERE `name` = 'wind'";
    $res = $mysql->query($que);
    $que = "UPDATE `termort` SET  `value` ='-' WHERE `name` = 'temp0'";
    $res = $mysql->query($que);
    $que = "UPDATE `termort` SET  `value` ='-' WHERE `name` = 'temp15'";
    $res = $mysql->query($que);
    $que = "UPDATE `termort` SET  `value` ='-' WHERE `name` = 'temp60'";
    $res = $mysql->query($que);
}

$mysql->close();
