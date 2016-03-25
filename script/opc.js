var Global={};
Global["wind"]=888;
Global["temp0"]=888;
Global["temp15"]=888;
Global["temp60"]=888;
Global["tempavg"]=.888;
Global["wind_p"]=888;
Global["windavg"]=888;
Global["upd"]="---";
Global["timestamp"]=0;
Global["dateandtime"]=0;

var windTrend = new Array();
var windTrend_p = new Array();
var temp0Trend = new Array();
var temp15Trend = new Array();
var temp60Trend = new Array();
var tempAVGTrend = new Array();
var tempSadTrend = new Array();
var timestampplot = new Date().getTime();



$(document).ready(function(){
    refresh_opc();
    setInterval(refresh_opc,10000);
    setInterval(refresh_trends,300000);
});
function refresh_opc(){
    //Не нужен если есть CRON
    /*$.ajax({
     url:"script/refresher.php",
     method:'POST',
     error:function(){
     console.error("Error refresher");
     }
     });*/
    $.ajax({
        url:"script/database.php",
        dataType:"json",
        method:'POST',
        cache:false,
        success:function(data){
            Global.wind = Number(data.widget[0].value);
            Global.temp0 = Number(data.widget[1].value);
            Global.temp15 = Number(data.widget[2].value);
            Global.temp60 = Number(data.widget[3].value);
            Global.tempavg = Number(data.avg.value);
            Global.wind_p = Number(data.widget[4].value);
            Global.upd = data.widget[5].value.substring(11);
            Global.dateandtime = new Date();
            Global.timestamp = Global.dateandtime.getTime();
        },
        error:function(){
            console.error("Error load AJAX data");
        },
        complete:function(){
            if (Global.wind == 0){
                Global.wind = Global.wind_p;
            }
            else if(Global.wind_p == 0){
                Global.wind_p = Global.wind;
            }            
            Global.windavg = (Global.wind + Global.wind_p)/2;            

        }
    });
    
}
function refresh_trends() {
    $.ajax({
        url:"script/windparser.php",
        dateType:'json',
        type:'GET',
        async:false,
        success: function (data) {
            var test = $.parseJSON(data);
            var log;
            for(log in test){
                var arrTimestamp = test[log].datetime.split(',');
                (arrTimestamp[1]<1)?arrTimestamp[1]=arrTimestamp[1]:arrTimestamp[1]-=1;

                var utcTimestamp = Date.UTC(arrTimestamp[0],arrTimestamp[1],arrTimestamp[2],
                    arrTimestamp[3],arrTimestamp[4],arrTimestamp[5]);
                //Decomposition datetime string;
                windTrend[log]=[utcTimestamp,Number(test[log].value)];
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/windparser_p.php",
        dateType:'json',
        type:'GET',
        async:false,
        success: function (data) {
            var test = $.parseJSON(data);
            var log;
            for(log in test){
                var arrTimestamp = test[log].datetime.split(',');
                (arrTimestamp[1]<1)?arrTimestamp[1]=arrTimestamp[1]:arrTimestamp[1]-=1;
                //Decomposition datetime string;
                var utcTimestamp = Date.UTC(arrTimestamp[0],arrTimestamp[1],arrTimestamp[2],
                    arrTimestamp[3],arrTimestamp[4],arrTimestamp[5]);

                windTrend_p[log]=[utcTimestamp,Number(test[log].value)];
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/temp0parser.php",
        dateType:'json',
        type:'GET',
        async:false,
        success: function (data) {
            var test = $.parseJSON(data);
            var log;
            for(log in test){
                var arrTimestamp = test[log].datetime.split(',');
                (arrTimestamp[1]<1)?arrTimestamp[1]=arrTimestamp[1]:arrTimestamp[1]-=1;

                var utcTimestamp = Date.UTC(arrTimestamp[0],arrTimestamp[1],arrTimestamp[2],
                    arrTimestamp[3],arrTimestamp[4],arrTimestamp[5]);
                //Decomposition datetime string;
                temp0Trend[log]=[utcTimestamp,Number(test[log].value)];
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/temp15parser.php",
        dateType:'json',
        type:'GET',
        async:false,
        success: function (data) {
            var test = $.parseJSON(data);
            var log;
            for(log in test){
                var arrTimestamp = test[log].datetime.split(',');
                (arrTimestamp[1]<1)?arrTimestamp[1]=arrTimestamp[1]:arrTimestamp[1]-=1;

                var utcTimestamp = Date.UTC(arrTimestamp[0],arrTimestamp[1],arrTimestamp[2],
                    arrTimestamp[3],arrTimestamp[4],arrTimestamp[5]);
                //Decomposition datetime string;
                temp15Trend[log]=[utcTimestamp,Number(test[log].value)];
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/temp60parser.php",
        dateType:'json',
        type:'GET',
        async:false,
        success: function (data) {
            var test = $.parseJSON(data);
            var log;
            for(log in test){
                var arrTimestamp = test[log].datetime.split(',');
                (arrTimestamp[1]<1)?arrTimestamp[1]=arrTimestamp[1]:arrTimestamp[1]-=1;

                var utcTimestamp = Date.UTC(arrTimestamp[0],arrTimestamp[1],arrTimestamp[2],
                    arrTimestamp[3],arrTimestamp[4],arrTimestamp[5]);
                //Decomposition datetime string;
                temp60Trend[log]=[utcTimestamp,Number(test[log].value)];
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/tempavgparser.php",
        dateType:'json',
        type:'GET',
        async:false,
        success: function (data) {
            var test = $.parseJSON(data);
            var log;
            for(log in test){
                var arrTimestamp = test[log].datetime.split(',');
                (arrTimestamp[1]<1)?arrTimestamp[1]=arrTimestamp[1]:arrTimestamp[1]-=1;

                var utcTimestamp = Date.UTC(arrTimestamp[0],arrTimestamp[1],arrTimestamp[2],
                    arrTimestamp[3],arrTimestamp[4],arrTimestamp[5]);
                //Decomposition datetime string;
                tempAVGTrend[log]=[utcTimestamp,Number(test[log].value)];
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/tempsadparser.php",
        dateType:'json',
        type:'GET',
        async:false,
        success: function (data) {
            var test = $.parseJSON(data);
            var log;
            for(log in test){
                var arrTimestamp = test[log].datetime.split(',');
                (arrTimestamp[1]<1)?arrTimestamp[1]=arrTimestamp[1]:arrTimestamp[1]-=1;

                var utcTimestamp = Date.UTC(arrTimestamp[0],arrTimestamp[1],arrTimestamp[2],
                    arrTimestamp[3],arrTimestamp[4],arrTimestamp[5]);
                //Decomposition datetime string;
                tempSadTrend[log]=[utcTimestamp,Number(test[log].value)];
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}