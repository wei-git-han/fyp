/*var url1 = {"url":"../data/grid.json","dataType":"text"};
var url2 = {"url":"../data/menu.json","dataType":"text"};*/
var url1 = {"url":"/app/db/documentszinfo/homelist","dataType":"text"};
var url2 = {"url":"/app/db/documentszinfo/grouplist","dataType":"text"};
var url3 = {"url":"/app/db/documentszinfo/read","dataType":"text"};
var url4 = {"url":"/app/db/documentszinfo/press","dataType":"text"};
var url5 = {"url":"","dataType":"text"};

var ifmenu=getUrlParam("ifmenu")||"";
var orgid=getUrlParam("orgid")||"";
var month=getUrlParam("month")||"";
var ytype=getUrlParam("ytype")||"";

if(typeof(ytype)=="undefined"||ytype==null||$.trim(ytype)=="undefined"){ytype=""};

var grid = null;
var pageModule = function(){

	var initmenu = function(){
		$ajax({
			url:url2,
			data:{orgid:orgid,month:month},
			success:function(data){
				$(".menu").html('');
				$.each(data,function(i){
					var id = this.id;
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
							<li class="${i==0?'active':''}" id="${id}">
								<a>
									<i class="fa fa-chevron-right "></i>
									<font>${name}</font>
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
					grid.setparams({id:id});
					grid.loadtable();
				})
				
				initgrid(data[0].id);
			}
		})
		
	}


	var initgrid = function(menuid){
        grid = $("#gridcont").createGrid({
                    columns:[	
                    			{display:"办理状态",name:"blzt",width:"10%",align:"center",paixu:false,render:function(rowdata,n){
                    				var blzt = rowdata.blzt;
                    				var html = '';
                    				if(blzt==1){
                    					html = '<button type="button" class="btn btn-info table-button1">办理中</button>';
                    				}else if(blzt==3){
                    					html = '<button type="button" class="btn btn-info table-button2">常态落实</button>';
                    				}else{
                    					html = '<button type="button" class="btn btn-info table-button2">已办结</button>';
                    				}
                                    return html;
                                 }},
                                 {display:"军委办件号",name:"jwbjh",width:"10%",align:"center",paixu:true,render:function(rowdata,n){
                                    return rowdata.jwbjh;                                         
                                 }},
                                 {display:"文件标题",name:"title",width:"15%",align:"left",paixu:false,render:function(rowdata){
                                	 var html = '';
                                	 var CuibanFlag = rowdata.CuibanFlag;
                                	 if(CuibanFlag==1){
                                		 html = '<label class="table-label2">催办</label>';
                                	 }
                                	 var fileid="'"+rowdata.id+"'";
                                    return html+'<font class="file_title" style="cursor:pointer;text-decoration: underline;" class="table-title" onclick="viewpage('+fileid+')" title="'+rowdata.title+'">'+rowdata.title+'</font>';                                     
                                 }},
                                 {display:"批示指示内容",name:"pszsmr",width:"16%",align:"left",paixu:false,render:function(rowdata){
                                    return '<div class="zspsnr" onclick="pszsnrAlert(\''+rowdata.id+'\')"  title="'+rowdata.pszsmr+'">'+rowdata.pszsmr+'</div>';
                                 }},
                                 {display:"督办落实情况",name:"dblsqk",width:"16%",align:"left",paixu:false,render:function(rowdata){
                                	var gengxin = rowdata.gengxin;
                                	var html = '';
                                	if(gengxin==1){
                                		html ='<label class="table-label">已更新</label>';
                                	}
                                    return '<div class="dblsqk"  onclick="dblsqkAlert(\''+rowdata.id+'\')"  title="'+rowdata.dblsqk+'">'+html+'<span>'+rowdata.dblsqk+'</span></div>';
                                 }},
                                 {display:"承办单位/人员 ",name:"cbdwry",width:"10%",align:"left",paixu:false,render:function(rowdata){
                                    return rowdata.cbdwry;                                      
                                 }},
                                 {display:"更新时间",name:"update",width:"6%",align:"center",paixu:false,render:function(rowdata){
                                    return rowdata.update;                                      
                                 }},
                                 {display:"转办时间",name:"zbdate",width:"6%",align:"center",paixu:false,render:function(rowdata){
                                    return rowdata.zbdate;                                      
                                 }},
                                 {display:"操作",name:"",width:"8%",align:"center",paixu:false,render:function(rowdata){
                                	var blzt = rowdata.blzt;
                                 	var other = rowdata.other
                    				var html = '';
                                 	if(blzt==1){
	                    				if(other==0){
	                    					html = '<button type="button" class="btn btn-info table-button1" onclick="ydfn(\''+rowdata.id+'\')">确认已读</button>';
	                    				}else if(other==1){
	                    					html = '<button type="button" class="btn btn-info table-button3"  onclick="cbfn(\''+rowdata.id+'\')">催办</button>';
	                    				}
                    				}
                                    return html;                                   
                                 }}
                             ],
                    width:"100%",
                    height:"100%",
                    checkbox: true,
                    rownumberyon:true,
                    paramobj:{orgid:orgid,menuid:menuid,month:month,state:ytype},
                    overflowx:false,
                    rownumberwidth:"50px",
                    pagesize: 12,
                    url: url1,
                    loadafter:function(data){
                    	$(".zspsnr").each(function(){
        					var maxwidth = 45;
        					if($(this).text().length > maxwidth){
        						$(this).text($(this).text().substring(0,maxwidth));
        						$(this).html($(this).html()+'...');
        					}
        				});
                    	$(".file_title").each(function(){
        					var maxwidth = 45;
        					if($(this).text().length > maxwidth){
        						$(this).text($(this).text().substring(0,maxwidth));
        						$(this).html($(this).html()+'...');
        					}
        				});
                    	
                    	$(".dblsqk span").each(function(){
        					var maxwidth =38;
        					if($(this).text().length > maxwidth){
        						$(this).text($(this).text().substring(0,maxwidth));
        						$(this).html($(this).html()+'...');
        					}
        				});
                    }
               });
		
		
		
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
		
		
		$("#plyd").click(function(){
			var datas=grid.getcheckrow();
			var ids=[];
			if(datas.length>0){
				$(datas).each(function(i){
					ids[i]=this.id;
				});
				newbootbox.confirm({
				    title: "提示",
				    message: "是否批量已读操作？",
				    callback1:function(){
				    	$ajax({
				    		url:url3,
				    		data:{ids:ids.toString()},
				    		success:function(data){
				    			if(data.result=="success"){
				    				newbootbox.alertInfo("确认已读!");
				    				grid.refresh();
				    			}
				    		}
				    	});
				    	
				    }
				});
			}else{
				newbootbox.alertInfo("请选择要操作的数据！");
			}
			
			

			
			
		})
		
		
	}
	
	
	var initfn = function(){
		if(ifmenu!="false"){
			$("#cent-left").show();
			$(".top-title").attr("href","");
			initmenu();
		}else{
			$(".cent-right").css("left",0);
			$(".top-title").attr("href","index.html");
			initgrid();
		}
	}
	
	return{
		//加载页面处理程序
		initControl:function(){
			initfn();
			initother();
		}
	}
	
}();

var ydfn = function(ids){
	$ajax({
		url:url3,
		data:{ids:ids},
		success:function(data){
			if(data.result=="success"){
				newbootbox.alertInfo("确认已读!");
				grid.refresh();
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
	cbrenid = ids;
	$("#viewcont").modal("show");
}
var viewpage = function(fileId){
	window.location.href = "../../djlr/html/djlr_view.html?fileId="+fileId+"&frompage=1";//frompage放在最后
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
