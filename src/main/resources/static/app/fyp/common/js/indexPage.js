var url1 = {
  "url": "",
  "dataType": "text"
};
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
  var initother = function() {
	$("#setbtn").click(function(){
		window.location.href ="/app/fyp/set/html/settabel.html"
	});
	
	$("#slqkbtn").click(function(){
		window.location.href ="/app/fyp/slqk/html/slqktabel.html"
	});
	
	$("#bzbtn").click(function(){
		window.location.href ="/app/fyp/bzProject/html/bzwtgz.html"
	});
	
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
      activeDoType = this.id
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
        $(".zbrs").html(data.data.userCount);
        $(".zxrs").html(data.data.peopleOnlineCount);
        $(".zxl").html(data.data.onlineRate);
        $(".brfz").html(data.data.toDayCount);
      }
    })
  }


  return {
    //加载页面处理程序
    initControl: function() {
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
    }
  }
}();
/*  调用打开app的字段fyp专用 */
var appdata = [];

function __onGetAppInfoList__(appInfoList) {
  appdata = appInfoList;
  $('#app_list').html('');
  $.each(appdata, function(i, v) {
    img = v.icon64;
    img = "data:image/png;base64," + img;
    $('#app_list').append(
        ` <li><a onclick="openfn1('${v.id}','','')"><img src="${img}" alt=""><span>${v.name}</span></a></li>`);
  })
}
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
function getFormatUrl(url, token_value) {
  var token_key = getUrlParam("access_token");
  if (url.indexOf("access_token") == -1) {
    if (url.indexOf("?") == -1) {
      url += "?";
    } else {
      url += "&";
    }
    url += "access_token=" + token_value;
  }
  return url;
}

function replaceParam(url, paramName, paramValue) {
  var regex = eval('/(' + paramName + '=)[^&]*/gi');
  url = url.replace(regex, paramName + '=' + paramValue);

  return url;
}

/**
 * url ="http://localhost:12000/app/fyp/index.htm";
 * 返回”http://localhost:12000“
 * @param url
 * @returns
 */
function getDomainUrl(url) {
  if (!url) {
    url = ""
  }
  var sep = "//";
  //url ="http://localhost:12000/app/fyp/index.htm";
  if (url.indexOf(sep) != -1) {
    var arr = url.split(sep);
    var http = arr[0] + sep;
    var start = arr[1].indexOf("/");
    var relUrl = http + arr[1].substring(0, start);
    return relUrl;
  }
  return url;
}

String.prototype.startWith = function(str) {
  var reg = new RegExp("^" + str);
  return reg.test(this);
};
String.prototype.endWith = function(str) {
  var reg = new RegExp(str + "$");
  return reg.test(this);
};