	$(".btncont1").click(function(){
		$(".btncont1").removeClass("active");
		$(this).addClass("active");
		var name = $(this).attr("name");
		if(null!=name&&typeof(name)!="undefined"&&""!=$.trim(name)){
			$(".newcont1").removeClass("active");
			$("#"+name).addClass("active");
		};
	});
	
	var fjn = 0;
	$("#tjfj").click(function(){
		fjn += 1;
		$("#fjcont").append(
			'<input type="file" name="files" class="'+fjn+'">'
		);
		$("."+fjn).change(function(){
			var val = $(this).val();
			
			var array = val.split("\\");
			var filename = "";
			if(array.length==1){
				filename = array[0];
			}else{
				filename = array[array.length-1];
			}
			$("#filelist").append(
				'<div class="bottom10">'+
				'	<div style="float:left;">'+
				'		<img src="../../../templates/admin/images/u60.png" style="height:30px;"/>'+
				'	</div>'+
				'	<div style="float:right;line-height:30px;">'+
				'		<a title="删除" class="'+fjn+'_bt1"><i class="fa fa-trash-o"></i></a>'+
				'	</div>'+
				'	<div style="padding-left:40px;padding-right:20px;line-height:30px;">'+
				'		<a  class="hideword">'+filename+'</a>'+
				'	</div>'+
				'</div>'
			)
			$("."+fjn+"_bt1").click(function(){
				$(this).parent().parent().remove();
				$("."+fjn).remove();
			});
		})
		$("."+fjn).click();

	})
	
	$("#returnbtn").click(function(){
		if(!$("#appcont1").hasClass("active")){
			$(".appcontent").removeClass("active");
			$("#appcont1").addClass("active");
		}
	})
	
	$(".bottombtn").click(function(){
		$(".appcontent").removeClass("active");
		$("#appcont2").addClass("active");
		$("#btncont1_cont4").addClass("active");
	});
	
	$(".appuser").click(function(){
		$(this).toggleClass("active");
	})
	
	var treeurl = {"url":"../../../templates/admin/data/tree.json","dataType":"text"};
	
	$ajax({
		url:treeurl,
		success:function(data){
			
			$("#tree_2").jstree({
			    "plugins": ["wholerow", "types" , "checkbox"],
			    "core": {
			    "themes" : {
			        "responsive": false
			    },    
			    "data": data,
			    },
			    "types" : {
			    	"default" : {
				        "icon" : "peoples_img"
				    },
				    "file" : {
				        "icon" : "peoples_img"
				    },
				    "1" : {
				        "icon" : "people_img"
				    }
			    }
			});
			
			$("#tree_2").on("select_node.jstree", function(e,data) { 
			    var id = $("#" + data.selected).attr("id");
			});
			
		}
	})
	
	$("#fasong").click(function(){
		newbootbox.alert("发送成功！");
	})