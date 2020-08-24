var phUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/orderOfBirth/app","dataType":"text"};//排行数据
var pageModule = function () {
	
	var initother = function(){
	}
	
	var getBarChartData = function(){
		$.ajax({
		  url:"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=app/fyp/bhxxLineChart",
		  data:{},
		  dataType:"json",
		  success:function(res){
			if(res.result=="success"){
			  initBarChart(res.data)
			}
		  }
		})
	}
	
	var initBarChart = function(data){
		 var data = {
		   "title":"",
		   "legend":[],
		   "xdata":['1级部首长办公室数据', '2级部首长办公室数据', '3级部首长办公室数据', '4级部首长办公室数据', '5级部首长办公室数据'],
		   "ydata":[{
		     "title":"",
		     "data":[320,332,200,300,450]
		   }]
		} 
		
		var chart = echarts.init(document.getElementById('main'));
		chart.setOption({
			title: {
			  show: true,
			  subtext: '',
			  subtextStyle: {
				color: '#DBDDF7',
			  },
			  /* padding:[100,100,100,100]  设置title位置，是具体固定的位置*/  
			},
			/* grid:{
				height:100   //柱状图高度
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
					barGap: 0,
					barWidth:10,
					barCategoryGap:'300',
					data: data.ydata[0].data,
					itemStyle: {
			            normal: {
			             /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                offset: 1,
			                color: '#2C76EC'
			              }, {
			                offset: 0,
			                color: '#58B4FD'
			              }]),*/
			              barBorderRadius: [30, 30, 0, 0],
			              label: {
			                show: false
			              }
			          }
		          }
				}
			]
		});
	}
	
	//安装量
	var initPh = function(){
		$ajax({
			url: phUrl,
			data:{},
			success: function(data) {
				var arryHtml_l = '';
				var arryHtml_r = '';
				var arryHtml_ph = '';
				$.each(data.data.access, function(i, o) {
					arryHtml_ph+='<div><img src="'+o.appImg+'" ><span>'+o.appName+'</span></div>';
				});
				$.each(data.data.install, function(i, o) {
					if(i<5){
						arryHtml_l+='<div>'+
									'	<span class="topVS3">TOP'+parseInt(i+1)+'</span>'+
									'	<span>'+o.appName+'</span>'+
									'	<span>'+o.appCount+'</span>'+
									'</div>'
					}else{
						arryHtml_r+='<div>'+
									'	<span>TOP'+parseInt(i+5+1)+'</span>'+
									'	<span>'+o.appName+'</span>'+
									'	<span>'+o.appCount+'</span>'+
									'</div>'
					}
				});
				$(".ph-l").html(arryHtml_l);
				$(".ph-r").html(arryHtml_r);
				$("#topPh").html(arryHtml_ph);
				
			}
		})
	}
	
    return {
        //加载页面处理程序
        initControl: function () {
        	getBarChartData();
			initPh();
			initother();
        }
    }
}();



