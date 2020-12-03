var listurl = {"url":"/app/fyp/reignCaseController/reignOnlineUserList","dataType":"text"};//表格数据
// http://127.0.0.1:11208/app/fyp/reignCaseController/reignOnlineUserList?afficheType=online
var grid = null;
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树
var type = getUrlParam('type')||"reign"

$('#type').val(type)
var pageModule = function () {
	var initgrid = function(){
		grid = $('#gridcont').createGrid({
			columns:[
			    {display:"序号",name:"index",width:"10%",align:"center",render:function(rowdata,n){
                    return n+1;
                }},
                {display:"姓名",name:"name",width:"20%",align:"center",render:function(rowdata,n){
                    return rowdata.userName;
                }},
                {display:"职务",name:"deptName",width:"25%",align:"left",render:function(rowdata){
                    return rowdata.post;
                }},
                {display:"手机号",name:"phone",width:"10%",align:"center",render:function(rowdata){
                    return rowdata.tel;
                }},
                {display:"房间号",name:"warrantyTime",width:"10%",align:"center",render:function(rowdata){
                    return rowdata.address;
                }},
                {display:"部门",name:"measures",width:"25%",align:"center",render:function(rowdata){
                    return rowdata.orgName;
                }}
             ],
			width:'100%',
            height:'100%',
			paramobj:{'afficheType':type},
			url : listurl
		});
	}
    var initUnitTree = function() {
        $ajax({
            url:deptTreeUrl,
            success:function(data){

                $("#tree_1").jstree({
                    "plugins": ["wholerow", "types"],
                    "core": {
                    "themes" : {
                        "responsive": false
                    },
                    "data": data,
                    },
                    "types" : {
                        "default" : {
                            "icon" : "peoples_img"
                        },
                        "file" : {
                            "icon" : "peoples_img"
                        },
                        "1" : {
                            "icon" : "people_img"
                        }
                    }
                });

                $("#tree_1").on("select_node.jstree", function(e,data) {
                    var id = $("#" + data.selected).attr("id");
                    grid.setparams({deptid:id,'afficheType':type});
                    grid.refresh();
                });
            }
        })
    }
	return {
		//加载页面处理程序
		initControl: function () {
		    initUnitTree();
			initgrid();
		},
        refreshGrid: function () {
            var id = $("#" + data.selected).attr("id");
		    type = $('#type').val()
            grid.setparams({deptid:id, 'afficheType': type});
            grid.refresh();
        }
	}
}();

function refreshfn (){
    pageModule.refreshGrid()
}

