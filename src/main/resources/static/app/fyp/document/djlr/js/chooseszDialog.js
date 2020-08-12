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
		     							html1+='<input type="radio" name="users"  data="'+obj.userId+'" personName="'+obj.userName+'">'+obj.userName
 						           '</label>'
 						$("#peoples").append(html1);
 					})				
 				}
 				$("input[name=users]").click(function(){
 					window.top.iframe1.window.pageModule.getUserData($(this).attr("personName"),$(this).attr("data"));
 					newbootbox.newdialogClose("chooseszDialog");
 				})
 				
 			}
 		});
	}
	
	return{
		//加载页面处理程序
		initControl:function(){
			initPeoples();
		}
	};
}();
