var saveUrl;
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树---待测试（调用方法暂时被注释）
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //人员树---待测试
var returnDataUrl = {"url":"/fyp/roleedit/info","dataType":"text"}; //返回数据url
var id=getUrlParam("id")||"";//编辑数据id
if(!!id){
	saveUrl = {"url":"/fyp/roleedit/update","dataType":"json"};  //edit
}else{
	saveUrl = {"url":"/fyp/roleedit/save","dataType":"json"};  //save
}
var saveLoading = false
var pageModule = function(){
	//树
	var initUnitTree = function(){
		//单位
		/*$("#deptName").createSelecttree({
			url :deptTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#deptName").val(data.node.text);
				$("#deptId").val(data.node.id);
			}
		});
		*/
		//配置人
		$("#editUserName").createUserTree({
			url :userTreeUrl,
			width : '307px',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#editUserName").val(data.node.text);
				$("#editUserId").val(data.node.id);
			}
		});

		//姓名
        $("#userName").createUserTree({
            url :userTreeUrl,
            width : '307px',
            success : function(data, treeobj) {},
            selectnode : function(e, data) {
        		$("#userName").val(data.node.text);
                $("#userId").val(data.node.id);
                var paretId = data.node.parent;
                var paretName =  $("#userNametree2").jstree("get_node",paretId).text;  //获取部门id
                $("#deptName").val(paretName);
				$("#deptId").val(paretId);
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
		$(".form_datetime").datetimepicker({
		    language:"zh-CN",
		    autoclose: true,
		    isRTL: Metronic.isRTL(),
		    format: "yyyy-mm-dd hh:ii",
		    pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left")
		});
		
		$("#commentForm").validate({
			ignore:'',
		    submitHandler: function() {
				if(saveLoading){
					newbootbox.alert('正在保存中，请稍候！')
					return
				}
				saveLoading = true;
				$("#save").attr('disabled',true)
			    var elementarry = ["userId","userName","deptId","deptName","roleType","editUserId","editUserName","editTime"];
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
							saveLoading = false;
							$("#save").attr('disabled',false)
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
			removeInputData(["userId","userName","deptId","deptName","roleType","editUserId","editUserName","editTime"]);
		});*/
		
		//取消
		$("#close").click(function(){
			saveLoading = false;
			$("#save").attr('disabled',false)
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



