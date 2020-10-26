var listUrl = {"url":"/fyp/feedbackhear/list","dataType":"text"};//表格数据
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树（调用方法暂时被注释）
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //人员树（调用方法暂时被注释）
var delUrl = {"url":"/fyp/feedbackhear/delete","dataType":"text"};//删除
var grid = null;

var pageModule = function () {
	var initgrid = function(){
		grid = $("#gridcont").createGrid({
				columns:[
				        {display:"种类",name:"type",width:"20%",align:"center",render:function(rowdata,n){
				            if (rowdata.type == '0') {
				                return '软件'
				            } else if (rowdata.type == '1')  {
				                return '硬件'
				            } else {
                                return rowdata.type;
				            }
                        }},
						{display:"硬件/软件名称",name:"name",width:"40%",align:"center",render:function(rowdata,n){
							return rowdata.name;
						}},
						{display:"创建时间",name:"submitTime",width:"20%",align:"center",render:function(rowdata){
							return rowdata.submitTime;
						}},
						{display:"创建人",name:"submitUserName",width:"20%",align:"center",render:function(rowdata){
							return rowdata.submitUserName;
						}}
				 ],
		width:'100%',
		height:'100%',
		checkbox: true,
		rownumberyon:true,
		paramobj:{},
		overflowx:false,
		pageyno:true,
		url: listUrl
	  });
	}

	var initother = function(){
		/*搜索 */
		$("#sure").click(function(){
			var elementarry = ["productName","status"];
			grid.setparams(getformdata(elementarry));
			grid.refresh();
		});
		/* 新增add */
		$("#add").click(function(){
			newbootbox.newdialog({
				id:"addModal",
				width:500,
				height:300,
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
					width:500,
					height:300,
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
			initgrid();
			initother();
        },
        initgrid:function(){
            initgrid();
        }
    }
}();