//var people_tree = {url:'/app/fyp/common/data/people_tree.json',dataType:'text'};  //树
//var jz_tree_whoUrl = {url:'/app/fyp/common/data/people_tree2.json',dataType:'text'};  //树
//var qjd_tree = {url:'/app/fyp/common/data/qjd_tree.json',dataType:'text'};  //树

var jz_tree = {url:'/app/base/user/allTree',dataType:'text'};  //树
var jz_tree_whoUrl = {url:'/app/fyp/usermanagersetting/jjusertreeRange',dataType:'text'};  //树
var select0 = {url:'/app/fyp/usermanagersetting/getUserViewRangeList',dataType:'text'};
var fanweiurl = {url:'/reignuser/changeVisual',dataType:'text'};
var notUserUrl = {"url":'/reignuser/getAllNotVisualUser'}
var hasArray = [];
var pageModule = function(){
	var getNoUser = function () {
		$ajax({
			url:notUserUrl,
			async:false,
			success:function (data) {
				if(data){
					if(data.data){
						hasArray = data.data||[]
					}
				}
			}
		})
	}
	//局长
	var initJztree = function() {
		$ajax({
			url:jz_tree,
			success:function(data){
				var array1 = [];
				array1.push(data);
				data = array1;
				$("#jz_tree").jstree({
				    "plugins": ["wholerow", "types","checkbox"],
				    "core": {
				    "themes" : {
				        "responsive": false
				    },
				    "data": data,
				    },
				    "types" : {
				    	"default" : {
					        "icon" : "fa faimg fa-folder"
					    },
					    "0" : {
					        "icon" : "fa faimg fa-folder"
					    },
					    "1" : {
					    	"icon" : "fa faimg fa-user"
					    }
				    }
				});
				$("#jz_tree").on("ready.jstree", function(e,o) {
					$("#jz_tree").jstree("open_all");
				});
				$("#jz_tree").on("load_node.jstree", function(e,data) {
					for(var i=0;i<hasArray.length;i++){
						$("#jz_tree").jstree("select_node",hasArray[i],true);
					}
				});
				$("#jz_tree").on("select_node.jstree", function(e,data) {
					// var node = data.node;
					// var id = node.id;
					// $ajax({
					// 	url:select0,
					// 	data:{userId:id},
					// 	success:function(data){
					// 		$("#jz_tree_who").jstree("deselect_all");
					// 		$.each(data,function(){
					// 			$('#jz_tree_who').jstree().select_node(this);
					// 		});
					// 	}
					// })
				});

			}
		})
	}

	//选择首长可见谁的状态
	var initJzWhotree = function() {
		$ajax({
			url:jz_tree_whoUrl,
			success:function(data){
				var array1 = [];
				array1.push(data);
				data = array1;
				$("#jz_tree_who").jstree({
				    "plugins": ["wholerow", "types","checkbox"],
				    "core": {
				    "themes" : {
				        "responsive": false
				    },
				    "data": data,
				    },
				    "types" : {
				    	"default" : {
					        "icon" : "fa faimg fa-folder"
					    },
					    "0" : {
					        "icon" : "fa faimg fa-folder"
					    },
					    "1" : {
					    	"icon" : "fa faimg fa-user"
					    }
				    }
				});

				$("#jz_tree_who").on("ready.jstree", function(e,o) {
					$("#jz_tree_who").jstree("open_all");
				});
			}
		})
	}

	//局领导
	// var initJleadertree = function() {
	// 	$ajax({
	// 		url:qjd_tree,
	// 		success:function(data){
	// 			var array1 = [];
	// 			array1.push(data);
	// 			data = array1;
	// 			$("#jleader_tree").jstree({
	// 			    "plugins": ["wholerow", "types"],
	// 			    "core": {
	// 			    "themes" : {
	// 			        "responsive": false
	// 			    },
	// 			    "data": data,
	// 			    },
	// 			    "types" : {
	// 			    	"default" : {
	// 				        "icon" : "fa faimg fa-folder"
	// 				    },
	// 				    "0" : {
	// 				        "icon" : "fa faimg fa-folder"
	// 				    },
	// 				    "1" : {
	// 				    	"icon" : "fa faimg fa-user"
	// 				    }
	// 			    }
	// 			});
	//
	// 			$("#jleader_tree").on("ready.jstree", function(e,o) {
	// 				$("#jleader_tree").jstree("open_all");
	// 			});
	// 			$("#jleader_tree").on("load_node.jstree", function(e,o) {
	// 				$(".positionCss").live("click",function(){
	// 					//alert($(this).attr("data"));
	// 					var id = $(this).parent().parent().attr("id");
	// 					var name = (($(this).parent().text()).split("("))[0];
	// 					//window.location.href="/app/fyp/qjd.html?id="+id;
	// 					newbootbox.newdialog({
	// 						id:"addqjdDialog",
	// 						width:825,
	// 						height:520,
	// 						header:true,
	// 						headerStyle:{
	// 							"background":"#428bca"
	// 						},
	// 						title:"创建请假单",
	// 						style:{
	// 							"padding":"0px"
	// 						},
	// 						url:"/app/fyp/creatqjd.html?type=1&id="+id+"&name="+name
	// 					})
	// 				});
	// 			});
	// 		}
	// 	})
	// }

	var initother = function(){

		// $ajax({
		// 	url:getuser,
		// 	success:function(data){
		// 		var username = data.userName;
		// 		var userType = data.userType;
		// 		$("#username").html(username);
		// 		if(userType==1){
		// 			$("#gangwei").html("部管理员")
		// 		}else if(userType==2){
		// 			$("#gangwei").html("局管理员")
		// 		}
		// 	}
		//
		// })

		//点击确定关闭弹出框
		$("#close").click(function(){
			newbootbox.newdialogClose("jsetDialog");
		});
		// $("#closeqjd").click(function(){
		// 	newbootbox.newdialogClose("jsetDialog");
		// });
		//
		// //创建请假单
		// $("#addqjd").click(function(){
		//
		// 	var userIdArray = [];
		// 	var orgIdArray=[];
		//
		// 	var array1 = $("#jleader_tree").jstree("get_bottom_selected",true);
		// 	$.each(array1,function(){
		// 		var type = this.type;
		// 		if(type==1){
		// 			userIdArray.push({id:this.id,name:this.text});
		// 			orgIdArray.push(this.parent);
		// 		}
		// 	});
		//
		// 	if(userIdArray.length==0){
		// 		newbootbox.alert("请选择局领导!");
		// 		return;
		// 	};
		//
		// 	var id = userIdArray[0].id;
		// 	var name = userIdArray[0].name;
		// 	var pid = orgIdArray[0];
		// 	newbootbox.newdialog({
		// 		id:"addqjdDialog",
		// 		width:825,
		// 		height:600,
		// 		header:true,
		// 		headerStyle:{
		// 			"background":"#428bca"
		// 		},
		// 		title:"创建请假单",
		// 		style:{
		// 			"padding":"0px"
		// 		},
		// 		url:"/app/fyp/creatqjd.html?type=0&id="+id+"&name="+name+"&pid="+pid
		// 	})
		// });


		// $(".leftUl li").click(function(){
		// 	$(this).siblings().removeClass("active");
		// 	$(this).addClass("active");
		// 	$(".choose").removeClass("activeMain");
		// 	if($(this).hasClass("peopleli")){
		// 		$(".people").addClass("activeMain");
		// 	}else if($(this).hasClass("jzli")){
		// 		$(".jz").addClass("activeMain");
		// 		initJztree();//局长
		// 		initJzWhotree();//选择局长可见谁的状态
		// 	}else{
		// 		$(".createqjd").addClass("activeMain");
		// 		initJleadertree();//局领导
		// 	}
		// });


		// $("#setj").click(function(){
		// 	var userIdArray = [];
		// 	var orgIdArray=[];
		// 	var array1 = $("#people_tree").jstree("get_bottom_selected",true);
		// 	$.each(array1,function(){
		// 		var type = this.type;
		// 		if(type==1){
		// 			userIdArray.push(this.id);
		// 			orgIdArray.push(this.parent);
		// 		}
		// 	});
		// 	if(userIdArray.length==0){
		// 		newbootbox.alert("请选择人员!");
		// 		return;
		// 	};
		//
		// 	$ajax({
		// 		url:seturl,
		// 		data:{userType:"2",userIds:userIdArray.join(","),orgIds:orgIdArray.join(",")},
		// 		success:function(data){
		// 			if(data.result=="success"){
		// 				newbootbox.alert("设置成功!").done(function(){
		// 					$('#people_tree').jstree('destroy');
		// 					initPeopletree();
		// 				})
		// 			}
		// 		}
		// 	})
		// });
		// $("#setno").click(function(){
		// 	var userIdArray = [];
		// 	var orgIdArray=[];
		// 	var array1 = $("#people_tree").jstree("get_bottom_selected",true);
		// 	$.each(array1,function(){
		// 		var type = this.type;
		// 		if(type==1){
		// 			userIdArray.push(this.id);
		// 			orgIdArray.push(this.parent);
		// 		}
		// 	});
		// 	if(userIdArray.length==0){
		// 		newbootbox.alert("请选择人员!");
		// 		return;
		// 	};
		// 	$ajax({
		// 		url:seturl,
		// 		data:{userType:"0",userIds:userIdArray.join(","),orgIds:orgIdArray.join(",")},
		// 		success:function(data){
		// 			if(data.result=="success"){
		// 				newbootbox.alert("设置成功!").done(function(){
		// 					$('#people_tree').jstree('destroy');
		// 					initPeopletree();
		// 				})
		// 			}
		// 		}
		// 	})
		// });
		$("#save").click(function(){
			var userIdArray = [];
			var orgIdArray=[];
			var array1 = $("#jz_tree").jstree("get_bottom_selected",true);
			$.each(array1,function(){
				var type = this.type;
				if(type==1){
					userIdArray.push(this.id);
					orgIdArray.push(this.parent);
				}
			});
//			if(userIdArray.length==0){
//				newbootbox.alert("请选择人员!");
//				return;
//			};

			// var userIdArray1 = [];
			// var orgIdArray1=[];
			// var array2 = $("#jz_tree_who").jstree("get_bottom_selected",true);
			// $.each(array2,function(){
			// 	var type = this.type;
			// 	if(type==1){
			// 		userIdArray1.push(this.id);
			// 		orgIdArray1.push(this.parent);
			// 	}
			// });
			// if(userIdArray1.length==0){
			// 	newbootbox.alert("请选择可见领导!");
			// 	return;
			// };

			$ajax({
				url:fanweiurl,
				data:{
						//leaderId:userIdArray.join(","),orgIdArray:orgIdArray.join(","),
						//userIds:userIdArray1.join(","),orgIdArray1:orgIdArray1.join(",")
						userIds:userIdArray.join(",")
				},
				success:function(data){
					if(data.msg=="success"){
						newbootbox.alert("设置成功!").done(function(){
							window.top.start_page5.pageModule.refreshPage()
						})
					}
				}

			})

		})
	}


    return{
        //加载页面处理程序
        initControl:function(){
        	// initPeopletree();//人员
            initother();
            getNoUser();
			initJztree()
			// initJzWhotree();//选择局长可见谁的状态
        },
		refreshtree:function(){
        	// $('#jleader_tree').jstree('destroy');
        	// initJleadertree();
			getNoUser()
			initJztree()
        }
    };

}();

