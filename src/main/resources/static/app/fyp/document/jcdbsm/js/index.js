var url1 = {"url":"/app/db/documentjcdb/list","dataType":"text"};   //  头部数量的接口
var url2 = {"url":"/app/db/documentjcdb/orglist","dataType":"text"}; //  办理情况
var url3 = {"url":"/app/db/documentjcdb/orglist2","dataType":"text"};   // 落实情况
var url4 = {"url":"/app/db/documentjcdb/orglist3","dataType":"text"};    //完成率图
var url5 = {"url":"/app/db/documentjcdb/orglist4","dataType":"text"};   //
var url6 = {"url":"/app/db/documentjcdb/orglist5","dataType":"text"};
var url7 = {"url":"/app/db/documentjcdb/isShouZhang","dataType":"text"};
var nowYear = new Date().getFullYear();
var nowMonth = new Date().getMonth();
var maxYear = new Date().getFullYear();
//if(nowMonth<2){
//	nowYear--;
//}//改成默认当前年份
var minYear = 2017;
$("#nowYear").html(nowYear);
var pageModule = function(){
	var inittopfn = function(nowYear){
		//设置‘年度’位置的悬浮窗
		var titlecontent = '点击<img src="../image/pre.png" alt="" style="vertical-align: bottom"><img src="../image/next.png" alt="" style="vertical-align: bottom">支持查询其他年度统计信息';
		$("#divTitle").popover({
			trigger:'manual',
			placement:'bottom',
			html:'true',
			content:titlecontent,
			animation:true
		}).on("mouseenter",function(){
			var that = this;
			$(this).popover("show")
			$(this).siblings(".popover").on("mouseleave",function(){
				$(that).popover('hide')
			})
		}).on("mouseleave",function(){
			var that = this;
			setTimeout(function(){
				if(!$(".popover:hover").length){
					$(that).popover("hide")
				}
			},100)
		})
		//
		$ajax({
			url:url1,
			data:{year:nowYear},
			success:function(data){
				var total = data.total;
				var blz = data.blz;
				var bj = data.bj;
				var ctls = data.ctls;
				var wfk = data.wfk;
				var wcl = data.wcl;
				if(wcl !="0%"){
					wcl=wcl.toFixed(2,10)+"%";
				}
				$("#total").attr("title",total);
				if(total>9999){
					$("#total").html("9999+");
				}else{
					$("#total").html(total);
				}
				$("#blz").attr("title",blz);
				if(blz>9999){
					$("#blz").html("9999+");
				}else{
					$("#blz").html(blz);
				}
				$("#bj").attr("title",bj);
				if(bj>9999){
					$("#bj").html("9999+");
				}else{
					$("#bj").html(bj);
				}
				$("#ctls").attr("title",ctls);
				if(ctls>9999){
					$("#ctls").html("9999+");
				}else{
					$("#ctls").html(ctls);
				}
				$("#wfk").attr("title",wfk);
				if(wfk>9999){
					$("#wfk").html("9999+");
				}else{
					$("#wfk").html(wfk);
				}
				$("#wcl").html(wcl);
			}
		});
	}
	var inittable = function(month,year){
		month='all';
		$ajax({
			url:url2,
			data:{month:month,year:year},
			success:function(data){
				$("#tbody").html('');
				$.each(data,function(i){
					var id = this.id;
					var dwname = this.dwname;
					var blz = this.blz;
					var bj = this.bj;
					var ctls = this.ctls;
					var wfk = this.wfk;
					var wcl = this.wcl;
					var state = this.state;
					var type = this.type;
					var month_ = month;
					if(state==0){html=""}
					$("#tbody").append(
						`
							<tr id="${id}">
								<td width="8%">${i+1}</td>
								<td width="25%" title="${dwname}" ><font style="cursor:pointer">${dwname}</font></td>
								<td width="13%"><font style="cursor:pointer" onclick="topage('${id}','${type}','${month_}','1','${state}')">${blz}</font></td>
								<td width="13%"><font style="cursor:pointer" onclick="topage('${id}','${type}','${month_}','2','${state}')">${bj}</font></td>
								<td width="15%"><font style="cursor:pointer" onclick="topage('${id}','${type}','${month_}','3','${state}')">${ctls}</font></td>
								<td width="15%"><font style="cursor:pointer" onclick="topage('${id}','${type}','${month_}','4','${state}')">${wfk}</font></td>
								<td width="15%"><font style="cursor:pointer">${wcl}</font></td>
							</tr>
						`
					);
				});
				$("#tbody tr").unbind("click");
				$("#tbody tr").click(function(){
				})
			}
		});

	}
	var inittable2 = function(startdate,enddate,year){
		$ajax({
			url:url6,
			data:{startDate:startdate,endDate:enddate,year:year},
			success:function(data){
				$("#tbody2").html('');
				var ifclick = data.clickFlag;
				var isLeaderType = data.type;
				$.each(data.list,function(i){
					var id = this.id;
					var leaderid = this.leaderId;
					var dwname = this.leaderName;
					var blz = this.blzCount;
					var bj = this.ybjCount;
					var ctls = this.ctlsCount;
					var wfk = this.wfkCount;
					$("#tbody2").append(
						`
							<tr id="${id}">
								<td width="5%">${i+1}</td>
								<td width="30%"><a name="all" ifclick="${ifclick}" isLeaderType="${isLeaderType}" id="${leaderid}">${dwname}</a></td>
								<td width="13%"><a name="1" ifclick="${ifclick}" isLeaderType="${isLeaderType}" id="${leaderid}">${blz}</a></td>
								<td width="13%"><a name="2" ifclick="${ifclick}" isLeaderType="${isLeaderType}" id="${leaderid}">${bj}</a></td>
								<td width="15%"><a name="3" ifclick="${ifclick}" isLeaderType="${isLeaderType}" id="${leaderid}">${ctls}</a></td>
								<td width="15%"><a name="4" ifclick="${ifclick}" isLeaderType="${isLeaderType}" id="${leaderid}">${wfk}</a></td>
							</tr>
						`
					);
				});

				$("#tbody2 tr a").unbind("click");
				$("#tbody2 tr a").click(function(){

					var type = $(this).attr("name");//0 全部 ，1办理中，2已 办结 ，3常态落实
					var leaderid = $(this).attr("id");

					var ifclick = $(this).attr("ifclick");
					var isLeaderType = $(this).attr("isLeaderType");
					if(ifclick=="false"){
						$('#alertContent').text('您没有权限查看此数据!')
						$("#alertInfo").modal("show");
				        setTimeout(function(){
				        	$("#alertInfo").modal("hide");
						},1000)
						return;
					}

					var startdate = $("#startdate").val();
					var enddate = $("#enddate").val();
					sessionStorage.setItem('status',type);
					sessionStorage.setItem('leaderId',leaderid);
					sessionStorage.setItem('startdate',startdate);
					sessionStorage.setItem('enddate',enddate);
/*					gettop2().memory = {};
					gettop2().memory.status = type;
					gettop2().memory.leaderId = leaderid;
					gettop2().memory.startdate = startdate;
					gettop2().memory.enddate = enddate;*/
					console.log(isLeaderType)
					if(isLeaderType==1){
						window.location.href = "../../tjsj/html/tjsj2.html?status="+type+"&leaderId="+leaderid+"&startdate="+startdate+"&enddate="+enddate+"&nowYear="+nowYear;
					}else{
						window.location.href = "../../tjsj/html/tjsj.html?status="+type+"&leaderId="+leaderid+"&startdate="+startdate+"&enddate="+enddate+"&nowYear="+nowYear;
					}
				})
			}
		});


	}
	var initpage = function(year){
		require.config({
		    paths:{
		        echarts:'../js/echarts',
		        'echarts/chart/bar' : '../js/echarts-map',
		        'echarts/chart/line': '../js/echarts-map',
		        'echarts/chart/map' : '../js/echarts-map'
		    }
		});
		require(
		    [
		        'echarts',
		        'echarts/chart/bar',
		        'echarts/chart/line',
		        'echarts/chart/map'
		    ],
		    function (ec) {
		    	initchart1(ec,year);
		    	initchart2(ec,year);
		    	initchart3(ec,year);
				setPage();
		    }
		);
	}
	var initchart1 = function(ec,year){
		$ajax({
			url:url3,
			data:{year:year},
			success:function(data){
				var legend = data.legend;
				var xdata = data.xdata;
				var blzdata = data.blzdata
				var bjdata = data.bjdata
				var ctlsdata = data.ctlsdata
				var wfkdata = data.wfkdata
				//var myChart = echarts.init(document.getElementById('chart1'));
			    var myChart = ec.init(document.getElementById('chart1'));
			    myChart.setOption({
			    	grid:{
			    		x:50,
			    		y:30,
			    		x2:30,
			    		y2:80,
			    		borderWidth:0
			    	},
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				    	padding:[0,30,0,0],
				    	x:"right",
				    	textStyle:{color: '#C8D3FF'},
				        data:legend
				    },
				    xAxis : [
				        {
				        	splitLine:false,
				        	axisLine:{
				        		lineStyle:{color: '#C8D3FF', width: 1, type: 'solid'}
				        	},
				        	axisTick:{
				        		lineStyle:{color: '#C8D3FF', width: 1}
				        	},
				        	axisLabel:{
				        		rotate:40,
				        		textStyle:{color: '#C8D3FF'}
				        	},
				            type : 'category',
				            data : xdata
				        }
				    ],
				    yAxis : [
				        {
				        	axisLine:false,
				        	splitLine:{
				        		lineStyle:{color: ['#223172'], width: 1, type: 'solid'}
				        	},
				        	axisLabel:{
				        		textStyle:{color: '#C8D3FF'}
				        	},
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'办理中',
				            itemStyle:{
							    normal: {
							    	color : (function (){
				                        var zrColor = require('zrender/tool/color');
				                        return zrColor.getLinearGradient(
				                            0, 0, 0, 200,
				                            [[0, '#F7EFA7'],[1, '#F59C24']]
				                        )
				                    })()
							    }
				            },
				            type:'bar',
				            barWidth:10,
				            data:blzdata
				        },
				        {
				            name:'已办结',
				            itemStyle:{
							    normal: {
							    	color : (function (){
				                        var zrColor = require('zrender/tool/color');
				                        return zrColor.getLinearGradient(
				                            0, 0, 0, 200,
				                            [[0, '#CCEBFF'],[1, '#2472D6']]
				                        )
				                    })()
							    }
				            },
				            type:'bar',
				            barWidth:10,
				            data:bjdata
				        },
				        {
				            name:'常态落实',
				            itemStyle:{
							    normal: {
							    	color : (function (){
				                        var zrColor = require('zrender/tool/color');
				                        return zrColor.getLinearGradient(
				                            0, 0, 0, 200,
				                            [[0, '#EDBBBC'],[1, '#FF3E3E']]
				                        )
				                    })()
							    }
				            },
				            type:'bar',
				            barWidth:10,
				            data:ctlsdata
				        },
						{
							name:'未反馈',
							itemStyle:{
								normal: {
									color : (function (){
										var zrColor = require('zrender/tool/color');
										return zrColor.getLinearGradient(
											0, 0, 0, 200,
											[[0, '#99D587'],[1, '#2C3B68']]
										)
									})()
								}
							},
							type:'bar',
							barWidth:10,
							data:wfkdata
						}
				    ]
			    });

			    var otherdata = data.otherdata;
				myChart.on("click",function(o,n){
					var name = o.name;
					var seriesIndex = o.seriesIndex;
					var value = o.value;

					var object = otherdata[name];
					var state = object.state;
					var id = object.id;
					var type = object.type;
					var month = object.month;
					var ytype = '0';
					if(seriesIndex==0){
						ytype = 1;
					}else if(seriesIndex==1){
						ytype = 2;
					}else if(seriesIndex==2){
						ytype = 3;
					}else if(seriesIndex==3){
						ytype = 4;
					}
					if(state!=0){
						topage(id,type,month,ytype,state);
					}

				})
			}
		});

	}
	var initchart2 = function(ec,year){

		$ajax({
			url:url4,
			data:{year:year},
			success:function(data){
				var legend = data.legend;
				var valdata = data.valdata;
				var array = [
								{itemStyle:{normal: {color:"#87CEFA"}}},
								{itemStyle:{normal: {color:"#A3A4A8"}}},
								{itemStyle:{normal: {color:"#4675CF"}}},
								{itemStyle:{normal: {color:"#F37923"}}},
								{itemStyle:{normal: {color:"#FFBB04"}}},
								{itemStyle:{normal: {color:"#73AF3D"}}},
							]
				$.each(valdata,function(i){
					this.itemStyle = array[i].itemStyle;
				});
				//var myChart = echarts.init(document.getElementById('chart2'));
			    var myChart = ec.init(document.getElementById('chart2'));
			    myChart.setOption({
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				    	textStyle:{color: '#C8D3FF'},
				        // orient : 'vertical',
				             y : '75%',
//				        bottom:'bottom',
				        data:legend
				    },
				    calculable : false,
				    series : [
				        {
				            name:'落实事项',
				            type:'pie',
				            //解决遮挡问题
				            minAngle:20,
				            avoidLabelOverlap:true,
				            center:['50%', '42%'],
				            radius : ['30%', '48%'],
				            itemStyle : {
							    normal: {
							        label:{
							        	show:true,
							        	formatter:"{d}%",
							        	textStyle:{
							        		fontWeight:"bold"
							        	}
							        },
									labelLine:{show:true,length:20},
							    },
				            },
				            data:valdata
				        }
				    ]
				});
			}
		});

	}
	var initchart3 = function(ec,year){

		$ajax({
			url:url5,
			data:{year:year},
			success:function(data){

				var xdata = data.xdata;
				var wcldata = data.wcldata;
				var array1 =[
								{itemStyle:{normal: {
									color : (function (){
				                        var zrColor = require('zrender/tool/color');
				                        return zrColor.getLinearGradient(
				                            0, 0, 0, 200,
				                            [[0, '#F7EFA7'],[1, '#F59C24']]
				                        )
				                    })()
								}}},
								{itemStyle:{normal: {
									color : (function (){
				                        var zrColor = require('zrender/tool/color');
				                        return zrColor.getLinearGradient(
				                            0, 0, 0, 200,
				                            [[0, '#CCEBFF'],[1, '#2472D6']]
				                        )
				                    })()
								}}},
								{itemStyle:{normal: {
									color : (function (){
				                        var zrColor = require('zrender/tool/color');
				                        return zrColor.getLinearGradient(
				                            0, 0, 0, 200,
				                            [[0, '#EDBBBC'],[1, '#FF3E3E']]
				                        )
				                    })()
								}}},
								{itemStyle:{normal: {
									color : (function (){
				                        var zrColor = require('zrender/tool/color');
				                        return zrColor.getLinearGradient(
				                            0, 0, 0, 200,
				                            [[0, '#F7EFA7'],[1, '#F59C24']]
				                        )
				                    })()
								}}},
								{itemStyle:{normal: {
									color : (function (){
				                        var zrColor = require('zrender/tool/color');
				                        return zrColor.getLinearGradient(
				                            0, 0, 0, 200,
				                            [[0, '#CCEBFF'],[1, '#2472D6']]
				                        )
				                    })()
								}}},
								{itemStyle:{normal: {
									color : (function (){
				                        var zrColor = require('zrender/tool/color');
				                        return zrColor.getLinearGradient(
				                            0, 0, 0, 200,
				                            [[0, '#EDBBBC'],[1, '#FF3E3E']]
				                        )
				                    })()
								}}}
							];
				var array2 = []
				$.each(wcldata,function(i,val){
					var obj = {value:val.toFixed(2,10),itemStyle:array1[i].itemStyle}
					array2.push(obj)
				})
				wcldata = array2;
				//var myChart = echarts.init(document.getElementById('chart3'));
			    var myChart = ec.init(document.getElementById('chart3'));
			    myChart.setOption({
			    	grid:{
			    		x:70,
			    		y:30,
			    		x2:30,
			    		y2:90,
			    		borderWidth:0
			    	},
				    tooltip : {
				        trigger: 'axis',
				        formatter: function(array){
		        			return array[0][1]+":"+array[0][2]+"%"
		        		}
				    },
				    xAxis : [
				        {
				        	splitLine:false,
				        	axisLine:false,
				        	axisTick:false,
				        	axisLabel:{
				        		rotate:30,
				        		textStyle:{color: '#C8D3FF'}
				        	},
				            type : 'category',
				            data : xdata
				        }
				    ],
				    yAxis : [
				        {
				        	axisLine:false,
				        	axisLabel:{
				        		textStyle:{color: '#C8D3FF'},
				        		formatter:function(val){
				        			return val+"%"
				        		}
				        	},
				        	splitLine:{
				        		lineStyle:{color: ['#223172'], width: 1, type: 'solid'}
				        	},
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'完成率',
				            itemStyle:{
							    normal: {
							    	label:{
							    		show:true,
							    		formatter:"{c}%"
							    	},
							    	color:"#76B1F3"
							    }
				            },
				            type:'bar',
				            barWidth:25,
				            data:wcldata
				        }
				    ]
			    });

			}
		});

	}
	var initchoice = function(){
		inittable2($("#startdate").val(),$("#enddate").val(),nowYear);
		initpage(nowYear);
        inittopfn(nowYear);
        inittable('all',nowYear);
	}
	var initother = function(){
        //新加的功能，添加年份选择
        $("#lastYear").click(function () {
            if(minYear>=nowYear){
                return
            }
            nowYear--;
            $("#nowYear").html(nowYear);
            initchoice()
        })
        $("#nextYear").click(function () {
            if(nowYear>=maxYear){
                return
            }
            nowYear++;
            $("#nowYear").html(nowYear);
            initchoice()
        })
		// var newdate = new Date();
		// var newyear = newdate.getFullYear();
		// var newmonth = newdate.getMonth();
		// var comparemonth = newdate.getMonth()+1;
		// if(comparemonth == 1){
		// 	newmonth = 12;
		// 	newyear= parseInt(newyear)-1;
		// }
		// if(newmonth<10){
		// 	newmonth = "0"+newmonth;
		// }
		// $(".newDateVal").val(newyear+"年"+newmonth+"月"+"01日"); //new
		// var month = newdate.format("MM");
		// $(".bs-select").val(month);
		// $(".bs-select").selectpicker({
		//     iconBase: "fa",
		//     tickIcon: "fa-check"
		// });
		// $("#select").change(function(){
		// 	var month = this.value;
		// 	inittable(month,nowYear);
		// })

		$("#listbutton").unbind('click').click(function(){
			window.location.href = "main.html";
		});
		$("#calendar_btn").unbind('click').click(function(){
			$("#clocker").toggle();
		});
		var o1 = false;
		$(".date-picker").datepicker({
		    language:"zh-CN",
		    rtl: Metronic.isRTL(),
		    orientation: "left",
		    autoclose: true
		}).on("changeDate",function(e1,e2){
			$("#clocker").hide();
			if(o1){clearTimeout(o1)};
			o1 = setTimeout(function(){
				var startdate = $("#startdate").val();
				var enddate = $("#enddate").val();
				/*if(startdate.length==10){startdate = startdate.substr(0,4)+"-"+startdate.substr(5,2)+"-"+startdate.substr(8,2);}
				if(enddate.length==10){enddate = enddate.substr(0,4)+"-"+enddate.substr(5,2)+"-"+enddate.substr(8,2);}*/
				inittable2(startdate, enddate, nowYear);

			},100);
		});
	}
	var initguazaishouzhang = function(){
		$ajax({
			url:url7,
			success:function(data){
				if(data.szFlag== "1" || data.szFlag =="2"){
					$(".layout-top").show();
				}
			}
		});
	}
	return{
		//加载页面处理程序
		initControl:function(){
            initother();
			initchoice();
			//initguazaishouzhang();
            $(".layout-top").show();
		}
	}

}();

// 选择年限图标显示处理
var setPage = function(){
	if(nowYear>=maxYear){
		$('#next2').show()
		$('#next1').hide()
	}else{
		$('#next1').show()
		$('#next2').hide()
	}
	if(minYear>=nowYear){
		$('#pre2').show()
		$('#pre1').hide()
	}else{
		$('#pre1').show()
		$('#pre2').hide()
	}
}
var topage = function(orgid,type,month,ytype,state){
/*	alert(orgid);
	alert(type);
	alert(month);
	alert(ytype);
	if(null!=ytype&&typeof(ytype)!="undefined"&&""!=$.trim(ytype)){
	};*/
	if(type==1){
		/*gettop2().indexobject = {
			ifmenu:"false",
			orgid:orgid,
			month:month,
			ytype:ytype
		}*/
		sessionStorage.setItem('orgid',orgid);
		sessionStorage.setItem('month',month);
		sessionStorage.setItem('ytype',ytype);
		window.location.href = "/app/db/document/jcdb/html/table2.html?orgid="+orgid+"&month="+month+"&ytype="+ytype+"&nowYear="+nowYear;
	}else{
		if(state==3){
			$('#alertContent').text('仅支持点击查看本单位数据!')
			$("#alertInfo").modal("show");
	        setTimeout(function(){
	        	$("#alertInfo").modal("hide");
			},1000)
			return;
		}else if (state==4){
			$('#alertContent').text('您没有权限查看此数据!')
			$("#alertInfo").modal("show");
	        setTimeout(function(){
	        	$("#alertInfo").modal("hide");
			},1000)
			return;
		}else{
			//window.location.href = "/app/db/document/blfk/html/blfk.html?fileFrom=jcdb&ifmenu=false&orgid="+orgid+"&month="+month+"&ytype="+ytype+"&nowYear="+nowYear;
			window.location.href = "/app/db/document/jndb/html/jndb.html?fileFrom=jcdb&ifmenu=false&orgid="+orgid+"&month="+month+"&ytype="+ytype+"&nowYear="+nowYear;
		}
	}
}
