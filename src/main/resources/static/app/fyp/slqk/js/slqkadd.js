var saveUrl;
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //人员树---待测试
var returnDataUrl = {"url":"/fyp/feedbackhear/info","dataType":"text"}; //返回数据url
var id=getUrlParam("id")||"";//编辑数据id
if(!!id){
	saveUrl = {"url":"/fyp/feedbackhear/update","dataType":"text"};  //edit
}else{
	saveUrl = {"url":"/fyp/feedbackhear/save","dataType":"text"};  //save
}
var pageModule = function(){
	//树
	var initUnitTree = function(){
		//提出人
		$("#submitUserName").createSelecttree({
			url :userTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#submitUserName").val(data.node.text);
				$("#submitUserId").val(data.node.id);
			}
		}); 
	}
	
	var initdatafn = function(){
		$ajax({
			url:returnDataUrl,
			data:{id:id},
			success:function(data){
				setformdata(data.data);
				if(!!data.data.solveTime){
                    $("#solveTime").val((data.data.solveTime).substring(0,10));
                }
			}
		})
	}
	
	var initother = function(){
		$(".date-picker").datepicker({
            language:"zh-CN",
            rtl: Metronic.isRTL(),
            orientation: "",
            autoclose: true
        });
		$(".input-group-btn").click(function(){
			$(this).prev().focus();
		});
		
		$("#commentForm").validate({
			ignore:'',
		    submitHandler: function() {
			    var elementarry = ["name","submitTime","submitUserId","submitUserName","solveTime","march","status","type","desc"];
				var paramdata = getformdata(elementarry);
				paramdata.id = id;
				$ajax({
					url:saveUrl,
					data:paramdata,
					type:'post',
					success:function(data){
						if(data.result=="success"){
						    newbootbox.newdialogClose("addModal");
							newbootbox.alertInfo('保存成功！').done(function(){
								window.top.pageModule.initgrid();
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
	    	 	}if($(element).parent().hasClass("date-picker")){
	    	 		error.appendTo(element.parent().parent()); 
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
			removeInputData(["name","submitTime","submitUserId","submitUserName","solveTime","march","status","type","desc"]);
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
			initdatafn(); 
			initother();
		}
	};
}();



