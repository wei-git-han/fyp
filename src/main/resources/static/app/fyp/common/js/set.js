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
		/*导入 */
		$("#importBtn").click(function(){
			
		});
		
		/*搜索 */
		$("#search").click(function(){
			grid.setparams({searchVal:$("#searchVal").val()});
			grid.refresh();
		});
	}
	
    return {
        //加载页面处理程序
        initControl: function () {
        	initother();
			initgrid();
        }
    }
}();

