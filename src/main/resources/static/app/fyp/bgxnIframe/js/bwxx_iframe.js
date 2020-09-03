var deptTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //单位树--待定
var pageModule = function () {
	var initother = function(){
		$("#bwzl").click(function(){
			getBanwenAll();
		});
		//发文情况
		$("#fwqk").click(function(){
            getFawenAll();
		});
		//发展趋势
		$("#fzqs").click(function(){
			getAreaChartData();
		});
		$('#bgxl').click(function(){
			getCircleChartData()
		})
		
		$(".date-picker1").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true,
			format: "yyyy-mm-dd"
		}).on("changeDate",function(){
			getBanwenAll();//办文总量
		});
		
		$(".date-picker2").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true,
			format: "yyyy-mm-dd"
		}).on("changeDate",function(){
			getFawenAll();//发文情况
		});
		
		$(".date-picker4").datepicker({
			language:"zh-CN",
		    rtl: Metronic.isRTL(),
		    orientation: "",
		    format: "yyyy-mm",
			minViewMode: 1,
		    autoclose: true
		}).on("changeDate",function(){
			getCircleChartData();//办公效率
		});
		
		
		$("#lineTypeBw").change(function(){
			getBanwenAll();
		});
		$("#lineTypeFw").change(function(){
			getFawenAll();
		});
	}
	
	var initUnitTree = function() {
		$("#deptName").createSelecttree({
			url :deptTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#deptName").val(data.node.text);
				$("#deptId").val(data.node.id);
			}
		});
	}
	
    var getBanwenAll= function(){
        $.ajax({
            url:"/app/fyp/manageDocument/total",
            data:{
                type:$("#lineTypeBw option:selected").val(),
				time:$("#searchDate").val()
            },
            dataType:"json",
            success:function(res){
                if(res.result=="success"){
                    var data = {
                        "title":"各局办文总量数据统计",
                        "xdata":[],
                        "ydata":[]
                    }
					$.each(res.data,function(i, o){
						data.xdata.push(o.deptName);
						data.ydata.push([i,0,o.count]);
					})
                    init3dBarChart('container',data);
                }
            }
        })
    }
    var getFawenAll= function(){
        $.ajax({
            url:"/app/fyp/manageDocument/overview",
            data:{
            	type:$("#lineTypeFw option:selected").val(),
                time:$("#searchDate2").val()
            },
            dataType:"json",
            success:function(res){
                if(res.result=="success"){
                    var data = {
                        "title":"各局发文总量数据统计",
                        "xdata":[],
                        "ydata":[]
                    }
					$.each(res.data,function(i, o){
						data.xdata.push(o.deptName);
						data.ydata.push([i,0,o.count]);
					})
					init3dBarChart('container2',data);
                }
            }
        })
    }
	
	
	var init3dBarChart = function(id,data){ //echart
		var charts = echarts.init(document.getElementById(id));
		charts.setOption({
			color: ['#1A54F7'], 
			title: {
			    text: '',
			    x: 'center'
			},
			tooltip: {},
			xAxis3D: {
			    type: 'category',
			    data: data.xdata,
			    axisLine:{
			        lineStyle:{
			            color:'#1F3F81',
			            width:1
			        }
			    },
			    axisLabel: {
			    	rotate:30,
			    	textStyle: {
					    color: '#fff',
					  }
				},
			    splitLine: {
				  lineStyle: {
				    type: 'dotted',
				    color: '#13296D' //刻度线颜色
				  }
				}
			},
			yAxis3D: {
			    type: 'category',
			    data: [''],
			    axisLine:{
			        lineStyle:{
			            color:'#1F3F81',
			            width:1
			        }
			    },
			    splitLine: {
				  lineStyle: {
				    type: 'dotted',
				    color: '#13296D' //刻度线颜色
				  }
				},
			    axisLabel: {
			    	rotate:30,
			    	textStyle: {
					    color: '#fff',
					  }
				}
			},
			zAxis3D: {
			    type: 'value',
			    axisLine:{
			        lineStyle:{
			            color:'#1F3F81',
			            width:1
			        }
			    },
			    splitLine: {
				  lineStyle: {
				    type: 'dotted',
				    color: '#13296D' //刻度线颜色
				  }
				},
			    axisLabel: {
			    	rotate:30,
					textStyle: {
					    color: '#fff',
					}
				}
			},
			grid3D: {
			    boxWidth: 260,
			    boxDepth: 20,
			    axisPointer: {
			        show: false
			    },
			    light: {
			        main: {
			            intensity: 1.2
			        },
			        ambient: {
			            intensity: 0.3
			        }
			    },
			    viewControl: {
			        alpha: 80, //控制场景平移旋转
			        beta: 20,
			        minAlpha: 10,
			        maxAlpha: 10,
			        minBeta: 10,
			        maxBeta: 10
			    }
			},
			series: [{
			    type: 'bar3D',
			    name:'1',
			    barSize: 10,
			    data:data.ydata,
			    stack: 'stack',
			    shading: 'lambert'
			}]
		});
	}
	
	
	var getAreaChartData = function () {
		$.ajax({
			url:'/app/fyp/manageDocument/trend',
			dataType:'json',
			data:{
                deptid:$("#deptId").val()
            },
			success:function(res){
				if(res.result=='success'){
					var data = {
						xdata:[],
						ydata:[{
							name: '呈批公文',
							type: 'line',
							stack: '总量',
							areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0,0,0,1,[{
										offset:1,
										color:'rgba(39,221,225,0.8)'
									},{
										offset:0,
										color:'rgba(39,221,225,0.1)'
									}])
								}
							},
							data:[]
						},{
							name: '来文办理',
							type: 'line',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0,0,0,1,[{
										offset:1,
										color:'rgba(36,127,246,0.8)'
									},{
										offset:0,
										color:'rgba(36,127,246,0.1)'
									}])
								}
							},
							data:[]
						}]
					}
					res.data.forEach(e=>{
						data.xdata.push(e.month);
						data.ydata[0].data.push(e.submitCount);
						data.ydata[1].data.push(e.receiveCount)
					})
					initAreaChart(data)
				}
			}
		})
	}
	
	var initAreaChart = function(data){
		var charts = echarts.init(document.getElementById("container3"));
		charts.setOption({
			title: {
				text: ''
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						/*backgroundColor: '#6a7985'*/
					}
				}
			},
			legend: {
				data: ['呈批公文', '来文办理'],
				textStyle:{
					color:'#fff'
				}
			},
			toolbox: {
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: data.xdata,
					splitLine: {
					  lineStyle: {
					    type: 'dotted',
					    color: '#13296D' //刻度线颜色
					  }
					},
					axisLabel: {
					  textStyle: {
					    color: '#fff',
					   // fontSize: 12
					  }
					},
				}
			],
			yAxis: [
				{
					type: 'value',
					splitLine: {
						  lineStyle: {
						    type: 'dotted',
						    color: '#13296D' //刻度线颜色
						  }
						},
					axisLabel: {
					  textStyle: {
					    color: '#fff',
					   // fontSize: 12
					  }
					},
				}
			],
			series: data.ydata
		});
	}

	//办公效率
	var getCircleChartData = function () {
		var first = {};
		var second= {};
		var three= {};
		$.ajax({
			url:'http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/manageDocument/submitEfficiency',
			dataType:'json',
			data:{
				 deptid:'',
				 time:$("#searchDate4").val()
			},
			async:false,
			success:function(res){
				if(res.result=='success'){
					first.percentage = res.data[0].percentage;
					$("#firstCq").html(res.data[0].notEnd);
					$("#firstPjsc").html(res.data[0].timeCount);
				}
			}
		});
		$.ajax({
			url:'http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/manageDocument/handleEfficiency',
			dataType:'json',
			data:{
				 deptid:'',
				 time:$("#searchDate4").val()
			},
			async:false,
			success:function(res){
				if(res.result=='success'){
					second.percentage = res.data[0].percentage;
					$("#secondCq").html(res.data[0].notEnd);
					$("#secondPjsc").html(res.data[0].timeCount);
				}
			}
		});
		$.ajax({
			url:'http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/manageDocument/readEfficiency',
			dataType:'json',
			async:false,
			data:{
				 deptid:'',
				 time:$("#searchDate4").val()
			},
			success:function(res){
				if(res.result=='success'){
					three.percentage = res.data[0].percentage;
					$("#threePjsc").html(res.data[0].timeCount);
					$("#threeWd").html(res.data[0].notRead);
				}
			}
		})
		initCircleChart(first,second,three);
	}
 
	var initCircleChart = function(obj1,obj2,obj3){
		var charts = echarts.init(document.getElementById("container4"));
		var placeHolderStyle= {
			normal:{
				label:{
					show:false
				},
				labelLine:{
					show:false
				},
				color:'#04194D',
				borderWidth:10
			},
			emphasis:{
				color:'#04194D',
				borderWidth:10
			}
				
		}

		var dataStyle = {
			normal:{
				formatter:'{c}%',
				position:'center',
				show:true,
				textStyle:{
					fontSize:'32',
					fontWeight:'bold',
					color:'#0CB3F2'
				}
			},	
		}
		charts.setOption({
			backgroundColor:'',
			title:[{
				text:'办结率',
				left:'17%',
				top:'75%',
				textAlign:'center',
				textStyle:{
					fontSize:'16',
					fontWeight:'bold',
					color:'#fff',
					textAlign:'center',
					/*borderColor:'#f00',
					borderWidth:4,
					borderRadius:10,
					padding:10*/
				}
			},
			{
				text:'延期',
				left:'50%',
				top:'75%',
				textAlign:'center',
				textStyle:{
					fontSize:'16',
					fontWeight:'normal',
					color:'#fff',
					textAlign:'center'
				}
			},{
					text:'阅件完成率',
					left:'82%',
					top:'75%',
					textAlign:'center',
					textStyle:{
						fontSize:'16',
						fontWeight:'normal',
						color:'#fff',
						textAlign:'center'
					}
				}],
			series:[
				{
					type:'pie',
					hoverAnimation:false,
					radius:['60%','80%'],
					center:['17%','50%'],
					startAngle:225,
					labelLine:{
						normal:{
							show:false
						},
					},
					label:{
						normal:{
							position:'center'
						}
					},
					data:[{
						value:obj1.percentage,
						itemStyle:{
							normal:{
								color:'#0CB1F2'
							}
						},
						label:dataStyle
					},{
						value:parseInt(135-obj1.percentage),
						itemStyle:placeHolderStyle
					}],
				},
				/*
				* 第二个
				* d*/
				{
					type:'pie',
					hoverAnimation:false,
					radius:['60%','80%'],
					center:['50%','50%'],
					startAngle:225,
					labelLine:{
						normal:{
							show:false
						},
					},
					label:{
						normal:{
							position:'center'
						}
					},
					data:[{
						value:obj2.percentage,
						itemStyle:{
							normal:{
								color:'#0CB1F2'
							}
						},
						label:dataStyle
					},{
						value:parseInt(135-obj2.percentage),
						itemStyle:placeHolderStyle
					}],
				},
			/*	第三个*/
				{
					type:'pie',
					hoverAnimation:false,
					radius:['60%','80%'],
					center:['82%','50%'],
					startAngle:225,
					labelLine:{
						normal:{
							show:false
						},
					},
					label:{
						normal:{
							position:'center'
						}
					},
					data:[{
						value:obj3.percentage,
						itemStyle:{
							normal:{
								color:'#0CB1F2'
							}
						},
						label:dataStyle
					},{
						value:parseInt(135-obj3.percentage),
						itemStyle:placeHolderStyle
					}],
				}
			]
		});
	}
	
    return {
        //加载页面处理程序
        initControl: function () {
			getBanwenAll();//默认加载办文
			initUnitTree();
            initother();
        }
    }
}();






