var listUrl = {"url":"/dict/list","dataType":"text"};//表格数据
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树（调用方法暂时被注释）
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //人员树（调用方法暂时被注释）
var delUrl = {"url":"/dict/delete","dataType":"text"};//删除
var grid = null;

var pageModule = function () {
	var initgrid = function(){
		grid = $("#gridcont").createGrid({
				columns:[
						{display:"问题类型",name:"submitTime",width:"40%",align:"center",render:function(rowdata){
							return rowdata.dictName;
						}},
						{display:"问题描述",name:"submitUserName",width:"60%",align:"center",render:function(rowdata){
							return rowdata.dictValue;
						}}
				 ],
		width:'100%',
		height:'100%',
		checkbox: true,
		rownumberyon:true,
		paramobj:{type:"1"},
		overflowx:false,
		pageyno:true,
		url: listUrl
	  });
	}

	var initother = function(){
		/*搜索 */
		$("#sure").click(function(){
			var elementarry = ["dictName","dictValue"];
			grid.setparams(getformdata(elementarry));
			grid.refresh();
		});
		/* 新增add */
		$("#add").click(function(){
			newbootbox.newdialog({
				id:"addModal",
				width:800,
				height:500,
				header:true,
				title:"新增",
				url:"issueClassifyAdd.html",
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
					width:800,
					height:500,
					header:true,
					title:"编辑",
					url:"issueClassifyAdd.html?id="+id
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
							data: {"id": ids.toString()},
							success: function(data) {
								if(data.msg == "success") {
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
			initgrid();
			initother();
        },
        initgrid:function(){
            initgrid();
        }
    }
}();