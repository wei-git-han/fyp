var listurl = {"url":"/app/fyp/reignCaseController/reignOnlineUserList","dataType":"text"};//表格数据
// http://127.0.0.1:11208/app/fyp/reignCaseController/reignOnlineUserList?afficheType=online
var grid = null;
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var afficheType = getUrlParam('type')||"reign"


var pageModule = function () {
   var initother = function () {
       $('#afficheType').val(afficheType)
    //单位
        $("#deptName").createSelecttree({
            url :deptTreeUrl,
            width : '100%',
            success : function(data, treeobj) {},
            selectnode : function(e, data) {
                $("#deptName").val(data.node.text);
                $("#deptId").val(data.node.id);
            }
        });
       $("#sure").click(function(){
           var elementarry = ["deptId","afficheType"];
           grid.setparams(getformdata(elementarry));
           grid.refresh();
       });

       //重置
       $("#reset").click(function(){
           removeInputData(["deptId","deptName","afficheType"]);
       });
    }
	var initgrid = function(){
		grid = $('#gridcont').createGrid({
			columns:[
			    {display:"序号",name:"index",width:"10%",align:"center",render:function(rowdata,n){
                    return n+1;
                }},
                {display:"姓名",name:"userName",width:"20%",align:"center",render:function(rowdata,n){
                    return rowdata.userName;
                }},
                {display:"职务",name:"post",width:"25%",align:"left",render:function(rowdata){
                    return rowdata.post;
                }},
                {display:"手机号",name:"tel",width:"10%",align:"center",render:function(rowdata){
                    return rowdata.tel;
                }},
                {display:"房间号",name:"address",width:"10%",align:"center",render:function(rowdata){
                    return rowdata.address;
                }},
                {display:"部门",name:"orgName",width:"25%",align:"center",render:function(rowdata){
                    return rowdata.dept;
                }}
             ],
			width:'100%',
            height:'100%',
			paramobj:{'afficheType':$('#afficheType').val(),deptid:$("#deptId").val()},
			url : listurl
		});
	}
	return {
		//加载页面处理程序
		initControl: function () {
		    // initUnitTree();
            initother()
			initgrid();
		}
	}
}();

