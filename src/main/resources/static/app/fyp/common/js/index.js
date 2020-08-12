var menulist={"url":"/app/db/menu/menuList","dataType":"text"};
var grdbUrl = {"url":"/app/db/subdocinfo/grdbMenuNums","dataType":"text"};
var jndbUrl = {"url":"/app/db/subdocinfo//jndbMenuNums","dataType":"text"};
var blfkUrl = {"url":"/app/db/documentinfo/getDicByTypet","dataType":"text"};
var show = getUrlParam("show")||"";
var pageModule = function(){
	//动态加载菜单
	var initMenuList =function(){
		$ajax({
			url:menulist,
			success:function(data){
				var lis = '';
				if(data.length == 0) {
					window.location.href="error.html";
				}else{
					$.each(data, function(i, item) {
						if(i==0){
							//var str = item.defaultPage.indexOf('?')>-1?"&":"?";
							$("#iframe1").attr("src","/app/db/document/jcdb/html/index.html?menuId=005");
						}
						lis += '<li id="'+item.id+'"><a href="'+item.defaultPage+'" target="iframe1">'+item.menuName;
						if(item.id=='002'){
							lis += '<i class="grdb_num" style="display:none"></i>';
						}else if(item.id=='003'){
							lis += '<i class="jndb_num" style="display:none"></i>';
						}else if(item.id=='004'){
							lis += '<i class="blfk_num" style="display:none"></i>';
						}
						lis +='</a></li>';
					});
					
					$('#menulist').html(lis);  //追加到页面
//					$(".menuli li").eq(0).addClass("active");
					$(".menuli li").click(function(){
						$(this).siblings().removeClass("active");
						$(this).addClass("active");
						window.top.memory = {};
					});
					$('#005').click()
					grdbfn();
					jndbfn();
					blfkfn();
				}
			}
		});
	}

	return{
		//加载页面处理程序
		initControl:function(){
			initMenuList();
		}
	};
	
}();

var showModal = function(obj){
	$("#"+obj).modal("show");
}
var hideModal = function(obj){
	$("#"+obj).modal("hide");
}

//个人待办气泡
function grdbfn(){
	$ajax({
		url:grdbUrl,
		async:false,
		success:function(data){
			if(data.grdbNum > 0 && data.grdbNum != null && data.grdbNum != "" && typeof(data.grdbNum) != undefined){
				$(".grdb_num").show();
				$('.grdb_num').text(data.grdbNum);
			}else{
				$(".grdb_num").hide();
				$('.grdb_num').text("");
			}
		}
	});
}

//局内待办气泡
function jndbfn(){
	$ajax({
		url:jndbUrl,
		success:function(data){
			if(data.jndbNum > 0 && data.jndbNum != null && data.jndbNum != "" && typeof(data.jndbNum) != undefined){
				$(".jndb_num").show();
				$('.jndb_num').text(data.jndbNum);
			}else{
				$(".jndb_num").hide();
				$('.jndb_num').text("");
			}
		}
	});
}

//意见反馈气泡
function blfkfn(){
	$ajax({
		url:blfkUrl,
		data:{menuFlag:true},
		success:function(data){
			if(data.blfkNum > 0 && data.blfkNum != null && data.total != "" && typeof(data.blfkNum) != undefined){
				$(".blfk_num").show();
//				$('.blfk_num').text(data.blfkNum);
				$('.blfk_num').text("");
			}else{
				$(".blfk_num").hide();
				$('.blfk_num').text("");
			}
		}
	});
}
//loading弹出框
function lodaingControl(status){
	$("#qjDialog").modal(status)
}