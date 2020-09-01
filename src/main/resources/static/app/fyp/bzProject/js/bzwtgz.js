var listurl = {"url":"/fyp/guaranteetacking/list","dataType":"text"};//表格数据
var delUrl = {"url":"/fyp/guaranteetacking/delete","dataType":"text"};//删除
var deptTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //单位树--待定
var grid = null;
var pageModule = function () {
	var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"姓名",name:"name",width:"10%",align:"center",render:function(rowdata,n){
							return rowdata.name;                                         
						}},
						{display:"单位名称",name:"deptName",width:"15%",align:"left",render:function(rowdata){
							return rowdata.deptName;                                         
						}},
						{display:"联系电话",name:"phone",width:"10%",align:"center",render:function(rowdata){
							return rowdata.phone;                                         
						}},
						{display:"报修时间",name:"warrantyTime",width:"10%",align:"center",render:function(rowdata){
							return rowdata.warrantyTime;                                         
						}},
						{display:"问题来源",name:"source",width:"10%",align:"center",render:function(rowdata){
							return rowdata.source;                                         
						}},
						{display:"问题描述",name:"remark",width:"15%",align:"left",render:function(rowdata){
							return rowdata.remark;                                         
						}},
						{display:"状态",name:"status",width:"10%",align:"center",render:function(rowdata){
							return rowdata.status;                                         
						}},
						{display:"更新时间",name:"statusTime",width:"10%",align:"center",render:function(rowdata){
							return rowdata.statusTime;                                         
						}},
						{display:"处理措施",name:"measures",width:"10%",align:"center",render:function(rowdata){
							return rowdata.measures;                                         
						}}
					 ],
			width:'100%',
			height:'100%',
			checkbox: true,
			rownumberyon:true,
			paramobj:{},
			overflowx:false,
			pageyno:true,
			url: listurl
	   });
	}
	
	//单位树
	var initUnitTree = function(){
		$("#deptName").createSelecttree({
			url :deptTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#deptName").val(data.node.text);
				$("#deptId").val(data.node.id);
			}
		});
	}
	
	var initother = function(){
		$(".date-picker").datepicker({
		    language:"zh-CN",
		    rtl: Metronic.isRTL(),
		    orientation: "right",
		    format: "yyyy-mm-dd",
		    autoclose: true,
		    startDate:new Date()
		});
		
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
					title:"新增问题",
					url:"add.html?id="+id,
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
		});
		
		//确定
		$("#sure").click(function(){
			var elementarry = ["name","deptId","deptName","phone","warrantyTime","source","remark","status"];
			grid.setparams(getformdata(elementarry));
			grid.refresh();
		});
		
		//重置
		$("#reset").click(function(){
			removeInputData(["name","deptId","deptName","phone","warrantyTime","source","remark","status"]);
		});
	}
	
	
    return {
        //加载页面处理程序
        initControl: function () {
			initgrid();
			initUnitTree();
			initother();
        },
		initgrid:function(){
			initgrid();
		}
    }
}();



