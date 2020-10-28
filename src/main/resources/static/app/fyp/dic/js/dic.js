var url1 = {"url":"/app/fyp/dic/data/zdwh_list.json","dataType":"text"};
//var delUrl = {"url":"/app/fyp/dic/data/deletezdx.json","dataType":"text"};
var slqkUrl = {url:'/dict/list',"dataType":"text"};     // 查询软硬名称和问题分类的接口
var delUrl = {"url":"/dict/delete","dataType":"text"};//删除

var grid = null;
var pageModule = function() {
	var initgrid = function() {
		/*grid = $("#gridcont").createGrid({
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
		});*/
        initRyjName();
        initWtfl();
	}
    var initRyjName = function () {
    		$ajax({
    			url:slqkUrl,
    			data:{type:0,limit:100,page:1},
    			success:function (data) {
    				renderData('tabledatarowcol01',0,data.data.rows)
    			}
    		})
    	}
    var initWtfl = function () {
        $ajax({
            url:slqkUrl,
            data:{type:1,limit:100,page:1},
            success:function (data) {
                console.log(data)
                renderData('tabledatarowcol11',1,data.data.rows)
            }
        })
    }
    var renderData = function(id,type, data) {
        $('#'+id).empty()
        for (var i=0;i<data.length;i++) {
           $('#'+id).append('<span style="cursor:pointer;" class="check"><input value="'+data[i].id+'" type="checkbox" data-type="'+type+'" data-name="'+data[i].dictName+'">&nbsp;<span>'+data[i].dictName+'</span></span>&nbsp;&nbsp;&nbsp;&nbsp;')
        }
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
            var datas = $(".checkboxes:checked");
			if(datas.length < 1) {
				newbootbox.alertInfo("请选择名称进行字典值添加！");
			} else if(datas.length > 1) {
				newbootbox.alertInfo("请选择一条数据进行添加！");
			} else {
				var dataname = $(".checkboxes:checked").attr('data-name');
				var type = 0
				if (dataname == '问题种类') {
				    type = 1
				}
				newbootbox.newdialog({
					id:"addModal",
					width:880,
					height:600,
					header:true,
					title:"新增",
					url:"/app/fyp/dic/html/edit.html?name=" + encodeURI(encodeURI(dataname)) + '&type=' + type
	            })
			}
		});
		

		$("#plsc").click(function() {
			 var datas = $(".check input[type=checkbox]:checked");
			if(datas.length < 0){
				newbootbox.alertInfo("请选中字典值再进行删除操作！");
			} else if (datas.length > 1) {
                newbootbox.alertInfo("请选择单个字典值进行删除操作！");
			}else{
				var r = $(".check input[type=checkbox]:checked");
				var rs = [];
				$.each(r, function(i) {
					rs.push($(r[i]).val());
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
                                    data: {"id": rs.toString()},
                                    success: function(data) {
                                        if(data.msg == "success") {
                                            newbootbox.alertInfo('删除成功！').done(function(){
                                                initgrid();
                                            });
                                        }else{
                                            newbootbox.alertInfo("删除失败！");
                                        }
                                    }
                              })
                         }
                    })
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
			initgrid();
		}
	}

}();

var editfn = function(){
	var r = $(".check input[type=checkbox]:checked");
	if(r.length == 1) {
		var id = r.val(),
		name = r.attr('data-name');
		type = r.attr('data-type');
		newbootbox.newdialog({
			id:"addModal",
			width:880,
			height:600,
			header:true,
			title:"编辑",
			url:"/app/fyp/dic/html/zdwh_edit.html?id=" + id+"&name="+encodeURI(encodeURI(name)) + '&type='+type
        })
	} else {
		newbootbox.alertInfo("请选择一个字典项进行编辑！");
	}
}
