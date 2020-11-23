var listUrl = {"url":"/fyp/feedbackhear/list","dataType":"text"};//表格数据
var yhfkUrl = {"url":"/app/fyp/ensure/problem","dataType":"text"};//保障问题跟踪
var grid = null;

var pageModule = function () {
	//表格数据
	var initgrid = function(){
		  grid = $("#gridcont").createGrid({
			columns:[
						{display:"硬件/软件名称",name:"name",width:"22%",align:"center",render:function(rowdata,n){
							return `<span title="${rowdata.softName}" style="cursor: pointer">${rowdata.softName}</span>`;
						}},
						{display:"问题描述",name:"desc",width:"21%",align:"center",render:function(rowdata,n){
							return `<span title="${rowdata.desc}" style="cursor: pointer">${rowdata.desc}</span>`;
						}},
						{display:"提出时间",name:"submitTime",width:"19%",align:"center",render:function(rowdata){
							return `<span title="${rowdata.submitTime}" style="cursor: pointer">${rowdata.submitTime}</span>`;
						}},
						{display:"提出人",name:"submitUserName",width:"18%",align:"center",render:function(rowdata){
							return `<span title="${rowdata.submitUserName}" style="cursor: pointer">${rowdata.submitUserName}</span>`;
						}},
						/*{display:"解决时限",name:"solveTime",width:"12%",align:"center",render:function(rowdata){
							return `<span title="${rowdata.solveTime}"  style="cursor: pointer">${rowdata.solveTime}</span>`;
						}},
						{display:"工作进展",name:"march",width:"12%",align:"center",render:function(rowdata){
							return `<span title="${rowdata.march}" style="cursor: pointer">${rowdata.march}</span>`;
						}},*/
						{display:"状态",name:" status",width:"20%",align:"center",render:function(rowdata){
							if(rowdata.status == "0"){
		                        return `<span title="需求论证" style="cursor: pointer">需求论证</span>`;
		                    }else if(rowdata.status == "1"){
		                        return `<span title="需求细化"  style="cursor: pointer">需求细化</span>`;
		                    }else if(rowdata.status == "2"){
		                        return `<span title="解决中"  style="cursor: pointer">解决中</span>`;
		                    }else if(rowdata.status == "3"){
		                        return `<span title="已解决待升级" style="cursor: pointer">已解决待升级</span>`;
		                    }else if(rowdata.status == "4"){
		                        return `<span title="已关闭"  style="cursor: pointer">已关闭</span>`;
		                    }else{
		                        return "";
		                    }
						}},
						/*{display:"问题分类",name:"type",width:"14%",align:"center",render:function(rowdata){
							// if(rowdata.type == "0"){
		                        return `<span title="${rowdata.type}" style="cursor: pointer">${rowdata.type}</span>`;
		                    // }else if(rowdata.type == "1"){
		                    //     return `<span title="完善建议">完善建议</span>`;
		                    // }else{
		                    //     return "";
		                    // }
						}}*/
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
					arryHtml+=  '<div class="card-parent" onclick="toBzInfo()" style="cursor: pointer">' +
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
			            		'			<p><span class="describe">问题描述：</span><div class="card_desContent" title="'+problemDeration+'">'+problemDeration+'</div></p>'+
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
		$("#wtzz").click(function(){
			initProblem();
		});
	}

    return {
        //加载页面处理程序
        initControl: function () {
			initProblem();
			initother();
        },
		refreshPage:function () {
			if ($('#wtzz').hasClass('active')) {
				initProblem();
			} else if ($('#slqk').hasClass('active')) {
				initgrid();
			}
		}
    }
}();
function toBzInfo() {
	window.open('/app/fyp/bzProject/html/bzwtgz.html')
}

function toSlqkInfo() {
	window.open('/app/fyp/slqk/html/slqktabel.html')
}


