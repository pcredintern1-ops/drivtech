import { motion } from 'framer-motion'
import { IconArrowRight } from '@tabler/icons-react'

/* ── Animation variants ── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.35 } } }
const up = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen xl:h-screen flex flex-col overflow-hidden bg-[#050b18]">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.webp"
          alt=""
          className="w-full h-full object-cover [object-position:64%_58%] sm:[object-position:65%_48%] md:[object-position:68%_40%] lg:[object-position:68%_40%]"
          draggable={false}
          fetchPriority="high"
        />
      </div>


      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col w-full mx-auto px-5 sm:px-8 lg:px-12 2xl:px-24 pt-24 sm:pt-28 md:pt-36 lg:pt-44 xl:pt-24 pb-8 sm:pb-10 xl:pb-0 justify-between xl:justify-center">

        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col">

          {/* Badge */}
          <motion.div variants={up} className="mb-4 flex justify-center xl:justify-start">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/70 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-gray-700 shadow-sm">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A3E635] animate-pulse shrink-0" />
              Enterprise Logistics Operations
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 variants={up}
            className="font-heading font-black text-[2.4rem] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.05] sm:leading-[1.0] tracking-tight mb-4 text-gray-900 text-center xl:text-left"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.45)' }}>
            <span className="block">Smarter <span className="gradient-text">Fleets.</span></span>
            <span className="block pb-[0.1em]">Faster <span className="gradient-text-lime">Delivery.</span></span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={up}
            className="text-black text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed max-w-lg text-center xl:text-left mx-auto xl:mx-0"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>
            DRIV powers enterprise fleet operations, linehaul logistics, driver sourcing,
            and scalable mobility solutions for modern businesses across India.
          </motion.p>

          {/* CTA buttons — desktop only inline */}
          <motion.div variants={up} className="hidden xl:flex flex-row flex-wrap gap-3 items-start mt-5">
            <a href="/partner-with-us"
              onClick={e => { e.preventDefault(); const el=document.getElementById('contact'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/partner-with-us') }}
              className="btn-shine btn-glow-hover group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#A3E635] hover:bg-[#bef264] text-black font-bold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105">
              Partner With Us
              <IconArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/services"
              onClick={e => { e.preventDefault(); const el=document.getElementById('services'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/services') }}
              className="btn-shine flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gray-900 border border-gray-700 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105">
              Explore Services
            </a>
            <a href="/investor-program"
              onClick={e => { e.preventDefault(); const el=document.getElementById('invest'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/investor-program') }}
              className="btn-shine btn-glow-orange flex items-center justify-center gap-2.5 px-7 py-3.5 border border-[#F97316]/35 bg-white/70 backdrop-blur-sm text-[#c2410c] font-semibold rounded-xl text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Become an Investor
            </a>
          </motion.div>

        </motion.div>

        {/* CTA buttons — mobile/tablet only, pinned to bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22,1,0.36,1] }}
          className="xl:hidden flex flex-col gap-3 w-full mt-auto">
          <a href="/partner-with-us"
            onClick={e => { e.preventDefault(); const el=document.getElementById('contact'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/partner-with-us') }}
            className="btn-shine btn-glow-hover group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#A3E635] hover:bg-[#bef264] text-black font-bold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105 w-full sm:w-[70%] sm:self-center">
            Partner With Us
            <IconArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex gap-3 w-full">
            <a href="/services"
              onClick={e => { e.preventDefault(); const el=document.getElementById('services'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/services') }}
              className="btn-shine flex items-center justify-center gap-2.5 px-5 py-2.5 bg-gray-900 border border-gray-700 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 flex-1">
              Explore Services
            </a>
            <a href="/investor-program"
              onClick={e => { e.preventDefault(); const el=document.getElementById('invest'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/investor-program') }}
              className="btn-shine btn-glow-orange flex items-center justify-center gap-2.5 px-5 py-2.5 border border-[#F97316]/35 bg-white/70 backdrop-blur-sm text-[#c2410c] font-semibold rounded-xl text-sm transition-all duration-300 hover:scale-105 flex-1 whitespace-nowrap">
              Become an Investor
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
