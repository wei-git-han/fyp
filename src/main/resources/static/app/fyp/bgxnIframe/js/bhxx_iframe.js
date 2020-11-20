var pageModule = function () {
	var initother = function(){
		$("#rchy").click(function(){
			getBar3dChartData();
		});
		
		$("#sphy").click(function(){
			getBarChartData();
		});
		
		$(".date-picker1").datepicker({
			language:"zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			format: "yyyy-mm",
			minViewMode: 1,
			autoclose: true
		}).on("changeDate",function(){
			getBar3dChartData();
		});
		
		$(".date-picker2").datepicker({
			language:"zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			format: "yyyy",
			minViewMode: 2,
			autoclose: true
		}).on("changeDate",function(){
			getBarChartData();
		});
	}
	
	//日常会议
	var getBar3dChartData = function(){
		 $.ajax({
		      url:"/app/fyp/manageMeeting/common",
		      data:{time:$("#searchDate1").val()},
		      dataType:"json",
		      success:function(res){
		        //if(res.result=="success"){
		        if(res.code=="200"){
		        	var data = {
                        "xdata":[],
                        "ydata":[]
                    }
		        	 // deptName  部门名称  duration  会议总时长   count 会议总次数
                    data.xdata.push(res.deptName);
                    data.ydata.push(res.data.duration||0);
                    //data.ydata.push(res.data.count||null);
                    init3dBarChart('main',data);
		        }
		      }
		 })
	};
	

	var init3dBarChart = function(id,data){
		var charts = echarts.init(document.getElementById(id));
		charts.setOption({
		    tooltip: {
		        trigger: 'axis',
		        formatter: function(params) {
		            return '<p>单位：'+params[0].name+'<br/>总时长：'+params[0].value+'</p>'
		        }
		    },
			xAxis: {
		        data: data.xdata,
		        axisLabel: {
		          rotate:30,
				  textStyle: {
				    color: '#7783DE',
				  }
				},
		    },
		    yAxis: {
		    	splitLine: {
				  lineStyle: {
				    type: 'dotted',
				    color: '#13296D' //刻度线颜色
				  }
				},
				axisLabel: {
				  textStyle: {
				    color: '#7783DE',
				  }
				},
		    },
		    series: [{
		        type: 'bar',
		        barWidth:15,
		        itemStyle:{
		            normal: {
		                borderWidth:1,
		                borderColor:'#1B397C',
		                barBorderRadius: 15,
		                color: new echarts.graphic.LinearGradient(
		                    0, 0, 1, 0,
		                    [
		                        {offset: 0, color: '#2dc3db'},
		                        {offset: 1, color: '#0f88c0'}
		                    ]
		                )
		            },
		            emphasis: {
		                barBorderRadius: 15,
		                shadowBlur: 15,
		                shadowColor: 'rgba(218,170, 58, 0.7)'
		            }
		        },
		        data:data.ydata
		    },{
		            name:'a',
		            tooltip:{
		               show:false 
		            },
		            type: 'pictorialBar',
		            itemStyle: {
		                 normal: {
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 1, 0,
		                        [
		                            {offset: 0, color: '#2bc6dd'},
		                            {offset: 1, color: '#18cde1'}
		                        ]
		                    ), 
		                    borderWidth:1,
		                    borderColor:'#1B397C'
		                }
		            },
		            symbol: 'circle',
		            symbolSize: ['15', '10'],
		            symbolPosition: 'end',
		            data: data.ydata,
		            z:3
		        }]
		});
	}
	
	//视频会议
	var getBarChartData = function(){
	  $.ajax({
	      url:"/app/fyp/manageMeeting/video",
	      data:{time:$("#searchDate2").val()},
	      dataType:"json",
	      success:function(res){
              var tableData = {
                  "title":'',
                  "legend":[
                      "总时长",
                      "场次"
                  ],
                  "xdata":[
                  ],
                  "ydata":[
                      {
                          "title":"总时长",
                          "data":[

                          ]
                      },
                      {
                          "title":"场次",
                          "data":[

                          ]
                      }
                  ]
              }
              if (res.data.list.length > 0 ) {
                    res.data.list.forEach((e,index)=>{
                        // zoneName 单位名称   useTime 使用时长   useNumber 使用次数   zoneId 单位id
                        tableData.xdata.push(e.zoneName);
                        tableData.ydata[0].data.push(e.useTime)
                        tableData.ydata[1].data.push(e.useNumber)
                    })
                  initBarChart(tableData)
              }
	      }
	   })
	}
	var initBarChart = function(data){
		var chart = echarts.init(document.getElementById('main1'))
		chart.setOption({
			title: {
			  show: true,
			  subtext: data.title,
			  subtextStyle: {
				color: '#DBDDF7',
			  },
			  /* padding:[100,100,100,100]  设置title位置，是具体固定的位置*/  
			},
			/* grid:{
				height:100   柱状图高度
			}, */
			color: ['#509DF7', '#99DA48'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				color:'red'
			},
			legend: {
				data:data.legend,
				textStyle:{
					color:'#fff'
				}
			},
			toolbox: {
				show: false,
				orient: 'vertical',
				left: 'right',
				top: 'center',
				feature: {
					mark: {show: true},
					dataView: {show: true, readOnly: false},
					magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			calculable: true,
			xAxis: [
				{
					type: 'category',
					axisTick: {show: false},
					splitLine: {show: false},
					interval: 0,
					/* axisTick: {
					  alignWithLabel: true
					}, */
					axisLabel: {
					  rotate:30,
					  textStyle: {
					    color: '#7783DE',
					    fontSize: 12
					  }
					},
					data: data.xdata
				}
			],
			yAxis: [
				{
					type: 'value',
					min: 0,
					max: 500,
					splitNumber: 5,
					axisLabel: {
					  textStyle: {
					    color: '#7783DE',
					    fontSize: 12
					  }
					},
					splitLine: {
					  lineStyle: {
					    type: 'dotted',
					    color: '#13296D' //刻度线颜色
					  }
					}
				}
			],
			dataZoom: [
              {
                type: 'inside',
                start: 0,
                throttle: 50,
                minValueSpan: 4,
                end: 100
              }
            ],
			series: [
				{
					name: data.ydata[0].title,
					type: 'bar',
					barGap: 5,
					barWidth:15,
					barCategoryGap:'300',
					data: data.ydata[0].data
				},
				{
					name: data.ydata[1].title,
					type: 'bar',
					barGap: 5,
					barWidth:15,
					borderRadius: 30,
					barCategoryGap:'300',
					data: data.ydata[1].data,
					itemStyle:{
						borderRadius: 30
					}
				}
			]
		});
	}
	
	
    return {
        //加载页面处理程序
        initControl: function () {
        	getBar3dChartData();
        	initother();
        },
		refreshPage:function () {
			if($('#rchy').hasClass('active')){
				getBar3dChartData();
			}else{
				getBarChartData();
			}
		}
    }
}();


