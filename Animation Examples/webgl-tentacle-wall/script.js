const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const ARM_COUNT = 14
const SEGMENTS = 40

let width = 0
let height = 0
let dpr = Math.min(window.devicePixelRatio || 1, 2)
let visible = true
let rafId = null

function resize() {
  const rect = canvas.getBoundingClientRect()
  width = rect.width
  height = rect.height
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

window.addEventListener('resize', resize)
resize()

const arms = Array.from({ length: ARM_COUNT }, (_, i) => ({
  x: (i + 0.5) / ARM_COUNT,
  length: 0.55 + Math.random() * 0.35,
  swaySpeed: 0.6 + Math.random() * 0.6,
  swayPhase: Math.random() * Math.PI * 2,
  swayAmount: 0.08 + Math.random() * 0.1,
  curlPhase: Math.random() * Math.PI * 2,
}))

function drawArm(arm, t) {
  const baseX = arm.x * width
  const baseY = height
  const armLength = arm.length * height

  ctx.beginPath()
  ctx.moveTo(baseX, baseY)

  for (let s = 1; s <= SEGMENTS; s++) {
    const p = s / SEGMENTS // 0 -> 1 along the arm
    const y = baseY - p * armLength

    // gentle base sway, growing curl toward the tip (p^5)
    const sway = Math.sin(t * arm.swaySpeed + arm.swayPhase + p * 2) * arm.swayAmount
    const curl = Math.sin(t * arm.swaySpeed * 1.4 + arm.curlPhase) * Math.pow(p, 5) * 0.6

    const x = baseX + (sway + curl) * width * 0.5
    ctx.lineTo(x, y)
  }

  const gradient = ctx.createLinearGradient(baseX, baseY, baseX, baseY - armLength)
  gradient.addColorStop(0, 'rgba(15, 118, 110, 0.9)')
  gradient.addColorStop(1, 'rgba(45, 212, 191, 0.15)')

  ctx.strokeStyle = gradient
  ctx.lineWidth = 6
  ctx.lineCap = 'round'
  ctx.stroke()
}

function frame(time) {
  const t = time / 1000
  ctx.clearRect(0, 0, width, height)

  arms.forEach((arm) => drawArm(arm, t))

  if (visible) {
    rafId = requestAnimationFrame(frame)
  } else {
    rafId = null
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      visible = entry.isIntersecting
      if (visible && rafId === null) {
        rafId = requestAnimationFrame(frame)
      }
    })
  },
  { threshold: 0.01 }
)

observer.observe(canvas)
rafId = requestAnimationFrame(frame)
