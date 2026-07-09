import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const DURATION = 2800

function isDark() {
  return document.documentElement.classList.contains('dark') ||
    localStorage.getItem('driv-theme') === 'dark'
}

export default function LoadingScreen() {
  const { pathname } = useLocation()
  const [phase, setPhase] = useState('done')
  const [dark, setDark] = useState(isDark)
  const timers = useRef([])

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/home') return

    // Clear any in-flight timers from a previous visit
    timers.current.forEach(clearTimeout)

    setDark(isDark())
    setPhase('visible')

    timers.current = [
      setTimeout(() => setPhase('fading'), DURATION),
      setTimeout(() => setPhase('done'), DURATION + 500),
    ]

    return () => timers.current.forEach(clearTimeout)
  }, [pathname])

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: dark ? '#050b18' : '#ffffff',
        willChange: 'opacity',
        opacity: phase === 'fading' ? 0 : 1,
        transition: phase === 'fading' ? 'opacity 0.5s ease-out' : 'none',
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      <img
        src="/driv-loader.gif"
        alt=""
        aria-hidden
        className="w-[85vw] h-[85vw] sm:w-[520px] sm:h-[520px] md:w-[640px] md:h-[640px] object-contain"
        draggable={false}
        style={{ transform: 'translateZ(0)' }}
      />
    </div>
  )
}
