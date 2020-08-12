var listUrl = {"url":rootPath +"/roleset/list","dataType":"text"}; 
var delUrl = {"url":rootPath +"/roleset/delete","dataType":"text"};  
var grid = null;
var pageModule = function() {
	var initgrid = function() {
		grid = $("#gridcont").createGrid({
			columns: [
					  {display: "部门",name:"deptName",width: "40%",align: "left",render: function(rowdata,n){
						  return rowdata.deptName;   
					  }}, 
					  {display: "姓名",name: "userName",width: "40%",align: "center",render: function(rowdata,n){
						  return rowdata.userName;   
					  }}, 
					  {display: "角色",name: "roleFlag",width: "10%",align: "center",render: function(rowdata,n){
						  if('1'==rowdata.roleFlag){
							  return "首长"
						  }
/*						  if('2'==rowdata.roleFlag){
							  return "首长秘书"
						  }*/
						  if('3'==rowdata.roleFlag){
							  return "局领导"
						  }
/*						  if('4'==rowdata.roleFlag){
							  return "局秘书"
						  }*/
						  if('5'==rowdata.roleFlag){
							  return "处领导"
						  }
/*						  if('6'==rowdata.roleFlag){
							  return "参谋"
						  }*/
						  
					  }}, 
					  {display: "操作",name: "do",width: "10%",align: "center",render: function(rowdata,n){
						  return '<i class="fa fa fa-pencil" style="cursor:pointer;background:#5498EB;padding:4px 5px;color:#fff;" onclick="editfn(\''+rowdata.id+'\')" title="编辑"></i>';
					  }}
					 ],
			width: "100%",
			height: "100%",
			checkbox: true,
			rownumberyon: false,
			overflowx: false,
			pagesize:15,
			url: listUrl
		});

	}

	var initother = function() {
		$("#add").click(function() {
			window.location.href="add.html";
		});

		$("#plsc").click(function() {
			var datas=grid.getcheckrow();
			var ids=[];
			if(datas.length>0){
				$(datas).each(function(i){
					ids[i]=this.id;
				});
				removefn(ids.toString());
			}else{    
				newbootbox.alertInfo("请选择要删除的数据！");
			}
		});
	}

	return {
		//加载页面处理程序
		initControl: function() {
			initgrid();
			initother();
		},
		initgrid: function() {
			grid.refresh();
		}
	}

}();
//删除
var removefn = function(id){
	 newbootbox.confirm({
    	title:"提示",
    	message: "是否要进行删除操作？",
    	callback1:function(){
   		$ajax({
				url:delUrl,
				data:{ids:id},
				success:function(data){
					if(data.result=="success"){
						newbootbox.alertInfo('删除成功！').done(function(){
							pageModule.initgrid();
	    				});
					}
				}
			})
    	}
    });
}

//编辑
var editfn = function(id){
	window.location.href="add.html?id="+id;
}