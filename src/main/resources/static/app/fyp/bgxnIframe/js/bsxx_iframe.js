var listurl = {"url": "/app/fyp/manageThing/weeklyTable","dataType": "text"};
var deptTreeUrl = {"url":"/app/base/dept/tree_onlyroot","dataType":"text"}; //单位树
var grid = null;
// var isSz = window.top.isSz||false
// if(isSz==true){
// 	$('.filterUnit').show()
// }else{
// 	$('.filterUnit').hide()
// }
var date2 = new Date()
var nowYear = date2.getFullYear();
var nowMonth = date2.getMonth();
if(nowMonth==0||nowMonth==1){
	$('#startTime1').val(`${nowYear-1}-01-01`)
	$('#endTime1').val(`${nowYear-1}-12-31`);
}else{
	$('#startTime1').val(`${nowYear}-01-01`)
	$('#endTime1').val(`${nowYear}-12-31`);
}
var pageModule = function() {
	var initZhoubiao = function() {
		grid = $("#gridcont").createGrid({
			/*columns: [{display: "单位",name: "deptName",width: "60%",align: "center",render: function(rowdata, n) {
						return rowdata.deptName;
					}
				},
				{display: "已发布周数",name: "count",width: "40%",align: "center",render: function(rowdata) {
						return rowdata.count;
					}
				},
			],*/
			columns: [{display: "单位",name: "zoneName",width: "60%",align: "center",render: function(rowdata, n) {
            						return rowdata.zoneName;
                    }
                },
                {display: "已发布周数",name: "count_",width: "40%",align: "center",render: function(rowdata) {
                        return rowdata.count_;
                    }
                },
            ],
			width: '100%',
			height: '100%',
			checkbox: false,
			rownumberyon: false,
			paramobj: {
				time: $("#searchDate2").val(),
				limit:1000,page:1
			},
			overflowx: false,
			pageyno: false,
			url: listurl
		});
	}

	var initNum = function() {
		$.ajax({
			url: '/app/fyp/manageThing/dbCount',
			data: {
				deptid: $("#deptId").val(),
				deptname: $("#deptName").val(),
				startTime: $("#startTime1").val(),
				endTime: $("#endTime1").val()
			},
			dataType: "json",
			success: function(res) {
				if (res.result == "success") {
					$('#total').html(res.data.total)
					$('#onTime').html(res.data.onTime)
					$('#timeOutNotEnd').html(res.data.timeOutNotEnd)
					$('#dayNumber').html(res.data.dayNumber)
					$('#timeOutEnd').html(res.data.timeOutEnd)
					$('#working').html(res.data.working)
					$('#percentage').html(res.data.percentage)
				}
			}
		})
	}
	var initother = function() {

		var allWidth = $("body").width();
		$(".main-l").css("right", ((allWidth + 310) / 2) + 20 + "px");
		$(".main-r").css("left", ((allWidth + 310) / 2) + 20 + "px");

		$("#gzbbLi").click(function() {
			initZhoubiao();
		});
		$("#dccb").click(function() {
			initNum();
		});
		// $(".date-picker1").datepicker({
		// 	language:"zh-CN",
        //     rtl: Metronic.isRTL(),
        //     orientation: "",
        //     format: "yyyy",
        //     minViewMode: 2,
        //     autoclose: true
		// }).on("changeDate",function(){
		// 	initNum();
 		// });
		$(".date-picker1").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true,
			// minViewMode: 2,
			format: "yyyy-mm-dd"
		}).on("changeDate",function(res){
			var startTime = $('#startTime1').val()
			var endTime = $('#endTime1').val()
			var _this = $(this)
			if(startTime&&endTime){
				if(new Date(startTime).getTime()>new Date(endTime).getTime()){
					if(_this.hasClass('end')){
						$('#startTime1').val(endTime)
					}else{
						$('#endTime1').val(startTime)
					}
				}
			}
			initNum();//办文总量
		});
		$(".date-picker2").datepicker({
			language:"zh-CN",
		    rtl: Metronic.isRTL(),
		    orientation: "",
		    format: "yyyy-mm",
			minViewMode: 1,
		    autoclose: true
		}).on("changeDate",function(){
			initZhoubiao();
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
				initNum();
			}
		});
	}

	return {
		//加载页面处理程序
		initControl: function() {
			initNum();
			initUnitTree();
			initother();
		},
		refreshPage:function () {
			if($('#gzbbLi').hasClass('active')){
				initZhoubiao();
			}else{
				initNum();
			}
		}
	}
}();
