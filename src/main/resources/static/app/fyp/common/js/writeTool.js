function showwidget(){
   document.getElementById("signtool").SetWidgetVisible("true");
}
function hidewidget(){
   document.getElementById("signtool").SetWidgetVisible("false");
}

// var indd;
function tablet(){
    showwidget();
    document.getElementById("signtool").ExecuteAction("t_tablet");
//    document.getElementById("signtool").SetSignImageWidth(60);
}
function fullscreen(){
    document.getElementById("signtool").FullScreenMode();
}
function clearsign(){
    document.getElementById("signtool").ClearPenSign();
}
function end(){
    hidewidget();
    var image = document.getElementById("signtool").OnDeactivate();
    //显示图片  
    var showimg = document.getElementById("showimg");
    showimg.src=image;
    document.getElementById("uploadbutton").disabled=false;
    document.getElementById("clearbutton").disabled=true;
    document.getElementById("tabletbutton").disabled=false; 
}
function setcolor(){
	document.getElementById("signtool").ShowColorDialog();
	var pencolor = document.getElementById("signtool").GetPenColor();
}
function setpenwidth(){
	var obj = document.getElementById("widthSelect");
	var index = obj.selectedIndex;
	var value = obj.options[index].value;
    document.getElementById("signtool").SetPenWidth(value);
    var penwidth = document.getElementById("signtool").GetPenWidth();
}
function upload(){
	var URL=document.getElementById("uploadUrl").value;
    document.getElementById("signtool").SetUploadURL(URL);
	var result = document.getElementById("signtool").UploadImageStream();
	document.getElementById("uploadbutton").disabled=true;
//	alert(result);
}
function openurl(){
	showwidget();
	var URL=document.getElementById("downloadUrl").value;
    document.getElementById("signtool").SetDownloadURL(URL);
	var result = document.getElementById("signtool").DownloadImageStream();
	document.getElementById("downloadbutton").disabled=false;
	//document.getElementById("endbutton").disabled=false;
}
//获取是否签批过
function checkIsModified()
{
	var ret = document.getElementById("signtool").IsModified();
	return ret;
}