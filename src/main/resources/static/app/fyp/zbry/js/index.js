var listurl = {"url":"/dict/getAllUserList","dataType":"text"};//表格数据
var list2url = {"url":"/dict/getAllUser","dataType":"text"};//表格数据
var hideUrl = {url:"/dict/insertConfigUser",type:'text'}
var noId = ""
// var pageModule = function () {
// 	var initgrid = function(){
// 		$('#gridcont').treegrid({
// 			columns : [ [
// 					{title : '序号',field : 'rownum',width : 1,align : 'center'},
// 					{title : '姓名',field : 'TRUENAME',width : 10,align : 'left'},
// 					{title:'是否列入统计范围',field:'dictType',width:10,align:'center',formatter:function(value,rowdata){
// 						if(rowdata.dictType=='1'){
// 							return '<input type="checkbox" name="doType" value="'+rowdata.USER_ID +'" id="'+rowdata.USER_ID+'" data-name="'+rowdata.TRUENAME +'">'
// 						}else{
// 							return '<input type="checkbox" name="doType" checked value="'+rowdata.USER_ID +'" id="'+rowdata.USER_ID+'" data-name="'+rowdata.TRUENAME +'">'
// 						}
// 			    	}}
// 				 ] ],
// 			width : $('#gridcont').parent().width(),
// 			height : $('#gridcont').parent().height(),
// 			rownumbers : false,
// 			animate : true,
// 			autoRowHeight : false,
// 			pagination : true,
// 			pageSize : 20,
// 			pageList : [ 5, 10, 20, 30 ],
// 			fitColumns : true,
// 			url : listurl.url,
// 			async : true,
// 			idField : 'id',
// 			treeField : 'name',
// 			loadingMessage : '请等待……',
// 			loadMsg : '请稍等……',
// 			onBeforeExpand : function(row) {
// 				// console.log(row.id)
// 				noId = row.id;
// 				$('#gridcont').treegrid('options').url =  list2url.url+'?id='+noId
// 			},
// 			onLoadSuccess:function(row){
// 				$('[name="doType"]').bootstrapSwitch({
// 					  onText:'已统计',
// 					  offText:'不统计',
// 					  size:'small',
// 					  onSwitchChange:function (event,state) {
// 						  var type= state?'统计状态！':'不统计状态！';
// 						  var typeNum = state?'0':'1'
// 						  var data = {userids:this.value,type:typeNum};
// 						  var name = this.dataset.name
// 						  $ajax({
// 							  url:hideUrl,
// 							  data:data,
// 							  success:function (res) {
// 								  newbootbox.alertInfo(name+'已修改为'+type).done(function () {
// 									  initgrid();
// 								  })
// 							  }
// 						  })
// 					  }
// 				  })
// 			},
// 			loadFilter:function (data,parentId) {
// 				// console.log(data,parentId)
// 				return data.rows
// 			}
// 		});
// 	}
//
//     return {
//         //加载页面处理程序
//         initControl: function () {
// 			initgrid();
//         },
//         initgrid:function(){
//             initgrid();
//         }
//     }
// }();

var pageModule = function () {
	var initgrid = function(){
		$('#gridcont').treegrid({
			columns : [ [
//				{title : '序号',field : 'rownum',width : 1,align : 'center'},
				{title : '名称',field : 'name',width : 10,align : 'left'},
				{title:'是否在编',field:'dictType',width:10,align:'center',formatter:function(value,rowdata){
						if(rowdata.type=='1'){
							if(rowdata.dictType=='1'){
								return '<input type="checkbox" name="doType" value="'+rowdata.id +'" id="'+rowdata.id+'" data-name="'+rowdata.name +'">'
							}else{
								return '<input type="checkbox" name="doType" checked value="'+rowdata.id +'" id="'+rowdata.id+'" data-name="'+rowdata.name +'">'
							}
						}
					}}
			] ],
			width : $('#gridcont').parent().width(),
			height : $('#gridcont').parent().height(),
			rownumbers : true,
			animate : true,
			autoRowHeight : false,
			pagination : true,
			pageSize : 20,
			pageList : [ 5, 10, 20, 30 ],
			fitColumns : true,
			url : listurl.url,
			async : true,
			idField : 'id',
			treeField : 'name',
			loadingMessage : '请等待……',
			loadMsg : '请稍等……',
			// loader:function(){
			// 	return false
			// },
			onBeforeExpand : function(row) {
				// console.log(row.id)
				noId = row.id;
				$('#gridcont').treegrid('options').url =  list2url.url
 			},
			onLoadSuccess:function(row){
				$('[name="doType"]').bootstrapSwitch({
					onText:'在编',
					offText:'不在编',
					size:'small',
					onSwitchChange:function (event,state) {
						var type= state?'在编状态！':'不在编状态！';
						var typeNum = state?'0':'1'
						var data = {userids:this.value,type:typeNum};
						var name = this.dataset.name
						$ajax({
							url:hideUrl,
							data:data,
							success:function (res) {
								newbootbox.alertInfo(name+'已修改为'+type).done(function () {
									initgrid();
								})
							}
						})
					}
				})
			},
			loadFilter:function (data,parentId) {
				return data.rows
			}
		});
	}

	return {
		//加载页面处理程序
		initControl: function () {
			initgrid();
		},
		initgrid:function(){
			initgrid();
		},
		refreshPage: function() {
            location.reload()
        }
	}
}();

