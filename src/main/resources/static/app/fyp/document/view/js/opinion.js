//var listUrl = {"url":"/app/db/document/view/data/opinion.json","dataType":"text"}; //意见记录list
var showIdeaRecordUrl = {"url":"/app/db/addXbDeal/showIdeaRecord","dataType":"text"}; //意见记录
var infoId=getUrlParam("infoId");//
var subId=getUrlParam("subId");//
var teamId=getUrlParam("teamId");//
var ideaGroupId=getUrlParam("ideaGroupId");
var fileFrom=getUrlParam("fileFrom")||""; //文件来源
var opinionFlag=getUrlParam("opinionFlag")||""; //判断是从哪里进入的，talbe || 详情页 ,table页面进入需要请求后台方法
var pageModule = function(){
	//意见记录
	var initList = function(){
		$ajax({
			url:showIdeaRecordUrl,
 			data:{subId:subId,infoId:infoId,ideaGroupId:ideaGroupId},
			success:function(data){
				var html1= "";
				var xbUser = [];
				var cbUser = [];
				xbUser = data.xieban;
				cbUser = data.chenban;
				datas = data.docXbIdeas;
				if(data.result != 'success'){
					$("#xbUserLine1").text("本轮反馈暂无意见！");
					$("#xbUserLine2").hide();
				}else if(datas.length <= 0){
                    $("#xbUserLine1").text("本轮反馈暂无意见！");
					$("#xbUserLine2").hide();
				}else{
                    $.each(datas,function(i,o){
                        var createdTime = o.createdTime;
    //					var cbrList = o.cbrList;
                        html1=	'<div class="timelinesheys">'+
                                '	<div class="timeline-icon">'+
                                '		<i class="icontime"></i>'+
                                '	</div>'+
                                '	<div class="timeline-user">'+
                                '		<span class="createTime">'+createdTime+'</span>'+
                                '	</div>'+
                                '	<div class="timeline-body">';
    //							$.each(cbrList,function(i,item){
    //								xbUser.push(o.userName);
                                    html1 += '<div class="timeline-content">'+
                                                '	<div class="userName"><i class="fa fa-user"></i>&nbsp;'+o.userName+'</div>';
                                    html1 += '	<div class="content">'+o.feedBackIdea+'</div>';
                                    html1 += '</div>';
    //							})

                                html1 +='	</div>'+
                                        '</div>'
                        $(".timelinesview").append(html1);
                    })
                    console.log(xbUser);
                    $("#xbUser").html(xbUser.toString());
                    $("#cbUser").html(cbUser.toString());
				}
			}
		})
	}
	
	
	var initother = function(){
		//关闭
		$("#close").click(function(){
			newbootbox.newdialogClose("opinionDialog");
		});
	}
	
	
	return{
		//加载页面处理程序
		initControl:function(){
			initList();
			initother();
		}
	};
	
}();

