/**
 * shuwen	数科服务以及页签切换公用方法
 * @time 2017-08-29
 */
var ocx = null;
/**
* @Title: 当前文档中的签章或签名个数
* @Author: jekyll14(zhang xiaoming)
* @CreateTime: 2019/1/11 21:15
*/
var sealcountinofdfile = 0;


/**
 * 初始化数科插件，打开pdf文档
 * 
 * @param filePath
 *            文件路径
 * @param webPath
 *            域名
 */
function openOFDFile(filePath, areaDivId,width,height, optionType) {
	if (filePath != '' && filePath != null) {
		/*$("#hidemodal").show();
		$('#suwellOfdLoading').show();*/
		ocx = suwell.ofdReaderInit(areaDivId, "100%", "100%");
		if (ocx) {
			ocx.registListener("f_open", "openperform", false);
			ocx.openFile(filePath, false);
			ocx.registListener("f_open", "openafterform", true);
			//隐藏工具栏，导航栏
			ocx.setCompsiteVisible("navigator",false);
			//ocx.setCompsiteVisible('toolbar',false);
			// 设定插件区域自适应宽度
//			ocx.performClick("vzmode_fitwidth");
			//缩放倍数
			ocx.setScale(100);
			//启动签批模式
			//ocx.performClick("t_tablet/signpen_05mm");
			// 隐藏打开本地文件按钮
			ocx.setCompsiteVisible('f_open',false);
			// 隐藏保存按钮
			ocx.setCompsiteVisible('f_save',false);
			// 隐藏打印按钮
			/*if (optionType == 'hidePrint') {
				ocx.setCompsiteVisible('f_print',false);
			}*/
			// 隐藏顺时针旋转90度
			ocx.setCompsiteVisible('v_rotateclock',true);
			// 隐藏逆时针旋转90度
			ocx.setCompsiteVisible('v_rotateanti',true);
			//签章栏
//			ocx.setCompsiteVisible("toolbar_seal",false);
			//基础工具栏 选择复制工具放开
			//ocx.setCompsiteVisible("toolbar_basetool",false);
			//放大镜工具浪
			ocx.setCompsiteVisible("toolbar_zoom",false);
			//文本工具栏
			ocx.setCompsiteVisible("toolbar_document",false);
			// 文本注解工具栏
			if(typeof(fileFrom)!="undefined" && fileFrom!=""  && fileFrom!=null){
				/*if(wenjiantype!="bwly" && (fileFrom=="gwgl"||fileFrom=="wsh"||fileFrom=="gwlz"||fileFrom=="trgwb_gwlz"||fileFrom=="trgwb_wsh")){*/
					ocx.setCompsiteVisible("toolbar_annott",true);
					ocx.setCompsiteVisible("tt_highlight",true);
					ocx.setCompsiteVisible("tt_underline",false);
					ocx.setCompsiteVisible("tt_deleteline",false);
					ocx.setCompsiteVisible("tt_wavyline",false);
					ocx.setCompsiteVisible("t_freetext",true);
				/*}else{
					ocx.setCompsiteVisible("toolbar_annott",false);
					ocx.setCompsiteVisible("t_freetext",false);
				}*/
			}else{
				ocx.setCompsiteVisible("toolbar_annott",false);
				ocx.setCompsiteVisible("t_freetext",false);
			}
			//
			ocx.setCompsiteVisible("toolbar_edit",false);
			// 隐藏全屏手写签批
//			if (optionType != 'showTablet') {
//				ocx.setCompsiteVisible("toolbar_tablet",false);
//			}
			// 隐藏图形注解工具栏
			ocx.setCompsiteVisible("toolbar_annotp",false);
			//隐藏区域手写签批
			ocx.setCompsiteVisible("t_tabletdlg",false);
			//隐藏区域手写签批
			ocx.setCompsiteVisible("t_tablet",false);
			//隐藏区域手型工具（阅读模式）
			ocx.setCompsiteVisible("t_handtool",false);
            //注册保存事件的监听
			ocx.registListener("f_saveurl", "openperform", false);
			ocx.registListener("f_saveurl", "saveaftertodo", true);
		}
	}
}

/**
 * 克隆已经初始化的数科打开文档区域，使其在页签切换的时候能正常打开，不再重新初始化
 */
function cloneDiv(pluginID, hiddenID) {
	if ($("#" + pluginID).html() != null && $("#" + pluginID).html() != "") {
		var oldOfdDiv = document.getElementById(pluginID);
		var newOfdDiv = document.adoptNode(oldOfdDiv);
		$(newOfdDiv).find("embed").height(1);
		$("#" + hiddenID).append(newOfdDiv);
	}
}

function fromCloneDivOpenFile(pluginID, hiddenID, showAreaId,height){
	if ($("#" + hiddenID).html() != null && $("#" + hiddenID).html() != "") {
		var oldOfdDiv = $("#" + pluginID)[0];
		var newOfdDiv = document.adoptNode(oldOfdDiv);
		$(newOfdDiv).find("embed").height(height);
		$("#" + showAreaId).append(newOfdDiv);
	}
}
var saveafter = null;
//版式文件的新保存方法，有提示动画的
function savetoremote(url,fn){
	/*$("#hidemodal").show(function(){
		$('#suwellOfdLoading').show(function(){
			
			//if(fn){fn(ret)};
		})
	});*/
	if(fn){saveafter = fn};
	ocx.saveFile(url);
}
/**
* @Title: .获取ofd文档自打开后增加的签章或签名个数
* @Description:>0则需要执行保存
* @TODO:
* --------------------------------------
* @Param:
* @return:  incrementalsealcount：增加的签章或签名个数
* @Author: jekyll14(zhang xiaoming)
* @CreateTime: 2019/1/11 20:55
*/
function incrementalseal(){
	var incrementalsealcount;
	if(ocx!=null){
		//与文档打开后获取的签章个数做比较，以确定是否需要对此文件进行保存
		var SignaturesCount = ocx.getSignaturesCount();
		if(SignaturesCount == null || typeof (SignaturesCount) == "undefined" || $.trim(SignaturesCount) == ""){
			SignaturesCount = 0;
		}
		incrementalsealcount = SignaturesCount - sealcountinofdfile;
	}
	return incrementalsealcount;
}

function saveOfdFile(){
	var tokenAccess = "";
	var opinionContent = $("#opinionContent").val();
	var oid = $("#id").val();
	//获取token
	$.ajax({
		url:rootPath + "/draft/getAccessToken",
		type: "GET",
		success:function(data){
			tokenAccess = data.token;
			//数科插件保存内容
			var url=location.protocol+"//"+location.host+"/servlet/suwell/save?recordId=" + id + "&access_token=" + tokenAccess;
			var ret = ocx.saveFile(url);
			var fileName = id + ".ofd";
			//更新版式文件ID
			if(ret){
				$ajax({
					url:save,
					data:{id:oid,documentId:documentId,opinionType:'3',opinionContent:encodeURI(opinionContent),fileName:fileName},
					type: "GET",
					success:function(data){
						if(data.result == "success"){
							$ajax({
								url:update,
								data:{id:id,status:'1'},
								type: "GET",
								success:function(data){
									bootbox.dialog({
										message: "保存待交档操作成功！",
								        title: "提示",
							            buttons: {
								            success: {
								                label: "确定",
								                className: "btn-primary",
								                callback: function() {
								                	window.location.href="fhgz.html";
								                }
								            }
							            }
							        });
								}
							});
						}
					}
				});
			}
		}
	});
}
/**
* @Title: 数科控件的打开文件前，保存开始后的过场动画
* @Description:
* @TODO:
* --------------------------------------
* @Param:
* @return:
* @Author: jekyll14(zhang xiaoming)
* @CreateTime: 2019/1/12 0:49
*/
function openperform() {
	/*$("#hidemodal").show();//添加遮罩层
	$('#suwellOfdInitDiv').attr("style", "visibility:inline");
	$('#suwell').show();
	$('#suwellOfdLoading').show();*/
}
/**
* @Title: 数科控件的打开文件后的处理方法
* @Description:
* @TODO:
* --------------------------------------
* @Param:
* @return:
* @Author: jekyll14(zhang xiaoming)
* @CreateTime: 2019/1/12 0:50
*/
function openafterform() {
		//更新当前文档的签章或签名个数，以待版式文件保存时做比较
		if(ocx!=null){
			sealcountinofdfile = ocx.getSignaturesCount();
		}
		//回调中隐藏导航栏,打开隐藏不起用,需回调隐藏
		ocx.setCompsiteVisible("navigator",false);
		/*$("#hidemodal").hide();//隐去遮罩层
		$('#suwellOfdInitDiv').attr("style", "visibility:inline");
		$('#suwell').show();
		$('#suwellOfdLoading').hide();*/
}
/** 
* @Title: .数科控件的保存完成后的处理方法
* @Description:  
* @TODO: 
* --------------------------------------
* @Param:  
* @return:  
* @Author: jekyll14(zhang xiaoming)
* @CreateTime: 19-1-21 下午2:48
*/ 
function saveaftertodo() {
		//更新当前文档的签章或签名个数，以待版式文件保存时做比较
		if(ocx!=null){
			sealcountinofdfile = ocx.getSignaturesCount();
		}
		/*$("#hidemodal").hide();//隐去遮罩层
		$('#suwellOfdInitDiv').attr("style", "visibility:inline");
		$('#suwell').show();
		$('#suwellOfdLoading').hide();*/
		if(saveafter!=null){
			saveafter();
			saveafter = null;
		}
}