jQuery.fn.extend({
	createGrid: function(obj) {
		obj.target = $(this).attr("id");
		var gridobj = new createtable(obj);
		return gridobj;
	}
});
//创建表格
function createtable(obj){
	//当前页号
	var newpage = 1;
	//每页条数
	var pagesize = obj.pagesize;
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
	var numberwidth = 70;
	//此处是对默认属性值的设置
	var c1 = {};
	$(window).resize(function(){
		clearTimeout(c1);
		c1 = setTimeout(function(){
			create();
		},500)
	});
	
	
	var getvalue = function(value,str){
		if(value==null||typeof(value)=="undefined"){ 

			var pobj = {
						width:"100%",
						height:"100%",
						loadbefore:function(){},
						loadafter:function(){},
						paramobj:{},
						headheight:"36px",
						datarowheight:"30px",
						datatablebackgroundcolor:"#ffffff",
						headborder:"1px solid #ff0000",//n
						headbackgroundcolor:"#dddddd",//n
						headfont:{},//n
						datarowheight:"30px",//n
						databorder:"1px solid blue",
						datatableborder:"1px solid blue",//n
						datefont:{},//n
						pageyno:true,
						pageheight:"38px",
						pagebackgroundcolor:"#ffffff",
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
		tablecontent.css({width:getvalue(obj.width,"width"),height:getvalue(obj.height,"height")})
		
		
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
		content.css({
			height:($("#"+obj.target).height())+"px"
		});
		//生成分页
		if(getvalue(obj.pageyno,"pageyno")==true){
			tablecontent.append('<div id="'+obj.target+'_tablepage"></div>');
			var tablepage = $("#"+obj.target+"_tablepage");

			tablepage.css({
				height:getvalue(obj.pageheight,"pageheight"),
				"overflow":"hidden",
				"background-color":getvalue(obj.pagebackgroundcolor,"pagebackgroundcolor")
			});
			content.css({
				height:($("#"+obj.target).height()-($("#"+obj.target+"_hdtablediv").height())-($("#"+obj.target+"_tablepage").height()))+"px"
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
		paramobj.pagesize = pagesize;
		paramobj.page = newpage;
		if(sortcol!=""){
			paramobj.sortname=sortcol.split("_")[0];
			sortcol="";
			paramobj.sorttype = sorttype;
		}
		for(key in params){
			paramobj[key] = params[key];
		}
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
				rowsdata = data.rows;
				$.each(rowsdata,function(i){
					var data = rowsdata[i];
					var trobj = $('<tr style="box-sizing:border-box"></tr>');
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
						
						var renderfn = tddata.render;
						
						if(renderfn!=null&&typeof(renderfn)!="undefined"){
							tdtext=renderfn(data,i+1);
						}
						var tdobj = $('<td>'+tdtext+'</td>');
						tdobj.css({
							"text-align":tddata.align,
							width:getcolwidth(tddata.width),
							"box-sizing":"border-box",
							"text-overflow":"ellipsis",
							"overflow":"hidden",
							"white-space":"nowrap"
							
						});
						trobj.append(tdobj)
					})
					trobj.append('<td style="box-sizing:border-box;text-overflow: ellipsis;overflow: hidden; white-space: nowrap;"></td>');
					conttable.append(trobj);
				});
				
				total = data.total;
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
											'<input type="text" maxlength="6" style="border:1px solid #cccccc;float:left;width:40px;height:20px;margin-left:10px;text-align:center;" value="'+newpage+'" id="'+obj.target+'_newpage"></input>'+
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
				alert("系统故障!");
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
						newpage=newpage+1;
						ajaxtable();
					}
				})
			}
		}else{
			prev_Element.unbind("click");
			prev_Element.click(function(){
				if(loadfg!=0){
					newpage=newpage-1;
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
						newpage=newpage+1;
						ajaxtable();
					}
				})
			}
		}
		refresh_Element.unbind("click");
		refresh_Element.click(function(){
			if(loadfg!=0){
				pageval = parseInt($("#"+obj.target+"_newpage").val(),10);
				if(pageval>totalpage||pageval<1){
					alert("请重新输入！")
				}else{
					newpage = pageval;
					ajaxtable();
				}
				
			}
		});
		
		$("."+obj.target+"pbtn1").click(function(){
			if(loadfg!=0){
				newpage = parseInt(this.text);
				ajaxtable();
			}
		})
		loadfg = 1;
	}

	//获取列宽度值
	var getcolwidth = function(colwidth){
		var contwidth = $("#"+obj.target).width();
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
	
	this.setparams = function(obj){
		params = obj;
	}
	
	//重载数据
	this.loadtable = function(){
		if(loadfg!=0){
			newpage = 1;
			ajaxtable();
		}
	}
	
	this.setpagesize = function(n){
		pagesize = n;
	}
	
	this.refresh = function(){
		ajaxtable();
	}
	
	create();
}