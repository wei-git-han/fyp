var type = getUrlParam("type");
var name1 = decodeURI(getUrlParam("name"));
var value = getUrlParam("value");
var pageModule = function(){
	var initother = function(){
		if(name1 != '' && name1 != 'null'){
			$("#dname").val(name1);
		}
		
		$("#quxiao").click(function(){
			window.location.href="zdwh.html";
		})
		
		$("#fanhui").click(function(){
			window.location.href="zdwh.html"
		})
		
		$("#commentForm").validate({
		    submitHandler: function() {
		    	var content=$("#content").val();
				var sortType=$("#sortType").val();
				$ajax({
					url:saveUrl,
					data:{text:content,value:sortType,dicType:type,id:''},
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
		    }
		});
		
		$("#save").click(function(){
			$("#commentForm").submit();
		})
	}
	
	return{
		//加载页面处理程序
		initControl:function(){
			initother();
		}
	};
	
}();
