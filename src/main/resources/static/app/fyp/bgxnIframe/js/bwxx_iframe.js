var pageModule = function () {
	var initother = function(){
		getBanwenAll()
		//发文情况
		$("#fwqk").click(function(){
			init3dBarChart('container2');
		});
		//发展趋势
		$("#fzqs").click(function(){
			initAreaChart();
		});
	}
    var getBanwenAll= function(){
        $.ajax({
            url:"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=app/fyp/bwzl",
            data:{
                type:1,
                year:2020
            },
            dataType:"json",
            success:function(res){
                if(res.result=="success"){
                    init3dBarChart('container',res.data)
                }
            }
        })
    }
	var init3dBarChart = function(id,data){
		$('#'+id).highcharts({
			chart: {
				renderTo:id,
				backgroundColor:'rgba(0,0,0,0)',
				/* showAxes:true, */
				alignTicks:false,
				type: 'column',
				margin: 125,
				options3d: {
					enabled: true,
					alpha: 2,
					beta: 25,
					depth: 1000
				},
				borderWidth:2,
			},
			exporting:{  
				enabled:false
			},
			credits : {
				href : "",
				text : "",
				enabled:false
			},//去掉水印的方法，在highchart下一级
			title: {
				text: ''
			},
			subtitle: {
				text: ''
			},
			plotOptions: {
				column: {
					pointWidth:15,
					groupPadding:0,
					borderWidth:10,
					depth:12, /* 柱状图倾斜度 */
					borderRadius:5
				}
			},
			legend:{
				enabled:false /* 是否允许有图注 */
				/* align:'left',
				layout:'vertical',
				verticalAlign:'middle' */
			},
			tooltip:{
				backgroundColor:'rgba(31,132,28,0)',
				style:{
					color:'#fff'
				},
				shared:true,
				useHTML:true,
				formatter:function(){
				   return this.x+'来文办理：<br/><span style="font-size:28px;font-weight:700">'+this.y +'</span><br/>'+ '<span style="cursor:pointer;text-decoration:underline">点击查看</span>';
			    }
			},
			xAxis: {
				categories:data.xdata,
				labels: {
				    style: {
				        color: '#406EB6'//设置y轴文字的颜色,
						
				    },
					rotation:-45
				},
				gridLineColor:'#152C70',   //设置刻度线的颜色
				
			},
			yAxis: {
				opposite: true,
				min: 0,
				max: 700,
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        color: '#406EB6'//设置y轴文字的颜色
                    },
					formatter:function(){
					   return this.value + '件';
				   }
                },
                gridLineColor:'#152C70',   //设置刻度线的颜色
			},
			series: [{
				name: '',
				data: data.ydata
			}]
		});
	}
	
	var initAreaChart = function(){
		 $('#container3').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Nuclear weapon states'
                },
                labels: {
                    formatter: function() {
                        return this.value / 1000 +'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'USA',
                data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
            }, {
                name: 'USSR/Russia',
                data: [null, null, null, null, null, null, null , null , null ,null,
                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                21000, 20000, 19000, 18000, 18000, 17000, 16000]
            }]
        });
	}
	
	
    return {
        //加载页面处理程序
        initControl: function () {
            initother();
        }
    }
}();



