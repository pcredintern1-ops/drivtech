import { createContext, useContext, useState, useCallback } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )

  // Keep <html> class + storage in sync
  const applyTheme = useCallback((next) => {
    const root = document.documentElement
    if (next === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('driv-theme', next) } catch { /* ignore */ }
    setTheme(next)
  }, [])

  /**
   * Toggle with a circular reveal originating from (x, y) — the toggle button.
   * Uses the View Transitions API when available; falls back to instant swap.
   */
  const toggleTheme = useCallback((origin) => {
    const root = document.documentElement
    // Ignore clicks while a transition is mid-flight (overlapping
    // View Transitions are the main source of the glitch).
    if (root.classList.contains('vt-active')) return

    // Read the live DOM state instead of a possibly-stale closure value.
    const next = root.classList.contains('dark') ? 'light' : 'dark'

    const x = origin?.x ?? window.innerWidth - 40
    const y = origin?.y ?? 40
    // radius large enough to cover the farthest corner
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduce) {
      applyTheme(next)
      return
    }

    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${r}px`)
    root.classList.add('vt-active')

    const transition = document.startViewTransition(() => {
      applyTheme(next)
    })

    transition.finished.finally(() => {
      root.classList.remove('vt-active')
    })
  }, [applyTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
