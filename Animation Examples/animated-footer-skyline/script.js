const starsEl = document.getElementById('stars')
const buildingsEl = document.getElementById('buildings')

const STAR_COUNT = 30
for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement('div')
  star.className = 'star'
  star.style.left = `${Math.random() * 100}%`
  star.style.top = `${Math.random() * 55}%`
  star.style.animationDuration = '3s'
  star.style.animationDelay = `-${(Math.random() * 3).toFixed(2)}s`
  starsEl.appendChild(star)
}

const BUILDING_COUNT = 10
for (let i = 0; i < BUILDING_COUNT; i++) {
  const building = document.createElement('div')
  building.className = 'building'
  const height = 90 + Math.random() * 140
  building.style.height = `${height}px`

  const windowCount = Math.floor(height / 18)
  for (let w = 0; w < windowCount; w++) {
    const win = document.createElement('div')
    win.className = 'window'
    win.style.animationDelay = `-${(Math.random() * 4).toFixed(2)}s`
    building.appendChild(win)
  }

  buildingsEl.appendChild(building)
}
