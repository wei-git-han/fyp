var gzdtUrl = {"url":"/app/fyp/workTrendController/workTrendList","dataType":"text"};
var pageModule = function () {
	
	var initgzdt = function(){
		$ajax({
			url: gzdtUrl,
			data:{},
			success: function(data) {
				var arryHtml = '';
				$.each(data.data.recentnews, function(i, o) {
					arryHtml+=`<dl onclick="openById('${data.data.appId}','${o.id}','${data.data.ip}','${i}')" style="cursor: pointer">
									<dt style="display: ${o.coverImg?'inline-block':'none'};overflow: hidden" ><img src="${data.data.ip+o.coverImg+top.location.search}" style="width: 100%;height: 100%"></dt>
									<dd style="padding-left: ${o.coverImg?'':'20px'}">
										<div class="title">${o.title}</div>
										<div class="content">${o.content}</div>
										<div class="btns"><span class="date">${o.createDate}</span>阅读<span class="num">${o.hits}</span><a id="${o.id}">查看详情</a></div>
									</dd>
								</dl>`
				});
				$("#gzdt").html(arryHtml);

/*
				coverImg ：图片路径
                	title	 ：标题
                	userName ：创建人名称
                	userId	 ：创建人id
                	content	 : 带有html标签的内容、图片
                	organName：组织名称
                	shortText：去掉html标签的内容仅有文字
                	createDate：创建时间*/


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

function openById(appid,id,domain){
	window.top.openfn1(appid,`/channelNews/newsDetails?nid=${id}`,domain)
}