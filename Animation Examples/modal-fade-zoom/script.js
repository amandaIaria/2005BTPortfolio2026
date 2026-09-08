const openBtn = document.getElementById('openBtn')
const closeBtn = document.getElementById('closeBtn')
const confirmBtn = document.getElementById('confirmBtn')
const backdrop = document.getElementById('backdrop')
const modal = document.getElementById('modal')

function openModal() {
  backdrop.classList.add('open')
}

function closeModal() {
  backdrop.classList.remove('open')
}

openBtn.addEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)
confirmBtn.addEventListener('click', closeModal)

backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) closeModal()
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal()
})
