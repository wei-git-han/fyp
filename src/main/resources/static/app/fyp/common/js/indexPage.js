var url1 = {
  "url": "",
  "dataType": "text"
};
var activeType = "grdb";
var pageList = {
  "grdb": {
    "left": {
      "title": "在位情况",
      "url": "/app/fyp/rcgzIframe/html/zwqk_iframe.html"
    },
    "center": {
      "title": "个人待办",
      "url": "/app/fyp/rcgzIframe/html/dbsx_iframe.html"
    },
    "right": {
      "title": "工作周表",
      "url": "/app/fyp/rcgzIframe/html/gzzb_iframe.html"
    }
  },
  "gzzb": {
    "left": {
      "title": "个人待办",
      "url": "/app/fyp/rcgzIframe/html/dbsx_iframe.html"
    },
    "center": {
      "title": "工作周表",
      "url": "/app/fyp/rcgzIframe/html/gzzb_iframe.html"
    },
    "right": {
      "title": "通知公告",
      "url": "/app/fyp/rcgzIframe/html/tzgg_iframe.html"
    }
  },
  "tzgg": {
    "left": {
      "title": "工作周表",
      "url": "/app/fyp/rcgzIframe/html/gzzb_iframe.html"
    },
    "center": {
      "title": "通知公告",
      "url": "/app/fyp/rcgzIframe/html/tzgg_iframe.html"
    },
    "right": {
      "title": "工作动态",
      "url": "/app/fyp/rcgzIframe/html/gzdt_iframe.html"
    }
  },
  "gzdt": {
    "left": {
      "title": "通知公告",
      "url": "/app/fyp/rcgzIframe/html/tzgg_iframe.html"
    },
    "center": {
      "title": "工作动态",
      "url": "/app/fyp/rcgzIframe/html/gzdt_iframe.html"
    },
    "right": {
      "title": "在位情况",
      "url": "/app/fyp/rcgzIframe/html/zwqk_iframe.html"
    }
  },
  "zwqk": {
    "left": {
      "title": "工作动态",
      "url": "/app/fyp/rcgzIframe/html/gzdt_iframe.html"
    },
    "center": {
      "title": "在位情况",
      "url": "/app/fyp/rcgzIframe/html/zwqk_iframe.html"
    },
    "right": {
      "title": "个人待办",
      "url": "/app/fyp/rcgzIframe/html/dbsx_iframe.html"
    }
  },
  "bh": {
    "left": {
      "title": "保障",
      "url": "/app/fyp/bgxnIframe/html/bzxx_iframe.html"
    },
    "center": {
      "title": "办会",
      "url": "/app/fyp/bgxnIframe/html/bhxx_iframe.html"
    },
    "right": {
      "title": "办事",
      "url": "/app/fyp/bgxnIframe/html/bsxx_iframe.html"
    }
  },
  "bs": {
    "left": {
      "title": "办会",
      "url": "/app/fyp/bgxnIframe/html/bhxx_iframe.html"
    },
    "center": {
      "title": "办事",
      "url": "/app/fyp/bgxnIframe/html/bsxx_iframe.html"
    },
    "right": {
      "title": "办文",
      "url": "/app/fyp/bgxnIframe/html/bwxx_iframe.html"
    }
  },
  "bw": {
    "left": {
      "title": "办事",
      "url": "/app/fyp/bgxnIframe/html/bsxx_iframe.html"
    },
    "center": {
      "title": "办文",
      "url": "/app/fyp/bgxnIframe/html/bwxx_iframe.html"
    },
    "right": {
      "title": "排行",
      "url": "/app/fyp/bgxnIframe/html/phxx_iframe.html"
    }
  },
  "ph": {
    "left": {
      "title": "办文",
      "url": "/app/fyp/bgxnIframe/html/bwxx_iframe.html"
    },
    "center": {
      "title": "排行",
      "url": "/app/fyp/bgxnIframe/html/phxx_iframe.html"
    },
    "right": {
      "title": "保障",
      "url": "/app/fyp/bgxnIframe/html/bzxx_iframe.html"
    }
  },
  "bz": {
    "left": {
      "title": "排行",
      "url": "/app/fyp/bgxnIframe/html/phxx_iframe.html"
    },
    "center": {
      "title": "保障",
      "url": "/app/fyp/bgxnIframe/html/bzxx_iframe.html"
    },
    "right": {
      "title": "办会",
      "url": "/app/fyp/bgxnIframe/html/bhxx_iframe.html"
    }
  }
}
var activeDoType = "rcgz"
var pageModule = function() {
  var initother = function() {
    //     $("#iframeLeft").attr("src", "/app/fyp/bgxnIframe/html/bzxx_iframe.html"); //办公效能--保障信息
    //     $("#iframeCenter").attr("src", "/app/fyp/bgxnIframe/html/bhxx_iframe.html"); //办公效能--办会信息
    //     $("#iframeRight").attr("src", "/app/fyp/bgxnIframe/html/bsxx_iframe.html"); //办公效能--办事信息 
    // 
    $('.btn-wrap>.btn').click(function() {
      setPage(this.id)
    })
    $('.newlayout-switch-btn>span').click(function() {
      if (activeDoType == this.id) {
        return;
      }
      if (this.id == 'rcgz') {

        $('.newlayout-switch-btn').addClass('active');
        $('#grgzGroup').show();
        $('#bgxnGroup').hide()
        setPage("grdb");
      } else {
        $('.newlayout-switch-btn').removeClass('active');
        $('#bgxnGroup').show();
        $('#grgzGroup').hide()
        setPage("bh");
      }
      activeDoType = this.id
    })
  }
  var setPage = function(type) {
    activeType = type;
    $('#' + type).addClass('active').siblings().removeClass('active')
    $("#iframeLeft").attr("src", pageList[type].left.url); //办公效能--保障信息
    $("#iframeCenter").attr("src", pageList[type].center.url); //办公效能--办会信息
    $("#iframeRight").attr("src", pageList[type].right.url); //办公效能--办事信息 
  }
  return {
    //加载页面处理程序
    initControl: function() {
      initother();
      setPage(activeType)
    }
  }
}();
