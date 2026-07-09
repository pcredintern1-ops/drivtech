import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconArrowRight } from '@tabler/icons-react'

/* Desktop hero video — public/hero-desktop.mp4 */
const HERO_DESKTOP_VIDEO = '/hero-desktop.mp4'

/* ── TextReveal handles all text — only badge + CTA buttons use Framer ── */

export default function Hero() {
  const navigate = useNavigate()
  const desktopVideoRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const playIfDesktop = () => {
      const video = desktopVideoRef.current
      if (!video) return
      if (mq.matches) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }
    playIfDesktop()
    mq.addEventListener('change', playIfDesktop)
    return () => mq.removeEventListener('change', playIfDesktop)
  }, [])

  return (
    <section id="home" className="relative min-h-screen xl:h-screen flex flex-col overflow-hidden bg-[#050b18]">

      {/* ── Background image (light + dark) ── */}
      <div className="absolute inset-0">
        {/* Mobile images (< sm) */}
        <img
          src="/hero-light-mobile.webp"
          alt=""
          className="hero-img-light sm:hidden absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '75% center' }}
          draggable={false}
          fetchPriority="high"
        />
        <img
          src="/hero-dark-mobile.webp"
          alt=""
          className="hero-img-dark sm:hidden absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '75% center' }}
          draggable={false}
        />
        {/* Tablet images (sm–lg) — follows site theme like mobile */}
        <img
          src="/hero-light.webp"
          alt=""
          className="hero-img-light hidden sm:block xl:hidden absolute inset-0 w-full h-full object-cover sm:[object-position:85%_48%] md:[object-position:88%_40%] lg:[object-position:88%_40%]"
          draggable={false}
          fetchPriority="high"
        />
        <img
          src="/hero-dark.webp"
          alt=""
          className="hero-img-dark hidden sm:block xl:hidden absolute inset-0 w-full h-full object-cover sm:[object-position:85%_48%] md:[object-position:88%_40%] lg:[object-position:88%_40%]"
          draggable={false}
        />
        {/* Desktop video (xl+) */}
        <video
          ref={desktopVideoRef}
          className="hidden xl:block absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: '88% 40%' }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-dark.webp"
          aria-hidden
        >
          <source src={HERO_DESKTOP_VIDEO} type="video/mp4" />
        </video>
      </div>


      {/* ── Overlays — light theme (mobile + tablet, follows site theme) ── */}
      <div className="hero-overlay-light absolute inset-0 xl:hidden" style={{
        background: 'linear-gradient(165deg, rgba(220,232,245,0.89) 0%, rgba(210,228,244,0.74) 18%, rgba(180,215,240,0.36) 36%, rgba(180,215,240,0.08) 54%, rgba(255,255,255,0) 74%)'
      }} />

      {/* ── Overlays — dark theme (mobile + tablet, follows site theme) ── */}
      <div className="hero-overlay-dark absolute inset-0 xl:hidden" style={{
        background: 'linear-gradient(165deg, rgba(8,12,22,0.92) 0%, rgba(10,14,24,0.80) 18%, rgba(11,16,28,0.45) 38%, rgba(11,16,28,0.12) 58%, rgba(11,16,28,0) 78%)'
      }} />
      {/* Desktop (xl+) — always dark */}
      <div className="absolute inset-0 hidden xl:block pointer-events-none" style={{
        background: 'linear-gradient(90deg, rgba(8,12,22,0.92) 0%, rgba(10,14,24,0.82) 14%, rgba(11,16,28,0.55) 30%, rgba(11,16,28,0.20) 46%, rgba(11,16,28,0) 66%)'
      }} />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24 pt-28 sm:pt-36 md:pt-40 lg:pt-44 xl:pt-24 pb-8 sm:pb-10 xl:pb-0 justify-between xl:justify-center">

        <div className="flex flex-col">

          {/* H1 — TextReveal splits words */}
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] leading-[1.08] mb-4 text-gray-900 xl:text-white text-center xl:text-left">
            <span className="block">Smarter <span className="gradient-text xl:hidden">Fleets</span><span className="gradient-text-lime-light hidden xl:inline">Fleets</span></span>
            <span className="block pb-[0.1em]">Faster <span className="gradient-text-lime xl:hidden">Delivery</span><span className="gradient-text-lime-light hidden xl:inline">Delivery</span></span>
          </h1>

          {/* Description — TextReveal splits words */}
          <p className="hero-desc text-black hero-desc-shadow xl:text-white/70 xl:[text-shadow:none] text-base sm:text-lg leading-relaxed max-w-lg text-center xl:text-left mx-auto xl:mx-0">
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
              className="btn-shine flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gray-900 border border-gray-500 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105">
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
              className="btn-shine flex items-center justify-center gap-2.5 px-5 py-2.5 bg-gray-900 border border-gray-500 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 flex-1">
              Explore Services
            </a>
            <a href="/investor-program"
              onClick={e => { e.preventDefault(); navigate('/investor-program') }}
              className="btn-shine flex items-center justify-center gap-2.5 px-5 py-2.5 border border-[#A3E635]/60 bg-white/70 backdrop-blur-sm text-[#65a30d] dark:bg-white/10 dark:text-[#A3E635] font-semibold rounded-xl text-sm transition-all duration-300 hover:scale-105 flex-1 whitespace-nowrap">
              Become an Investor
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
