const SPEED_PX_PER_SECOND = 120

document.querySelectorAll('.nav-link').forEach((link) => {
  const track = link.querySelector('.marquee-track')
  const item = track.querySelector('.marquee-item')

  const setDuration = () => {
    const width = item.getBoundingClientRect().width
    const duration = width / SPEED_PX_PER_SECOND
    track.style.animationDuration = `${duration}s`
  }

  setDuration()
  window.addEventListener('resize', setDuration)
})
