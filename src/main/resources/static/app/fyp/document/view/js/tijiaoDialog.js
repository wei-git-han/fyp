var deptTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //部门树
var sureUrl = {"url":"/app/db/subdocinfo/submitOperation","dataType":"text"}; //保存
var sendUrl = {"url":"/app/db/subdocinfo/sendOperation","dataType":"text"}; //保存
var subId=getUrlParam("subId")||""; //子分支主id
var replyContent=getUrlParam2("replyContent")||""; //文件来源
var saveFlag=getUrlParam("saveFlag")||"0"; //是否是承办人
var cbrFlag=getUrlParam("cbrFlag")||""; //是否是承办人
var infoId=getUrlParam("infoId")||""; //子分支主id
var fromMsg=getUrlParam("fromMsg")||false; //是否为消息进入
var dbStatus=getUrlParam("dbStatus")||""; //承办人选中的状态
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
				if(cbrFlag && cbrFlag == 1){
					$ajax({
						url:sureUrl,
						data:{infoId:infoId,subId:subId,userName:userName,userId:userId,dbStatus:dbStatus},
						success:function(data){
							newbootbox.newdialogClose("tijiaoDialog");
							if(data.result=="success"){
								newbootbox.alert("提交成功！").done(function(){
								    changToNum2(function(){
                                        if(fromMsg && fromMsg == "true"){
                                            windowClose();
                                        }else{
                                            window.top.jndbfn();
                                            window.top.grdbfn();
                                            window.top.blfkfn();
                                            $("#iframe1",window.top.document).attr("src","/app/db/document/grdb/html/grdb.html");
                                        }
								    });
                                });
							}else{
								newbootbox.alert("提交失败！");
							}
						}
					})
				}else{
					$.ajax({
						url:sendUrl.url,
						data:{infoId:infoId,subId:subId,userName:userName,userId:userId,replyContent:replyContent,saveFlag:saveFlag},
						type:'POST',
						success:function(data){
							newbootbox.newdialogClose("tijiaoDialog");
							if(data.result=="success"){
								newbootbox.alert("提交成功！").done(function(){
                                    changToNum2(function(){
                                        if(fromMsg && fromMsg == "true"){
                                            windowClose();
                                        }else{
                                            window.top.jndbfn();
                                            window.top.grdbfn();
                                            window.top.blfkfn();
                                            //changToNum()
                                            $("#iframe1",window.top.document).attr("src","/app/db/document/grdb/html/grdb.html");
                                        }
                                    });
								});
							}else{
								newbootbox.alert("提交失败！");
							}
						}
					})
				}
			}else{
				newbootbox.alert("请选择人员！");
			}
		});
		
		//关闭
		$("#close").click(function(){
			newbootbox.newdialogClose("tijiaoDialog");
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
