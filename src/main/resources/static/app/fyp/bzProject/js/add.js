var saveUrl= {"url":"","dataType":"text"};  //save
var dicturl = {"url":"","dataType":"text"}; //下拉框字典值
var UserTreeUrl = {"url":"","dataType":"text"}; //单位树

var pageModule = function(){
	/* 问题来源字典值 */
	var initdictionary = function(){
		$ajax({
			url:dicturl,
			success:function(data){
				if(data.code!=500){
					initselect("a",data.a);
				}
				
			}
		});
	}
	
	//单位树
	var initUnitTree = function(){
		$("#unit").createSelecttree({
			url :UserTreeUrl,
			width : '100%',
			success : function(data, treeobj) {},
			selectnode : function(e, data) {
				$("#unit").val(data.node.text);
				$("#unitId").val(data.node.id);
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
		
		$("#commentForm").validate({
			ignore:'',
		    submitHandler: function() {
			    var elementarry = [""];
				var paramdata = getformdata(elementarry);
				/* paramdata.id = $("#id").val(); */
				$ajax({
					url:saveUrl,
					data:paramdata,
					type:'post',
					success:function(data){
						
					}
				})
		    },
		    errorPlacement: function(error, element) {
	    	 	if($(element).parent().hasClass("selecttree")){
	    	 		error.appendTo(element.parent().parent().parent()); 
	    	 	}else{
	    	 		error.appendTo(element.parent());  
	    	 	}
		     }
		});
		
		//保存
		$("#save").click(function(){
			$("#commentForm").submit();
		});
		
		//重置
		$("#reset").click(function(){
			
		});
		
		//取消
		$("#close").click(function(){
			newbootbox.newdialogClose("addModal");
		});
	}

	return{
		//加载页面处理程序
		initControl:function(){
			initother();
			initdictionary();
		}
	};
	
}();



