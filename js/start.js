let items = document.querySelectorAll('.item')
items.nowTime = 0
// const { log } = console
const startGame = document.querySelector('.startGame')
const backLogin = document.querySelector('.backLogin')
const father_box = document.querySelector('.father_box')
const game_BGM = document.querySelector('.gameBGM')
const option = document.querySelector('.option')
const time_show = document.querySelector('.time_show')
// const logout = document.querySelector('.logout')
// document.body.onmousemove = followCursor

startGame.onclick = () => {
  location.href = './features.html'
}
backLogin.onclick = () => {
  // location.href = './login.html'
  father_box.style.top = '0vh'
  option.style.display = 'none'
  box2.style.display = 'none'
  showtip('登出成功')
  document.body.onmousemove = null
  externalbox.style.display = 'flex'
  canvas.style.display = 'block'
  bg_bubbles.style.display = 'block'

  window.localStorage.setItem('username', '')
}

game_BGM.onclick = () => {
  // alert('还没实现')
  location.href = './themeIntroduced.html'
}

let dateTimer = updateDate()

function updateDate() {
  return setInterval(() => {
    let date = new Date()
    time_show.innerText = `${dateFormat('YYYY-mm-dd HH:MM', date)}`
  }, 1000)
}
