var saveUrl;
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //单位树
var returnDataUrl = {"url":"/fyp/guaranteetacking/info","dataType":"text"}; //返回数据url
var id=getUrlParam("id")||"";//编辑数据id
if(!!id){
	saveUrl = {"url":"/fyp/guaranteetacking/update","dataType":"text"};  //edit
}else{
	saveUrl = {"url":"/fyp/guaranteetacking/save","dataType":"text"};  //save
}
var pageModule = function(){
	//单位树
	var initUnitTree = function(){
	    $("#userName").createSelecttree({
            url :userTreeUrl,
            width : '100%',
            success : function(data, treeobj) {},
            selectnode : function(e, data) {
                $("#userName").val(data.node.text);
                $("#userId").val(data.node.id);
            }
        });

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
	
	var initdatafn = function(){
		$ajax({
			url:returnDataUrl,
			data:{id:id},
			success:function(data){
				setformdata(data.data);
				$("#userName").val(data.data.name)
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
			    var elementarry = ["userName","userId","deptId","deptName","phone","warrantyTime","source","remark","status","statusTime","measures"];
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
		/*$("#reset").click(function(){
			removeInputData(["userName","userId","deptId","deptName","phone","warrantyTime","source","remark","status","statusTime","measures"]);
		});*/
		
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



