const LOOP_MS = 20000
const CARD_COUNT = 8
const RADIUS = 140
const CARD_W = 56
const CARD_H = 40

const ring = document.getElementById('orbitRing')
const group = document.getElementById('orbitGroup')

const cards = []
for (let i = 0; i < CARD_COUNT; i++) {
  const card = document.createElement('div')
  card.className = 'orbit-card'
  card.textContent = i + 1
  const dot = document.createElement('div')
  dot.className = 'orbit-dot'
  ring.appendChild(card)
  ring.appendChild(dot)
  cards.push({ card, dot, hovered: false })

  card.addEventListener('mouseenter', () => {
    cards[i].hovered = true
    card.classList.add('is-hovered')
  })
  card.addEventListener('mouseleave', () => {
    cards[i].hovered = false
    card.classList.remove('is-hovered')
  })
}

let paused = false
group.addEventListener('mouseenter', () => { paused = true })
group.addEventListener('mouseleave', () => { paused = false })

// Walks the perimeter of a w x h rectangle centered at (0,0), t in [0,1)
function perimeterPoint(t, w, h) {
  const perim = 2 * (w + h)
  let d = ((t % 1) + 1) % 1 * perim
  const halfW = w / 2
  const halfH = h / 2

  if (d <= w) return { x: -halfW + d, y: -halfH }
  d -= w
  if (d <= h) return { x: halfW, y: -halfH + d }
  d -= h
  if (d <= w) return { x: halfW - d, y: halfH }
  d -= w
  return { x: -halfW, y: halfH - d }
}

let frozenTime = 0
let lastElapsed = 0

function tick(now) {
  const elapsed = paused ? frozenTime : now
  if (!paused) frozenTime = now
  lastElapsed = elapsed

  const ringAngle = (elapsed % LOOP_MS) / LOOP_MS * Math.PI * 2

  cards.forEach(({ card, dot }, i) => {
    const cardAngle = ringAngle + (i / CARD_COUNT) * Math.PI * 2
    const cx = Math.cos(cardAngle) * RADIUS
    const cy = Math.sin(cardAngle) * RADIUS
    card.style.transform = `translate(${cx}px, ${cy}px)`

    // Each card's marker marches its own perimeter, offset per-card so they desync
    const markT = (elapsed / 3000) + i * 0.15
    const p = perimeterPoint(markT, CARD_W, CARD_H)
    dot.style.transform = `translate(${cx + p.x}px, ${cy + p.y}px)`
  })

  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)
