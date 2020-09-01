var gzzbUrl;
var pageModule = function () {
	var object1 = {};
	var initPlan = function(type){
		if(type=="bjzb"){
			gzzbUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=app/fyp/workWeekTable/statementTablesList","dataType":"text"};
		}
		if(type=="grzb"){
			gzzbUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/workWeekTable/list","dataType":"text"};
		}
		$ajax({
			url: gzzbUrl,
			data:{weekTableType:type},
			success: function(res) {
				if (res.data.length<1) {
					return;
				}
				var divHeight = $(".newpage113").height();
				var headHeight = 42;
				var contentHeight = (divHeight - headHeight) / 7;
				var planHtml = ""; //周工作安排
				$("#mainContent").html("");
				var res = res.data;
				for(key in res){
					if(res[key]!=null&&typeof(res[key])!="undefined"&&res[key]!=""){
						$.each(res[key].itemList, function(i, item) {
							var anpaihtml = "";
							var html2 = "";
							var html4 = "";
							var htmlDate = "";
							var height101 = "";
							var month = item.month + 1;
							var day = item.day;
							var week = item.week;
							var dates = month + "月" + day + "日";
							var today = new Date().format("M月d日");
							
							htmlDate += '	<div class="newpage17" style="background:transparent!important">' +
										'		<div class="newpage21" >' +
										'			<p>' + month+'月'+day+'日' + '</p><p>' + '星期'+ week + '</p>' +
										'		</div>' +
										'	</div>';
							
							$.each(item.amItem, function(j, items) {
								var html5 = "";
								var html9 = "";

								var id = items.id;
								object1[id] = items;

								html5 = '<dl>';
								if (items.beginTime != null && typeof(items.beginTime) != "undefined" && items.beginTime != "") {
									html5 += "<dt title=" + items.beginTime + ">" + items.beginTime + "</dt>";
								} else {
									html5 += "<dt></dt>";
								};
								html5 += '	<dd>';
								if (items.content != null && typeof(items.content) != "undefined" && items.content !=
									"") {
									html9 += '<span class="span1" title="' + items.content + '">' + items.content + '</span>，';
								};
								if (items.receiverUtil != null && typeof(items.receiverUtil) != "undefined" && items.receiverUtil !=
									"") {
									html9 += '<span class="span2" title="' + items.receiverUtil + '">（' + items.receiverUtil +
										'主办）</span>';
								};
								if (html9 != "") {
									html5 += '<p class="p1">' + html9 + '</p>';
								};
								html5 += '	</dd>';
								'</dl>';
								html2 += '<div class="newpage19" >' + html5 + '</div>'
							});
							var html1 = '<div class="newpage18" style="height:' + contentHeight + 'px; background:transparent;"><div class="newpage101">' +
							html2 +
							'</div></div>';
							$.each(item.pmItem, function(i, items) {
								var html7 = "";
								var html10 = "";
								html7 = '<dl>';
								if (items.beginTime != null && typeof(items.beginTime) != "undefined" && items.beginTime != "") {
									html7 += "<dt title=" + items.beginTime + ">" + items.beginTime + "</dt>";
								} else {
									html7 += "<dt></dt>";
								};
								html7 += '	<dd>';
								if (items.content != null && typeof(items.content) != "undefined" && items.content !="") {
									html10 += '<span class="span1" title="' + items.content + '">' + items.content + '</span>，';
								};
								/*if (items.title != null && typeof(items.title) != "undefined" && items.title != "") {
									html10 += '<span class="span3" title="' + items.title + '">' + items.title + '</span>';
								};
								*/
								if (items.receiverUtil != null && typeof(items.receiverUtil) != "undefined" && items.receiverUtil !=
									"") {
									html10 += '<span class="span2" title="' + items.receiverUtil + '">（' + items.receiverUtil +
										'主办）</span>';
								};
								if (html10 != "") {
									html7 += '<p class="p1">' + html10 + '</p>';
								};
								html7 += '	</dd>';
								'</dl>';
								html4 += '<div class="newpage19">' + html7 + '</div>'
							});
							var html3 = '<div class="newpage18" style="height:' + contentHeight + 'px; background:transparent;"><div class="newpage101">' +
								html4 +
								'</div></div>';
							
							planHtml += '<div class="newpage20 ' + (today == dates ? "active" : "") + '" id="show_' + (i + 1) +
								'" name="show_' + (i + 1) + '">' +
								 htmlDate + html1 + html3 +
								'</div>';
						});
					}
				}
				$("#mainContent").append(planHtml);
			}
		})
	}
	
	var initother = function(){
		//各局周表&本局周表 点击事件
		$(".nav>li").click(function() {
			$(this).addClass('active').siblings().removeClass('active');
			initPlan($(".nav>li.active").attr("data"));
		});
	}
    return {
        //加载页面处理程序
        initControl: function () {
          initPlan('bjzb');
		  initother();
        }
    }
}();



