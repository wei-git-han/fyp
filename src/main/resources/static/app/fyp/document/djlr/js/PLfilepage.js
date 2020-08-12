var dicUrl = {"url":rootPath +"/documentdic/getDicByTypet","dataType":"text"}; //返回的下拉框字典值
var fileNameArry = [];
var docTypeName = '';
var securityClassification = '';
var urgencyDegree = '';
var pageModule = function(){
	var initother = function(){
	    $("#period").attr("readonly","readonly");
		$("#uploadFile").click(function(){
			$("#file").click();
			$("#file").change(function(){
				fileNameArry = Array.from($(this).context.files);//$(this).val().split("\\");
				var fileName = "";
				if(fileNameArry.length==1){
					fileName=fileNameArry[0].name;
				}else if(fileNameArry.length>1){
//					fileName=fileNameArry[fileNameArry.length-1];
					fileNameArry.map(function(item,index){
						fileName = fileName+(item.name+"<br>")
					})
				}
				$(".fileinput-filename").html(fileName);
			})
		})
		$("#docTypeId").change(function(){
			docTypeName = $("#docTypeId option:checked").text();
			$("#docTypeName").val(docTypeName);
			$("#period").val("");
            if ($(this).val() == "4") {
                $("#period").removeAttr("readonly");
            } else {
                $("#period").attr("readonly","readonly");
            }
		})
		$("#securityId").change(function(){
			securityClassification = $("#docTypeId option:checked").text();
			$("#securityClassification").val(securityClassification);
		})
		$("#urgencyId").change(function(){
			urgencyDegree = $("#docTypeId option:checked").text();
			$("#urgencyDegree").val(urgencyDegree);
		})
		$("#shangchuan2").click(function(){			
			var val = $("#file").val();
			var array = val.split("\\");
			var filename = "";
			if(array.length==1){
				filename = array[0];
			}else{
				filename = array[array.length-1];
			}
			var filetype = filename.split(".")[filename.split(".").length-1];
//			if(filetype != 'xls' && filetype != 'xlsx'){
//				newbootbox.alertInfo("请上传正确格式的文件！");
//				return;
//			}
			if(!docTypeName){
				newbootbox.alertInfo("请选择类别！");
				return;
			}else if(fileNameArry.length==0){
				newbootbox.alertInfo("请选择文件！");
				return;
			}
			window.parent.lodaingControl('show')
			$("#docTypeName").val($("#docTypeId option:checked").text());
	    	$("#securityClassification").val($("#securityId option:checked").text());
	    	$("#urgencyDegree").val($("#urgencyId option:checked").text());
			var ajax_option ={
					type: "post",
					url:"/app/db/documentinfo/uploadFiles",//默认是form action
					contentType:false,
					processData:false,
					beforeSend:function(){
						console.log("0000")
					},
					xhr:function(){
						var myXhr = new XMLHttpRequest();//$.ajaxSettings.xhr();
						if(myXhr.upload){
							myXhr.upload.addEventListener('progress',function(e){
								console.log(e,"4444",e.loaded,e.total)
								if(e.lengthComputable){
									var percent = Math.floor((e.loaded/e.total)*100)
									console.log(percent,"%%%%%%")
									$(".progress-bar").css("width",percent+"%")
								}
							})
//							myXhr.upload.onprogress = function(evt){
//								percent = (evt.loaded/evt.total).toFixed(2)
//								console.log(evt,percent,"000",evt.lengthComputable)
//							};
//							myXhr.upload.addEventListener('load',function(e){
//								console.log("fish")
//							},false)
						}
						return myXhr
					},
					success:function(data){
						window.parent.lodaingControl('hide')
						if(data.result == "success"){
							if(data.msg){
								newbootbox.alertInfo(data.msg);
							}else{
								newbootbox.alertInfo('导入成功！');
							}
							newbootbox.newdialogClose("PLfileDr");
							$("#iframe1",window.top.document).attr("src","/app/db/document/djlr/html/djlr.html?fileFrom=djlr");
							window.top.blfkfn();
						}else{
							newbootbox.alertInfo('导入失败！');
						}
				}
			}
			$('#form2').ajaxSubmit(ajax_option);
			
		})
		
		$("#close").click(function(){
			newbootbox.newdialogClose("PLfileDr");
		})
		
	}
	
	//请求各字典数据
	var initdictionary = function(){
		$ajax({
			url:dicUrl,
			data:{dicType:"all"},
			success:function(data){
				if(data.code!=500){
					initselect1("docTypeId",data.document_type);
					initselect("securityId",data.security_classification);
					initselect("urgencyId",data.urgency_degree);
				}
			}
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
var xhrOnProgress = function(fun){
	xhrOnProgress.onprogress = fun;
	return function(){
		var xhr = $.ajaxSettings.xhr();
		if(typeof xhrOnProgress.onprogress !== "function")
			return xhr
		if(xhrOnProgress.onprogress && xhr.upload){
			xhr.upload.onprogress = xhrOnProgress.onprogress;
		}
		return xhr
	}
}