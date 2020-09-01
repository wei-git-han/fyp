var saveUrl;
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树---待测试（调用方法暂时被注释）
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //人员树---待测试
var returnDataUrl = {"url":"http://127.0.0.1:11208/fyp/roleedit/info","dataType":"text"}; //返回数据url
var dataId=getUrlParam("id")||"";//编辑数据id
if(!!dataId){
	saveUrl = {"url":"http://127.0.0.1:11208/fyp/roleedit/save","dataType":"text"};  //save
}else{
	saveUrl = {"url":"http://127.0.0.1:11208/fyp/roleedit/update","dataType":"text"};  //edit
}
var pageModule = function(){
	//树
	var initUnitTree = function(){
		//单位
		$("#deptName").createSelecttree({
			url :deptTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#deptName").val(data.node.text);
				$("#deptId").val(data.node.id);
			}
		});
		
		//人
		$("#userName").createSelecttree({
			url :userTreeUrl,
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
				setformdata(data);
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
			    var elementarry = ["userId","userName","deptId","deptName","roleType","editUserId","editUserName","editTime"];
				var paramdata = getformdata(elementarry);
				paramdata.id = id;
				$ajax({
					url:saveUrl,
					data:paramdata,
					type:'post',
					success:function(data){
						if(data.result=="success"){
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
			removeInputData(["userId","userName","deptId","deptName","roleType","editUserId","editUserName","editTime"]);
		});
		
		//取消
		$("#close").click(function(){
			newbootbox.newdialogClose("addModal");
		});
	}

	return{
		//加载页面处理程序
		initControl:function(){
			//initUnitTree();
			initdatafn(); 
			initother();
		}
	};
}();



