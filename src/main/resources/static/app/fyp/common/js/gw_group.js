var memoryInfoUrl = {"url":rootPath +"/documentFolderMemory/getMemory","dataType":"text"}//原移动的路径
var saveMemoryUrl = {"url":rootPath +"/documentFolderMemory/save","dataType":"text"}//原移动的路径
var folderMemory = "0";//标识文件组展开与否，默认为关闭
//左侧公文组
var initmenu = function(checkedobj){
	$ajax({
		url:folderList,
		async:true,
		data:{searchType:searchType},
		success:function(data){
			leftfn(data,$("#FolderTree"),0,checkedobj);
		}
	});
}

var leftfn = function(data,ho,n,checkedobj){
	ho.html("");
	$.each(data,function(i){
		var obj = data[i];
		var child = obj.child;
		var arrow = '';//文件夹图标
		var jt = '';  //文件夹箭头，如果有子文件则出现箭头
		var submenu = '';
		if($.trim(obj.href)==""){
			obj.href="javascript:;";
		}
		
		var ifactive ="";
		var ifshow = "display:none;";
		var ifshowicon = "fa-caret-right";
		if(!!checkedobj){
			var cId = checkedobj.cId;
			var openIds = checkedobj.openids;
			if(!!cId){
				if(cId==obj.id){
					ifactive = "active";
				}
			}
			if(!!openIds){
				if(openIds.indexOf(obj.id)!=-1){
					ifshow = "display:block;";
					ifshowicon = "fa-caret-down";
				}
			}
		}
		
		arrow = '<span class="FolderTree_span"><i class="fa fa-folder wjj"></i></span>';
		
		if(typeof(child)!="undefined"&&null!=child&&""!=child&&child.length>0){
			jt = '<i class="fa jtclass '+ifshowicon+'" style="float: left;line-height: 34px;"></i>';
			submenu = '<ul class="FolderTree_ul ul_'+n+"_"+i+'" style="'+ifshow+'"></ul>';
		}
		
		
		var aa;
		ho.append(
				'<li class="FolderTree_li">'+
				'	<a class="FolderTree_a '+ifactive+'" id="'+obj.id+'" dataid="'+obj.id+'" dataname="'+obj.folderName+'" style="padding-left:'+(n*15)+'px">'+
				jt+arrow+
				'		<span class="title" title="'+obj.folderName+'">'+obj.folderName+'</span><span class="filenum">('+obj.fileNum+')</span>'+
				'	</a>'+
				'	'+submenu+
				'</li>'	
		);
		if(typeof(child)!="undefined"&&null!=child&&""!=child&&child.length>0){
			leftfn(child,$('.ul_'+n+"_"+i),n+1,checkedobj);
		}
	});
}


var initmemory=function(){
	$ajax({
		url:memoryInfoUrl,
		data:{menuFlag:searchType},
		type: "GET",
		success:function(data){
			if(data.floderMemory=="1"){
				$("#suo").find("i").addClass("fa-chevron-left");
				$("#right_content").css("left","260px");
				$("#suo").parent().css("left","250px");
				$("#left_menu").show();
			}else{
				$("#suo").find("i").addClass("fa-chevron-right");
				$("#left_menu").hide();
				$("#suo").parent().css("left","0px");
				$("#right_content").css("left","20px");
			}
			pageModule.initgrid();
		}
	});
}

//公文组点击事件
var clickGroupfn = function(){
	$("#addtree").click(function(){
		var parentname;
		var parentid;
		if($("#FolderTree .active").find(".title").html() == "默认文件夹"){
			newbootbox.alertInfo('默认文件夹不允许新增！');
		}else if($("#FolderTree li a").hasClass("active")){
			parentname = $(".active").attr("dataname");
			parentid =  $(".active").attr("dataid");
			newbootbox.newdialog({
				id:"addFolder",
				width:500,
				height:280,
				header:true,
				title:"新增文件夹",
				url:"/app/gwcl/document/gwqc/html/tree_add.html?id="+parentid+"&parentname="+encodeURI(parentname)+"&searchType="+searchType
			})
		}else{
			newbootbox.newdialog({
				id:"addFolder",
				width:500,
				height:280,
				header:true,
				title:"新增文件夹",
				url:"/app/gwcl/document/gwqc/html/tree_add.html?id=&parentname=根目录&searchType="+searchType
			})
		}
	});
	
	$("#edittree").click(function(){
		var name = $(".FolderTree_a.active").attr("dataname");
		if($(".FolderTree_a.active").length==0){
			newbootbox.alertInfo('请选择文件夹进行编辑！');
		}else if(name == "默认文件夹"){
			newbootbox.alertInfo('默认文件夹不允许编辑！');
		}else{
			var id =  $(".FolderTree_a.active").attr("dataid");
			newbootbox.newdialog({
				id:"editFolder",
				width:500,
				height:280,
				header:true,
				title:"编辑文件夹",
				url:"/app/gwcl/document/gwqc/html/tree_edit.html?id="+id+"&name="+encodeURI(name)
			})
		}
	});
	
	$("#deltree").click(function(){
		var name = $(".FolderTree_a.active").attr("dataname");
		if($(".FolderTree_a.active").length==0){
			newbootbox.alertInfo('请选择文件夹进行删除！');
		}else if(name == "默认文件夹"){
			newbootbox.alertInfo('默认文件夹不允许删除！');
		}else{
			var filenum = $(".FolderTree_a.active").find(".filenum").text().replace("(","").replace(")","");
			if(filenum>0){
				newbootbox.alertInfo("文件夹包含文件，请将文件移除后尝试再删除！");
			}else{
				var folderId =  $(".FolderTree_a.active").attr("dataid");
				newbootbox.confirm({
				    title: "提示",
				    message: "是否要进行删除操作？",
				    callback1:function(){
						$.ajax({
							url:rootPath +"/folder/delete",
							data:{id:folderId},
							type: "GET",
							success:function(data){
								FolderTreeId="";
								refreshgrid();
								pageModule.refreshmenu();
								$(".searchallcon").addClass("active");
							}
						});	
				    }
				});
			}
		}
	});
	
	$("body").delegate(".FolderTree_a","click",function(){
		FolderTreeId = $(this).attr("dataid");
		window.top.memory.FolderTreeId = FolderTreeId;
		$(".FolderTree_a").removeClass("active");
		$(".searchallcon").removeClass("active");
		$(this).addClass("active");
		if($(this).next("ul").length!=0){
			if($(this).next("ul").is(":hidden")){
				$(this).next("ul").slideDown(500);
				$(this).next("ul").parents("li").addClass("open");
				$(this).find(".wjj").removeClass("fa-folder").addClass("fa-folder-open");
				$(this).find(".jtclass").removeClass("fa-caret-right").addClass("fa-caret-down");
			}else{
				$(this).next("ul").slideUp(500);
				$(this).next("ul").parents("li").removeClass("open");
				$(this).find(".wjj").removeClass("fa-folder-open").addClass("fa-folder");
				$(this).find(".jtclass").removeClass("fa-caret-down").addClass("fa-caret-right");
			}
		};
		/*详情页面返回记忆*/
		var openids = [];
		$("li.open>a").each(function(){
			openids.push($(this).attr("dataid"));
		})
		var checkedobj = {
			cId:$("#FolderTree li .active").attr("dataid"),//选中id
			openids:openids.join(",")
		}
		window.top.memory.checkedobject = checkedobj;
		refreshgrid();
	})
	//点击查看全部
	$(".searchallcon").click(function(){
		$(".FolderTree_a").removeClass("active");
		$(this).addClass("active");
		var documentStatus;
		$("input[name='documentStatus']").each(function(){
			if($(this).is(":checked")){
				documentStatus = $(this).val();
			}
		});
		var copyReadStatus="";
		if(searchType=="gwyz"){
			$("input[name='copyReadStatus']").each(function(){
				if($(this).is(":checked")){
					copyReadStatus = $(this).val();
				}
			});
		}
		window.top.memory.FolderTreeId ="";
		FolderTreeId="";
		grid.setparams({FolderTreeId:FolderTreeId,documentStatus:documentStatus,copyReadStatus:copyReadStatus,search:$("#search").val()});
		grid.loadtable();
		if(searchType =="wdbj" || searchType =="pbwj"){
			pageModule.initNum();
		}
		if(searchType =="wdgw" || searchType =="gwlz" || searchType =="wsh"){
			pageModule.numsListfn();
		}
		if(searchType =="csbgt" ){
			pageModule.numsListfn();
		}
	});
	
	//菜单左缩进
	$("#suo").click(function(){
		if($(this).find("i").hasClass("fa-chevron-right")){
			$(this).find("i").removeClass("fa-chevron-right").addClass("fa-chevron-left");
			$("#right_content").css("left","260px");
			$(this).parent().css("left","250px");
			$("#left_menu").show();
			folderMemory="1";
		}else{
			$(this).find("i").removeClass("fa-chevron-left").addClass("fa-chevron-right");
			$("#left_menu").hide();
			$(this).parent().css("left","0px");
			$("#right_content").css("left","20px");
			folderMemory="0";
		}
		$ajax({
			url:saveMemoryUrl,
			data:{folderMemory:folderMemory,menuFlag:searchType},
			type: "GET",
			async:false,
			success:function(data){
			}
		});	
		pageModule.initgrid();
	});
	
}