var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var saveUrl = "";
var flag=getUrlParam("flag")||"";//上午下午区分
var pageModule = function(){
	//单位树
	var initUnitTree = function(){
		$("#deptName").createSelecttree({
			url :deptTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#deptName").val(data.node.text);
				$("#deptId").val(data.node.id);
			}
		});
	}
	
	
	var initother = function(){
		$(".timepicker-24").timepicker({
		    language:"zh-CN",
		    autoclose: true,
		    minuteStep: 5,
		    showSeconds: false,
		    showMeridian: false
		});

		$(".timepicker").parent(".input-group").on("click", ".input-group-btn", function(e){
		    e.preventDefault();
		    $(this).parent(".input-group").find(".timepicker").timepicker("showWidget");
		});
		
		
		$("#commentForm").validate({
			ignore:'',
		    submitHandler: function() {
			    var elementarry = ["currentDate"];
				var paramdata = getformdata(elementarry);
				
				$ajax({
					url:saveUrl,
					data:paramdata,
					type:'post',
					success:function(data){
						if(data.result=="success"){
						    newbootbox.newdialogClose("addModal");
							newbootbox.alertInfo('保存成功！').done(function(){
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
			removeInputData(["currentDate"]);
		});
		
		//取消
		$("#close").click(function(){
			newbootbox.newdialogClose("addModal");
		});
	}

	return{
		//加载页面处理程序
		initControl:function(){
			initUnitTree();
			initother();
		}
	};
}();



