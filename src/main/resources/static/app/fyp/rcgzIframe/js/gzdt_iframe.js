var gzdtUrl = {"url":"/app/fyp/workTrendController/workTrendList","dataType":"text"};
var pageModule = function () {

	var initgzdt = function(){
		$ajax({
			url: gzdtUrl,
			data:{},
			success: function(data) {
				var arryHtml = '';
				$.each(data.data.recentnews, function(i, o) {
					if(i<=2){
					arryHtml+=`<dl onclick="openById('${data.data.appId}','${o.id}','${data.data.ip}','${i}')" style="cursor: pointer">
								<dt style="overflow: hidden" ><img src="${o.coverImg?data.data.ip+o.coverImg+top.location.search:'/app/fyp/common/images/u11814.svg'}" style="width: 100%;height: 100%"></dt>
								<dd>
									<div class="title">${o.title}</div>
									<div class="content">${o.content}</div>
									<div class="btns"><span class="date">${o.createDate}</span>阅读<span class="num">${o.hits}</span><a id="${o.id}">查看详情</a></div>
								</dd>
							</dl>`
					}
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
        },
		refreshPage:function () {
			initgzdt();
		}
    }
}();

function openById(appid,id,domain){
	window.top.openfn1(appid,`/channelNews/newsDetails_fyp?nid=${id}`,domain)
}
