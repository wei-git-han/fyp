var id = getUrlParam("id");
var pid = getUrlParam("pid");
var type = getUrlParam("type");
var name = getUrlParam("name");
//var dataUrl = {url:'/app/fyp/common/data/dataUrl.json',dataType:'text'};  //页面上返回的数据
var dataUrl = {url:'/app/fyp/usermanagersetting/getLeaveInfo',dataType:'text'};  //页面上返回的数据
var saveurl = {url:'/app/fyp/usermanagersetting/saveLeaveInfo',dataType:'text'};
var delurl = {url:'/app/fyp/usermanagersetting/deleteLeaveInfo',dataType:'text'};

var pageModule = function(){
	
	
	//加载数据
	var initdata = function(){
		$ajax({
			url:dataUrl,
			data:{userId:id},
			success:function(data){
				setformdata(data);
			}
		})
	}
	
	var initother = function(){
		
		$("#name").html(name);
		$(".form_datetime").datetimepicker({
		    language:"zh-CN",
		    autoclose: true,
		    isRTL: Metronic.isRTL(),
		    format: "yyyy-mm-dd hh:ii",
		    pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left")
		});
		
		
		$("#commentForm").validate({
		    submitHandler: function() {
				var elementarry = ["startTime","endTime","place","vehicle","lxr","lxdh","reason"];
				var paramdata = getformdata(elementarry);
				paramdata.userName = $("#name").val();
				paramdata.userId = id;
				paramdata.orgId = pid;
				$ajax({
					url:saveurl,
					type: "GET",
					data:paramdata,
					success:function(data){
						if(data.result=="success"){
							newbootbox.alert("保存成功!").done(function(){
								alert(window.parent.jsetDialog.aa);
								window.parent.jsetDialog.pageModule.refreshtree();
								newbootbox.newdialogClose("addqjdDialog");
							}); 
						}else{
							newbootbox.alert("保存失败!"); 
						}
					}
				})
		    },
		    errorPlacement: function(error, element) {  
		    	if($(element).parent().hasClass("date")){
		    		error.appendTo(element.parent().parent());  
		    	}else{
		    		error.appendTo(element.parent());
		    	}
		    }

		});
		
		$("#save").click(function(){
			$("#commentForm").submit();
		})
		
		if(type == 0){//新增
			$("#del").hide();
		}else{ //查看
			$("#del").show();
			$("input,textarea,.form_datetime button").attr("disabled","disabled");
			initdata();
		}
		
		$("#del").click(function(){
			$ajax({
				url:delurl,
				success:function(data){
					if(data.result=="success"){
						newbootbox.alert("删除成功!").done(function(){
							window.parent.jsetDialog.pageModule.refreshtree();
							newbootbox.newdialogClose("addqjdDialog");
						});
					}
				}
			})
		});
		//点击取消关闭弹出框
		$("#close").click(function(){
			newbootbox.newdialogClose("addqjdDialog");
		});
		
	}
  

    return{
        //加载页面处理程序
        initControl:function(){
            initother();
        }
    };

}();
