const { log } = console
let colorList
const externalbox = document.querySelector('.external')
const canvas = document.getElementById('canvas')
const bg_bubbles = document.querySelector('.bg-bubbles')

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
        // external.style.display = 'none'
        // boxswrap.style.display = 'flex'
        option.style.display = 'flex'
        father_box.style.top = '-100vh'
        document.body.onmousemove = followCursor
        setTimeout(() => {
          externalbox.style.display = 'none'
          canvas.style.display = 'none'
          bg_bubbles.style.display = 'none'
        }, 1000)

        // location.href = './start.html'
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

window.onload = () => {
  init()
}
