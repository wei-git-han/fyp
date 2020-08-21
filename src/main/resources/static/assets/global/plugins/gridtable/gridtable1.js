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
						pageheight:"30px",
						pagebackgroundcolor:"#ffffff",
						pageborder:"1px solid #cccccc",
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
					$('input[name='+obj.target+'_checktd]').attr("checked","checked");
				}else{
					$('input[name='+obj.target+'_checktd]').removeAttr("checked");
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
								$("#"+thdata.name+"_col").html('<i style="position:absolute;right:0px;top:2px;" class="fa fa-sort-desc"></i>');
								sorttext = "desc";
							}else{
								$("#"+thdata.name+"_col").html('<i  style="position:absolute;right:0px;top:2px;" class="fa  fa-sort-asc"></i>')
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
			height:($("#"+obj.target).height()-($("#"+obj.target+"_hdtablediv").height()))+"px"
		});
		//生成分页
		if(getvalue(obj.pageyno,"pageyno")==true){
			tablecontent.append('<div id="'+obj.target+'_tablepage"></div>');
			var tablepage = $("#"+obj.target+"_tablepage");

			tablepage.css({
				border:getvalue(obj.pageborder,"pageborder"),
				height:getvalue(obj.pageheight,"pageheight"),
				"overflow":"hidden",
				"background-color":getvalue(obj.pagebackgroundcolor,"pagebackgroundcolor")
			});
			content.css({
				height:($("#"+obj.target).height()-($("#"+obj.target+"_hdtablediv").height())-($("#"+obj.target+"_tablepage").height()))+"px"
			});
			tablepage.append('<div style="height:'+((($("#"+obj.target+"_tablepage").height())-30)/2)+'px;"></div>'+
							 '<div style="width:100%;height:30px;">'+
								'<div id="'+obj.target+'_tablepage1" style="height:30px;float:left;box-sizing:border-box;">'+
									'<div style="float:left;width:25px;height:30px;cursor: pointer;line-height:30px;text-align:center;" id="'+obj.target+'_firstpage"><i class="fa fa-step-backward"></i></div>'+
									'<div style="float:left;width:25px;height:30px;cursor: pointer;line-height:30px;text-align:center;" id="'+obj.target+'_prev"><i class="fa fa-chevron-left"></i></div>'+
									'<div style="float:left;width:90px;height:30px;">'+
										'<input type="text" maxlength="6" style="width:40px;height:30px;margin-left:10px;background-color:#CCE7CF;text-align:center" value="'+newpage+'" id="'+obj.target+'_newpage"></input>'+
										'<font style="font-size:15px;margin-left:5px;">/</font>'+
										'<font style="font-size:15px;margin-left:5px;" id="'+obj.target+'_totolpage">1</font>'+
									'</div>'+
									'<div style="float:left;width:25px;height:30px;cursor: pointer;line-height:30px;text-align:center;" id="'+obj.target+'_next"><i class="fa fa-chevron-right"></i></div>'+
									'<div style="float:left;width:25px;height:30px;cursor: pointer;line-height:30px;text-align:center;" id="'+obj.target+'_lastpage"><i class="fa fa-step-forward"></i></div>'+
									'<div style="float:left;width:25px;height:30px;cursor: pointer;line-height:30px;text-align:center;" id="'+obj.target+'_refresh"><i class="fa fa-refresh"></i></div>'+
								'</div>'+

								'<div id="'+obj.target+'_tablepage2" style="height:30px;float:right;text-align:right;padding-right:10px;box-sizing:border-box;line-height:30px;">'+

									'<font style="font-size:12px;">总<font id="'+obj.target+'_totol">0</font>条，</font>'+
									'<font style="font-size:12px;">每页显示<font id="'+obj.target+'_limit">0</font>条</font>'+

								'</div>'+
							 '</div>');
		}
		ajaxtable();
	}
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
			paramobj.sortname=sortcol;
			sortcol="";
			paramobj.sorttype = sorttype;
		}
		$.ajax({
			url : obj.url,
			dataType : "json",
			data:paramobj,
			success:function(data){
				//data = '{"total":42,"page":1,"rows":[{"column1":"a1","column2":"b","column3":"c","column4":"d","column5":"e"},{"column1":"a2","column2":"b1","column3":"c1","column4":"d1","column5":"e1"},{"column1":"a3","column2":"a","column3":"b","column4":"c","column5":"d"},{"column1":"a4","column2":"a","column3":"a","column4":"a","column5":"a"},{"column1":"a5","column2":"a1","column3":"a1","column4":"a1","column5":"a1"},{"column1":"a6","column2":"a1","column3":"a1","column4":"a1","column5":"a1"},{"column1":"a7","column2":"a1","column3":"a1","column4":"a1","column5":"a1"},{"column1":"a8","column2":"a1","column3":"a1","column4":"a1","column5":"a1"},{"column1":"a9","column2":"a1","column3":"a1","column4":"a1","column5":"a1"},{"column1":"a10","column2":"a1","column3":"a1","column4":"a1","column5":"a1"},{"column1":"a11","column2":"a1","column3":"a1","column4":"a1","column5":"a1"},{"column1":"a36","column2":"a1","column3":"a1","column4":"a1","column5":"a1"},{"column1":"a13"},{"column1":"a12"},{"column1":"a30"},{"column1":"a15"},{"column1":"a16"},{"column1":"a17"},{"column1":"a18"},{"column1":"a19"}]}'
				//data = eval("("+data+")");
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
							"box-sizing":"border-box"
						});
						trobj.append(tdobj)
					})
					trobj.append('<td style="box-sizing:border-box"></td>');
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
		var firstpage_Element = $("#"+obj.target+"_firstpage");
		firstpage_Element.mouseover(function(){$(this).css({"background-color":"#dddddd"})})
		firstpage_Element.mouseout(function(){$(this).css({"background-color":"#ffffff"})})
		var prev_Element = $("#"+obj.target+"_prev");
		prev_Element.mouseover(function(){$(this).css({"background-color":"#dddddd"})})
		prev_Element.mouseout(function(){$(this).css({"background-color":"#ffffff"})})
		var newpage_Element = $("#"+obj.target+"_newpage");
		var totolpage_Element = $("#"+obj.target+"_totolpage");
		var next_Element = $("#"+obj.target+"_next");
		next_Element.mouseover(function(){$(this).css({"background-color":"#dddddd"})})
		next_Element.mouseout(function(){$(this).css({"background-color":"#ffffff"})})
		var lastpage_Element = $("#"+obj.target+"_lastpage");
		lastpage_Element.mouseover(function(){$(this).css({"background-color":"#dddddd"})})
		lastpage_Element.mouseout(function(){$(this).css({"background-color":"#ffffff"})})
		var refresh_Element = $("#"+obj.target+"_refresh");
		refresh_Element.mouseover(function(){$(this).css({"background-color":"#dddddd"})})
		refresh_Element.mouseout(function(){$(this).css({"background-color":"#ffffff"})})
		var tablepage2_Element = $("#"+obj.target+"_tablepage2");
		var totol_Element = $("#"+obj.target+"_totol");
		var limit_Element = $("#"+obj.target+"_limit");
		
		newpage_Element.val(newpage);
		totolpage_Element.html(totalpage);
		totol_Element.html(total);
		limit_Element.html(pagesize);

		if(newpage==1){
			firstpage_Element.unbind("click");
			firstpage_Element.unbind("mouseover");
			firstpage_Element.unbind("mouseout");
			firstpage_Element.css({"background-color":"#dddddd","cursor":"auto"})
			prev_Element.unbind("click");
			prev_Element.unbind("mouseover");
			prev_Element.unbind("mouseout");
			prev_Element.css({"background-color":"#dddddd","cursor":"auto"});
			if(totalpage==newpage){
				lastpage_Element.unbind("click");
				lastpage_Element.unbind("mouseover");
				lastpage_Element.unbind("mouseout");
				lastpage_Element.css({"background-color":"#dddddd","cursor":"auto"})
				next_Element.unbind("click");
				next_Element.unbind("mouseover");
				next_Element.unbind("mouseout");
				next_Element.css({"background-color":"#dddddd","cursor":"auto"})
			}else{
				
				lastpage_Element.css({"background-color":"#ffffff","cursor":"pointer"})
				next_Element.css({"background-color":"#ffffff","cursor":"pointer"})

				next_Element.unbind("click");
				next_Element.click(function(){
					if(loadfg!=0){
						newpage=newpage+1;
						ajaxtable();
					}
				})
				lastpage_Element.unbind("click");
				lastpage_Element.click(function(){
					if(loadfg!=0){
						newpage=totalpage;
						ajaxtable();
					}
				});
			}
		}else{

			firstpage_Element.css({"background-color":"#ffffff","cursor":"pointer"})
			prev_Element.css({"background-color":"#ffffff","cursor":"pointer"})

			firstpage_Element.unbind("click");
			firstpage_Element.click(function(){
				if(loadfg!=0){
					newpage=1;
					ajaxtable();
				}
			})
			prev_Element.unbind("click");
			prev_Element.click(function(){
				if(loadfg!=0){
					newpage=newpage-1;
					ajaxtable();
				}
			})
			if(totalpage==newpage){
				lastpage_Element.unbind("click");
				lastpage_Element.unbind("mouseover");
				lastpage_Element.unbind("mouseout");
				lastpage_Element.css({"background-color":"#dddddd","cursor":"auto"})
				next_Element.unbind("click");
				next_Element.unbind("mouseover");
				next_Element.unbind("mouseout");
				next_Element.css({"background-color":"#dddddd","cursor":"auto"})
			}else{
				
				lastpage_Element.css({"background-color":"#ffffff","cursor":"pointer"})
				next_Element.css({"background-color":"#ffffff","cursor":"pointer"})

				next_Element.unbind("click");
				next_Element.click(function(){
					if(loadfg!=0){
						newpage=newpage+1;
						ajaxtable();
					}
				})
				lastpage_Element.unbind("click");
				lastpage_Element.click(function(){
					if(loadfg!=0){
						newpage=totalpage;
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
	//重载数据
	this.loadtable = function(){
		if(loadfg!=0){
			newpage = 1;
			ajaxtable();
		}
	}
	
	create();
}