const submitBtn = document.getElementById('submitBtn')
const spinner = document.getElementById('spinner')
const btnLabel = document.getElementById('btnLabel')

submitBtn.addEventListener('click', () => {
  if (submitBtn.disabled) return

  submitBtn.disabled = true
  spinner.hidden = false
  btnLabel.textContent = 'Submitting...'

  setTimeout(() => {
    submitBtn.disabled = false
    spinner.hidden = true
    btnLabel.textContent = 'Submit'
  }, 2000)
})
