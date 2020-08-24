jQuery.fn.extend({
	createGrid: function(obj) {
		obj.target = $(this).attr("id");
		var gridobj = new createtable(obj);
		return gridobj;
	}
});
var remeberTableTermGrid = window.top.remeberTableTerm;
var checkedarr = [];
//创建表格
function createtable(obj){
	//当前页号
	/* var newpage = obj.newpage||1; */
	var newpage = obj.currPage||1;
	//每页条数
	/* var pagesize = obj.pagesize; */
	var pagesize = obj.pageSize || 15;
	//总条数
	var total = 0;
	//总页数
	var totalpage = 1;
	//判断数据是否加载完的标识
	var loadfg = 0;
	//排序字段
	var sortcol = "";
	//排序方式
	var sorttype = "";
	//缓存表格数据
	var rowsdata = [];
	//多选框列宽度
	var checkwidth = 50;
	//行号列宽度
	var numberwidth = 80;
	var c1 = {};
	$(window).resize(function(){
		clearTimeout(c1);
		c1 = setTimeout(function(){
			create();
		},500)
	});
	//此处是对默认属性值的设置
	var getvalue = function(value,str){
		if(value==null||typeof(value)=="undefined"){ 

			var pobj = {
						width:"100%",
						height:"100%",
						loadbefore:function(){},
						loadafter:function(){},
						paramobj:{},
						rememberStatue:false,
						headheight:"40px",
						datarowheight:"30px",
						datatablebackgroundcolor:"transparent",
						headborder:"1px solid #ff0000",//n
						headbackgroundcolor:"#dddddd",//n
						headfont:{},//n
						datarowheight:"30px",//n
						databorder:"1px solid blue",
						datatableborder:"1px solid blue",//n
						datefont:{},//n
						gridId:"default",
						pageyno:true,
						pageheight:"38px",
						pagebackgroundcolor:"transparent",
						checkbox:false,
						rownumberyon:false,
						rownumberwidth:numberwidth+"px"
					   }
			return pobj[str];
		}else{
			return value;
		}
	}
	//创建表格
	var create = function(){
		var columns = obj.columns;
		var tablecontent = $("#"+obj.target);
		$("#"+obj.target).html("");
		
		$(window).resize(function(){
			o=window.o||'';
			clearTimeout(o);
			o = setTimeout(function(){
				create();
			},500)
		});
		tablecontent.css({width:getvalue(obj.width,"width"),height:getvalue(obj.height,"height")})
		//生成表头
		tablecontent.append('<div id="'+obj.target+'_hdtablediv" style="overflow:hidden;position:relative;height:'+getvalue(obj.headheight,"headheight")+'">'+
								'<table class="table table-striped table-bordered table-advance table-hover" id="'+obj.target+'_hdtable" style="position:absolute;"><thead><tr style="box-sizing:border-box"></tr></thead></table>'+
							'</div>');
		var hdtable = $("#"+obj.target+"_hdtable");
		hdtable.css({
			width:"100%",
			height:"100%",
			"table-layout":"fixed",
			"box-sizing":"border-box"
		});
		if(getvalue(obj.checkbox,"checkbox") == true){
			var checkth = $('<th><input type="checkbox" style="cursor:pointer" name="'+obj.target+'_checkth"/></th>');
			checkth.css({
					"text-align":"center",
					width:checkwidth+"px",
					"box-sizing":"border-box",
					height:getvalue(obj.headheight,"headheight")
				});
			checkth.find("input").click(function(){
				if(this.checked==true){
					$('input[name='+obj.target+'_checktd]').prop("checked","checked");
				}else{
					$('input[name='+obj.target+'_checktd]').removeProp("checked");
				}
			})
			hdtable.find("thead").find("tr").append(checkth);
		}
		if(getvalue(obj.rownumberyon,"rownumberyon")==true){
			var nclwidth = getcolwidth(getvalue(obj.rownumberwidth,"rownumberwidth"));
			var numberth = $('<th>序号</th>');
			numberth.css({
					"text-align":"center",
					width:nclwidth,
					"box-sizing":"border-box"
				});
			numberth.css(getvalue(obj.headfont,"headfont"))//n
			hdtable.find("thead").find("tr").append(numberth);
		}
		
		$.each(columns,function(i){
			var thdata = columns[i];
			var thobj = $('<th>'+thdata.display+'</th>');
			thobj.css({
				"text-align":thdata.align,
				width:getcolwidth(thdata.width),
				"box-sizing":"border-box",
				height:getvalue(obj.headheight,"headheight")
			});
			if(thdata.paixu==true){
				thobj.css({"position":"relative"})
				thobj.append('<span style="position:absolute;right:5px;cursor:pointer;" class="paixuname" id="'+thdata.name+'_col"><i style="position:absolute;right:0px;top:2px;" class="fa fa-sort-asc"></i><i  style="position:absolute;right:0px;top:2px;" class="fa  fa-sort-desc"></i></span>')
				var sorttext = "asc";
				thobj.find("span").click(function(){
					if(loadfg!=0){
						sortcol = this.id;
						return function(){
							sorttype = sorttext;
							$(".paixuname").html('<i style="position:absolute;right:0px;top:2px;" class="fa fa-sort-asc"></i><i  style="position:absolute;right:0px;top:2px;" class="fa  fa-sort-desc"></i>')
							if(sorttext == "asc"){
								$("#"+thdata.name+"_col").html('<i style="position:absolute;right:0px;top:2px;" class="fa fa-sort-asc"></i>');
								sorttext = "desc";
							}else{
								$("#"+thdata.name+"_col").html('<i  style="position:absolute;right:0px;top:2px;" class="fa  fa-sort-desc"></i>')
								sorttext = "asc";
							}
							
							ajaxtable()
							
						}();
					}
				})
			}
			thobj.css(getvalue(obj.headfont,"headfont"));//n
			hdtable.find("thead").find("tr").append(thobj);
		})
		hdtable.find("thead").find("tr").append('<th style="box-sizing:border-box"></th>');
		//生成数据表格 
		tablecontent.append('<div id="'+obj.target+'_content" style="overflow:auto;">'+
								'<table class="table table-striped table-bordered table-advance table-hover" id="'+obj.target+'_conttable"><tbody></tbody></table>'+
							'</div>');
		var content = $("#"+obj.target+"_content");
		content.css({
			"background-color":getvalue(obj.datatablebackgroundcolor,"datatablebackgroundcolor")//n
		});
		if(getvalue(obj.pageyno,"pageyno")==false){
			content.css({});
		}
		if(obj.overflowx==false){
			content.css("overflow-x","hidden");
		}
		if(obj.overflowy==false){
			content.css("overflow-y","hidden");
		}
		var conttable = $("#"+obj.target+"_conttable");
		conttable.addClass("pagegrid");
		conttable.css({
			width:"100%",
			"table-layout":"fixed",
			"box-sizing":"border-box"
		});
		$("#"+obj.target+"_content").scroll(function(){
			hdtable.css({"left":"-"+$("#"+obj.target+"_content").scrollLeft()+"px"})
		})
		content.css({
			"max-height":($("#"+obj.target).height()-($("#"+obj.target+"_hdtablediv").height()))+"px"
		});
		//生成分页
		if(getvalue(obj.pageyno,"pageyno")==true){
			tablecontent.append('<div id="'+obj.target+'_tablepage"></div>');
			var tablepage = $("#"+obj.target+"_tablepage");

			tablepage.css({
				height:getvalue(obj.pageheight,"pageheight"),
				"overflow":"hidden",
				"margin-top":"10px",
				"background-color":getvalue(obj.pagebackgroundcolor,"pagebackgroundcolor")
			});
			content.css({
				"max-height":($("#"+obj.target).height()-($("#"+obj.target+"_hdtablediv").height())-($("#"+obj.target+"_tablepage").height()))+"px"
			});
			
		}
		ajaxtable();
	}
	var params = {};
	//异步加载表格数据
	var ajaxtable = function(){
		getvalue(obj.loadbefore,"loadbefore")();
		loadfg = 0;
		var columns = obj.columns;
		var tablecontent = $("#"+obj.target);
		var conttable = $("#"+obj.target+"_conttable").find("tbody");
		conttable.html("");
		var paramobj = getvalue(obj.paramobj,"paramobj");
		for(key in params){
			paramobj[key] = params[key];
		};
		if(sortcol!=""){
			paramobj.sortname=sortcol.split("_")[0];
			paramobj.sorttype = sorttype;
		};
		var locapath = window.location.href.split("/app/")[1];
		if(remeberTableTermGrid!=null&&typeof(remeberTableTermGrid)!="undefined"){
			if(getvalue(obj.rememberStatue,"rememberStatue") == "true"){
				newpage = (remeberTableTermGrid[locapath]).newpage;
				paramobj = (remeberTableTermGrid[locapath]).paramobj;
			};
		};
		if(getvalue(obj.pageyno,"pageyno")==true){
			paramobj.pagesize = pagesize;
			paramobj.page = newpage;
		}else{
			pagesize = 200;
		};
		if(remeberTableTermGrid!=null&&typeof(remeberTableTermGrid)!="undefined"){
			remeberTableTermGrid[locapath]={
				newpage:newpage,
				paramobj:paramobj
			};
		};
		//alert(JSON.stringify(paramobj));
		var urlobj = obj.url;
		if(urlobj==null||typeof(urlobj)=="undefined"){
			return;
		}
		var url = urlobj.url;
		if(url==null||typeof(url)=="undefined"){
			return;
		}
		var dataType = urlobj.dataType;
		if(dataType==null||typeof(dataType)=="undefined"){
			dataType = 'json';
		}
		$.ajax({
			url:url,
			dataType : dataType,
			type:"GET",
			data:paramobj,
			success:function(data){
				if(dataType=="text"){
					data = eval("("+data+")");
				}
				if(data.data.list){
					rowsdata = data.data.list;
				}else{
					rowsdata = data.data
				}
				/*  rowsdata = data.rows;*/
				if(rowsdata.length==0){
					$("#"+obj.target+"_hdtablediv").height((parseInt(getvalue(obj.headheight,"headheight"))+8)+"px");
				}else{
					$("#"+obj.target+"_hdtablediv").height(getvalue(obj.headheight,"headheight"));
				};
				$.each(rowsdata,function(i){
					var data = rowsdata[i];
					var topClass = ""
					if(data.placeTopDisplay=='1'){
						topClass = "topClass";
					};
					var trobj = $('<tr style="box-sizing:border-box" class="'+topClass+'"></tr>');
					if(getvalue(obj.checkbox,"checkbox") == true){
						var checktd = $('<td><input type="checkbox" class="checkboxes" style="cursor:pointer;" id="'+obj.target+"_checkbox"+(i+1)+'" name="'+obj.target+'_checktd" /></td>');
						checktd.css({
							"text-align":"center",
							width:checkwidth+"px",
							"box-sizing":"border-box"
						});
						trobj.append(checktd)
					}
					if(getvalue(obj.rownumberyon,"rownumberyon")==true){
						var nclwidth = getcolwidth(getvalue(obj.rownumberwidth,"rownumberwidth"));
						var numbertd = $('<td>'+(i+1)+'</td>');
						numbertd.css({
							"text-align":"center",
							width:nclwidth,
							"box-sizing":"border-box"
						});
						trobj.append(numbertd)
					}

					$.each(columns,function(j){
						var tddata = columns[j];
						var colname = tddata.name;
						var tdtext = data[colname];
						var title = tddata.title;
						var gridId = "";
						if (obj.gridId) {
							gridId = obj.gridId;
						}
						if(title==null&&typeof(title)=="undefined"){
							title=false;
						};
						var renderfn = tddata.render;
						if(renderfn!=null&&typeof(renderfn)!="undefined"){
							tdtext=renderfn(data,i+1,tdtext);
						};
						//var tdobj = $('<td>'+tdtext+'</td>');
						//给每个列表td元素添加id
						var tdobj = $('<td id='+gridId+'tabledatarowcol'+i+j+'>'+tdtext+'</td>');
						tdobj.css({
							"text-align":tddata.align,
							width:getcolwidth(tddata.width),
							"box-sizing":"border-box",
							"text-overflow":"ellipsis",
							"overflow":"hidden",
							"white-space":"nowrap"
							
						});
						if(title==true){
							tdobj.attr({
								"title":tdtext
							});
						}
						trobj.append(tdobj)
					})
					trobj.append('<td style="box-sizing:border-box;text-overflow: ellipsis;overflow: hidden; white-space: nowrap;"></td>');
					conttable.append(trobj);
				});
				
				total = data.data.totalCount;
				var fg = total%pagesize;
				if(fg!=0){
					totalpage = ((total-fg)/pagesize)+1;
				}else{
					totalpage = total/pagesize;
				}
				if(getvalue(obj.pageyno,"pageyno")==true){
					var tablepage = $("#"+obj.target+"_tablepage");
					tablepage.html("");
					var pagehtml = "";
					
					if(totalpage<8){
						for(var i=1;i<totalpage+1;i++){
								pagehtml += ""+
									'    <li class="'+(newpage==i?"active":"")+'">'+
									'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+i+
									'        </a>'+
									'    </li>';
						}
					}else{
						if(newpage<5){
							for(var i=1;i<8;i++){
								if(i<6){
									pagehtml += ""+
										'    <li class="'+(newpage==i?"active":"")+'">'+
										'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+i+
										'        </a>'+
										'    </li>';
								}else if(i==6){
									pagehtml += ""+
										'    <li class="disabled">'+
										'        <a href="javascript:;">'+
										'        ...</a>'+
										'    </li>';
								}else if(i>6){
									pagehtml += ""+
										'    <li>'+
										'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+totalpage+
										'        </a>'+
										'    </li>';
								}
							}
						}else if(newpage>4){
							
							if(newpage<(totalpage-4)){
								for(var i=1;i<8;i++){
									if(i==1){
										pagehtml += ""+
											'    <li>'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+1+
											'        </a>'+
											'    </li>';
									}else if(i==2){
										pagehtml += ""+
											'    <li class="disabled">'+
											'        <a href="javascript:;">'+
											'        ...</a>'+
											'    </li>';
									}else if(i>2&&i<6){
										pagehtml += ""+
											'    <li class="'+(newpage==((newpage-2)+(i-2))?"active":"")+'">'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+((newpage-2)+(i-2))+
											'        </a>'+
											'    </li>';
									}else if(i==6){
										pagehtml += ""+
											'    <li class="disabled">'+
											'        <a href="javascript:;">'+
											'        ...</a>'+
											'    </li>';
									}else{
										pagehtml += ""+
											'    <li>'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+totalpage+
											'        </a>'+
											'    </li>';
									}
								}
							}else{
								for(var i=1;i<8;i++){
									if(i==1){
										pagehtml += ""+
											'    <li>'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+1+
											'        </a>'+
											'    </li>';
									}else if(i==2){
										pagehtml += ""+
											'    <li class="disabled">'+
											'        <a href="javascript:;">'+
											'        ...</a>'+
											'    </li>';
									}else{
										pagehtml += ""+
											'    <li class="'+(newpage==((totalpage-4)+(i-3))?"active":"")+'">'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+((totalpage-4)+(i-3))+
											'        </a>'+
											'    </li>';
									}
								}
							}
						}

					}
					
					
					tablepage.append('<div style="width:100%;height:38px;">'+
										'<div id="'+obj.target+'_tablepage1" style="float:left;box-sizing:border-box;padding-top:10px;">'+
											'<font style="font-size:12px;float:left;">共<font id="'+obj.target+'_totol">0</font>条信息，</font>'+
											'<font style="font-size:12px;float:left;">每页<font id="'+obj.target+'_limit">0</font>条。</font>'+
											'<a style="font-size:12px;float:left;" id="'+obj.target+'_refresh">跳转</a>'+
											'<input type="text" maxlength="6" style="border:1px solid #cccccc;float:left;width:40px;height:17px;font-size:12px;margin-left:10px;text-align:center;" value="'+newpage+'" id="'+obj.target+'_newpage"></input>'+
											'<font style="font-size:12px;margin-left:5px;float:left;">/</font>'+
											'<font style="font-size:12px;margin-left:5px;float:left;" id="'+obj.target+'_totolpage">1</font>'+
											'<font style="font-size:12px;margin-left:5px;float:left;">页</font>'+
										'</div>'+
										'<div id="'+obj.target+'_tablepage2" style="float:right;text-align:right;box-sizing:border-box;">'+
											'<ul class="pagination" style="margin:0px;float:right;">'+
											'    <li id="'+obj.target+'_prev">'+
											'        <a href="javascript:;">'+
											'        <i class="fa fa-angle-left"></i>'+
											'        </a>'+
											'    </li>'+pagehtml+
											'    <li id="'+obj.target+'_next">'+
											'        <a href="javascript:;">'+
											'        <i class="fa fa-angle-right"></i>'+
											'        </a>'+
											'    </li>'+
											'</ul>'+
										'</div>'+
									 '</div>');
					createpage();
				}
				getvalue(obj.loadafter,"loadafter")(data);
			},
			error : function(msg) {
				//alert("系统故障!");
			}
		});
	}
	
	//异步加载表格数据（只有数据）
	var ajaxtableOnlyData = function(){
		getvalue(obj.loadbefore,"loadbefore")();
		loadfg = 0;
		var columns = obj.columns;
		var tablecontent = $("#"+obj.target);
		var conttable = $("#"+obj.target+"_conttable").find("tbody");
		var paramobj = getvalue(obj.paramobj,"paramobj");
		if(sortcol!=""){
			paramobj.sortname=sortcol.split("_")[0];
			paramobj.sorttype = sorttype;
		}
		for(key in params){
			paramobj[key] = params[key];
		}
		if(getvalue(obj.pageyno,"pageyno")==true){
			paramobj.pagesize = pagesize;
			paramobj.page = newpage;
		}else{
			pagesize = 200;
		}
		var urlobj = obj.url;
		if(urlobj==null||typeof(urlobj)=="undefined"){
			return;
		}
		var url = urlobj.url;
		if(url==null||typeof(url)=="undefined"){
			return;
		}
		var dataType = urlobj.dataType;
		if(dataType==null||typeof(dataType)=="undefined"){
			dataType = 'json';
		}
		$.ajax({
			url:url,
			dataType : dataType,
			type:"GET",
			data:paramobj,
			success:function(data){
				if(dataType=="text"){
					data = eval("("+data+")");
				}
				/* rowsdata = data.rows; */
				rowsdata = data.data.list;
				if(rowsdata.length==0){
					$("#"+obj.target+"_hdtablediv").height((parseInt(getvalue(obj.headheight,"headheight"))+3)+"px");
				}else{
					$("#"+obj.target+"_hdtablediv").height(getvalue(obj.headheight,"headheight"));
				};
				$.each(rowsdata,function(i){
					var data = rowsdata[i];
					$.each(columns,function(j){
						var tddata = columns[j];
						var colname = tddata.name;
						var tdtext = data[colname];
						var title = tddata.title;
						var gridId = "";
						if (obj.gridId) {
							gridId = obj.gridId;
						}
						if(title==null&&typeof(title)=="undefined"){
							title=false;
						}
						var renderfn = tddata.render;
						if(renderfn!=null&&typeof(renderfn)!="undefined"){
							tdtext=renderfn(data,i+1,tdtext);
						}
						//给每个列表td元素的id添加数据
						$("#"+gridId+"tabledatarowcol"+i+j).html(tdtext);
						if(title==true){
							$("#"+gridId+"tabledatarowcol"+i+j).attr({
								"title":tdtext
							});
						}
					})
				});
				/* total = data.total; */
				total = data.data.totalCount;
				var fg = total%pagesize;
				if(fg!=0){
					totalpage = ((total-fg)/pagesize)+1;
				}else{
					totalpage = total/pagesize;
				}
				if(getvalue(obj.pageyno,"pageyno")==true){
					var tablepage = $("#"+obj.target+"_tablepage");
					tablepage.html("");
					var pagehtml = "";
					
					if(totalpage<8){
						for(var i=1;i<totalpage+1;i++){
								pagehtml += ""+
									'    <li class="'+(newpage==i?"active":"")+'">'+
									'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+i+
									'        </a>'+
									'    </li>';
						}
					}else{
						if(newpage<5){
							for(var i=1;i<8;i++){
								if(i<6){
									pagehtml += ""+
										'    <li class="'+(newpage==i?"active":"")+'">'+
										'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+i+
										'        </a>'+
										'    </li>';
								}else if(i==6){
									pagehtml += ""+
										'    <li class="disabled">'+
										'        <a href="javascript:;">'+
										'        ...</a>'+
										'    </li>';
								}else if(i>6){
									pagehtml += ""+
										'    <li>'+
										'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+totalpage+
										'        </a>'+
										'    </li>';
								}
							}
						}else if(newpage>4){
							
							if(newpage<(totalpage-4)){
								for(var i=1;i<8;i++){
									if(i==1){
										pagehtml += ""+
											'    <li>'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+1+
											'        </a>'+
											'    </li>';
									}else if(i==2){
										pagehtml += ""+
											'    <li class="disabled">'+
											'        <a href="javascript:;">'+
											'        ...</a>'+
											'    </li>';
									}else if(i>2&&i<6){
										pagehtml += ""+
											'    <li class="'+(newpage==((newpage-2)+(i-2))?"active":"")+'">'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+((newpage-2)+(i-2))+
											'        </a>'+
											'    </li>';
									}else if(i==6){
										pagehtml += ""+
											'    <li class="disabled">'+
											'        <a href="javascript:;">'+
											'        ...</a>'+
											'    </li>';
									}else{
										pagehtml += ""+
											'    <li>'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+totalpage+
											'        </a>'+
											'    </li>';
									}
								}
							}else{
								for(var i=1;i<8;i++){
									if(i==1){
										pagehtml += ""+
											'    <li>'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+1+
											'        </a>'+
											'    </li>';
									}else if(i==2){
										pagehtml += ""+
											'    <li class="disabled">'+
											'        <a href="javascript:;">'+
											'        ...</a>'+
											'    </li>';
									}else{
										pagehtml += ""+
											'    <li class="'+(newpage==((totalpage-4)+(i-3))?"active":"")+'">'+
											'        <a href="javascript:;" class="'+obj.target+'pbtn1">'+((totalpage-4)+(i-3))+
											'        </a>'+
											'    </li>';
									}
								}
							}
						}

					}
					
					
					tablepage.append('<div style="width:100%;height:38px;padding-top:5px;">'+
										'<div id="'+obj.target+'_tablepage1" style="float:left;box-sizing:border-box;padding-top:10px;">'+
											'<font style="font-size:12px;float:left;">共<font id="'+obj.target+'_totol">0</font>条信息，</font>'+
											'<font style="font-size:12px;float:left;">每页<font id="'+obj.target+'_limit">0</font>条。</font>'+
											'<a style="font-size:12px;float:left;" id="'+obj.target+'_refresh">跳转</a>'+
											'<input type="text" maxlength="6" style="border:1px solid #cccccc;float:left;width:40px;height:17px;font-size:12px;margin-left:10px;text-align:center;" value="'+newpage+'" id="'+obj.target+'_newpage"></input>'+
											'<font style="font-size:12px;margin-left:5px;float:left;">/</font>'+
											'<font style="font-size:12px;margin-left:5px;float:left;" id="'+obj.target+'_totolpage">1</font>'+
											'<font style="font-size:12px;margin-left:5px;float:left;">页</font>'+
										'</div>'+
										'<div id="'+obj.target+'_tablepage2" style="float:right;text-align:right;box-sizing:border-box;">'+
											'<ul class="pagination" style="margin:0px;float:right;">'+
											'    <li id="'+obj.target+'_prev">'+
											'        <a href="javascript:;">'+
											'        <i class="fa fa-angle-left"></i>'+
											'        </a>'+
											'    </li>'+pagehtml+
											'    <li id="'+obj.target+'_next">'+
											'        <a href="javascript:;">'+
											'        <i class="fa fa-angle-right"></i>'+
											'        </a>'+
											'    </li>'+
											'</ul>'+
										'</div>'+
									 '</div>');
					createpage();
				}
				getvalue(obj.loadafter,"loadafter")(data);
			},
			error : function(msg) {
				//alert("系统故障!");
			}
		});
	}
	//设置分页
	var createpage = function(){
		var tablepage1_Element = $("#"+obj.target+"_tablepage1");
		var prev_Element = $("#"+obj.target+"_prev");
		var newpage_Element = $("#"+obj.target+"_newpage");
		var totolpage_Element = $("#"+obj.target+"_totolpage");
		var next_Element = $("#"+obj.target+"_next");
		var refresh_Element = $("#"+obj.target+"_refresh");
		var tablepage2_Element = $("#"+obj.target+"_tablepage2");
		var totol_Element = $("#"+obj.target+"_totol");
		var limit_Element = $("#"+obj.target+"_limit");
		
		newpage_Element.val(newpage);
		totolpage_Element.html(totalpage);
		totol_Element.html(total);
		limit_Element.html(pagesize);

		if(newpage==1){
			prev_Element.unbind("click");
			prev_Element.unbind("mouseover");
			prev_Element.unbind("mouseout");
			prev_Element.addClass("disabled");
			if(totalpage==newpage){
				next_Element.unbind("click");
				next_Element.unbind("mouseover");
				next_Element.unbind("mouseout");
				next_Element.addClass("disabled");
			}else{
				next_Element.unbind("click");
				next_Element.click(function(){
					if(loadfg!=0){
						$("#gridcont_hdtable th input[name=gridcont_checkth]").attr("checked",false);
						newpage=newpage+1;
						obj.rememberStatue = false;
						ajaxtable();
					}
				})
			}
		}else{
			prev_Element.unbind("click");
			prev_Element.click(function(){
				if(loadfg!=0){
					$("#gridcont_hdtable th input[name=gridcont_checkth]").attr("checked",false);
					newpage=newpage-1;
					obj.rememberStatue = false;
					ajaxtable();
				}
			})
			if(totalpage==newpage){
				next_Element.unbind("click");
				next_Element.unbind("mouseover");
				next_Element.unbind("mouseout");
				next_Element.addClass("disabled");
			}else{
				
				next_Element.unbind("click");
				next_Element.click(function(){
					if(loadfg!=0){
						$("#gridcont_hdtable th input[name=gridcont_checkth]").attr("checked",false);
						newpage=newpage+1;
						obj.rememberStatue = false;
						ajaxtable();
					}
				})
			}
		}
		refresh_Element.unbind("click");
		refresh_Element.click(function(){
			if(loadfg!=0){
				pageval = parseInt($("#"+obj.target+"_newpage").val(),10);
				var pagenum = /^[0-9]*$/;	
				if(!pagenum.test(pageval)){
					newbootbox.alertInfo("请输入数字！");
					return ;
				}
				if(pageval>totalpage){
					newbootbox.alertInfo("输入的页数超过总页数，请重新输入！");
					return ;
				}
				if(pageval=="0"){
					newbootbox.alertInfo("输入数据不能0，请重新输入！");
					return ;
				}
				if(pageval<0){
					newbootbox.alertInfo("输入数据不能为负数，请重新输入！");
					return ;
				}
				
				$("#gridcont_hdtable th input[name=gridcont_checkth]").attr("checked",false);
				newpage = pageval;
				obj.rememberStatue = false;
				ajaxtable();
			}
		});
		
		$("."+obj.target+"pbtn1").click(function(){
			//getCheckRow();//调用下面的方法
			$("#gridcont_hdtable th input[name=gridcont_checkth]").attr("checked",false);
			if(loadfg!=0){
				newpage = parseInt(this.text);
				obj.rememberStatue = false;
				ajaxtable();
			}
		})
		//getRowIds();
		loadfg = 1;
	}

	//获取列宽度值
	var getcolwidth = function(colwidth){
		var contwidth = $("#"+obj.target).width()-2;
		if(getvalue(obj.checkbox,"checkbox") == true){
			contwidth=contwidth-checkwidth;
		}
		if(getvalue(obj.rownumberyon,"rownumberyon")==true){
			if(obj.rownumberwidth==null||typeof(obj.rownumberwidth)=="undefined"){
				contwidth = contwidth-numberwidth;
			}
		}

		var str = colwidth.substr(colwidth.length-2,2)
		if(str=="px"){
			colwidth = colwidth;
		}else{
			var str = colwidth.substr(0,colwidth.length-1)
			if((str.split(".")).length==2){
				colwidth = ((contwidth*(parseFloat(str,10)))/100)+"px";
			}else{
				colwidth = ((contwidth*(parseInt(str,10)))/100)+"px";
			}
		}
		return colwidth;
	}
	//获取选中行
	this.getcheckrow = function(){
		var checkarry = $('input[name='+obj.target+'_checktd]');
		var checkdata = [];
		for(var i=0;i<checkarry.length;i++){
			if(checkarry[i].checked==true){
				checkdata[checkdata.length] = rowsdata[(((checkarry[i].id).split("_checkbox"))[1])-1]
			};
		}
		return checkdata;
	} 
	//获取当前页的所有选中行的id
	this.getcheckedIds=function(){
		var rows=this.getcheckrow();
		if(!rows||rows.length<=0){return [];}
		var ids=[];
		for(var i in rows){
			ids.push(rows[i].id);
		}
		return ids;
	};
	
	//获取当前页所有id
	this.getrowids = function(){
		var checkarry = $('input[name='+obj.target+'_checktd]');
		var checkdata = [];
		for(var i=0;i<checkarry.length;i++){
			checkdata[checkdata.length] = rowsdata[(((checkarry[i].id).split("_checkbox"))[1])-1]
		}
		return checkdata;
	} 
	
	
	//获取选中行
	this.getrows = function(){
		var checkarry = $('input[name='+obj.target+'_checktd]');
		var checkdata = [];
		for(var i=0;i<checkarry.length;i++){
		   checkdata[checkdata.length] = rowsdata[(((checkarry[i].id).split("_checkbox"))[1])-1]
		}
		return checkdata;
	} 
	
	this.getCheckRow = function(){
		var datas = this.getcheckrow();
		$.each(datas, function(i,obj) {
			checkedarr.push(obj.id);
		});
	}
	
	this.getRowIds = function(){
		var rowids = this.getrowids(); //所有id
		for(var i=0;i<rowids.length;i++){
			if(checkedarr.toString().indexOf(rowids[i].id)>0){
				$('input[name='+rowids[i].id+'_checktd]').attr("checked","checked");
			}
		}
	}
	
	this.setparams = function(obj){
		params = obj;
	}
	
	//重载数据
	this.loadtable = function(){
		if(loadfg!=0){
			newpage = 1;
			obj.rememberStatue = false;
			ajaxtable();
		}
	}
	
	this.setpagesize = function(n){
		pagesize = n;
	}
	
	this.refresh = function(){
		ajaxtable();
	}
	//刷新数据
	this.refreshData = function(){
		ajaxtableOnlyData();
	}
	
	create();
}
