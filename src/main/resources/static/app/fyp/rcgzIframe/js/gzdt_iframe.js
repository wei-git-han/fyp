var gzdtUrl = {"url":"/app/fyp/workTrendController/workTrendList","dataType":"text"};
var pageModule = function () {
	
	var initgzdt = function(){
		$ajax({
			url: gzdtUrl,
			data:{},
			success: function(data) {
				var arryHtml = '';
				$.each(data.data, function(i, o) {
					arryHtml+=`<dl>
									<dt><img src="${o.phoneUrl}" ></dt>
									<dd>
										<p class="title">${o.contentHead}</p>
										<p class="content">${o.contentDetail}</p>
										<p class="btns"><span class="date">${o.contentDate}</span>阅读<span class="num">${o.contentCount}</span><a id="${o.id}">查看详情</a></p>
									</dd>
								</dl>`
				});
				$("#gzdt").html(arryHtml);
			}
		})
	}
	var initother = function(){
	}
    return {
        //加载页面处理程序
        initControl: function () {
			initgzdt();
		    initother();
        }
    }
}();