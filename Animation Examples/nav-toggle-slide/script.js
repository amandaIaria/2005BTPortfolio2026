const hamburger = document.getElementById('hamburger')
const panel = document.getElementById('panel')
const panelBg = document.getElementById('panelBg')

let open = false

hamburger.addEventListener('click', () => {
  open = !open
  if (open) {
    panelBg.hidden = false
    panel.classList.add('open')
  } else {
    panel.classList.remove('open')
  }
})

panel.addEventListener('transitionend', (e) => {
  if (e.propertyName === 'width' && !open) {
    panelBg.hidden = true
  }
})
