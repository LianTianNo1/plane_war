const { log } = console
let colorList
const externalbox = document.querySelector('.external')
let blockTiemr = null
const box2 = document.querySelector('.box')
const block_box = document.querySelector('.block_box')
const rd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const totalPool = [
  ['#22181C', '#FF5B00', 'white'],
  // ['#00dffc', '#008c9e', '#005f6b', '#343838'],
  // ['#2C3E50', '#FC6621', '#EDF1F2', '#42B4E7'],
  // ['#F5E5FC', '#8AE1FC', '#C08497', '#48B8D0'],
]
let colorPool = totalPool[rd(0, totalPool.length - 1)]
const css = (ele, json) => {
  for (let key in json) ele.style[key] = json[key]
}
// 创建背景
function crateBlock(num = 40) {
  block_box.innerHTML = ''
  for (let i = 0; i < num; i++) {
    const mydiv = document.createElement('div')
    mydiv.className = 'blockdiv'
    const wh = rd(5, 30)
    css(mydiv, {
      left: rd(-20, 100) + '%',
      top: rd(-20, 100) + '%',
      width: 10 + 'vw',
      height: 10 + 'vw',
      backgroundColor: colorPool[rd(0, colorPool.length - 1)],
    })
    mydiv.innerHTML = `
    <figure class="front">H</figure>
    <figure class="back">T</figure>
    <figure class="right">M</figure>
    <figure class="left">L</figure>
    <figure class="top">5</figure>
    <figure class="bottom">!</figure>`
    block_box.appendChild(mydiv)
  }
  setTimeout(() => {
    moveBlock()
  }, 100)
}
// 移动位置
const blocks = document.getElementsByClassName('blockdiv')
const figures = document.getElementsByTagName('figure')
const fronts = document.getElementsByClassName('front')
const backs = document.getElementsByClassName('back')
const rights = document.getElementsByClassName('right')
const lefts = document.getElementsByClassName('left')
const tops = document.getElementsByClassName('top')
const bottoms = document.getElementsByClassName('bottom')
let mode = false
function moveBlock() {
  let colorPool = totalPool[rd(0, totalPool.length - 1)]
  for (let i = 0; i < blocks.length; i++) {
    css(blocks[i], {
      left: rd(-20, 100) + '%',
      top: rd(-20, 100) + '%',
      transform: `translateZ(${rd(1, 10)}vw) rotate3d(1, 1, 1, ${rd(
        0,
        360
      )}deg)  `,
      transitionTimingFunction: `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, 1)`,
      // backgroundColor: colorPool[rd(0, colorPool.length - 1)],
      boxShadow: 'none',
    })
  }
  if (mode) {
    ![...figures].forEach((item) =>
      css(item, {
        borderRadius: `4%`,
        filter: 'none',
      })
    )

    ![...fronts].forEach(
      (item) => (item.style.transform = `rotateY(0deg) translateZ(5vw)`)
    )
    ![...backs].forEach(
      (item) => (item.style.transform = `rotateX(180deg) translateZ(5vw)`)
    )
    ![...rights].forEach(
      (item) => (item.style.transform = `rotateY(90deg) translateZ(5vw)`)
    )
    ![...lefts].forEach(
      (item) => (item.style.transform = `rotateY(-90deg) translateZ(5vw)`)
    )
    ![...tops].forEach(
      (item) => (item.style.transform = `rotateX(90deg) translateZ(5vw)`)
    )
    ![...bottoms].forEach(
      (item) => (item.style.transform = `rotateX(-90deg) translateZ(5vw)`)
    )
    mode = !mode
  } else {
    ![...figures].forEach((item) =>
      css(item, {
        // transform: `rotateY(${rd(0, 360)}deg) translateZ(5vw)`,
        // transitionTimingFunction: `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, 1)`,
        borderRadius: `71% 29% 70% 30% / 60% 0% 100% 40%`,
        filter: 'drop-shadow(0 0 40px white)',
      })
    )
    ![...fronts].forEach(
      (item) => (item.style.transform = `rotateY(0deg) translateZ(6vw)`)
    )
    ![...backs].forEach(
      (item) => (item.style.transform = `rotateY(60deg) translateZ(6vw)`)
    )
    ![...rights].forEach(
      (item) => (item.style.transform = `rotateY(180deg) translateZ(6vw)`)
    )
    ![...lefts].forEach(
      (item) => (item.style.transform = `rotateY(240deg) translateZ(6vw)`)
    )
    ![...tops].forEach(
      (item) => (item.style.transform = `rotateY(300deg) translateZ(6vw)`)
    )
    ![...bottoms].forEach((item) => {
      css(item, {
        transform: `rotateX(90deg) translateZ(5vw)`,
        borderRadius: '50%',
      })
    })

    mode = !mode
  }
}

function followCursor(e) {
  if (new Date() - items.nowTime > 250) {
    items.nowTime = new Date()
    const x = e.clientX
    const y = e.clientY

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
}
function init() {
  // 设置默认账号
  let userInfo = window.localStorage.getItem('userInfo')
  if (!userInfo || userInfo.length == 0) {
    window.localStorage.setItem(
      'userInfo',
      JSON.stringify([{ username: 'html5kc', password: '123456' }])
    )
  }

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
  const boxswrap = document.querySelector('.boxswrap')
  const father_box = document.querySelector('.father_box')
  const option = document.querySelector('.option')
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
        option.style.display = 'flex'
        father_box.style.top = '-100vh'
        document.body.onmousemove = followCursor
        setTimeout(() => {
          externalbox.style.display = 'none'
          // canvas.style.display = 'none'
          // bg_bubbles.style.display = 'none'
          clearInterval(blockTiemr)
          block_box.style.display = 'none'
          box2.style.display = 'grid'
        }, 1200)
        const username = window.localStorage.getItem('username')
        if (!username || username.length == 0) {
          location.href = './login.html'
        } else {
          hellow_user.innerText = `您好：${username} !!!`
        }
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

function startTimer() {
  return setInterval(() => {
    moveBlock()
  }, 5000)
}

window.onload = () => {
  init()
  crateBlock(10)
  blockTiemr = startTimer()
}
