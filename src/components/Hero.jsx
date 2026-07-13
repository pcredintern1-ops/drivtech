import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconArrowRight } from '@tabler/icons-react'

/* Mobile hero video — public/hero-mobile.mp4 (< sm) */
const HERO_MOBILE_VIDEO = '/hero-mobile.mp4'
/* Tablet + desktop hero video — public/hero-desktop.mp4 (sm and up) */
const HERO_DESKTOP_VIDEO = '/hero-desktop.mp4'

/* ── TextReveal handles all text — only badge + CTA buttons use Framer ── */

export default function Hero() {
  const navigate = useNavigate()
  const mobileVideoRef = useRef(null)
  const desktopVideoRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const sync = () => {
      const mobile = mobileVideoRef.current
      const desktop = desktopVideoRef.current
      if (mq.matches) {
        mobile?.pause()
        desktop?.play().catch(() => {})
      } else {
        desktop?.pause()
        mobile?.play().catch(() => {})
      }
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <section id="home" className="relative min-h-screen xl:h-screen flex flex-col overflow-hidden bg-[#050b18]">

      {/* ── Background video — locked dark look at every breakpoint ── */}
      <div className="absolute inset-0">
        {/* Mobile video (< sm) */}
        <video
          ref={mobileVideoRef}
          className="sm:hidden absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: '75% center' }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src={HERO_MOBILE_VIDEO} type="video/mp4" />
        </video>
        {/* Tablet + Desktop video (sm and up) */}
        <video
          ref={desktopVideoRef}
          className="hidden sm:block absolute inset-0 w-full h-full object-cover pointer-events-none sm:[object-position:78%_40%] xl:[object-position:88%_40%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src={HERO_DESKTOP_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* ── Overlay — mobile/tablet (steep top-down fade) ── */}
      <div className="absolute inset-0 xl:hidden pointer-events-none" style={{
        background: 'linear-gradient(165deg, rgba(8,12,22,0.92) 0%, rgba(10,14,24,0.80) 18%, rgba(11,16,28,0.45) 38%, rgba(11,16,28,0.12) 58%, rgba(11,16,28,0) 78%)'
      }} />
      {/* ── Overlay — desktop (left-to-right fade) ── */}
      <div className="absolute inset-0 hidden xl:block pointer-events-none" style={{
        background: 'linear-gradient(90deg, rgba(8,12,22,0.92) 0%, rgba(10,14,24,0.82) 14%, rgba(11,16,28,0.55) 30%, rgba(11,16,28,0.20) 46%, rgba(11,16,28,0) 66%)'
      }} />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24 pt-28 sm:pt-36 md:pt-40 lg:pt-44 xl:pt-24 pb-8 sm:pb-10 xl:pb-0 justify-between xl:justify-center">

        <div className="flex flex-col">

          {/* H1 — TextReveal splits words. Always white/gradient-locked — hero background is video at every breakpoint. */}
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] leading-[1.08] mb-4 text-white text-center xl:text-left">
            <span className="block">Smarter <span className="gradient-text-lime-light">Fleets</span></span>
            <span className="block pb-[0.1em]">Faster <span className="gradient-text-lime-light">Delivery</span></span>
          </h1>

          {/* Description — TextReveal splits words */}
          <p className="hero-desc text-white/70 text-base sm:text-lg leading-relaxed max-w-lg text-center xl:text-left mx-auto xl:mx-0">
            Enterprise fleet operations, linehaul logistics, and driver management.
            Built for businesses that keep India's supply chain moving.
          </p>

          {/* CTA buttons — desktop only inline */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }} className="hidden xl:flex flex-row flex-wrap gap-3 items-start mt-5">
            <a href="/contact"
              onClick={e => { e.preventDefault(); navigate('/contact') }}
              className="btn-shine btn-glow-hover group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#A3E635] hover:bg-[#bef264] text-black font-bold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105">
              Partner With Us
              <IconArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/services"
              onClick={e => { e.preventDefault(); navigate('/services') }}
              className="btn-shine flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#060b14] border border-[#4b5563] text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105">
              Explore Services
            </a>
            <a href="/investor-program"
              onClick={e => { e.preventDefault(); navigate('/investor-program') }}
              className="btn-shine flex items-center justify-center gap-2.5 px-7 py-3.5 border border-[#A3E635]/60 bg-white/10 backdrop-blur-sm text-[#A3E635] font-semibold rounded-xl text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Become an Investor
            </a>
          </motion.div>

        </div>

        {/* CTA buttons — mobile/tablet only, pinned to bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          className="xl:hidden flex flex-col gap-3 w-full mt-auto">
          <a href="/contact"
            onClick={e => { e.preventDefault(); navigate('/contact') }}
            className="btn-shine btn-glow-hover group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#A3E635] hover:bg-[#bef264] text-black font-bold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105 w-full sm:w-[70%] sm:self-center">
            Partner With Us
            <IconArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex gap-3 w-full">
            <a href="/services"
              onClick={e => { e.preventDefault(); navigate('/services') }}
              className="btn-shine flex items-center justify-center gap-2.5 px-5 py-2.5 bg-[#060b14] border border-[#4b5563] text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 flex-1">
              Explore Services
            </a>
            <a href="/investor-program"
              onClick={e => { e.preventDefault(); navigate('/investor-program') }}
              className="btn-shine flex items-center justify-center gap-2.5 px-5 py-2.5 border border-[#A3E635]/60 bg-white/10 backdrop-blur-sm text-[#A3E635] font-semibold rounded-xl text-sm transition-all duration-300 hover:scale-105 flex-1 whitespace-nowrap">
              Become an Investor
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
