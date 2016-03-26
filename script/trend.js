

function renderTrend(wind,wind_p,temp0,temp15,temp60,tempAVG,tempSad){
    $('#termolog').highcharts("StockChart",{
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
            }]
        },
        yAxis: {
            title: {
                text: 'Скорость ветра м/с'
            },
            floor:0
        },
        scrollbar:{
            enabled:false
        },
        navigator:{
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
            selected:2
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
            type: 'area',
            name: 'Скорость ветра северо-запад',
            data:wind,
            tooltip: {
                valueDecimals: 1,
                valueSuffix:' м/с'
            }
        },
            {
                type: 'area',
                name: 'Скорость ветра юго-восток',
                data:wind_p,
                color:"green",
                fillOpacity:0.5,
                tooltip: {
                    valueDecimals: 1,
                    valueSuffix:' м/с'
                }
            }]
    });
    Global.windObj = $('#termolog').highcharts();
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
            selected:0
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
            data:temp0,
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
            data:tempAVG,
            tooltip: {
                valueDecimals: 1,
                valueSuffix:' °C'
            },
            color:"red",
            negativeColor:"DeepSkyBlue"
        },{
            type: 'line',
            name: 'Температура -15см',
            data:temp15,
            tooltip: {
                valueDecimals: 1,
                valueSuffix:' °C'
            },
            color:"chocolate"
        },{
            type: 'line',
            name: 'Температура -60см',
            data:temp60,
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
            selected:0
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
            data:tempSad,
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

function updateTrend() {
    Global.windObj.series[0].setData(windTrend);
    Global.windObj.series[1].setData(windTrend_p);
    Global.tempObj.series[0].setData(temp0Trend);
    Global.tempObj.series[1].setData(tempAVGTrend);
    Global.tempObj.series[2].setData(temp15Trend);
    Global.tempObj.series[3].setData(temp60Trend);
    Global.tempSadObj.series[0].setData(tempSadTrend);
}

$(document).ready(function () {
    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });
    $("#refresh_btn").on('click',function () {
        refresh_trends();
    })

    renderTrend(windTrend,windTrend_p,temp0Trend,temp15Trend,temp60Trend,tempAVGTrend,tempSadTrend);

    if(Global.firstOpcDataConfirm){
        //updateTrend(windTrend,windTrend_p,temp0Trend,temp15Trend,temp60Trend,tempAVGTrend,tempSadTrend);
    }
    else {
        console.log("opc starting error");
        //setTimeout(testOpcStart,1000);
    }
    
    
});
function testOpcStart() {
    if(Global.firstOpcDataConfirm){
        updateTrend(windTrend,windTrend_p,temp0Trend,temp15Trend,temp60Trend,tempAVGTrend,tempSadTrend);
    }
    else{
        console.log("opc starting error");
        setTimeout(testOpcStart,1000);
    }
}