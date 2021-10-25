const { log } = console
let colorList
function init() {
  // 设置默认账号

  window.localStorage.setItem(
    'userInfo',
    JSON.stringify([{ username: 'html5kc', password: '123456' }])
  )
  // 颜色池
  colorList = [
    '#96ceb4',
    '#ffad60',
    '#4bc2c5',
    '#f29c2b',
    '#a696c8',
    '#2470a0',
    '#ED5485',
    '#7A57D1',
    '#B9EDF8',
    '#6B78B4',
    '#6B78B4',
  ]
  const toRegister = document.querySelector('.toregister')
  const toLogin = document.querySelector('.tologin')
  const loginEle = document.querySelector('.login')
  const box = document.getElementById('box')
  const tip_title = document.querySelectorAll('.tip_title')
  const forms = document.querySelectorAll('form')
  const formboxs = document.querySelectorAll('.formbox')
  const sublogin = document.querySelector('.sublogin')
  const subregister = document.querySelector('.subregister')
  toRegister.addEventListener('click', function (e) {
    e.stopPropagation()
    e.defaultPrevented
    box.className = 'toggleDiv'
    tip_title[1].className = 'tip_title tip_title_show'
    tip_title[0].className = 'tip_title '
    formboxs[1].className = 'formbox form_show'
    formboxs[0].className = 'formbox'
    document.body.style.backgroundImage = `linear-gradient(145deg, #ff65e5, #69c6e2)`
    return
  })
  toLogin.addEventListener('click', function (e) {
    e.stopPropagation()
    e.defaultPrevented
    box.className = 'retoggleDiv'
    tip_title[1].className = 'tip_title '
    tip_title[0].className = 'tip_title tip_title_show'
    formboxs[0].className = 'formbox form_show'
    formboxs[1].className = 'formbox'
    document.body.style.backgroundImage = `linear-gradient(145deg, #6599ff, #b9c2c8)`

    return
  })
  // 登录验证
  const username = document.querySelector('#username')
  const password = document.querySelector('#password')

  sublogin.addEventListener(
    'click',
    function () {
      const name = username.value
      const pwd = password.value
      if (name.trim() === '') return showtip('用户名不能为空')
      else if (name.length > 10) return showtip('用户名最大长度为10字符')
      if (pwd.trim() === '') return showtip('密码不能为空')
      else if (pwd.length > 6) return showtip('密码最大长度为6字符')
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      const user = { username: name, password: pwd }
      const flag = userInfo.find(
        (info) => JSON.stringify(info) === JSON.stringify(user)
      )
      if (flag) {
        showtip('登录成功')
        window.localStorage.setItem('username', name)
        location.href = './start.html'
      } else {
        showtip('账号或密码错误')
      }
    },
    false
  )
  // 注册验证
  const rusername = document.querySelector('#rusername')
  const rpassword = document.querySelector('#rpassword')
  const repassword = document.querySelector('#repassword')
  subregister.addEventListener(
    'click',
    function () {
      const rname = rusername.value
      const rpwd = rpassword.value
      const repwd = repassword.value
      if (rname.trim() === '') return showtip('用户名不能为空')
      else if (rname.length > 10) return showtip('用户名最大长度为10字符')
      if (rpwd.trim() === '') return showtip('密码不能为空')
      else if (rpwd.length > 6) return showtip('密码最大长度为6字符')
      if (repwd.trim() === '') return showtip('确认密码不能为空')
      else if (rpwd !== repwd) return showtip('密码不一致')

      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      const user = { username: rname, password: rpwd }
      const flag = userInfo.find(
        (info) =>
          JSON.stringify(info.username) === JSON.stringify(user.username)
      )
      if (flag) {
        return showtip('该用户已存在')
      }
      userInfo.push(user)
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
      showtip('注册成功')
      box.className = 'retoggleDiv'
      tip_title[1].className = 'tip_title '
      tip_title[0].className = 'tip_title tip_title_show'
      formboxs[0].className = 'formbox form_show'
      formboxs[1].className = 'formbox'
      document.body.style.backgroundImage = `linear-gradient(145deg, #6599ff, #b9c2c8)`
    },
    false
  )
}

// 随机数
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 显示提示
function showtip(msg) {
  const msgDiv = document.createElement('div')
  msgDiv.className = 'infotip'
  msgDiv.innerText = msg
  msgDiv.style.backgroundImage = `linear-gradient(${random(0, 360)}deg, ${
    colorList[random(0, colorList.length - 1)]
  }, ${colorList[random(0, colorList.length - 1)]})`
  document.body.appendChild(msgDiv)
  msgDiv.addEventListener('animationend', function () {
    this.remove()
  })
}
// 绘制星星
function drawSatrt() {
  const canvas = document.getElementById('canvas')

  const ctx = canvas.getContext('2d')

  // 获取当前视图的宽度和高度
  let aw = document.documentElement.clientWidth || document.body.clientWidth
  let ah = document.documentElement.clientHeight || document.body.clientHeight
  // 赋值给canvas
  canvas.width = aw
  canvas.height = ah

  // 屏幕变动时也要监听实时宽高
  window.onresize = function () {
    aw = document.documentElement.clientWidth || document.body.clientWidth
    ah = document.documentElement.clientHeight || document.body.clientHeight
    // 赋值给canvas
    canvas.width = aw
    canvas.height = ah
  }

  // 本游戏无论是实心，还是线条，色调都是白色
  // ctx.fillStyle = 'white'
  // ctx.strokeStyle = 'white'
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'white'

  function Star(x, y, r) {
    // x，y是坐标，r是半径
    this.x = x
    this.y = y
    this.r = r
    // speed参数，在  -3 ~ 3 之间取值
    this.speedX = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()))
    this.speedY = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()))
  }

  Star.prototype.draw = function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  Star.prototype.move = function () {
    this.x -= this.speedX
    this.y -= this.speedY
    // 碰到边界时，反弹，只需要把speed取反就行
    if (this.x < 0 || this.x > aw) this.speedX *= -1
    if (this.y < 0 || this.y > ah) this.speedY *= -1
  }

  function drawLine(startX, startY, endX, endY) {
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.closePath()
  }

  const stars = []
  for (let i = 0; i < 100; i++) {
    // 随机在canvas范围内找一个坐标画星星
    stars.push(new Star(Math.random() * aw, Math.random() * ah, 3))
  }

  const mouseStar = new Star(0, 0, 3)

  canvas.onmousemove = function (e) {
    mouseStar.x = e.clientX
    mouseStar.y = e.clientY
  }
  let newTime = 0
  window.onclick = function (e) {
    if (new Date() - newTime > 1000) {
      newTime = new Date()
      for (let i = 0; i < 5; i++) {
        stars.push(new Star(e.clientX, e.clientY, 3))
      }
    }
  }

  // 星星的移动
  setInterval(() => {
    ctx.clearRect(0, 0, aw, ah)
    // 鼠标星星渲染
    mouseStar.draw()
    // 遍历移动渲染
    stars.forEach((star) => {
      star.move()
      star.draw()
    })
    stars.forEach((star, index) => {
      // 类似于冒泡排序那样，去比较，确保所有星星两两之间都比较到
      for (let i = index + 1; i < stars.length; i++) {
        if (
          Math.abs(star.x - stars[i].x) < 50 &&
          Math.abs(star.y - stars[i].y) < 50
        ) {
          drawLine(star.x, star.y, stars[i].x, stars[i].y)
        }
      }

      if (
        Math.abs(mouseStar.x - star.x) < 50 &&
        Math.abs(mouseStar.y - star.y) < 50
      ) {
        drawLine(mouseStar.x, mouseStar.y, star.x, star.y)
      }
    })
  }, 50)
}

window.onload = () => {
  init()
  drawSatrt()
}
