var pageModule = function () {
	// 人员在线状态
	/*
	*type  --代表部门和用户，部门是0，用户是1
	*flag  --代表图标，人是0，部门是1
	*status--只有人有，代表人0离线、1在线、2请假
	dwnumber_zx  && dwnumber_lx 只有部门有，代表单位的在线人数和离线人数
	*/
	var loginUserId = ''
	var initUserStatus = function() {
		$(".pagemenu").html("");
		 $.ajax({
			url: "../data/pagemenu.json",
			data: {
				searchVal: $("#searchVal").val()
			},
			success: function(data) {
				console.log(data)
				var array = [data];
				var eachfn = function(pid, array, el, n) {
					console.log(array)
					$.each(array, function(i, o) {
						console.log(o)
						var id = o.id;
						var text = o.text;
						var pl = 20;
						var children = o.children;
						var flag = o.flag;
						var dwnumber_zx = o.dwnumber_zx; //组织机构树单位--在线人数
						var dwnumber_lx = o.dwnumber_lx; //组织机构树单位--离线人数
						var dwnumber_qj = o.dwnumber_qj; //组织机构树单位--请假人数
						var type = o.type; //组织机构树单位type===0,用户===1
						var zx = o.zx;
						var lx = o.lx;
						var bg = o.bg;
						var status = o.status;
						var statushtml = '';
						var zxnumberhtml = '';
						var lxnumberhtml = '';
						var qjnumberhtml = '';
						var allnumber = '';
						var icon = '';
						var img = '';

						if (flag == "1") {
							img = '<i class="fa faimg fa-folder"></i>';
						} else {
							img = '<i class="fa faimg fa-user"></i>';
						}
						if (n > 0) {
							if (children != "" && children != null && children != "undefined") {
								if (children.length > 0) {
									icon = '<i class="faa fa fa-caret-right" style="font-size:18px!important"></i>'
								} else {
									icon = '<i class="fa"></i>'
								}
							}
						};
						//单位在线人数&离线人数
						/* if (type == "0") {
							zxnumberhtml = '<i class="fa fa-circle fa1"></i>' + dwnumber_zx;
							lxnumberhtml = '<i class="fa fa-circle fa0"></i>' + dwnumber_lx;
							qjnumberhtml = '<i class="leave"></i>' + dwnumber_qj;
							allnumber = "(" + zxnumberhtml + "&nbsp;" + qjnumberhtml + "&nbsp;" + lxnumberhtml + ")";
						} */

						//判断是否在线，1在线，0离线 2请假
						if (status != "" && status != null && status != "undefined") {
							if (status == "1") {
								statushtml = '<i class="fa fa-circle fa1"></i>'; //在线
							} else if(status == '2'){
                                statushtml = '<i class="leave"></i>'; //请假
							}else {
                                	statushtml = '<i class="fa fa-circle fa0"></i>'; //离线
							}
						}

						var li = $('<li class="l' + n + ' ' + (n == 1 ? "open active" : "") + ' lis" >' +
							'	<a style="padding-left:' + (n * pl) + 'px;" id="' + id + '" data="' + text + '" >' + icon + img +
							text +
							allnumber + statushtml + '</a>' +
							'</li>');
						el.append(li);
						var children = o.children;
						if (children != "" && children != null && children != "undefined") {
							if (children.length > 0) {
								var ul = $('<ul></ul>');
								li.append(ul);
								eachfn(pid + ";" + o.id, children, ul, n + 1);
							}
						}
						if (loginUserId == id) {
							$("#" + loginUserId).parents("li").addClass("open active");
						}
					})

				}
				eachfn("", array, $(".pagemenu"), 1);
			}
		});
	};
	
	
	var initother = function(){
		$(".pagemenu li>a").live("click", function() {
			var treeId = $(this).attr("id");
			$(this).parent().toggleClass("open");
			$(".pagemenu li").removeClass("active");
			if ($(this).parent().hasClass("l1")) {
				if ($(this).parent(".open").hasClass("active")) {
					$(this).parent(".open").removeClass("active");
				} else {
					$(this).parent(".open").addClass("active");
				}

				if ($(this).find(".fa").attr("class") != "fa") {
					if ($(this).parent().hasClass("open")) {
						$(this).find(".faa").removeClass("fa-caret-right");
						$(this).find(".faa").addClass("fa-caret-down");
					} else {
						$(this).find(".faa").removeClass("fa-caret-down");
						$(this).find(".faa").addClass("fa-caret-right");
					};
				}
			} else {
				$(this).parents(".l1").addClass("active");
				$(this).parent().addClass("active");
				if ($(this).find(".fa").attr("class") != "fa") {
					if ($(this).parent().hasClass("open")) {
						$(this).find(".faa").removeClass("fa-caret-right");
						$(this).find(".faa").addClass("fa-caret-down");
					} else {
						$(this).find(".faa").removeClass("fa-caret-down");
						$(this).find(".faa").addClass("fa-caret-right");
					};
				}
			}
		});

		//人员在位筛选
		$("#search_ryzw").click(function() {
			initUserStatus();
		});
		
	}
    return {
        //加载页面处理程序
        initControl: function () {
          initUserStatus();
		  initother();
        }
    }
}();



