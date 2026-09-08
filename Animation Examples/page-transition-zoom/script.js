const stage = document.getElementById('stage')
const overlay = document.getElementById('overlay')
const pageA = document.getElementById('pageA')
const pageB = document.getElementById('pageB')
const backBtn = document.getElementById('backBtn')

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const GROW_MS = 550
const FADE_MS = 350
const GROW_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const FADE_EASE = 'ease-in-out'

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', () => {
    if (reduceMotion) {
      pageA.classList.add('hidden')
      pageB.classList.remove('hidden')
      return
    }

    const rect = card.getBoundingClientRect()
    const stageRect = stage.getBoundingClientRect()

    overlay.style.transition = 'none'
    overlay.style.background = card.style.background
    overlay.textContent = card.dataset.label
    overlay.style.top = rect.top - stageRect.top + 'px'
    overlay.style.left = rect.left - stageRect.left + 'px'
    overlay.style.width = rect.width + 'px'
    overlay.style.height = rect.height + 'px'
    overlay.style.opacity = '1'

    requestAnimationFrame(() => {
      overlay.style.transition = `top ${GROW_MS}ms ${GROW_EASE}, left ${GROW_MS}ms ${GROW_EASE}, width ${GROW_MS}ms ${GROW_EASE}, height ${GROW_MS}ms ${GROW_EASE}`
      overlay.style.top = '0px'
      overlay.style.left = '0px'
      overlay.style.width = stageRect.width + 'px'
      overlay.style.height = stageRect.height + 'px'
    })

    setTimeout(() => {
      pageA.classList.add('hidden')
      pageB.classList.remove('hidden')

      requestAnimationFrame(() => {
        overlay.style.transition = `opacity ${FADE_MS}ms ${FADE_EASE}`
        overlay.style.opacity = '0'
      })
    }, GROW_MS)
  })
})

backBtn.addEventListener('click', () => {
  pageB.classList.add('hidden')
  pageA.classList.remove('hidden')
  overlay.style.transition = 'none'
  overlay.style.opacity = '0'
})
