var listUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/fyp/feedbackhear/list","dataType":"text"};//表格数据
var yhfkUrl = {"url":"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=/app/fyp/ensure/problem","dataType":"text"};//保障问题跟踪
var grid = null;

var pageModule = function () {
	//表格数据
	var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"硬件/软件名称",name:"unit",width:"16%",align:"center",render:function(rowdata,n){
							return rowdata.unit;                                         
						}},
						{display:"问题描述",name:"unit",width:"14%",align:"center",render:function(rowdata,n){
							return rowdata.unit;                                         
						}},
						{display:"提出时间",name:"weeks",width:"12%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"提出人",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"解决时限",name:"weeks",width:"12%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"工作进展",name:"weeks",width:"12%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"状态",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"问题分类",name:"weeks",width:"14%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}}
					 ],
			width:'100%',
			height:'100%',
			checkbox: false,
			rownumberyon:true,
			paramobj:{},
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
					var problemFrom = o.source;
					var problemDeration = o.remark;
					var problemClass = "";
					var problemName = "";
					switch (status){
						case '0':
							problemClass="card_yellow";
							problemName="离线中";
						break;
						case '1':
							problemClass="card_green";
							problemName="在线中";
						break;
						case '2':
							problemClass="card_red";
							problemName="请假中";
						break;
					}
					arryHtml+=  '<div class="card '+problemClass+'">'+
			            		'		<div class="card_top">'+
			            		'			<img src="../../common/images/user.png" />'+
			            		'			<div>'+
			            		'				<span class="userName">'+userName+'</span><span class="status">'+problemName+'</span><br/>'+
			            		'				<span class="dept">'+deptName+'</span>'+   /* <span class="dept2">某某处</span> */
			            		'			</div>'+
			            		'		</div>'+
			            		'		<div class="card_main">'+
			            		'			<p>联系方式：<span>'+tel+'</span></p>'+
			            		'			<p>问题来源：<span>'+problemFrom+'</span></p>'+
			            		'			<p><span class="describe">问题描述：</span><div class="card_desContent">'+problemDeration+'</div></p>'+
			            		'		</div>'+
			            		'	</div>'
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



