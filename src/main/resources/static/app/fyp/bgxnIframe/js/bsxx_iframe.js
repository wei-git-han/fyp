var pageModule = function() {
  var initother = function() {}

  var initBarChart = function() {
    var chart = echarts.init(document.getElementById('main'));
    chart.setOption({
      title: {
        show: true,
        subtext: '各局视频会议预定场次及统计时长',
        subtextStyle: {
          color: '#DBDDF7',
        },
        /* padding:[100,100,100,100]  设置title位置，是具体固定的位置*/
      },
      /* grid:{
      	height:100   柱状图高度
      }, */
      color: ['#509DF7', '#99DA48'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        color: 'red'
      },
      legend: {
        data: ['总时长', '场次'],
        textStyle: {
          color: '#fff'
        }
      },
      toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: {
            show: true,
            type: ['line', 'bar', 'stack', 'tiled']
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        interval: 0,
        /* axisTick: {
          alignWithLabel: true
        }, */
        axisLabel: {
          rotate: 30,
          textStyle: {
            color: '#7783DE',
            fontSize: 12
          }
        },
        data: ['1级部首长办公室数据', '2级部首长办公室数据', '3级部首长办公室数据', '4级部首长办公室数据', '5级部首长办公室数据']
      }],
      yAxis: [{
        type: 'value',
        min: 0,
        max: 500,
        splitNumber: 5,
        axisLabel: {
          textStyle: {
            color: '#7783DE',
            fontSize: 12
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: '#13296D' //刻度线颜色
          }
        }
      }],
      series: [{
          name: '总时长',
          type: 'bar',
          barGap: 0,
          barWidth: 10,
          barCategoryGap: '300',
          data: [320, 332, 200, 300, 450]
        },
        {
          name: '场次',
          type: 'bar',
          barGap: 0,
          barWidth: 10,
          barCategoryGap: '300',
          data: [220, 182, 66, 10, 120]
        }
      ]
    });
  }
  var initZhoubiao = function(data){
    $.ajax({
      url:"http://172.16.1.36:9999/eolinker_os/Mock/simple?projectID=1&uri=app/fyp/bsxx-weekTable",
      data:{year:'2020',month:'08'},
      dataType:'json',
      success:function(res){
        if(res.result=="success"){
          initZhouBar(res.data)
        }
      }
    })
  }
  function initZhouBar(data){
    var str = ``;
    data.forEach((e,i)=>{
      str+=`<div>
        <span>${e.num}</span>
        <font>${e.name}</font>
      </div>`
      if(i==1||i==4||i==8){
        str+="<br>"
      }
    })
    $('#gzbb').html(str)
  }


  return {
    //加载页面处理程序
    initControl: function() {
      initZhoubiao()
      initBarChart();
      initother();
    }
  }
}();
