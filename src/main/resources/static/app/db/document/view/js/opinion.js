//var listUrl = {"url":"/app/db/document/view/data/opinion.json","dataType":"text"}; //意见记录list
var showIdeaRecordUrl = {"url":"/app/db/addXbDeal/showIdeaRecord","dataType":"text"}; //意见记录
var teamId=getUrlParam("teamId");//
var subId=getUrlParam("subId");//
var ideaGroupId=getUrlParam("ideaGroupId");
var fileFrom=getUrlParam("fileFrom")||""; //文件来源
var opinionFlag=getUrlParam("opinionFlag")||""; //判断是从哪里进入的，talbe || 详情页 ,table页面进入需要请求后台方法
var pageModule = function(){
	//意见记录
	var initList = function(){
		$ajax({
			url:showIdeaRecordUrl,
 			data:{subId:subId,teamId:teamId,ideaGroupId:ideaGroupId},
			success:function(data){
				var html1= "";
				var xbUser = [];
				$.each(data,function(i,o){
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
								xbUser.push(o.userName);
								html1 += '<div class="timeline-content">'+
									        '	<div class="userName"><i class="fa fa-user"></i>&nbsp;'+o.userName+'</div>';
								html1 += '	<div class="content">'+o.feedBackIdea+'</div>';
								html1 += '</div>';
//							})
							
							html1 +='	</div>'+
									'</div>'
					$(".timelinesview").append(html1);
				})
				$("#xbUser").html(xbUser.toString());
			}
		})
	}
	
	
	var initother = function(){
		if(opinionFlag=="table"){//如果是列表进来的调后台的方法
			//
		}
		
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

