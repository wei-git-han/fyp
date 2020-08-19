var listurl = {"url":"../data/grid.json","dataType":"text"};//表格数据
var delUrl = {"url":"../data/grid.json","dataType":"text"};//删除
var grid = null;

var pageModule = function () {
	var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"姓名",name:"unit",width:"10%",align:"center",render:function(rowdata,n){
							return rowdata.unit;                                         
						}},
						{display:"单位",name:"weeks",width:"15%",align:"left",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"联系电话",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"报修时间",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"问题来源",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"问题描述",name:"weeks",width:"15%",align:"left",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"状态",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"状态时间",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"处理措施",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
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
		/* 新增add */
		$("#add").click(function(){
			newbootbox.newdialog({
				id:"addModal",
				width:880,
				height:600,
				header:true,
				title:"新增问题",
				url:"add.html",
            })
		});
		/* 删除del */
		$("#del").click(function() {
			var datas = grid.getcheckrow();
			var ids=[];
			if(datas.length < 1) {
				newbootbox.alertInfo("请选择要删除的数据！");
			} else {
				$(datas).each(function(i){
					ids[i]=this.id;
				});
				newbootbox.confirm({
					 title: "提示",
				     message: "确认删除该信息？",
				     callback1:function(){
				    	 $ajax({
							url: delUrl,
							type: "GET",
							data: {"ids": ids.toString()},
							success: function(data) {
								if(data.result == "success") {
									newbootbox.alertInfo('删除成功！').done(function(){
										grid.refresh();
									});
								}else{
									newbootbox.alertInfo("删除失败！");
								}
							}
						})
				     }
				});
			}
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



