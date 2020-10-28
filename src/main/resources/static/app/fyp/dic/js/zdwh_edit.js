var saveUrl = {"url":"/app/fyp/dic/data/deletezdx.json","dataType":"text"};
var id = getUrlParam("id");
var value = decodeURI(getUrlParam("value"));
var pageModule = function(){
	
	var initother = function(){
		if(value != '' && value != 'null'){
			$("#dname").val(value);
		}
		
		$("#quxiao").click(function(){
			newbootbox.newdialogClose("addModal");
		})
		
		
		$("#save").click(function(){
			var value=$("#dname").val();
			$ajax({
				url:saveUrl,
				data:{value:value,id:id},
				type: "GET",
				success:function(data){
					newbootbox.newdialogClose("addModal");
					newbootbox.alertInfo('保存成功！').done(function(){
						//window.location.href = "/app/gwcl/document/ywpz/zdwh/html/zdwh.html"
						window.top.pageModule.initgrid();
					});
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
