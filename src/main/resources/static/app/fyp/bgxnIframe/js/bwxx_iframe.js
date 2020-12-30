// var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //人员树
var deptTreeUrl = {"url":"/app/base/dept/tree_onlyroot","dataType":"text"}
var date2 = new Date()
var nowYear = date2.getFullYear();
var nowMonth = date2.getMonth();
if(nowMonth==0||nowMonth==1){
	$('#startTime1,#startTime2,#startTime3,#startTime4').val(`${nowYear-1}-01-01`)
	$('#endTime1,#endTime2,#endTime3,#endTime4').val(`${nowYear-1}-12-31`)
}else{
	$('#startTime1,#startTime2,#startTime3,#startTime4').val(`${nowYear}-01-01`)
	$('#endTime1,#endTime2,#endTime3,#endTime4').val(`${nowYear}-12-31`)
}
var pageModule = function () {
	//组织机构树
	var initUnitTree = function() {
		$ajax({
			url:deptTreeUrl,
			success:function(data){
				$("#deptName3").createSelecttree({
					data : data,
					width : '100%',
					success : function(data, treeobj) {
						if(data&&data.id&&data.text){
							$("#deptName3").val(data.text);
						}
					},
					selectnode : function(e, data) {
						$("#deptName3").val(data.node.text);
						$("#deptId3").val(data.node.id);
						getAreaChartData();
					}
				});
				$("#deptName4").createSelecttree({
					data : data,
					width : '100%',
					success : function(data, treeobj) {
						if(data&&data.id&&data.text){
							$("#deptName4").val(data.text);
						}
					},
					selectnode : function(e, data) {
						$("#deptName4").val(data.node.text);
						$("#deptId4").val(data.node.id);
						getCircleChartData();
					}
				});
				/*$("#deptName1").createSelecttree({
					data : data,
					width : '100%',
					success : function(data, treeobj) {},
					selectnode : function(e, data) {
						$("#deptName1").val(data.node.text);
						$("#deptId1").val(data.node.id);
						getBanwenAll();
					}
				});*/
				$("#deptName2").createSelecttree({
					data : data,
					width : '100%',
					success : function(data, treeobj) {},
					selectnode : function(e, data) {
						$("#deptName2").val(data.node.text);
						$("#deptId2").val(data.node.id);
						getFawenAll();
					}
				});
			}
		});

		// $ajax({
		// 	url:userTreeUrl,
		// 	success:function(data){
		// 		$("#deptName1").createSelecttree({
		// 			data : data,
		// 			width : '100%',
		// 			success : function(data, treeobj) {},
		// 			selectnode : function(e, data) {
		// 				$("#deptName1").val(data.node.text);
		// 				$("#deptId1").val(data.node.id);
		// 				getBanwenAll();
		// 			}
		// 		});
		// 		$("#deptName2").createSelecttree({
		// 			data : data,
		// 			width : '100%',
		// 			success : function(data, treeobj) {},
		// 			selectnode : function(e, data) {
		// 				$("#deptName2").val(data.node.text);
		// 				$("#deptId2").val(data.node.id);
		// 				getFawenAll();
		// 			}
		// 		});
		// 	}
		// });
	}


    var getBanwenAll= function(){
        $.ajax({
            url:"/app/fyp/manageDocument/total",
            data:{
                type:$("#lineTypeBw option:selected").val(),
				// time:$("#searchDate").val(),
				deptid:$("#deptId1").val(),
				startTime: $("#startTime1").val(),
				endTime: $("#endTime1").val()
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
					    if(o!=null){
					        data.xdata.push(o.deptName);
                            data.ydata.push({name:o.deptName,value:o.count});
					    }
					})
					initBarChart('container',data);
                }
            }
        })
    }
    var getFawenAll= function(){
        $.ajax({
            url:"/app/fyp/manageDocument/overview",
            data:{
            	type:$("#lineTypeFw option:selected").val(),
                // time:$("#searchDate2").val(),
				deptid:$("#deptId2").val(),
				startTime: $("#startTime2").val(),
				endTime: $("#endTime2").val()
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
						if(o!=null){
                            data.xdata.push(o.deptName);
                            data.ydata.push({name:o.deptName,value:o.count});
                        }
					})
					initBarChart('container2',data);
                }
            }
        })
    }
	var initBarChart = function(id,data){
		var charts = echarts.init(document.getElementById(id));
		/*
        * 在线率统计表数据
        * */
		var option = {
			title: {
				show:false,
				// subtext: '单位（人）',
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
				trigger: 'axis'

			},
			grid:{
				x:100, //控制x轴文字和底部的距离
				y2: 100 //控制倾斜的文字域最右边的距离，防止倾斜的文字超过显示区域
			},
			xAxis: [{
				clickable: true,
				type: 'category',
				data: data.xdata,
				axisLabel: {
//                    margin: 'auto',
					show: true,
					interval: 0,
					rotate:45,
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
				name: data.title,
				type: 'bar',
				data: data.ydata,
				barWidth:13,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0,0,0,1,[{
							offset:1,
							color:'#C2CC23'
						},{
							offset:0,
							color:'#C9CC78'
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
		charts.setOption(option);
	};
	var init3dBarChart = function(id,data){ //echart
		var charts = echarts.init(document.getElementById(id));
		charts.setOption({
			color: ['#1A54F7'],
			title: {
			    text: '',
			    x: 'center'
			},
			tooltip: {
				showContent: false,
				show: false
			},
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
                deptid:$("#deptId3").val(),
				startTime: $("#startTime3").val(),
				endTime: $("#endTime3").val()
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
					if(!res.data){
					}else{
                        res.data.forEach((e,index)=>{
                            data.xdata.push(e.month|| index+1);
                            data.ydata[0].data.push(e.submitCount||0);
                            data.ydata[1].data.push(e.receiveCount||0)
                        })
					}
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
			url:'/app/fyp/manageDocument/submitEfficiency',
			dataType:'json',
			data:{
				 deptid:$("#deptId4").val(),
				startTime: $("#startTime4").val(),
				endTime: $("#endTime4").val()
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
			url:'/app/fyp/manageDocument/handleEfficiency',
			dataType:'json',
			data:{
				 deptid:$("#deptId4").val(),
				startTime: $("#startTime4").val(),
				endTime: $("#endTime4").val()
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
			url:'/app/fyp/manageDocument/readEfficiency',
			dataType:'json',
			async:false,
			data:{
				 deptid:$("#deptId4").val(),
				startTime: $("#startTime4").val(),
				endTime: $("#endTime4").val()
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
				borderWidth:5
			},
			emphasis:{
				color:'#04194D',
				borderWidth:5
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
				top:'80%',
				textAlign:'center',
				textStyle:{
					fontSize:'16',
					fontWeight:'normal',
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
				top:'80%',
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
					top:'80%',
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
						value:obj1.percentage||0,
						itemStyle:{
							normal:{
								color:'#0CB1F2'
							}
						},
						label:dataStyle
					},{
						value:parseInt(135-(obj1.percentage||0)),
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
						value:obj2.percentage||0,
						itemStyle:{
							normal:{
								color:'#0CB1F2'
							}
						},
						label:dataStyle
					},{
						value:parseInt(135-(obj2.percentage||0)),
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
						value:obj3.percentage||0,
						itemStyle:{
							normal:{
								color:'#0CB1F2'
							}
						},
						label:dataStyle
					},{
						value:parseInt(135-(obj3.percentage||0)),
						itemStyle:placeHolderStyle
					}],
				}
			]
		});
	}


	var initother = function(){
		//办文总量
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
		//办公效率
		$('#bgxl').click(function(){
			getCircleChartData()
		})

		$(".date-picker1").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true,
			// minViewMode: 2,
			format: "yyyy-mm-dd"
		}).on("changeDate",function(res){
			var startTime = $('#startTime1').val()
			var endTime = $('#endTime1').val()
			var _this = $(this)
			if(startTime&&endTime){
				if(new Date(startTime).getTime()>new Date(endTime).getTime()){
					if(_this.hasClass('end')){
						$('#startTime1').val(endTime)
					}else{
						$('#endTime1').val(startTime)
					}
				}
			}
			getBanwenAll();//办文总量
		});

		$(".date-picker2").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true,
			// minViewMode: 2,
			format: "yyyy-mm-dd"
		}).on("changeDate",function(){
			var startTime = $('#startTime2').val()
			var endTime = $('#endTime2').val()
			var _this = $(this)
			if(startTime&&endTime){
				if(new Date(startTime).getTime()>new Date(endTime).getTime()){
					// $("#startTime2").datepicker("setDate",endTime)
					if(_this.hasClass('end')){
						$('#startTime2').val(endTime)
					}else{
						$('#endTime2').val(startTime)
					}
				}
			}
			getFawenAll();//发文情况
		});
		$(".date-picker3").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true,
			// minViewMode: 2,
			format: "yyyy-mm-dd"
		}).on("changeDate",function(){
			var startTime = $('#startTime3').val()
			var endTime = $('#endTime3').val()
			var _this = $(this)
			if(startTime&&endTime){
				if(new Date(startTime).getTime()>new Date(endTime).getTime()){
					// $("#startTime3").datepicker("setDate",endTime)
					if(_this.hasClass('end')){
						$('#startTime3').val(endTime)
					}else{
						$('#endTime3').val(startTime)
					}
				}
			}
			getAreaChartData();
		});
		$(".date-picker4").datepicker({
			language:"zh-CN",
		    rtl: Metronic.isRTL(),
		    orientation: "",
		    format: "yyyy-mm-dd",
			// minViewMode: 2,
		    autoclose: true
		}).on("changeDate",function(){
			var startTime = $('#startTime4').val()
			var endTime = $('#endTime4').val()
			var _this = $(this)
			if(startTime&&endTime){
				if(new Date(startTime).getTime()>new Date(endTime).getTime()){
					// $('#startTime4').val(endTime)
					if(_this.hasClass('end')){
						$('#startTime4').val(endTime)
					}else{
						$('#endTime4').val(startTime)
					}
					// $("#startTime4").datepicker("setDate",endTime)
				}
			}
			getCircleChartData();//办公效率
		});
		$("#lineTypeBw").change(function(){
			getBanwenAll();
		});
		$("#lineTypeFw").change(function(){
			getFawenAll();
		});
	}

    return {
        //加载页面处理程序
        initControl: function () {
			// if(isSz==true){
			// 	deptTreeUrl = {"url":"/app/base/dept/tree_onlyroot","dataType":"text"}; //人员树
			// 	initUnitTree();
			// }else{
			// 	$('.hiddenByUser').hide()
			// }
			initUnitTree();
        	getBanwenAll();//默认加载办文
            initother();
        },
		refreshPage:function () {
			if ($('#bgxl').hasClass('active')) {
				getCircleChartData()
			} else if ($('#fzqs').hasClass('active')) {
				getAreaChartData();
			} else if ($('#fwqk').hasClass('active')) {
				getFawenAll();
			} else {
				getBanwenAll();
			}
		}
    }
}();






