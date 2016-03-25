function RefreshColor(){
    if(Global.windavg>0&&Global.windavg<10){
        $('#wh_wind_led').removeClass();
        $('#wh_wind_led').addClass('h_led led_green');
    }
    if(Global.windavg>5&&Global.windavg<10){
        $('#wh_wind_led').removeClass();
        $('#wh_wind_led').addClass('h_led led_yellow');
    }
    if(Global.windavg>10&&Global.windavg<15){
        $('#wh_wind_led').removeClass();
        $('#wh_wind_led').addClass('h_led led_orange');
    }
    if(Global.windavg>15){
        $('#wh_wind_led').removeClass();
        $('#wh_wind_led').addClass('h_led led_red');
    }



    if(Global.temp0<-10){
        $('#wh_temp0_led').removeClass();
        $('#wh_temp0_led').addClass('h_led led_blue');
    }
    if(Global.temp0>=-10&&Global.temp0<0){
        $('#wh_temp0_led').removeClass();
        $('#wh_temp0_led').addClass('h_led led_cyan');
    }
    if(Global.temp0>=0&&Global.temp0<10){
        $('#wh_temp0_led').removeClass();
        $('#wh_temp0_led').addClass('h_led led_green');
    }
    if(Global.temp0>=10&&Global.temp0<20){
        $('#wh_temp0_led').removeClass();
        $('#wh_temp0_led').addClass('h_led led_yellow');
    }
    if(Global.temp0>=20&&Global.temp0<30){
        $('#wh_temp0_led').removeClass();
        $('#wh_temp0_led').addClass('h_led led_orange');
    }
    if(Global.temp0>=30){
        $('#wh_temp0_led').removeClass();
        $('#wh_temp0_led').addClass('h_led led_red');
    }


    if(Global.temp15<-10){
        $('#wh_temp15_led').removeClass();
        $('#wh_temp15_led').addClass('h_led led_blue');
    }
    if(Global.temp15>=-10 && Global.temp15<0){
        $('#wh_temp15_led').removeClass();
        $('#wh_temp15_led').addClass('h_led led_cyan');
    }
    if(Global.temp15>=0 && Global.temp15<10){
        $('#wh_temp15_led').removeClass();
        $('#wh_temp15_led').addClass('h_led led_green');
    }
    if(Global.temp15>=10&&Global.temp15<20){
        $('#wh_temp15_led').removeClass();
        $('#wh_temp15_led').addClass('h_led led_yellow');
    }
    if(Global.temp15>=20&&Global.temp15<30){
        $('#wh_temp15_led').removeClass();
        $('#wh_temp15_led').addClass('h_led led_orange');
    }
    if(Global.temp15>=30){
        $('#wh_temp15_led').removeClass();
        $('#wh_temp15_led').addClass('h_led led_red');
    }

    if(Global.temp60<=-10){
        $('#wh_temp60_led').removeClass();
        $('#wh_temp60_led').addClass('h_led led_blue');
    }
    if(Global.temp60>=-10&&Global.temp60<0){
        $('#wh_temp60_led').removeClass();
        $('#wh_temp60_led').addClass('h_led led_cyan');
    }
    if(Global.temp60>=0&&Global.temp60<10){
        $('#wh_temp60_led').removeClass();
        $('#wh_temp60_led').addClass('h_led led_green');
    }
    if(Global.temp60>=10&&Global.temp60<20){
        $('#wh_temp60_led').removeClass();
        $('#wh_temp60_led').addClass('h_led led_yellow');
    }
    if(Global.temp60>=20&&Global.temp60<30){
        $('#wh_temp60_led').removeClass();
        $('#wh_temp60_led').addClass('h_led led_orange');
    }
    if(Global.temp60>=30){
        $('#wh_temp60_led').removeClass();
        $('#wh_temp60_led').addClass('h_led led_red');
    }

    if(Global.tempavg<-10){
        $('#wh_tempavg_led').removeClass();
        $('#wh_tempavg_led').addClass('h_led led_blue');
    }
    if(Global.tempavg>=-10&&Global.tempavg<0){
        $('#wh_tempavg_led').removeClass();
        $('#wh_tempavg_led').addClass('h_led led_cyan');
    }
    if(Global.tempavg>=0&&Global.tempavg<10){
        $('#wh_tempavg_led').removeClass();
        $('#wh_tempavg_led').addClass('h_led led_green');
    }
    if(Global.tempavg>=10&&Global.tempavg<20){
        $('#wh_tempavg_led').removeClass();
        $('#wh_tempavg_led').addClass('h_led led_yellow');
    }
    if(Global.tempavg>=20&&Global.tempavg<30){
        $('#wh_tempavg_led').removeClass();
        $('#wh_tempavg_led').addClass('h_led led_orange');
    }
    if(Global.tempavg>=30){
        $('#wh_tempavg_led').removeClass();
        $('#wh_tempavg_led').addClass('h_led led_red');
    }
}
