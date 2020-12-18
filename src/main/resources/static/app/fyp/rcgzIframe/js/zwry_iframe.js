var searchUrl = {url:'/app/fyp/reignCaseController/getTxlInfo',dataType:'text'};
var pagemenu = {url:'/app/fyp/reignCaseController/reignCaseJsonObject',dataType:'text'};
var url101 = {"url":"/reignstate/list","dataType":"text"};
var url102 = {"url":"/reignuser/saveOrUpdate","dataType":"text"};
var url103 = {"url":"/reignuser/info","dataType":"text"};
var url104 = {"url":"/reignstate/list","dataType":"text"};
var url105 = {"url":"/reignstate/saveOrUpdate","dataType":"text"};
var url106 = {"url":"/reignstate/delete","dataType":"text"};
var fullName="";
var userobj = {};
var loginUserId="";
var pageModule = function () {
	var os = {};
    var oodata = [];
	var initUserStatus = function() {
		$ajax({
			url:pagemenu,
			success:function(data){

				var data1 = [];
				data1.push(data.data);
				data = data1;
				var array = data;

				oodata = array;
				initfn1(array);

				$("#zxNum").html(data[0].zx!=null?data[0].zx:0);
				$("#lxNum").html(data[0].lx!=null?data[0].lx:0);
				$("#qjNum").html(data[0].qj!=null?data[0].qj:0);
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
						if(lx!="" && lx!=null && lx!="undefined"){
							zxhtml = '<span class="number" data="'+id+'">{'+lx+'}</span>';
						}
					}
					if($("#filter_show").text()=="临时安排"){
						if(bg!="" && bg!=null && bg!="undefined"){
							zxhtml = '<span class="number" data="'+id+'">{'+bg+'}</span>';
						}
					}
					if($("#filter_show").text()=="请假"){
						if(qj!="" && qj!=null && qj!="undefined"){
							zxhtml = '<span class="number" data="'+id+'">{'+qj+'}</span>';
						}
					}

				}

				//判断是否在线，1在线，0离线
				if(status!="" && status!=null && status!="undefined"){
					if(status == "1"){
						statushtml = '在线';
						strlength += (pid+";"+o.id)+";";
					}else{
						statushtml = '离线';
					}
				}

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
							'	<a style="padding-left:' + ((n-1) * pl) + 'px;" id="' + id + '" data="' + text + '" >'+
							'		<span class="newstatusL">'+img+text+'</span>'+
							'		<span class="newstatusR"><font>'+numberhtml+zxhtml+typehtml+statushtml+'</font>'+icon+'</span>'+
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

		//设置
		$("#set").click(function(){
			/*添加判断部或者局
			 * //部
			newbootbox.newdialog({
				id:"bsetDialog",
				width:825,
				height:456,
				header:true,
				headerStyle:{
					"background":"#428bca"
				},
				title:"人员在位状态设置",
				style:{
					"padding":"0px"
				},
				url:"/app/fyp/bset.html"
			})*/

			//局
			newbootbox.newdialog({
				id:"jsetDialog",
				width:825,
				height:456,
				header:true,
				headerStyle:{
					"background":"#428bca"
				},
				title:"人员在位状态设置",
				style:{
					"padding":"0px"
				},
				url:"../jset.html"
			})
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

		//editmodal
		$(".form_datetime").datetimepicker({
			language:"zh-CN",
			autoclose: true,
			startView:"day",
			maxView:"month",
			minView:"hour",
			format: "yyyy-mm-dd hh:ii:ss",
			pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left")
		});
		$("#editbutton").live("click",function(){
			initzttype(function(){

				var id = userobj.id;
				var username = userobj.username;
				var resultCode = userobj.resultCode;
				var type = userobj.state;
				var time1 = userobj.time1;
				var time2 = userobj.time2;

				if(userobj.time1){//编辑状态
					$("#zttype option").each(function(){
						if($(this).val()==type){
							this.selected=true;
						}
					});
					$("#time1").val(time1);
					$("#time2").val(time2);
				}else{//新增状态
					var newdate = new Date();
					newdate = newdate.format("yyyy-MM-dd hh:mm:ss");
					$("#time1").val(newdate);
					$("#time2").val(newdate);
				}
				$('#datetimepicker').datetimepicker('update');
				$("#editmodal").modal("show");
			})
		})
		$("#queding1").click(function(){
			vobject.validate({
				gz: {
					zttype: {
						required: true,
					}
				},
				msg: {
					zttype: {
						required: "请输入状态"
					}
				},
				fn1:function(){
					var paramdata = getformdata(["zttype","time1","time2"]);
					var param={}
					param.stateId = paramdata.zttype
					param.stateName = paramdata.zttype
					param.startTime = paramdata.time1
					param.endTime = paramdata.time2
					param.id = userobj.id;
					$ajax({
						url:url102,
						data:param,
						type:"post",
						success:function(data){
							if(data.msg=="success"){
								$("#editmodal").modal("hide");
								window.location.reload();
							}
						}
					})
				},
				fn2:function(){},
			});
		});
		$(".quxiao1").click(function(){
			$("#editmodal").modal("hide");
		})

		$("#xzbj").click(function(){

			$ajax({
				url:url104,
				success:function(data2){
					//var glztdata = [
					//	{id:"01",name:"开会中"},
					//	{id:"02",name:"外出办事中"}
					//]
					var glztdata = data2.data
					$("#glztcont").html("");
					$.each(glztdata,function(i,o){
						var id = o.id;
						var name = o.name;
						//字典类型  0：自定义 1：系统字典
						// var type = o.type;

						var edithtml = '<a class="glztview1 editglzt" >编辑</a>';
						var deletehtml = '&nbsp;&nbsp;<a class="glztview1 deleteglzt" >删除</a>';
						var savehtml = '<a class="glztview2 saveglzt" >保存</a>';
						var qxhtml = '&nbsp;&nbsp;<a class="glztview2 qxglzt" >取消</a>';
						//
						//
						// if(type==1){
						// 	edithtml = '';
						// 	deletehtml = '';
						// 	savehtml = '';
						// 	qxhtml = '';
						// }

						$("#glztcont").append(`
							<div class="group1">
						        <div class="form-group" id="${id}">
						            <div class="glztview1 glztname">
						            	${name}
						            </div>
						            <input type="text" class="form-control glztview2" name="newtype">
						        </div>
						        <div>${edithtml}${deletehtml}${savehtml}${qxhtml}
						        </div>
					        </div>
						`);

					});
					$("#glztmodal").modal("show");



				}

			})


		});



		var deleteidarray = [];
		//glztmodal
		$(".editglzt").live("click",function(){
			var value = $(this).parents(".group1").find(".glztname").text();
			$(this).parents(".group1").find("[type=text]").val($.trim(value));
			$(this).parents(".group1").find(".glztview1").hide();
			$(this).parents(".group1").find(".glztview2").show();
		});
		$(".deleteglzt").live("click",function(){
			var id = $(this).parents(".group1").find(".form-group").attr("id");
			if($.trim(id)!=""){
				deleteidarray.push(id);
			}
			$(this).parents(".group1").remove();
		});
		$(".saveglzt").live("click",function(){
			var obj = this;
			vobject.validate({
				hobject:$(obj).parents(".group1"),
				gz: {
					newtype: {
						required: true,
						minlength: 2,
						maxlength:10
					}
				},
				msg: {
					newtype: {
						required: "请输入状态",
						minlength: "最小长度为两个字符",
						maxlength: "最大长度为十个字符"
					}
				},
				fn1:function(){
					var value = $(obj).parents(".group1").find("[type=text]").val();
					$(obj).parents(".group1").find(".glztname").text(value);
					$(obj).parents(".group1").find(".glztview1").show();
					$(obj).parents(".group1").find(".glztview2").hide();
				}
			});
		});
		$(".qxglzt").live("click",function(){
			vobject.hide($(this).parents(".group1"));
			$(this).parents(".group1").find(".glztview1").show();
			$(this).parents(".group1").find(".glztview2").hide();
		});

		$("#addglzt").click(function(){
			vobject.validate({
				gz: {
					addtype: {
						required: true,
						minlength: 2,
						maxlength:10
					}
				},
				msg: {
					addtype: {
						required: "请输入状态",
						minlength: "最小长度为两个字符",
						maxlength: "最大长度为十个字符"
					}
				},
				fn1:function(){
					var value = $("#addtype").val();
					$("#glztcont").prepend(`
						<div class="group1">
					        <div class="form-group" id="">
					            <div class="glztview1 glztname">
					            	${value}
					            </div>
					            <input type="text" class="form-control glztview2" name="newtype">
					        </div>
					        <div>
				            	<a class="glztview1 editglzt" >编辑</a>
				            	<a class="glztview1 deleteglzt" >删除</a>
				            	<a class="glztview2 saveglzt" >保存</a>
				            	<a class="glztview2 qxglzt" >取消</a>
					        </div>
				        </div>
					`);
					$("#addtype").val("");
				}
			});
		});
		$("#queding2").click(function(){
			vobject.hide($("#glztmodal"));
			$(".newvalidate").removeClass("newvalidate");
			$("#alert").html("").hide();
			if($(".glztview2:visible").length>0){
				$(".glztview2:visible[type=text]").addClass("newvalidate");
				$("#alert").html("请先保存编辑中的数据 !").show();
			}else{
				var glztarray = [];
				$(".glztname").each(function(){
					var obj = {
						id:$(this).parent().attr("id"),
						name:$.trim($(this).text())
					}
					glztarray.push(obj);
				});
				$ajax({
					url:url106,
					data:{ids:deleteidarray.join(",")},
					async:false,
					success:function (res) {

					}
				})
				$.ajax({
					url:url105.url,
					"contentType":'application/json;charset=utf-8',
					data:JSON.stringify({list:glztarray}),
					type:'post',
					success:function(data){
						//var msg =data.errorMsg;
						if(data.resultCode==1){
							var msg =data.errorMsg;
							newbootbox.alert(msg).done(function(){
								if(data.msg=="success"){
									$("#glztmodal").modal("hide");
								}
							})
						}else{
							if(data.msg=="success"){
								$("#glztmodal").modal("hide");
							}
						}

						initzttype(function(){//刷新下拉框
							// var resultCode = userobj.resultCode;
							// var type = userobj.type;

							// if(resultCode==1){//编辑状态
								$("#zttype option").each(function(){
									if($(this).val()==userobj.stateId){
										this.selected=true;
									}
								});
							// }
						})

					}
				})
			};
		});
		$(".quxiao2").click(function(){
			$(".newvalidate").removeClass("newvalidate");
			$("#alert").html("").hide();
			$("#glztmodal").modal("hide");
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
	var inituser = function(){
		$ajax({
			url:url103,
			success:function(data){
				data = data.data
				console.log(data)
				var id = data.id
				var resultCode = data.resultCode;
				var username = data.userName;
				var type = data.stateName;
				var state = data.stateId;
				var time1 = getdateformtfn(data.begintime)
				var time2 = getdateformtfn(data.endtime);
				var userid = data.userid;
				userobj.id = id;
				userobj.resultCode = resultCode;
				userobj.username = username;
				userobj.type = type;
				userobj.state = data.stateId;
				userobj.time1 = data.begintime;
				userobj.time2 = data.endtime;

				var html = `
					<img src="../images/tip.png">
					<font>${username}</font>
    			`;
				//
				// //if(typeof(type)!="undefined"&&type!=null&&$.trim(type)!=""){
				// if(resultCode=='1'){
				// 	data_info = `${type}:${time1}-${time2}`;
				// 	html+= `
    			// 		<font>(</font>
    			// 		<font>${type}</font>
    			// 		<font>${time1}</font>
    			// 		<font>-</font>
    			// 		<font>${time2}</font>
    			// 		<i class="fa fa-info-circle tptext" data=${userid} datatype="0" data_info="${data_info}"></i>
    			// 		<font>)</font>
    			// 		<i class="fa fa-edit" id="editbutton"></i>
        		// 	`
				// }else{
					html+= `<i class="fa fa-edit" id="editbutton"></i>`
				// }
				console.log(html)
				$(".newtitle").html(html)

			}
		})
	}
    return {
        //加载页面处理程序
        initControl: function () {
			inituser();
            initUserStatus();
		    initother();
        },
		refreshPage:function () {
			initUserStatus();
		}
    }
}();



var initzttype = function(fn){
	$ajax({
		url:url101,
		success:function(data){
			if(data.length>0){

//					var data =  [{
//						text:"开会中",
//						value:"01"
//					},{
//						text:"外出办事",
//						value:"02"
//					}];
			}
			// initselect("zttype",data);
			if(data.data){
				$("#zttype").html("");
				var html = "<option value=''>--请选择--</option>";
				$.each(data.data,function(i){
					if(($.trim(data.data[i].name)).indexOf("请选择")==-1){
						html+='<option value='+data.data[i].id+'>'+data.data[i].name+'</option>';
					}
				});
				$("#zttype").append(html);
			}
			if(userobj.state){
				$('#zttype').val(userobj.state)
			}
			if(userobj.time1){
				$('#time1').val(userobj.time1)
			}
			if(userobj.time2){
				$('#time2').val(userobj.time2)
			}
			if(fn){fn()}
		}
	});
}
