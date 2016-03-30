<?php
echo "{";
include_once "dbset.php";

$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);

echo '"errors":';
if($mysql->connect_errno){
//    echo '1,';
//    echo '"error":"'.$mysql->connect_error.'"}';
    die("\"error\":\"'.$mysql->connect_error.'\"");
}else echo '0,';



echo '"widget":[';
$res = $mysql->query("SELECT * FROM `termort`");
$row = $res->fetch_assoc();
while($row){
    $answer_json=json_encode($row);
    echo $answer_json;
    $row = $res->fetch_assoc();
    if($row) echo ",";
}

echo '],"avg":';
$res = $mysql->query("SELECT AVG(`value`) AS value  FROM `log_temp0` WHERE date(`datetime`) = date(now())  ORDER BY `id` ASC");
$row = $res->fetch_assoc();
while($row){
    $row["value"] = round($row["value"],1);
    $answer_json=json_encode($row);
    echo $answer_json;
    $row = $res->fetch_assoc();
    if($row) echo ",";
}
echo '}';

$res->close();
$mysql->close();
