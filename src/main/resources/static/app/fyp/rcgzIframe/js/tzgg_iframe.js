var tzggUrl = {"url":"/app/fyp/informAfficheController/informAfficheList","dataType":"text"};
var pageModule = function () {
	var inittzgg = function(type){
		$ajax({
			url: tzggUrl,
			data:{afficheType:type},
			success: function(data) {
				var arryHtml = '';
				$.each(data.data.resList, function(i, o) {
					/*var class1 = "";
					if(i<3){
						class1 = "top3";
					} 
					class="'+class1+'"
					*/
					arryHtml+=  '<dl style="cursor: pointer" onclick="openById(\''+data.data.appId+'\',\''+o.contentid+'\',\''+data.data.ip+'\',\''+i+'\')">'+
								'	<dt><span>'+parseInt(i+1)+'</span>'+o.title+'</dt>'+
								'	<dd>'+o.releaseTime+'</dd>'+
								'</dl>'
				});
				$("#mainContent").html(arryHtml);
			}
		})
	}
	
	var initother = function(){
		//点击事件
		$(".nav li").click(function() {
			inittzgg($(this).attr("data"));
		});
	}
    return {
        //加载页面处理程序
        initControl: function () {
			inittzgg($(".nav>li.active").attr("data"));
			initother();
        }
    }
}();



function openById(appid,id,domain){
	window.top.openfn1(appid,`/affiche/viewInfo.html?cid=${id}`,domain)
}