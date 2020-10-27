var listurl = {"url":"../data/grid.json","dataType":"text"};
var grid = null;
var pageModule = function () {
	var initgrid = function(){
        grid = $("#gridcont").createGrid({
			columns:[
						/* {display:"应用",name:"app",width:"15%",align:"center",render:function(rowdata,n){
							return rowdata.app;                                         
						}},
						{display:"内容",name:"content",width:"17%",align:"left",render:function(rowdata){
							return rowdata.content;                                         
						}},
						{display:"发起人",name:"userName",width:"17%",align:"center",render:function(rowdata){
							return rowdata.departmentName;                                        
						}},
						{display:"时间",name:"date",width:"40%",align:"center",render:function(rowdata){
							return rowdata.date;    
						}},
						{display:"操作",name:"操作",width:"11%",align:"center",render:function(rowdata){
							return '<i class="fa fa fa-pencil" style="cursor:pointer;color: #2E85E0;padding:4px 5px;" onclick="editfn()" title="编辑"></i>';                                        
						}} */
						{display:"文件名称",name:"app",width:"30%",align:"center",render:function(rowdata,n){
							return rowdata.app;                                         
						}},
						{display:"呈报单位",name:"app",width:"55%",align:"center",render:function(rowdata,n){
							return rowdata.app;                                         
						}},
						{display:"承办人",name:"app",width:"15%",align:"center",render:function(rowdata,n){
							return rowdata.app;                                         
						}},
					 ],
			width:"100%",
			height:"100%",
			checkbox: true,
			rownumberyon:true,
			paramobj:{},
			overflowx:false,
			pageyno:false,
			url: listurl
	   });
	}
	
	var initother = function(){
	}
    return {
        //加载页面处理程序
        initControl: function () {
			initgrid();
		    initother();
        },
		refreshPage:function () {

		}
    }
}();


function editfn(){
	alert(1)
}
