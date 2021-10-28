const liDoms = [...document.querySelectorAll('.list li')]
const infoList = [...document.querySelectorAll('.showinfo')]
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
