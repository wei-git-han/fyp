var saveUrl;
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //单位树
var returnDataUrl = {"url":"/fyp/guaranteetacking/info","dataType":"text"}; //返回数据url
var getPhoneUrl = {"url":"/fyp/guaranteetacking/findUserInfoByUserId","dataType":"text"}
var id=getUrlParam("id")||"";//编辑数据id
if(!!id){
	saveUrl = {"url":"/fyp/guaranteetacking/update","dataType":"json"};  //edit
}else{
	saveUrl = {"url":"/fyp/guaranteetacking/save","dataType":"json"};  //save
}
var saveLoading = false
var pageModule = function(){
	//单位树
	var initUnitTree = function(){
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
				initData()
            }
        });

	/*	$("#deptName").createSelecttree({
			url :deptTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#deptName").val(data.node.text);
				$("#deptId").val(data.node.id);
			}
		});*/
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
		$('#source').change(function () {
			initData()
		})
		$("#commentForm").validate({
			ignore:'',
		    submitHandler: function() {
				if(saveLoading){
					newbootbox.alert('正在保存中，请稍候！')
					return
				}
				saveLoading = true
				$("#save").attr('disabled',true)
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
			removeInputData(["userName","userId","deptId","deptName","phone","warrantyTime","source","remark","status","statusTime","measures"]);
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
		},
		refreshPage: function() {
		    initUnitTree();
            initdatafn();
		}
	};
}();

function initData() {
	var userId = $("#userId").val()||'';
	if(!userId){
		return
	}
	$ajax({
		url:getPhoneUrl,
		data:{userid: userId},
		success:function (data) {
			if($('#source').val()=='1'){
				$('#phone').val(data.phone)
			}else{
				$('#phone').val(data.telePhone)
			}
		}
	})
}


