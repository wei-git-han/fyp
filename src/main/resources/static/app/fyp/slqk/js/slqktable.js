var listUrl = {"url":"/fyp/feedbackhear/list","dataType":"text"};//表格数据
var deptTreeUrl = {"url":"/app/base/dept/tree","dataType":"text"}; //单位树（调用方法暂时被注释）
var userTreeUrl = {"url":"/app/base/user/tree","dataType":"text"}; //人员树（调用方法暂时被注释）
var delUrl = {"url":"/fyp/feedbackhear/delete","dataType":"text"};//删除
var isAdminUrl = {"url":"/fyp/roleedit/getRole","dataType":"text"}; //人员树
var grid = null;

var pageModule = function () {
	var initgrid = function(){
		grid = $("#gridcont").createGrid({
				columns:[
						{display:"硬件/软件名称",name:"name",width:"16%",align:"center",render:function(rowdata,n){
							return rowdata.softName;
						}},
						{display:"问题描述",name:"desc",width:"14%",align:"center",render:function(rowdata,n){
							return rowdata.desc;                                         
						}},
						{display:"提出时间",name:"submitTime",width:"10%",align:"center",render:function(rowdata){
							return rowdata.submitTime;                                         
						}},
						{display:"提出单位",name:"submitUserName",width:"10%",align:"center",render:function(rowdata){
							return rowdata.submitDeptName;
						}},
						{display:"提出人",name:"submitUserName",width:"6%",align:"center",render:function(rowdata){
							return rowdata.submitUserName;                                         
						}},
						{display:"解决时限",name:"solveTime",width:"10%",align:"center",render:function(rowdata){
							return rowdata.solveTime;                                         
						}},
						{display:"工作进展",name:"march",width:"10%",align:"center",render:function(rowdata){
							return rowdata.march;                                         
						}},
						{display:"状态",name:" status",width:"10%",align:"center",render:function(rowdata){
							if(rowdata.status == "0"){
                                return "需求论证";
                            }else if(rowdata.status == "1"){
                                return "需求细化";
                            }else if(rowdata.status == "2"){
                                return "解决中";
                            }else if(rowdata.status == "3"){
                                return "已解决待升级";
                            }else if(rowdata.status == "4"){
                                return "已关闭";
                            }else{
                                return "";
                            }
						}},
						{display:"问题分类",name:"type",width:"14%",align:"center",render:function(rowdata){
							// if(rowdata.type == "0"){
                            //     return "系统问题";
                            // }else if(rowdata.type == "1"){
                            //     return "完善建议";
                            // }else{
                            //     return "";
                            // }
						    return rowdata.type;
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
	
	//树
	var initUnitTree = function(){
		//单位
		$("#submitDeptName").createSelecttree({
			url :deptTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#submitDeptName").val(data.node.text);
				$("#submitDeptId").val(data.node.id);
			}
		});
		
		//提出人
		$("#submitUserName").createUserTree({
			url :userTreeUrl,
			width : '193px',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#submitUserName").val(data.node.text);
				$("#submitUserId").val(data.node.id);
			}
		}); 
	}
	
	var initother = function(){
		$("#form3").validate({
		    submitHandler: function() {
		    	$("#dialogzz").show();
		    	$("#dialogzz").css("display","table");
				var ajax_option ={
					type: "post",
					url:"/fyp/feedbackhear/import",
					success:function(data){
						$("#dialogzz").hide();
						if(data.result == "success"){
							newbootbox.alert('上传成功！').done(function(){
								initgrid();
							});
						}else{
							newbootbox.alert("上传失败！"); 
						}
					}
				}
				$('#form3').ajaxSubmit(ajax_option);
		   }
		});
		
		/*导入 */
		$("#uploadFile").click(function(){
			$("#file").unbind("click");
			$("#file").unbind("change");
			$("#file").click();
			$("#file").change(function(){
				$("#form3").submit();
			});
		});
		

		/*下载 */
		$("#downloadBtn").click(function(){
			window.location.href = "/app/fyp/common/downLoadFile.xlsx";
		});
		
		
		$(".date-picker").datepicker({
		    language:"zh-CN",
		    rtl: Metronic.isRTL(),
		    orientation: "",
		    autoclose: true
		});
		$(".input-group-btn").click(function(){
			$(this).prev().focus();
		});
		
		/*搜索 */
		$("#sure").click(function(){
			var elementarry = ["submitDeptId","submitDeptName","submitUserId","submitUserName","status","submitTimeBegin","submitTimeEnd","desc"];
			grid.setparams(getformdata(elementarry));
			grid.refresh();
		});
		
		//重置
		$("#reset").click(function(){
			removeInputData(["submitDeptId","submitDeptName","submitUserId","submitUserName","status","submitTimeBegin","submitTimeEnd","desc"]);
		    initgrid();
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
		/* 硬软件名称管理 */
        $("#nameManageBtn").click(function(){
            newbootbox.newdialog({
                id:"nameManageModal",
                width:1000,
                height:800,
                header:true,
                title:"硬/软件名称管理",
                url:"nameManage.html",
            })
        });
        /* 问题分类管理 */
        $("#issueClassifyBtn").click(function(){
            newbootbox.newdialog({
                id:"issueClassifyModal",
                width:1000,
                height:800,
                header:true,
                title:"问题分类管理",
                url:"issueClassify.html",
            })
        });
	}
	function isAdmin() {
		$ajax({
			url: isAdminUrl,
			type: "GET",
			success: function(data) {
				if(data.flag!='1') {
					$('.adminDiv').show()
					$('.userDiv').hide()
				}else{
					$('.adminDiv').hide()
					$('.userDiv').show()
				}
			}
		})
	}
    return {
        //加载页面处理程序
        initControl: function () {
			initgrid();
			initUnitTree();
			initother();
			isAdmin()
        },
        initgrid:function(){
            initgrid();
        }
    }
}();

