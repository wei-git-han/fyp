var id = getUrlParam2("id");
var role = getUrlParam2("role");
var time = getUrlParam2("time");
var content = getUrlParam2("content");
var state = getUrlParam2("state");
var type = getUrlParam2("type");//1局内未转办提醒设置，2为承办或为反馈设置，3催填提醒设置
var saveUrl = {"url":"/remindadministration/save","dataType":"text"};  //保存
var editUrl = {"url":"/remindadministration/update","dataType":"text"};  //修改
var editInfo = {"url":"/remindadministration/info","dataType":"text"}; //编辑数据

var pageModule = function(){
	var initdatafn = function(){
		console.log(type)
		if(type == 3){
			$("#showFlag").show()
		}
		if(id!="" && !!id){
//			$("#remindRole").attr("disabled",true);
			$ajax({
				url:editInfo,
				data:{id:id},
				success:function(data){
					setformdata(data.remindAdministration);
				}
			})
//			setformdata({
//				remindRole : role,
//				remindTime : time,
//				remindContent : content
//			});
		}else{
			setformdata({remindTime:"09:00"});
			$("#remindRole").val("承办人");
		}

	}
	var initother = function(){
		$("#quxiao").click(function(){
			newbootbox.newdialogClose("addDialog");
		});
		$("#save").click(function(){
			if(type == 3&&($("#remindTime").val() == ""||$("#startTime").val() == ""||$("#endTime").val() == "")){
				newbootbox.alertInfo("请填写提醒时间！");
				return
			}
			var remindRole = $("#remindRole").val();
			var remindTime = $("#remindTime").val()?$("#remindTime").val():"09:00";
			var remindContent = $("#remindContent").val();
			var state = $("#state").val();
			var obj = {};
			if(type == 3){
				obj = {
						id:id,
						remindRole:remindRole,
						remindTime:remindTime,
						remindContent:remindContent?remindContent:"请尽快填写本轮办理反馈",
						type:type,
						state:state?state:"false",
						startTime:$("#startTime").val(),
						endTime:$("#endTime").val()
					}
			}else{
				obj = {
					id:id,
					remindRole:remindRole,
					remindTime:remindTime,
					remindContent:remindContent?remindContent:"请尽快填写本轮办理反馈",
					type:type,
					state:state?state:"false"
				}
			}
			$ajax({
				url:id?editUrl:saveUrl,
				data:obj,
				type: "GET",
				success:function(data){
					newbootbox.newdialogClose("addDialog");
					if(data.msg == "success") {
						newbootbox.alertInfo('保存成功！').done(function(){
							window.top.iframe1.window.iframe100.window.pageModule.initgridright();
						});
					}else{
						newbootbox.alertInfo("保存失败！");
					}
				}
			});
		})
	}
	return{
		//加载页面处理程序
		initControl:function(){
			initdatafn();
			initother();
		}
	};
}();
