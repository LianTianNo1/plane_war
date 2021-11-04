const liDoms = [...document.querySelectorAll('.list li')]
const infoList = [...document.querySelectorAll('.showinfo')]
const time_show = document.querySelector('.time_show')

const { log } = console

for (let i = 0; i < liDoms.length; i++) {
  liDoms[i].onclick = () => {
    if (infoList[i].className === 'showinfo active') {
      infoList[i].className = 'showinfo'
    } else {
      infoList.forEach((ele) => (ele.className = 'showinfo'))
      infoList[i].className = 'showinfo active'
    }
  }
}

let dateTimer = updateDate()

function updateDate() {
  return setInterval(() => {
    let date = new Date()
    time_show.innerText = `${dateFormat('YYYY-mm-dd HH:MM', date)}`
  }, 1000)
}
