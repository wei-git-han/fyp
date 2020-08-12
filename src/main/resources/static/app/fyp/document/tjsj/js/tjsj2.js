var tableList= {"url":"/app/db/documentjcdb/leaderStatisticsList","dataType":"text"};//原table数据
var dicUrl = {"url": "/app/db/documentdic/getDicByTypet","dataType":"text"}; //返回的下拉框字典值
var grid = null;
var total=0;//列表中，数据的总条数
var fileFrom=getUrlParam("fileFrom")||"sztj"; //文件来源
var status = getUrlParam("status");//统计图传过来的状态
var leaderId = getUrlParam("leaderId");//统计图传过来的首长ID
var startdate = getUrlParam2("startdate");
var enddate = getUrlParam2("enddate");
var nowYear = getUrlParam("nowYear");//“统计报表”页面上的“年度”

var pageModule = function(){
	var initgrid = function(){
        grid = $("#gridcont").createGrid({
            columns:[
            	{display:"状态",name:"",width:"9%",align:"center",render:function(rowdata,n){
    				var button1;
					if(rowdata.status==1){
						button1 = '<button type="button" class="btn btn-info table-button1">办理中</button>';
						if( rowdata.latestReply==""){
							button1 = '<button type="button" class="btn btn-info table-button1">未反馈</button>';
						}
    				else if(rowdata.status==3){
    					button1 = '<button type="button" class="btn btn-info table-button2">常态落实</button>';
    				}else{
    					button1 = '<button type="button" class="btn btn-info table-button2">已办结</button>';
    				}
    				return button1;
                 }},
                 {display:"文件标题",name:"",width:"16%",align:"left",title:false,render:function(rowdata){
                	 var cuiban="";
                 	 if(rowdata.cuibanFlag=="1"){
                 		 cuiban = '<label class="table-label2">催办</label>';
                	 }
                	 if(rowdata.docTitle.length > 26){
                        return '<a title="'+rowdata.docTitle+'" class="table-title" href="../../djlr/html/djlr_view.html?fileId='+rowdata.id+'&fileFrom='+fileFrom+'&startdate='+''+'&enddate='+''+'&isFromChart=1&status='+status+'&isDepart=1&frompage=0" target="iframe1">'+cuiban+'<span class="tabletitle2">'+rowdata.docTitle+'</span></a>'
                     }else{
                        return '<a title="'+rowdata.docTitle+'" class="table-title" href="../../djlr/html/djlr_view.html?fileId='+rowdata.id+'&fileFrom='+fileFrom+'&startdate='+''+'&enddate='+''+'&isFromChart=1&status='+status+'&isDepart=1&frompage=0" target="iframe1">'+cuiban+'<span class="tabletitle2">'+rowdata.docTitle+'</span></a>'
                     }
//                	 return '<a title="'+rowdata.docTitle+'" class="table-title" href="../../djlr/html/djlr_view.html?fileId='+rowdata.id+'&fileFrom='+fileFrom+'&leaderId='+leaderId+'&startdate='+startdate+'&enddate='+enddate+'&isFromChart=1&status='+status+'&isDepart=0&frompage=0" target="iframe1">'+cuiban+rowdata.docTitle+'</a>'
                 }},
                 {display:"批示指示内容",name:"",width:"22%",align:"left",paixu:false,title:false,render:function(rowdata){
                	 var html1="";
                	 $.each(rowdata.szpslist,function(i,item){
                		 var createdTime="";
                		 if(item.createdTime!="" && item.createdTime!=null){
                			 createdTime= item.createdTime.substring(0,16);
                		 }
                		 html1+=item.userName+'&nbsp;&nbsp;'+createdTime+'批示：'+item.leaderComment+'&nbsp;&nbsp;&nbsp;'
     				 });
                	 return '<div class="zspsnr" onclick="pszsnrAlert(\''+rowdata.id+'\')" title="'+html1+'" style="cursor:pointer;">'+html1+'</div>';
                 }},
                {display:"督办落实情况",name:"",width:"23%",align:"left",paixu:false,title:false,render:function(rowdata){
               	 var duban="";
                	 if(rowdata.updateFlag=="1"){
                		duban = '<label class="cuibanlabel">已更新</label>';
               	 }
               	 var dbCont="";
               	 if(rowdata.latestReply){
               		dbCont=rowdata.latestReply;
               	 }
               	 return '<div class="dblsqk" onclick="dblsqkAlert(\''+rowdata.id+'\')" title="'+dbCont+'" style="cursor:pointer;">'+duban+'<span>'+dbCont+'</span></div>';
                }},
                {display:"承办单位/人",name:"",width:"10%",align:"left",paixu:false,title:false,render:function(rowdata){
               	 return '<div class="cbdw" title="'+rowdata.underDepts+'">'+rowdata.underDepts+'</div>'
                }},
                {display:"转办时间",name:"",width:"9%",align:"center",render:function(rowdata){
               	 if(rowdata.firstZbTime && !!rowdata.firstZbTime){
               		 return rowdata.firstZbTime.substring(0,16);
               	 }
               	 return '';
                }},
                {display:"反馈时间",name:"",width:"11%",align:"left",paixu:false,render:function(rowdata){
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
            rownumberwidth:"50px",
            overflowx:false,
            pagesize: 7,
            pageyno:true,
            paramobj:{docStatus:status,leaderId:leaderId,startDate:startdate,endDate:enddate,year:nowYear},
            loadafter:function(data){
            	total=data.total;
            	$("input[name='documentStatus']:checked").parents("label").find("font").text(total);

            	$(".zspsnr").each(function(){
					var maxwidth = 42;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".dblsqk span").each(function(){
					var maxwidth = 42;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".table-title2").each(function(){
					var maxwidth = 42;
					if($(this).text().length > maxwidth){
						$(this).text($(this).text().substring(0,maxwidth));
						$(this).html($(this).html()+'...');
					}
				});
            	$(".cbdw").each(function(){
					var maxwidth = 28;
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
		$("#goback").click(function(){
			window.location.href = "../../jcdb/html/index.html"
		});
		$('#typeOption').change(function(){
			grid.setparams({docStatus:status,leaderId:leaderId,startDate:startdate,endDate:enddate,typeId:$('#typeOption').val()});
			grid.loadtable();
		})
//		$(".fa-search").click(function(){
//			var value = $(".top-right-search input").val();
//			grid.setparams({search:value});
//			grid.loadtable();
//		})
	}

	
	var initfn = function(){
		$.uniform.update($("input[name='documentStatus']").prop("checked",false));
		$.uniform.update($("input[name='documentStatus']").prop("disabled",true));
		if(status==""){
			$.uniform.update($($("input[name='documentStatus']")[0]).prop("checked",true));
			$.uniform.update($($("input[name='documentStatus']")[0]).prop("disabled",false));
			$($("input[name='documentStatus']")[0]).parents('label').addClass('selectedRadio')
		}else{
			$.uniform.update($("input[value='"+status+"']").prop("checked",true));
			$.uniform.update($("input[value='"+status+"']").prop("disabled",false));
			$("input[value='"+status+"']").parents('label').addClass('selectedRadio')
		}
	}
	// 左侧下拉框
	var initOption = function(){
		$ajax({
			url:dicUrl,
			data:{dicType:"document_type"},
			success:function(data){
				$('#typeOption').html('');
				$('#typeOption').append(`<option value="" style="background-color:#639AC1">全部</option>`)
				$.each(data.document_type,function(i,v){
					$('#typeOption').append(`<option value="${v.value}" style="background-color:#639AC1">${v.text}</option>`)
				})
			}
		});
	}
	
	return{
		//加载页面处理程序
		initControl:function(){
			initfn();
			initgrid();
			initother();
			initOption()
		},
		initgrid:function(){
			initgrid();
		}
	};
}();

$('.top-title').click(function(){
	window.location.href="/app/db/document/jcdb/html/index.html";
})
//批示指示内容弹出框
function pszsnrAlert(id){
	newbootbox.newdialog({
		id:"psDialog",
		width:800,
		height:600,
		header:true,
		theme:'black',
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
		theme:'black',
		classed:"cjDialog",
		url:"/app/db/document/view/html/dblsqk.html?fileId="+id
	})
}
