//var listurl = {"url":"../data/grid.json","dataType":"text"};
var listurl = {"url":"/app/fyp/leadercadre/szList","dataType":"text"}
var grid = null;
var appInfo = {}
var pageModule = function () {
	var initgrid = function(){
        grid = $("#gridcont").createGrid({
			columns:[
						/* {display:"应用",name:"app",width:"15%",align:"center",render:function(rowdata,n){
							return rowdata.app;
						}},
						{display:"内容",name:"content",width:"17%",align:"left",render:function(rowdata){
							return rowdata.content;
						}},
						{display:"发起人",name:"userName",width:"17%",align:"center",render:function(rowdata){
							return rowdata.departmentName;
						}},
						{display:"时间",name:"date",width:"40%",align:"center",render:function(rowdata){
							return rowdata.date;
						}},
						{display:"操作",name:"操作",width:"11%",align:"center",render:function(rowdata){
							return '<i class="fa fa fa-pencil" style="cursor:pointer;color: #2E85E0;padding:4px 5px;" onclick="editfn()" title="编辑"></i>';
						}} */
						{display:"文件名称",name:"documentTitle",width:"40%",align:"center",render:function(rowdata,n){
							return `<div class="viewBtn" title="${rowdata.documentTitle}" onclick="openById()">${rowdata.documentTitle}</div>`
						}},
						{display:"拟稿单位",name:"organName",width:"20%",align:"center",render:function(rowdata,n){
							return `<div  class="viewBtn" onclick="openById()">${rowdata.organName}</div>`;
						}},
						{display:"拟稿人",name:"createMan",width:"25%",align:"center",render:function(rowdata,n){
                            return `<div class="viewBtn" onclick="openById()" title="${rowdata.createMan}">${rowdata.createMan}</div>`
						}},
						{display:"拟稿时间",name:"date",width:"15%",align:"center",render:function(rowdata){
                           return `<div class="viewBtn" onclick="openById()">${rowdata.createTime}</div>`
                        }}
					 ],
			width:"100%",
			height:"100%",
			checkbox: false,
			rownumberyon:false,
			paramobj:{},
			overflowx:false,
			pageyno:false,
			url: listurl,
			loadafter:function(e){
			    appInfo = {
			        appId:e.data.appid,
                    domain:e.data.url,
                    url:e.data.weburl
			    }
			    if(e.data.total>0){
					$('#dbNum').html(e.data.total);
					$('#dbNum').show()
				}else{
					$('#dbNum').hide()
				}
			}
	   });
	}

	var initother = function(){
	}
    return {
        //加载页面处理程序
        initControl: function () {
			initgrid();
		    initother();
        },
		refreshPage:function () {
			initgrid()
		}
    }
}();
function openById(){
	window.top.openfn1(appInfo.appId,appInfo.url+'/index.html',appInfo.domain)
}
