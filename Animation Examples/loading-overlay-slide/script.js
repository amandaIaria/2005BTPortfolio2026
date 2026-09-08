const MIN_DISPLAY_MS = 1200
const overlay = document.getElementById('overlay')
const replayBtn = document.getElementById('replay')
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function run() {
  overlay.classList.remove('exiting')
  overlay.style.display = 'flex'

  if (prefersReducedMotion) {
    overlay.style.display = 'none'
    return
  }

  setTimeout(() => {
    overlay.classList.add('exiting')
  }, MIN_DISPLAY_MS)
}

replayBtn.addEventListener('click', run)
run()
