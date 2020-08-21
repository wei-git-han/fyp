var listurl = {"url":"","dataType":"text"};//表格数据
var delUrl = {"url":"","dataType":"text"};//删除
var grid = null;

var pageModule = function () {
	var initgrid = function(){
		grid = $("#gridcont").createGrid({
				columns:[
					{display:"状态",name:"unit",width:"10%",align:"center",render:function(rowdata,n){
						return rowdata.unit;                                         
					}},
					{display:"姓名",name:"unit",width:"10%",align:"center",render:function(rowdata,n){
						return rowdata.unit;                                         
					}},
					{display:"单位名称",name:"weeks",width:"20%",align:"left",render:function(rowdata){
						return rowdata.weeks;                                         
					}},
					{display:"联系电话",name:"weeks",width:"15%",align:"center",render:function(rowdata){
						return rowdata.weeks;                                         
					}},
					{display:"报修时间",name:"weeks",width:"15%",align:"center",render:function(rowdata){
						return rowdata.weeks;                                         
					}},
					{display:"应用名称",name:"weeks",width:"15%",align:"center",render:function(rowdata){
						return rowdata.weeks;                                         
					}},
					{display:"需求描述",name:"weeks",width:"15%",align:"left",render:function(rowdata){
						return rowdata.weeks;                                         
					}}
				 ],
		width:'100%',
		height:'100%',
		checkbox: false,
		rownumberyon:true,
		paramobj:{},
		overflowx:false,
		pageyno:false,
		url: listUrl
	  });
	}
	
	var initother = function(){
		/*搜索 */
		$("#sure").click(function(){
			var elementarry = ["name","deptId","deptName","phone","warrantyTime","source","remark","status"];
			grid.setparams(getformdata(elementarry));
			grid.refresh();
		});
		
		//重置
		$("#reset").click(function(){
			removeInputData(["name","deptId","deptName","phone","warrantyTime","source","remark","status"]);
		});
		
		
		/* 新增add */
		$("#add").click(function(){
			newbootbox.newdialog({
				id:"addModal",
				width:880,
				height:600,
				header:true,
				title:"新增",
				url:"slqkadd.html",
            })
		});
		
		//编辑edit
		$("#edit").click(function(){
			var datas = grid.getcheckrow();
			if(datas.length !=1) {
				newbootbox.alertInfo("请选择一条要编辑的数据！");
			} else {
				var id = datas[0].id;
				newbootbox.newdialog({
					id:"addModal",
					width:880,
					height:600,
					header:true,
					title:"新增",
					url:"slqkadd.html?id="+id
				}) 
			}
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
		})
	}
	
    return {
        //加载页面处理程序
        initControl: function () {
        	initother();
			initgrid();
        }
    }
}();

