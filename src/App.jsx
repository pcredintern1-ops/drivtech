import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconBrandWhatsapp, IconArrowUp } from '@tabler/icons-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Seo from './components/Seo'
import TextReveal from './components/TextReveal'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Hub from './pages/Hub'
import Investor from './pages/Investor'
import Contact from './pages/Contact'

/* Scroll to top whenever the route changes */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ConditionalFooter() {
  return <Footer />
}

/* Back-to-top button — hidden in the hero, appears once scrolled down a bit.
   A ring traces around it as you scroll, completing a full circle by the
   time you reach the bottom of the page. */
function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const update = () => {
      setVisible(window.scrollY > 10)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      ticking = false
    }
    /* rAF-throttled: scroll fires far more often than the screen can
       repaint, so updating React state on every event (while a CSS
       transition is also fighting to catch up) is what caused the
       glitchy stutter. One state update per frame, paced by rAF,
       removes that fight entirely. */
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* r + half the stroke width = 20 (the viewBox's true edge), so the
     line sits flush on the button's boundary — no ring of background
     visible between the line and the button's actual edge. */
  const r = 19
  const circumference = 2 * Math.PI * r

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-20 right-5 sm:bottom-[92px] sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-[#1f2937] shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:scale-110 hover:shadow-[0_6px_22px_rgba(0,0,0,0.25)] transition-transform duration-300"
        >
          {/* Scroll-progress ring — the green line itself is the only border, no track underneath */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20" cy="20" r={r} fill="none" strokeWidth="2" strokeLinecap="round"
              stroke="#65a30d"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
            />
          </svg>

          <IconArrowUp size={22} className="relative text-[#65a30d] sm:hidden" />
          <IconArrowUp size={26} className="relative text-[#65a30d] hidden sm:block" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Seo />
      <TextReveal />
      <Navbar />
      <main className="min-h-screen w-full overflow-x-clip">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/invest" element={<Investor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <ConditionalFooter />

      {/* Back-to-top button — stacked directly above the WhatsApp button */}
      <BackToTop />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/917738046786"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:bg-[#20bf5a] hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-all duration-300"
      >
        <IconBrandWhatsapp size={26} className="text-white sm:hidden" />
        <IconBrandWhatsapp size={30} className="text-white hidden sm:block" />
      </a>
    </BrowserRouter>
  )
}
