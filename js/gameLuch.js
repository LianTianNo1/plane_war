const { log } = console
// 全局子弹图片
let globalammoImg = []
let initalposY = 0,
  speed = 0,
  score = 0
const username = window.localStorage.getItem('username')
if (!username || username.length == 0) {
  location.href = './login.html'
}
//  计算角度
function angle(start, end) {
  var diff_x = end.x - start.x,
    diff_y = end.y - start.y
  //返回角度,不是弧度
  return (360 * Math.atan(diff_y / diff_x)) / (2 * Math.PI)
}
// 计算位置
function calculatePosition() {}
// 生成指定的随机数
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// css
function css(ele, json) {
  for (let key in json) ele.style[key] = json[key]
}
// 音乐类
class Music {
  boomMusic
  bulletMusic
  crashMusic
  constructor() {
    this.initMusic()
  }
  // 初始化
  initMusic() {
    this.boomMusic = document.querySelector('.boomMusic')
    this.bulletMusic = document.querySelector('.bulletMusic')
    this.crashMusic = document.querySelector('.crashMusic')
  }
  playMusic(type) {
    if (type.substring(0, 4) === 'boom') {
      this.boomMusic.src = `./audio/${type}.mp3`
      this.boomMusic.play()
    } else if (type.substring(0, 6) === 'bullet') {
      this.bulletMusic.src = `./audio/${type}.mp3`
      this.bulletMusic.play()
    } else if (type.substring(0, 5) === 'crash') {
      this.crashMusic.src = `./audio/${type}.mp3`
      this.crashMusic.play()
    }
  }
}
// 食物类
class Food {
  // 定时器用来生成食物
  FoodTimer = null
  // 食物类型
  foodType = ''

  constructor() {
    // 初始化食物
    this.initFood()
  }
  initFood(type) {
    this.FoodTimer = this.createFood()
    // this.foodType = `./img/love${type}.png`
  }
  createFood() {
    return setInterval(() => {
      this.foodType = random(1, 2)
      const foodImg = document.createElement('img')
      foodImg.src = `./img/love${this.foodType}.png`
      foodImg.className = 'food'

      setTimeout(() => {
        css(foodImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
          transitionDuration: random(2, 5) + 's',
          top: '100%',
          transform: 'translate(0, 0%)',
        })
      }, 10)
      setTimeout(() => {
        css(foodImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
        })
      }, 400)
      setTimeout(() => {
        css(foodImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
        })
      }, 900)
      setTimeout(() => {
        css(foodImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
        })
      }, 1300)
      setTimeout(() => {
        css(foodImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
        })
      }, 1900)
      document.body.appendChild(foodImg)
      foodImg.addEventListener('transitionend', function () {
        if (this) this.remove()
      })
    }, 4500)
  }
}
// 敌方飞机
class EnemyPlanes {
  // 定时器用来生成敌机
  enemyTimer = null
  // 所有的敌机
  allEnemys = null
  constructor() {
    this.initEnemyPlanes()
    this.allEnemys = document.getElementsByClassName('enemyplane')
  }
  // 初始化敌机
  initEnemyPlanes() {
    this.enemyTimer = this.createEnemyPlanes()
  }
  // 销毁所有的敌机
  destroyEnemys() {
    clearInterval(this.enemyTimer)
    this.enemyTimer = null
    for (let i = 0; i < this.allEnemys.length; i++) {
      if (this.allEnemys[i]) this.allEnemys[i].remove()
    }
  }
  // 生成敌机
  createEnemyPlanes() {
    return setInterval(() => {
      const enemyImg = document.createElement('img')
      enemyImg.src = `./img/fj${random(1, 10)}.png`
      enemyImg.className = 'enemyplane'
      enemyImg.nowTime = 0
      enemyImg.ammoImg = globalammoImg[random(0, globalammoImg.length - 1)]
      setTimeout(() => {
        css(enemyImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
          transitionDuration: random(2, 5) + 's',
          top: '100%',
          transform: 'translate(0, 0%)',
        })
      }, 10)
      setTimeout(() => {
        css(enemyImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
        })
      }, 400)
      setTimeout(() => {
        css(enemyImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
        })
      }, 900)
      setTimeout(() => {
        css(enemyImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
        })
      }, 1300)
      setTimeout(() => {
        css(enemyImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
        })
      }, 1900)

      document.body.appendChild(enemyImg)
      enemyImg.addEventListener('transitionend', function () {
        if (this) this.remove()
      })
    }, 500)
  }
}
// 飞机类
class Plane {
  initHealth = 1000
  myHealth = this.initHealth
  myHealthDom = null
  myHealthDomWidth
  myPlane = null
  ammo = null
  ammoType = './img/pd1.png'
  music = null
  constructor(music) {
    this.music = music
    this.initPlane()
  }
  // 初始化飞机
  initPlane() {
    this.myPlane = document.querySelector('.myplane')
    this.myHealthDom = document.querySelector('.inhealth')
    this.myHealthDomWidth = parseInt(this.myHealthDom.offsetWidth)
    // 飞机移动
    this.planeMove()
    // 初始化子弹
    this.ammo = new Ammo()
  }

  // 飞机移动事件
  planeMove() {
    const dh = document.body.offsetHeight
    const dw = document.body.offsetWidth
    const w = this.myPlane.offsetWidth
    const h = this.myPlane.offsetHeight
    // 节流避免性能浪费
    let timerPlane = null
    let timerAmmo = null

    if (timerPlane) {
      return
    }

    window.onmousemove = (e) => {
      timerPlane = setTimeout(() => {
        // 位置处理
        const x = e.clientX - w * 0.5
        const y = e.clientY - h * 0.5
        this.myPlane.style.left = x + 'px'
        this.myPlane.style.top = y + 'px'
        // 边界处理
        if (this.myPlane.offsetTop < 0) {
          this.myPlane.style.top = 0 + 'px'
        }
        if (this.myPlane.offsetTop + h > dh) {
          this.myPlane.style.top = dh - h + 'px'
        }
        if (this.myPlane.offsetLeft + w > dw) {
          this.myPlane.style.left = dw - w + 'px'
        }
        if (this.myPlane.offsetLeft < 0) {
          this.myPlane.style.left = 0 + 'px'
        }

        // 节流
        if (timerAmmo) {
          return
        }
        timerAmmo = setTimeout(() => {
          this.ammo.createMyAmmo(
            e.clientX,
            e.clientY - h,
            this.ammoType,
            'mypd_animate',
            this.music
          )
          timerAmmo = null
        }, 100)
        // 生成子弹
        timerPlane = null
      }, 50)
    }
  }
}
// 弹药类
class Ammo {
  myAmmo = null
  ammoType = ''
  // 构造
  constructor() {}
  // 初始化子弹
  initAmmo() {
    // mypd_animate = document.querySelector('mypd_animate')
  }
  // 生成我方子弹
  createMyAmmo(nowX, nowY, type, who, music) {
    this.ammoType = type
    // this.ammoType = `./img/pd${type}.png`
    let myAmmo = document.createElement('img')
    myAmmo.className = who
    myAmmo.src = this.ammoType
    if (type.length === 13) {
      myAmmo.style.width = '15px'
    } else if (type.length === 14) {
      myAmmo.style.width = '25px'
    } else if (type.length === 15) {
      myAmmo.style.width = '40px'
    }
    if (who === 'enemypd_animate') {
      if (nowY > document.body.offsetHeight / 2) {
        myAmmo.style.animationDuration = '0.3s'
      } else if (nowY > document.body.offsetHeight / 3) {
        myAmmo.style.animationDuration = '0.5s'
      } else if (nowY > document.body.offsetHeight / 4) {
        myAmmo.style.animationDuration = '0.7s'
      } else if (nowY > document.body.offsetHeight * 0.9) {
        myAmmo.style.animationDuration = '0.1s'
      }
    } else {
      // log(music)
      music.playMusic('bullet')
    }

    myAmmo.style.left = nowX - parseInt(myAmmo.style.width) / 2 + 'px'
    myAmmo.style.top = nowY + 'px'
    myAmmo.addEventListener('animationend', function () {
      // if (this) this.remove()
      if (this) document.body.removeChild(this)
    })
    document.body.appendChild(myAmmo)
  }
}
// Boss类
class Boss {
  // boss血量
  bossHealth = 1000
  // boss血量DOM
  bossHealthDom = null
  // boss类型
  boosType = 'boss1'
  bossInitalWidth = 0
  // booss定时器
  boosTimer = null
  // 当前boss
  nowBoss = null
  // 判断当前是否攻击
  attackFlag = true
  // 音乐
  music = null
  constructor(music) {
    this.initBoss()
    this.music = music
  }

  // 初始化
  initBoss() {
    this.bossHealthDom = document.querySelector('.boos_health')
  }

  // 生成Boss
  createBoss(type, enemy, scoreDom) {
    // log('------Boss生成-------')
    this.boosType = `./img/boss${random(1, 2)}.png`
    // this.boosType = `./img/boss${2}.png`
    const boosImg = document.createElement('img')
    boosImg.src = this.boosType
    boosImg.className = 'boss'
    setTimeout(() => {
      css(boosImg, {
        left: random(0, document.body.offsetWidth * 0.8) + 'px',
        top: '5%',
        transform: 'translate(0, 0%)',
        transitionDuration: random(1, 3) + 's',
      })
    }, 10)
    boosImg.nowTime = 0
    boosImg.nowTime2 = 0
    this.bossInitalWidth = parseInt(
      window.getComputedStyle(this.bossHealthDom).width
    )
    this.nowBoss = boosImg
    this.bossMove(boosImg, enemy, scoreDom)
    document.body.appendChild(boosImg)
  }
  // boss移动
  bossMove(boosImg, enemy, scoreDom) {
    // log('------Boss开始移动-------')
    if (this.nowBoss) {
      boosImg.ontransitionend = () => {
        // log('------Boss开始移动2-------')
        // 血量为零清空
        if (this.bossHealth < 0 || this.bossHealth === 0) {
          boosImg.ontransitionend = null
          boosImg.src = './img/blast2.png'
          this.music.playMusic('boom2')

          css(this.bossHealthDom, {
            display: 'none',
          })
          this.bossHealth = 1000
          score += 1000
          scoreDom.innerText = `分数: ${score}`
          setTimeout(() => {
            boosImg.remove()
            // 继续生成小兵
            document.body.style.backgroundImage = `url(./img/context4.jpg)`
            enemy.initEnemyPlanes()
          }, 100)
        }
        this.attackFlag = true
        // 发动攻击
        this.bossAttack(random(1, 5))
        // this.bossAttack(5)
        css(boosImg, {
          left: random(0, document.body.offsetWidth * 0.8) + 'px',
          transitionDuration: random(1, 3) + 's',
          top: random(0, document.body.offsetHeight * 0.4) + 'px',
          transform: 'translate(0, 0%)',
        })
      }
    }
  }
  // boss攻击
  bossAttack(attackType) {
    // log('------Boss开始攻击了-------')
    if (this.attackFlag) {
      this.attackFlag = false
      if (attackType === 1) {
        let number = 10
        for (let i = 0; i < number; i++) {
          const dotImg = document.createElement('img')
          dotImg.src = './img/pd2.png'
          dotImg.className = 'dot'
          dotImg.nowTime = 0
          css(dotImg, {
            transitionDuration: '1s',
            left: this.nowBoss.offsetLeft + this.nowBoss.offsetWidth / 2 + 'px',
            top: this.nowBoss.offsetTop + this.nowBoss.offsetHeight / 2 + 'px',
          })
          dotImg.ontransitionend = function () {
            this.remove()
          }
          setTimeout(() => {
            css(dotImg, {
              left: (document.body.offsetWidth / number) * i + 'px',
              top: '100%',
            })
          }, 200)
          document.body.appendChild(dotImg)
        }
      } else if (attackType === 2) {
        const number = 15
        for (let i = 0; i < number; i++) {
          const dotImg = document.createElement('img')
          dotImg.src = globalammoImg[random(0, globalammoImg.length - 1)]
          dotImg.className = 'dot'
          dotImg.nowTime = 0
          dotImg.angle = (360 / number) * i
          css(dotImg, {
            transitionDuration: '1s',
            transform: `rotate(${dotImg.angle}deg)`,

            left: this.nowBoss.offsetLeft + this.nowBoss.offsetWidth / 2 + 'px',
            top: this.nowBoss.offsetTop + 'px',
          })
          dotImg.ontransitionend = function () {
            this.remove()
          }

          setTimeout(() => {
            css(dotImg, {
              transformOrigin: 'center top',
              transform: `rotate(${dotImg.angle}deg)`,
              height: '100vw',
              left: (document.body.offsetWidth / number) * i + 'px',
              top: '100%',
            })
          }, 200)
          document.body.appendChild(dotImg)
        }
      } else if (attackType === 3) {
        const number = 15
        for (let i = 0; i < number; i++) {
          const dotImg = document.createElement('img')
          // dotImg.src = './img/pd3.png'
          dotImg.src = globalammoImg[random(0, globalammoImg.length - 1)]

          dotImg.className = 'dot'
          dotImg.nowTime = 0
          dotImg.angle = (360 / number) * i
          css(dotImg, {
            transitionDuration: '1s',
            left: document.body.offsetWidth / number,
            top: this.nowBoss.offsetTop + 'px',
          })
          dotImg.ontransitionend = function () {
            this.remove()
          }

          setTimeout(() => {
            css(dotImg, {
              transformOrigin: 'center top',
              transform: `rotate(${dotImg.angle}deg)`,
              height: '100vw',
              left: (document.body.offsetWidth / number) * i + 'px',
              top: '100%',
            })
          }, 200)
          document.body.appendChild(dotImg)
        }
      } else if (attackType === 4) {
        const number = 20
        for (let i = 0; i < number; i++) {
          const dotImg = document.createElement('img')
          // dotImg.src = './img/pd3.png'
          dotImg.src = './img/pd22.png'

          dotImg.className = 'dot'
          dotImg.nowTime = 0
          css(dotImg, {
            transitionDuration: '0.5s',
            left: (document.body.offsetWidth / number) * i,
            top: '0px',
            transform: `rotate(180deg)`,
          })
          dotImg.ontransitionend = function () {
            this.remove()
          }

          setTimeout(() => {
            css(dotImg, {
              transformOrigin: 'center top',
              transform: `rotate(180deg)`,
              // height: '100vw',
              left: (document.body.offsetWidth / number) * i + 'px',
              top: '100%',
            })
          }, 200)
          document.body.appendChild(dotImg)
        }
      } else if (attackType === 5) {
        const number = 20
        for (let i = 0; i < number; i++) {
          const dotImg = document.createElement('img')
          // dotImg.src = './img/pd3.png'
          dotImg.src = './img/pd333.png'

          dotImg.className = 'dot'
          dotImg.nowTime = 0
          dotImg.angle = (360 / number) * i
          css(dotImg, {
            transitionDuration: '0.5s',
            left: (document.body.offsetWidth / number) * i,
            top: '0px',
            transform: `rotate(180deg)`,
          })
          dotImg.ontransitionend = function () {
            this.remove()
          }

          setTimeout(() => {
            css(dotImg, {
              transformOrigin: 'center top',
              transform: `rotate(180deg)`,
              height: '100vw',
              left: (document.body.offsetWidth / number) * i + 'px',
              top: '100%',
            })
          }, 200)
          document.body.appendChild(dotImg)
        }
      }
      this.music.playMusic('boom3')
    }
  }

  // 销户boss
  destroyBoss() {
    this.nowBoss.remove()
  }
}
// 游戏类
class PlaneGame {
  // 游戏全局定时器
  tiemr = null
  // Music
  music = null
  // Boss
  Boss = null
  // Boss出现的分数
  BossCreateTime = [20, 1060, 2200, 8000, 10000]
  // Boss子弹
  bossAmmo = null
  // 敌军所有的敌军
  enemyPlanes = null
  // 敌方飞机
  enemyPlane = null
  // 敌方所有子弹
  enemyPds = null
  // 子弹实例
  ammo = null
  // 我方子弹
  myAmmo = null
  // 我方飞机
  myplane = null
  myplaneSon = null
  // 可吃的食物
  food = null
  // 所有的食物
  foods = null
  // 分数
  score = 0
  // 分数元素
  scoreDom = null
  // 游戏结束div
  gameoverDom = null
  // 每次对战的数据
  statisticalData
  // 加载页面
  loadingDom = null
  // 倒计时图片
  loadingImg = null
  // 游戏选项
  gameover_ops = null
  // 食物图片

  foodImg = [
    './img/my1.png',
    './img/my11.png',
    './img/my111.png',
    './img/my2.png',
    './img/my22.png',
    './img/my222.png',
    './img/my3.png',
    './img/my33.png',
    './img/my333.png',
  ]
  // 子弹图片
  ammoImg = [
    './img/pd1.png',
    './img/pd11.png',
    './img/pd111.png',
    './img/pd2.png',
    './img/pd22.png',
    './img/pd222.png',
    './img/pd3.png',
    './img/pd33.png',
    './img/pd333.png',
  ]
  // 构造
  constructor() {
    this.initData()
  }
  // 初始化数据
  initData() {
    this.enemyPlanes = document.getElementsByClassName('enemyplane')
    this.myAmmo = document.getElementsByClassName('mypd_animate')
    this.foods = document.getElementsByClassName('food')
    this.enemyPds = document.getElementsByClassName('enemypd_animate')
    this.bossAmmo = document.getElementsByClassName('dot')
    this.scoreDom = document.querySelector('.score')
    this.gameoverDom = document.querySelector('.game_over')
    this.loadingDom = document.querySelector('.loading')
    this.loadingImg = document.querySelector('.loading_img')
    this.gameover_ops = document.querySelectorAll('.option_div')
  }
  // 初始化游戏
  initGame() {
    // 重新加载图片
    this.loadingImg.src = './img/loading.gif'
    // 音乐
    this.music = new Music()
    // 我方飞机
    this.myplane = new Plane(this.music)
    this.myplaneSon = this.myplane.myPlane.children[0]
    // 敌方飞机
    this.enemyPlane = new EnemyPlanes()
    // 子弹实例
    this.ammo = new Ammo()
    // 食物
    this.food = new Food()
    // Boss
    this.Boss = new Boss(this.music)
    // 设置全局图片
    globalammoImg = this.ammoImg
    // 开局初始化
    const localStatisticalData = window.localStorage.getItem('statisticalData')
    if (
      localStatisticalData === '' ||
      !localStatisticalData ||
      localStatisticalData === null ||
      localStatisticalData === 'null'
    ) {
      this.statisticalData = []
    } else {
      this.statisticalData = JSON.parse(localStatisticalData)
    }
    window.localStorage.setItem(
      'statisticalData',
      JSON.stringify(this.statisticalData)
    )
    // 回到登录页
    this.gameover_ops[0].onclick = () => {
      this.savaData()

      location.href = './login.html'
      window.localStorage.setItem('username', '')
    }
    // 结束后保存数据
    this.gameover_ops[1].onclick = () => {
      this.savaData()
      location.reload()
    }

    // 统计数据
    this.gameover_ops[2].onclick = () => {
      this.savaData()
      return alert('还没实现')
    }
  }
  // 游戏结束
  gameOver() {
    if (this.myplane.myHealth < 0 || this.myplane.myHealth === 0) {
      this.myplaneSon.src = './img/bbb.gif'
      css(this.gameoverDom, {
        display: 'flex',
      })
      clearInterval(this.timer)
      this.timer = null
      clearInterval(this.enemyPlane.enemyTimer)
      this.enemyPlane.enemyTimer = null
      clearInterval(this.food.FoodTimer)
      this.food.FoodTimer = null
      window.onmousemove = null
      this.myplane.myHealthDom.style.width = `0%`
      this.Boss.nowBoss.remove()
      css(this.Boss.bossHealthDom, {
        display: 'none',
      })

      setTimeout(() => {
        css(this.myplaneSon, {
          opacity: '0',
          width: '15px',
        })
        this.myplaneSon.src = './img/my1.png'
      }, 1000)
    }
  }
  // 保存数据
  savaData() {
    this.statisticalData.push({
      username: username,
      Date: new Date(),
      Hp: this.myplane.myHealth,
      Score: score,
    })
    window.localStorage.setItem(
      'statisticalData',
      JSON.stringify(this.statisticalData)
    )
  }
  // 游戏开始提示
  loadingGame() {
    setTimeout(() => {
      css(this.loadingDom, { display: 'none' })
      this.loadingImg.src = ''

      // 开始游戏
      this.initGame()

      this.startTimer()
    }, 1700)
  }
  // 游戏的全局定时器
  startTimer() {
    // 子弹吃食物
    let nowTime = null

    this.timer = setInterval(() => {
      // 移动背景
      speed = initalposY--
      document.body.style.backgroundPositionY = speed + '%'
      // 敌方Boss我机的碰撞
      if (this.Boss.nowBoss) {
        const bossResult = this.isCollision(
          this.Boss.nowBoss,
          this.myplane.myPlane
        )
        if (bossResult && new Date() - this.Boss.nowBoss.nowTime > 500) {
          this.Boss.nowBoss.nowTime = new Date()
          this.myplane.myHealth -= 50
          this.myplane.myHealthDom.style.width = `${
            this.myplane.myHealth / 10
          }%`
          this.myplane.myPlane.className = 'myplane myplane_animate'
          this.myplane.myPlane.onanimationend = function () {
            this.className = 'myplane'
          }
          this.gameOver()
        }
      }

      // 开启检测碰撞
      for (let i = 0; i < this.enemyPlanes.length; i++) {
        const nowEnemy = this.enemyPlanes[i]

        if (nowEnemy.isFlag) continue
        const result = this.isCollision(this.myplane.myPlane, nowEnemy)
        this.gameOver()
        if (result) {
          nowEnemy.src = './img/blast2.png'
          setTimeout(() => {
            // document.body.removeChild(nowEnemy)
            nowEnemy.remove()
          }, 200)

          // 扣血

          if (new Date() - nowEnemy.nowTime > 1000) {
            nowEnemy.nowTime = new Date()
            // log(nowEnemy.nowTime)
            // log(this.myplane.myHealth)
            this.myplane.myHealth -= 10
            this.myplane.myHealthDom.style.width = `${
              this.myplane.myHealth / 10
            }%`
          }
        }
      }
      // 敌机和我方子弹的碰撞
      for (let i = 0; i < this.enemyPlanes.length; i++) {
        const nowEnemy = this.enemyPlanes[i]
        // 生成敌方子弹
        if (new Date() - nowTime > 100) {
          nowTime = new Date()
          nowEnemy.nowx = nowEnemy.offsetWidth / 2 + nowEnemy.offsetLeft
          nowEnemy.nowy = nowEnemy.offsetHeight + nowEnemy.offsetTop
          this.ammo.createMyAmmo(
            nowEnemy.nowx,
            nowEnemy.nowy,
            nowEnemy.ammoImg,
            'enemypd_animate'
          )
        }

        for (let j = 0; j < this.myAmmo.length; j++) {
          const nowAmmo = this.myAmmo[j]
          const result = this.isCollision(nowAmmo, nowEnemy)

          if (result) {
            nowEnemy.src = './img/blast3.gif'
            nowEnemy.isFlag = true
            this.music.playMusic('boom')
            if (nowAmmo) nowAmmo.remove()
            setTimeout(() => {
              if (nowEnemy) nowEnemy.remove()
            }, 500)
          }
        }
      }
      // boss子弹和我机碰撞
      for (let i = 0; i < this.bossAmmo.length; i++) {
        const nowBossAmmo = this.bossAmmo[i]
        const result = this.isCollision(this.myplane.myPlane, nowBossAmmo)
        // log('1', new Date() - nowBossAmmo.nowTime > 1000)

        if (result) {
          if (new Date() - nowBossAmmo.nowTime > 1000) {
            nowBossAmmo.nowTime = new Date()

            // 子弹消失扣血
            nowBossAmmo.remove()
            this.myplane.myHealth -= 10
            // log('Boss的子弹碰撞了，当前的HP :', this.myplane.myHealth)

            this.myplane.myHealthDom.style.width = `${
              (this.myplane.myHealth / this.myplane.initHealth) *
              this.myplane.myHealthDomWidth
            }px`
            this.myplane.myPlane.className = 'myplane myplane_animate'
            this.myplane.myPlane.onanimationend = function () {
              this.className = 'myplane'
            }
            this.gameOver()
          }
        }
      }
      // 双方子弹碰撞
      for (let i = 0; i < this.enemyPds.length; i++) {
        const nowEnemyAmmo = this.enemyPds[i]
        // 双方子弹碰撞
        for (let j = 0; j < this.myAmmo.length; j++) {
          const nowAmmo = this.myAmmo[j]
          const result = this.isCollision(nowAmmo, nowEnemyAmmo)
          if (result) {
            nowAmmo.remove()
            nowEnemyAmmo.remove()
            score += 10
            this.scoreDom.innerText = `分数: ${score}`

            if (this.BossCreateTime.some((item) => score > item)) {
              this.BossCreateTime = this.BossCreateTime.filter(
                (item) => item > score
              )
              // 抹去所有的小兵
              this.enemyPlane.destroyEnemys()
              css(this.Boss.bossHealthDom, {
                display: 'block',
              })
              document.body.style.backgroundImage = `url(./img/context3.jpg)`

              // 生成boss
              this.Boss.createBoss('1', this.enemyPlane, this.scoreDom)
            }
          }
        }
        // 敌方子弹和我机碰撞
        const result = this.isCollision(this.myplane.myPlane, nowEnemyAmmo)
        if (result) {
          // 子弹消失扣血
          nowEnemyAmmo.remove()
          this.myplane.myHealth -= 10
          this.myplane.myHealthDom.style.width = `${
            (this.myplane.myHealth / this.myplane.initHealth) *
            this.myplane.myHealthDomWidth
          }px`
          this.myplane.myPlane.className = 'myplane myplane_animate'
          this.myplane.myPlane.onanimationend = function () {
            this.className = 'myplane'
          }
          this.gameOver()
        }
      }
      // 我方子弹和食物
      for (let j = 0; j < this.myAmmo.length; j++) {
        const nowAmmo = this.myAmmo[j]
        // 食物碰撞
        if (this.foods.length > 0) {
          for (let i = 0; i < this.foods.length; i++) {
            const nowFood = this.foods[i]
            const result = this.isCollision(nowAmmo, nowFood)
            if (result) {
              this.myplaneSon.setAttribute(
                'src',
                this.foodImg[random(0, this.foodImg.length - 1)]
              )
              this.myplane.ammoType =
                this.ammoImg[random(0, this.ammoImg.length - 1)]
              if (this.myplane.myHealth + 100 < 1000) {
                this.myplane.myHealth += 100
                this.myplane.myHealthDom.style.width = `${
                  (this.myplane.myHealth / this.myplane.initHealth) *
                  this.myplane.myHealthDomWidth
                }px`
              }
              if (nowAmmo) nowAmmo.remove()
              if (this.foods[0]) this.foods[0].remove()
            }
          }
        }
        // 我方子弹和boss碰撞
        if (this.Boss.nowBoss) {
          const result = this.isCollision(nowAmmo, this.Boss.nowBoss)
          if (result) {
            nowAmmo.remove()
            this.music.playMusic('crash')

            this.Boss.nowBoss.className = 'boss boss_animate'
            this.Boss.nowBoss.onanimationend = function () {
              this.className = 'boss'
            }
            this.Boss.bossHealth -= 10
            this.Boss.bossHealthDom.style.width =
              (this.Boss.bossHealth / 1000) * this.Boss.bossInitalWidth + 'px'
          }
        }
      }
    }, 20)
  }
  // 碰撞检测
  isCollision(obj, enemy) {
    //obj:我军或子弹 	 enemy:敌军
    var t1 = obj.offsetTop,
      b1 = obj.offsetTop + obj.offsetHeight,
      l1 = obj.offsetLeft,
      r1 = obj.offsetLeft + obj.offsetWidth

    var t2 = enemy.offsetTop,
      b2 = enemy.offsetTop + enemy.offsetHeight,
      l2 = enemy.offsetLeft,
      r2 = enemy.offsetLeft + enemy.offsetWidth

    return !(t1 > b2 || l1 > r2 || b1 < t2 || r1 < l2)
  }
}
window.onload = () => {
  const startGame = new PlaneGame()
  // startGame.startTimer()
  startGame.loadingGame()
}
// window.onresize = () => {
//   const startGame = new PlaneGame()
//   startGame.startTimer()
// }
