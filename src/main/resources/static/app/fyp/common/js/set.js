var listurl = {"url":"/fyp/roleedit/list","dataType":"text"};//表格数据
var delUrl = {"url":"/fyp/guaranteetacking/delete","dataType":"text"};//删除
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var isAdminUrl = {"url":"/fyp/roleedit/getRole","dataType":"text"}; //人员树
var grid = null;

var pageModule = function () {
	var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"姓名",name:"userName",width:"15%",align:"center",render:function(rowdata,n){
							return rowdata.userName;                                         
						}},
						{display:"单位",name:"deptName",width:"35%",align:"center",render:function(rowdata){
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
						{display:"配置人",name:"editUserId",width:"15%",align:"center",render:function(rowdata){
							return rowdata.editUserName;
						}},
						{display:"配置时间",name:"editTime",width:"20%",align:"center",render:function(rowdata){
							return rowdata.editTime||'';
						}}
					 ],
			width:'100%',
			height:'100%',
			checkbox: true,
			rownumberyon:true,
			paramobj: {
				limit:1000,page:1,
				deptName:$("#deptName").val(),
				deptId:$("#deptId").val()
				/*searchVal:$("#searchVal").val()*/
			},
			overflowx:false,
			pageyno:false,
			url: listurl
	   });
	}
	var initother = function(){
		/*搜索 */
		/*$("#search").click(function(){
			initgrid();
		});*/
		$("#setbtn").click(function(){
	        window.open("/app/fyp/set/html/settabel.html")
		});
		
		$("#slqkbtn").click(function(){
			window.open("/app/fyp/slqk/html/slqktabel.html")
		});
		
		$("#bzbtn").click(function(){
	      window.open("/app/fyp/bzProject/html/bzwtgz.html")
		});
		$('#zbManage').click(function(){
			window.open("/app/fyp/set/html/departSetting.html")
		})
	}
	function isAdmin() {
		$ajax({
			url: isAdminUrl,
			type: "GET",
			success: function(data) {
				if(data.flag!='1') {
					$('.setbtn').show();
				}
			}
		})
	}
	var initUnitTree = function() {
		$("#deptName").createSelecttree({
			url: deptTreeUrl,
			width: '100%',
			success: function(data, treeobj) {},
			selectnode: function(e, data) {
				$("#deptName").val(data.node.text);
				$("#deptId").val(data.node.id);
				initgrid();
			}
		});
	}
	
    return {
        //加载页面处理程序
        initControl: function () {
			isAdmin()
        	initother();
			initgrid();
			initUnitTree();
        }
    }
}();

