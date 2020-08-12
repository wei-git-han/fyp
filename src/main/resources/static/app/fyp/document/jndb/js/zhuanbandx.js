var deptTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //部门树
var sureUrl = {"url":"/app/db/documentzbjl/subZbSave","dataType":"text"}; //保存
var fromMsg=getUrlParam("fromMsg")||false; //是否为消息进入
var subId=getUrlParam("subId")||""; //子分支主id
var infoId=getUrlParam("infoId")||""; //主文件id
var fileFrom=getUrlParam("fileFrom")||""; //文件来源
var userId="";
var userName="";
var pageModule = function(){
	var initTree = function(){
		$ajax({
			url:deptTreeUrl,
			success:function(data){
				$("#people-tree").jstree({
				    "plugins": ["wholerow", "types"],
				    "core": {
				    "themes" : {
				        "responsive": false
				    },    
				    "data": data,
				    },
				    "types" : {
				    	"default" : {
					        "icon" : "peoples_img"
					    },
					    "file" : {
					        "icon" : "peoples_img"
					    },
					    "1" : {
					        "icon" : "people_img"
					    }
				    }
				});
				$("#people-tree").on("select_node.jstree", function(e,data) {
					userName = "";
					userId = "";
					if(data.node.original.type == 1 || data.node.original.type == "1"){
						 userName = data.node.text;
						 userId = data.node.id;
					}
				});
			}
		})
	};
	
	var initother = function(){
		//确定
		$("#sure").click(function(){
			if(userName!="" && userName!=null){
				$ajax({
					url:sureUrl,
					data:{subId:subId,infoId:infoId,userName:userName,userId:userId},
					success:function(data){
						newbootbox.newdialogClose("zhuanbanDialog");
						if(data.result=="success"){
							//changToNum()
							newbootbox.alert("转办成功！").done(function(){
                                changToNum2(function(){
                                    if(fromMsg && fromMsg == "true"){
                                        windowClose();
                                    }else{
                                        window.top.jndbfn();
                                        window.top.grdbfn();
                                        window.top.blfkfn();
                                        if(fileFrom == "jndb"){
                                            $("#iframe1",window.top.document).attr("src","/app/db/document/jndb/html/jndb.html?fileFrom="+fileFrom);
                                        }
                                        if(fileFrom == "grdb"){
                                            $("#iframe1",window.top.document).attr("src","/app/db/document/grdb/html/grdb.html?fileFrom="+fileFrom);
                                        }
                                    }
                                })
							});
						}else{
							newbootbox.alert("转办失败！");
						}
					}
				})
			}else{
				newbootbox.alert("请选择人员！");
			}
		});
		
		//关不
		$("#close").click(function(){
			newbootbox.newdialogClose("zhuanbanDialog");
		})
	}
	return{
		//加载页面处理程序
		initControl:function(){
			initTree();
			initother();
		}
	};
}();
