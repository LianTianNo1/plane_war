let items = document.querySelectorAll('.item')
items.nowTime = 0
const { log } = console
const startGame = document.querySelector('.startGame')
const backLogin = document.querySelector('.backLogin')
document.addEventListener(
  'mousemove',
  function (e) {
    if (new Date() - items.nowTime > 250) {
      items.nowTime = new Date()
      const x = e.clientX
      const y = e.clientY
      items.forEach((dot) => {
        // 确定好点的位置
        const diffx = x - (dot.offsetLeft + dot.offsetWidth * 0.5)
        const diffy = y - (dot.offsetTop + dot.offsetHeight * 0.5)
        // 计算角度
        const angle = (Math.atan2(diffy, diffx) * 180) / Math.PI
        dot.style.transform = `rotate(${angle}deg)`
      })
    }
  },
  false
)
startGame.onclick = function () {
  location.href = './gamelunch.html'
}
backLogin.onclick = function () {
  location.href = './login.html'
  window.localStorage.setItem('username', '')
}
