var deptTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //单位树--待定
var pageModule = function () {
	var initother = function(){
		//发文情况
		$("#fwqk").click(function(){
            getFawenAll();
		});
		//发展趋势
		$("#fzqs").click(function(){
			getLineChartData();
		});
		
		
		$(".date-picker1").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true
		}).on("changeDate",function(){
			getBanwenAll();//办文总量
		});
		
		$(".date-picker2").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true
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
			//办公效率
		});
		
	}
	
	var initUnitTree = function() {
		$("#deptName").createSelecttree({
			url: deptTreeUrl,
			width: '100%',
			success: function(data, treeobj) {},
			selectnode: function(e, data) {
				$("#deptName").val(data.node.text);
				$("#deptId").val(data.node.id);
			}
		});
	}
	
    var getBanwenAll= function(){
        $.ajax({
            url:"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/manageDocument/total",
            data:{
                type:1,
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
            url:"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/manageDocument/overview",
            data:{
                type:1,
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
				  textStyle: {
				    color: '#fff',
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
			    axisLabel: {
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
			    axisLabel: {
				  textStyle: {
				    color: '#fff',
				  }
				}
			},
			grid3D: {
			    boxWidth: 220,
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
			        alpha: 0, //控制场景平移旋转
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
	
	
	var getLineChartData = function () {
		$.ajax({
			url:'http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/manageDocument/trend',
			dataType:'json',
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
					splitLine:{
						lineStyle:{
							color:'#5092C1'
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
					splitLine:{
						lineStyle:{
							color:'#5092C1'
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
	/* var getCircleChartData = function () {
		$.ajax({
			url:'',
			dataType:'json',
			success:function(res){
				if(res.result=='success'){
					
				}
			}
		})
	}
 */
    return {
        //加载页面处理程序
        initControl: function () {
			getBanwenAll();//默认加载办文
			//initUnitTree();
            initother();
        }
    }
}();



