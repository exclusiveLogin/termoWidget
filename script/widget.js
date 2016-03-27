$(document).ready(function(){
    
    setInterval(refresh_widget,10000);
    if(ajaxOkWidget){
        refresh_widget();
    }
    else {
        setTimeout(refresh_widget,1000);
    }
});
function refresh_widget(){
    var setlamp = function () {
        $('.refresh_led').addClass('refresh_led_ok');
        $('#wh_refresh_led').addClass('led_ok');
    };
    var refresh = function () {
        /*Global["windObj"] = $('#termolog').highcharts();
        Global["tempObj"] = $('#termologfull').highcharts();

        Global.windObj.series[0].addPoint([timestamp,Global.wind],true,false);
        Global.windObj.series[1].addPoint([timestamp,Global.wind_p],true,false);

        Global.tempObj.series[0].addPoint([timestamp,Global.temp0],true,false);
        Global.tempObj.series[1].addPoint([timestamp,Global.tempavg],true,false);
        Global.tempObj.series[2].addPoint([timestamp,Global.temp15],true,false);
        Global.tempObj.series[3].addPoint([timestamp,Global.temp60],true,false);*/
        $('#w_wind_val, #wh_wind_val').text(Global.windavg.toFixed(1));
        $('#w_temp1_val, #wh_temp1_val').text(Global.temp0);
        $('#w_temp2_val, #wh_temp2_val').text(Global.temp15);
        $('#w_temp3_val, #wh_temp3_val').text(Global.temp60);
        $('#w_tempavg_val, #wh_tempavg_val').text(Global.tempavg);
        $('#w_upd_val, #wh_upd_val').text(Global.upd);

        $('.refresh_led').removeClass('refresh_led_ok');
        $('#wh_refresh_led').removeClass('led_ok');
        RefreshColor();
    };
    var start = function () {
        setlamp();        
        setTimeout(refresh,500);
    };
    start();
}