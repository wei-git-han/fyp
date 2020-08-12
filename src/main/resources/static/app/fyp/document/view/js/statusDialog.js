var saveUrl = {"url":"/app/db/document/view/data/tjsuccess.json","dataType":"text"}; //保存---待修改
var subId=getUrlParam("subId")||""; //子分支主id
var cbrFlag=getUrlParam("cbrFlag")||""; //是否是承办人
var infoId=getUrlParam("infoId")||""; //主文件id
var fromMsg=getUrlParam("fromMsg")||false; //是否为消息进入
var pageModule = function(){
	var initother = function(){
		//确定
		$("#sure").click(function(){
			var dbStatus = $("input[type=radio]:checked").val();
			newbootbox.newdialogClose("statusDialog");
			newbootbox.newdialog({
				id:"tijiaoDialog",
				width:800,
				height:600,
				header:true,
				title:"提交",
				classed:"cjDialog",
				url:"/app/db/document/view/html/tijiaoDialog.html?subId="+subId+"&infoId="+infoId+"&cbrFlag="+cbrFlag+"&fromMsg="+fromMsg+"&dbStatus="+dbStatus
			})
		});
		
		//关闭
		$("#close").click(function(){
			newbootbox.newdialogClose("statusDialog");
		})
	}
	return{
		//加载页面处理程序
		initControl:function(){
			initother();
		}
	};
}();
