var searchUrl = {url:'/app/fyp/reignCaseController/getTxlInfo',dataType:'text'};
var pagemenu = {url:'/app/fyp/reignCaseController/reignDataTree',dataType:'text'};
var fullName="";
var loginUserId="";
var pageModule = function () {
	
	var os = {};
    var oodata = [];
	
	var initUserStatus = function() {
		$ajax({
			url:pagemenu,
			success:function(data){
				var data1 = [];
				data1.push(data);
				data = data1;
				var array = data;
				oodata = array;
				initfn1(array);
				$("#zxNum").html(data[0].zx);
				$("#lxNum").html(data[0].lx);
				$("#qjNum").html(data[0].qj);
			}
		})
	};
	
	var strlength = "";
    var initfn1 = function(array){
    	strlength = "";
    	$(".pagemenu").html("");
    	
		var eachfn = function(pid,array,el,n){
			$.each(array,function(i,o){
				var id = o.id;
				var text = o.text;
				var pl = 20;
				var child = o.child;
				var flag = o.flag;
				var number = o.number;
				var zxhtml = '';
				var zx = o.zx;
				var lx = o.lx;
				var bg = o.bg;
				var qj = o.qj;
				var status = o.status;
				var ifqj = o.ifqj;
				var ifqjhtml = '';
				var statushtml = '';
				var numberhtml = '';
				var icon = '';
				var img = '';
				var dataid = o.dataid;
				
				if (flag == "1") {
					img = '<img src="../images/dept.png" />&nbsp;';/*<i class="fa faimg fa-folder"></i>*/
				} else {
					img = '<img src="../images/people.png" />&nbsp;'; /*<i class="fa faimg fa-user"></i>*/
				}
				if(n>0){
					if(child!="" && child!=null && child!="undefined"){
						if(child.length>0){
							icon = '<i class="faa fa fa-caret-right" style="font-size:24px!important"></i>'
						}else{
							icon = '<i class="fa"></i>'
						}
					}else{
						icon = '<i class="fa fa-plus" style="color:transparent;width:30px;"></i>'
					}
				};
			
				//判断是单位则加数量统计
				if(number!="" && number!=null && number!="undefined"){
					numberhtml = '<span class="number" data="'+id+'" >'+number+'</span>';
					os[id] = {
						number:number,
						zx:zx,
						lx:lx,
						bg:bg,
						qj:qj
					}
				}
				
				
				if($("#filter_show").html() == "" || $("#filter_show").html() == null){
					zxhtml = '';
				}else{
					if($("#filter_show").text()=="在线"){
						if(zx!="" && zx!=null && zx!="undefined"){
							zxhtml = '<span class="number" data="'+id+'">{'+zx+'}</span>';
						}
					}
					if($("#filter_show").text()=="离线"){
					}
					if($("#filter_show").text()=="临时安排"){
					}
					if($("#filter_show").text()=="请假"){
						if(qj!="" && qj!=null && qj!="undefined"){
							zxhtml = '<span class="number" data="'+id+'">{'+qj+'}</span>';
						}
					}

				}
				
				/* //判断是否在线，1在线，0离线
				if(status!="" && status!=null && status!="undefined"){
					if(status == "1"){
						statushtml = '<i class="fa fa-circle fa1"></i>';
						strlength += (pid+";"+o.id)+";";
					}else{
						statushtml = '<i class="fa fa-circle fa0"></i>';
					}
				}
				 */
				var typehtml = "";
				var typename = o.statename;
				var typetime1 = getdateformtfn(o.begintime);
				var typetime2 = getdateformtfn(o.endtime);
				
				
				//菜单中的状态和时间
				if(typename!="" && typename!=null && typename!="undefined"){
					var data_info = `${typename}: ${typetime1} - ${typetime2}`
					var showtypename="临时安排";
					typehtml = `
						( ${showtypename} ${typetime1} - ${typetime2} <i class="fa fa-info-circle tptext" data="${dataid}" datatype="0" data_info="${data_info}"></i>)
					`
				}else{
					typename = "";
					if(ifqj!="" && ifqj!=null && ifqj!="undefined"){
						if(ifqj == "1"){
							typename = "请假中";
							var show_info = ` ${typename} `
							typehtml = `${show_info}`
						}
					}
				}
				
				
			/* 	var li = 	$('<li class="l'+n+' '+(n==1&&i==0?"active":"")+' lis" >'+
							'	<a style="padding-left:'+(n*pl)+'px;" id="'+id+'" data="'+text+'" >'+icon+img+text+numberhtml+zxhtml+statushtml+typehtml+ifqjhtml+'</a>'+
							'</li>'); */
							
				var li =  $('<li class="l'+n+' '+(n==1&&i==0?"active":"")+' lis" >'+
							'	<a style="padding-left:' + (n * pl) + 'px;" id="' + id + '" data="' + text + '" >'+
							'		<span class="newstatusL">'+img+text+'</span>'+
							'		<span class="newstatusR"><font>'+numberhtml+zxhtml+typehtml+'</font>'+icon+'</span>'+
							'	</a>'+
							'</li>'); 	
							
				el.append(li);
				var child = o.child;
				if(child!="" && child!=null && child!="undefined"){
					if(child.length>0){
						var ul = $('<ul></ul>');
						li.append(ul);
						eachfn(pid+";"+o.id,child,ul,n+1);
					}
				}
				/* if(loginUserId == id){
					$("#"+loginUserId).parents("li").addClass("open active");
				} */
			})
			
		}
		eachfn("",array,$(".pagemenu"),1);
    }
	
	var getdateformtfn = function(date){
    	var newdate = "";
    	if(typeof(date)!="undefined"&&date!=null&&$.trim(date)!=""){
    		newdate = date.substr(5,11)
    	}
    	newdate = newdate.replace(/-/g,".")
		return newdate;
    }
	
	var initother = function(){
		$(".pagemenu li>a").live("click", function() {
			var treeId = $(this).attr("id");
			$(this).parent().toggleClass("open");
			$(".pagemenu li").removeClass("active");
			if ($(this).parent().hasClass("l1")) {
				if ($(this).parent(".open").hasClass("active")) {
					$(this).parent(".open").removeClass("active");
				} else {
					$(this).parent(".open").addClass("active");
				}

				if ($(this).find(".fa").attr("class") != "fa") {
					if ($(this).parent().hasClass("open")) {
						$(this).find(".faa").removeClass("fa-caret-right");
						$(this).find(".faa").addClass("fa-caret-down");
					} else {
						$(this).find(".faa").removeClass("fa-caret-down");
						$(this).find(".faa").addClass("fa-caret-right");
					};
				}
			} else {
				$(this).parents(".l1").addClass("active");
				$(this).parent().addClass("active");
				if ($(this).find(".fa").attr("class") != "fa") {
					if ($(this).parent().hasClass("open")) {
						$(this).find(".faa").removeClass("fa-caret-right");
						$(this).find(".faa").addClass("fa-caret-down");
					} else {
						$(this).find(".faa").removeClass("fa-caret-down");
						$(this).find(".faa").addClass("fa-caret-right");
					};
				}
			}
		});

		$("#searchInput").bind("input",function(event){
            if($(".searchBox").is(":hidden")){
                $(".searchBox").fadeIn();
                $("#searchResult").css("height",$(".searchBox").height());
                $("#searchResult").parent().css("height",$(".searchBox").height());
            };
            fullName = $("#searchInput").val();
            if(fullName!=""){
                fn(event.target, fullName);
            }else{
                $(".searchBox").fadeOut();
            }
       });
		
       $("body").click(function(event){
            if($(event.target).hasClass("searchInput") || $(event.target).hasClass("searchButton") || $(event.target).hasClass("searchBox") || $(event.target).parents("div").hasClass("searchBox")){
                return;
            }
            $(".searchBox").hide();
       });
		
       
       //人员在位筛选
       $("#filter label").click(function(){
	       	var label = this;
        	var seachData = $(this).attr("data");//状态标识
        	var seachText = $(this).text();
	       	$("#filter_show").html('<a><span>'+seachText+'</span><i class="fa fa-times-circle" id="delfilter"></i></a>');
		   
			var array1 = [];
    		var eachfn = function(array1,array,n){
    			$.each(array,function(i,o){
    				var id = o.id;
    				var text = o.text;
    				var pl = 20;
    				var child = o.child;
    				var flag = o.flag;
    				var number = o.number;
    				var zx = o.zx;
    				var lx = o.lx;
    				var bg = o.bg;
    				var qj = o.qj;
    				var status = o.status;
    				var ifqj = o.ifqj;
    				var dataid = o.dataid;
    				var statename = o.statename;
    				var begintime = o.begintime;
    				var endtime = o.endtime;
    				
    				var object = {
        					id:id,
        					text:text,
        					pl:pl,
        					child:child,
        					flag:flag,
        					number:number,
        					zx:zx,
        					lx:lx,
        					bg:bg,
        					qj:qj,
        					status:status,
        					ifqj:ifqj,
        					dataid:dataid,
        					statename:statename,
        					begintime:begintime,
        					endtime:endtime
        				};
    				
    				var child = o.child;
    				if(child!="" && child!=null && child!="undefined"){
    					if(child.length>0){
    						object.child = [];
    						eachfn(object.child,child,n+1);
    					}
    				}
    				
    				var typename = o.statename;
    				if($(label).hasClass("label1")){//过滤是否在线
        				if(status!="" && status!=null && status!="undefined"){
        					if(status == seachData){
        						array1.push(object);
        					}
        				}else{
        					array1.push(object);
        				}
    				}else{
    					if(seachData==0){//过滤其他("临时安排")
    						if(flag == "1"){
    							array1.push(object)
    						}else{
    							if(typename!="" && typename!=null && typename!="undefined"){
                					array1.push(object);
                				}
    						}
    					}else if(seachData==1){//过滤其他("请假中")
        					if(ifqj!="" && ifqj!=null && ifqj!="undefined"){
        						if(ifqj == "1"){
        							array1.push(object);
        						}
        					}else{
        						array1.push(object);
        					}
    					}
    				}
    			})
    		}
    		eachfn(array1,oodata,1);
        	initfn1(array1);
			
	       //	initUserStatus(seachText);
       });
       
       $("body").delegate("#delfilter","click",function(){
	       	$("#filter_show").html("");
			initfn1(oodata);
	       	//initUserStatus();
       });
       
	}
	
	//通讯录搜索
	var o;
    var fn = function(obj,fullName){
        clearTimeout(o);
        o = setTimeout(function(){
            $ajax({
                url:searchUrl,
                async:false,
                data:{fullName:fullName},
                success:function(data){
                    var html="";
                    $.each(data.txlJson,function(i,item){
                        html+='<div class="searchList">'+
                            '	<p>'+item.xingming+'</p>'+
                            '	<p>'+item.shouji+'</p>'+
                            '	<p>'+item.zuoji+'</p>'+
                            '	<p>'+item.address+'</p>'+
                            '</div>'
                    })
                    $("#searchResult").html("");
                    $("#searchResult").append(html);
                }
            });
        },500)
    }
	
    return {
        //加载页面处理程序
        initControl: function () {
          initUserStatus();
		  initother();
        }
    }
}();



