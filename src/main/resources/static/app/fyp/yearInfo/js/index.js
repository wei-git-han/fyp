var dataUrl = {
  url: "/fypstatistics/list",
  type: 'text'
}
var pageText = [
  ['繁', '忙', '的', '2', '0', '2', '0', '年', '虽', '然', '过', '去', '了，', '但，', '2', '0', '2', '0', '年', '的', '年', '度',
    '回', '顾', '来', '了！'
  ],
  ['尊', '敬', '的', '某', '领', '导，', '您', '好！', '<br>', '&nbsp;&nbsp;<span class="bottom-blue">2020</span>', '年',
    '<span class="bottom-blue">', '6', '</span>', '月', '<span class="bottom-blue">18</span>', '日，', '我', '们', '第',
    '一', '次', '相', '遇。', '<br>',
    '&nbsp;&nbsp;一', '转', '眼', '都', '<span class="bottom-blue">789</span>', '天', '了，', '这', '些', '天', '我', '们', '一',
    '直', '默',
    '默', '陪', '伴', '着', '您！'
  ],
  ['您', '在', '<span class="bottom-blue">2020</span>', '年,', '<br>', '共', '在', '线', '天', '数', '已', '达',
    '<span class="bottom-blue">248</span>', '天。','<br>','<span>&nbsp;</span>', '<br>', '工', '作', '这', '么', '努', '力', '，', '您', '一', '定', '非', '常',
    '优', '秀', '！',
  ],
  ["这", "一", "年", "，", "您", "最", "快", "一", "次", "处", "理", "公", "文", "用", "了", '<span class="bottom-blue">3</span>',
    "小", "时", '<br>', "就", "处", "理", "了", "一",
    "件", "督", "办", "事", "项", '<br>','<span>&nbsp;</span>','<br>', "您", "真", "是", "眼", "疾", "手", "快"
  ],
  ["您", "在", '<span class="bottom-blue">2020</span>', "年", "，", "处", "理", "阅", "件", "的", "完", "成", "率", "达", "到",
    '<span class="bottom-blue">76%</span>', '<br>', "阅", "件", "总", "数", '<span class="bottom-blue">456</span>', "件",
    '<br>', "已", "阅", "数", "量", '<span class="bottom-blue">666</span>', "件", '<br>', "工", "作", "尽", "职", "尽",
    "责", "，", "您", "是", "我", "们", "的", "榜", "样", "！"
  ],
  ["这", "一", "年", "，", "您", "的", "办", "文", "多", "元", "化", "，", "我", "的", "公", "文",
    '<span class="bottom-blue">26%</span>', '<br>', "公", "文",
    "阅", "知", '<span class="bottom-blue">45%</span>', '<br>', "来", "文", "阅", "件",
    '<span class="bottom-blue">35%</span>', '<br>', "我", "的", "办", "件", '<span class="bottom-blue">26%</span>',
    '<br>', "X", "X",
    "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"
  ],
  ["2", "0", "2", "0", "年", "，", '<span class="blue-text">信</span>', '<span class="blue-text">息</span>',
    '<span class="blue-text">系</span>', '<span class="blue-text">统</span>', '<span class="blue-text">局</span>', "累",
    "计", "，", "您", "接", "收", "公", "文", '<span class="bottom-blue">456</span>',
    "件", '<br>', "参", "与", "会", "议", '<span class="bottom-blue">326</span>', "场", '<br>', "办", "理", "督", "办",
    '<span class="bottom-blue">432</span>', "件", '<br>', "在", "您", "的",
    "英", "明", "领", "导", "下", "，", "工", "作", "有", "条", "不", "紊", "的", "在", "进", "行"
  ],
  ["2", "0", "2", "0", "年", "，", '<span class="blue-text">信</span>', '<span class="blue-text">息</span>',
    '<span class="blue-text">系</span>', '<span class="blue-text">统</span>', '<span class="blue-text">局</span>', "累",
    "计", "，", "您", "接", "收", "公", "文", '<span class="bottom-blue">456</span>',
    "件", '<br>', "参", "与", "会", "议", '<span class="bottom-blue">326</span>', "场", '<br>', "办", "理", "督", "办",
    '<span class="bottom-blue">432</span>', "件", '<br>', "在", "您", "的",
    "英", "明", "领", "导", "下", "，", "工", "作", "有", "条", "不", "紊", "的", "在", "进", "行"
  ],
  ['2', '0', '2', '0','年','，', '再', '见', '！', '<br><span style="text-align: right;display: inline-block;width: 100%;font-size: 90px">2', '0', '2', '1', '年','，', '你', '好', '！','</span>']
]
var pageModule = function() {
  var initData = function() {
    $ajax({
      url: dataUrl,
      success: function(res) {
        console.log(res)
      }
    })
  }
  var initPage = function(index) {
    var time = 0;
    getStrByNum(time, pageText[index - 1], `.card-bg${index}`)
  }
  var getStrByNum = function(index, strList, id) {
    if (index < strList.length) {
      var str = ''
      for (var j = 0; j < strList.length; j++) {
        if (j <= index) {
          str += '' + strList[j]
        }
      }
      str+='__'
      setTimeout(function() {
        index++
        getStrByNum(index, strList, id)
      }, 300)
      $(id).html(str);
    }else{
      var str = ''
      for (var j = 0; j < strList.length; j++) {
        if (j <= index) {
          str += '' + strList[j]
        }
      }
      $(id).html(str);
    }
  }
  var showCard = function(index) {
    $('.content-slider').hide()
    $('.card' + index).fadeIn(500)
    initPage(index)
  }
  return {
    //加载页面处理程序
    initControl: function() {
      initData()
      showCard(1)
    },
    initgrid: function() {},
    refreshPage: function() {
      // location.reload()
    },
    changeStatus(index) {
      showCard(index)
    }
  }
}();
var changeStatus = function(index) {
  pageModule.changeStatus(index)
}
