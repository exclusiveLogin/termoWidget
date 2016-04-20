var Global={};
Global["wind"]=888;
Global["temp0"]=888;
Global["temp15"]=888;
Global["temp60"]=888;
Global["tempavg"]=888;
Global["wind_p"]=888;
Global["windavg"]=888;
Global["upd"]="---";
Global["timestamp"]=0;
Global["dateandtime"]=0;

Global["windObj"] = false;
Global["tempObj"] = false;
Global["tempSadObj"] = false;

Global['trendConnected'] = false;

Global['firstOpcDataConfirm_wind'] = false;
Global['firstOpcDataConfirm_wind_p'] = false;
Global['firstOpcDataConfirm_temp0'] = false;
Global['firstOpcDataConfirm_temp15'] = false;
Global['firstOpcDataConfirm_temp60'] = false;
Global['firstOpcDataConfirm_tempavg'] = false;
Global['firstOpcDataConfirm_tempsad'] = false;
Global['firstOpcDataConfirm'] = false;

var windTrend = new Array();
var windTrend_p = new Array();
var temp0Trend = new Array();
var temp15Trend = new Array();
var temp60Trend = new Array();
var tempAVGTrend = new Array();
var tempSadTrend = new Array();
var timestampplot = new Date().getTime();

var windStart = false;
var windEnd = false;

var tempStart = false;
var tempEnd = false;

var ajaxOkWind = false; //Маркеры получения данных
var ajaxOkWind_p = false;
var ajaxOkTemp0 = false;
var ajaxOkTemp15 = false;
var ajaxOkTemp60 = false;
var ajaxOkTempAVG = false;
var ajaxOkTempSad = false;

var dataOkWind = false; //Маркеры установки данных
var dataOkWind_p = false;
var dataOkTemp0 = false;
var dataOkTemp15 = false;
var dataOkTemp60 = false;
var dataOkTempAVG = false;
var dataOkTempSad = false;



var ajaxOkWidget = false;


$(document).ready(function(){
    refresh_opc();
    refresh_trends();
    setInterval(refresh_opc,30000);
    setInterval(refresh_trends,600000);
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
            ajaxOkWidget = true;
        },
        error:function(){
            console.log("Error load AJAX data");
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
    refreshWindTrends();
    refreshTempTrends();
    refreshSadTrends();
}
function refreshWindTrends(wind_interval, wind_min, wind_max) {
    $.ajax({
        url:"script/windparser.php",
        type:'GET',
        cache:false,
        //async:false,
        data:{"wind_interval":wind_interval,"wind_min":wind_min,"wind_max":wind_max},
        beforeSend:function () {
            if(Global.trendConnected){
                Global.windObj.showLoading('Подождите идет загрузка данных...');
            }
        },
        success: function (data) {
            windTrend = [];
            windTrend[0]=[0];
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
            if(!Global.firstOpcDataConfirm_wind){
                windStart = windTrend[0][0];
            }else {
                windTrend[0][0]= windStart;
                windTrend[0][1]= 0;
            }
            ajaxOkWind = true;
            Global.firstOpcDataConfirm_wind = true;
            checkopcconfirm();
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/windparser_p.php",
        type:'GET',
        cache:false,
        //async:false,
        data:{"wind_interval":wind_interval,"wind_min":wind_min,"wind_max":wind_max},
        beforeSend:function () {
            if(Global.trendConnected){
                Global.windObj.showLoading('Подождите идет загрузка данных...');
            }
        },
        success: function (data) {

            windTrend_p = [];
            windTrend_p[0]=[0];
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
            if(!Global.firstOpcDataConfirm_wind_p){
                windStart = windTrend_p[0][0];
            }else {
                windTrend_p[0][0]= windStart;
                windTrend_p[0][1]= 0;
            }
            ajaxOkWind_p = true;
            Global.firstOpcDataConfirm_wind_p = true;
            checkopcconfirm();
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function refreshTempTrends(temp_interval, temp_min, temp_max) {
    $.ajax({
        url:"script/tempavgparser.php",
        dateType:'json',
        type:'GET',
        //async:false,
        //data:{"wind_interval":wind_interval,"wind_min":wind_min,"wind_max":wind_max},
        beforeSend:function () {
            if(Global.trendConnected){
                Global.tempObj.showLoading('Подождите идет загрузка данных...');
            }
        },
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
            ajaxOkTempAVG = true;
            Global.firstOpcDataConfirm_tempavg = true;
            checkopcconfirm();
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/temp0parser.php",
        dateType:'json',
        type:'GET',
        async:true,
        data:{"temp_interval":temp_interval,"wind_min":temp_min,"wind_max":temp_max},
        beforeSend:function () {
            if(Global.trendConnected){
                Global.tempObj.showLoading('Подождите идет загрузка данных...');
            }
        },
        success: function (data) {
            temp0Trend = [];
            temp0Trend[0]=[0];
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
            if(!Global.firstOpcDataConfirm_temp0){
                tempStart = temp0Trend[0][0];
            }else {
                temp0Trend[0][0]= tempStart;
                temp0Trend[0][1]= 0;
            }
            ajaxOkTemp0 = true;
            Global.firstOpcDataConfirm_temp0 = true;
            checkopcconfirm();
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/temp15parser.php",
        dateType:'json',
        type:'GET',
        //async:false,
        data:{"temp_interval":temp_interval,"wind_min":temp_min,"wind_max":temp_max},
        beforeSend:function () {
            if(Global.trendConnected){
                Global.tempObj.showLoading('Подождите идет загрузка данных...');
            }
        },
        success: function (data) {
            temp15Trend = [];
            temp15Trend[0]=[0];
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
            if(!Global.firstOpcDataConfirm_temp15){
                tempStart = temp15Trend[0][0];
            }else {
                temp15Trend[0][0]= tempStart;
                temp15Trend[0][1]= 0;
            }
            ajaxOkTemp15 = true;
            Global.firstOpcDataConfirm_temp15 = true;
            checkopcconfirm();
        },
        error: function (err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"script/temp60parser.php",
        dateType:'json',
        type:'GET',
        //async:false,
        data:{"temp_interval":temp_interval,"wind_min":temp_min,"wind_max":temp_max},
        beforeSend:function () {
            if(Global.trendConnected){
                Global.tempObj.showLoading('Подождите идет загрузка данных...');
            }
        },
        success: function (data) {
            temp60Trend = [];
            temp60Trend[0]=[0];
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
            if(!Global.firstOpcDataConfirm_temp60){
                tempStart = temp60Trend[0][0];
            }else {
                temp60Trend[0][0]= tempStart;
                temp60Trend[0][1]= 0;
            }
            ajaxOkTemp60 = true;
            Global.firstOpcDataConfirm_temp60 = true;
            checkopcconfirm();


        },
        error: function (err) {
            console.log(err);
        }
    });
}
function refreshSadTrends() {
    $.ajax({
        url:"script/tempsadparser.php",
        dateType:'json',
        type:'GET',
        //async:false,
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
            ajaxOkTempSad = true;
            Global.firstOpcDataConfirm_tempsad = true;
            checkopcconfirm();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function trendsRedrawer() {
    if(dataOkWind && dataOkWind_p){
        Global.windObj.hideLoading();
        Global.windObj.redraw();
        dataOkWind = false;
        dataOkWind_p = false;
    }else;
    if(dataOkTemp0 && dataOkTemp15 && dataOkTemp60 && dataOkTempAVG){
        Global.tempObj.hideLoading();
        Global.tempObj.redraw();
        dataOkTemp0 = false;
        dataOkTemp15 = false;
        dataOkTemp60 = false;
        dataOkTempAVG = false;
    }else;
}
function checkopcconfirm() {
    if(Global.trendConnected){
        if(Global.firstOpcDataConfirm_temp0&&Global.firstOpcDataConfirm_temp15&&Global.firstOpcDataConfirm_temp60&&
            Global.firstOpcDataConfirm_tempavg&&Global.firstOpcDataConfirm_tempsad&&Global.firstOpcDataConfirm_wind&&
            Global.firstOpcDataConfirm_wind_p){
            Global.firstOpcDataConfirm = true;
        }
        
        if(ajaxOkWind){
            Global.windObj.series[0].setData(windTrend,false,false);
            ajaxOkWind = false;
            dataOkWind = true;
            trendsRedrawer();
        }
        if(ajaxOkWind_p){
            Global.windObj.series[1].setData(windTrend_p,false,false);
            ajaxOkWind_p = false;
            dataOkWind_p = true;
            trendsRedrawer();
        }


        if(ajaxOkTemp0){
            Global.tempObj.series[0].setData(temp0Trend,false,false);
            ajaxOkTemp0 = false;
            dataOkTemp0 = true;
            trendsRedrawer();
        }
        if(ajaxOkTemp15){
            Global.tempObj.series[2].setData(temp15Trend,false,false);
            ajaxOkTemp15 = false;
            dataOkTemp15 = true;
            trendsRedrawer();
        }
        if(ajaxOkTemp60){
            Global.tempObj.series[3].setData(temp60Trend,false,false);
            ajaxOkTemp60 = false;
            dataOkTemp60 = true;
            trendsRedrawer();
        }
        if(ajaxOkTempAVG){
            Global.tempObj.series[1].setData(tempAVGTrend,false,false);
            ajaxOkTempAVG = false;
            dataOkTempAVG = true;
            trendsRedrawer();
        }
        if(ajaxOkTempSad){
            Global.tempSadObj.series[0].setData(tempSadTrend,false,false);
            ajaxOkTempSad = false;
            Global.tempSadObj.redraw();
        }
    }
}