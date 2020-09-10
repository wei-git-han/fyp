var listUrl = {"url":"/fyp/feedbackhear/list","dataType":"text"};//表格数据
var yhfkUrl = {"url":"/app/fyp/ensure/problem","dataType":"text"};//保障问题跟踪
var grid = null;

var pageModule = function () {
	//表格数据
	var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"硬件/软件名称",name:"name",width:"16%",align:"center",render:function(rowdata,n){
							return rowdata.name;                                         
						}},
						{display:"问题描述",name:"desc",width:"14%",align:"center",render:function(rowdata,n){
							return rowdata.desc;                                         
						}},
						{display:"提出时间",name:"submitTime",width:"12%",align:"center",render:function(rowdata){
							return rowdata.submitTime;                                         
						}},
						{display:"提出人",name:"submitUserName",width:"10%",align:"center",render:function(rowdata){
							return rowdata.submitUserName;                                         
						}},
						{display:"解决时限",name:"solveTime",width:"12%",align:"center",render:function(rowdata){
							return rowdata.solveTime;                                         
						}},
						{display:"工作进展",name:"march",width:"12%",align:"center",render:function(rowdata){
							return rowdata.march;                                         
						}},
						{display:"状态",name:" status",width:"10%",align:"center",render:function(rowdata){
							if(rowdata.status == "0"){
		                        return "需求论证";
		                    }else if(rowdata.status == "1"){
		                        return "需求细化";
		                    }else if(rowdata.status == "2"){
		                        return "解决中";
		                    }else if(rowdata.status == "3"){
		                        return "已解决待升级";
		                    }else if(rowdata.status == "4"){
		                        return "已关闭";
		                    }else{
		                        return "";
		                    }
						}},
						{display:"问题分类",name:"type",width:"14%",align:"center",render:function(rowdata){
							if(rowdata.type == "0"){
		                        return "系统问题";
		                    }else if(rowdata.type == "1"){
		                        return "完善建议";
		                    }else{
		                        return "";
		                    }
						}}
					 ],
			width:'100%',
			height:'100%',
			checkbox: false,
			rownumberyon:true,
			paramobj:{limit:1000,page:1},
			overflowx:false,
			pageyno:false,
			url: listUrl
	   });
	}
	
	//问题跟踪//保障数据统计
	var initProblem = function(){
		$ajax({
			url: yhfkUrl,
			data:{},
			success: function(data) {
				$(".allsl").html(data.data.count);
				$(".todaysl").html(data.data.todayCount);
				$(".finishsl").html(data.data.completed);
				var arryHtml = '';
				$.each(data.data.users, function(i, o) {
					var id = o.id;
					var status = o.status;
					var userName = o.name;
					var deptName = o.deptName;
					var tel = o.phone;
					var warrantyTime = o.warrantyTime;
					var problemFrom = o.source;
					if(problemFrom == "0"){
						problemFrom= "热线电话";
				    }else if(problemFrom == "1"){
				    	problemFrom= "手机电话";
				    }else if(problemFrom == "2"){
				    	problemFrom = "现场反馈";
                    }else{
                        return "";
                    }
					
					var problemDeration = o.remark;
					var problemClass = "";
					var problemName = "";
					switch (status){
						case '0':
							problemClass="card_yellow";
							problemName="处理中";
						break;
						case '1':
							problemClass="card_red";
							problemName="延后中";
						break;
						case '2':
							problemClass="card_green";
							problemName="已完成";
						break;
					}
					arryHtml+=  '<div class="card-parent">' +
								'	<div class="card '+problemClass+'">'+
			            		'		<div class="card_top">'+
			            		'			<img src="../../common/images/user.png" />'+
			            		'			<div>'+
			            		'				<span class="userName">'+userName+'</span><span class="status">'+problemName+'</span><br/>'+
			            		'				<span class="dept">'+deptName+'</span>'+   /* <span class="dept2">某某处</span> */
			            		'			</div>'+
			            		'		</div>'+
			            		'		<div class="card_main">'+
			            		'			<p>联系方式：<span>'+tel+'</span></p>'+
			            		'			<p>反馈时间：<span>'+warrantyTime.substring(0,16)+'</span></p>'+
			            		'			<p>问题来源：<span>'+problemFrom+'</span></p>'+
			            		'			<p><span class="describe">问题描述：</span><div class="card_desContent">'+problemDeration+'</div></p>'+
			            		'		</div>'+
			            		'	</div>' +
								'</div>'
				});
				$("#bzProblem").html(arryHtml);
			}
		})
	}
	
	var initother = function(){
		$("#slqk").click(function(){
			initgrid();
		});
	}
	
    return {
        //加载页面处理程序
        initControl: function () {
			initProblem();
			initother();
        }
    }
}();



