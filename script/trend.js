

function renderTrend(wind,wind_p,temp0,temp15,temp60,tempAVG,tempSad){
    $('#windlog').highcharts("StockChart",{
        credits:{enabled:false},
        chart: {
            zoomType: 'x',
            backgroundColor:"#f5f5f5"
        },
        title: {
            text: 'График скорости ветра'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            gridLineWidth:1,
            ordinal:false,
            plotBands:[{
                from:0,
                to:timestampplot,
                color:"#eeffff",
                label:{
                    text:"Архив"
                }
            }],
            events:{
                afterSetExtremes : trendDetail
            },
            minRange:1000*3600*24
        },
        yAxis: {
            title: {
                text: 'Скорость ветра м/с'
            },
            floor:0
        },
        scrollbar:{
            enabled:false,
            liveRedraw:false
        },
        navigator:{
            adaptToUpdatedData:false,
            height:10
        },
        rangeSelector:{
            
            buttons:[{
                type:"hour",
                count:1,
                text:"1ч"
            },{
                type:"hour",
                count:3,
                text:"3ч"
            },{
                type:"day",
                count:1,
                text:"1д"
                },
                {
                type:"week",
                count:1,
                text:"7д"
                }
                ,{
                type:"all",
                text:"Все"
                }
            ],
            selected:2,
            inputEnabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                }
            }
        },
        series:[{
            gapSize:5,
            type: 'area',
            name: 'Скорость ветра северо-запад',
            //data:wind,
            tooltip: {
                valueDecimals: 1,
                valueSuffix:' м/с'
            }
        },
            {
                gapSize:5,
                type: 'area',
                name: 'Скорость ветра юго-восток',
                //data:wind_p,
                color:"green",
                fillOpacity:0.5,
                tooltip: {
                    valueDecimals: 1,
                    valueSuffix:' м/с'
                }
            }]
    });
    Global.windObj = $('#windlog').highcharts();
    $('#termologfull').highcharts('StockChart', {
        credits:{enabled:false},
        chart: {
            zoomType: 'x',
            backgroundColor:"#f5f5f5"
        },
        title: {
            text: 'Температура'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            id:"test",
            /*events:{
                afterSetExtremes:function(){
                    var min = this.min,
                        max = this.max,
                        chart = this.chart;

                    chart.xAxis[1].setExtremes(min,max);

                }
            },*/
            type: 'datetime',
            gridLineWidth:1,
            ordinal:false,
            plotBands:[{
                from:0,
                to:timestampplot,
                color:"#eeffff",
                label:{
                    text:"Архив"
                }
            }]
        },
        yAxis: {
            title: {
                text: 'Температура'
            }
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 3
                },
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 2
                    }
                },
                threshold: null
            }
        },
        rangeSelector:{
            buttons:[{
                type:"hour",
                count:8,
                text:"8ч"
            },{
                type:"day",
                count:1,
                text:"1д"
            },{
                type:"week",
                count:1,
                text:"7д"
            },{
                type:"month",
                count:1,
                text:"мес"
            },{
                type:"ytd",
                text:"год"
            },{
                type:"all",
                text:"все"
                }
            ],
            selected:1
        },
        navigator:{
            height:10
        },
        scrollbar:{
            enabled:false
        },
        series:[{
            type: 'area',
            name: 'Температура воздуха',
            //data:temp0,
            tooltip: {
                valueDecimals: 1,
                valueSuffix:' °C'
            },
            color:"orange",
            fillColor : {
                linearGradient : {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0.7,
                    y3: 1
                },
                stops : [
                    [0, "orange"],
                    [0.5, "LightGreen"],
                    [1,"LightSkyBlue"]
                ]
            },
            negativeColor:"#5BC0DE"
        },{
            type: 'spline',
            name: 'Средняя температура',
            //data:tempAVG,
            tooltip: {
                valueDecimals: 1,
                valueSuffix:' °C'
            },
            color:"red",
            negativeColor:"DeepSkyBlue"
        },{
            type: 'line',
            name: 'Температура -15см',
            //data:temp15,
            tooltip: {
                valueDecimals: 1,
                valueSuffix:' °C'
            },
            color:"chocolate"
        },{
            type: 'line',
            name: 'Температура -60см',
            //data:temp60,
            tooltip: {
                valueDecimals: 1,
                valueSuffix:' °C'
            },
            color:"black"
        }]
    });
    Global.tempObj = $('#termologfull').highcharts();
    $('#termosad').highcharts('StockChart', {
        credits:{enabled:false},
        chart: {
            zoomType: 'x',
            backgroundColor:"#f5f5f5"
        },
        title: {
            text: 'График активных температур'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            gridLineWidth:1,
            ordinal:true
        },
        yAxis: {
            title: {
                text: 'Температура'
            },
            floor:0
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        rangeSelector:{
            buttons:[{
                type:"week",
                count:1,
                text:"7д"
            },{
                type:"month",
                count:1,
                text:"мес"
            },{
                type:"ytd",
                text:"год"
            },{
                type:"all",
                text:"все"
            }
            ],
            //selected:4
        },
        navigator:{
            height:10
        },
        scrollbar:{
            enabled:false
        },
        series:[{
            type: 'column',
            name: 'Активная температура',
            //data:tempSad,
            tooltip: {
                valueDecimals: 1,
                valueSuffix:' °C'
            },
            color:"orange"
        }]
    });
    Global.tempSadObj = $('#termosad').highcharts();
    Global.trendConnected = true;
}

function trendDetail(e) {
    var maximum = Math.round(e.max);
    var minimum = Math.round(e.min);
    var interval = Math.round(e.max - e.min);
    
    //Сравнение интервала 
    if(interval<86400000*3){
        refresh_trends(true, minimum, maximum);
    }else{
        refresh_trends();
    }
}
$(document).ready(function () {
    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });
    $("#refresh_btn").on('click',function () {
        var wextr = Global.windObj.xAxis[0].getExtremes();
        wextr.max = new Date().getTime();
        trendDetail(wextr);
    })
    renderTrend(windTrend,windTrend_p,temp0Trend,temp15Trend,temp60Trend,tempAVGTrend,tempSadTrend);
 
});