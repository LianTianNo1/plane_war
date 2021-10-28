// 获取当前登录的用户
const username = window.localStorage.getItem('username')
const option_div = document.querySelectorAll('.option_div')
if (!username || username.length == 0) {
  location.href = './login.html'
}
option_div[0].onclick = () => {
  location.href = './login.html'
  window.localStorage.setItem('username', '')
}
option_div[1].onclick = () => {
  location.href = './gamelunch.html'
}
let res,
  dataNameList = [],
  scoreList = []
// 获取该用户的最近10次的游戏数据
let statisticalData = localStorage.getItem('statisticalData')
if (
  !statisticalData ||
  statisticalData === '' ||
  statisticalData === null ||
  statisticalData === undefined ||
  statisticalData === '[]'
) {
  res = false
} else {
  statisticalData = JSON.parse(statisticalData)

  statisticalData.forEach((info) => {
    if (info.username === username) {
      dataNameList.push(info.Date)
      scoreList.push(info.Score)
    }
  })
}

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'), 'purple-passion')

// 指定图表的配置项和数据
var option = {
  xAxis: {
    data: dataNameList,
  },
  yAxis: {},
  series: [
    {
      data: scoreList,
      type: 'line',
      smooth: true,
    },
  ],
}

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option)
window.onresize = function () {
  myChart.resize()
}
