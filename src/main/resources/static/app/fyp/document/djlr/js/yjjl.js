var showCurrIdeaRecordUrl = {"url":"/app/db/addXbDeal/showCurrIdeaRecord","dataType":"text"}; //意见记录
var userTree = {"url":"/app/base/user/treePart","dataType":"text"}; //人员选择树不显示承办人
//var showIdeaRecordUrl = {"url":"/app/db/addXbDeal/showIdeaRecord","dataType":"text"}; //意见记录
var addOrDeleteXbPersonUrl = {"url":"/app/db/addXbDeal/addOrDeleteXbPerson","dataType":"text"}; //添加或者删除协办人
var commitIdeaUrl={"url":"/app/db/addXbDeal/commitIdea","dataType":"text"}; //发送意见url
var addOrEditXbPersonUrl={"url":"/app/db/addXbDeal/addOrEditXbPerson","dataType":"text"}; //发送意见url
var documentId=getUrlParam("documentId");//办件id
var infoId=getUrlParam("infoId")||""; //主文件id
var subId=getUrlParam("subId")||""; //文件来源
var teamId=getUrlParam("teamId");//
var ideaGroupId=getUrlParam("ideaGroupId");//
var fileFrom=getUrlParam("fileFrom")||""; //文件来源
var opinionFlag=getUrlParam("opinionFlag")||""; //判断是从哪里进入的，talbe || 详情页 ,table页面进入需要请求后台方法
var xbrIds ="";
var pageModule = function(){
	//编辑返回的树id
	var returnTreeIds  = function(){
		if(subId!=""){
			$ajax({
				url: addOrEditXbPersonUrl,
				data:{subId:subId},
				success:function(data){
					xbrIds=data.success;
				}
			});
		}
	}
	//意见记录
	var initList = function(){
		$ajax({
			url:showCurrIdeaRecordUrl,
 			data:{subId:subId,teamId:teamId,ideaGroupId:ideaGroupId},
			success:function(data){
				var html1= "";
				var xbUser = [];
				var cbUser = [];
				xbUser = data.xieban;
				cbUser = data.chenban;
				$("#xieBanPersons").attr('title',xbUser);
				datas = data.docXbIdeas;
				if(data.result == ''){
					$(".xbUserLine > span").hide();
					$("#textarea").hide();
					$("#addbg").addClass("addbg");
				}else if(cbUser == ''){
                    $(".xbUserLine > span").hide();
                    $("#textarea").hide();
                    $("#addbg").addClass("addbg");
				}else{
					$.each(datas,function(i,item){
						var createdTime = item.createdTime;
						var cbrList = item.cbrList;
						html1=	'<div class="timelinesheys">'+
						'	<div class="timeline-icon">'+
						'		<i class="icontime"></i>'+
						'	</div>'+
						'	<div class="timeline-user">'+
						'		<span class="createTime">'+createdTime+'</span>'+
						'	</div>'+
						'	<div class="timeline-body">';
	//						$.each(cbrList,function(i,item){
						html1 += '<div class="timeline-content">'+
						'	<div class="userName"><i class="fa fa-user"></i>&nbsp;'+item.userName+'</div>';
						html1 += '	<div class="content">'+item.feedBackIdea+'</div>';
						html1 += '</div>';
	//						})
						
						html1 +='	</div>'+
						'</div>'
						$(".timelinesview").append(html1);
					})
					$("#xbUser").html(xbUser.toString());
					$("#cbUser").html(cbUser.toString());
				}
			}
		})
	}
	
	
	
	var initother = function(){
		$("#showInfo").click(function(){
			$('#timeLineTab').hide()
			$('#infoTab').show()
		});
		
		$('#nameArea').hide();
		
		//关闭
		$("#close").click(function(){
			newbootbox.newdialogClose("yijianDialog");
		});
		
		//提交
		$("#tijiao").click(function(){
			if($("#opinionContent").val() == ''){
				newbootbox.alert("请输入意见！");
			}else{
				$ajax({
					url:commitIdeaUrl,
					data:{infoId:infoId,subId:subId,feedBackIdea:$("#opinionContent").val()},
					type: "GET",
					success:function(data){
						if(data.result == "success"){
							newbootbox.alert("发送成功！").done(function(){
								pageModule.takeMenufn()
							});
						}else{
							newbootbox.alert("发送失败！").done(function(){
								pageModule.takeMenufn()
							});
						}
					}
				});
				newbootbox.newdialogClose("yijianDialog");
			}
		});
		
		//清屏
		$("#qp").click(function(){
			$("#opinionContent").val("");
		});
		$('#canOrg').click(function(){
			$('#timeLineTab').show()
			$('#infoTab').hide()
		})
		$('#sureOrg').click(function(){
			var node = $("#orgTree").jstree("get_bottom_selected",true);//获取选中人员
			var userIds = [];
			$.each(node,function(i,v){
                if(v.type==1){
                    userIds.push(v.id)
                }
			})
			$.ajax({
	 			url:addOrDeleteXbPersonUrl.url,
	 			data:{userIds:userIds.toString(),subId:subId,infoId:infoId},
	 			success:function(data){
	 				newbootbox.newdialogClose("yijianDialog");
	 				if(data.result  == "success"){
	 					newbootbox.alert('协办人保存成功！').done(function(){
	 						window.top.iframe1.pageModule.reload();
	 					});
	 				}else{
	 					newbootbox.alert('协办人保存失败！');			
	 				}
//	 				$("input[name=users]").click(function(){
//	 					window.top.iframe1.window.pageModule.getUserData($(this).attr("personName"),$(this).attr("data"));
//	 					newbootbox.newdialogClose("chooseszDialog");
//	 				})
	 				
	 			}
	 		});
//			$('#timeLineTab').show()
//			$('#infoTab').hide()
		})
	}
	var initOrgTree = function() {
		$ajax({
			url : userTree,
			success : function(data) {
				$("#orgTree").jstree({
					"plugins" : [ "wholerow", "types", "checkbox" ],
					"checkbox" : {
						"keep_selected_style" : false
					},
					"core" : {
						"themes" : {
							"responsive" : false
						},
						"data" : data,
					},
					"types" : {
						"default" : {
					        "icon" : "peoples_img"
					    },
					    "file" : {
					        "icon" : "peoples_img"
					    },
					    "1" : {
					        "icon" : "people_img"
					    }
					}
				});
				$("#orgTree").on("load_node.jstree", function(e,data) {
					/*if(xbrIds != ""){
						for(var i=0;i<xbrIds.length;i++){
							$("#orgTree").jstree("select_node",xbrIds[i],true);
						}
					}else{
						$("#orgTree").jstree("select_node","",true);
					}*/
					if(xbrIds!=""){
						var deptArrs = [];
						deptArrs = xbrIds.split(",");
						for(var i=0;i<deptArrs.length;i++){
							$("#orgTree").jstree("select_node",deptArrs[i],true);
						}
					};
				});
			}
		})
	}
	
	return{
		//加载页面处理程序
		initControl:function(){
			returnTreeIds();
			initList();
			initother();
			initOrgTree()
		}
	};
	
}();

