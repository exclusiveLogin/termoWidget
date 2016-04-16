<?php
include_once "dbset.php";

$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);

if($mysql->connect_errno)die("error".$mysql->connect_error);

$res = $mysql->query("SELECT AVG(`value`) AS value  FROM `log_temp0` WHERE date(`datetime`) = date(now())  ORDER BY `id` ASC");

$row = $res->fetch_assoc();
$tempavg = round($row["value"],1);
echo 'tempavg:'.$tempavg.'<br>';
$res->close();
if($tempavg){
    $res = $mysql->query("INSERT INTO `log_avg` (`value`) VALUES('$tempavg')");
    //Наличие записей в табл сред значений
    $res = $mysql->query("SELECT COUNT(*) AS `count` FROM `log_sad`");
    $row = $res->fetch_assoc();
    $sadcnt = $row["count"];
    echo "sadcnt:".$sadcnt;
    if($sadcnt){//если есть выбираем последнюю
        $res = $mysql->query("SELECT `value` FROM `log_sad` WHERE `id` = (SELECT MAX(`id`) FROM `log_sad`)");
        $row = $res ->fetch_assoc();
        $oldtemp = $row["value"];
        $newtemp = $tempavg+$oldtemp;
        $res->close();
        echo "oldtemp:".$oldtemp."<br>tempavg:".$tempavg."<br>newtemp:".$newtemp."<br>";
        if($tempavg>=10){
            $res = $mysql->query("INSERT INTO `log_sad` (`value`) VALUES('$newtemp')");
            echo "<br>записали сумму";
        }
        else{
            $res = $mysql->query("INSERT INTO `log_sad` (`value`) VALUES('$oldtemp')");
            echo "<br>записали старое значение";
        }
    }
    else{//если нет то просто пишем
        echo "<br>нет записей в таблице либо ошибка скрипта";
        if($tempavg>=10){
            $res = $mysql->query("INSERT INTO `log_sad` (`value`) VALUES('$newtemp')");
            echo "<br>записали первое значение";
        }
        else{
            $res = $mysql->query("INSERT INTO `log_sad` (`value`) VALUES('0')");
            echo "<br>записали 0";
        }
    }
}
else{
    echo "<br> Result not allow:".$res;

}
$mysql->close();