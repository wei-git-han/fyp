var id = getUrlParam("id");
var value = decodeURI(getUrlParam("value"));
var type = decodeURI(getUrlParam("type"));
var valueNum = decodeURI(getUrlParam("valueNum"));

var pageModule = function(){
	
	var initother = function(){
		if(value != '' && value != 'null'){
			$("#dname").val(value);
		}
		
		if(valueNum != '' && valueNum != 'null'){
			$("#sortType").val(valueNum);
		}
		
		$("#quxiao").click(function(){
			window.location.href="zdwh.html";
		})
		
		$("#fanhui").click(function(){
			window.location.href="zdwh.html";
		})
		
		$("#save").click(function(){
			var value=$("#dname").val();
			var sortType=$("#sortType").val();
			$ajax({
				url:saveUrl,
				data:{text:value,id:id,dicType:type,value:sortType},
				type: "GET",
				success:function(data){
					if(data.code == 0){
						newbootbox.alertInfo('保存成功！').done(function(){
							window.location.href = "zdwh.html"
						});
					}else if(data.code == 1){
						newbootbox.alertInfo(data.result);
					}else {
						newbootbox.alertInfo('返回出错！');
					}
				}
			});
			
		})
	}
	
	return{
		//加载页面处理程序
		initControl:function(){
			initother();
		}
	};
	
}();
