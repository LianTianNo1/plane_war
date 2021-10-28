const time_show = document.querySelector('.time_show')
const startGame = document.querySelector('.startGame')
const backLogin = document.querySelector('.backLogin')
const game_BGM = document.querySelector('.gameBGM')
const logout = document.querySelector('.logout')
// const back_home_page = document.querySelector('.back_home_page')

startGame.onclick = () => {
  location.href = './gamelunch.html'
}
// back_home_page.onclick = () => {
//   location.href = './login.html'

//   setTimeout(() => {
//     option.style.display = 'flex'
//     father_box.style.top = '-100vh'
//     // document.body.onmousemove = followCursor
//     externalbox.style.display = 'none'
//     canvas.style.display = 'none'
//     bg_bubbles.style.display = 'none'
//   }, 1000)
// }
logout.onclick = () => {
  location.href = './login.html'
  window.localStorage.setItem('username', '')
}

game_BGM.onclick = () => {
  location.href = './music.html'
}
backLogin.onclick = () => {
  location.href = './statistical.html'
}
// 格式化时间
function dateFormat(fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

let dateTimer = updateDate()

function updateDate() {
  return setInterval(() => {
    let date = new Date()
    time_show.innerText = `${dateFormat('YYYY-mm-dd HH:MM', date)}`
  }, 1000)
}
