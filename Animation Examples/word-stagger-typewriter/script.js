const TEXT = 'Every word arrives with a little bounce of its own.'
const INITIAL_DELAY_MS = 500
const STAGGER_MS = 50

const sentenceEl = document.getElementById('sentence')
const playBtn = document.getElementById('play')

const words = TEXT.split(' ')
sentenceEl.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join('')
const wordEls = sentenceEl.querySelectorAll('.word')

let hasPlayed = false

function play() {
  wordEls.forEach((el) => el.classList.remove('visible'))
  wordEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible')
    }, INITIAL_DELAY_MS + i * STAGGER_MS)
  })
}

playBtn.addEventListener('click', play)

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasPlayed) {
        hasPlayed = true
        play()
        observer.disconnect()
      }
    })
  },
  { threshold: 0.4 }
)

observer.observe(sentenceEl)
