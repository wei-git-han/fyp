var pageModule = function () {
	
	var initgzdt = function(){
		$.ajax({
			url: "../data/gzdtContent.json",
			data:{},
			success: function(data) {
				var arryHtml = '';
				$.each(data.list, function(i, o) {
					console.log(data.list)
					arryHtml+=`<dl>
									<dt><img src="../images/lqbz.png" ></dt>
									<dd>
										<p class="title">${o.title}</p>
										<p class="content">${o.content}</p>
										<p class="btns"><span class="date">${o.date}</span>阅读<span class="num">${o.number}</span><a id="${o.id}">查看详情</a></p>
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