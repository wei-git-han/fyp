
var pageModule = function(){
	var initother = function(){
		$("#uploadFile").click(function(){
			$("#file").click();
			$("#file").change(function(){
				var fileNameArry = $(this).val().split("\\");
				var fileName;
				if(fileNameArry.length==1){
					fileName=fileNameArry[0];
				}else{
					fileName=fileNameArry[fileNameArry.length-1];
				}
				$(".fileinput-filename").text(fileName);
			})
		})
		
		$("#shangchuan2").click(function(){
			var val = $("#file").val();
			var array = val.split("\\");
			var filename = "";
			if(array.length==1){
				filename = array[0];
			}else{
				filename = array[array.length-1];
			}
			var filetype = filename.split(".")[filename.split(".").length-1];
			if(filetype != 'xls' && filetype != 'xlsx'){
				newbootbox.alertInfo("请上传正确格式的文件！");
				return;
			}
			
			var ajax_option ={
					type: "post",
					url:"/app/db/import/importExcle",//默认是form action
					success:function(data){
						if(data.result == "success"){
							if(data.msg){
								newbootbox.alertInfo(data.msg);
							}else{
								newbootbox.alertInfo('导入成功！');
							}
							newbootbox.newdialogClose("fileDr");
							$("#iframe1",window.top.document).attr("src","/app/db/document/djlr/html/djlr.html?fileFrom=djlr");
							window.top.blfkfn();
						}else{
							newbootbox.alertInfo('导入失败！');
						}
				}
			}
			$('#form2').ajaxSubmit(ajax_option);
			
		})
		
		$("#close").click(function(){
			newbootbox.newdialogClose("fileDr");
		})
		
	}

	return{
		//加载页面处理程序
		initControl:function(){
			initother();
		}
	};
	
}();
