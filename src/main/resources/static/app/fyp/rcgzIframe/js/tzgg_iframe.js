var pageModule = function () {
	
	var inittzgg = function(id){
		$.ajax({
			url: "../data/gzdtContent.json",
			data:{data1:id},
			success: function(data) {
				var arryHtml = '';
				$.each(data.list, function(i, o) {
					 var class1 = "";
					if(i<3){
						class1 = "top3";
					} 
					arryHtml+=  '<dl class="'+class1+'">'+
								'	<dt><span>'+parseInt(i+1)+'</span>'+o.content+'</dt>'+
								'	<dd>'+o.date+'</dd>'+
								'</dl>'
				});
				$("#"+id).html(arryHtml);
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



