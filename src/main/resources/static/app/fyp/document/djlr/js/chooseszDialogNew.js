var userName;//选择的首长名字
var userId;//选择的首长id
var pageModule = function(){
	var initPeoples = function(){
		$.ajax({
 			url:"/app/db/roleset/querySzList",
 			success:function(data){
 				if(data.length<1){
 					newbootbox.alert('请先在业务配置里设置首长！');
 				}else{
 					$("#peoples").html("");
 					$.each(data,function(i,obj){
 						var	html1 ='<label class="radio-inline">'
		     							html1+='<input type="checkbox" name="users"  data="'+obj.userId+'" personName="'+obj.userName+'">'+obj.userName
 						           '</label>'
 						$("#peoples").append(html1);
 					})				
 				}

 			}
 		});
	}
	var initOther = function(){
	    $("#userCancel").click(function(){
	        newbootbox.newdialogClose("chooseszDialog");
	    });
	    $("#userOk").click(function(){
	        var arrId = new Array();
	        var arrNames = new Array();
	        $("input[name=users]").each(function(){
	            if ($(this).prop("checked")) {
	                arrId.push($(this).attr("data"))
	                arrNames.push($(this).attr("personName"))
	            }
	        })
	        console.log("勾选的值"+arrId.join(",")+","+arrNames.join(","));
	        window.top.iframe1.window.pageModule.getUserData(arrNames.join(","),arrId.join(","));
            newbootbox.newdialogClose("chooseszDialog");
        });
        //全选
        $("#all").click(function(){
            if ($(this).prop("checked")) {
                 $("input[name=users]").each(function(){
                    $(this).prop("checked",true);
                })
            } else {
                 $("input[name=users]").each(function(){
                    $(this).prop("checked",false);
                })
            }
        })
	}
	
	return{
		//加载页面处理程序
		initControl:function(){
			initPeoples();
			initOther();
		}
	};
}();
