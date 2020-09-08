var returnDataUrl = {"url":"/app/fyp/workWeekTable/getFypPersonageWorkWeek","dataType":"text"}; //返回数据url

var saveUrl;
var id=getUrlParam("id")||"";//编辑数据id
if(!!id){
	saveUrl = {"url":"/app/fyp/workWeekTable/update","dataType":"text"};  //edit
}else{
	saveUrl = {"url":"/app/fyp/workWeekTable/statementTablesInsert","dataType":"text"};  //save
}


var pageModule = function(){
	var initdatafn = function(){
		$ajax({
			url:returnDataUrl,
			data:{id:id},
			success:function(data){
				setformdata(data.data);
			}
		})
	}
	
	var initother = function(){
		$(".form_datetime").datetimepicker({
			language:"zh-CN",
			autoclose: true,
			isRTL: Metronic.isRTL(),
			orientation: "right",
			format: "yyyy-mm-dd hh:ii",
			autoclose: true,
			startDate:new Date()
		});
		
		
		$("#commentForm").validate({
			ignore:'',
		    submitHandler: function() {
			    var elementarry = ["weekTableContent","createdTime"];
				var paramdata = getformdata(elementarry);
				paramdata.id=id;
				$ajax({
					url:saveUrl,
					data:paramdata,
					type:'post',
					success:function(data){
						if(data.result=="success"){
						    newbootbox.newdialogClose("addModal");
							newbootbox.alertInfo('保存成功！').done(function(){
								window.top.frames[name='start_page2'].pageModule.refresh();
							});
						}else{
							newbootbox.alertInfo('保存失败！');
						}
					}
				})
		    },
		    errorPlacement: function(error, element) {
	    	 	if($(element).parent().hasClass("selecttree")){
	    	 		error.appendTo(element.parent().parent().parent()); 
	    	 	}else{
	    	 		error.appendTo(element.parent());  
	    	 	}
		     }
		});
		
		//保存
		$("#save").click(function(){
			$("#commentForm").submit();
		});
		
		//重置
		$("#reset").click(function(){
			removeInputData(["weekTableContent","createdTime"]);
		});
		
		//取消
		$("#close").click(function(){
			newbootbox.newdialogClose("addModal");
		});
	}

	return{
		//加载页面处理程序
		initControl:function(){
			if(!!id){
				initdatafn();
			}
			initother();
		}
	};
}();



