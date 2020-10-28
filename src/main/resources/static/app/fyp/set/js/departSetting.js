var listurl = {"url":"/dict/findConfigDept","dataType":"text"};//表格数据
var delUrl = {"url":"/fyp/roleedit/delete","dataType":"text"};//删除
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //人员树
var url_userlist ={"url":"/roleuser/userlist","dataType":"text"}; //获取指定部门下的用户
var grid = null;
var hideUrl = {url:"/dict/insertConfigDept",type:'text'}
var pageModule = function () {
	/*var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"单位名称",name:"deptName",width:"70%",align:"center",render:function(rowdata){
							return rowdata.text;
						}},
						{display:"是否列入统计范围",name:"do",width:"30%",align:"center",render:function(rowdata){
							if(rowdata.dictType=='1'){
								return '<input type="checkbox" name="doType" value="'+rowdata.id +'" id="'+rowdata.id+'" data-name="'+rowdata.text +'">'
							}else{
								return '<input type="checkbox" name="doType" checked value="'+rowdata.id +'" id="'+rowdata.id+'" data-name="'+rowdata.text +'">'
							}
						}}
					 ],
			width:'100%',
			height:'100%',
			checkbox: true,
			rownumberyon:true,
			paramobj:{},
			overflowx:false,
			pageyno:false,
			url: listurl,
		    loadafter:function(data){
				  $('[name="doType"]').bootstrapSwitch({
					  onText:'已统计',
					  offText:'不统计',
					  // onColor:'success',
					  // offColor:'warning',
					  size:'small',
					  onSwitchChange:function (event,state) {
						  // console.log(this.value)
						  // console.log(this.dataset.name)
						  // console.log(state)
						  // var url = state?showUrl:hideUrl;
						  var type= state?'统计状态！':'不统计状态！';
						  var typeNum = state?'0':'1'
						  var data = {deptids:this.value,type:typeNum};
						  var name = this.dataset.name
						  $ajax({
							  url:hideUrl,
							  data:data,
							  success:function (res) {
								  newbootbox.alertInfo(name+'已修改为'+type).done(function () {
									  grid.refresh();
								  })
							  }
						  })
					  }
				  })
			  }
	   });
	}*/
	
	
	var initgrid = function(){
		$('#gridcont').treegrid({
			columns : [ [
					{title : '序号',field : 'rownum',width : 1,align : 'center'},
					{title : '单位名称',field : 'name',width : 10,align : 'left'},
					{title:'是否列入统计范围',field:'dictType',width:10,align:'center',formatter:function(value,rowdata){
						if(rowdata.dictType=='1'){
							return '<input type="checkbox" name="doType" value="'+rowdata.id +'" id="'+rowdata.id+'" data-name="'+rowdata.name +'">'
						}else{
							return '<input type="checkbox" name="doType" checked value="'+rowdata.id +'" id="'+rowdata.id+'" data-name="'+rowdata.name +'">'
						}
			    	}}
				 ] ],
			width : $('#gridcont').parent().width(),
			height : $('#gridcont').parent().height(),
			rownumbers : false,
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
			onBeforeExpand : function(row) {
				var id = row.id;
				var type = row.lx;
				$.ajax({
					url : url_userlist,
					data : {id : id,type : type},
					success : function(data) {
						if (!data) {
							return;
						}
						for ( var i in data) {
							var id_tmp = data[i]['id'];
							var data_tmp = data[i];
							$('#datagrid-row-r1-2-' + id_tmp).remove();
						}
						$('#gridcont').treegrid('append', {parent:id,data:data});
					}
				});
			},
			onLoadSuccess:function(row){
				$('[name="doType"]').bootstrapSwitch({
					  onText:'已统计',
					  offText:'不统计',
					  size:'small',
					  onSwitchChange:function (event,state) {
						  var type= state?'统计状态！':'不统计状态！';
						  var typeNum = state?'0':'1'
						  var data = {deptids:this.value,type:typeNum};
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
			}
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
        initgrid:function(){
            initgrid();
        }
    }
}();

