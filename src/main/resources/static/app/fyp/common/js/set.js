var listurl = {"url":"common/data/grid.json","dataType":"text"};//表格数据
var grid = null;

var pageModule = function () {
	var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"姓名",name:"unit",width:"10%",align:"center",render:function(rowdata,n){
							return rowdata.unit;                                         
						}},
						{display:"单位",name:"weeks",width:"40%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"角色配置",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"配置人",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"配置时间",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"操作",name:"weeks",width:"20%",align:"center",render:function(rowdata){
							return '<i class="fa fa-plus smallBtn" onclick="addfn(\''+rowdata.id+'\')" title="新增"></i>';
						}}
					 ],
			width:'100%',
			height:'100%',
			checkbox: true,
			rownumberyon:true,
			paramobj:{},
			overflowx:false,
			pageyno:false,
			url: listurl
	   });
	}
	var initother = function(){
		/*导入 */
		$("#importBtn").click(function(){
			
		});
		
		/*搜索 */
		$("#search").click(function(){
			
		});
	}
	
    return {
        //加载页面处理程序
        initControl: function () {
        	initother();
			initgrid();
        }
    }
}();



