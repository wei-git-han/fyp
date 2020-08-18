var url1 = {"url":"","dataType":"text"};
var pageModule = function () {
	var initother = function(){
		$("#iframeLeft").attr("src", "");
	}
  
    return {
        //加载页面处理程序
        initControl: function () {
            initother();
        }
    }
}();



