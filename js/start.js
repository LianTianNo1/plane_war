let items = document.querySelectorAll('.item')
items.nowTime = 0
// const { log } = console
const startGame = document.querySelector('.startGame')
const backLogin = document.querySelector('.backLogin')
const father_box = document.querySelector('.father_box')
const option = document.querySelector('.option')

document.addEventListener(
  'mousemove',
  function (e) {
    if (new Date() - items.nowTime > 250) {
      items.nowTime = new Date()
      const x = e.clientX
      const y = e.clientY
      // log(
      //   `${x}--->${items[0].getBoundingClientRect().left},${y}--->${
      //     items[0].getBoundingClientRect().top
      //   }`
      // )
      items.forEach((dot) => {
        // 确定好点的位置
        // log(x, dot.offsetLeft)
        const nowpos = dot.getBoundingClientRect()
        const diffx = x - (nowpos.left + dot.offsetWidth * 0.5)
        const diffy = y - (nowpos.top + dot.offsetHeight * 0.5)

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
  // location.href = './login.html'
  father_box.style.top = '0vh'
  option.style.display = 'none'
  showtip('登出成功')
  window.localStorage.setItem('username', '')
}
