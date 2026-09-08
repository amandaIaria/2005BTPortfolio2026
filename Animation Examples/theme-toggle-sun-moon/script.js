const toggle = document.getElementById('toggle')
const iconWrap = document.getElementById('iconWrap')

const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="#f6c453" stroke-width="2"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
const moon = '<svg viewBox="0 0 24 24" fill="#a5b4fc"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>'

let isDark = false
iconWrap.innerHTML = sun

toggle.addEventListener('click', () => {
  isDark = !isDark
  iconWrap.classList.add('exiting')

  const onExitDone = (e) => {
    if (e.propertyName !== 'opacity') return
    iconWrap.removeEventListener('transitionend', onExitDone)

    iconWrap.innerHTML = isDark ? moon : sun
    iconWrap.classList.remove('exiting')
    iconWrap.classList.add('entering')

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        iconWrap.classList.remove('entering')
      })
    })
  }

  iconWrap.addEventListener('transitionend', onExitDone)
})
