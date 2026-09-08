const TYPE_SPEED_MS = 45
const NAME_PAUSE_MS = 800

const STAGES = [
  { el: document.getElementById('hero-name'), markup: 'Alex Iaria' },
  { el: document.getElementById('hero-heading'), markup: 'I build <accent>fast</accent>, thoughtful web experiences.' },
  { el: document.getElementById('hero-caption'), markup: 'Front-end engineer, tinkerer, occasional octopus enthusiast.' },
]

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Parse "<accent>word</accent>" markup into a flat list of { char, accent } tokens
function tokenize(markup) {
  const tokens = []
  let accent = false
  let i = 0
  while (i < markup.length) {
    if (markup.startsWith('<accent>', i)) {
      accent = true
      i += '<accent>'.length
      continue
    }
    if (markup.startsWith('</accent>', i)) {
      accent = false
      i += '</accent>'.length
      continue
    }
    tokens.push({ char: markup[i], accent })
    i += 1
  }
  return tokens
}

function renderTokens(el, tokens, count, showCursor) {
  let html = ''
  let openSpan = false
  for (let i = 0; i < count; i++) {
    const t = tokens[i]
    if (t.accent && !openSpan) {
      html += '<span class="accent">'
      openSpan = true
    }
    if (!t.accent && openSpan) {
      html += '</span>'
      openSpan = false
    }
    html += t.char
  }
  if (openSpan) html += '</span>'
  if (showCursor) html += '<span class="cursor">|</span>'
  el.innerHTML = html
}

function typeStage(stage, onDone) {
  const tokens = tokenize(stage.markup)
  let i = 0

  function step() {
    i += 1
    renderTokens(stage.el, tokens, i, true)
    if (i < tokens.length) {
      setTimeout(step, TYPE_SPEED_MS)
    } else {
      onDone()
    }
  }

  step()
}

function runSequence() {
  STAGES.forEach((s) => {
    s.el.innerHTML = ''
  })

  if (prefersReducedMotion) {
    STAGES.forEach((s) => renderTokens(s.el, tokenize(s.markup), tokenize(s.markup).length, false))
    return
  }

  let idx = 0

  function next() {
    if (idx >= STAGES.length) return
    const stage = STAGES[idx]
    typeStage(stage, () => {
      const isName = idx === 0
      const finished = idx === STAGES.length - 1
      // leave cursor blinking on the just-finished stage briefly
      const tokens = tokenize(stage.markup)
      renderTokens(stage.el, tokens, tokens.length, isName || finished)
      idx += 1
      setTimeout(next, isName ? NAME_PAUSE_MS : 150)
    })
  }

  next()
}

document.getElementById('replay').addEventListener('click', runSequence)
runSequence()
