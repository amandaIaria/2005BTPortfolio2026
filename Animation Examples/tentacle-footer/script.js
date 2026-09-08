const ns = 'http://www.w3.org/2000/svg'
const ink = document.getElementById('ink')

const positions = [80, 145, 305, 448, 532]
const PARTICLES = 10

for (let i = 0; i < PARTICLES; i++) {
  const circle = document.createElementNS(ns, 'circle')
  const cx = positions[i % positions.length] + (Math.random() * 20 - 10)
  const cy = 30 + Math.random() * 40
  circle.setAttribute('cx', cx)
  circle.setAttribute('cy', cy)
  circle.setAttribute('r', 3 + Math.random() * 3)
  circle.setAttribute('class', 'ink-blob')
  circle.style.animationDelay = `-${(Math.random() * 6).toFixed(2)}s`
  circle.style.transformOrigin = `${cx}px ${cy}px`
  ink.appendChild(circle)
}
