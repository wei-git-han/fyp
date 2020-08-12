var getDefaultApprovelTimeUrl = {"url":"/app/db/documentjcdb/getDefaultApprovelTime","dataType":"text"};
var setDefaultApprovelTimeUrl = {"url":"/app/db/documentjcdb/setDefaultApprovelTime","dataType":"text"};
var pageModule = function(){
	var initother = function(){

		$('#type').change(function(){
			if($(this).val()==3){
				$('#selectTime').show()
			}else{
				$('#selectTime').hide()
			}
		})
		$ajax({
			url:getDefaultApprovelTimeUrl,
			success:function(data){
				$('#type').val(data.value);
				if(data.value==3){
					$('#time').val(data.text);
					$('#selectTime').show()
				}
			}
		})
		$(".date-picker").datepicker({
			language:"zh-CN",
		    rtl: Metronic.isRTL(),
		    orientation: "left",
		    format : "yyyy年mm月dd日",
		    autoclose: true
		})
		
		$('#save').click(function(){
			var time = ""
			var type= $('#type').val()
			if(type==3){
				if(!$('#time').val()){
					newbootbox.alertInfo('请选择时间！')
					return
				}else{
					time = $('#time').val()
				}
				
			}
			$ajax({
				url:setDefaultApprovelTimeUrl,
				data:{operateFlag:type,setTime:time},
				success:function(data){
					if(data.result == 'success'){
						newbootbox.alertInfo('保存完成')
					}else{
						newbootbox.alertInfo('保存失败')
					}
				}
			})
		})
		
	}

	return{
		//加载页面处理程序
		initControl:function(){
			initother();
		}
	};
	
}();
