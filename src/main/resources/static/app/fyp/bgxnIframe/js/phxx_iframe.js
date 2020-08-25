var phUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/orderOfBirth/app","dataType":"text"};//排行数据
var pageModule = function () {
	
	var initother = function(){
		$("#wkjsj").click(function(){
			getBarChartData2();
		});
	}
	
	//在线率排行
	var getBarChartData = function(){
		$.ajax({
		  url:"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/orderOfBirth/onLine",
		  data:{},
		  dataType:"json",
		  success:function(res){
			if(res.result=="success"){
			    initBarChart(res.data,'main');
			}
		  }
		})
	}
	
	//未开机数据
	var getBarChartData2 = function(){
		$.ajax({
		  url:"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/orderOfBirth/computer",
		  data:{},
		  dataType:"json",
		  success:function(res){
			if(res.result=="success"){
			    initBarChart(res.data,'main3');
			}
		  }
		})
	}
	
	var initBarChart = function(data,id){
		/*var data ={
		    "data":[
		        {
		            "deptName":"来文办理总件数",
		            "leaveCount":"请假",
		            "onLineCount":"在线",
		            "percentage":"12",
		            "count":"呈批公文总件数",
		            "otherCount":"其他",
		            "permanentStaffCount":"在编"
		        },
		        {
		            "deptName":"来文办理总件数1",
		            "leaveCount":"请假",
		            "onLineCount":"在线",
		            "percentage":"50",
		            "count":"呈批公文总件数",
		            "otherCount":"其他",
		            "permanentStaffCount":"在编"
		        }
		    ]
		}*/
		
		//解析后端数据
		var xdata =[];
		var ydata =[];
		$.each(data.data, function(i, o) {
			xdata.push(o.deptName);
			ydata.push(o.percentage);
		});
		
		var chart = echarts.init(document.getElementById(id));
		chart.setOption({
			title: {
			  show: true,
			  subtext: '',
			  subtextStyle: {
				color: '#DBDDF7',
			  },
			},
			color: ['#509DF7', '#99DA48'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				color:'red'
			},
			legend: {
				data:[],
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
					data: xdata
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
					name:'',
					type: 'bar',
					barGap: 0,
					barWidth:10,
					barCategoryGap:'300',
					data:ydata
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



