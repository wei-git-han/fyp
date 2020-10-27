var access_token=getUrlParam("access_token");
var isAdminUrl = {"url":"/fyp/roleedit/getRole","dataType":"text"}; //人员树
var url1 = {
  "url": "",
  "dataType": "text"
};
var defaultTime = 30000;
var activeType = "start_page1";
var pageList = {
  rcgz: [{
      "title": "个人待办",
      "head": "个人待办",
      "english": "GIVE NOTICE",
      "url": "/app/fyp/rcgzIframe/html/dbsx_card_iframe.html"
    }, {
      "title": "工作周表",
      "head": "工作周表",
      "english": "WORKING TABLE",
      "url": "/app/fyp/rcgzIframe/html/gzzb_iframe.html"
    }, {
      "title": "通知公告",
      "head": "通知公告",
      "english": "GIVE NOTICE",
      "url": "/app/fyp/rcgzIframe/html/tzgg_iframe.html"
    },
    {
      "title": "工作动态",
      "head": "工作动态",
      "english": "REIGN CONDITION",
      "url": "/app/fyp/rcgzIframe/html/gzdt_iframe.html"
    },
    {
      "title": "在位情况",
      "head": "在位情况",
      "english": "REIGN CONDITION",
      "url": "/app/fyp/rcgzIframe/html/zwry_iframe.html"
    }
  ],
  bgxn: [{
      "title": "办会",
      "head": "办会信息",
      "english": "MEETING INFORMATION",
      "url": "/app/fyp/bgxnIframe/html/bhxx_iframe.html"
    },
    {
      "title": "办事",
      "head": "办事信息",
      "english": "THING INFORMATION",
      "url": "/app/fyp/bgxnIframe/html/bsxx_iframe.html"
    }, {
      "title": "办文",
      "head": "办文信息",
      "english": "OFFICE INFORMATION",
      "url": "/app/fyp/bgxnIframe/html/bwxx_iframe.html"
    }, {
      "title": "排行",
      "head": "排行信息",
      "english": "SENORITY INFORMATION",
      "url": "/app/fyp/bgxnIframe/html/phxx_iframe.html"
    },
    {
      "title": "保障",
      "head": "保障信息",
      "english": "ENSURE INFORMATION",
      "url": "/app/fyp/bgxnIframe/html/bzxx_iframe.html"
    }
  ]
}
var activeDoType = "rcgz"
var pageModule = function() {
  function isAdmin() {
    $ajax({
      url: isAdminUrl,
      type: "GET",
      success: function(data) {
        if(data.flag!='1') {
          $('#set').show()
        }else{
          $('#set').hide()

        }
      }
    })
  }
  var initother = function() {
	returnDate();
    $('.btn-wrap>.btn').click(function() {
      setPage(this.dataset['target'])
    });
    
    $('.newlayout-switch-btn>span').click(function() {
      if (activeDoType == this.id) {
        return;
      }
      if (this.id == 'rcgz') {
        $('.newlayout-switch-btn').addClass('active');
        $('#grgzGroup').show();
        $('#bgxnGroup').hide()
      } else {
        $('.newlayout-switch-btn').removeClass('active');
        $('#bgxnGroup').show();
        $('#grgzGroup').hide()
      }
      var typeArray = pageList[this.id];
      $('#start_page1 .b-title').html(typeArray[0].title)
      $('#start_page1 .c-title').html(typeArray[0].english)
      $('#start_page1 iframe').attr("src", typeArray[0].url)
      $('#start_page2 .b-title').html(typeArray[1].title)
      $('#start_page2 .c-title').html(typeArray[1].english)
      $('#start_page2 iframe').attr("src", typeArray[1].url)
      $('#start_page3 .b-title').html(typeArray[2].title)
      $('#start_page3 .c-title').html(typeArray[2].english)
      $('#start_page3 iframe').attr("src", typeArray[2].url)
      $('#start_page4 .b-title').html(typeArray[3].title)
      $('#start_page4 .c-title').html(typeArray[3].english)
      $('#start_page4 iframe').attr("src", typeArray[3].url)
      $('#start_page5 .b-title').html(typeArray[4].title)
      $('#start_page5 .c-title').html(typeArray[4].english)
      $('#start_page5 iframe').attr("src", typeArray[4].url)
      setPage('start_page1')
      activeDoType = this.id;
      setRefreshInterVal()
    })

    //业务配置
    $("#set").click(function() {
      newbootbox.newdialog({
        id: "addModal",
        width: 1020,
        height: 600,
        header: true,
        title: "业务配置信息",
        url: "set.html",
        classed:"darkColor",
        style: {
          "background": "#fff"
        }
      })
    });
  }
  var setPage = function(type) {
    activeType = type;
    $('#' + type).click();
  }

  var getNum = function() {
    $.ajax({
      url: "/app/fyp/reignCaseController/reignCaseList",
      type: 'get',
      success: function(data) {
        $(".zbrs").html(data.data.userCount>0?data.data.userCount:0);
        $(".zxrs").html(data.data.peopleOnlineCount>0?data.data.peopleOnlineCount:0);
        $(".zxl").html(data.data.onlineRate>0?data.data.onlineRate+"%":0);
        $(".brfz").html(data.data.toDayCount>0?data.data.toDayCount:0);
      }
    })
  }


  return {
    //加载页面处理程序
    initControl: function() {
      isAdmin()
      getNum();
      initother();
      setPage(activeType);
      $(".iframe-wrap").flipster({
        style: 'carousel',
        start: 0,
        onItemSwitch:function(data){
          var id = data[0].id
          $('.btn-wrap>.btn').removeClass('active').each(function(){
            if(this.dataset['target']==id){
              $(this).addClass('active')
            }
          })
        }
      });
      setRefreshInterVal()
    },
    refreshPage:function () {
      getNum()
    }
  }
}();
var refreshInterVal = null;

function setRefreshInterVal() {
  clearInterval(refreshInterVal)
  refreshInterVal = null
  refreshInterVal = setInterval(function () {
    pageModule.refreshPage();
    window.start_page1.pageModule.refreshPage();
    window.start_page2.pageModule.refreshPage()
    window.start_page3.pageModule.refreshPage()
    window.start_page4.pageModule.refreshPage()
    window.start_page5.pageModule.refreshPage()
  },defaultTime)
}
/*  调用打开app的字段fyp专用 */
var appdata = [];

var service_ = {
  _openApp_: function(appId, href, domain) {
    if (href.startWith("/") == false) {
      href = "/" + href;
    }
    var url = domain + href;
    window.open(url, appId, null);
  }
};


var pageappIds = "";
// 通用打开方法，页面中所有跳转必须使用该方法
function openfn1(appId, href, domain, n) {
  if (n == 0) {
    if ($.trim(href) == "") {
      return;
    }
  }
  if (typeof(_service_) != "undefined" && _service_ != null) {
    if ($.trim(href) != '' && href.indexOf("?") == -1) {
      href += "?";
    }
    _service_._openApp_(appId, href);
  } else {

    var url = getFormatUrl(href, access_token);
    //service_._openApp_(appId,href);
    service_._openApp_(appId, url, domain);
  }
}


function returnDate(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1<10? "0"+date.getMonth()+1:date.getMonth()+1;
	var day = date.getDate()+1<10? "0"+date.getDate():date.getDate();
	
	var hour = date.getHours()<10? "0"+date.getHours():date.getHours();
	var minute = date.getMinutes()<10? "0"+date.getMinutes():date.getMinutes();
	
	var week = date.getDay();
	var weekArray = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	$(".datelayout").html(year+"-"+month+"-"+day+"&nbsp;"+hour+":"+minute+"&nbsp;&nbsp;"+weekArray[week]);
}
function zanWeiKaiFang() {
  newbootbox.alertInfo('暂不开放详情查看！')
}