import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
 * TextReveal — word-by-word blur-fade, scroll-triggered, zero flash.
 *
 * useLayoutEffect runs after React commits the DOM but BEFORE the browser
 * paints a single pixel. splitWords hides all words (opacity:0) inside that
 * window, so the user never sees a flash of visible text.
 *
 * Animation is driven entirely by CSS (animation-delay via --wa-d), so there
 * are no JS timer storms. IntersectionObserver fires each element's reveal
 * when it enters the viewport; already-visible elements play immediately.
 */

const SEL     = 'main h1, main h2, main h3, main h4, main p'
const WORD_MS = 70    // ms stagger between words
const MAX_MS  = 1100  // cap so last words don't wait forever

function splitWords(el) {
  if (el.dataset.wa) return
  el.dataset.wa = '1'
  let idx = 0

  Array.from(el.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.textContent.trim()) return
      const parts = node.textContent.split(/(\s+)/)
      const frag  = document.createDocumentFragment()
      parts.forEach(part => {
        if (!part) return
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part))
          return
        }
        const s = document.createElement('span')
        s.textContent = part
        s.dataset.waI = idx
        s.style.cssText = 'display:inline;opacity:0;will-change:opacity,filter'
        s.style.setProperty('--wa-d', `${Math.min(idx * WORD_MS, MAX_MS)}ms`)
        idx++
        frag.appendChild(s)
      })
      el.replaceChild(frag, node)

    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.dataset.waI = idx
      node.style.opacity    = '0'
      node.style.willChange = 'opacity,filter'
      node.style.setProperty('--wa-d', `${Math.min(idx * WORD_MS, MAX_MS)}ms`)
      idx++
    }
  })
}

function playEl(el) {
  if (el.dataset.waPlayed) return
  el.dataset.waPlayed = '1'
  el.classList.add('wa-go')

  // Safety net: document.startViewTransition() (used by the theme toggle)
  // can pause or drop in-flight CSS animations on some browsers, which
  // left words stuck at opacity:0 permanently since the animation never
  // reached its 'to' state. Force the end state via inline style once the
  // animation should be done, independent of whether it actually finished.
  const words = el.querySelectorAll('[data-wa-i]')
  const settleAfter = Math.min(words.length * WORD_MS, MAX_MS) + 700
  setTimeout(() => {
    words.forEach(w => {
      w.style.animation = 'none'
      w.style.opacity   = '1'
      w.style.filter    = 'none'
    })
  }, settleAfter)
}

export default function TextReveal() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const els = Array.from(document.querySelectorAll(SEL)).filter(
      el => !el.style.opacity || el.style.opacity === '1'
    )

    // Hide words before the browser paints — eliminates the flash
    els.forEach(el => splitWords(el))

    // One shared observer; fires each element's animation when it enters view
    const obs = new IntersectionObserver(
      entries => entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          playEl(target)
          obs.unobserve(target)
        }
      }),
      { threshold: 0.12 }
    )

    els.forEach(el => {
      const r = el.getBoundingClientRect()
      // Already in the viewport (e.g. hero on first load) — play now
      if (r.top < window.innerHeight && r.bottom > 0) {
        playEl(el)
      } else {
        obs.observe(el)
      }
    })

    return () => {
      obs.disconnect()
      document.querySelectorAll('[data-wa]').forEach(el => {
        el.removeAttribute('data-wa')
        el.removeAttribute('data-wa-played')
        el.classList.remove('wa-go')
      })
      document.querySelectorAll('[data-wa-i]').forEach(el => {
        el.removeAttribute('data-wa-i')
      })
    }
  }, [pathname])

  return null
}
