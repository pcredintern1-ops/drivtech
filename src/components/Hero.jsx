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

      {/* ── Overlays ── */}
      {/* Desktop */}
      <div className="absolute inset-0 hidden xl:block" style={{
        background: 'linear-gradient(108deg, rgba(240,245,250,0.97) 0%, rgba(235,242,248,0.92) 24%, rgba(215,230,245,0.68) 42%, rgba(10,16,32,0.18) 60%, rgba(4,8,18,0.04) 100%)'
      }} />
      {/* Mobile/tablet including large tablet */}
      <div className="absolute inset-0 xl:hidden" style={{
        background: 'linear-gradient(180deg, rgba(220,232,245,0.89) 0%, rgba(210,228,244,0.78) 22%, rgba(180,215,240,0.52) 42%, rgba(10,18,36,0.14) 65%, rgba(4,8,18,0.04) 100%)'
      }} />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 md:pt-36 lg:pt-44 xl:pt-24 pb-8 sm:pb-10 xl:pb-0 justify-between xl:justify-center">

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
            className="font-heading font-black text-[2.4rem] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.05] sm:leading-[1.0] tracking-tight mb-4 text-gray-900 text-center xl:text-left">
            <span className="block">Smarter <span className="gradient-text">Fleets.</span></span>
            <span className="block pb-[0.1em]">Faster <span className="gradient-text-lime">Delivery.</span></span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={up}
            className="text-black xl:text-gray-600 text-base sm:text-lg md:text-xl lg:text-lg leading-relaxed max-w-lg text-center xl:text-left mx-auto xl:mx-0">
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
              className="gradient-border-animate flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gray-900 hover:bg-black border border-gray-700 hover:border-[#A3E635]/50 text-white hover:text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md">
              Explore Services
            </a>
            <a href="/investor-program"
              onClick={e => { e.preventDefault(); const el=document.getElementById('invest'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/investor-program') }}
              className="btn-shine btn-glow-orange flex items-center justify-center gap-2.5 px-7 py-3.5 border border-[#F97316]/35 hover:border-[#F97316]/65 bg-white/70 backdrop-blur-sm hover:bg-[#F97316]/8 text-[#c2410c] font-semibold rounded-xl text-sm transition-all duration-300 whitespace-nowrap">
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
              className="gradient-border-animate flex items-center justify-center gap-2.5 px-5 py-2.5 bg-gray-900 hover:bg-black border border-gray-700 hover:border-[#A3E635]/50 text-white hover:text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md flex-1">
              Explore Services
            </a>
            <a href="/investor-program"
              onClick={e => { e.preventDefault(); const el=document.getElementById('invest'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/investor-program') }}
              className="btn-shine btn-glow-orange flex items-center justify-center gap-2.5 px-5 py-2.5 border border-[#F97316]/35 hover:border-[#F97316]/65 bg-white/70 backdrop-blur-sm hover:bg-[#F97316]/8 text-[#c2410c] font-semibold rounded-xl text-sm transition-all duration-300 flex-1 whitespace-nowrap">
              Become an Investor
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
