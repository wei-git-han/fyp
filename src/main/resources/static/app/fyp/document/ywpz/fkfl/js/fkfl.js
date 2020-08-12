var grid = null;
var grid1 = null;
var grid2 = null;
var grid3 = null;
var tableUrl = {"url":rootPath +"/dbexpdeedbackset/list","dataType":"text"}; //表格list
var delUrl = {"url":rootPath +"/dbexpdeedbackset/delete","dataType":"text"}; //删除---待完善
var remindTableUrl = {"url":"/remindadministration/list","dataType":"text"}; //提示提醒表格list
var reminddelUrl = {"url":"/remindadministration/delete","dataType":"text"}; //提示提醒删除---待完善
var editSwitchUrl = {"url":"/remindadministration/update","dataType":"text"};  //修改开关
var pageModule = function() {
	var initgrid = function() {
		grid = $("#gridcont").createGrid({
			columns: [
				  {display: "范例名称",name:"orgName",width: "15%",align: "left",render: function(rowdata,n){
					  return rowdata.expName;   
				  }},
				  {display: "范例内容",name:"deptName",width: "75%",align: "left",render: function(rowdata,n){
					  return rowdata.expContent;   
				  }}, 
				  {display: "操作",name: "do",width: "10%",align: "center",render: function(rowdata,n){
					  var btns="";
					  //if(限制条件){
						  btns= '<i class="fa fa-pencil btns"  onclick="editfn(\''+rowdata.id+'\')" title="编辑"></i>'+
						  		'<i class="fa fa-trash-o btns"  onclick="delfn(\''+rowdata.id+'\')" title="删除"></i>';
					  //}
					  return btns;
				  }}
				 ],
			width: "100%",
			height: "100%",
			checkbox: true,
			rownumberyon: true,
			overflowx: false,
            pagesize: 15,
			url: tableUrl
			
		});
	}
	var initgridright = function() {
		grid1 = $("#gridcont1").createGrid({
			columns: [
				  {display: "提醒角色",name:"remindRole",width: "15%",align: "left",render: function(rowdata,n){
					  return rowdata.remindRole;   
				  }},
				  {display: "提醒时间",name:"remindTime",width: "15%",align: "left",render: function(rowdata,n){
					  return rowdata.remindTime;   
				  }}, 
				  {display: "提醒内容",name:"remindContent",width: "40%",align: "left",render: function(rowdata,n){
					  return rowdata.remindContent;   
				  }}, 
				  {display:"状态",name:"flag",width:"15%",align:"center",render:function(rowdata,n){
                  	var checkedMark = (rowdata.state=='true')?"checked":""
                   	return '<div class="switch"><input class="leaveSwitch" data-clickid="'+rowdata.id+'" name="status" type="checkbox" '+checkedMark+'></div>'; 
                   }},
                   {display:"操作",name:"do",width:"15%",align:"center",render:function(rowdata,n){
                    	return '<span class="remindedit" onclick="remindeditfn(\''+rowdata.id+'\',\''+rowdata.remindRole+'\',\''+rowdata.remindTime+'\',\''+rowdata.remindContent+'\','+1+')"  title="编辑">编辑</span>';
                    }}
				 ],
			width: "100%",
			height: "100%",
			checkbox: false,
			rownumberyon: false,
			overflowx: false,
			pageyno:false,
			paramobj:{pagesize:15,page:1,type:1},
			url: remindTableUrl,
			loadafter:function(){
		       	$("td").css({"white-space":"normal","vertical-align":"middle"});
		       	initBootSwitch()
            },
			
		});
		grid2 = $("#gridcont2").createGrid({
			columns: [
				  {display: "提醒角色",name:"remindRole",width: "15%",align: "left",render: function(rowdata,n){
					  return rowdata.remindRole;   
				  }},
				  {display: "提醒时间",name:"remindTime",width: "15%",align: "left",render: function(rowdata,n){
					  return rowdata.remindTime;   
				  }}, 
				  {display: "提醒内容",name:"remindContent",width: "40%",align: "left",render: function(rowdata,n){
					  return rowdata.remindContent;   
				  }}, 
				  {display:"状态",name:"flag",width:"15%",align:"center",paixu:false,render:function(rowdata,n){
					  var checkedMark = (rowdata.state=='true')?"checked":""
                 	return '<div class="switch"><input class="leaveSwitch" data-clickid="'+rowdata.id+'" name="status" type="checkbox" '+checkedMark+'></div>'; 
                 }},
                 {display:"操作",name:"",width:"15%",align:"center",paixu:false,render:function(rowdata,n){
                  	return '<span class="remindedit" onclick="remindeditfn(\''+rowdata.id+'\',\''+rowdata.remindRole+'\',\''+rowdata.remindTime+'\',\''+rowdata.remindContent+'\','+1+')"  title="编辑">编辑</span>';
                  }}
				 ],
			width: "100%",
			height: "100%",
			checkbox: false,
			rownumberyon: false,
			overflowx: false,
			pageyno:false,
			paramobj:{pagesize:15,page:1,type:2},
			url: remindTableUrl,
			loadafter:function(){
		       	$("td").css({"white-space":"normal","vertical-align":"middle"});
		       	initBootSwitch()
            },
			
		});
		grid3 = $("#gridcont3").createGrid({
			columns: [
				  {display: "提醒角色",name:"remindRole",width: "15%",align: "left",render: function(rowdata,n){
					  return rowdata.remindRole;   
				  }},
				  {display: "提醒时间",name:"remindTime",width: "20%",align: "left",render: function(rowdata,n){
					  return rowdata.remindTime+"("+rowdata.startTime+"至"+rowdata.endTime+")";   
				  }}, 
				  {display: "提醒内容",name:"remindContent",width: "35%",align: "left",render: function(rowdata,n){
					  return rowdata.remindContent;   
				  }}, 
				  {display:"状态",name:"flag",width:"15%",align:"center",paixu:false,render:function(rowdata,n){
					  var checkedMark = (rowdata.state=='true')?"checked":"";
					  var disabled = (rowdata.edit != 'false')?"":"disabled";
                 	return '<div class="switch"><input '+disabled+' class="leaveSwitch" data-clickid="'+rowdata.id+'" name="status" type="checkbox" '+checkedMark+'></div>'; 
                 }},
                 {display:"操作",name:"",width:"15%",align:"center",paixu:false,render:function(rowdata,n){
                	 var className = (rowdata.edit != 'false')?"remindedit":"reminddisabled";
                  	return '<span class='+className+' onclick="remindeditfn(\''+rowdata.id+'\',\''+rowdata.remindRole+'\',\''+rowdata.remindTime+'\',\''+rowdata.remindContent+'\','+3+')"  title="编辑">编辑</span>';
                  }}
				 ],
		width: "100%",
		height: "100%",
		checkbox: true,
		rownumberyon: true,
		overflowx: false,
		pageyno:false,
		paramobj:{pagesize:15,page:1,type:3},
		url: remindTableUrl,
		loadafter:function(){
	       	$("td").css({"white-space":"normal","vertical-align":"middle"});
	       	initBootSwitch()
        },
			
		});
	}

	var initother = function() {
		$("#add").click(function() {
			newbootbox.newdialog({
				id:"addDialog",
				width:800,
				height:600,
				header:true,
				title:"新增范例",
				classed:"cjDialog",
				url:"/app/db/document/ywpz/fkfl/html/edit.html"
			})
		});
		
		$("#edit").click(function() {
			var datas = grid.getcheckrow();
			var ids=[];
			if(datas.length < 1 || datas.length > 1) {
				newbootbox.alertInfo("请选择一条数据进行编辑！");
			} else {
				$(datas).each(function(i){
					ids[i]=this.id;
				});
				newbootbox.newdialog({
					id:"addDialog",
					width:800,
					height:600,
					header:true,
					title:"新增范例",
					classed:"cjDialog",
					url:"/app/db/document/ywpz/fkfl/html/edit.html?id="+ids[0]
				})
			}
		});
		
		//删除
		$("#del").click(function() {
			var datas = grid.getcheckrow();
			var ids=[];
			if(datas.length < 1) {
				newbootbox.alertInfo("请选择要删除的数据！");
			} else {
				$(datas).each(function(i){
					ids[i]=this.id;
				});
				delfn(ids.toString());
			}
		});
		
	}

	return {
		//加载页面处理程序
		initControl: function() {
			initgrid();
			initother();
		},
		initgrid:function(){
			initgrid();
		},
		initgridright:function(){
			initgridright();
		}
	}

}();

//编辑
var editfn = function(id){
	newbootbox.newdialog({
		id:"addDialog",
		width:800,
		height:600,
		header:true,
		title:"范例设置",
		classed:"cjDialog",
		url:"/app/db/document/ywpz/fkfl/html/edit.html?id="+id
	})
}
//管理提醒编辑
var remindeditfn = function(id,Role,Time,Content,type){
	var title = "";
	if(type == 1){
		title="局内未转办提醒设置"
	}else if(type == 2){
		title="为承办或为反馈设置"
	}else if(type == 3){
		title="催填提醒设置"
	}
	newbootbox.newdialog({
		id:"addDialog",
		width:800,
		height:600,
		header:true,
		title:title,
		classed:"cjDialog",
		url:"/app/db/document/ywpz/fkfl/html/remindedit.html?id="+id+"&role="+Role+"&time="+Time+"&content="+Content+"&type="+type
	})
}
//删除
var delfn = function(id){
	newbootbox.confirm({
		 title: "提示",
	     message: "是否要进行删除操作？",
	     callback1:function(){
	    	 $ajax({
				url: delUrl,
				type: "GET",
				data: {"ids":id},
				success: function(data) {
					if(data.result == "success") {
						newbootbox.alertInfo('删除成功！').done(function(){
							grid.refresh();
						});
					}else{
						newbootbox.alertInfo("删除失败！");
					}
				}
			})
	     }
	});
}
//管理提醒删除
var reminddelfn = function(id){
	var datas = grid3.getcheckrow();
	var ids=[];
	if(datas.length < 1) {
		newbootbox.alertInfo("请选择要删除的数据！");
	} else {
		$(datas).each(function(i){
			ids[i]=this.id;
		});
		newbootbox.confirm({
			 title: "提示",
		     message: "是否要进行删除操作？",
		     callback1:function(){
		    	 $ajax({
					url: reminddelUrl,
					type: "GET",
					data: {"ids":ids.join(",")},
					success: function(data) {
						if(data.msg == "success") {
							newbootbox.alertInfo('删除成功！').done(function(){
								grid3.refresh();
							});
						}else{
							newbootbox.alertInfo("删除失败！");
						}
					}
				})
		     }
		});
	}
}
//初始化列表开关
var initBootSwitch= function(){
   	$('.leaveSwitch').bootstrapSwitch({
   		onText:"ON",
   		offText:"OFF",
   		onColor:"success",
   		offColor:"danger",
   		size:"mini",
   		animate:"false",
   		onSwitchChange:function(event,state){
			$ajax({
				url:editSwitchUrl,
				data:{id:$(event.target).data("clickid"),state:state?"true":"false"},
				type: "GET",
				success:function(data){
				}
			});
   		}
   	})
}
var tabClick = function(flag){
	setTimeout(function(){
//		grid1.refresh();
//		grid2.refresh();
//		grid3.refresh();
		if(flag == 2){
			pageModule.initgridright()
		}else{
			pageModule.initgrid();
		}
		
	},10)
//	if(flag == 1){
//		$("#content1").show()
//		$("#content2").hide()
//	}else{
//		$("#content2").show()
//		$("#content1").hide()
//	}
}