var tableList= {"url":"/app/db/documentinfo/replyList","dataType":"text"};//原table数据
var fileFrom=getUrlParam("fileFrom")||""; //文件来源
var typeId = getUrlParam("typeId");
var newGrid = null;
var newGrid2 = null;
var newGrid3 = null;
var total=0;//列表中，数据的总条数
var tableNum = getUrlParam("tableNum");
if(!window.top.memory){
	window.top.memory = {};
}
var o = window.top.memory;
var page = 1;
var pageSize = 100000;
var initFlag = '1';
var pageModule = function(){
	var initTableNum = function(){
		if(typeId==1||typeId==2||typeId==4){
			$('#timeTitle').html("批示指示时间");
			$(".date-picker").datepicker({
			    language:"zh-CN",
			    rtl: Metronic.isRTL(),
			    orientation: "right",
			    format : "yyyy年mm月dd日",
			    autoclose: true
			});
		}else if(typeId==3||typeId==5||typeId==6 ){
			$('#timeTitle').html('转办时间');
			$(".date-picker").datepicker({
			    language:"zh-CN",
			    rtl: Metronic.isRTL(),
			    orientation: "right",
			    format : "yyyy-mm-dd",
			    autoclose: true
			});
		};
		if(tableNum == "3"){ //部领导批示指示 
			window.top.memory.tree = "3";
			$("#gridcont3").show();
			$("#gridcont2").hide();
			$("#gridcont4").hide();
			$("#gridcont").hide();
			refreshgrid3();
		}else if(tableNum == "2"){//分工
			window.top.memory.tree = "2";
			$("#gridcont3").hide();
			$("#gridcont").hide();
			$("#gridcont2").show();
			$("#gridcont4").hide();
			refreshgrid2();
		}else if(tableNum == "4"){//批示
			window.top.memory.tree = "4";
			$("#gridcont3").hide();
			$("#gridcont2").hide();
			$("#gridcont").hide();
			$("#gridcont4").show();
			refreshgrid4();
		}else{//批示
			window.top.memory.tree = "1";
			$("#gridcont3").hide();
			$("#gridcont2").hide();
			$("#gridcont4").hide();
			$("#gridcont").show();
			refreshgrid1();
		}
	}
	var initgrid = function(){
        newGrid = $("#gridcont").createGrid({
            columns:[
            	{display:"军委办件号",name:"",width:"8%",align:"left",title:true,render:function(rowdata,n){
               	 	return rowdata.banjianNumber;
                }},
                {display:"办理状态",name:"",width:"8%",align:"center",render:function(rowdata,n){
                	var statusName="";
               	 	var bgColor="";
               	 	if(rowdata.status==1){
	               	 	statusName="办理中";
	               		bgColor="#2BAA81";
            	 	}else if(rowdata.status==2){
	               	 	statusName="已办结";
	               		bgColor="#BCBCBC";
               	 	}else if(rowdata.status==3){
	               	 	statusName="常态落实";
	               	 	bgColor="#BCBCBC";
               	 	}
  				  	return '<div title="'+statusName+'" class="btn btn-xs btn-color" style="background-color:'+bgColor+';">'+statusName+'</div>';
                 }},
                 {display:"办件标题",name:"",width:"15%",align:"left",title:false,render:function(rowdata){
                	 var cuiban="";
                 	 if(rowdata.cuibanFlag=="1"){
                 		 cuiban = '<label class="cuibanlabel">催办</label>';
                	 }
                	 return '<a title="'+rowdata.docTitle+'" class="tabletitle" href="../../djlr/html/djlr_view.html?fileId='+rowdata.id+'&fileFrom='+fileFrom+'" target="iframe1" onclick="closeTable()">'+cuiban+'<span class="tabletitle2">'+rowdata.docTitle+'</span></a>'
                 }},
                 {display:"批示指示内容",name:"",width:"26%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 /*var szpsCont="";
                	 var leaderTime1="";
                	 if(rowdata.leaderTime!="" && rowdata.leaderTime!=null){
                		 leaderTime1= rowdata.leaderTime.substring(0,16);
                	 }
                	 if(rowdata.leaderName && rowdata.leaderContent){
                		 szpsCont=rowdata.leaderName+":"+rowdata.leaderContent+" "+leaderTime1
                	 }
                	 return '<div class="zspsnr" onclick="pszsnrAlert(\''+rowdata.id+'\')" title="'+szpsCont+'">'+szpsCont+'</div>';*/
                	 var html1="";
                	 $.each(rowdata.szpslist,function(i,item){
                		 var createdTime="";
                		 if(item.createdTime!="" && item.createdTime!=null){
                			 createdTime= item.createdTime.substring(0,16);
                		 }
                		 html1+=item.userName+'&nbsp;&nbsp;'+createdTime+'批示：'+item.leaderComment+'&nbsp;&nbsp;&nbsp;'
     				 });
                	 return '<div class="zspsnr" onclick="pszsnrAlert(\''+rowdata.id+'\')">'+html1+'</div>';
                 }},
                 {display:"督办落实情况",name:"",width:"21%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 var duban="";
                 	 if(rowdata.updateFlag=="1"){
                 		duban = '<label class="cuibanlabel">已更新</label>';
                	 }
                	 var dbCont="";
                	 if(rowdata.latestReply){
                		dbCont=rowdata.latestReply;
                	 }
                	 return '<div class="dblsqk" onclick="dblsqkAlert(\''+rowdata.id+'\')" title="'+dbCont+'">'+duban+'<span>'+dbCont+'</span></div>';
                 }},
                 {display:"承办单位/人",name:"",width:"10%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 return '<div class="cbdw" title="'+rowdata.underDepts+'">'+rowdata.underDepts+'</div>'
                 }},
                 {display:"转办时间",name:"",width:"6%",align:"center",render:function(rowdata){
                	 if(rowdata.firstZbTime && !!rowdata.firstZbTime){
                		 return rowdata.firstZbTime.substring(0,16);
                	 }
                	 return '';
                 }},
                 {display:"反馈时间",name:"",width:"6%",align:"center",paixu:false,render:function(rowdata){
                	 if(rowdata.latestReplyTime && !!rowdata.latestReplyTime){
                		 return rowdata.latestReplyTime.substring(0,16);
                	 }
                	 return '';
                 }}
            ],
            width:"100%",
            height:"100%",
            checkbox: true,
            rownumberyon:true,
            overflowx:false,
            pagesize: 10000,
            pageyno:false,
            paramobj:{search:"",status:"",typeId:typeId,startDate:$('#designStart').val(),endDate:$('#designEnd').val(),pagesize:pageSize,page:page,initFlag:initFlag},
            loadafter:function(data){
            	total=data.total;
            	if(data.rows.length>0){
            		$('#showNone').hide()
            	}
            	$(".zspsnr").each(function(){
					var maxwidth = 85;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".dblsqk span").each(function(){
					var maxwidth = 64;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".tabletitle2").each(function(){
					var maxwidth = 46;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".cbdw").each(function(){
					var maxwidth = 32;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            },
            url: tableList
       });
	}
	
	var initgrid2 = function(){
        newGrid2 = $("#gridcont2").createGrid({
            columns:[
            	{display:"印发时间",name:"",width:"6%",align:"center",paixu:false,render:function(rowdata){
            		if(rowdata.printDate && rowdata.printDate!="" && rowdata.printDate!="null" && rowdata.printDate!=null){
            			return rowdata.printDate.substring(0,16);
	               	}
	               	return '';
                }},
                {display:"办理状态",name:"",width:"6%",align:"center",render:function(rowdata,n){
                	var statusName="";
               	 	var bgColor="";
               	 	if(rowdata.status==1){
	               	 	statusName="办理中";
	               		bgColor="#2BAA81";
            	 	}else if(rowdata.status==2){
	               	 	statusName="已办结";
	               		bgColor="#BCBCBC";
               	 	}else if(rowdata.status==3){
	               	 	statusName="常态落实";
	               	 	bgColor="#BCBCBC";
               	 	}
  				  	return '<div title="'+statusName+'" class="btn btn-xs btn-color" style="background-color:'+bgColor+';">'+statusName+'</div>';
                }},
                {display:"办件标题",name:"",width:"15%",align:"left",render:function(rowdata){
                	 var cuiban="";
                 	 if(rowdata.cuibanFlag=="1"){
                 		 cuiban = '<label class="cuibanlabel">催办</label>';
                	 }
                	 return '<a title="'+rowdata.docTitle+'" class="tabletitle" href="../../djlr/html/djlr_view.html?fileId='+rowdata.id+'&fileFrom='+fileFrom+'" target="iframe1"  onclick="closeTable()">'+cuiban+'<span class="tabletitle2">'+rowdata.docTitle+'</span></a>'
                 }},
                 {display:"工作分工内容",name:"",width:"21%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 return '<div class="gzfgnr" title="'+rowdata.jobContent+'">'+rowdata.jobContent+'</div>';
                 }},
                 {display:"督办落实情况",name:"",width:"30%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 var duban="";
                 	 if(rowdata.updateFlag=="1"){
                 		duban = '<label class="cuibanlabel">已更新</label>';
                	 }
                	 var dbCont="";
                	 if(rowdata.latestReply){
                		dbCont=rowdata.latestReply;
                	 }	 
                	 return '<div class="dblsqk"  onclick="dblsqkAlert(\''+rowdata.id+'\')" title="'+dbCont+'">'+duban+'<span>'+dbCont+'</span></div>';
                 }},
                 {display:"承办单位/人",name:"",width:"10%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 return '<div class="cbdw" title="'+rowdata.underDepts+'">'+rowdata.underDepts+'</div>'
                 }},
                 {display:"转办时间",name:"",width:"6%",align:"center",render:function(rowdata){
                	 if(rowdata.firstZbTime && !!rowdata.firstZbTime){
                		 return rowdata.firstZbTime.substring(0,16);
                	 }
                	 return '';
                 }},
                 {display:"反馈时间",name:"",width:"6%",align:"center",paixu:false,render:function(rowdata){
                	 if(rowdata.latestReplyTime && !!rowdata.latestReplyTime){
                		 return rowdata.latestReplyTime.substring(0,16);
                	 }
                	 return '';
                 }}
            ],
            width:"100%",
            height:"100%",
            checkbox: true,
            rownumberyon:true,
            overflowx:false,
            pagesize: 100000,
            pageyno:false,
            paramobj:{search:'',status:"",typeId:typeId,startDate:$('#designStart').val(),endDate:$('#designEnd').val(),pagesize:pageSize,page:page,initFlag:initFlag},
            loadafter:function(data){
            	total=data.total;
            	if(data.rows.length>0){
            		$('#showNone').hide()
            	}
            	$(".dblsqk span").each(function(){
					var maxwidth = 80;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".gzfgnr").each(function(){
					var maxwidth = 65;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".tabletitle2").each(function(){
					var maxwidth = 46;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".cbdw").each(function(){
					var maxwidth = 32;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            },
            url: tableList
       });
	}

	var initgrid3 = function(){
        newGrid3 = $("#gridcont3").createGrid({
            columns:[
            	{display:"期数",name:"",width:"9%",align:"left",title:true,render:function(rowdata,n){
               	 	return rowdata.period;
                }},
                {display:"办理状态",name:"",width:"8%",align:"center",render:function(rowdata,n){
                	var statusName="";
               	 	var bgColor="";
               	 	if(rowdata.status==1){
	               	 	statusName="办理中";
	               		bgColor="#2BAA81";
            	 	}else if(rowdata.status==2){
	               	 	statusName="已办结";
	               		bgColor="#BCBCBC";
               	 	}else if(rowdata.status==3){
	               	 	statusName="常态落实";
	               	 	bgColor="#BCBCBC";
               	 	}
  				  	return '<div title="'+statusName+'" class="btn btn-xs btn-color" style="background-color:'+bgColor+';">'+statusName+'</div>';
                 }},
                 {display:"办件标题",name:"",width:"15%",align:"left",title:false,render:function(rowdata){
                	 var cuiban="";
                 	 if(rowdata.cuibanFlag=="1"){
                 		 cuiban = '<label class="cuibanlabel">催办</label>';
                	 }
                	 return '<a title="'+rowdata.docTitle+'" class="tabletitle" href="../../djlr/html/djlr_view.html?fileId='+rowdata.id+'&fileFrom='+fileFrom+'" target="iframe1"  onclick="closeTable()">'+cuiban+'<span class="tabletitle2">'+rowdata.docTitle+'</span></a>'
                 }},
                 {display:"批示指示内容",name:"",width:"26%",align:"left",paixu:false,title:false,render:function(rowdata){
                	/* var szpsCont="";
                	 var leaderTime1="";
                	 if(rowdata.leaderTime!="" && rowdata.leaderTime!=null){
                		 leaderTime1= rowdata.leaderTime.substring(0,16);
                	 }
                	 if(rowdata.leaderName && rowdata.leaderContent){
                		 szpsCont=rowdata.leaderName+":"+rowdata.leaderContent+" "+leaderTime1
                	 }
                	 return '<div class="zspsnr" onclick="pszsnrAlert(\''+rowdata.id+'\')" title="'+szpsCont+'">'+szpsCont+'</div>';*/
                	 var html1="";
                	 $.each(rowdata.szpslist,function(i,item){
                		 var createdTime="";
                		 if(item.createdTime!="" && item.createdTime!=null){
                			 createdTime= item.createdTime.substring(0,16);
                		 }
                		 html1+=item.userName+'&nbsp;&nbsp;'+createdTime+'批示：'+item.leaderComment+'&nbsp;&nbsp;&nbsp;'
     				 });
                	 return '<div class="zspsnr" onclick="pszsnrAlert(\''+rowdata.id+'\')">'+html1+'</div>';
                 }},
                 {display:"督办落实情况",name:"",width:"21%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 var duban="";
                 	 if(rowdata.updateFlag=="1"){
                 		duban = '<label class="cuibanlabel">已更新</label>';
                	 }
                	 var dbCont="";
                	 if(rowdata.latestReply){
                		dbCont=rowdata.latestReply;
                	 }
                	 return '<div class="dblsqk" onclick="dblsqkAlert(\''+rowdata.id+'\')" title="'+dbCont+'">'+duban+'<span>'+dbCont+'</span></div>';
                 }},
                 {display:"承办单位/人",name:"",width:"10%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 return '<div class="cbdw" title="'+rowdata.underDepts+'">'+rowdata.underDepts+'</div>'
                 }},
                 {display:"转办时间",name:"",width:"6%",align:"center",render:function(rowdata){
                	 if(rowdata.firstZbTime && !!rowdata.firstZbTime){
                		 return rowdata.firstZbTime.substring(0,16);
                	 }
                	 return '';
                 }},
                 {display:"反馈时间",name:"",width:"6%",align:"center",paixu:false,render:function(rowdata){
                	 if(rowdata.latestReplyTime && !!rowdata.latestReplyTime){
                		 return rowdata.latestReplyTime.substring(0,16);
                	 }
                	 return '';
                 }}
            ],
            width:"100%",
            height:"100%",
            checkbox: true,
            rownumberyon:true,
            overflowx:false,
            pagesize: 100000,
            pageyno:false,
            paramobj:{search:"",status:"",typeId:typeId,startDate:$('#designStart').val(),endDate:$('#designEnd').val(),pagesize:pageSize,page:page,initFlag:initFlag},
            loadafter:function(data){
            	total=data.total;
            	if(data.rows.length>0){
            		$('#showNone').hide()
            	}
            	$(".zspsnr").each(function(){
					var maxwidth = 85;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".dblsqk span").each(function(){
					var maxwidth = 64;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".tabletitle2").each(function(){
					var maxwidth = 55;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".cbdw").each(function(){
					var maxwidth = 32;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            },
            url: tableList
       });
	}
	
	var initgrid4 = function(){
        newGrid4 = $("#gridcont4").createGrid({
            columns:[
            	{display:"印发时间",name:"",width:"6%",align:"center",paixu:false,render:function(rowdata){
            		if(rowdata.printDate && rowdata.printDate!="" && rowdata.printDate!="null" && rowdata.printDate!=null){
            			return rowdata.printDate.substring(0,16);
	               	}
	               	return '';
                }},
                {display:"办理状态",name:"",width:"6%",align:"center",render:function(rowdata,n){
                	var statusName="";
               	 	var bgColor="";
               	 	if(rowdata.status==1){
	               	 	statusName="办理中";
	               		bgColor="#2BAA81";
            	 	}else if(rowdata.status==2){
	               	 	statusName="已办结";
	               		bgColor="#BCBCBC";
               	 	}else if(rowdata.status==3){
	               	 	statusName="常态落实";
	               	 	bgColor="#BCBCBC";
               	 	}
  				  	return '<div title="'+statusName+'" class="btn btn-xs btn-color" style="background-color:'+bgColor+';">'+statusName+'</div>';
                }},
                {display:"办件标题",name:"",width:"15%",align:"left",render:function(rowdata){
                	 var cuiban="";
                 	 if(rowdata.cuibanFlag=="1"){
                 		 cuiban = '<label class="cuibanlabel">催办</label>';
                	 }
                	 return '<a title="'+rowdata.docTitle+'" class="tabletitle" href="../../djlr/html/djlr_view.html?fileId='+rowdata.id+'&fileFrom='+fileFrom+'" target="iframe1"  onclick="closeTable()">'+cuiban+'<span class="tabletitle2">'+rowdata.docTitle+'</span></a>'
                 }},
                 {display:"落实事项",name:"",width:"21%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 return '<div class="gzfgnr" title="'+rowdata.jobContent+'">'+rowdata.jobContent+'</div>';
                 }},
                 {display:"督办落实情况",name:"",width:"30%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 var duban="";
                 	 if(rowdata.updateFlag=="1"){
                 		duban = '<label class="cuibanlabel">已更新</label>';
                	 }
                	 var dbCont="";
                	 if(rowdata.latestReply){
                		dbCont=rowdata.latestReply;
                	 }	 
                	 return '<div class="dblsqk"  onclick="dblsqkAlert(\''+rowdata.id+'\')" title="'+dbCont+'">'+duban+'<span>'+dbCont+'</span></div>';
                 }},
                 {display:"承办单位/人",name:"",width:"10%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 return '<div class="cbdw" title="'+rowdata.underDepts+'">'+rowdata.underDepts+'</div>'
                 }},
                 {display:"转办时间",name:"",width:"6%",align:"center",render:function(rowdata){
                	 if(rowdata.firstZbTime && !!rowdata.firstZbTime){
                		 return rowdata.firstZbTime.substring(0,16);
                	 }
                	 return '';
                 }},
                 {display:"反馈时间",name:"",width:"6%",align:"center",paixu:false,render:function(rowdata){
                	 if(rowdata.latestReplyTime && !!rowdata.latestReplyTime){
                		 return rowdata.latestReplyTime.substring(0,16);
                	 }
                	 return '';
                 }}
            ],
            width:"100%",
            height:"100%",
            checkbox: true,
            rownumberyon:true,
            overflowx:false,
            pagesize: 100000,
            pageyno:false,
            paramobj:{search:'',status:"",typeId:typeId,startDate:$('#designStart').val(),endDate:$('#designEnd').val(),pagesize:pageSize,page:page,initFlag:initFlag},
            loadafter:function(data){
            	total=data.total;
            	if(data.rows.length>0){
            		$('#showNone').hide()
            	}
            	$(".dblsqk span").each(function(){
					var maxwidth = 80;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".gzfgnr").each(function(){
					var maxwidth = 65;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".tabletitle2").each(function(){
					var maxwidth = 46;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".cbdw").each(function(){
					var maxwidth = 32;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            },
            url: tableList
       });
	}
	var initother = function(){
		if(initFlag==1){
			$('#showNone').show();
		}
		//筛选功能
		$("#sure").click(function(){
			initFlag = '';
			refreshgrid();
			$('#showNone').hide();
		});
		
		//重置
		$("#reset").click(function(){
			removeInputData(["designStart","designEnd"]);
			initFlag = '1';
			refreshgrid();
			$('#showNone').show();
		});
		//导出
		$("#export").click(function(){
			var datas;
			if(tableNum==3){
				datas=newGrid3.getcheckrow();
			}else if(tableNum==2){
				datas=newGrid2.getcheckrow();
			}else if(tableNum==4){
				datas=newGrid4.getcheckrow();
			}else{
				datas=newGrid.getcheckrow();
			}
			var ids='';
			var t_count=0;
			$(datas).each(function(i){
				ids+=i!=0?(','+this.id):this.id;
				t_count++;
			});
			t_count=t_count>0?t_count:total;
			if(datas.length>0){
				newbootbox.confirm({
			     	title:"提示",
			     	message: "将导出"+t_count+"条数据！",
			     	callback1:function(){
			     		window.top.location.href='/app/db/export/exportDocx?stringIds='+ids;
			     	}
			    });
			}else{
				newbootbox.alertInfo("请选择要导出的数据！");
			}
		});
		
		$("#closeTable,#cancel").click(function(){
			newbootbox.newdialogClose("importTable");
		})
	}
	

	return{
		//加载页面处理程序
		initControl:function(){
			initTableNum();
			initgrid();
			initother();
		},
		initgrid:function(){
			initgrid();
		},
		initgrid2:function(){
			initgrid2();
		},
		initgrid3:function(){
			initgrid3();
		},		
		initgrid4:function(){
			initgrid4();
		}
	};
}();

function refreshgrid(){
	if(o.tree == "3"){
		$("#gridcont3").show();
		$("#gridcont2").hide();
		$("#gridcont").hide();
		$("#gridcont4").hide();
	}else if(o.tree == "2"){
		$("#gridcont4").hide();
		$("#gridcont2").show();
		$("#gridcont3").hide();
		$("#gridcont").hide();
	}else if(o.tree == "4"){
		$("#gridcont4").show();
		$("#gridcont2").hide();
		$("#gridcont3").hide();
		$("#gridcont").hide();
	}else{
		$("#gridcont").show();
		$("#gridcont2").hide();
		$("#gridcont3").hide();
		$("#gridcont4").hide();
	}
	if(tableNum==3){
		pageModule.initgrid3();
	}else if(tableNum==2){
		pageModule.initgrid2();
	}else if(tableNum==4){
		pageModule.initgrid4();
	}else{
		pageModule.initgrid();
	}
}


//查询
function refreshgrid1(){
	pageModule.initgrid();
}
function refreshgrid2(){
	pageModule.initgrid2();
}
function refreshgrid3(){
	pageModule.initgrid3();
}
function refreshgrid4(){
	pageModule.initgrid4();
}
//批示指示内容弹出框
function pszsnrAlert(id){
	newbootbox.newdialog({
		id:"psDialog",
		width:800,
		height:600,
		header:true,
		title:"批示详情",
		classed:"cjDialog",
		url:"/app/db/document/view/html/psDialog.html?fileId="+id
	})
}

//督办落实情况弹出框
function dblsqkAlert(id){
	newbootbox.newdialog({
		id:"dblsqkDialog",
		width:800,
		height:600,
		header:true,
		title:"督办详情",
		classed:"cjDialog",
		url:"/app/db/document/view/html/dblsqk.html?fileId="+id
	})
}
function closeTable(){
	newbootbox.newdialogClose("importTable");
}