/**
 * @Title: .csseoa的本地wps编辑控件方法合集
 * @Description:
 * @Author: jekyll14(zhang xiaoming)
 * @CreateTime: 19-1-15 上午9:09
 */
function pluginRun(id,ext,streamdownUrl,streamupurl,formatupurl,callback1) {
    var plugin = document.getElementById("csseOfficeplugin");
    //cookies:Cookies
    var cookies = 'cookies';
    //token:Access Token
    var token = 'token';
    //jsonObjectContent:交互JSON串
    var jsonObjectContent = '';
    //questiontitle:加载项弹出框内容
    var questiontitle = '完成编辑，将此文件上传至公文处理并关闭？';
    //downloadFileCallback:下载文档进度回调
    var downloadFileCallback = function (success, dltotal, dlnow) {
        //加载进度条
        openloading(dltotal,dlnow);
    }
    //当前文件id,用于刷新页面定位页签
    var currentFileId = id;
    //finishCallback:操作完成回调
    var finishCallback = function (backinfo, errno1, errinfo1,errno2,errinfo2) {
        console.log("backinfo: "+backinfo)
        //状态码标识枚举
        // usercancel = 不上传；
        // wpsuploadOKofduploadOK = 上传都成功——刷新当前页签，显示最新的版式文件
        // wpsuploadOKofduploadFail = 流式上传成功，版式上传不成功——获取最新的流式文件做转版
        // wpsuploadFailofduploadOK = 流式上传不成功，版式上传成功——蛋疼
        // wpsuploadFailofduploadFail = 上传都不成功，报错误信息
        if (backinfo == 'wpsuploadOKofduploadOK') {
            //上传都成功——刷新当前页签，显示最新的版式文件
        	if(typeof(callback1)!="undefined"&&callback1!=null){
        	    var  newdate1 = new Date();
        		callback1(currentFileId);
        	}
        } else  if(backinfo == 'wpsuploadFailofduploadFail'){
            newbootbox.alert("流式和版式文件都上传失败了。");
            //上传都不成功，报错误信息
        } else  if(backinfo == 'wpsuploadOKofduploadFail'){
            //流式上传成功，版式上传不成功——获取最新的流式文件做转版
            newbootbox.alert("流式上传成功，版式上传失败，当前看到的文不是最新的，可以重新编辑一次。");
        }else  if(backinfo == 'wpsuploadFailofduploadOK'){
            //流式上传不成功，版式上传成功——蛋疼
            newbootbox.alert("流式上传失败，版式上传成功，文件不一致，可重新编辑一次。");
        }else  if(backinfo == 'usercancel'){
            //不上传，此项动作应用不做任何事
            newbootbox.alert("本地编辑的流式文件未同步到应用系统中。");
        }else  if(backinfo == 'downloadok'){
            //下载成功，不做操作
            newbootbox.alert("文件已经在本地打开，请编辑。");
        }
    }
    //officeType:文档类型
    var officeType = '';
    //firstOpen:首次打开
    var firstOpen = '0';
    //执行插件方法
    var  newdate2 = new Date();
    plugin.ExtraOfficeHandle(id, ext, streamdownUrl,streamupurl,formatupurl, cookies, token, jsonObjectContent, questiontitle, downloadFileCallback, finishCallback, officeType, firstOpen);
}