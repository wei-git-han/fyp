var psList = {"url":rootPath +"/documentszps/queryList","dataType":"text"}; //批示列表
var fileId=getUrlParam("fileId")||""; //主文件id
var pageModule = function(){
	var initps = function(){
		$ajax({
			url:psList,
			data:{infoId:fileId},
			success:function(data){
				$("#psContent").html("");
				$.each(data,function(i,item){
					$("#psContent").append(
						'<div class="record">'+
			            '	<div class="line1"><span>'+item.userName+'</span><span class="psDate">'+item.createdTime+'批示：</span></div>'+
			            '	<div class="line2">'+item.leaderComment+'</div>'+
			            '</div>'
		            )
				});
			}
		});
	}
	var initother = function(){
		//关闭
		$("#close").click(function(){
			newbootbox.newdialogClose("psDialog");
		})
	}
	return{
		//加载页面处理程序
		initControl:function(){
			initps();
			initother();
		}
	};
}();
