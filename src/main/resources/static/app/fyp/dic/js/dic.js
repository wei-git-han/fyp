var url1 = {"url":"/app/fyp/dic/data/zdwh_list.json","dataType":"text"};
var delUrl = {"url":"/app/fyp/dic/data/deletezdx.json","dataType":"text"};
var grid = null;
var pageModule = function() {
	var initgrid = function() {
		grid = $("#gridcont").createGrid({
			columns: [{
				display: "字典名称",
				name: "name",
				width: "10%",
				align: "center",
				render: getName
			}, {
				display: "字典值",
				name: "children",
				width: "80%",
				align: "left",
				render: getValue
			}
			, {
				display: "操作",
				name: "children",
				width: "10%",
				align: "center",
				render: getDo
			}
			],
			
			width: "100%",
			height: "100%",
			checkbox: true,
			rownumberyon: true,
			//paramobj:{id:id},
			overflowx: false,
            pageyno:false,
            loadafter:function(data){
            },
			url: url1
		});

	}

	function getName(rowdata) {
		return '<span style="cursor:pointer;">' + rowdata.name + '</span>';
	}

	function getDo(rowdata) {
		return '<img src="../images/bianji.svg" style="cursor:pointer;padding:4px 5px;color:#fff;" onclick="editfn()" title="编辑" />';
	}

	
	function getValue(rowdata) {
		var content = "";
		$.each(rowdata.children, function(i, item) {
			content += '<span style="cursor:pointer;" class="check"><input type="checkbox"  value=' + rowdata.type + '&' + item.id + '>&nbsp;<span>' + item.dictionaryValue + '</span></span>&nbsp;&nbsp;&nbsp;&nbsp;';
		});
		return content;
	}

	var initother = function() {
		$("#add").click(function() {
			var datas = grid.getcheckrow();
			if(datas.length < 1) {
				newbootbox.alertInfo("请选择名称进行字典值添加！");
			} else if(datas.length > 1) {
				newbootbox.alertInfo("请选择一条数据进行添加！");
			} else {
				for(var i = 0; i < datas.length; i++) {
					var dataname = datas[i].name;
					var datatype = datas[i].type;
					var datachildren = datas[i].children;
					var childrenValue=[];
					for(var y=0;y<datachildren.length;y++){
						childrenValue.push(datachildren[y].value);
					}
				}
				//window.location.href="edit.html?name=" + encodeURI(encodeURI(dataname))+ "&type=" + datatype;
				newbootbox.newdialog({
					id:"addModal",
					width:880,
					height:600,
					header:true,
					title:"新增",
					url:"/app/fyp/dic/html/edit.html?name=" + encodeURI(encodeURI(dataname))+ "&type=" + datatype
	            })
			}
		});
		

		$("#plsc").click(function() {
			var datas=grid.getcheckrow();
			if(datas.length>0){
				newbootbox.alertInfo("请选中字典值再进行删除操作！");
			}else{
				var r = $("#gridcont_content input[type=checkbox]:checked");
				var rs = [];
				$.each(r, function(i) {
					rs.push(r[i].defaultValue);
				});
				if(r.length < 1) {
					newbootbox.alertInfo("请选中字典值再进行删除操作！");
				} else {
					newbootbox.confirm({
						 title: "提示",
					     message: "是否要进行删除操作？",
					     callback1:function(){
					    	 $ajax({
								url: delUrl,
								type: "GET",
								data: {"ids": rs.toString()},
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

var editfn = function(){
	var r = $(".check input[type=checkbox]:checked");
	if(r.length == 1) {
		var selectcheckbox = r.val();
		var selectcheckboxtype = selectcheckbox.split("&")[0];
		var selectcheckboxSpan=$(".check input[value^="+selectcheckboxtype+"]").next();
		var selectValue = [];
		for(var i = 0;i<selectcheckboxSpan.length; i++){
			selectValue.push($(selectcheckboxSpan[i]).text());
		}
		var selectcheckboxid = selectcheckbox.split("&")[1];
		//window.location.href="zdwh_edit.html?id=" + selectcheckboxid+"&value="+encodeURI(encodeURI(r.next().text()));
		newbootbox.newdialog({
			id:"addModal",
			width:880,
			height:600,
			header:true,
			title:"编辑",
			url:"/app/fyp/dic/html/zdwh_edit.html?id=" + selectcheckboxid+"&value="+encodeURI(encodeURI(r.next().text()))
        })
	} else {
		newbootbox.alertInfo("请选择一个字典项进行编辑！");
	}
}
