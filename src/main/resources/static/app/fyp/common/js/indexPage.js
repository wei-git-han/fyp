var url1 = {
	"url": "",
	"dataType": "text"
};
var activeType = "grdb";
var pageList = {
	"grdb": {
		"left": {
			"title": "在位情况",
			"head":"在位情况",
			"english":"REIGN CONDITION",
			"url": "/app/fyp/rcgzIframe/html/zwqk_iframe.html"
		},
		"center": {
			"title": "个人待办",
			"url": "/app/fyp/rcgzIframe/html/dbsx_iframe.html"
		},
		"right": {
			"title": "工作周表",
			"head":"工作周表",
			"english":"WORKING TABLE",
			"url": "/app/fyp/rcgzIframe/html/gzzb_iframe.html"
		}
	},
	"gzzb": {
		"left": {
			"title": "个人待办",
			"head":"个人待办",
			"english":"GIVE NOTICE",
			"url": "/app/fyp/rcgzIframe/html/dbsx_iframe.html"
		},
		"center": {
			"title": "工作周表",
			"url": "/app/fyp/rcgzIframe/html/gzzb_iframe.html"
		},
		"right": {
			"title": "通知公告",
			"head":"通知公告",
			"english":"GIVE NOTICE",
			"url": "/app/fyp/rcgzIframe/html/tzgg_iframe.html"
		}
	},
	"tzgg": {
		"left": {
			"title": "工作周表",
			"head":"工作周表",
			"english":"WORKING TABLE",
			"url": "/app/fyp/rcgzIframe/html/gzzb_iframe.html"
		},
		"center": {
			"title": "通知公告",
			"url": "/app/fyp/rcgzIframe/html/tzgg_iframe.html"
		},
		"right": {
			"title": "工作动态",
			"head":"工作动态",
			"english":"REIGN CONDITION",
			"url": "/app/fyp/rcgzIframe/html/gzdt_iframe.html"
		}
	},
	"gzdt": {
		"left": {
			"title": "通知公告",
			"head":"通知公告",
			"english":"GIVE NOTICE",
			"url": "/app/fyp/rcgzIframe/html/tzgg_iframe.html"
		},
		"center": {
			"title": "工作动态",
			"url": "/app/fyp/rcgzIframe/html/gzdt_iframe.html"
		},
		"right": {
			"title": "在位情况",
			"head":"在位情况",
			"english":"REIGN CONDITION",
			"url": "/app/fyp/rcgzIframe/html/zwqk_iframe.html"
		}
	},
	"zwqk": {
		"left": {
			"title": "工作动态",
			"head":"工作动态",
			"english":"REIGN CONDITION",
			"url": "/app/fyp/rcgzIframe/html/gzdt_iframe.html"
		},
		"center": {
			"title": "在位情况",
			"url": "/app/fyp/rcgzIframe/html/zwqk_iframe.html"
		},
		"right": {
			"title": "个人待办",
			"head":"个人待办",
			"english":"GIVE NOTICE",
			"url": "/app/fyp/rcgzIframe/html/dbsx_iframe.html"
		}
	},
	"bh": {
		"left": {
			"title": "保障",
			"head":"保障信息",
			"english":"ENSURE INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/bzxx_iframe.html"
		},
		"center": {
			"title": "办会",
			"url": "/app/fyp/bgxnIframe/html/bhxx_iframe.html"
		},
		"right": {
			"title": "办事",
			"head":"办事信息",
			"english":"THING INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/bsxx_iframe.html"
		}
	},
	"bs": {
		"left": {
			"title": "办会",
			"head":"办会信息",
			"english":"MEETING INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/bhxx_iframe.html"
		},
		"center": {
			"title": "办事",
			"url": "/app/fyp/bgxnIframe/html/bsxx_iframe.html"
		},
		"right": {
			"title": "办文",
			"head":"办文信息",
			"english":"OFFICE INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/bwxx_iframe.html"
		}
	},
	"bw": {
		"left": {
			"title": "办事",
			"head":"办事信息",
			"english":"THING INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/bsxx_iframe.html"
		},
		"center": {
			"title": "办文",
			"url": "/app/fyp/bgxnIframe/html/bwxx_iframe.html"
		},
		"right": {
			"title": "排行",
			"head":"排行信息",
			"english":"SENORITY INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/phxx_iframe.html"
		}
	},
	"ph": {
		"left": {
			"title": "办文",
			"head":"办文信息",
			"english":"OFFICE INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/bwxx_iframe.html"
		},
		"center": {
			"title": "排行",
			"url": "/app/fyp/bgxnIframe/html/phxx_iframe.html"
		},
		"right": {
			"title": "保障",
			"head":"保障信息",
			"english":"ENSURE INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/bzxx_iframe.html"
		}
	},
	"bz": {
		"left": {
			"title": "排行",
			"head":"排行信息",
			"english":"SENORITY INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/phxx_iframe.html"
		},
		"center": {
			"title": "保障",
			"url": "/app/fyp/bgxnIframe/html/bzxx_iframe.html"
		},
		"right": {
			"title": "办会",
			"head":"办会信息",
			"english":"MEETING INFORMATION",
			"url": "/app/fyp/bgxnIframe/html/bhxx_iframe.html"
		}
	}
}
var activeDoType = "rcgz"
var pageModule = function() {
	var initother = function() {
		//     $("#iframeLeft").attr("src", "/app/fyp/bgxnIframe/html/bzxx_iframe.html"); //办公效能--保障信息
		//     $("#iframeCenter").attr("src", "/app/fyp/bgxnIframe/html/bhxx_iframe.html"); //办公效能--办会信息
		//     $("#iframeRight").attr("src", "/app/fyp/bgxnIframe/html/bsxx_iframe.html"); //办公效能--办事信息 
		// 
		$('.btn-wrap>.btn').click(function() {
			setPage(this.id)
		})
		$('.newlayout-switch-btn>span').click(function() {
			if (activeDoType == this.id) {
				return;
			}
			if (this.id == 'rcgz') {
				$('.newlayout-switch-btn').addClass('active');
				$('#grgzGroup').show();
				$('#bgxnGroup').hide()
				setPage("grdb");
			} else {
				$('.newlayout-switch-btn').removeClass('active');
				$('#bgxnGroup').show();
				$('#grgzGroup').hide()
				setPage("bh");
			}
			activeDoType = this.id
		})
		
		//业务配置
		$("#set").click(function(){
			newbootbox.newdialog({
				id:"addModal",
				width:1020,
				height:600,
				header:true,
				title:"业务配置信息",
				url:"set.html",
				style:{"background":"#04182C"}
			})
		});
	}
	var setPage = function(type) {
		activeType = type;
		$('#' + type).addClass('active').siblings().removeClass('active')
		$("#iframeLeft").attr("src", pageList[type].left.url); //办公效能--保障信息
		$("#iframeCenter").attr("src", pageList[type].center.url); //办公效能--办会信息
		$("#iframeRight").attr("src", pageList[type].right.url); //办公效能--办事信息 

		$(".left-title .b-title").html(pageList[type].left.head); 
		$(".right-title .b-title").html(pageList[type].right.head); 
		
		$(".left-title .c-title").html(pageList[type].left.english); 
		$(".right-title .c-title").html(pageList[type].right.english); 
		
	}
	
	var getNum = function(){
		$.ajax({
			url: "/app/fyp/common/data/number.json",
			data:{},
			type:'get',
			success: function(data) {
				$(".zbrs").html(data.zbrs);
				$(".zxrs").html(data.zxrs);
				$(".zxl").html(data.zxl);
				$(".brfz").html(data.brfz); 
			}
		})
	}
	
	
	return {
		//加载页面处理程序
		initControl: function() {
			getNum();
			initother();
			setPage(activeType)
		}
	}
}();
