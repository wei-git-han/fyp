var listurl = {"url": "/app/fyp/manageThing/weeklyTable","dataType": "text"};
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树--待定
var grid = null;

var pageModule = function() {
	var initZhoubiao = function() {
		grid = $("#gridcont").createGrid({
			columns: [{display: "单位",name: "deptName",width: "60%",align: "center",render: function(rowdata, n) {
						return rowdata.deptName;
					}
				},
				{display: "已发布周数",name: "count",width: "40%",align: "center",render: function(rowdata) {
						return rowdata.count;
					}
				},
			],
			width: '100%',
			height: '100%',
			checkbox: false,
			rownumberyon: false,
			paramobj: {
				time: $("#searchDate2").val()
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
				time: $("#searchDate").val()
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

		$(".date-picker1").datepicker({
			language: "zh-CN",
			rtl: Metronic.isRTL(),
			orientation: "",
			autoclose: true
		}).on("changeDate",function(){
			initNum();
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
		}
	}
}();
