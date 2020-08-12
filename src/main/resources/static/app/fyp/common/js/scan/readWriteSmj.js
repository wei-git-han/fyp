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
//定义支持的语言方式
var Supported_Languages = { 0: "English", 1: "Traditional", 2: "Simplified Chinese" };
//默认使用简体中文
var language = Supported_Languages[2];
//定义语言logo，目前集成网站，使用不到扫描仪官方提供的logo
//var CompanySignList = { "English": "image/background.gif", "Traditional": "image/background.gif", "Simplified Chinese": "image/plustek.png" };
//var CompanySign = CompanySignList[language];
//默认扫描仪的服务名称为：69KU;
var defaultDeviceName = "69KU";
//扫描仪相关页面初始化
function PageInit() {
    //document.getElementById("view4").style.height = document.getElementById("view1").offsetHeight + "px";
    //document.getElementById("right").style.height = (document.getElementById("view1").offsetHeight * 1.2) + "px";

//    Connection("GetDevicesList", RecvData, "GetDevicesList");
//
//    var PreviewObj = new PreviewImg();
//    document.getElementById("text_borderfill").value = document.getElementById("range_borderfill").value;
//    document.getElementById("text_brightness").value = document.getElementById("range_brightness").value;
//    document.getElementById("text_contrast").value = document.getElementById("range_contrast").value;
//    document.getElementById("text_quality").value = document.getElementById("range_quality").value;
//
//    if (language == "Simplified Chinese") {
//        document.getElementById("btn_Preview").parentNode.removeChild(document.getElementById("btn_Preview"));
//    }
	
	//初始化扫描仪服务 Receive Device Name
	document.getElementById("List").options.length = 0;
	var varItem = new Option("科图扫描仪", defaultDeviceName);
	document.getElementById("List").options.add(varItem);
	
	var deviceName = document.getElementById("List").value;
	if (deviceName == null || deviceName == '' || deviceName.length <= 0) {
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
	if (deviceName == null || deviceName == '' || deviceName.length <= 0) {
		if (fScan) {
			fScan = false;
		}
		Connection("GetDevicesList", RecvData, "GetDevicesList");
	}
	
	var PreviewObj = new PreviewImg();
	//亮度初始化
	document.getElementById("range_brightness").value = "-5";
	//对比度初始化
	document.getElementById("range_contrast").value = "50";
	//图像质量初始化
	document.getElementById("range_quality").value = "75";
	//图像质量初始化
	document.getElementById("range_borderfill").value = "0";
}

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

function AddListSel(data) {
    var List = data.split(",");
    var varItem;
    var str;
    document.getElementById("List").options.length = 0;
    for (j = 0; j < List.length; j++) {
        if (List[j] != "\0") {
            str = List[j].split(" ");
            if (language == "Simplified Chinese") {
                varItem = new Option("科图扫描仪", str[1]);
            }
            else {
                varItem = new Option(str[1], str[1]);
            }

            document.getElementById("List").options.add(varItem);
        }
    }
}

function RecvData(obj) {
    if (obj.ret == 1) {
        RecvStatus(obj.status);
        //RecvFileName(obj.filename);
        // 如果需要弹出预览页面，进行图片筛选，则进行弹出，扫描一张获取一张的文件名：
		if (obj.filename != null && obj.filename != "") {
			//隐藏控件放值
			RecvFileName(obj.filename);
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
                getSmwjStreamData();
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
//                alert("RmFiles OK");
                break;
            case "GetFileList":
//                alert("FileList=" + obj.data);
                break;
        }
    }
    else {
        CloseStatus(obj);
//        alert(obj.data);
//        if (fScan) {
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

/**
 * 获得扫描仪服务的名称
 * @param data
 */
function RecvDeviceName(data) {
    AddListSel(data);
}
/**
 * 改变扫描仪机型的方法
 * @param DeviceName
 * @returns
 */
function ChangeScanData(DeviceName) {
	if (DeviceName == '' || DeviceName == null || DeviceName == '科图扫描仪') {
		DeviceName = defaultDeviceName;
	}
    AddSel("sel_source", SELECT_STR[SPEC[DeviceName]]["source"]);
    document.getElementById("sel_source").value = "ADF Front";

    if (SPEC[DeviceName] == "type3") {
        AddSel("sel_paper-size", SELECT_STR[SPEC[DeviceName]]["paper-size"][document.getElementById("sel_source").value]);
        document.getElementById("sel_paper-size").value = "A4";
    }
    else {
        AddSel("sel_paper-size", SELECT_STR[SPEC[DeviceName]]["paper-size"]);
        document.getElementById("sel_paper-size").value = "A4";
    }
	//默认扫描模式
    AddSel("sel_mode", SELECT_STR[SPEC[DeviceName]]["mode"]);
    document.getElementById("sel_mode").value = "Color";
	//默认分辨率
    AddSel("sel_resolution", SELECT_STR[SPEC[DeviceName]]["resolution"]);
    document.getElementById("sel_resolution").value = "300";
	//补边
	document.getElementById("range_borderfill").value = 0;
	changeValue(document.getElementById("range_borderfill").value, "text_borderfill");
	//默认亮度
    document.getElementById("range_brightness").value = 0;
    changeValue(document.getElementById("range_brightness").value, "text_brightness");
	//默认对比度
    document.getElementById("range_contrast").value = 0;
    changeValue(document.getElementById("range_contrast").value, "text_contrast");
	//默认图像质量
    document.getElementById("range_quality").value = 75;
    changeValue(document.getElementById("range_quality").value, "text_quality");
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
        document.getElementById("range_borderfill").value = ArraySearch(cookieArray,"borderfill");
        document.getElementById("range_brightness").value = ArraySearch(cookieArray, "brightness");
        changeValue(document.getElementById("range_brightness").value, "text_brightness");
        document.getElementById("range_contrast").value = ArraySearch(cookieArray, "contrast");
        changeValue(document.getElementById("range_contrast").value, "text_contrast");

        document.getElementById("range_quality").value = ArraySearch(cookieArray, "quality");
        changeValue(document.getElementById("range_quality").value, "text_quality");

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
        document.getElementById("sel_paper-size").value = "A4";
    }
}
//扫描仪的扫描按钮方法
function Scan() {
	sleep(100);
    /*if (document.getElementById("List").selectedIndex == -1 || getCookie(document.getElementById("List").value) == null || document.getElementById("List").value == '' || document.getElementById("List").value.length <= 0) {
    	if (fScan) {
			fScan = false;
		}
		Connection("GetDevicesList", RecvData, "GetDevicesList");
    }
    if (fScan) {
		fScan = false;
	}*/
	//清空smwj的区域，避免垃圾数据
	if(document.getElementById("smwj")){
		document.getElementById("smwj").value = '';
	}
	if(document.getElementById("smwjNum")){
		document.getElementById("smwjNum").value = '0';
	}
	//每次点击按钮的时候，首先清空页面隐藏域存放图片地址的区域，避免取到旧的数据
	if(document.getElementById("text_filename")){
		document.getElementById("text_filename").innerHTML = '';
	}
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
    //	str += "&batch=" + document.getElementById("text_batch").value + "%d.pnm";
    //alert(str);
    //str="";
    setCookie(document.getElementById('List').value, str.substring(10, str.length), 365);

    Connection("GetImageList", RecvData, str);
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
    maskDiv.style.width = document.documentElement.clientWidth + "px";
    maskDiv.style.height = document.documentElement.clientHeight + "px";
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

    dialogDiv.style.top = (parseInt(document.documentElement.clientHeight) - 100) / 2 + "px";
    dialogDiv.style.left = (parseInt(document.documentElement.clientWidth) - 200) / 2 + "px";
    dialogDiv.style.background = " #FFFFFF ";
    dialogDiv.style.border = "1px solid gray";
    dialogDiv.style.padding = "5px";
    dialogDiv.style.borderRadius = "5px";
    if (status == 0) {
        dialogDiv.innerHTML = "<div style='text-align:center;line-height:100px'>" + GetStr(language, "Connecting") + "...</div>";
    }
    else {
        dialogDiv.innerHTML = "<div style='text-align:center;line-height:100px'>" + GetStr(language, "Scanning") + "  " + status.substr(7, 8) + "  " + GetStr(language, "page") + "...</div>";
    }
    document.body.appendChild(dialogDiv);                    // Append <button> to <body>
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
            //alert(str);
            setCookie(c_name, str, 365);
            return str;
        }
    }
    return "";
}

function ArraySearch(buf, key) {
    var i;
    for (i = 0 ; i < buf.length ; i++) {
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
//将图片进行进行base64格式转码
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
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}
//扫描仪处理程序避免频率过高，进行休眠某特定时长
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
//删除文件，需要重写该方法
function DelFile() {
    RmFiles(RecvData, document.getElementById("text_delfilename").value);
}

function getSmwjStreamData(){
	//获得所有图片文件的名称
	var imgNames = document.getElementById("text_filename").innerHTML;
	if (imgNames != null && imgNames != '' && imgNames.length > 0) {
		//先将smwj区域的值清空,避免有垃圾数据写入到文档中
		if(document.getElementById("smwj")){
			document.getElementById("smwj").value = '';
		}
		if(document.getElementById("smwjNum")){
			document.getElementById("smwjNum").value = '0';
		}
		var imgNameArray = imgNames.split(',');
		if (imgNameArray != null && imgNameArray.length > 0) {
			for(var i=0; i<imgNameArray.length; i++){
				if (imgNameArray[i] != null && imgNameArray[i] != '' && imgNameArray[i].length > 0) {
					//将获得的图片地址进行解析，值需要文件的名称/tem/
					// var imgName = imgNameArray[i].substr(5);
					var imgName = imgNameArray[i];
					if (imgName.indexOf("IMG_") <= -1) {
						imgName = imgName.substr(5);
					}
					if (fGet) {
						fGet = false;
					}
					//将获得的图片地址进行解析，值需要文件的名称/tem/
					getImageFileStream(imgName, 'false', "false", setSmwjStreamData);
				}
			}
		}
		// 将数据流存放到页面中
		if (document.forms["smjForm"]) {
			newbootbox.alert("正在保存中，请稍候...",false);
			var dstjSmwjForm = setInterval(function(){
				var smwjVal = document.getElementById("smwjNum").value;
				if (parseInt(smwjVal) == (imgNames.split(',').length - 1)) {
					clearInterval(dstjSmwjForm);
					delSmtpTmpFile();
					$("#smjForm").submit();
				}
			},100);
		}
	}
}

//将图片流存放到smwj区域
function setSmwjStreamData(obj){
	if (obj.data instanceof ArrayBuffer) {
		var bytes = new Uint8Array(obj.data);
		if (document.forms["smjForm"]){
			document.getElementById("smwj").value = document.getElementById("smwj").value + "&" + encode(bytes);
			document.getElementById("smwjNum").value = parseInt(document.getElementById("smwjNum").value) + 1;
		}
	}
}

//图片转换成流文件后，删除图片
function delSmtpTmpFile(){
	var imgNames = document.getElementById("text_filename").innerHTML;
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