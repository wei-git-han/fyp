var pageModule = function () {
	var initother = function(){
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
			
		});
		
		$(".date-picker2").datepicker({
			language:"zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			format: "yyyy-mm",
			minViewMode: 1,
			autoclose: true
		}).on("changeDate",function(){
			getBarChartData();
		});
	}
	
	//视频会议
	var getBarChartData = function(){
	  $.ajax({
	      url:"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/manageMeeting/video",
	      data:{},
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
	        if(res.result=="success"){
	        	res.data.forEach((e,index)=>{
					tableData.xdata.push(e.deptName);
					tableData.ydata[0].data.push(e.count*2+index)
					tableData.ydata[1].data.push(e.count/2-index)
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
			series: [
				{
					name: data.ydata[0].title,
					type: 'bar',
					barGap: 5,
					barWidth:5,
					barCategoryGap:'300',
					data: data.ydata[0].data
				},
				{
					name: data.ydata[1].title,
					type: 'bar',
					barGap: 5,
					barWidth:5,
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
        	initother();
        }
    }
}();


