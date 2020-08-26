var tzggUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=app/fyp/informAfficheController/informAfficheList","dataType":"text"};
var pageModule = function () {
	var inittzgg = function(type){
		$ajax({
			url: tzggUrl,
			data:{afficheType:type},
			success: function(data) {
				var arryHtml = '';
				$.each(data.data.list, function(i, o) {
					var class1 = "";
					if(i<3){
						class1 = "top3";
					} 
					arryHtml+=  '<dl class="'+class1+'">'+
								'	<dt><span>'+parseInt(i+1)+'</span>'+o. informAfficheContent+'</dt>'+
								'	<dd>'+o.informAfficheTime+'</dd>'+
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
			inittzgg('jugg');
			initother();
        }
    }
}();



