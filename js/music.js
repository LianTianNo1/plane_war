// let liDom, controlDoms
const { log } = console
function toogleState() {}
let css = (ele, json) => {
  for (let key in json) ele.style[key] = json[key]
}

// 音乐控制类
class MusicShow {
  nowIndex = 0
  preIndex
  nextIndex
  liDom
  controlDoms
  videoDom
  bgVideoDom
  skipTime = 10
  volumeSpeed = 0.1
  nowVolume
  volumShow
  volumShowLen
  constructor() {
    this.initData()
    this.domControl()
  }
  // 初始化数据
  initData() {
    this.liDom = document.querySelectorAll('.item')
    this.controlDoms = document.querySelectorAll('.control_center .iconfont')
    this.preIndex =
      this.nowIndex - 1 < 0 ? this.liDom.length - 1 : this.nowIndex - 1
    this.nextIndex =
      this.nowIndex + 1 > this.liDom.length - 1 ? 0 : this.nowIndex + 1
    css(this.liDom[this.nowIndex], {
      display: 'block',
      left: '50%',
      filter: 'blur(0px)',
      zIndex: '9',
      transform: 'translate3d(-50%, -50%, 150px)',
    })
    css(this.liDom[this.preIndex], {
      display: 'block',
      left: '0%',
      filter: 'blur(2px)',
      zIndex: '2',
      transform: 'translate3d(-50%, -50%, -100px)',
    })
    css(this.liDom[this.nextIndex], {
      display: 'block',
      left: '100%',
      filter: 'blur(2px)',
      zIndex: '2',
      transform: 'translate3d(-50%, -50%, -100px)',
    })
    css(this.liDom[2], {
      display: 'block',
      left: '0%',
      filter: 'blur(2px)',
      zIndex: '2',
      transform: 'translate3d(-50%, -50%, -100px)',
    })
    css(this.liDom[3], {
      display: 'block',
      left: '100%',
      filter: 'blur(2px)',
      zIndex: '2',
      transform: 'translate3d(-50%, -50%, -100px)',
    })
    this.videoDom = document.querySelector('li.active video')
    this.bgVideoDom = document.getElementById('bg_video')
    this.bgVideoDom.volume = 0
    this.volumShow = document.querySelector('.volum_show')
    this.volumShowLen = parseInt(getComputedStyle(this.volumShow).width)
  }

  // 下一曲
  nextMe() {
    this.nowIndex =
      this.nowIndex + 1 > this.liDom.length - 1 ? 0 : this.nowIndex + 1
    this.preIndex =
      this.nowIndex - 1 < 0 ? this.liDom.length - 1 : this.nowIndex - 1
    this.nextIndex =
      this.nowIndex + 1 > this.liDom.length - 1 ? 0 : this.nowIndex + 1

    // 清空当前的样式
    this.clearClassName()
    this.liDom[this.nowIndex].className = 'item active'
    // 控制css
    this.setCss()
  }
  // 上一曲
  preMe() {
    this.nowIndex =
      this.nowIndex - 1 < 0 ? this.liDom.length - 1 : this.nowIndex - 1
    this.preIndex =
      this.nowIndex - 1 < 0 ? this.liDom.length - 1 : this.nowIndex - 1
    this.nextIndex =
      this.nowIndex + 1 > this.liDom.length - 1 ? 0 : this.nowIndex + 1

    // 清空当前的样式
    this.clearClassName()
    this.liDom[this.nowIndex].className = 'item active'
    // 控制css
    this.setCss()
  }
  clearClassName() {
    for (let i = 0; i < this.liDom.length; i++) {
      this.liDom[i].className = 'item'
      this.liDom[i].style.zIndex = '1'
      this.liDom[i].children[0].pause()

      this.liDom[i].children[0].currentTime = '3'
    }
    this.controlDoms[2].className = 'iconfont icon-bofang'
  }
  // 播放媒体
  playVideo() {
    // log(this.videoDom)
    if (this.videoDom.paused) {
      this.controlDoms[2].className = 'iconfont icon-zanding'

      this.bgVideoDom.play()
      this.videoDom.play()
    } else {
      this.controlDoms[2].className = 'iconfont icon-bofang'
      this.bgVideoDom.pause()
      this.videoDom.pause()
    }
  }
  domControl() {
    // 快退
    this.controlDoms[0].onclick = () => {
      this.videoDom.currentTime !== 0
        ? (this.videoDom.currentTime -= this.skipTime)
        : 1
      this.bgVideoDom.currentTime !== 0
        ? (this.bgVideoDom.currentTime -= this.skipTime)
        : 1
    }
    // 上一曲
    this.controlDoms[1].onclick = () => {
      this.nextMe()
    }
    // 播放
    this.controlDoms[2].onclick = () => {
      this.playVideo()
    }
    // 下一曲
    this.controlDoms[3].onclick = () => {
      this.preMe()
    }
    // 快进
    this.controlDoms[4].onclick = () => {
      this.videoDom.currentTime + this.skipTime < this.videoDom.duration
        ? (this.videoDom.currentTime += this.skipTime)
        : this.videoDom.duration
      this.bgVideoDom.currentTime + this.skipTime < this.bgVideoDom.duration
        ? (this.bgVideoDom.currentTime += this.skipTime)
        : this.bgVideoDom.duration
    }
    // 音量-
    this.controlDoms[5].onclick = () => {
      this.nowVolume = this.videoDom.volume

      this.videoDom.volume =
        this.videoDom.volume - this.volumeSpeed <= 0
          ? 0
          : Math.abs(this.videoDom.volume * 10 - 1) / 10
      this.volumShow.style.width = this.nowVolume * this.volumShowLen + 'px'
    }
    // 音量+
    this.controlDoms[6].onclick = () => {
      this.nowVolume = this.videoDom.volume
      this.videoDom.volume =
        this.videoDom.volume + this.volumeSpeed >= 1
          ? 1
          : (this.videoDom.volume * 10 + 1) / 10
      this.volumShow.style.width = this.nowVolume * this.volumShowLen + 'px'
    }
  }
  setCss() {
    this.videoDom = document.querySelector('li.active video')
    this.bgVideoDom.src = this.videoDom.src
    this.bgVideoDom.setAttribute('poster', this.videoDom.getAttribute('poster'))
    this.bgVideoDom.currentTime = '3'
    this.nowVolume = this.videoDom.volume
    this.volumShow.style.width = this.nowVolume * this.volumShowLen + 'px'

    setTimeout(() => {
      css(this.liDom[this.nowIndex], {
        display: 'block',
        left: '50%',
        filter: 'blur(0px)',
        zIndex: '9',
        transform: 'translate3d(-50%, -50%, 150px)',
      })
    }, 200)

    css(this.liDom[this.preIndex], {
      display: 'block',
      left: '0%',
      filter: 'blur(2px)',
      zIndex: '2',
      transform: 'translate3d(-50%, -50%, -100px)',
    })
    css(this.liDom[this.nextIndex], {
      display: 'block',
      left: '100%',
      filter: 'blur(2px)',
      zIndex: '2',
      transform: 'translate3d(-50%, -50%, -100px)',
    })
  }
}

window.onload = () => {
  new MusicShow()
}
