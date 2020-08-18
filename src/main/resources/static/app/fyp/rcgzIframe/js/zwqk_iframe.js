var pageModule = function () {
	var initzwqk = function(){
		$.ajax({
			url: "../data/zwqk.json",
			data:{},
			success: function(data) {
				var arryHtml = '';
				$.each(data, function(i, o) {
					console.log(data)
					arryHtml+=  ' <div class="tab3_title">'+o.text+'</div>'+
								'	<div class="tab3_main">';
								$.each(o.children,function(index,item){
									console.log(o.children)
									var statusHtml = "";
									var statusColor = "";
									if(item.status == 1){
										statusHtml ="(在线中)";
										statusColor = "#21B756";
									}
									if(item.status == 0){
										statusHtml ="(请假中)";
										statusColor = "#D3D43E";
									}
									arryHtml+=  '<div class="user_card">'+
												'	<img src="../../common/images/headBlue.png" />'+
												'	<div>'+
												'		<span class="userName">'+item.text+'</span><span class="status" style="color:'+statusColor+'">'+statusHtml+'</span><br/>'+
												'		<a class="more" id="'+item.id+'"><i class="fa fa-chevron-circle-down"></i> 更多操作</a>'+
												'	</div>'+
												'</div>';
									})
									arryHtml+=	'</div>';
				});
				var moreHtml = '<button class="moreBtn">查看更多详情&nbsp;></button>';
				$("#zwqk").html(arryHtml+moreHtml);
			}
		})
	}
	var initother = function(){
	}
  
    return {
        //加载页面处理程序
        initControl: function () {
			initzwqk();
            initother();
        }
    }
}();



