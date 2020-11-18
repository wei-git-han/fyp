var tzggUrl = {"url":"/app/fyp/informAfficheController/informAfficheList","dataType":"text"};
var notReadCountUrl = {"url":"/app/fyp/informAfficheController/getNotReadCount","dataType":"text"};
var pageModule = function () {
	var inittzgg = function(type){
		$ajax({
			url: tzggUrl,
			data:{afficheType:type},
			success: function(data) {
				var arryHtml = '';
				$.each(data.data.resList, function(i, o) {
					var class1 = "";
					if(o.contentmudelsid === '0'){ // 已读
						class1 = "top3";
					} else{
						class1 = "top31";
					}
					// 未读状态 字体为白色  加hover属性时 颜色为黄色  已读字体颜色为蓝色 没有hover属性    contentmudelsid： 0:已读  -1：未读
					arryHtml+=  '<dl class="'+class1+'" style="cursor: pointer" onclick="openById(\''+data.data.appId+'\',\''+o.contentid+'\',\''+data.data.ip+'\',\''+i+'\')">'+
								'	<dt><span>'+parseInt(i+1)+'</span>'+o.title+'</dt>'+
								'	<dd>'+o.releaseTime+'</dd>'+
								'</dl>'
				});
				$("#mainContent").html(arryHtml);
				initReadCount()
			}
		})
	}
	var initReadCount = function(){
        $ajax({
            url:notReadCountUrl,
            success:function(res){
                if(res.data){
                    if(res.data.notreadNumJu){
                        $('.readNumJu').html(res.data.notreadNumJu)
                        $('.readNumJu').show()
                    }else{
                        $('.readNumJu').hide()
                    }
                    if(res.data.notreadNumBu){
                       $('.readNumBu').html(res.data.notreadNumBu)
                       $('.readNumBu').show()
                    }else{
                      $('.readNumBu').hide()
                    }
                    if(res.data.notreadNumXt){
                       $('.readNumXt').html(res.data.notreadNumXt)
                       $('.readNumXt').show()
                    }else{
                      $('.readNumXt').hide()
                    }
                }
            }
        })
	}

	var initother = function(){
		//点击事件
		$(".nav li").click(function() {
			inittzgg($(this).attr("data"));
		});
	}
    return {
        //加载页面处理程序
        initControl: function () {
			inittzgg($(".nav>li.active").attr("data"));
			initother();
        },
		refreshPage:function () {
			inittzgg($(".nav>li.active").attr("data"));
		}
    }
}();



function openById(appid,id,domain){
	window.top.openfn1(appid,`/affiche/viewInfo_fyp?cid=${id}`,domain)
}
