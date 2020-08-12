var sureUrl = {"url":"/app/db/subdocinfo/submitOperation","dataType":"text"}; //保存
var fromMsg=getUrlParam("fromMsg")||false; //是否为消息进入
var subId=getUrlParam("subId")||""; //子分支主id
var infoId=getUrlParam("infoId")||""; //主文件id
var pageModule = function(){
	var initother = function(){
		//确定
		$("#sure").click(function(){
			$ajax({
				url:sureUrl,
				data:{subId:subId,infoId:infoId,cbContent:$("#cbContent").val()},
				success:function(data){
					newbootbox.newdialogClose("cuibanDialog");
					if(data.result=="success"){
						newbootbox.alert("已成功催办！").done(function(){
						    changToNum2(function(){
                                if(fromMsg && fromMsg == "true"){
                                    windowClose();
                                }else{
                                    window.top.grdbfn();
                                }
							})
						});
					}else{
						newbootbox.alert("催办失败！");
					}
				}
			})
		});
		
		//关闭
		$("#close").click(function(){
			newbootbox.newdialogClose("cuibanDialog");
		})
	}
	return{
		//加载页面处理程序
		initControl:function(){
			initother();
		}
	};
}();
