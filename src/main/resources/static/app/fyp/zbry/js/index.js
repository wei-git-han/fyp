var ComUserList = {"url":"/documentcontact/list","dataType":"text"};
var AllUserList = {"url":"/app/base/user/tree","dataType":"text"};
var saveUrl = {"url":"/documentcontact/save","dataType":"json"};

var checkArry=[];
var pageModule = function(){
	var initAllUser = function(){
		$ajax({
			url:AllUserList,
			async:false,
			success:function(data){
				$("#tree_2").jstree("destroy");
				$("#tree_2").jstree({
				    "plugins": ["wholerow", "types" ,"checkbox" ],
				    "core": {
				    	"themes" : {
					        "responsive": false
					    },    
					    "data": data,
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
				$("#tree_2").on("load_node.jstree", function(e,data) {
					for(var i=0;i<checkArry.length;i++){
						$("#tree_2").jstree("select_node",checkArry[i],true);
					}
					if(checkArry.length>0){
						toRight()
					}
				});
				$("#tree_2").on("select_node.jstree", function(e,data) {
					var nodes2 = $("#tree_2").jstree("get_bottom_selected",true);
					ifShowToRight(nodes2);
				});
				$("#tree_2").on("deselect_node.jstree", function(e,data) {
					var nodes2 = $("#tree_2").jstree("get_bottom_selected",true);
					ifShowToRight(nodes2);
				});
			}
		})
	}
	
	var initComUser = function(){
		$ajax({
			url:ComUserList,
			type: "GET",
			async:false,
			success:function(data){
				if(data!=null){
					$("#alreadyUser").html("");
					loadUser(data);
				}
			}
		});
	}
	
	var initOther = function(){
		$("#save").click(function(){
			var idArry = [];
			var nameArry = [];
			console.log(nameArry);
			$("#alreadyUser li").each(function(i,item){
				idArry.push($(this).attr("id"));
				nameArry.push($(this).attr("name"));
			})
			console.log(nameArry);
			$ajax({
				url:saveUrl,
				data:{idArr:idArry.toString(),nameArr:nameArry.toString()},
				type: "post",
				success:function(data){
					if(data.result == "success"){
						newbootbox.alertInfo('保存成功！');
					}else{
						newbootbox.alertInfo('保存失败！');
					}
				}
			});
		});
		
		$("#quit").click(function(){
			$("#alreadyUser").html("");
			checkArry=[];
			initAllUser();
		});
	}

	return{
		//加载页面处理程序
		initControl:function(){
			initComUser();
			initAllUser();
			initOther();
		}
	};
	
}();
var rightList = []
function AddUser(nodes2){
	rightList = []
	$.each(nodes2, function(i,obj) {
		if(obj.original.type == 1){
			$("#alreadyUser").append(
				'<li id='+obj.id+' name='+obj.text+'>'+
				'	<a href="javascript:;">'+
				'		<span>'+obj.text+'</span>'+
				'		<span style="float:right" class="do-icon">'+
				'			<i class="del" onclick="deletefn(\''+obj.id+'\',this);"><img src="../../../../common/images/shanchu.svg" alt=""></i>'+
				'			<i class="up" onclick="upfn(this);"><img src="../../../../common/images/shang01.svg" alt=""></i>'+
				'			<i class="down" onclick="downfn(this)"><img src="../../../../common/images/xia01.svg" alt=""></i>'+
				'		</span>'+
				'	</a>'+
				'</li>'
			);
			rightList.push(obj.id)
		}
	});
	if(rightList.length>0){
		$('.toLeft').removeClass('defaultIcon');
		$('.toLeft').addClass('activeIcon')
	}else{
		$('.toLeft').removeClass('activeIcon');
		$('.toLeft').addClass('defaultIcon')
	}
	console.log($("#alreadyUser").html());
	iShow();
}

function toLeft(){
	$("#tree_2").jstree('uncheck_all')
	for(var i=0;i<rightList.length;i++){
		$("#tree_2").jstree("select_node",rightList[i],true);
	}
}
function toRight() {
	$("#alreadyUser").html("");
	var nodes2 = $("#tree_2").jstree("get_bottom_selected",true);
	AddUser(nodes2);
}
function loadUser(nodes2){
	$.each(nodes2, function(i,obj) {
		checkArry.push(obj.contacterId);
	});
}

function ifShowToRight(data) {
	var list = []
	$.each(data, function(i,obj) {
		if(obj.original.type == 1){
			list.push(obj.id)
		}
	});
	if(list.length>0){
		$('.toRight').removeClass('defaultIcon');
		$('.toRight').addClass('activeIcon')
	}else{
		$('.toRight').removeClass('activeIcon');
		$('.toRight').addClass('defaultIcon')
	}
}
function iShow(){
	$("#alreadyUser li").each(function(i,item){
		if(i==0){
			$(this).find(".up").hide();
		};
		if(i==$("#alreadyUser li").length-1){
			$(this).find(".down").hide();
		};
	})
}

function deletefn(id,obj){
	// $(obj).parents("li").remove();
	// $("#tree_2").jstree().uncheck_node(id);
	rightList.remove(id);
	$('#alreadyUser '+'#'+id).remove()
	if(rightList.length>0){
		$('.toLeft').removeClass('defaultIcon');
		$('.toLeft').addClass('activeIcon')
	}else{
		$('.toLeft').removeClass('activeIcon');
		$('.toLeft').addClass('defaultIcon')
	}
	iShow()
}

function upfn(obj){
	var currentId = $(obj).parents("li").attr("id");
	var prevId = $(obj).parents("li").prev().attr("id");
	var currentText = $(obj).parent().prev().text();
	var prevText = $(obj).parents("li").prev().find("span:eq(0)").text();
	$(obj).parent().prev().text(prevText);
	$(obj).parents("li").attr("id",prevId);
	$(obj).parents("li").attr("name",prevText);
	$(obj).parents("li").prev().find("span:eq(0)").text(currentText);
	$(obj).parents("li").prev().attr("id",currentId);
	$(obj).parents("li").prev().attr("name",currentText);
	iShow();
}
function downfn(obj){
	var currentId = $(obj).parents("li").attr("id");
	var nextId = $(obj).parents("li").next().attr("id");
	var currentText = $(obj).parent().prev().text();
	var nextText = $(obj).parents("li").next().find("span:eq(0)").text();
	$(obj).parent().prev().text(nextText);
	$(obj).parents("li").attr("id",nextId);
	$(obj).parents("li").attr("name",nextText);
	$(obj).parents("li").next().find("span:eq(0)").text(currentText);
	$(obj).parents("li").next().attr("id",currentId);
	$(obj).parents("li").next().attr("name",currentText);
	iShow();
}
