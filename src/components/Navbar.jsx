import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IconMenu2, IconX, IconSun, IconMoon } from '@tabler/icons-react'
import { navLinks } from '../data/content'
import { useTheme } from '../theme.jsx'

const navItems = navLinks

/* Theme toggle — fires circular reveal from its own center */
function ThemeToggle({ scrolled, className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const handleClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
  }
  return (
    <button
      onClick={handleClick}
      aria-label="Toggle theme"
      className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${
        scrolled
          ? 'text-gray-300 hover:text-[#A3E635] hover:bg-white/10'
          : 'text-gray-600 hover:text-[#65a30d] hover:bg-[#A3E635]/10'
      } ${className}`}
    >
      {theme === 'dark'
        ? <IconSun size={19} />
        : <IconMoon size={19} />}
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  // Active link from current route ('/' counts as '/home')
  const active = location.pathname === '/' ? '/home' : location.pathname
  const { theme } = useTheme()
  // Use the white logo whenever the bar is dark (scrolled) or dark theme is active
  const useWhiteLogo = scrolled || theme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    navigate(href)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 lg:px-12 2xl:px-24 pt-2 sm:pt-3 md:pt-4 lg:pt-4"
      >
        <div
          className={`relative overflow-hidden w-full flex items-center justify-between px-4 sm:px-6 py-[14px] sm:py-[1.125rem] md:py-[1.375rem] lg:px-5 lg:py-2.5 rounded-2xl border transition-all duration-500 ${
            scrolled
              ? 'border-white/10 bg-black/85 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
              : 'border-gray-100 bg-white/90'
          }`}
          style={{ backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)' }}
        >
          {/* Green neon glow line at bottom */}
          <div className="absolute -bottom-px inset-x-0 h-[3px] rounded-b-2xl pointer-events-none" style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(163,230,53,0.6) 20%, #A3E635 50%, rgba(163,230,53,0.6) 80%, transparent 100%)',
            boxShadow: scrolled
              ? '0 0 12px rgba(163,230,53,0.7), 0 0 24px rgba(163,230,53,0.35)'
              : '0 0 8px rgba(163,230,53,0.45), 0 0 16px rgba(163,230,53,0.20)',
          }} />

          {/* Logo */}
          <button onClick={() => handleNav('/home')} className="flex items-center shrink-0 cursor-pointer" aria-label="Home">
            <img
              src={useWhiteLogo ? '/logo-white.webp' : '/logo.webp'}
              alt="DRIV"
              className="h-11 sm:h-12 md:h-[4.25rem] lg:h-[3.75rem] w-auto object-contain transition-all duration-500 hover:scale-105"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center justify-end gap-0.5 ml-auto">
            {navItems.map((link) => (
              <button key={link.href} onClick={() => handleNav(link.href)}
                className={`nav-link relative px-3.5 py-2.5 text-[0.92rem] font-medium tracking-wide transition-all duration-200 rounded-lg whitespace-nowrap ${
                  active === link.href
                    ? scrolled ? 'text-[#A3E635] bg-[#A3E635]/10' : 'text-[#65a30d] bg-[#A3E635]/8'
                    : scrolled ? 'text-gray-300 hover:text-[#A3E635] hover:bg-[#A3E635]/10' : 'text-gray-500 hover:text-[#4d7c0f] hover:bg-[#A3E635]/8'
                }`}>
                {active === link.href && (
                  <motion.span layoutId="nav-pill"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#A3E635]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
            <ThemeToggle scrolled={scrolled} className="ml-1.5" />
          </div>

          {/* Mobile: theme toggle + menu toggle */}
          <div className="lg:hidden flex items-center gap-1 ml-auto">
            <ThemeToggle scrolled={scrolled} />
            <button onClick={() => setOpen(!open)}
              className={`p-3.5 sm:p-4 transition-colors rounded-lg ${
                scrolled ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}>
              {open ? <IconX size={22} /> : <IconMenu2 size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 sm:inset-x-6 top-[5.5rem] sm:top-[6.25rem] md:top-[7.25rem] z-40 lg:hidden rounded-2xl overflow-hidden"
            style={{
              background: scrolled ? 'rgba(8,12,28,0.92)' : 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
            }}>
            {/* Top accent line */}
            <div className="h-[2px] w-full" style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(163,230,53,0.7) 30%, #A3E635 50%, rgba(163,230,53,0.7) 70%, transparent 100%)'
            }}/>
            <div className="px-3 py-3 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}>
                  <button onClick={() => handleNav(link.href)}
                    className={`w-full text-left flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active === link.href
                        ? 'bg-[#A3E635]/15 text-[#A3E635]'
                        : scrolled
                          ? 'text-gray-300 hover:text-white hover:bg-white/8'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}>
                    {active === link.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] mr-2.5 shrink-0"/>
                    )}
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
