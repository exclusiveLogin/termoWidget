<?php
$logindb="host1418693";
$passdb="b2685de7";
$dbhost="localhost";
$dbname="host1418693_zasyzran";

$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);

if($mysql->connect_errno)die("error".$mysql->connect_error);

$res = $mysql->query("SELECT AVG(`value`) AS value  FROM `log_temp0` WHERE date(`datetime`) = date(now())  ORDER BY `id` ASC");

$row = $res->fetch_assoc();
$tempavg = round($row["value"],1);
echo $tempavg;
$res->close();
if($tempavg){
    $res = $mysql->query("INSERT INTO `log_avg` (`value`) VALUES('$tempavg')");
    //Наличие записей в табл сред значений
    $res = $mysql->query("SELECT COUNT(*) AS `count` FROM `log_sad`");
    $row = $res->fetch_assoc();
    $sadcnt = $row["count"];
    echo "sadcnt:".$sadcnt;
    if($sadcnt){//если есть выбираем последнюю
        $res = $mysql->query("SELECT MAX(`id`),`value` FROM `log_sad`");
        $row = $res ->fetch_assoc();
        $res->close();
        $oldtemp = $row["value"];
        $newtemp = $tempavg+$oldtemp;
        if($tempavg>=10){
            $res = $mysql->query("INSERT INTO `log_sad` (`value`) VALUES('$newtemp')");
        }
        else{
            $res = $mysql->query("INSERT INTO `log_sad` (`value`) VALUES('$oldtemp')");
        }
    }
    else{//если нет то просто пишем
        if($tempavg>=10){
            $res = $mysql->query("INSERT INTO `log_sad` (`value`) VALUES('$newtemp')");
        }
        else{
            $res = $mysql->query("INSERT INTO `log_sad` (`value`) VALUES('0')");
        }
    }
}
else{
    echo "<br> Result not allow:".$res;

}
$mysql->close();