var url0 = {"url":"/app/db/documentszinfo/homeListNum","dataType":"text"};
var url1 = {"url":"/app/db/documentszinfo/homelist","dataType":"text"};
var url2 = {"url":"/app/db/documentszinfo/grouplist","dataType":"text"};
var url3 = {"url":"/app/db/documentszinfo/read","dataType":"text"};
var url4 = {"url":"/app/db/documentszinfo/press","dataType":"text"};
var url5 = {"url":"/app/db/documentszinfo/AllreadByType","dataType":"text"};
var url6 = {"url":"/app/db/documentjcdb/isShouZhang","dataType":"text"};

var showBtn = true;
var groupid=null;
var grid = null;
var isShouZhang = true;     //  是否是首长
var spData ={
	type:1,
	title:'批示指示内容',
	title2:'军委办件号'
};
var pageModule = function(){
	var initmenu = function(menuid){
		$ajax({
			url:url2,
			success:function(data){
				$(".menu").html('');
				$.each(data,function(i){
					var id = this.id;
					var active = "";
					if(typeof(menuid)!="undefined"){
						if(id==menuid){
							active = "active"
							groupid=id;
							initgrid();
						}
					}else{
						if(i==0){
							active = "active"
							groupid=id;
							initgrid();
							
						}
					}
					var name = this.name;
					var count = this.count;
					var count2 = "";
					if(count>0){
						if(count>99){
							count2="(99+)"
						}else{
							count2="("+count+")";
						}
					}
					$(".menu").append(
					`		
							<li class="${active}" id="${id}">
								<a>
									<i class="fa fa-chevron-right "></i>
									<font title="${name}" >${name}</font>
									<font title="${count}" >${count2}</font>
								</a>
							</li>
					`
					);
				})
				
				$(".menu li").unbind("click");
				$(".menu li").click(function(){
					$(".menu li").removeClass("active");
					$(this).addClass("active");
					
					var id = $(this).attr("id");
					if(id=="3"||id=="5"){
						 spData ={
							type:3,
							title:'工作分工内容',
							title2:'印发时间'
						}
					}else if(id=="6"){
						spData = {
							type:2,
							title:'落实事项',
							title2:'印发时间'
						}
					}else if(id=="4"){
						spData ={
							type:4,
							title:'批示指示内容',
							title2:'期数'
						}
					}else{
						spData = {
							type:1,
							title:'批示指示内容',
							title2:'军委办件号'
						}
					}
					groupid = id
					initgrid()
//					grid.setparams({id:id});
//					grid.loadtable();
				})
			}
		})
	}
	
	
	
	
	
	
	
	
	
	var initgrid = function(){
		
        grid = $("#gridcont").createGrid({
                    columns:[	
		            			{display:spData.title2,name:"jwbjh",width:"10%",align:"center",paixu:false,render:function(rowdata,n){
		                       		var title =''
		                       		if(spData.type==3 || spData.type==2){
		                       			if(rowdata.printDate && rowdata.printDate!="" && rowdata.printDate!="null" && rowdata.printDate!=null){
		                					title= rowdata.printDate.substring(0,16);
		            	               	}
		                       		}else if(spData.type==4){
		                       			title = rowdata.period||'';
		                       		}else{
		                				title=` <font title="${rowdata.jwbjh}" style="cursor:pointer;" >${rowdata.jwbjh}</font>`
		                       		}
		            				return title
		            			}},
                    			{display:"状态",name:"blzt",width:"10%",align:"center",paixu:false,render:function(rowdata,n){
                    				var button1;
                    				if(rowdata.blzt==1){
                    					if(rowdata.latestReply != '' && rowdata.latestReply != null){//包括空格''
                    						button1 = '<button type="button" class="btn btn-info table-button1" style="width:100%;" >办理中</button>';
                	           	 		}else{
                	           	 			button1 = '<button type="button" class="btn btn-info table-button1" style="width:100%;" >未反馈</button>';
                	           	 		}
                    					
                    				}else if(rowdata.blzt==3){
                    					button1 = '<button type="button" class="btn btn-info table-button2" style="width:100%;" >常态落实</button>';
                    				}else{
                    					button1 = '<button type="button" class="btn btn-info table-button2" style="width:100%;" >已办结</button>';
                    				}
                    				return button1;
                    			}},
                    			{display:"文件标题",name:"title",width:"18%",align:"left",paixu:false,render:function(rowdata,n){
                    				var cuiban = '',title="";
	                            	var CuibanFlag = rowdata.CuibanFlag;
	                            	if(CuibanFlag==1){
	                            		 cuiban = '<label class="table-label2">催办</label>';
	                            	}
                    				title=`${cuiban} <font class="title" title="${rowdata.title}" onclick="viewpage('${rowdata.id}','${rowdata.id}','${rowdata.id}','${rowdata.lssx}')" style="cursor:pointer;text-decoration: underline;" >${rowdata.title}</font>`;
                    				return title
                    			}},
                    			{display:spData.title,name:"pszsmr",width:"17%",align:"left",paixu:false,render:function(rowdata,n){
                    				var str =''
                    				var str2 = "";
		                       		if(spData.type==1 || spData.type == 4){
		                       			str = rowdata.pszsmr
                    					if(str.length>50){
                    						str2 = str.substr(0,50)+".."
                    					}else{
                    						str2 = str
                    					}
		                       			str = `<font class="pszsmr" style="cursor:pointer" title="${str}" onclick="pszsnrAlert('${rowdata.id}')" >${str2}</font>`;
		                       		}else {
		                       			str = rowdata.lssx
                    					if(str.length>50){
                    						str2 = str.substr(0,50)+".."
                    					}else{
                    						str2 = str
                    					}
		                       			str = '<font title="'+str+'" >'+str2+'</font>';
		                       		}
                    				return str;
                    			}},
                      			{display:"督办落实情况",name:"dblsqk",width:"17%",align:"left",paixu:false,render:function(rowdata,n){
                      				var gengxin = "";
                  					if(rowdata.gengxin=='1'){
                  						gengxin = '<label class="table-label">已更新</label>';
                  					}
                    				var title=`<font title="${rowdata.dblsqk}" onclick="dblsqkAlert('${rowdata.id}')" style="cursor:pointer;" >${gengxin}<span class="dblsqk">${rowdata.dblsqk}</span></font>`;
                    				return title;
//                            	 return '<div class="dblsqk" onclick="dblsqkAlert(\''+rowdata.id+'\')" title="'+rowdata.dblsqk+'"><span class="hiddenInfo">'+rowdata.dblsqk+'</span></div>';
                      			}},
/*                    			{display:"转办时间",name:"zbdate",width:"8%",align:"center",paixu:false,render:function(rowdata,n){
                    				return rowdata.zbdate||'';
                    			}},*/
                    			{display:"承办单位/人",name:"cbdwry",width:"10%",align:"left",paixu:false,render:function(rowdata,n){
                    				var title=`<font class="cbdw" title="${rowdata.cbdwry}">${rowdata.cbdwry}</font>`;
                    				return title
                    			}},
                    			{display:"更新时间",name:"update",width:"9%",align:"center",paixu:true,render:function(rowdata,n){
                    			    var value = rowdata.update;
                    			    if(typeof(value)!="undefined"&&value!=null&&$.trim(value)!=""){
                                        value = value.substr(0,10)+'<br>'+value.substr(11,5);
                    			    }
                    				return value||'';
                    			}},
                      			{display:"操作",name:"cz",width:"9%",align:"center",paixu:false,render:function(rowdata,n){
                    				var button2 = '';
                    				if(rowdata.blzt==1&&showBtn){
                    					if(rowdata.other==1){
                        					button2 = '<button type="button" class="btn btn-info table-button3" onclick="cbfn(\''+rowdata.id+'\')">催办</button>';
                    					}else if(rowdata.other==0){
                    						button2 = '<a class="btn btn-info table-button3"  onclick="ydfn(\''+rowdata.id+'\')">确认已读</a>';
                    					}
                    				}
                    				return button2;
                      			}}
//                    				var id = rowdata.id;
//                    				var blzt = blzt;
//                    				var jwbjh = rowdata.jwbjh;
//                    				var title = rowdata.title;
//                    				var pszsmr = rowdata.pszsmr;
//                    				var dblsqk = rowdata.dblsqk;
//                    				var cbdwry = rowdata.cbdwry;
//                    				var update = rowdata.update;
//                    				var zbdate = rowdata.zbdate;
//                    				var other = rowdata.other;
//                    				
//                    				var miji = rowdata.miji;
//                    				var tbdw = rowdata.tbdw;
//                    				var tbrq = rowdata.tbrq;
//                    				var array = rowdata.array;
//                    				
//	                               	var cuiban = '';
//	                            	var CuibanFlag = rowdata.CuibanFlag;
//	                            	if(CuibanFlag==1){
//	                            		 cuiban = '<label class="table-label2">催办</label>';
//	                            	}
//                    				
//                    				//fileId,subId,fileFrom
//                    				title=`
//                    					${cuiban} <font title="${title}" onclick="viewpage('${id}','${id}','${id}')" style="cursor:pointer;text-decoration: underline;" >${title}</font>
//                    				`
//                    				
//                    				var button1 = "";
//                    				if(blzt==1){
//                    					button1 = '<button type="button" class="btn btn-info table-button1">办理中</button>';
//                    				}else if(blzt==3){
//                    					button1 = '<button type="button" class="btn btn-info table-button2">常态落实</button>';
//                    				}else{
//                    					button1 = '<button type="button" class="btn btn-info table-button2">已办结</button>';
//                    				}
//                    				
//                    				var button2 = '';
//                    				var button3 = '';
//                    				if(blzt==1){
//                    					if(other==0){
//                        					button3 = '<a class="btn btn-info newpanel-button1"  onclick="ydfn(\''+rowdata.id+'\')">确认已读</a>';
//                        				}else if(other==1){
//                        					button2 = '<button type="button" class="btn btn-info table-button3" onclick="cbfn(\''+rowdata.id+'\')">催办</button>';
//                        				}
//                    				}
//                    				
//                    				
//                    				var gengxin = rowdata.gengxin;
//                    				var button4 = '';
//                    				if(gengxin==1){
//                    					button4 = '<label class="table-label">已更新</label>';
//                    				}
//                    				
//                    				
//                    				
//                    				var html2 = "";
//                    				var width = "width:25%;";
//                    				if(array.length==1){
//                    					width = "width:110%;";
//                    				}else if(array.length==2){
//                    					width = "width:50%;";
//                    				}else if(array.length==3){
//                    					width = "width:33.3%;";
//                    				}
//                    				$.each(array,function(i){
//                    					var dw = this.dw;
//                    					var ry = this.ry;
//                    					var dwry = this.dwry;
//                    					var cont = this.cont;
//                    					
//                    					html2 = `
//	                    								<div class="nc-left-group">
//															<div class="nc-left-group-cont" style="${width}">
//																<div class="nc-left-group-cont-top" >
//																	<font>${dwry}</font>
//																</div>
//																<div class="nc-left-group-cont-cont scroller" style="height:40px;">
//																	${cont}
//																</div>
//															</div>
//														</div>
//                    									`;
//										
//                    				});
//                    				if(n==4){console.log(array)}
//                    				var html = `
//										<div class="newpanel" id="${id}">
//											<div class="newpanel-cent">
//												
//												<table>
//													<thead>
//														<tr>
//															<th style="width:50px;">序号</th>
//															<th>状态</th>
//															<th>军委办件号</th>
//															<th>文件标题</th>
//															<th>批示指示内容</th>
//															<th>承办单位/人</th>
//															<th>转办时间</th>
//															<th>反馈更新</th>
//															<th>操作</th>
//														</tr>
//													</thead>
//													<tbody>
//														<tr>
//															<td style="text-align:center;">${n}</td>
//															<td style="text-align:center;">${button1}</td>
//															<td style="text-align:center;">${jwbjh}</td>
//															<td >${title}</td>
//															<td title="${pszsmr}"><font style="cursor:pointer" onclick="pszsnrAlert('${id}')" >${pszsmr}</font></td>
//															<td>${cbdwry}</td>
//															<td>${update}</td>
//															<td>${zbdate}</td>
//															<td style="text-align:center;">${button2}</td>
//														</tr>
//													</tbody>
//												</table>
//												<div class="newpanel-cent-cont">	
//													<div class="wh100">
//														
//														<div class="newpanel-cent-cont-left">
//															<div>
//																${button3}
//															</div>
//														</div>
//														
//														<div class="newpanel-cent-cont-right">
//															
//															<div class="nc-left-top">
//																<div class="nc-left-top-title">
//																	<font>督办落实情况</font>
//																	${button4}
//																</div>
//															</div>
//															<div class="nc-left-cent">
//																${html2}
//															</div>
//														</div>
//														
//													</div>
//				
//													
//												</div>
//												
//												
//												
//											</div>
//										</div>
//                    				`;
//                                    return html;
//                                 }}
                             ],
                    width:"100%",
                    height:"100%",
                    checkbox: true,
                    rownumberyon:true,
                    paramobj:{month:'all',id:groupid,isMain:'1'},
                    overflowx:false,
                    rownumberwidth:"50px",
                    pagesize: 7,
                    url: url1,
                    loadafter:function(data){
                    	getTableCount();
                    	Metronic.initSlimScroll(".scroller");
                    	$(".dblsqk").each(function(){
        					var maxwidth = 46;
        					if($(this).text().length > maxwidth){
        						$(this).text($(this).text().substring(0,maxwidth));
        						$(this).html($(this).html()+'...');
        					}
        				});
                    	$(".gzfgnr").each(function(){
        					var maxwidth = 46;
        					if($(this).text().length > maxwidth){
        						$(this).text($(this).text().substring(0,maxwidth));
        						$(this).html($(this).html()+'...');
        					}
        				});
                    	$(".title").each(function(){
        					var maxwidth = 46;
        					if($(this).text().length > maxwidth){
        						$(this).text($(this).text().substring(0,maxwidth));
        						$(this).html($(this).html()+'...');
        					}
        				});
                    	$(".cbdw").each(function(){
        					var maxwidth = 46;
        					if($(this).text().length > maxwidth){
        						$(this).text($(this).text().substring(0,maxwidth));
        						$(this).html($(this).html()+'...');
        					}
        				});
                    	$(".pszsmr").each(function(){
        					var maxwidth = 46;
        					if($(this).text().length > maxwidth){
        						$(this).text($(this).text().substring(0,maxwidth));
        						$(this).html($(this).html()+'...');
        					}
        				});
                    }
               });
		
	}
	
	
	
	
	var getTableCount = function(){
		$ajax({
			url:url0,
			data:{month:'all',id:groupid,isMain:'1'},
			success:function(data){
				$.each(data,function(i,v){
					if(v>0){
						$("#count"+i).html("("+v+")")
					}else{
						$("#count"+i).html("(0)")
					}

				})
			}
		})
	}
	var initother = function(){
		$("#fasong").click(function(){
			var textarea = $("#textarea").val();
			if($.trim(textarea)==""){
				newbootbox.alertInfo("请填写内容!");
				return;
			}
			$ajax({
				url:url4,
				data:{textarea:textarea,id:cbrenid},
				success:function(data){
					if(data.result=="success"){
						$("#viewcont").modal("hide");
						newbootbox.alertInfo("操作成功!");
						grid.refresh();
					}
				}
			});
		})
		
		
		$("#quxiao").click(function(){
			$("#viewcont").modal("hide");
		})
		
		
		$("[name=radio]").click(function(){
			var value = this.value;
			grid.setparams({state:value});
			grid.loadtable();
		})
		
		$(".fa-search").click(function(){
			var value = $(".top-right-search input").val();
			grid.setparams({search:value});
			grid.loadtable();
		})
		
		$("#chartbutton").click(function(){
			window.location.href = "index.html?szFlag=1";
		});
		
		$(".right-left-button .btn").click(function(){
			
			var o = $(this).find(".fa-chevron-right").is(":hidden");
			if(o){
				$(".cent-left").hide();
				$(".cent-right").css("left","0");
			}else{
				$(".cent-left").show();
				$(".cent-right").css("left","280px");
			}
			initgrid();
			$(this).find(".fa-chevron-right").toggle();
			$(this).find(".fa-chevron-left").toggle();
		})
		
		$("#qbqr").click(function(){
			//var datas=grid.getcheckrow();
			//var ids=[];
			//if(datas.length==1){
				//$(datas).each(function(i){
				//	ids[i]=this.id;
				//});
				//ydfn(ids.join(","));
			//}else{
			//	newbootbox.alertInfo("请选择要操作的数据！");
			//}
			if (!isShouZhang) {
                newbootbox.alertInfo("本功能仅支持首长操作");
                return ;
            }
			
			var menuid = $(".menu li.active").attr("id");
			var name = $(".menu li.active font").eq(0).text();
			
			newbootbox.confirm({
			    title: "提示",
			    message: "["+name+"]是否全部已读操作？",
			    callback1:function(){
			    	$ajax({
			    		url:url5,
			    		data:{menuid:menuid},
			    		success:function(data){
			    			if(data.result=="success"){
			    				//newbootbox.alertInfo("确认已读!");
			    				pageModule.initmenu(menuid);
			    			}
			    		}
			    	});
			    	
			    }
			});
			
			
		})
		
	}

	var initoisguajieshouzhang = function(){
		$ajax({
			url:url6,
			success:function(data){
				if( data.szFlag !="1"){ //  1-首长    2-部管理员 空-其他
					//showBtn = false
//					//$(".newpanel-button1").hide();
//					$(".table-button3").hide();
					//$('#qbqr').hide()
					isShouZhang = false;
				}
			}
		});
	}
	return{
		//加载页面处理程序
		initControl:function(){
			initoisguajieshouzhang();
			initmenu();
			initother();
		},
		initmenu:function(menuid){
			initmenu(menuid);
		}
	}
	
}();

var ydfn = function(ids){
    if (!isShouZhang) {
        newbootbox.alertInfo("本功能仅支持首长操作");
        return ;
    }
	$ajax({
		url:url3,
		data:{ids:ids},
		success:function(data){
			if(data.result=="success"){
				newbootbox.alertInfo("确认已读!");
				var menuid = $(".menu li.active").attr("id");
				pageModule.initmenu(menuid);
			}
		}
	});
	/*newbootbox.confirm({
		title:"提示!",
		message:"是否确认已读!",
		callback1:function(){
			
		}
	});*/
}

var cbrenid = "";
var cbfn = function(ids){
     if (!isShouZhang) {
            newbootbox.alertInfo("本功能仅支持首长操作");
            return ;
     }
	cbrenid = ids;
	$("#textarea").val("");
	$("#viewcont").modal("show");
}

var viewpage = function(fileId,subId,fileFrom,jobContent){
	var docTypeName = (spData.title == "工作分工内容"||spData.title == "落实事项")?"其他重要工作":""
	window.location.href = "../../djlr/html/djlr_view.html?fileId="+fileId+'&docTypeName='+docTypeName+'&jobContent='+jobContent+"&frompage=0";//frompage放在最后
}

//批示指示内容弹出框
function pszsnrAlert(id){
	newbootbox.newdialog({
		id:"psDialog",
		width:800,
		height:600,
		header:true,
		title:"批示详情",
		theme:'black',
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
		theme:'black',
		classed:"cjDialog",
		url:"/app/db/document/view/html/dblsqk.html?fileId="+id
	})
}
