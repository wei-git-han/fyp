var fwUrl = {"url":"/app/fyp/orderOfBirth/appAccess","dataType":"text"};//访问量
var azUrl = {"url":"/app/fyp/orderOfBirth/appInstall","dataType":"text"};//安装量
var deptTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //单位树--待定
var pageModule = function () {
	
	var initother = function(){
		//软件数据
		$("#rjsj").click(function(){
			initfw();
			initanz();
		});
		
		//未开机数据
		$("#wkjsj").click(function(){
			getBarChartData2();
		});
		
		$(".date-picker1").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true
		}).on("changeDate",function(){
			getBarChartData();
		});
		
		$(".date-picker2").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true
		}).on("changeDate",function(){
			initanz();
		});
		
		$(".date-picker3").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true
		}).on("changeDate",function(){
			getBarChartData2();
		});
		
		$("#zxphType").change(function(){
			getBarChartData();
		});
		
	}
	
	//组织机构树
	var initUnitTree = function() {
		$ajax({
			url:deptTreeUrl,
			success:function(data){
				$("#deptName").createSelecttree({
					data : data,
					width : '100%',
					success : function(data, treeobj) {},
					selectnode : function(e, data) {
						$("#deptName").val(data.node.text);
						$("#deptId").val(data.node.id);
						initfw(); //访问量
					}
				});
				$("#deptName2").createSelecttree({
					data : data,
					width : '100%',
					success : function(data, treeobj) {},
					selectnode : function(e, data) {
						$("#deptName2").val(data.node.text);
						$("#deptId2").val(data.node.id);
						initanz(); //安装量
					}
				});
			}
		})
	}
	
	//在线率排行
	var getBarChartData = function(){
		$.ajax({
		  url:"/app/fyp/orderOfBirth/onLine",
		  data:{
			  type:$("#zxphType option:selected").val(),
			  time:$("#searchDate1").val()
		  },
		  dataType:"json",
		  success:function(res){
			if(res.result=="success"){
				initChart(res.data,'main');
			}
		  }
		})
	}
	
	var initChart = function(data){
		/*
        * 在线率统计表数据
        * */
		var xData = [],
			yData = [];
		$(data).each(function(i,obj){
			xData.push(obj.deptName);
			yData.push({
				name:obj.deptName,
				value:obj.percentage,
				type:1,
				id:i,
				zb:obj.permanentStaffCount,
				zx:obj.onLineCount,
				qj:obj.leaveCount,
				qt:obj.otherCount,
				zwl:obj.percentage
			});
		})
		var jzxl = echarts.init(document.getElementById('main'));
		var option = {
			title: {
				show:false,
				subtext: '单位（人）',
				subtextStyle: {
					color: '#2f8fdc',
				}
			},
			dataZoom:[
				{
					type:'inside',
					start:0,
					throttle:50,
					minValueSpan:4,
					end:100
				}
			],
			tooltip: {
				trigger: 'axis',
				formatter:function(parmas){
//                	console.log(parmas)
					var data = parmas[0].data;
					var html = '<div style="text-align: left;">'+
						'<p>'+(data.name?data.name:"")+'<p>'+
						'<p>在编：'+(data.zb?data.zb:0)+'</p>'+
						'<p>在线：'+(data.zx?data.zx:0)+'</p>'+
						'<p>请假：'+(data.qj?data.qj:0)+'</p>'+
						'<p>其他：'+(data.qt?data.qt:0)+'</p>'+
						'<p>在线率：'+(data.zwl?data.zwl+"%":0)+'</p>'+
						//                    '<p><a href="index.html" target="_blank" style="color:#fff;">点击查看&nbsp;&gt;&nbsp; </a></p>'+
						'</div>';
					return html;
				}
			},
			xAxis: [{
				clickable: true,
				type: 'category',
				data: xData,
				axisLabel: {
//                    margin: 'auto',
					show: true,
					interval: 0,
					rotate:25,
					textStyle: {
						color: '#ACACAC',
						fontSize: 12,
					}
				}
			},],
			yAxis: [{
				type: 'value',
				min:0,
				max:100,
				splitNumber:5,
				axisLabel: {
					textStyle: {
						color: '#ACACAC',
						fontSize: 12,
					},
					formatter:function(value){
						return value+"%";
					}
				},
				splitLine: {
					lineStyle: {
						type: "dotted",
						color: "#ACACAC"
					}
				},
			}],
			series: [{
				name: '各局在线率统计',
				type: 'bar',
				data: yData,
				barWidth:20,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0,0,0,1,[{
							offset:1,
							color:'#58B4FD'
						},{
							offset:0,
							color:'#2C76EC'
						}]),
//                       color:function(param){
//                           return {
//                               colorStops:[{
//                                   offset:0,
//                                   color:'#2C76EC'
//                               },{
//                                   offset:1,
//                                   color:'#58B4FD'
//                               }]
//                           }
//                       },
						barBorderRadius:30,
						label: {
							show: false,
						}
					}
				},
			},
			]
		};
		jzxl.setOption(option);
		jzxl.on('click', function (params) {
			if(params.data.type==1){
				T.msg('您无权限查看该数据，请联系管理员！')
				return;
			}
		})
	};
	
	
	//未开机数据
	var getBarChartData2 = function(){
		$.ajax({
		  url:"/app/fyp/orderOfBirth/computer",
		  data:{
			  time:$("#searchDate3").val()
		  },
		  dataType:"json",
		  success:function(res){
			if(res.result=="success"){
			    initBarChart(res.data,'main3');
			} 
		  }
		})
	}
	
	var initBarChart = function(data,id){
		//解析后端数据
		var xdata =[];
		var ydata =[];
		$.each(data, function(i, o) {
			xdata.push(o.deptName);
			ydata.push(o.count);
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
			backgroundColor:'#051A50',
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
					/*min: 0,
					max: 500,*/
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
					barWidth:20,
					itemStyle:{
						normal:{
							color:'#0086FF'
						}
					},
					data:ydata,
					z:1
				},
				{
					type: "pictorialBar",
					symbol:'rect',
					symbolOffset:[0,-1],
					symbolSize:[21,3],
					barGap: 0,
					symbolRepeat:'fixed',
					symbolMargin:3,
					symbolClip:true,
					barWidth:20,
					barCategoryGap:'300',
					itemStyle:{
						normal:{
							color:'#051A50'
						}
					},
					data: ydata,
					z:2
				}
			]
		});
	}

	//访问量
	var initfw = function(){
		$ajax({
			url: fwUrl,
			data:{deptid:$("#deptId").val()},
			success: function(data) {
				var arryHtml_l = '';
				var arryHtml_r = '';
				$.each(data.data.access, function(i, o) {
					/*arryHtml_ph+='<div><img src="'+o.appImg+'" ><span>'+o.appName+'</span></div>';*/
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
				$(".topPh-l").html(arryHtml_l);
				$(".topPh-r").html(arryHtml_r);
			}
		})
	}
	
	
	//安装量
	var initanz = function(){   
		$ajax({
			url: azUrl,
			data:{deptid:$("#deptId2").val(),time:$("#searchDate2").val()},
			success: function(data) {
				var arryHtml_l = '';
				var arryHtml_r = '';
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
			}
		})
	}
    return {
        //加载页面处理程序
        initControl: function () {
        	//initUnitTree();
        	getBarChartData();
			initother();
        }
    }
}();



