/**
 * 扫描仪控件，单独对扫描仪进行封装的方法，与项目相关的数据、方法，请尽量不要写到里面;
 * 
 * 这里封装了两类的扫描仪初始化代码，因为有部分页面，一个页面中需要有两个地方初始化扫描仪，所以在改动这里的代码时，请注意需要同时修改两套初始化逻辑；
 * 
 * 注意：
 * 1、如果有一个页面，需要初始化多个扫描仪，需要将扫描仪的型号公用；
 * 2、其他的扫描仪初始化数据的id，需要与第一个的有区别，不能相同，name可以相同，id不能相同，因为扫描仪需要根据id的不同来对name属性进行赋值；
 * 3、注意代码逻辑的合理性，避免重复的代码，或者有问题的逻辑出现；
 */
LANGUAGE["Simplified Chinese"]["Scanner Connecting"] = "正在识别扫描仪……";

//预览弹窗大小
var imgDialogSize = new Array();
imgDialogSize["width"] = 1050;
imgDialogSize["height"] = 750;

//定义支持的语言方式
var Supported_Languages = {
	0 : "English",
	1 : "Traditional",
	2 : "Simplified Chinese"
};
//默认使用简体中文
var language = Supported_Languages[2];
//定义语言logo，目前集成网站，使用不到扫描仪官方提供的logo
//var CompanySignList = {
//	"English" : "image/background.gif",
//	"Traditional" : "image/background.gif",
//	"Simplified Chinese" : "image/KeTu.png"
//};
//var CompanySign = CompanySignList[language];

//默认扫描仪的服务名称为：69KU;
var defaultDeviceName = "69KU";

//扫描仪相关页面初始化
function PageInit() {
	//初始化扫描仪服务 Receive Device Name
	document.getElementById("List").options.length = 0;
	var varItem = new Option("科图扫描仪", defaultDeviceName);
	document.getElementById("List").options.add(varItem);
	
	var deviceName = document.getElementById("List").value;
	if (deviceName == null || deviceName == ''|| deviceName == '科图扫描仪'  || deviceName.length <= 0) {
		deviceName = defaultDeviceName;
	}
	//初始化扫描方式
	AddSel("sel_source", SELECT_STR[SPEC[deviceName]]["source"]);
	document.getElementById("sel_source").value = "ADF Front";
	
	//初始化分辨率
	AddSel("sel_resolution", SELECT_STR[SPEC[deviceName]]["resolution"]);
	document.getElementById("sel_resolution").value = "300";
	
	//默认A4纸
	if (SPEC[deviceName] == "type3") {
		AddSel("sel_paper-size", SELECT_STR[SPEC[deviceName]]["paper-size"][document.getElementById("sel_source").value]);
		document.getElementById("sel_paper-size").value = "A4";
	} else {
		AddSel("sel_paper-size", SELECT_STR[SPEC[deviceName]]["paper-size"]);
		document.getElementById("sel_paper-size").value = "A4";
	}
	
	//初始化扫描模式
	AddSel("sel_mode", SELECT_STR[SPEC[deviceName]]["mode"]);
	document.getElementById("sel_mode").value = "Color";
	
	//扫描仪关于部分的页面加载，集成系统使用不到，暂时注释掉
//	document.getElementById("view4").style.height = document.getElementById("view1").offsetHeight + "px";
	//扫描仪demo右侧按钮部分初始化，集成系统使用不到，暂时注释掉
//	document.getElementById("right").style.height = (document.getElementById("view1").offsetHeight * 1.2) + "px";
	//扫描仪驱动加载，初始化
	var PreviewObj = new PreviewImg();
	//亮度初始化
	document.getElementById("range_brightness").value = "-5";
	//对比度初始化
	document.getElementById("range_contrast").value = "50";
	//图像质量初始化
	document.getElementById("range_quality").value = "75";
	//图像质量初始化
	document.getElementById("range_borderfill").value = "20";
	//if (language == "Simplified Chinese") {
		//document.getElementById("right").parentNode.removeChild(document.getElementById("right"));
		//document.getElementById("btn_Preview").parentNode.removeChild(document.getElementById("btn_Preview"));
	//}
	var cookieVal = getCookie(defaultDeviceName);
	if ((deviceName == null || deviceName == '' || deviceName == '科图扫描仪' || deviceName.length <= 0) ||  (cookieVal == null || cookieVal == '' || cookieVal.length <= 0)) {
		if (fScan) {
			fScan = false;
		}
		Connection("GetDevicesList", RecvData, "GetDevicesList");
	}
}

//初始化表单数据方法
function AddSel(id, data) {
	var List = data.split(",");
	var varItem;
	var str;
	document.getElementById(id).options.length = 0;
	for (j = 0; j < List.length; j++) {
		if (LANGUAGE[language] === undefined) {
			if (language = "English") {
				str = List[j];
			}
		} else {
			str = LANGUAGE[language][List[j]];
			if ((str === undefined) || (str == "")) {
				str = List[j];
			}
		}
		varItem = new Option(str, List[j]);
		document.getElementById(id).options.add(varItem);
	}
}
//初始化下拉列表数据
function AddListSel(data) {
	var List = data.split(",");
	var varItem;
	var str;
	document.getElementById("List").options.length = 0;
	for (j = 0; j < List.length; j++) {
		if (List[j] != "") {
			str = List[j].split(" ");
			if (language == "Simplified Chinese") {
				varItem = new Option("科图扫描仪", str[1]);
			} else {
				varItem = new Option(str[1], str[1]);
			}
			document.getElementById("List").options.add(varItem);
		}

	}
}
// 用来判断是否已经弹出预览页面
var hasPopUpPreviewPage = false;
var imgDialog = null;
var fileNameStrs = "";//记录接收到的日志
var showPreviewImageFlag = true;//判断showPreviewImage方法是否能执行
var imgOrder = 0;
function RecvData(obj) {
	var isNeedPreview = $("#isNeedPreview").val();
	if (obj.ret == 1) {
		RecvStatus(obj.status);
		// 如果需要弹出预览页面，进行图片筛选，则进行弹出，扫描一张获取一张的文件名：
		if (obj.filename != null && obj.filename != "") {
			//隐藏控件放值
			RecvFileName(obj.filename);
			fileNameStrs += obj.filename + ",";
			
			if(isNeedPreview == 'true'){
				if(!hasPopUpPreviewPage){
					//还原弹窗用的html
					setDialog_html();
					imgOrder = 0;
					
					hasPopUpPreviewPage = true;
					imgDialog = $.ligerDialog.open({
						id: "imgPage",
						title: "扫描件预览",
						target: $("#imgDialog"),
						isHidden: false,
						height : imgDialogSize["height"],
				        width : imgDialogSize["width"],
				        onClose:function(){
				        	setDialog_html();
				        }
				    });
				}
				if(showPreviewImageFlag){
					showPreviewImageFlag = false;
					showPreviewImage2();
				}
			}
		}
	} else if (obj.ret == 0) {
		switch (obj.command) {
		case "GetDevicesList":
			RecvDeviceName(obj.data);
			ChangeScanData(document.getElementById("List").value);
			break;
		case "GetImageList":
			CloseStatus(obj);
			//扫描完成后，会执行这的内容方法
			if (isNeedPreview != 'true') {
				getSmwjStreamData();
			}
			break;
		case "GetPreview":
			PreviewObj = obj.data;
			if (document.getElementById("view_f").className == "buttonD") {
				PreviewObj.ShowPreviewImage("can_view", 0);
			} else {
				PreviewObj.ShowPreviewImage("can_view", 1);
			}
			break;
		case "RmFiles":
			break;
		case "GetFileList":
			alert("FileList=" + obj.data);
			break;
		}
	} else {
		CloseStatus(obj);
		//alert(obj.data);
		//RecvStatus(-5);
		//扫描仪驱动加载，初始化
//		if (fScan) {
//			fScan = false;
//		}
//		Connection("GetDevicesList", RecvData, "GetDevicesList");
	}
}

/**
 * 获得扫描生成的文件名
 * @param data
 */
function RecvFileName(data) {
	document.getElementById("text_filename").innerHTML = document.getElementById("text_filename").innerHTML + "," + data;
}

// 获取扫描仪服务的名称，设置到页面的下拉列表；
function RecvDeviceName(data) {
	AddListSel(data);
}

//改变下拉列表数据的触发方法
function ChangeScanData(DeviceName) {
	if (DeviceName == '' || DeviceName == null || DeviceName == '科图扫描仪') {
		DeviceName = defaultDeviceName;
	}
	AddSel("sel_source", SELECT_STR[SPEC[DeviceName]]["source"]);
	document.getElementById("sel_source").value = "ADF Front";
	if (SPEC[DeviceName] == "type3") {
		AddSel("sel_paper-size", SELECT_STR[SPEC[DeviceName]]["paper-size"][document.getElementById("sel_source").value]);
		document.getElementById("sel_paper-size").value = "A4";
	} else {
		AddSel("sel_paper-size", SELECT_STR[SPEC[DeviceName]]["paper-size"]);
		document.getElementById("sel_paper-size").value = "A4";
	}

	//默认扫描模式
	AddSel("sel_mode", SELECT_STR[SPEC[DeviceName]]["mode"]);
	document.getElementById("sel_mode").value = "Color";

	//默认分辨率
	AddSel("sel_resolution", SELECT_STR[SPEC[DeviceName]]["resolution"]);
	document.getElementById("sel_resolution").value = "300";

	//默认亮度
	document.getElementById("range_brightness").value = -5;
	//默认对比度
	document.getElementById("range_contrast").value = 50;
	//默认图像质量
	document.getElementById("range_quality").value = 75;
	//补边
	document.getElementById("range_borderfill").value = 20;
	//默认自动裁切
	document.getElementById("chk_swcrop").checked = true;
	//默认自动框正
	document.getElementById("chk_swdeskew").checked = true;

	cookieStr = getCookie(DeviceName);
	if (cookieStr != "") {
		var cookieArray = cookieStr.split('&');
		document.getElementById("sel_source").value = ArraySearch(cookieArray, "source");
		if (document.getElementById("sel_source").value == "Flatbed") {
			AddSel("sel_paper-size", SELECT_STR[SPEC[DeviceName]]["paper-size"][document.getElementById("sel_source").value]);
		}
		document.getElementById("sel_paper-size").value = ArraySearch(cookieArray, "paper-size");
		document.getElementById("sel_mode").value = ArraySearch(cookieArray, "mode");
		document.getElementById("sel_resolution").value = ArraySearch(cookieArray, "resolution");
		document.getElementById("range_brightness").value = ArraySearch(cookieArray, "brightness");
		document.getElementById("range_contrast").value = ArraySearch(cookieArray, "contrast");
		document.getElementById("range_quality").value = ArraySearch(cookieArray, "quality");
		document.getElementById("range_borderfill").value = ArraySearch(cookieArray,"borderfill");

		if (ArraySearch(cookieArray, "swcrop") == "true") {
			document.getElementById("chk_swcrop").checked = true;
		} else {
			document.getElementById("chk_swcrop").checked = false;
		}

		if (ArraySearch(cookieArray, "swdeskew") == "true") {
			document.getElementById("chk_swdeskew").checked = true;
		} else {
			document.getElementById("chk_swdeskew").checked = false;
		}
	}
}

/**
 * 改变扫描方式的下拉数据触发方法
 * @param source
 */
function ChangeSource(source) {
	if (SPEC[document.getElementById("List").value] == "type3") {
		AddSel("sel_paper-size", SELECT_STR[SPEC[document.getElementById("List").value]]["paper-size"][document.getElementById("sel_source").value]);
		//默认A4纸
		document.getElementById("sel_paper-size").value = "A4";
	}
}

//扫描仪的扫描按钮方法
function Scan() {
	sleep(100);
	//加载不到扫描仪，这里进行提示
//	if (document.getElementById("List").selectedIndex == -1 || getCookie(document.getElementById("List").value) == null || document.getElementById("List").value == '' || document.getElementById("List").value.length <= 0) {
//		//RecvStatus(-5);
//		//扫描仪驱动加载，初始化
//		if (fScan) {
//			fScan = false;
//		}
//		Connection("GetDevicesList", RecvData, "GetDevicesList");
//	}
//	if (fScan) {
//		fScan = false;
//	}
	//清空smwj的区域，避免垃圾数据
	if(document.getElementById("smwj")){
		document.getElementById("smwj").value = '';
	}
	if(document.getElementById("addsmwj")){
		document.getElementById("addsmwj").value = '';
	}
	if(document.getElementById("pssmwj")){
		document.getElementById("pssmwj").value = '';
	}
	//设置预览弹窗大小
	setImgDialogSize();
	//每次点击按钮的时候，首先清空页面隐藏域存放图片地址的区域，避免取到旧的数据
	if(document.getElementById("text_filename")){
		document.getElementById("text_filename").innerHTML = '';
	}
	//判断是否有数据，如果有数据，提醒用户是否覆盖
	if (document.getElementById("smjid")) {
		if(document.getElementById("smjid").value != null && document.getElementById("smjid").value != "" && 
				document.getElementById("scCpjSmjId") && (document.getElementById("scCpjSmjId").value == null || 
				document.getElementById("scCpjSmjId").value == "")){
			scanEventExp();
		}else{
			if(document.getElementById("scCpjSmjId") && document.getElementById("scCpjSmjId").value != null 
					&& document.getElementById("scCpjSmjId").value != ""){
					top.Dialog.confirm("您确定使用扫描件,原有上传文件将会被覆盖？",function(){
						scanEventExp();
					});
			} else {
				scanEventExp();
			}
		}
	} else {
		scanEventExp();
	}
}

function scanEventExp(){
	//设定状态
	RecvStatus(0);
	str = "SetParams?";
	str += "device_name=" + document.getElementById("List").value;
	str += "&source=" + document.getElementById("sel_source").value;
	str += "&scanmode=scan";
	str += "&paper-size=" + document.getElementById("sel_paper-size").value;
	str += "&resolution=" + document.getElementById("sel_resolution").value;
	str += "&mode=" + document.getElementById("sel_mode").value;
	str += "&borderfill=" +document.getElementById("range_borderfill").value;
	str += "&brightness=" + document.getElementById("range_brightness").value;
	str += "&contrast=" + document.getElementById("range_contrast").value;
	str += "&quality=" + document.getElementById("range_quality").value;
	str += "&swcrop=" + document.getElementById("chk_swcrop").checked;
	str += "&swdeskew=" + document.getElementById("chk_swdeskew").checked;
	setCookie(document.getElementById('List').value, str.substring(10, str.length), 365);
	//扫描仪可使用状态，初始化
	Connection("GetImageList", RecvData, str);
}

/**
 * 预览按钮事件，demo中没有使用，系统集成时也用不到，暂时不使用
 */
function Preview() {
	if (document.getElementById("List").selectedIndex == -1) {
		alert(GetStr(language, "Scanner Not Found"));
		return;
	}
	str = "SetParams?";
	str += "device_name=" + document.getElementById("List").value;

	str += "&scanmode=preview";
	str += "&paper-size=" + document.getElementById("sel_paper-size").value;
	str += "&source=" + document.getElementById("sel_source").value;
	str += "&resolution=100";// + document.getElementById("sel_resolution").value;
	str += "&mode=" + document.getElementById("sel_mode").value;
	str += "&brightness=" + document.getElementById("range_brightness").value;
	str += "&contrast=" + document.getElementById("range_contrast").value;
	str += "&quality=" + document.getElementById("range_quality").value;
	str += "&borderfill=" +document.getElementById("range_borderfill").value;
	str += "&swcrop=" + document.getElementById("chk_swcrop").checked;
	str += "&swdeskew=" + document.getElementById("chk_swdeskew").checked;
	
	Connection("GetPreview", RecvData, str);

}

function setSmjMask(status, message) {
	var maskId = "maskLoading";
	var dialogId = "dialogIdLoding";
	if(status == 0){
		if (document.getElementById(dialogId)) {
			document.getElementById(dialogId).parentNode.removeChild(document.getElementById(dialogId));
		}
		if (document.getElementById(maskId)) {
			document.getElementById(maskId).parentNode.removeChild(document.getElementById(maskId));
		}
	}else{
		if(!document.getElementById("maskId") && !document.getElementById("dialogId")){
			if (document.getElementById(dialogId)) {
				document.getElementById(dialogId).parentNode.removeChild(document.getElementById(dialogId));
			}
			if (document.getElementById(maskId)) {
				document.getElementById(maskId).parentNode.removeChild(document.getElementById(maskId));
			}

			var maskDiv = document.createElement("div");
			maskDiv.id = maskId;
			maskDiv.style.position = "fixed";
			maskDiv.style.zIndex = "1";
			maskDiv.style.width = window.innerWidth + "px";
			maskDiv.style.height = window.innerHeight + "px";
			maskDiv.style.top = "0px";
			maskDiv.style.left = "0px";
			maskDiv.style.background = "gray";
			maskDiv.style.filter = "alpha(opacity=10)";
			maskDiv.style.opacity = "0.50";
			document.body.appendChild(maskDiv);

			//Dialog 
			var dialogDiv = document.createElement("div");
			dialogDiv.id = dialogId;
			dialogDiv.style.position = "fixed";
			dialogDiv.style.zIndex = "9999";
			dialogDiv.style.width = "200px";
			dialogDiv.style.height = "100px";

			dialogDiv.style.top = (parseInt(window.innerHeight) - 100) / 2 + "px";
			dialogDiv.style.left = (parseInt(window.innerWidth) - 200) / 2 + "px";
			dialogDiv.style.background = " #FFFFFF ";
			dialogDiv.style.border = "1px solid gray";
			dialogDiv.style.padding = "5px";
			dialogDiv.style.borderRadius = "5px";
			
			dialogDiv.innerHTML = "<div style='text-align:center;line-height:100px'>" + message + "</div>";
			document.body.appendChild(dialogDiv);
		}
	}
}

//关闭弹出框
function CloseStatus(obj) {
	var maskId = "mask";
	var dialogId = "dialogId";
	if (document.getElementById(dialogId)) {
		document.getElementById(dialogId).parentNode.removeChild(document.getElementById(dialogId));
	}
	if (document.getElementById(maskId)) {
		document.getElementById(maskId).parentNode.removeChild(document.getElementById(maskId));
	}
	return;
}

/**
 * demo中默认为亮度、对比度、图像质量 文本框赋值的方法，集成后，系统时不需要的，暂时不使用
 * @param value
 * @param id
 */
function changeValue(value, id) {
	document.getElementById(id).value = value;
}

/**
 * demo中使用进度条修改：补边、对比度、亮度、图像质量的方法；系统集成也用不到，暂时不使用
 * @param value
 * @param rang_id
 * @param max
 * @param min
 * @param text_id
 */
function changeRangeValue(value, rang_id, max, min, text_id) {
	if (parseInt(value) > max) {
		value = max;
		document.getElementById(text_id).value = value;
	} else if (parseInt(value) < min) {
		value = min;
		document.getElementById(text_id).value = value;
	}
	document.getElementById(rang_id).value = value;
}

/**
 * 正面、反面的按钮事件，demo中也没有使用，系统集成也用不到，暂时不使用
 */
function view_front() {
	document.getElementById("view_f").className = "buttonD";
	document.getElementById("view_b").className = "buttonU";
	PreviewObj.ShowPreviewImage("can_view", 0);
}

/**
 * 正面、反面的按钮事件，demo中也没有使用，系统集成也用不到，暂时不使用
 */
function view_back() {
	document.getElementById("view_f").className = "buttonU";
	document.getElementById("view_b").className = "buttonD";
	PreviewObj.ShowPreviewImage("can_view", 1);
}

/**
 * 初始化扫描仪机型名称下拉框的方法
 */
function GetDevicesList() {
	document.getElementById("List").options.length = 0;
	Connection("GetDevicesList", RecvData, "GetDevicesList");
}

/**
 * 初始化扫描状态，在扫描过成中，进行模态弹出窗口提示信息，避免扫描按钮，重新点击
 * @param status
 */
function RecvStatus(status) {
	var maskId = "mask";
	var dialogId = "dialogId";
	if (document.getElementById(dialogId)) {
		document.getElementById(dialogId).parentNode.removeChild(document.getElementById(dialogId));
	}
	if (document.getElementById(maskId)) {
		document.getElementById(maskId).parentNode.removeChild(document.getElementById(maskId));
	}

	var maskDiv = document.createElement("div");
	maskDiv.id = maskId;
	maskDiv.style.position = "fixed";
	maskDiv.style.zIndex = "1";
	maskDiv.style.width = window.innerWidth + "px";
	maskDiv.style.height = window.innerHeight + "px";
	maskDiv.style.top = "0px";
	maskDiv.style.left = "0px";
	maskDiv.style.background = "gray";
	maskDiv.style.filter = "alpha(opacity=10)";
	maskDiv.style.opacity = "0.50";
	document.body.appendChild(maskDiv);

	//Dialog 
	var dialogDiv = document.createElement("div");
	dialogDiv.id = dialogId;
	dialogDiv.style.position = "fixed";
	dialogDiv.style.zIndex = "9999";
	dialogDiv.style.width = "200px";
	dialogDiv.style.height = "100px";

	dialogDiv.style.top = (parseInt(window.innerHeight) - 100) / 2 + "px";
	dialogDiv.style.left = (parseInt(window.innerWidth) - 200) / 2 + "px";
	dialogDiv.style.background = " #FFFFFF ";
	dialogDiv.style.border = "1px solid gray";
	dialogDiv.style.padding = "5px";
	dialogDiv.style.borderRadius = "5px";
	if (status == 0) {
		dialogDiv.innerHTML = "<div style='text-align:center;line-height:100px'>"
				+ GetStr(language, "Connecting") + "...</div>";
	} else {
		dialogDiv.innerHTML = "<div style='text-align:center;line-height:100px'>"
			+ GetStr(language, "Scanning")
			+ "  "
			+ status.substr(7, 8)
			+ "  " + GetStr(language, "page") + "...</div>";
	}
	document.body.appendChild(dialogDiv); // Append <button> to <body>
}
/**
 * 设置cookie信息
 * @param c_name	cookie名称
 * @param value		cookie的值
 * @param expiredays	过期时间
 */
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + 365);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
/**
 * 获得cookie信息
 * @param c_name
 * @returns
 */
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			var str = unescape(document.cookie.substring(c_start, c_end));
			setCookie(c_name, str, 365);
			return str;
		}
	}
	return "";
}
function ArraySearch(buf, key) {
	var i;
	for (i = 0; i < buf.length; i++) {
		if (buf[i].indexOf(key) == 0) {
			return buf[i].substring(key.toString().length + 1, buf[i].lengh);
		}
	}
	return -1;
}
function GetStr(language, key) {
	if (LANGUAGE[language] === undefined) {
		if (language == "English") {
			return key;
		} else {
			alert("not support " + language);
		}
	} else if (LANGUAGE[language][key] === undefined) {
		return key;
	} else {
		return LANGUAGE[language][key];
	}
}

/**
 * 获取图片的流信息
 * @param thumbnail
 */
function getImageFile(thumbnail) {
	getImageFileStream(document.getElementById("text_Getfilename").value, thumbnail, "false", RecvData_demo);
};

function getStyle(obj) {
    return window.getComputedStyle ? window.getComputedStyle(obj) : obj.currentStyle;
}

/**
 * 扫描仪的Demo方法，解析获得的图片，在页面展示；系统集成时，不掉用demo方法；
 * @param obj
 */
function RecvData_demo(obj) {
	/*if (obj.data instanceof ArrayBuffer) {
		var bytes = new Uint8Array(obj.data);
		//向image区域放置扫描得到的图片，系统集成后，这里就不需要在放到页面图片区域类；
		var img = document.getElementById("image_view");
		img.src = 'data:image/jpeg;base64,' + encode(bytes);
		img.onload = function() {
			var windowheight = parseFloat(window.getComputedStyle(document.getElementById("view")).height);
			var windowwidth = parseFloat(window.getComputedStyle(document.getElementById("view")).width);
			if (img.height > windowheight) {
				var scale = windowheight / img.height;
			}
			if ((img.width * scale) > windowwidth) {
				var scale = windowwidth / img.width;
			}
			img.style.height = parseInt(img.height * scale) + "px";
		};
		img.onerror = function(stuff) {
			alert("Img Onerror:", stuff);
		};
	} else {
		if (obj.data.toString() == "error:file not found") {
			alert("找不到档案");
		} else {
			alert(obj.data);
		}
	}*/
	if (typeof obj.data == 'string') {
		if (obj.data.toString() == "error:file not found") {
			alert("找不到档案");
		} else {
			alert(obj.data);
		}
	} else {
		if (obj.data instanceof Array)
			bytes = obj.data;
		else
			bytes = new Uint8Array(obj.data);

		var img = document.getElementById("image_view");

		img.style.height = 'auto';
		img.style.width = 'auto';
		img.onload = function() {
			var windowheight = document.getElementById("view").clientHeight;
			var windowwidth = document.getElementById("view").clientWidth;

			var scale = 1;
			if (img.height > windowheight) {
				scale = windowheight / img.height;
			}
			if ((img.width * scale) > windowwidth) {
				scale = windowwidth / img.width;
			}
			img.style.height = parseInt(img.height * scale) + "px";
		};

		img.onerror = function(stuff) {
			alert("Img Onerror:", stuff);
		};

		img.src = 'data:image/jpeg;base64,' + encode(bytes);
	}
}
// 将图片进行进行base64格式转码
function encode(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	while (i < input.length) {
		chr1 = input[i++];
		chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
		chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output += keyStr.charAt(enc1) + keyStr.charAt(enc2)
				+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
	}
	return output;
}
//扫描仪处理程序避免频率过高，进行休眠某特定时长
function sleep(milliseconds) {
	var start = new Date().getTime();
	for ( var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}
//删除文件，需要重写该方法
function DelFile() {
	RmFiles(RecvData, document.getElementById("text_delfilename").value);
}

///////////////////////////////////////////////////////////////////////////////////////第二个扫描仪初始化设置开始//////////////////////////////////////////////////////////////////////////////////////////////////////
//第二或多个扫描仪的初始化方法
function PageMoreSmyInit() {
	//初始化扫描仪服务 Receive Device Name
	document.getElementById("List").options.length = 0;
	var varItem = new Option("科图扫描仪", defaultDeviceName);
	document.getElementById("List").options.add(varItem);
	
	var deviceName = document.getElementById("List").value;
	if (deviceName == null || deviceName == '' || deviceName == '科图扫描仪'  || deviceName.length <= 0) {
		deviceName = defaultDeviceName;
	}
	//初始化扫描方式
	AddSel("sel_source_v2", SELECT_STR[SPEC[deviceName]]["source"]);
	document.getElementById("sel_source_v2").value = "ADF Front";
	
	//初始化分辨率
	AddSel("sel_resolution_v2", SELECT_STR[SPEC[deviceName]]["resolution"]);
	document.getElementById("sel_resolution_v2").value = "300";
	
	//默认A4纸
	if (SPEC[deviceName] == "type3") {
		AddSel("sel_paper-size_v2", SELECT_STR[SPEC[deviceName]]["paper-size"][document.getElementById("sel_source_v2").value]);
		document.getElementById("sel_paper-size_v2").value = "A4";
	} else {
		AddSel("sel_paper-size_v2", SELECT_STR[SPEC[deviceName]]["paper-size"]);
		document.getElementById("sel_paper-size_v2").value = "A4";
	}
	
	//初始化扫描模式
	AddSel("sel_mode_v2", SELECT_STR[SPEC[deviceName]]["mode"]);
	document.getElementById("sel_mode_v2").value = "Color";
	
	var PreviewObj = new PreviewImg();
	//亮度初始化
	document.getElementById("range_brightness_v2").value = "-5";
	//对比度初始化
	document.getElementById("range_contrast_v2").value = "50";
	//图像质量初始化
	document.getElementById("range_quality_v2").value = "75";
	//补边
	document.getElementById("range_borderfill_v2").value = "20";
	
	//扫描仪驱动加载，初始化
	var cookieVal = getCookie(defaultDeviceName);
	if ((deviceName == null || deviceName == '' || deviceName == '科图扫描仪'  || deviceName.length <= 0) ||  (cookieVal == null || cookieVal == '' || cookieVal.length <= 0)) {
		if (fScan) {
			fScan = false;
		}
		Connection("GetDevicesList", RecvDataPS, "GetDevicesList");
	}
}

function RecvDataPS(obj) {
	if (obj.ret == 1) {
		RecvStatus(obj.status);
		RecvFileNamePS(obj.filename);
	} else if (obj.ret == 0) {
		switch (obj.command) {
		case "GetDevicesList":
			RecvDeviceName(obj.data);
			ChangeScanDataPS(document.getElementById("List").value);
			break;
		case "GetImageList":
			CloseStatus(obj);
			//扫描完成后，会执行这的内容方法
			getPSSmwjStreamData();
			break;
		case "GetPreview":
			PreviewObj = obj.data;
			if (document.getElementById("view_f").className == "buttonD") {
				PreviewObj.ShowPreviewImage("can_view", 0);
			} else {
				PreviewObj.ShowPreviewImage("can_view", 1);
			}
			break;
		case "RmFiles":
			break;
		case "GetFileList":
			alert("FileList=" + obj.data);
			break;
		}
	} else {
		CloseStatus(obj);
		//扫描仪驱动加载，初始化
//		if (fScan) {
//			fScan = false;
//		}
//		Connection("GetDevicesList", RecvDataPS, "GetDevicesList");
	}
}

/**
 * 获得扫描生成的文件名
 * @param data
 */
function RecvFileNamePS(data) {
	document.getElementById("text_filename_v2").innerHTML = document
			.getElementById("text_filename_v2").innerHTML + "," + data;
}

//改变下拉列表数据的触发方法
function ChangeScanDataPS(DeviceName) {
	if (DeviceName == '' || DeviceName == null || DeviceName == '科图扫描仪') {
		DeviceName = defaultDeviceName;
	}
	AddSel("sel_source_v2", SELECT_STR[SPEC[DeviceName]]["source"]);
	document.getElementById("sel_source_v2").value = "ADF Front";

	if (SPEC[DeviceName] == "type3") {
		AddSel("sel_paper-size_v2", SELECT_STR[SPEC[DeviceName]]["paper-size"][document.getElementById("sel_source_v2").value]);
		document.getElementById("sel_paper-size_v2").value = "A4";
	} else {
		AddSel("sel_paper-size_v2", SELECT_STR[SPEC[DeviceName]]["paper-size"]);
		document.getElementById("sel_paper-size_v2").value = "A4";
	}

	//默认扫描模式
	AddSel("sel_mode_v2", SELECT_STR[SPEC[DeviceName]]["mode"]);
	document.getElementById("sel_mode_v2").value = "Color";

	//默认分辨率
	AddSel("sel_resolution_v2", SELECT_STR[SPEC[DeviceName]]["resolution"]);
	document.getElementById("sel_resolution_v2").value = "300";

	//默认亮度
	document.getElementById("range_brightness_v2").value = -5;
	//默认对比度
	document.getElementById("range_contrast_v2").value = 50;
	//默认图像质量
	document.getElementById("range_quality_v2").value = 75;
	//补边
	document.getElementById("range_borderfill_v2").value = 20;
	//默认自动裁切
	document.getElementById("chk_swcrop_v2").checked = true;
	//默认自动框正
	document.getElementById("chk_swdeskew_v2").checked = true;

	cookieStr = getCookie(DeviceName);
	if (cookieStr != "") {
		var cookieArray = cookieStr.split('&');
		document.getElementById("sel_source_v2").value = ArraySearch(cookieArray, "source");
		if (document.getElementById("sel_source_v2").value == "Flatbed") {
			AddSel("sel_paper-size_v2", SELECT_STR[SPEC[DeviceName]]["paper-size"][document.getElementById("sel_source_v2").value]);
		}
		document.getElementById("sel_paper-size_v2").value = ArraySearch(cookieArray, "paper-size");
		document.getElementById("sel_mode_v2").value = ArraySearch(cookieArray, "mode");
		document.getElementById("sel_resolution_v2").value = ArraySearch(cookieArray, "resolution");
		document.getElementById("range_brightness_v2").value = ArraySearch(cookieArray, "brightness");
		document.getElementById("range_contrast_v2").value = ArraySearch(cookieArray, "contrast");
		document.getElementById("range_quality_v2").value = ArraySearch(cookieArray, "quality");
		document.getElementById("range_borderfill_v2").value = ArraySearch(cookieArray, "borderfill");

		if (ArraySearch(cookieArray, "swcrop") == "true") {
			document.getElementById("chk_swcrop_v2").checked = true;
		} else {
			document.getElementById("chk_swcrop_v2").checked = false;
		}

		if (ArraySearch(cookieArray, "swdeskew") == "true") {
			document.getElementById("chk_swdeskew_v2").checked = true;
		} else {
			document.getElementById("chk_swdeskew_v2").checked = false;
		}
	}
}

/**
 * 改变扫描方式的下拉数据触发方法
 * @param source
 */
function ChangeSourcePS(source) {
	if (SPEC[document.getElementById("List").value] == "type3") {
		AddSel("sel_paper-size_v2", SELECT_STR[SPEC[document.getElementById("List").value]]["paper-size"][document.getElementById("sel_source_v2").value]);
		//默认A4纸
		document.getElementById("sel_paper-size_v2").value = "A4";
	}
}

//扫描仪的扫描按钮方法
function ScanPS() {
	sleep(100);
	//加载不到扫描仪，这里进行提示
//	if (document.getElementById("List").selectedIndex == -1 || getCookie(document.getElementById("List").value) == null || document.getElementById("List").value == '' || document.getElementById("List").value.length <= 0) {
//		//扫描仪驱动加载，初始化
//		if (fScan) {
//			fScan = false;
//		}
//		Connection("GetDevicesList", RecvDataPS, "GetDevicesList");
//	}
//	if (fScan) {
//		fScan = false;
//	}
	//清空smwj的区域，避免垃圾数据
	if(document.getElementById("pssmwj")){
		document.getElementById("pssmwj").value = '';
	}
	if(document.getElementById("smwj")){
		document.getElementById("smwj").value = '';
	}
	if(document.getElementById("addsmwj")){
		document.getElementById("addsmwj").value = '';
	}
	
	//每次点击按钮的时候，首先清空页面隐藏域存放图片地址的区域，避免取到旧的数据
	document.getElementById("text_filename_v2").innerHTML = '';
	
	//判断是否有数据，如果有数据，提醒用户是否覆盖
	if (document.getElementById("psSmjId")) {
		if(document.getElementById("psSmjId").value != null && document.getElementById("psSmjId").value != "" && 
				document.getElementById("scPsSmjId") && (document.getElementById("scPsSmjId").value == null || 
				document.getElementById("scPsSmjId").value == "")){
			scanPSEventExp();
		}else{
			if(document.getElementById("scPsSmjId") && document.getElementById("scPsSmjId").value != null 
					&& document.getElementById("scPsSmjId").value != ""){
					top.Dialog.confirm("您确定使用扫描件,原有上传文件将会被覆盖？",function(){
						scanPSEventExp();
					});
			} else {
				scanPSEventExp();
			}
		}
	} else {
		scanPSEventExp();
	}
}

function scanPSEventExp(){
	//设定状态
	RecvStatus(0);
	str = "SetParams?";
	str += "device_name=" + document.getElementById("List").value;
	str += "&scanmode=scan";
	str += "&paper-size=" + document.getElementById("sel_paper-size_v2").value;
	str += "&source=" + document.getElementById("sel_source_v2").value;
	str += "&resolution=" + document.getElementById("sel_resolution_v2").value;
	str += "&mode=" + document.getElementById("sel_mode_v2").value;
	str += "&brightness=" + document.getElementById("range_brightness_v2").value;
	str += "&contrast=" + document.getElementById("range_contrast_v2").value;
	str += "&quality=" + document.getElementById("range_quality_v2").value;
	str += "&borderfill=" +document.getElementById("range_borderfill_v2").value;
	str += "&swcrop=" + document.getElementById("chk_swcrop_v2").checked;
	str += "&swdeskew=" + document.getElementById("chk_swdeskew_v2").checked;
	setCookie(document.getElementById('List').value, str.substring(10, str.length), 365);
	//扫描仪可使用状态，初始化
	Connection("GetImageList", RecvDataPS, str);
}

///////////////////////////////////////////////////////////////////////////////////////第二个扫描仪初始化设置结束//////////////////////////////////////////////////////////////////////////////////////////////////////

/*********************************************自定义与扫描件相关的函数*************************************************************/
/**
 * 自定义方法，获得扫描文件的流信息，放到页面隐藏域smwj中；
 */
function getSmwjStreamData(){
	//获得所有图片文件的名称
	var imgNames = document.getElementById("text_filename").innerHTML;
	if (imgNames != null && imgNames != '' && imgNames.length > 0) {
		//先将smwj区域的值清空,避免有垃圾数据写入到文档中
		if(document.getElementById("smwj")){
			document.getElementById("smwj").value = '';
		}
		if(document.getElementById("addsmwj")){
			document.getElementById("addsmwj").value = '';
		}
		var imgNameArray = imgNames.split(',');
		if (imgNameArray != null && imgNameArray.length > 0) {
			for(var i=0; i<imgNameArray.length; i++){
				if (imgNameArray[i] != null && imgNameArray[i] != '' && imgNameArray[i].length > 0) {
					//将获得的图片地址进行解析，值需要文件的名称/tem/
					var imgName = imgNameArray[i].substr(5);
					if (fGet) {
						fGet = false;
					}
					//将获得的图片地址进行解析，值需要文件的名称/tem/
					getImageFileStream(imgName, 'false', "false", setSmwjStreamData);
				}
			}
		}
		
		if (document.forms["smjForm"]) {
			var dstjSmwjForm = setInterval(function(){
				var smwjVal = document.getElementById("smwj").value;
				
				if ((smwjVal.split("&").length - 1) == (imgNames.split(',').length - 1)) {
					clearInterval(dstjSmwjForm);
					//打开扫描件的预览视图
					var pageID = "previewSmjImage";
					top.Dialog.open({
						ID : pageID,
						URL : appNameVal + '/wjgl/jnyj/previewSmjImage.do?yjId=' + $("#smjyjid").val() + "&pageID=" + pageID + "&parentPageID=" + $("#pageID_smj").val(), 
						Height : 610,
						Width : 850,
						Title : "扫描件图片预览"
					});
				}
			},100);
		} else if(document.forms["addsmjForm"]){  //继续扫描功能
			$("#TcBody").mask("正在加载中…", 0, true);
			var dstjSmwjForm = setInterval(function(){
				var smwjVal = document.getElementById("addsmwj").value;
				
				if ((smwjVal.split("&").length - 1) == (imgNames.split(',').length - 1)) {
					clearInterval(dstjSmwjForm);
					//扫描件的保存
					$("#children_pageID_smj").val("previewSmjImage");
					if($("#parentPageID").val() == "" || $("#parentPageID").val() == null ){//文件管理
						$("#addsmjForm").attr("action",appNameVal + "/wjgl/jnyj/createPreviewSmjImage.do");
					}else if($("#parentPageID").val() != "" && $("#parentPageID").val() != null){//军委办件
						$("#addsmjForm").attr("action",appNameVal + "/bjgl/msj/sybj/createPreviewSmjImage.do");
					}
					document.forms["addsmjForm"].submit();
				}
			},100);
		}else if (document.forms["sybjSmjForm"]) {//军委办件扫描件
			var dstjSmwjForm = setInterval(function(){
				var smwjVal = document.getElementById("smwj").value;
				if ((smwjVal.split("&").length - 1) == (imgNames.split(',').length - 1)) {
					clearInterval(dstjSmwjForm);
					//打开扫描件的预览视图
					var pageID = "previewSmjImage";
					top.Dialog.open({
						ID : pageID,
						URL : appNameVal + '/bjgl/msj/sybj/previewSmjImage.do?yjId=' + $("#smjyjid").val() + "&pageID=" + pageID + "&parentPageID=" + $("#pageID_smj").val(), 
						Height : 610,
						Width : 850,
						Title : "扫描件图片预览"
					});
				}
			},100);
		}else if (document.forms["form"]) {
			delSmtpTmpFile();
			var dstjSmwjForm = setInterval(function(){
				var smwjVal = document.getElementById("smwj").value;
				if ((smwjVal.split("&").length - 1) == (imgNames.split(',').length - 1)) {
					clearInterval(dstjSmwjForm);
					document.forms["form"].submit();
				}
			},100);
		}
	}
}

//将图片流存放到smwj区域
function setSmwjStreamData(obj){
	if (obj.data instanceof ArrayBuffer) {
		var bytes = new Uint8Array(obj.data);
		if (document.forms["smjForm"] || document.forms["form"] || document.forms["sybjSmjForm"]){
			document.getElementById("smwj").value = document.getElementById("smwj").value + "&" + encode(bytes);
		}else if (document.forms["addsmjForm"]){
			document.getElementById("addsmwj").value = document.getElementById("addsmwj").value + "&" + encode(bytes);
		}
	}
}

/**
 * 自定义方法，将得到的扫描件流数据存放到隐藏域
 */
function getPSSmwjStreamData(){
	//获得所有图片文件的名层
	var imgNames = document.getElementById("text_filename_v2").innerHTML;
	if (imgNames != null && imgNames != '' && imgNames.length > 0) {
		//先将smwj区域的值清空,避免有垃圾数据写入到文档中
		document.getElementById("pssmwj").value = '';
		var imgNameArray = imgNames.split(',');
		if (imgNameArray != null && imgNameArray.length > 0) {
			for(var i=0; i<imgNameArray.length; i++){
				if (imgNameArray[i] != null && imgNameArray[i] != '' && imgNameArray[i].length > 0) {
					//将获得的图片地址进行解析，值需要文件的名称/tem/
					var imgName = imgNameArray[i].substr(5);
					if (fGet) {
						fGet = false;
					}
					//将获得的图片地址进行解析，值需要文件的名称/tem/
					getImageFileStream(imgName, 'false', "false", setPSSmwjStreamData);
				}
			}
		}
		
		if (document.forms["smjForm"]) {
			delSmtpTmpFile('ps');
			var dstjSmwjForm = setInterval(function(){
				var smwjVal = document.getElementById("pssmwj").value;
				if ((smwjVal.split("&").length - 1) == (imgNames.split(',').length - 1)) {
					clearInterval(dstjSmwjForm);
					document.forms["smjForm"].submit();
				}
			},100);
		} else if (document.forms["form"]) {
			delSmtpTmpFile('ps');
			var dstjSmwjForm = setInterval(function(){
				var smwjVal = document.getElementById("pssmwj").value;
				if ((smwjVal.split("&").length - 1) == (imgNames.split(',').length - 1)) {
					clearInterval(dstjSmwjForm);
					document.forms["form"].submit();
				}
			},100);
		}
	}
}

//将图片流存放到pssmwj区域
function setPSSmwjStreamData(obj){
	if (obj.data instanceof ArrayBuffer) {
		var bytes = new Uint8Array(obj.data);
		document.getElementById("pssmwj").value = document.getElementById("pssmwj").value + "&" + encode(bytes);
	}
}

// 生成略缩图的流文件
var setTmpSmwjStreamDataFlag = "";
function setTmpSmwjStreamData(obj){
	if (obj.data instanceof ArrayBuffer) {
		var bytes = new Uint8Array(obj.data);
		document.getElementById("tmpImgStream").value = encode(bytes);
		setTmpSmwjStreamDataFlag = "success";
	}else{
		document.getElementById("tmpImgStream").value = "";
		setTmpSmwjStreamDataFlag = "failure";
	}
}
function setTmpSmwjStreamData_nail(obj){
	if (obj.data instanceof ArrayBuffer) {
		var bytes = new Uint8Array(obj.data);
		document.getElementById("tmpImgStream_nail").value = encode(bytes);
	}else{
		document.getElementById("tmpImgStream_nail").value = "";
	}
}

//将扫描的图片，放到弹出框页面展示
function showPreviewImage2(){
	setSmjMask(1, "扫描仪处理图片中，请稍候……");
	if(fileNameStrs == ""){
		setSmjMask(0, "");
		showPreviewImageFlag = true;
	}else{
		var fileNames = fileNameStrs.split(",");
		var fileName = fileNames[0];
		console.log(fileName);
		if(fileName != null && fileName != ""){
			if (fileName.indexOf("/tmp/") > -1) {
				fileName = fileName.replace("/tmp/", "");
			}
			document.getElementById("tmpImgStream").value = "";
			document.getElementById("tmpImgStream_nail").value = "";
			getImageFileStream(fileName, 'true', 'false', setTmpSmwjStreamData_nail);//获取缩略图
			fGet = false;
			getImageFileStream(fileName, 'false', 'true', setTmpSmwjStreamData);
			fGet = false;
			var smyTmpFile = setInterval(
				function(){
					if(setTmpSmwjStreamDataFlag == "success"){
						clearInterval(smyTmpFile);
						if (document.getElementById("tmpImgStream") && document.getElementById("tmpImgStream").value != null 
								&& document.getElementById("tmpImgStream").value != "") {
							var imgCode = document.getElementById("tmpImgStream").value;
							var imgCode_nail = document.getElementById("tmpImgStream_nail").value;
							var showImage = "<div class='imgdiv' onmouseover=\"showImgDelete('img_del_" + imgOrder + "', 'true')\" onmouseout=\"showImgDelete('img_del_" + imgOrder + "', 'false')\" > "
								+ "<span style=\"height:16px; width:80px; display:inline-block; vertical-align:middle;\" ></span>"
								+ "<span id='img_del_" + imgOrder + "' class='img_delete' title='删除'   onclick='removeImg(this)' style=\"display:none;\" ></span>"
								+ "<div><img id='image_view_" + imgOrder + "' name='image_view' src='data:image/jpeg;base64," + imgCode_nail + "'"
								+ " style='width:100px;height:100px;' onclick='chakanImg(\"smj_input"+imgOrder+"\")' ></img><div>"
								+ "<span class='imgname text_slice' title='image'></span>"
								+ "<input type='hidden' id='smj_input"+imgOrder+"' name='smj_input' value='" + imgCode + "' /></div>";
							imgOrder++;
							$("#imgDiv").append(showImage);
							$("#imgDiv").scrollTop($("#imgDiv")[0].scrollHeight);
							
							$("#smjTpCount").text(imgOrder);
							
							fileNameStrs = fileNameStrs.replace((fileNames[0]+","), "");
							document.getElementById("tmpImgStream").value = "";
							document.getElementById("tmpImgStream_nail").value = "";
						}
						setTmpSmwjStreamDataFlag = "";
						showPreviewImage2();
					}else if(setTmpSmwjStreamDataFlag == "failure"){
						clearInterval(smyTmpFile);
						setTmpSmwjStreamDataFlag = "";
						showPreviewImage2();
					}
				},2000);
		}else{
			showPreviewImage2();
		}
	}
}

//图片转换成流文件后，删除图片
function delSmtpTmpFile(lx){
	var imgNames = document.getElementById("text_filename").innerHTML;
	if(lx == 'ps'){
		imgNames = document.getElementById("text_filename_v2").innerHTML;
	}
	if (imgNames != null && imgNames != '' && imgNames.length > 0) {
		var imgNameArray = imgNames.split(',');
		if (imgNameArray != null && imgNameArray.length > 0) {
			for(var i=0; i<imgNameArray.length; i++){
				if (imgNameArray[i] != null && imgNameArray[i] != '' && imgNameArray[i].length > 0) {
					//将获得的图片地址进行解析，值需要文件的名称/tem/
					var imgName = imgNameArray[i].substr(5);
					fScan = false;
					RmFiles(delSmtpTmpFile2, imgName);
				}
			}
		}
	}
}
//图片转换成流文件后，删除图片
function delSmtpTmpFileByFileName(fileName){
	var imgNames = fileName;
	if (imgNames != null && imgNames != '' && imgNames.length > 0) {
		var imgNameArray = imgNames.split(',');
		if (imgNameArray != null && imgNameArray.length > 0) {
			for(var i=0; i<imgNameArray.length; i++){
				if (imgNameArray[i] != null && imgNameArray[i] != '' && imgNameArray[i].length > 0) {
					//将获得的图片地址进行解析，值需要文件的名称/tem/
					var imgName = imgNameArray[i].substr(5);
					fScan = false;
					RmFiles(delSmtpTmpFile2, imgName);
				}
			}
		}
	}
}
function delSmtpTmpFile2(){
	fScan = false;
}



//扫描件预览图片保存
function imgSave() {
	$("#imgDialog").mask("正在保存…",null,true);
	var saveUrl = "";
	var saveData = new Object();
	saveData.pageID = "imgPage";
	if ($("#scanType").val() == "syyj") {//文件管理
		saveUrl = appNameVal + "/wjgl/jnyj/saveSmjToFile.do";
		saveData.yjId = $("#yjid").val();
	} else if ($("#scanType").val() == "sybj"){//军委办件
		saveUrl = appNameVal + "/bjgl/msj/sybj/saveSmjToFile.do";
		saveData.yjId = $("#bjId").val();
	} else if ($("#scanType").val() == "nbkw") {
		saveUrl = appNameVal + "/wjgl/nbkw/saveSmjToFile.do";
		saveData.nbkwId = $("#nbkwId").val();
	} else {
		top.Dialog.alert("保存失败！", function() {
			imgDialog.close();
			setDialog_html();
			return;
		},null,null,10);
	}
	$("#imgForm").ajaxSubmit({
		type : "POST",
		url : saveUrl,
		data : saveData,
		success : function(result) {
			if (result != "" && result != null) {
				imgDialog.close();
				setDialog_html();
				callback(result);
			}
		},
		error : function(){
			top.Dialog.alert("服务器连接异常！", function() {
				imgDialog.close();
				setDialog_html();
			},null,null,10);
		}
	});
}

function setDialog_html(){
	$(".l-window-mask").css("display", "none");
	hasPopUpPreviewPage = false;
	var dialogStr = '<div id="imgDialog" style="width:'
		+ (imgDialogSize["width"]-20 )+ 'px; height:'
		+ (imgDialogSize["height"]-65 )+ 'px; margin:0px; display:none; background:white;filter:alpha(opacity:30);opacoty:0.3;">'
		+ '<div class="Tc_OP_scroll">'
		+ '<a href="javascript:;" onclick="imgSave();"><img src="'+appNameVal+'/images/jwbg/ico_tc_02.png" />确定</a>'
		+ '<a href="javascript:;" onclick="Scan();"><img src="'+appNameVal+'/images/jwbg/ico_tc_02.png" />继续扫描</a>'
		+ '扫描页数：<span id="smjTpCount" value=""/>'
		+ '</div>'
		+ '<form id="imgForm" action="" method="post" enctype="multipart/form-data" target="msgDialog">'
		+ '<input type="hidden" id="tmpImgStream" value=""/>'
		+ '<input type="hidden" id="tmpImgStream_nail" value=""/>'
		+ '<div id="imgDiv" style="width: '
		+ (imgDialogSize["width"]-20 )+ 'px; height: '
		+ (imgDialogSize["height"]-120 )+ 'px; overflow: auto;"></div>'
		+ '</form>'
		+ '<div id="imgChakan" style="display:none;">'
		+' <img id="image_view_chakan" src="" style="width:700px;height:800px;" ></img></div></div>';
	$("#imgDialog1").html(dialogStr);
}
//扫描件预览图片删除图片
function removeImg(obj) {
	imgOrder--;
	$("#smjTpCount").text(imgOrder);
	$(obj).parent().remove();
}
function chakanImg(id){
	$("#image_view_chakan").attr('src', "data:image/jpeg;base64," + $("#"+id).val());
	imgHtml = $("#imgChakan").html();
	top.Dialog.open({
		  InnerHtml: imgHtml,//这里还可以直接写html代码
		  Title:"扫描图片查看",
		  Width : 700,
		  Height : 800
		});
}
function showImgDelete(spanId, isShow){
	if(isShow == "true"){
		$("#"+spanId).css("display", "inline-block");
	}else{
		$("#"+spanId).css("display", "none");
	}
}
function setImgDialogSize(){
	//设置弹窗大小
	var scanType = $("#scanType").val();
	if(scanType == "syyj"){
		imgDialogSize["width"] = 1600;
		imgDialogSize["height"] = 775;
	}
}