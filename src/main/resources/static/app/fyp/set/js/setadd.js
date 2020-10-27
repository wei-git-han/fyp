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
		//姓名
		if(!id){
			$("#userName").createcheckboxtree({
				url :userTreeUrl,
				width : '307px',
				success : function(data, treeobj) {
					treeobj.jstree("check_node", $("#userId").val().split(","),true);  //回选
				},
				selectnode : function(e,data,treessname,treessid) {
					var parentId1 ="";
					$.each(treessid,function(i,obj){
						var parentId =$("#userNametree2").jstree("get_node",obj).parent;
						if(parentId1!=""){
							if(parentId1 != parentId){
								newbootbox.alertInfo('只能勾选同一部门下人员！');
								$("#userNametree2").jstree("deselect_node",data.node.id);
							}
						}else{
							parentId1 = parentId;
							$("#userName").val(treessname);
							$("#userId").val(treessid);
							var paretName =  $("#userNametree2").jstree("get_node",parentId).text;  //获取部门id
							$("#deptName").val(paretName);
							$("#deptId").val(parentId);

						}
					});
				},
				deselectnode : function(e,data,treessname,treessid){
					if(treessname==""){
						$("#deptName").val('');
						$("#deptId").val('');
					}
					$("#userName").val(treessname);
					$("#userId").val(treessid);
				}
			});
		}else{
			$('#userName').click(function () {
				newbootbox.alertInfo('编辑情况下，仅允许修改人员角色')
			})
		}
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
		$("#commentForm").validate({
			ignore:'',
		    submitHandler: function() {
				if(saveLoading){
					newbootbox.alert('正在保存中，请稍候！')
					return
				}
				saveLoading = true;
				$("#save").attr('disabled',true)
			    var elementarry = ["userId","userName","deptId","deptName","roleType"];
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



