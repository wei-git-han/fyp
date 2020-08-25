var listurl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/manageThing/weeklyTable","dataType":"text"};
var grid = null;

var pageModule = function() {
  var initZhoubiao = function(){
	  grid = $("#gridcont").createGrid({
		columns:[
					{display:"单位",name:"deptName",width:"60%",align:"center",render:function(rowdata,n){
						return rowdata.deptName;
					}},
					{display:"已发布周数",name:"count",width:"40%",align:"center",render:function(rowdata){
						return rowdata.count;
					}},
				 ],
		width:'100%',
		height:'100%',
		checkbox: false,
		rownumberyon:false,
		paramobj:{deptid:'',
			time:'2020-08'},
		overflowx:false,
		pageyno:false,
		url: listurl
     });
  }

  var initNum = function(){
  	$.ajax({
		url:'http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/manageThing/dbCount',
		data:{
			deptid:'',
			time:'2020-08'
		},
		dataType:"json",
		success:function (res) {
			if(res.result=="success"){
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
	  $(".main-l").css("right",((allWidth+368)/2)+20+"px");
	  $(".main-r").css("left",((allWidth+368)/2)+20+"px");
	  
	  $("#gzbbLi").click(function(){
		  initZhoubiao();
	  })
  }


  return {
    //加载页面处理程序
    initControl: function() {
		initNum();
		initother();
    }
  }
}();
