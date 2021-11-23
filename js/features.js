const time_show = document.querySelector('.time_show')
const startGame = document.querySelector('.startGame')
const backLogin = document.querySelector('.backLogin')
const game_BGM = document.querySelector('.gameBGM')
const logout = document.querySelector('.logout')
// const back_home_page = document.querySelector('.back_home_page')
const username = window.localStorage.getItem('username')
if (!username || username.length == 0) {
  location.href = './login.html'
} else {
  hellow_user.innerText = `您好：${username} !!!`
}

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

let dateTimer = updateDate()

function updateDate() {
  return setInterval(() => {
    let date = new Date()
    time_show.innerText = `${dateFormat('YYYY-mm-dd HH:MM', date)}`
  }, 1000)
}
