var listUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/fyp/feedbackhear/list","dataType":"text"};//表格数据
var delUrl = {"url":"","dataType":"text"};//删除
var grid = null;

var pageModule = function () {
	var initgrid = function(){
		grid = $("#gridcont").createGrid({
				columns:[
						{display:"硬件/软件名称",name:"name",width:"16%",align:"center",render:function(rowdata,n){
							return rowdata.name;                                         
						}},
						{display:"问题描述",name:"desc",width:"14%",align:"center",render:function(rowdata,n){
							return rowdata.desc;                                         
						}},
						{display:"提出时间",name:"submitTime",width:"12%",align:"center",render:function(rowdata){
							return rowdata.submitTime;                                         
						}},
						{display:"提出人",name:"submitUserName",width:"10%",align:"center",render:function(rowdata){
							return rowdata.submitUserName;                                         
						}},
						{display:"解决时限",name:"weeks",width:"12%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"工作进展",name:"weeks",width:"12%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"状态",name:" status",width:"10%",align:"center",render:function(rowdata){
							return rowdata. status;                                         
						}},
						{display:"问题分类",name:"weeks",width:"14%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}}
				 ],
		width:'100%',
		height:'100%',
		checkbox: false,
		rownumberyon:true,
		paramobj:{},
		overflowx:false,
		pageyno:false,
		url: listUrl
	  });
	}
	
	var initother = function(){
		/*搜索 */
		$("#sure").click(function(){
			var elementarry = ["name","deptId","deptName","phone","warrantyTime","source","remark","status"];
			grid.setparams(getformdata(elementarry));
			grid.refresh();
		});
		
		//重置
		$("#reset").click(function(){
			removeInputData(["name","deptId","deptName","phone","warrantyTime","source","remark","status"]);
		});
		
		
		/* 新增add */
		$("#add").click(function(){
			newbootbox.newdialog({
				id:"addModal",
				width:880,
				height:600,
				header:true,
				title:"新增",
				url:"slqkadd.html",
            })
		});
		
		//编辑edit
		$("#edit").click(function(){
			var datas = grid.getcheckrow();
			if(datas.length !=1) {
				newbootbox.alertInfo("请选择一条要编辑的数据！");
			} else {
				var id = datas[0].id;
				newbootbox.newdialog({
					id:"addModal",
					width:880,
					height:600,
					header:true,
					title:"新增",
					url:"slqkadd.html?id="+id
				}) 
			}
		});
		
		
		/* 删除del */
		$("#del").click(function() {
			var datas = grid.getcheckrow();
			var ids=[];
			if(datas.length < 1) {
				newbootbox.alertInfo("请选择要删除的数据！");
			} else {
				$(datas).each(function(i){
					ids[i]=this.id;
				});
				newbootbox.confirm({
					 title: "提示",
				     message: "确认删除该信息？",
				     callback1:function(){
				    	 $ajax({
							url: delUrl,
							type: "GET",
							data: {"ids": ids.toString()},
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
		})
	}
	
    return {
        //加载页面处理程序
        initControl: function () {
        	initother();
			initgrid();
        }
    }
}();

