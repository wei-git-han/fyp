var listUrl = {"url":"../data/grid.json","dataType":"text"};//表格数据
var numberUrl = {"url":"/app/fyp/common/data/number.json","dataType":"text"};//保障数据统计
var grid = null;

var pageModule = function () {
	//保障数据统计
	var getNum = function(){
		$.ajax({
			url: numberUrl.url,
			data:{},
			type:'get',
			success: function(data) {
				$(".allsl").html(data.allsl);
				$(".todaysl").html(data.todaysl);
				$(".finishsl").html(data.finishsl);
			}
		})
	}
	
	//表格数据
	var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"状态",name:"unit",width:"10%",align:"center",render:function(rowdata,n){
							return rowdata.unit;                                         
						}},
						{display:"姓名",name:"unit",width:"10%",align:"center",render:function(rowdata,n){
							return rowdata.unit;                                         
						}},
						{display:"单位名称",name:"weeks",width:"25%",align:"left",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"联系电话",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"报修时间",name:"weeks",width:"10%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"应用名称",name:"weeks",width:"15%",align:"center",render:function(rowdata){
							return rowdata.weeks;                                         
						}},
						{display:"需求描述",name:"weeks",width:"20%",align:"left",render:function(rowdata){
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
	
	//问题跟踪
	var initProblem = function(){
		$.ajax({
			url: "../data/problem.json",
			data:{},
			success: function(data) {
				var arryHtml = '';
				$.each(data.list, function(i, o) {
					var id = o.id;
					var status = o.status;
					var userName = o.name;
					var dept = o.dept;
					var tel = o.tel;
					var problemFrom = o.problemFrom;
					var problemDeration = o.problemDeration;
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
			            		'				<span class="dept">'+dept+'</span><span class="dept2">某某处</span>'+
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
	}
	
    return {
        //加载页面处理程序
        initControl: function () {
			getNum();
			initgrid();
			initProblem();
			initother();
        }
    }
}();



