var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var returnDataUrl = {"url":"/app/fyp/workWeekTable/getFypPersonageWorkWeek","dataType":"text"}; //返回数据url

var saveUrl;
var id=getUrlParam("id")||"";//编辑数据id
if(!!id){
	saveUrl = {"url":"/app/fyp/workWeekTable/update","dataType":"text"};  //edit
}else{
	saveUrl = {"url":"/app/fyp/workWeekTable/statementTablesInsert","dataType":"text"};  //save
}


var pageModule = function(){
	//单位树
	var initUnitTree = function(){
		$("#userName").createSelecttree({
			url :deptTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#userName").val(data.node.text);
				$("#userId").val(data.node.id);
			}
		});
	}
	
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
		
		
		$(".date-picker").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true,
			format: "yyyy-mm-dd",
		});
		
		$("#commentForm").validate({
			ignore:'',
		    submitHandler: function() {
			    var elementarry = ["userId","userName","weekTableContent"];
				var paramdata = getformdata(elementarry);
				paramdata.createdTime = $("#createdDate").val()+" "+$("#createdTime").val();
				paramdata.id=id;
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
			removeInputData(["userId","userName","weekTableContent","createdTime"]);
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
			if(!!id){
				initdatafn();
			}
			initother();
		}
	};
}();



