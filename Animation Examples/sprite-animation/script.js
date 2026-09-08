const COLUMNS = 4
const ROWS = 2
const FRAME_COUNT = COLUMNS * ROWS
const FRAME_SIZE = 96
const DURATION = 1200 // ms for a full loop through all frames

function buildSpriteSheet() {
  const canvas = document.createElement('canvas')
  canvas.width = FRAME_SIZE * COLUMNS
  canvas.height = FRAME_SIZE * ROWS
  const ctx = canvas.getContext('2d')

  for (let i = 0; i < FRAME_COUNT; i++) {
    const col = i % COLUMNS
    const row = Math.floor(i / COLUMNS)
    const cx = col * FRAME_SIZE + FRAME_SIZE / 2
    const cy = row * FRAME_SIZE + FRAME_SIZE / 2
    const angle = (i / FRAME_COUNT) * Math.PI * 2

    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(angle)
    ctx.fillStyle = `hsl(${170 + i * 12}, 70%, ${50 + i * 3}%)`
    ctx.beginPath()
    ctx.roundRect(-28, -28, 56, 56, 12)
    ctx.fill()
    ctx.restore()
  }

  return canvas.toDataURL()
}

const sprite = document.getElementById('sprite')
sprite.style.backgroundImage = `url(${buildSpriteSheet()})`
sprite.style.backgroundSize = `${FRAME_SIZE * COLUMNS}px ${FRAME_SIZE * ROWS}px`

let playing = true
let startTime = null
let frameIndex = 0

function setFrame(i) {
  const col = i % COLUMNS
  const row = Math.floor(i / COLUMNS)
  sprite.style.backgroundPosition = `-${col * FRAME_SIZE}px -${row * FRAME_SIZE}px`
}

function tick(now) {
  if (!playing) return
  if (startTime === null) startTime = now
  const elapsed = now - startTime
  const frameDuration = DURATION / FRAME_COUNT
  frameIndex = Math.floor(elapsed / frameDuration) % FRAME_COUNT
  setFrame(frameIndex)
  requestAnimationFrame(tick)
}

setFrame(0)
requestAnimationFrame(tick)

const toggleBtn = document.getElementById('toggleBtn')
toggleBtn.addEventListener('click', () => {
  playing = !playing
  toggleBtn.textContent = playing ? 'Pause' : 'Play'
  if (playing) {
    startTime = null
    requestAnimationFrame(tick)
  }
})
