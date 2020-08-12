var getUserAdminTypeUrl = {"url":rootPath +"/adminset/getAuthor","dataType":"text"};
var pageModule = function(){
	var initother = function(){
		$ajax({
			url: getUserAdminTypeUrl,
			type: "GET",
			success: function(data) {
				if(data=="3"){//即是部管理员又是局管理员
					$("#jssz").show();
					$('#departAdmin').show();
					$('#juAdmin').show();
					$("#szsz").show();
					$("#zdwh").show();
					$("#fkfl").show(); //反馈范例...
					$("#txgl").show();
					$("#sjsz").show();
				}else if (data=="0"||data=="1"){//超级管理员或部管理员
					$('#departAdmin').show();
					$('#juAdmin').show();
					$("#szsz").show();
					$("#zdwh").show();
					$("#fkfl").show(); //反馈范例...
					$("#txgl").show();
					$("#sjsz").show();
				}else{ //局管理员
					$('#juAdmin').show();
					$("#jssz").show();
				}
			}
		});
		$(".newpage8").click(function(){
			$(".newpage8").removeClass("active");
			$(this).addClass("active");
		});
	}

	return{
		//加载页面处理程序
		initControl:function(){
			initother();
		}
	};
	
}();
