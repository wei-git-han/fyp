/*
 * CssOffic的wps实现
 */
var officeType =2;
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
		var iframe = document.getElementById(tagID);
		var codes = []; 
		codes.push("<object name='webwps' id='webwps_id' type='application/x-wps'  " +
				"data='../../../css/js/office/template/normal.wpt'  width='100%'   wmode='opaque'  wmode='transparent'  " +
				"height='100%'> <param name='quality' value='high' /> <param name='Enabled' value='1' /> " +
				"<param name='allowFullScreen' value='true' /> <param name='bgcolor' value='#ffffff' /> " +
				"<param name='wmode' value='opaque' />  <param name='wmode' value='transparent' /> </object>");
		iframe.innerHTML = codes.join("");
		obj = document.getElementById("webwps_id");
		
		//wps加载完毕后的回调，对外统一使用onCssOfficeLoadEnd方法
		var Interval_control = setInterval(
			function(){
				var app = obj.Application;
				if(app && app.IsLoad()){
					clearInterval(Interval_control);
					this.plugin = app;
					
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
					 * 保存到本地
					 */
					this.saveAs = function() {
						this.plugin.saveAs();
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
						return this.plugin.ActiveDocument.Saved;
						// return true;//wps没有判断文档是否修改接口，默认修改
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
						var aa = this.plugin.Options.put_PrintHiddenText(true);
						var bb = this.plugin.Options.put_PrintDrawingObjects(true);
						this.plugin.Documents.GetDocument().PrintPreview();
					};
						
					/**
					 * 套打预览
					 */
					this.printSetPreview = function(){
						//设置为套打模式
						var aa = this.plugin.Options.put_PrintHiddenTextMode(0);
						var bb = this.plugin.Options.put_PrintDrawingObjects(false);
						this.plugin.Documents.GetDocument().PrintPreview();
					};
					
					/**
					 * 设置公文域内容
					 */
					this.setDocumentField = function(id,value){
						this.plugin.setDocumentMultiField(id,value,true);
					};
					
					/**
					 * 读取公文域内容
					 */
					this.getDocumentField = function(id){
						return this.plugin.getDocumentFieldValue(id);
					};
					/**
					 * 插入图片
					 */
					this.insertPicture = function(path){
						return this.plugin.insertPicture(path);
						//return this.plugin.ActiveDocument.Shapes.AddPicture(path);
					};
					
					/**
					 * 将图片设置四周环绕
					 */
					this.inlineShapes = function(){
						return this.plugin.Selection.ShapeRange.WrapFormat.put_Type(0);
					}
					
					/**
					 * 将图片悬浮于文字下方
					 */
					this.wdWrapSquared = function(){
						return this.plugin.Selection.ShapeRange.WrapFormat.put_Type(5);
					}
					/**
					 * 本地导出ofd
					 */
					this.ExportToOfd = function(fileName){
						return this.plugin.ExportToOfd("/tmp/"+fileName+".ofd");
					}
					
					
					/**
					 * 初始化成功后，将菜单栏中的部分按钮屏蔽掉
					 * @param appObj
					 * @returns
					 */
					hideWpsBtnAndMenu(this.plugin);
					
					onCssOfficeLoadEnd(this);
				}
		},200);
		
	};

	return this;
}

//wps隐藏部分菜单项和功能按钮
function hideWpsBtnAndMenu(appObj){
	// 获得菜单控制栏按钮域；
	var commandBars = appObj.get_CommandBars();
	var controls1 = commandBars.get_Item("file").get_Controls();
	var controls2 = commandBars.get_Item("standard").get_Controls();
	
	// 隐藏新建按钮；
	var nameNew = "新建(&N)...";
	var nameLocalNew = "本机上的模板(&M)...";
	var control1 = controls1.get_Item(nameNew);
	control1.put_Visible(false);
	var control2 = controls1.get_Item(nameLocalNew);
	control2.put_Visible(false);
	var control3 = controls2.get_Item(nameNew);
	control3.put_Visible(false);
	
	// 隐藏打开按钮；
	var nameOpen = "打开(&O)...";//"&Open...";
	controls1.get_Item(nameOpen).put_Visible(false);
	controls2.get_Item(nameOpen).put_Visible(false);
	
	// 隐藏保存按钮；
	var nameSave = "保存(&S)";//"&Save";//保存(&S)
//	var nameSaveAs = "另存为(&A)...";//"&Save &As...";
	var nameSaveWeb = "另存为网页(&G)...";//"&Save as Web Pa&ge...";
	var nameSaveAll = "保存所有文档(&E)";//"&Sav&e All";
//	//controls1.get_Item(nameSaveAs).put_Visible(false);
	controls1.get_Item(nameSaveWeb).put_Visible(false);
	controls1.get_Item(nameSaveAll).put_Visible(false);
	controls1.get_Item(nameSave).put_Visible(false);
	controls2.get_Item(nameSave).put_Visible(false);
	
	// 隐藏输出为PDF按钮，以后的标准都为OFD格式
	var namePDF = "输出为PDF格式(&F)...";//"&Export to PD&F...";//输出为PDF格式(&F)...;
	controls1.get_Item(namePDF).put_Visible(false);
	controls2.get_Item(namePDF).put_Visible(false);
	
	// 隐藏打印按钮
//	var namePrint = "打印(&P)...";
//	controls1.get_Item(namePrint).put_Visible(false);
//	controls2.get_Item(namePrint).put_Visible(false);
	
	// 隐藏打印预览按钮
//	var namePrintView = "打印预览(&V)";//"Print Pre&view";
//	controls1.get_Item(namePrintView).put_Visible(false);
//	controls2.get_Item(namePrintView).put_Visible(false);
//	commandBars.get_Item("Print Preview").put_Visible(false);
	
}
/*
 * CssOffic的wps实现
 */
var officeType =2;
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
		var iframe = document.getElementById(tagID);
		var codes = [];
		codes.push("<object name='webwps' id='webwps_id' type='application/x-wps'  " +
				"data='../../../css/js/office/template/normal.wpt'  width='100%'   wmode='opaque'  wmode='transparent'  " +
				"height='100%'> <param name='quality' value='high' /> <param name='Enabled' value='1' /> " +
				"<param name='allowFullScreen' value='true' /> <param name='bgcolor' value='#ffffff' /> " +
				"<param name='wmode' value='opaque' />  <param name='wmode' value='transparent' /> </object>");
		iframe.innerHTML = codes.join("");
		obj = document.getElementById("webwps_id");

		//wps加载完毕后的回调，对外统一使用onCssOfficeLoadEnd方法
		var Interval_control = setInterval(
			function(){
				var app = obj.Application;
				if(app && app.IsLoad()){
					clearInterval(Interval_control);
					this.plugin = app;

					/*
					 * 是否修改
					 */
					this.IsModified = function() {
						return true;//wps没有判断文档是否修改接口，默认修改
						//return this.plugin.ActiveDocument.Saved;
						//判断当前活动文档是否被编辑过
						// return this.plugin.ActiveDocument.IsDirty();
					};
					/*
					 * 打开文件
					 */
					this.openFile = function(url, readOnly) {
						this.plugin.openDocumentRemote(url, readOnly);
//加入加载动画
//						if(loading){loading(function(){
//							this.plugin.openDocumentRemote(url, readOnly);
//						})}else{
//							this.plugin.openDocumentRemote(url, readOnly);
//						}
					};
					/*
					 * 打开本地文件
					 */
					this.selectLocalFile = function() {
						this.plugin.openDocument();
					};
					/*
					 * 保存到本地
					 */
					this.saveAs = function() {
						this.plugin.saveAs();
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
						var aa = this.plugin.Options.put_PrintHiddenText(true);
						var bb = this.plugin.Options.put_PrintDrawingObjects(true);
						this.plugin.Documents.GetDocument().PrintPreview();
					};

					/**
					 * 套打预览
					 */
					this.printSetPreview = function(){
						//设置为套打模式
						var aa = this.plugin.Options.put_PrintHiddenTextMode(0);
						var bb = this.plugin.Options.put_PrintDrawingObjects(false);
						this.plugin.Documents.GetDocument().PrintPreview();
					};

					/**
					 * 设置公文域内容
					 */
					this.setDocumentField = function(id,value){
						this.plugin.setDocumentMultiField(id,value,true);
					};

					/**
					 * 读取公文域内容
					 */
					this.getDocumentField = function(id){
						return this.plugin.getDocumentFieldValue(id);
					};
					/**
					 * 插入图片
					 */
					this.insertPicture = function(path){
						return this.plugin.insertPicture(path);
						//return this.plugin.ActiveDocument.Shapes.AddPicture(path);
					};

					/**
					 * 将图片设置四周环绕
					 */
					this.inlineShapes = function(){
						return this.plugin.Selection.ShapeRange.WrapFormat.put_Type(0);
					}

					/**
					 * 将图片悬浮于文字下方
					 */
					this.wdWrapSquared = function(){
						return this.plugin.Selection.ShapeRange.WrapFormat.put_Type(5);
					}

					/**
					* @Title: .wps控件的保存事件前监听
					* @Description:
					* @TODO: 增加wps保存前检测
					* --------------------------------------
					* @Param:
					* @return:
					* @Author: jekyll14(zhang xiaoming)
					* @CreateTime: 2019/1/8 13:00
					*/
					// RegisterBeforeSaveEvent(this.plugin);
					/**
					* @Title: .wps控件完成文档打开后的事件监听
					* @Description:
					* @TODO:
					* --------------------------------------
					* @Param:
					* @return:
					* @Author: jekyll14(zhang xiaoming)
					* @CreateTime: 2019/1/8 13:37
					*/
					// RegisterOpenEvent(this.plugin);
					//这个方法还不好用
					// RegisterAfterSaveEvent(this.plugin);

					/**
					 * 初始化成功后，将菜单栏中的部分按钮屏蔽掉
					 * @param appObj
					 * @returns
					 */
					hideWpsBtnAndMenu(this.plugin);

					onCssOfficeLoadEnd(this);

				}
		},200);

	};

	return this;
}
/**
 * @Title: .注册wps控件的保存事件前监听
 * @Description:
 * @TODO: 增加wps保存前检测
 * --------------------------------------
 * @Param:
 * @return:
 * @Author: jekyll14(zhang xiaoming)
 * @CreateTime: 2019/1/8 13:00
 */
function RegisterBeforeSaveEvent(appObj)
{
	var ret = appObj.registerEvent("DIID_ApplicationEvents4","DocumentBeforeSave","DocumentBeforeSaveCallBack");
}
/** 
* @Title: .卸载wps控件的保存事件前监听
* @Description:  
* @TODO: 
* --------------------------------------
* @Param:  
* @return:  
* @Author: jekyll14(zhang xiaoming)
* @CreateTime: 2019/1/8 13:05
*/ 
function UnRegisterBeforeSaveEvent(appObj)
{
	var ret = appObj.unRegisterEvent("DIID_ApplicationEvents4","DocumentBeforeSave","DocumentBeforeSaveCallBack");
}
/**
* @Title: .wps控件保存前会掉函数
* @Description:可以做文档是否修改过的判断，弹出过场动画等动作，提高用户 体验
* @TODO:
* --------------------------------------
* @Param:
* @return:
* @Author: jekyll14(zhang xiaoming)
* @CreateTime: 2019/1/8 13:06
*/
function DocumentBeforeSaveCallBack(Doc, SaveAsUI, Cancel)
{
	//alert("用户点击保存后，wps还没有执行保存操作，需要弹出过场动画");
	//if(loading){loading()};
	//SaveAsUI.SetValue(true);
	// Cancel.SetValue(true);
}
/**
 * @Title: .注册wps控件的保存事件后监听
 * @Description:
 * @TODO: 保存后的事件不生效
 * --------------------------------------
 * @Param:
 * @return:
 * @Author: jekyll14(zhang xiaoming)
 * @CreateTime: 2019/1/8 13:00
 */
function RegisterAfterSaveEvent(appObj)
{
	var ret = appObj.registerEvent("DIID_ApplicationEvents4","DocumentSave","DocumentAfterSaveCallBack");
}
/**
 * @Title: .注册wps控件的保存事件后监听
 * @Description:
 * @TODO: 保存后的事件不生效
 * --------------------------------------
 * @Param:
 * @return:
 * @Author: jekyll14(zhang xiaoming)
 * @CreateTime: 2019/1/8 13:00
 */
function UnRegisterAfterSaveEvent(appObj)
{
	var ret = appObj.registerEvent("DIID_ApplicationEvents4","DocumentSave","DocumentAfterSaveCallBack");
}
/**
 * @Title: .wps控件保存后回调函数
 * @Description:可以做关闭过场动画
 * @TODO:保存后的事件不生效
 * --------------------------------------
 * @Param:
 * @return:
 * @Author: jekyll14(zhang xiaoming)
 * @CreateTime: 2019/1/8 13:06
 */
function DocumentAfterSaveCallBack(Doc, SaveAsUI, Cancel)
{
	//alert("用户保存完成，关闭过场动画。");
	//console.log("保存完成 关闭动画")
	//SaveAsUI.SetValue(true);
	// Cancel.SetValue(true);
}

/**
 * @Title: .注册wps控件打开文档监听
 * @Description:
 * @TODO:
 * --------------------------------------
 * @Param:
 * @return:
 * @Author: jekyll14(zhang xiaoming)
 * @CreateTime: 2019/1/8 13:00
 */
function RegisterOpenEvent(appObj)
{
	var ret = appObj.registerEvent("DIID_ApplicationEvents4","DocumentOpen","DocumentOpenCallBack");
}
/**
 * @Title: .卸载wps控件打开文档监听
 * @Description:
 * @TODO:
 * --------------------------------------
 * @Param:
 * @return:
 * @Author: jekyll14(zhang xiaoming)
 * @CreateTime: 2019/1/8 13:00
 */
function UnRegisterOpenEvent(appObj)
{
	var ret = appObj.registerEvent("DIID_ApplicationEvents4","DocumentOpen","DocumentOpenCallBack");
}
/**
 * @Title: .wps控件打开文档后回调函数
 * @Description:可以做关闭过场动画
 * @TODO:
 * --------------------------------------
 * @Param:
 * @return:
 * @Author: jekyll14(zhang xiaoming)
 * @CreateTime: 2019/1/8 13:06
 */
function DocumentOpenCallBack(Doc, SaveAsUI, Cancel)
{
	//alert("用户完成打开文档，需要关闭过场动画");
	//SaveAsUI.SetValue(true);
	// Cancel.SetValue(true);
}

//wps隐藏部分菜单项和功能按钮
function hideWpsBtnAndMenu(appObj){
	// 获得菜单控制栏按钮域；
	var commandBars = appObj.get_CommandBars();
	var controls1 = commandBars.get_Item("file").get_Controls();
	var controls2 = commandBars.get_Item("standard").get_Controls();
	
	// 隐藏新建按钮；
	var nameNew = "新建(&N)...";
	var nameLocalNew = "本机上的模板(&M)...";
	var control1 = controls1.get_Item(nameNew);
	control1.put_Visible(false);
	var control2 = controls1.get_Item(nameLocalNew);
	control2.put_Visible(false);
	var control3 = controls2.get_Item(nameNew);
	control3.put_Visible(false);
	
	// 隐藏打开按钮；
	var nameOpen = "打开(&O)...";//"&Open...";
	controls1.get_Item(nameOpen).put_Visible(false);
	controls2.get_Item(nameOpen).put_Visible(false);
	
	// 隐藏保存按钮；
	var nameSave = "保存(&S)";//"&Save";//保存(&S)
//	var nameSaveAs = "另存为(&A)...";//"&Save &As...";
	var nameSaveWeb = "另存为网页(&G)...";//"&Save as Web Pa&ge...";
	var nameSaveAll = "保存所有文档(&E)";//"&Sav&e All";
//	//controls1.get_Item(nameSaveAs).put_Visible(false);
	controls1.get_Item(nameSaveWeb).put_Visible(false);
	controls1.get_Item(nameSaveAll).put_Visible(false);
	controls1.get_Item(nameSave).put_Visible(false);
	controls2.get_Item(nameSave).put_Visible(false);
	
	// 隐藏输出为PDF按钮，以后的标准都为OFD格式
	var namePDF = "输出为PDF格式(&F)...";//"&Export to PD&F...";//输出为PDF格式(&F)...;
	controls1.get_Item(namePDF).put_Visible(false);
	controls2.get_Item(namePDF).put_Visible(false);
	
	// 隐藏打印按钮
//	var namePrint = "打印(&P)...";
//	controls1.get_Item(namePrint).put_Visible(false);
//	controls2.get_Item(namePrint).put_Visible(false);
	
	// 隐藏打印预览按钮
//	var namePrintView = "打印预览(&V)";//"Print Pre&view";
//	controls1.get_Item(namePrintView).put_Visible(false);
//	controls2.get_Item(namePrintView).put_Visible(false);
//	commandBars.get_Item("Print Preview").put_Visible(false);
	
}
