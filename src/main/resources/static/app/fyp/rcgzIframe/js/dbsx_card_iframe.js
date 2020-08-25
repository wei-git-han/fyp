var dbsxUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=app/fyp/personalTodo/backlogFlowStatisticsHeader","dataType":"text"};
var pageModule = function () {
	var initdbsx = function(){
		$ajax({
			url: dbsxUrl,
			data:{},
			success: function(data) {
				var arryHtml = '';
				$.each(data.data.returnJsonArr, function(i, o) {
					arryHtml+=	'<div>'+
								'	<p>'+o.flowCount+'</p>'+
								'	<span>'+o.typeName+'</span>'+
								'</div>'
				});
				$("#dbsx").html(arryHtml);
				
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
        }
    }
}();

