var dataUrl = {
  url: "/fypstatistics/list",
  type: 'text'
}
// var defaultData = {
//   "result": "success",
//   "data": [{
//     "alreadyNum": 0,
//     "bJISREADTOTAL": 14,
//     "bJOverPercentage": "36",
//     "bJTOTAL": 38,
//     "checkNum": 0,
//     "createTime": "2020-12-14 18:02:56",
//     "directorId": "",
//     "directorName": "",
//     "divisionId": "",
//     "divisionName": "",
//     "documentName": "0715-测试公文全流程1",
//     "documentNum": 380,
//     "documentType": 0,
//     "dopiecePercentage": "10",
//     "fRISTDATE": "2019-07-15 17:17:54",
//     "fast": "100",
//     "iSREADTOTAL": 249,
//     "id": "679c477f-64b0-4921-9fd2-d265f081c1ea",
//     "isDelete": 0,
//     "meetDays": 518,
//     "onlineDays": 316,
//     "overPercentage": "79",
//     "pHRASENAME": "脚踏实地",
//     "phraseId": "3",
//     "readNum": 7,
//     "readknowPercentage": "6",
//     "readpiecePercentage": "1",
//     "renderPercentage": "82",
//     "tOTAL": 312,
//     "userId": "6143b684-68f0-41ae-9286-f4e99f77a500",
//     "userName": "",
//     "yJISREADTOTAL": 0,
//     "yJOverPercentage": "0",
//     "yJTOTAL": 7,
//     "yZISREADTOTAL": 14,
//     "yZTOTAL": 23,
//     "yZoverPercentage": "60"
//   }],
//   "message": null,
//   "status": 200
// }
var cardIndex = 1;
var hasDepart = false // 是否只有单位
var pageText = [
  ['繁', '忙', '的', '2', '0', '2', '0', '年', '虽', '然', '过', '去', '了，', '2', '0', '2', '0', '年', '的', '年', '度',
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
    '<span class="bottom-blue">248</span>', '天。', '<br>', '<span>&nbsp;</span>', '<br>', '工', '作', '这', '么', '努', '力',
    '，', '您', '一', '定', '非', '常',
    '优', '秀', '！',
  ],
  ["这", "一", "年", "，", "您", "最", "快", "一", "次", "处", "理", "公", "文", "用", "了", '<span class="bottom-blue">3</span>',
    "小", "时", '<br>', "就", "处", "理", "了", "一",
    "件", "督", "办", "事", "项", '<br>', '<span>&nbsp;</span>', '<br>', "真", "是", "眼", "疾", "手", "快"
  ],
  ["您", "在", '<span class="bottom-blue">2020</span>', "年", "，", "处", "理", "阅", "件", "的", "完", "成", "率", "达", "到",
    '<span class="bottom-blue">76%</span>', '<br>', "阅", "件", "总", "数", '<span class="bottom-blue">456</span>', "件",
    '<br>', "已", "阅", "数", "量", '<span class="bottom-blue">666</span>', "件", '<br>', "工", "作", "尽", "职", "尽",
    "责", "，", "是", "我", "们", "的", "榜", "样", "！"
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
    "英", "明", "领", "导", "下", "，", "工", "作", "有", "条", "不", "紊", "的", "进", "行"
  ],
  // ["2", "0", "2", "0", "年", "，", '<span class="blue-text">信</span>', '<span class="blue-text">息</span>',
  //   '<span class="blue-text">系</span>', '<span class="blue-text">统</span>', '<span class="blue-text">局</span>', "累",
  //   "计", "，", "您", "接", "收", "公", "文", '<span class="bottom-blue">456</span>',
  //   "件", '<br>', "参", "与", "会", "议", '<span class="bottom-blue">326</span>', "场", '<br>', "办", "理", "督", "办",
  //   '<span class="bottom-blue">432</span>', "件", '<br>', "在", "您", "的",
  //   "英", "明", "领", "导", "下", "，", "工", "作", "有", "条", "不", "紊", "的", "在", "进", "行"
  // ],
  ['2', '0', '2', '0', '年', '，', '再', '见', '！',
    '<br><span style="text-align: right;display: inline-block;width: 100%;font-size: 90px">2', '0', '2', '1', '年',
    '，', '你', '好', '！', '</span>'
  ]
]
var pageModule = function() {
  var initData = function() {
    $ajax({
      url: dataUrl,
      success: function(res) {
        console.log(res)
        initListData(res.data[0])
      }
    })
  }
  var initPage = function(index) {
    var time = 0;
    cardIndex = index;
    getStrByNum(time, pageText[index - 1], `.card-bg${index}`, index)
  }
  // 格式化数据
  var initListData = function(data) {
    if(!data){
      newbootbox.alertInfo('您的年终回顾还在计算中，请稍后再次查看！')
      return;
    }
    var userlist = data.userName.split(''); // 用户名
    var documentNameList = data.documentName.split(''); // 第一个公文名称
    var timeChengYu = data.pHRASENAME.split('') // 评价成语
    var firstDate = new Date(data.fRISTDATE.replace(/-/g, '/'))
    var departName = data.divisionName || data.directorName;    var departList = []
    if (departName) {
      var list = departName.split('');
      list.forEach(function(e) {
        departList.push(`<span class="blue-text">${e}</span>`)
      })
      hasDepart = true
    }
    var indexArray1 = ['繁', '忙', '的', '2', '0', '2', '0', '年', '虽', '然', '过', '去', '了，', '2', '0', '2', '0',
      '年', '的', '年', '度',
      '回', '顾', '来', '了！'
    ];
    var indexArray2 = ['尊', '敬', '的'].concat(userlist).concat(['，','您', '好！', '<br>',
      `&nbsp;&nbsp;<span class="bottom-blue">${firstDate.getFullYear()}</span>`, '年',
      `<span class="bottom-blue">${firstDate.getMonth()-0+1}</span>`, '月',
      `<span class="bottom-blue">${firstDate.getDate()}</span>`, '日，', '我', '们', '第',
      '一', '次', '相', '遇。', '<br>',
      '&nbsp;&nbsp;一', '转', '眼', '都', `<span class="bottom-blue">${data.meetDays}</span>`, '天', '了，', '这', '些',
      '天', '我', '们', '一',
      '直', '默',
      '默', '陪', '伴', '着', '您！'
    ])
    var indexArray3 = ['您', '在', '<span class="bottom-blue">2020</span>', '年,', '<br>', '共', '在', '线', '天', '数',
      '已', '达',
      `<span class="bottom-blue">${data.onlineDays}</span>`, '天。', '<br>', '<span>&nbsp;</span>', '<br>', '工',
      '作', '这', '么', '努', '力', '，', '一', '定', '非', '常',
      '优', '秀', '！',
    ]
    var indexArray4 = ["这", "一", "年", "，", "您", "最", "快", "一", "次", "处", "理", "公", "文", "用", "了",
      `<span class="bottom-blue">${data.fast!='0'?data.fast:1}</span>`,
      "分", "钟", '<br>', "就", "处", "理", "了", "一",
      "件", `${data.documentType==0?'公文':data.documentType==1?'办件':data.documentType==2?'阅件':'阅知'}`, "事", "项",
      '<br>', '<span>&nbsp;</span>', '<br>', "真", "是"
    ].concat(timeChengYu)
    indexArray4.push("!")
    var indexArray5 = sortByPercent(data)
    var indexArray6 = ["这", "一", "年", "，", "您", "的", "办", "文", "多", "元", "化", "，", "我", "的", "公", "文",
      `<span class="bottom-blue">${data.overPercentage}%</span>`, '<br>', "公", "文",
      "阅", "知", `<span class="bottom-blue">${data.yZoverPercentage}%</span>`, '<br>', "来", "文", "阅", "件",
      `<span class="bottom-blue">${data.yJOverPercentage}%</span>`, '<br>', "我", "的", "办", "件",
      `<span class="bottom-blue">${data.bJOverPercentage}%</span>`,
      '<br>', "X", "X",
      "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"
    ];
    // if(departList.length>0){
      var indexArray7 = ["2", "0", "2", "0", "年", "，"].concat(departList).concat(["累",
        "计", "，", "接", "收", "公", "文", `<span class="bottom-blue">${data.documentNum}</span>`,
        "件", '<br>', '<br>', "办", "理", "督", "办",
        `<span class="bottom-blue">${data.checkNum}</span>`, "件", '<br>', "在", "您", "的",
        "英", "明", "领", "导", "下", "，", "工", "作", "有", "条", "不", "紊", "的", "在", "进", "行"
      ])
    //
    var indexArray8 = ['2', '0', '2', '0', '年', '，', '再', '见', '！',
      '<br><span style="text-align: right;display: inline-block;width: 100%;font-size: 90px">2', '0', '2', '1',
      '年', '，', '你', '好', '！', '</span>'
    ]
    // }
    pageText = [indexArray1,indexArray2,indexArray3,indexArray4,indexArray5,indexArray6,indexArray7,indexArray8]
    // pageText.push(indexArray8)
    showCard(1)
  }
  var getStrByNum = function(index, strList, id, isIndex) {
    var to = null
    if (index < strList.length) {
      var str = ''
      for (var j = 0; j < strList.length; j++) {
        if (j <= index) {
          str += '' + strList[j]
        }
      }
      str += '__'
      var to = setTimeout(function() {
        index++
        if (cardIndex == isIndex) {
          getStrByNum(index, strList, id, isIndex)
        } else {
          clearTimeout(to)
        }
      }, 300)
      $(id).html(str);
    } else {
      var str = ''
      for (var j = 0; j < strList.length; j++) {
        if (j <= index) {
          str += '' + strList[j]
        }
      }
      $(id).html(str);
      clearTimeout(to)
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
      // showCard(1)
    },
    initgrid: function() {},
    refreshPage: function() {
      // location.reload()
    },
    changeStatus(index) {
      if(!hasDepart&&index==7){
        index = 8
      }
      showCard(index)
    }
  }
}();
var changeStatus = function(index) {
  pageModule.changeStatus(index)
}

function topClose() {
  window.close()
}

function sortByPercent(data) {
  var maxNum = [data.overPercentage,data.bJOverPercentage,data.yZoverPercentage,data.yJOverPercentage].sort()[3]
 if(data.overPercentage==maxNum){
   return ["您", "在", '<span class="bottom-blue">2020</span>', "年", "，", "处", "理", "公", "文", "的", "完",
     "成", "率", "达", "到",
     `<span class="bottom-blue">${data.overPercentage}%</span>`, '<br>', "公", "文", "总", "数",
     `<span class="bottom-blue">${data.tOTAL}</span>`, "件",
     '<br>', "完", "成", "数", "量", `<span class="bottom-blue">${data.iSREADTOTAL}</span>`, "件", '<br>', "工", "作",
     "尽", "职", "尽",
     "责", "，", "您", "是", "我", "们", "的", "榜", "样", "！"
   ]

 }else if(data.bJOverPercentage==maxNum){
   return ["您", "在", '<span class="bottom-blue">2020</span>', "年", "，", "处", "理", "办", "件", "的", "完",
     "成", "率", "达", "到",
     `<span class="bottom-blue">${data.bJOverPercentage}%</span>`, '<br>', "办", "件", "总", "数",
     `<span class="bottom-blue">${data.bJTOTAL}</span>`, "件",
     '<br>', "已", "办", "数", "量", `<span class="bottom-blue">${data.bJISREADTOTAL}</span>`, "件", '<br>', "工", "作",
     "尽", "职", "尽",
     "责", "，", "您", "是", "我", "们", "的", "榜", "样", "！"
   ]

 }else if(data.yZoverPercentage==maxNum){
   return ["您", "在", '<span class="bottom-blue">2020</span>', "年", "，", "处", "理", "阅", "知", "的", "完",
     "成", "率", "达", "到",
     `<span class="bottom-blue">${data.yZoverPercentage}%</span>`, '<br>', "阅", "知", "总", "数",
     `<span class="bottom-blue">${data.yZTOTAL}</span>`, "件",
     '<br>', "已", "阅",'知', "数", "量", `<span class="bottom-blue">${data.yZISREADTOTAL}</span>`, "件", '<br>', "工", "作",
     "尽", "职", "尽",
     "责", "，", "您", "是", "我", "们", "的", "榜", "样", "！"
   ]

 }else{
    return ["您", "在", '<span class="bottom-blue">2020</span>', "年", "，", "处", "理", "阅", "件", "的", "完",
      "成", "率", "达", "到",
      `<span class="bottom-blue">${data.yJOverPercentage}%</span>`, '<br>', "阅", "件", "总", "数",
      `<span class="bottom-blue">${data.yJTOTAL}</span>`, "件",
      '<br>', "已", "阅", "数", "量", `<span class="bottom-blue">${data.alreadyNum}</span>`, "件", '<br>', "工", "作",
      "尽", "职", "尽",
      "责", "，", "您", "是", "我", "们", "的", "榜", "样", "！"
    ]
 }
}
