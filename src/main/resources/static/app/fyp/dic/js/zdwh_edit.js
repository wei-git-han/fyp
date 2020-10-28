//var saveUrl = {"url":"/app/fyp/dic/data/deletezdx.json","dataType":"text"};
var saveUrl = {"url":"/dict/update","dataType":"json"};
var id = getUrlParam("id");
var type = getUrlParam("type");
var name = decodeURI(getUrlParam("name"));
var pageModule = function(){
	
	var initother = function(){
		if(name != '' && name != 'null'){
			$("#dname").val(name);
		}
		
		$("#quxiao").click(function(){
			newbootbox.newdialogClose("addModal");
		})
		
		
		$("#save").click(function(){
			var value=$("#dname").val();
			$ajax({
				url:saveUrl,
				data:{dictName:$("#dname").val() ,id:id, dictType: type,dictValue:""},
				type: "post",
				success:function(data){
					newbootbox.newdialogClose("addModal");
					newbootbox.alertInfo('保存成功！').done(function(){
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
