var listurl = {"url":"../data/grid.json","dataType":"text"};
var grid = null;

var pageModule = function() {
  var initZhoubiao = function(){
	  grid = $("#gridcont").createGrid({
		columns:[
					{display:"单位",name:"unit",width:"60%",align:"center",render:function(rowdata,n){
						return rowdata.unit;                                         
					}},
					{display:"已发布周数",name:"weeks",width:"40%",align:"center",render:function(rowdata){
						return rowdata.weeks;                                         
					}},
				 ],
		width:'100%',
		height:'100%',
		checkbox: false,
		rownumberyon:false,
		paramobj:{},
		overflowx:false,
		pageyno:false,
		url: listurl
     });
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
      initother();
    }
  }
}();
