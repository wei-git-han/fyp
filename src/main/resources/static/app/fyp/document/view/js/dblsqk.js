var lsList = {"url":"/app/db/replyexplain/getAllLatestOneReply","dataType":"text"}; //督办落实列表：获取所有局最新一轮最新一条的已发布反馈（办理反馈用）
var jnlsList = {"url":"/app/db/replyexplain/queryAllLatestReply","dataType":"text"}; //督办落实列表：获取所有局最新一条的已发布反馈（局内用）
var fileId=getUrlParam("fileId")||""; //主文件id
var fileFrom=getUrlParam("fileFrom")||""; //主文件id
if(fileFrom && (fileFrom == "jndb" || fileFrom == "grdb")){
	lsList=jnlsList;
}
var pageModule = function(){
	var initls = function(){
		$ajax({
			url:lsList,
			data:{infoId:fileId},
			success:function(data){
				$("#lsContent").html("");
				$.each(data,function(i,item){
					var state="";
					if(item.chooseStatus=="1"){
						state="办理中";
					}else if(item.chooseStatus=="2"){
						state="办结";
					}else if(item.chooseStatus=="3"){
						state="常态落实";
					}
					$("#lsContent").append(
						'<div class="record">'+
			            '	<div class="line1"><span class="juName">'+item.subDeptName+'</span><span>'+item.userName+'&nbsp;&nbsp;'+item.createdTime+'&nbsp;&nbsp;落实情况</span><span style="margin-left:20px;">提交状态：'+state+'</span></div>'+
			            '	<div class="line2">'+item.replyContent+'</div>'+
			            '</div>'
		            )
				});
			}
		});
	}
	
	var initother = function(){
		//关闭
		$("#close").click(function(){
			newbootbox.newdialogClose("dblsqkDialog");
		})
	}
	return{
		//加载页面处理程序
		initControl:function(){
			initls();
			initother();
		}
	};
}();
