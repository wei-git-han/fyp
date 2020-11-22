var dbsxUrl = {"url":"/app/fyp/personalTodo/backlogFlowStatisticsHeader","dataType":"text"};
var dbsxUrl2 = {"url":"/app/fyp/personalTodo/getMenu","dataType":"text"};
// wdgw,pbgw,gwyz,lwyj,qxj,dccb,dzyj,jstx
var menuList = ['wdgw','pbgw','gwyz','lwyj','qxj','dccb','dzyj','jstx']
var keyMap = {
	wdgw:{},
	pbgw:{},
	gwyz:{},
	lwyj:{},
	qxj:{},
	dccb:{},
	dzyj:{},
	jstx:{},
}
var menuMap = {
	wdgw:{
		typeName:'审批公文'
	},
	pbgw:{
		typeName:'批办公文'
	},
	gwyz:{
		typeName:'公文阅知'
	},
	lwyj:{
		typeName:'来文阅件'
	}
}
var pageModule = function () {

	var initdbsx = function(){
		var map =
		menuList.forEach(function (e,index) {
			$ajax({
				url: dbsxUrl,
				data:{type:e},
				success: function(data) {
					// console.log(data)
					// var arryHtml = '';
					$.each(data.data.returnJsonArr, function(i, o) {
						// if(o.typeName=="即时通讯"){
						// 	arryHtml+=	'<div style="cursor: not-allowed">'+
						// 		'	<p>'+o.flowCount+'</p>'+
						// 		'	<span>'+o.typeName+'</span>'+
						// 		'</div>'
						// }else{
						// 	if(!o.menuId){
						// 		o.menuId=''
						// 	}
						// 	arryHtml+=	'<div onclick="openFn(\''+o.appId+'\',\''+o.appUrlSuffix+'\',\''+o.appUrlPrefix+'\',\''+o.menuId+'\')">'+
						// 		'	<p>'+o.flowCount+'</p>'+
						// 		'	<span>'+o.typeName+'</span>'+
						// 		'</div>'
						// }
						$("#"+e+'> p').html(o.flowCount||0)
						if(index>=4){
							$("#"+e+'> span').html(o.typeName||'')
						}
						// arryHtml=
						// 	'	<p>'+o.flowCount+'</p>'+
						// 	'	<span>'+(o.typeName||menuMap[e].typeName||'')+'</span>'
						keyMap[e] = o
					});
					// $("#"+e).html(arryHtml);
				}
			})
		})
		$ajax({
			url: dbsxUrl2,
			success: function (data) {
				var key
				$.each(data.data.returnJsonArr, function(i, o) {
					menuMap[menuList[i]] = o;
					$("#"+menuList[i]+'> span').html(o.typeName||'')
				})
			}
		})
	}

	var initother = function(){
	}
    return {
        //加载页面处理程序
        initControl: function () {
			initdbsx();
		    initother();
        },
		refreshPage:function () {
			initdbsx();
		}
    }
}();

function openFn(id) {
	var Menu = keyMap[id];
	if(menuMap[id]){
		Menu.menuId = menuMap[id].menuId
	}else{
		Menu.menuId = ''
	}
	window.top.openfn1(Menu.appid,Menu.appUrlSuffix+'?show=0&menuIndex='+Menu.menuId,Menu.appUrlPrefix)
}
