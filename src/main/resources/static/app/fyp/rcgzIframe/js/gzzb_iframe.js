var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var getRoleUrl = {"url":"/app/base/user/getBSZ","dataType":"text"}; //区分局内用户||部首长
var gzzbUrl;
var pageModule = function () {
	//区分局内用户||部首长
	var getRole = function(flag){
		$ajax({
			url: getRoleUrl,
			data:{},
			success: function(res) {
				if(res){//true是部首长
					$("#deptFilter,#gjzb").show();
					initPlan('gjzb');
				}else{
					if(flag == 'grzb'){
						$("#bjzb,#grzb").show();
						$("#grzb").addClass('active').siblings().removeClass("active");
						initPlan('grzb');
					}else{
						$("#bjzb,#grzb").show();
						$("#bjzb").addClass('active').siblings().removeClass("active");
						initPlan('bjzb');
					}
				}
			}
		})
	}
	
	var object1 = {};
	var initPlan = function(type){
		var startDate='';
		var endDate='';
		if(type=="bjzb"){
			gzzbUrl = {"url":"/app/fyp/workWeekTable/statementTablesList","dataType":"text"};
		}
		if(type=="grzb"){
			gzzbUrl = {"url":"/app/fyp/workWeekTable/list","dataType":"text"};
			time=$("#time").val();
		}
		$ajax({
			url: gzzbUrl,
			data:{weekTableType:type,userId:$("#deptId").val(),toDate:time},
			success: function(res) {
				if (res.data.length<1 || !res.data) {
					$("#mainContent").html("");
					return;
				}
				var divHeight = $(".newpage113").height();
				var headHeight = 42;
				var contentHeight = (divHeight - headHeight) / 7;
				var planHtml = ""; //周工作安排
				$("#mainContent").html("");
				//for(key in res){
					//if(res[key]!=null&&typeof(res[key])!="undefined"&&res[key]!=""){
						$.each(res.data, function(i, item) {
							var anpaihtml = "";
							var html2 = "";
							var html4 = "";
							var htmlDate = "";
							var height101 = "";
							var month = item.weekMonth;
							var day = item.weekDay;
							var week = item.weekDate;
							if($.trim(week) == "七"){
								week="日";
							}
							var dates = month + "月" + day + "日";
							var comparedates = month + "-" + day;
							var comparedates2 = $("#monthAndday").val();
							var today = new Date().format("M月d日");
							
							htmlDate += '	<div class="newpage17" style="background:transparent!important">' +
										'		<div class="newpage21" >' +
										'			<p>' + month+'月'+day+'日' + '</p><p>' + '星期'+ week + '</p>' +
										'		</div>' +
										'	</div>';
							
							$.each(item.amFypPersonageWorkWeekList, function(j, items) {
								var createdTime = items.createdTime;
								var html5 = "";
								var html9 = "";

								var id = items.id;
								object1[id] = items;

								html5 = '<dl>';
								if (createdTime != null && typeof(createdTime) != "undefined" && createdTime != "") {
									createdTime = createdTime.substring(11,16);
									html5 += "<dt title=" + createdTime + ">" + createdTime + "</dt>";
								} else {
									html5 += "<dt></dt>";
								};
								html5 += '	<dd>';
								if (items.weekTableContent != null && typeof(items.weekTableContent) != "undefined" && items.weekTableContent !=
									"") {
									html9 += '<span class="span1" title="' + items.weekTableContent + '">' + items.weekTableContent + '</span>';
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
								html2 += '<div class="newpage19"  onclick="editfn(\''+items.id+'\')" >' + html5 + '</div>'
							});
							
							
							
							
							var html1 = '<div class="newpage18" style="height:' + contentHeight + 'px; background:transparent;"><div class="newpage101">' +
							html2 +
							'</div></div>';
							$.each(item.pmFypPersonageWorkWeekList, function(i, items) {
								var createdTime = items.createdTime;
								var html7 = "";
								var html10 = "";
								html7 = '<dl>';
								if (createdTime != null && typeof(createdTime) != "undefined" && createdTime != "") {
									createdTime = createdTime.substring(11,16);
									html7 += "<dt title=" + createdTime + ">" + createdTime + "</dt>";
								} else {
									html7 += "<dt></dt>";
								};
								html7 += '	<dd>';
								if (items.weekTableContent != null && typeof(items.weekTableContent) != "undefined" && items.weekTableContent !="") {
									html10 += '<span class="span1" title="' + items.content + '">' + items.weekTableContent + '</span>';
								};
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
								html4 += '<div class="newpage19" onclick="editfn(\''+items.id+'\')" >' + html7 + '</div>'
							});
							
							
							var html3 = '<div class="newpage18" style="height:' + contentHeight + 'px; background:transparent;"><div class="newpage101">' +
								html4 +
								'</div></div>';
							
							planHtml += '<div class="newpage20 ' + (today == dates ? "active" : "") + '" data="show_' + (i + 1) +
								'" name="show_' + (i + 1) + '">' +
								 htmlDate + html1 + html3 +
								'</div>';
						});
					//}
				//}
				$("#mainContent").append(planHtml);
			}
		})
	}
	
	var initother = function(){
		$("#time").datepicker({
		    language:"zh-CN",
		    autoclose: true,
		    isRTL: Metronic.isRTL(),
		    format: "yyyy-mm-dd",
		    pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left")
		}).on("changeDate",function(){
			getRole('grzb');
		});
		//各局周表&本局周表 点击事件
		$(".nav>li").click(function() {
			$("#mainContent").html("");
			$(this).addClass('active').siblings().removeClass('active');
			initPlan($(".nav>li.active").attr("data"));
			if($(".nav>li.active").attr("data") == "gjzb"){
				$("#deptFilter").show();
			}
			if($(".nav>li.active").attr("data") == "grzb"){
				$("#caozuoBtn").show();
			}else{
				$("#caozuoBtn").hide();
			}
		});
		
		//新增
		$("#add").click(function(){
			newbootbox.newdialog({
			    id: "addModal",
			    width: 650,
			    height: 450,
			    header: true,
			    title: "新增",
			    url: "/app/fyp/rcgzIframe/html/gzzb_add.html",
			    style: {
			      /*"background": "#fff"*/
			    }
			})
		});
		
		//编辑
		$("#edit").click(function(){
			newbootbox.alertInfo('请点击要修改的数据！');
		});
	}
	

	var initUnitTree = function() {
		$("#deptName").createSelecttree({
			url: deptTreeUrl,
			width: '100%',
			success: function(data, treeobj) {},
			selectnode: function(e, data) {
				$("#deptName").val(data.node.text);
				$("#deptId").val(data.node.id);
				initPlan($(".nav>li.active").attr("data"));
			}
		});
	}
	
	
    return {
        //加载页面处理程序
        initControl: function () {
          getRole('');
          initUnitTree();
		  initother();
        },
        refresh:function(){
        	getRole('grzb');
        },
		refreshPage:function () {

		}
    }
}();


function refreshfn(){
	pageModule.refresh();
}

function editfn(id){
	newbootbox.newdialog({
	    id: "addModal",
	    width: 600,
	    height: 400,
	    header: true,
	    title: "编辑",
	    url: "/app/fyp/rcgzIframe/html/gzzb_add.html?id="+id,
	    style: {
	      "background": "#fff"
	    }
	})
}
