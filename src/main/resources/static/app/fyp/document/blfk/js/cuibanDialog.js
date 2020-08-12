var fileIds=getUrlParam("fileIds")||""; //主文件id
var cuibanurl = {"url":"/app/db/documentszinfo/press","dataType":"text"};//催办操作
var pageModule = function(){
	var initother = function(){
		//确定
		$("#sure").click(function(){
			var textarea = $("#textarea").val();
			  if ($.trim(textarea) == "") {
			    newbootbox.alert("请填写内容！");
			    return;
			  }
			  $ajax({
			    url: cuibanurl,
			    data: {
			      textarea: textarea,
			      id: fileIds
			    },
			    success: function(data) {
			      if (data.result == "success") {
			        newbootbox.alert("操作成功！").done(function() {
			        	newbootbox.newdialogClose("cuibanDialog");
			        	window.top.iframe1.refreshgrid();
			        });
			      }
			    }
			  });
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
