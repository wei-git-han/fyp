var saveUrl = {"url":"/app/fyp/dic/data/deletezdx.json","dataType":"text"};
var type = getUrlParam("type");
var name1 = decodeURI(getUrlParam("name"));
var value = getUrlParam("value");
var pageModule = function(){
	var initother = function(){
		if(name1 != '' && name1 != 'null'){
			$("#dname").val(name1);
		}
		
		$("#quxiao").click(function(){
			newbootbox.newdialogClose("addModal");
		})
		
		$("#commentForm").validate({
		    submitHandler: function() {
		    	var content=$("#content").val();
				var dname=$("#dname").val();
				$ajax({
					url:saveUrl,
					data:{dname:dname,values:encodeURI(content),id:type},
					type: "GET",
					success:function(data){
						newbootbox.newdialogClose("addModal");
						newbootbox.alertInfo('保存成功！').done(function(){
							window.top.pageModule.initgrid();
							//window.location.href = "/app/gwcl/document/ywpz/zdwh/html/zdwh.html"
						});
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
