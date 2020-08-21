var listurl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/fyp/roleedit/list","dataType":"text"};//表格数据
var delUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/fyp/guaranteetacking/delete","dataType":"text"};//删除
var grid = null;

var pageModule = function () {
	var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"姓名",name:"userName",width:"15%",align:"center",render:function(rowdata,n){
							return rowdata.userName;                                         
						}},
						{display:"单位",name:"deptName",width:"40%",align:"center",render:function(rowdata){
							return rowdata.deptName;                                         
						}},
						{display:"角色配置",name:" roleType",width:"15%",align:"center",render:function(rowdata){
							var roleType = "";
							if(rowdata.roleType ==0){
								roleType = "超级管理员";
							}
							if(rowdata.roleType ==1){
								roleType = "系统管理员";
							}
							if(rowdata.roleType ==2){
								roleType = "局管理员";
							}
							if(rowdata.roleType ==3){
								roleType = "在编人员";
							}
							return roleType;                                       
						}},
						{display:"配置人",name:"weeks",width:"15%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"配置时间",name:"weeks",width:"15%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}}
					 ],
			width:'100%',
			height:'100%',
			checkbox: true,
			rownumberyon:true,
			paramobj:{},
			overflowx:false,
			pageyno:false,
			url: listurl
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
				url:"setadd.html",
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
					title:"新增问题",
					url:"setadd.html?id="+id
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

