let items = document.querySelectorAll('.item')
items.nowTime = 0
// const { log } = console
const startGame = document.querySelector('.startGame')
const backLogin = document.querySelector('.backLogin')
const father_box = document.querySelector('.father_box')
const game_BGM = document.querySelector('.gameBGM')
const option = document.querySelector('.option')

// document.body.onmousemove = followCursor

startGame.onclick = () => {
  location.href = './gamelunch.html'
}
backLogin.onclick = () => {
  // location.href = './login.html'
  father_box.style.top = '0vh'
  option.style.display = 'none'
  showtip('登出成功')
  document.body.onmousemove = null
  externalbox.style.display = 'flex'
  canvas.style.display = 'block'
  bg_bubbles.style.display = 'block'

  window.localStorage.setItem('username', '')
}

game_BGM.onclick = () => {
  location.href = './music.html'
}
