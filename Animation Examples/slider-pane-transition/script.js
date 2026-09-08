const SLIDES = [
  { label: '1', color: '#2dd4bf' },
  { label: '2', color: '#5eead4' },
  { label: '3', color: '#99f6e4' },
  { label: '4', color: '#0ea5a0' },
]

const viewport = document.getElementById('viewport')
const dotsTrack = document.getElementById('dotsTrack')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

let current = 0
let animating = false

function makePane(index) {
  const pane = document.createElement('div')
  pane.className = 'pane'
  pane.style.background = SLIDES[index].color
  pane.textContent = SLIDES[index].label
  return pane
}

function makeDots() {
  dotsTrack.innerHTML = ''
  SLIDES.forEach((_, i) => {
    const dot = document.createElement('div')
    dot.className = 'dot' + (i === current ? ' active' : '')
    dotsTrack.appendChild(dot)
  })
}

function updateDots() {
  const dots = Array.from(dotsTrack.children)
  dots.forEach((dot, i) => dot.classList.toggle('active', i === current))
  const dotSpacing = 18
  const center = (dots.length - 1) / 2
  const offset = (center - current) * dotSpacing
  dotsTrack.style.transform = `translateX(${offset}px)`
}

function goTo(nextIndex, direction) {
  if (animating) return
  animating = true

  const outgoing = viewport.querySelector('.pane')
  const incoming = makePane(nextIndex)

  incoming.style.transition = 'none'
  incoming.style.transform = direction > 0 ? 'translateY(100%)' : 'translateY(-100%)'
  viewport.appendChild(incoming)

  incoming.getBoundingClientRect()

  requestAnimationFrame(() => {
    incoming.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    incoming.style.transform = 'translateY(0%)'
    if (outgoing) {
      outgoing.style.transform = direction > 0 ? 'translateY(-100%)' : 'translateY(100%)'
    }
  })

  setTimeout(() => {
    if (outgoing) outgoing.remove()
    current = nextIndex
    updateDots()
    animating = false
  }, 520)
}

prevBtn.addEventListener('click', () => {
  const next = (current - 1 + SLIDES.length) % SLIDES.length
  goTo(next, -1)
})

nextBtn.addEventListener('click', () => {
  const next = (current + 1) % SLIDES.length
  goTo(next, 1)
})

viewport.appendChild(makePane(current))
makeDots()
updateDots()
