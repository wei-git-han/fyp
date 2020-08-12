/*
 * CssOffic的永中实现
 */
var officeType =1;

function CssOffice() {
	this.divId = null;
	this.plugin = null;
	this.fileInput = null;
	/*
	 * 初始化
	 */
	this.init = function(tagID, width, height) {
		var obj;
		this.divId = tagID;
		var oapplet = document.getElementById(tagID);
		var codes=[];
		if (getOSInfo()) {
			oapplet.innerHTML = "<APPLET archive='yozoapplet.jar' code='com.yozosoft.office.applet.YOZODTApplet.class' "
				+ " width="
				+ width
				+ " height="
				+ height
				+ " codebase='/app/gwcl/css/js/office/plugin' MAYSCRIPT=true id ='EIOWebOffice'>";
			+"<PARAM name='java_arguments' value='-Dsun.java2d.d3d=false -Xmx512m'></APPLET>";
			this.plugin = document.getElementById("EIOWebOffice");
		} else {
			var obj;
			codes.push("<embed id='webyozo_id' type='application/yozo-plugin' width='100%' height='100%'>");
			oapplet.innerHTML = codes.join("");
			obj = document.getElementById("webyozo_id");
			
			//yozo加载完毕后的回调，对外统一使用onCssOfficeLoadEnd方法
			var Interval_control = setInterval(
				function(){
					if(obj != null){
						clearInterval(Interval_control);
						this.plugin = obj;
						/*
						 * 打开文件
						 */
						this.openFile = function(url, readOnly) {
							this.plugin.openDocumentRemote(url, readOnly);
						};
						/*
						 * 打开本地文件
						 */
						this.selectLocalFile = function() {
							this.plugin.openDocument();
						};
						/*
						 * 设置菜单栏是否显示
						 */
						this.setToolbarAllVisible = function(enable) {
							this.plugin.setToolbarAllVisible(enable);
						};
						/*
						 * 远程保存
						 */
						this.saveURL = function(url, fileName) {
							var activeObj = this.plugin;
							//获取token
							$.ajax({
								url:rootPath + "/draft/getAccessToken",
								type: "GET",
								success:function(data){
									if (url.indexOf("?") != -1){
										url += "&fileName=" + fileName;
										url += "&access_token=" + data.token;
									}else{
										url += "?fileName=" + fileName;
										url += "&access_token=" + data.token;
									}
									activeObj.saveURL(url, fileName);
								}
							});
						};
						/*
						 * 是否修改
						 */
						this.IsModified = function() {
							return this.plugin.IsModified();
						};
						
						/*
						 * 设置是否为修订模式
						 */
						this.enableRevision = function(enable) {
							//开启或者停止修订,true:开启 ,false:停止
							this.plugin.enableRevision(enable);
						};
						
						/**
						 * 打印预览
						 */
						this.printPreview = function(){
							//设置为普通打印模式
							if(this.plugin.getApp().getWorkbooks().getActiveWorkbook().getDocuments().getActiveDocument() != null){
								this.plugin.getApp().getWorkbooks().getActiveWorkbook().getDocuments().getActiveDocument().getPrintPreview().preview();
							}
						};
							
						/**
						 * 套打预览
						 */
						this.printSetPreview = function(){
							//设置为套打模式
							if(this.plugin.getApp().getWorkbooks().getActiveWorkbook().getDocuments().getActiveDocument() != null){
								this.plugin.getApp().getWorkbooks().getActiveWorkbook().getDocuments().getActiveDocument().getPrintPreview().preview();
							}
						};
						
						/**
						 * 设置公文域内容
						 */
						this.setDocumentField = function(id,value){
							this.plugin.setDocumentField(id,value);
						};
						
						/**
						 * 增加公文域
						 */
						this.insertDocumentField = function(id){
							this.plugin.insertDocumentField(id);
						};
						//插入图片
						this.insertPicture = function(path){
							//return this.plugin.insertPicture(path);永中暂无
						};
						/**
						 * 本地导出ofd
						 */
						this.ExportToOfd = function(fileName){
							debugger;
							return this.plugin.ExportToOfd("C:\\"+fileName+".ofd");
						}
						
						onCssOfficeLoadEnd(this);
					}
			},200);
		}
	};
	/*
	 * 打开文件
	 */
	this.openFile = function(url, readOnly) {
		this.plugin.openDocumentRemote(url, readOnly);
	};
	/*
	 * 打开本地文件
	 */
	this.selectLocalFile = function() {
		this.plugin.openDoc();
	};
	/*
	 * 设置菜单栏是否显示
	 */
	this.setToolbarAllVisible = function(enable) {
		this.plugin.setToolbarAllVisible(enable);
	};
	/*
	 * 远程保存
	 */
	this.saveURL = function(url, fileName) {
		if (url.indexOf("?") != -1)
			url += "&fileName=" + fileName;
		else
			url += "?fileName=" + fileName;
		this.plugin.saveURL(url, fileName);
	};
	/*
	 * 是否修改
	 */
	this.IsModified = function() {
		return this.plugin.IsModified();
	};

	/*
	 * 设置是否为修订模式
	 */
	this.enableRevision = function(enable) {
		this.plugin.enableRevision(enable);
//		var enabled = false;
//		while (!enabled) {
//			try {
//				//判断文档是否是修改模式，由于打开文档时多线程，因此存在判断失败。需要使用try/catch
//				if (!this.plugin.getApp().getWorkbooks().getActiveWorkbook()
//						.getDocuments().getActiveDocument().isTrackRevision()) {
//					this.plugin.enableRevision(enable);
//					enabled = true;
//				}
//			} catch (e) {
//			}
//		}
	};

	/**
	 * 打印预览
	 */
	this.printPreview = function(){
		//设置为普通打印模式
		if(this.plugin.getApp().getWorkbooks().getActiveWorkbook().getDocuments().getActiveDocument() != null){
			this.plugin.getApp().getWorkbooks().getActiveWorkbook().getDocuments().getActiveDocument().getPrintPreview().preview();
		}
	};
		
	/**
	 * 套打预览
	 */
	this.printSetPreview = function(){
		//设置为套打模式
		if(this.plugin.getApp().getWorkbooks().getActiveWorkbook().getDocuments().getActiveDocument() != null){
			this.plugin.getApp().getWorkbooks().getActiveWorkbook().getDocuments().getActiveDocument().getPrintPreview().preview();
		}
	};
	
	/**
	 * 设置公文域内容
	 */
	this.setDocumentField = function(id,value){
		this.plugin.setDocumentField(id,value);
	};
	
	/**
	 * 增加公文域
	 */
	this.insertDocumentField = function(id){
		this.plugin.insertDocumentField(id);
	};
	
	return this;
}

/*
 * 永中加载完毕后的回调，对外统一使用onCssOfficeLoadEnd方法
 */
function afterLaunchOffice() {
	try {
		onCssOfficeLoadEnd();
	} catch (e) {
	}
}


//获取操作系统信息
function getOSInfo(){
	var sUserAgent = navigator.platform;
	if (sUserAgent == 'Win32' || sUserAgent == "Windows") {
		return true;
	} else {
		return false;
	}
}