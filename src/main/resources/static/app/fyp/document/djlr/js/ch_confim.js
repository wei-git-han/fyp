var id = getUrlParam("id");
var chehuiDocUrl = {"url":"/app/db/documentinfo/cheHuiOperation","dataType":"text"};//表格数据撤回
var pageModule = function(){
	var initother = function(){
		//借阅保存
		$("#savech").click(function(){
			if($("#isSure").val()=='撤回'||$("#isSure").val()=='是'){
				$ajax({
					url:chehuiDocUrl,
					data:{id:id},
					type: "GET",
					success:function(data){
						if(data.result=='success'){
							newbootbox.newdialogClose("ch_confim");
							newbootbox.alertInfo('撤回成功！').done(function(){
								window.top.iframe1.pageModule.initgrid();
								window.top.blfkfn();
							});
						}else{
							newbootbox.newdialogClose("ch_confim");
							newbootbox.alertInfo('撤回失败！')
						}
					}
				});
			}else{
				newbootbox.newdialogClose("ch_confim");
				newbootbox.alertInfo('撤回取消！');
			}
			
		});
		
		//关闭
		$("#close").click(function(){
			newbootbox.newdialogClose("ch_confim");
		})
	}
	
	return{
		//加载页面处理程序
		initControl:function(){
			initother();
		}
	};
	
}();


