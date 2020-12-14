var listurl = {
  "url": "/dict/findConfigDept",
  "dataType": "text"
}; //表格数据
var hideUrl = {
  url: "/dict/insertConfigDept",
  type: 'text'
}
var pageText = [
  ['繁', '忙', '的', '2', '0', '2', '0', '年', '虽', '然', '过', '去', '了，', '但，', '2', '0', '2', '0', '年', '的', '年', '度',
    '回', '顾', '来', '了！'
  ],
  ['尊', '敬', '的', '某', '领', '导，', '您', '好！', '<br>', '<span class="bottom-blue">2020</span>', '年',
    '<span class="bottom-blue">', '6', '</span>', '月', '<span class="bottom-blue">18</span>', '日，', '我', '们', '第',
    '一', '次', '相', '遇。', '<br>',
    '一', '转', '眼', '都', '<span class="bottom-blue">789</span>', '天', '了，', '这', '些', '天', '我', '们', '一', '直', '默',
    '默', '陪', '伴', '着', '您！'
  ],
  ['繁', '忙', '的', '2020', '年', '虽', '然', '过', '去', '了，', '但，', '2020', '年', '的', '年', '度', '回', '顾', '来', '了！'],
  ['繁', '忙', '的', '2020', '年', '虽', '然', '过', '去', '了，', '但，', '2020', '年', '的', '年', '度', '回', '顾', '来', '了！'],
  ['繁', '忙', '的', '2020', '年', '虽', '然', '过', '去', '了，', '但，', '2020', '年', '的', '年', '度', '回', '顾', '来', '了！'],
  ['繁', '忙', '的', '2020', '年', '虽', '然', '过', '去', '了，', '但，', '2020', '年', '的', '年', '度', '回', '顾', '来', '了！'],
  ['繁', '忙', '的', '2020', '年', '虽', '然', '过', '去', '了，', '但，', '2020', '年', '的', '年', '度', '回', '顾', '来', '了！'],
  ['繁', '忙', '的', '2020', '年', '虽', '然', '过', '去', '了，', '但，', '2020', '年', '的', '年', '度', '回', '顾', '来', '了！']
]
var noId = ''
var pageModule = function() {
  var initgrid = function() {
    $('#gridcont').datagrid({
      columns: [
        [{
            title: '序号',
            field: 'id',
            width: 1,
            align: 'center',
            formatter: function(value, index) {
              return $('#gridcont').datagrid('getRowIndex', index) + 1
            }
          },
          {
            title: '单位名称',
            field: 'name',
            width: 10,
            align: 'center'
          },
          {
            title: '是否列入统计范围',
            field: 'dictType',
            width: 10,
            align: 'center',
            formatter: function(value, rowdata) {
              if (rowdata.dictType == '1') {
                return '<input type="checkbox" name="doType" value="' + rowdata.id + '" id="' + rowdata.id +
                  '" data-name="' + rowdata.name + '">'
              } else {
                return '<input type="checkbox" name="doType" checked value="' + rowdata.id + '" id="' +
                  rowdata.id + '" data-name="' + rowdata.name + '">'
              }
            }
          }
        ]
      ],
      width: $('#gridcont').parent().width(),
      height: $('#gridcont').parent().height(),
      rownumbers: false,
      animate: true,
      autoRowHeight: false,
      pagination: true,
      pageSize: 20,
      pageList: [5, 10, 20, 30],
      fitColumns: true,
      url: listurl.url + '?id=' + noId,
      async: true,
      idField: 'id',
      treeField: 'name',
      loadingMessage: '请等待……',
      loadMsg: '请稍等……',
      // loader:function(){
      // 	return false
      // },
      // onBeforeExpand : function(row) {
      // 	// console.log(row.id)
      // 	noId = row.id;
      // 	$('#gridcont').treegrid('options').url =  listurl.url+'?id='+noId
      // },
      onLoadSuccess: function(row) {
        $('[name="doType"]').bootstrapSwitch({
          onText: '已统计',
          offText: '不统计',
          size: 'small',
          onSwitchChange: function(event, state) {
            var type = state ? '统计状态！' : '不统计状态！';
            var typeNum = state ? '0' : '1'
            var data = {
              deptids: this.value,
              type: typeNum
            };
            var name = this.dataset.name
            $ajax({
              url: hideUrl,
              data: data,
              success: function(res) {
                newbootbox.alertInfo(name + '已修改为' + type).done(function() {
                  initgrid();
                })
              }
            })
          }
        })
      },
      // loadFilter:function (data,parentId) {
      // 	console.log(data,parentId)
      // 	return data.rows
      // }
    });
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
      setTimeout(function() {
        index++
        getStrByNum(index, strList, id)
      }, 500)
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
