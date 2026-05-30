import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { IconArrowRight, IconTruck, IconRoute, IconBuilding, IconMapPin } from '@tabler/icons-react'

/* ── Count-up ── */
function PanelCounter({ target, suffix, inView }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 2000
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setN(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
      else setN(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <>{n.toLocaleString()}{suffix}</>
}

/* ── Animation variants ── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.35 } } }
const up = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }

/* ── Map nodes ── */
const nodes = [
  { x: 118, y: 148, label: 'Mumbai HQ',    active: true,  hub: true  },
  { x: 210, y: 105, label: 'Pune',         active: false, hub: false },
  { x: 318, y: 68,  label: 'Surat',        active: false, hub: false },
  { x: 160, y: 188, label: 'Bhiwandi HUB', active: true,  hub: false },
  { x: 205, y: 152, label: 'Thane',        active: false, hub: false },
]

export default function Hero() {
  const statsRef = useRef(null)
  const panelRef = useRef(null)
  const svgRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  useEffect(() => {
    const update = () => {
      if (svgRef.current) {
        svgRef.current.setAttribute(
          'preserveAspectRatio',
          window.innerWidth >= 1280 ? 'xMinYMid meet' : 'xMidYMid meet'
        )
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section id="home" className="relative min-h-screen xl:h-screen flex flex-col overflow-hidden bg-[#050b18]">

      {/* ── Background image — full cover, no gaps ── */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.webp"
          alt=""
          className="w-full h-full object-cover [object-position:62%_58%] sm:[object-position:65%_48%] md:[object-position:68%_40%] lg:[object-position:50%_40%]"
          draggable={false}
          fetchPriority="high"
        />
      </div>

      {/* ── Overlays (full section width) ── */}
      {/* Desktop: left-to-right gradient so dark text is readable */}
      <div className="absolute inset-0 hidden lg:block" style={{
        background: 'linear-gradient(108deg, rgba(240,245,250,0.97) 0%, rgba(235,242,248,0.92) 24%, rgba(215,230,245,0.68) 42%, rgba(10,16,32,0.18) 60%, rgba(4,8,18,0.04) 100%)'
      }} />
      {/* Mobile/tablet: light veil at top for text, image breathes through below */}
      <div className="absolute inset-0 lg:hidden" style={{
        background: 'linear-gradient(180deg, rgba(220,232,245,0.89) 0%, rgba(210,228,244,0.78) 22%, rgba(180,215,240,0.52) 42%, rgba(10,18,36,0.14) 65%, rgba(4,8,18,0.04) 100%)'
      }} />
      {/* Bottom darkening behind stats bar */}
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, rgba(4,8,18,0.75) 60%, rgba(3,6,14,0.92) 100%)'
      }} />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 md:pt-36 lg:pt-56 xl:pt-24 lg:pb-8 xl:pb-0">

        <div className="grid xl:grid-cols-[52%_48%] gap-5 xl:gap-8 items-start xl:items-center flex-1 lg:flex-none xl:flex-1 min-h-0">

          {/* ══ Left: text ══ */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col">

            {/* Badge */}
            <motion.div variants={up} className="mb-4 lg:mb-6 xl:mb-4 flex justify-center xl:justify-start">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/70 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-gray-700 shadow-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A3E635] animate-pulse shrink-0" />
                Enterprise Logistics Operations
                <span className="hidden sm:block w-px h-3 bg-gray-300" />
                <span className="hidden sm:block font-bold text-[#65a30d]">Mumbai, India</span>
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1 variants={up}
              className="font-heading font-black text-[2.4rem] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.05] sm:leading-[1.0] tracking-tight mb-4 lg:mb-7 xl:mb-4 text-gray-900 text-center xl:text-left">
              <span className="block">Smarter <span className="gradient-text">Fleets.</span></span>
              <span className="block pb-[0.1em]">Faster <span className="gradient-text-lime">Delivery.</span></span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={up}
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-5 lg:mb-8 xl:mb-5 text-center xl:text-left mx-auto xl:mx-0">
              DRIV powers enterprise fleet operations, linehaul logistics, driver sourcing,
              and scalable mobility solutions for modern businesses across India.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={up} className="flex flex-col gap-3 w-full sm:flex-row sm:flex-wrap sm:w-auto lg:flex-col lg:w-full xl:flex-row xl:flex-wrap xl:w-auto items-center xl:items-start self-center xl:self-start">
              {/* Primary CTA — full width on mobile, auto on sm+ */}
              <a href="/partner-with-us"
                onClick={e => { e.preventDefault(); const el=document.getElementById('contact'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/partner-with-us') }}
                className="btn-shine btn-glow-hover group flex items-center justify-center gap-2.5 px-10 py-3.5 sm:px-7 bg-[#A3E635] hover:bg-[#bef264] text-black font-bold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105 w-auto">
                Partner With Us
                <IconArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              {/* Secondary CTAs — side by side on mobile, inline on sm+ */}
              <div className="flex gap-3 w-full sm:contents">
                <a href="/services"
                  onClick={e => { e.preventDefault(); const el=document.getElementById('services'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/services') }}
                  className="gradient-border-animate flex items-center justify-center gap-2.5 px-5 py-2.5 sm:px-7 sm:py-3.5 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-[#A3E635]/50 text-gray-700 hover:text-gray-900 font-semibold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md flex-1 sm:flex-none">
                  Explore Services
                </a>
                <a href="/investor-program"
                  onClick={e => { e.preventDefault(); const el=document.getElementById('invest'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/investor-program') }}
                  className="btn-shine btn-glow-orange flex items-center justify-center gap-2.5 px-5 py-2.5 sm:px-7 sm:py-3.5 border border-[#F97316]/35 hover:border-[#F97316]/65 bg-white/70 backdrop-blur-sm hover:bg-[#F97316]/8 text-[#c2410c] font-semibold rounded-xl text-sm transition-all duration-300 flex-1 sm:flex-none whitespace-nowrap">
                  Become an Investor
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* ══ Right: Fleet Command Radar Panel ══ */}
          <div className="relative mt-3 lg:mt-4 xl:-mt-8 xl:-translate-x-5" ref={panelRef}>

            {/* 2023 badge */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-14 -right-1 xl:right-0 hidden xl:block z-20">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white/95 backdrop-blur-sm border border-[#A3E635]/25 rounded-2xl px-4 py-3 text-center"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
                <div className="font-heading font-bold text-[#65a30d] text-xl">2023</div>
                <div className="text-gray-400 text-xs mt-0.5">Founded</div>
              </motion.div>
            </motion.div>

            {/* Main panel */}
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[22px] overflow-hidden flex flex-col"
              style={{
                background: 'rgba(3,8,22,0.70)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)',
              }}>

              {/* ── Keyframes ── */}
              <style>{`
                @keyframes hub-glow-breathe {
                  0%,100% { opacity: 0.18; }
                  50%      { opacity: 0.34; }
                }
                .routes-widget-pos { top: 44%; right: 0.75rem; width: 200px; }
                @media (min-width: 1280px) { .routes-widget-pos { right: -5rem; width: 238px; } }
              `}</style>

              {/* Top accent bar */}
              <div className="h-[1.5px] w-full shrink-0" style={{
                background:'linear-gradient(90deg,transparent 0%,rgba(163,230,53,0.45) 25%,#A3E635 50%,rgba(163,230,53,0.45) 75%,transparent 100%)',
              }}/>

              {/* Dot mesh overlay */}
              <div className="absolute inset-0 pointer-events-none z-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(163,230,53,0.13) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
                maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%)',
              }}/>

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] shrink-0">
                <div className="flex items-center gap-2">
                  <div className="relative w-2 h-2 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#A3E635]"/>
                    <div className="absolute inset-0 rounded-full bg-[#A3E635] animate-ping opacity-40"/>
                  </div>
                  <span className="text-white/80 text-[12px] font-semibold tracking-[0.14em] uppercase">Operations Network</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-[0.10em]"
                    style={{color:'#A3E635',background:'rgba(163,230,53,0.08)',border:'1px solid rgba(163,230,53,0.20)'}}>
                    ● LIVE
                  </span>
                  <span className="text-gray-500 text-[10px] font-medium">West India</span>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="flex flex-1" style={{minHeight:'230px'}}>

                {/* ─── Map ─── */}
                <div className="flex-1 relative overflow-hidden">

                  {/* Ambient glow at Mumbai position */}
                  <div className="absolute pointer-events-none" style={{
                    left:'34%', top:'76%',
                    width:'130px', height:'130px',
                    transform:'translate(-50%,-50%)',
                    background:'radial-gradient(circle,rgba(163,230,53,0.18) 0%,transparent 68%)',
                    filter:'blur(18px)',
                    animation:'hub-glow-breathe 4s ease-in-out infinite',
                  }}/>

                  {/*
                    Geographic positions (viewBox 0 0 280 220):
                    Lon 72.1–74.4 → x: (lon-72.1)/2.3*280
                    Lat 17.9–23.4 → y: (23.4-lat)/5.5*220

                    Mumbai    19.08°N 72.88°E → (95, 173)
                    Bhiwandi  19.30°N 73.06°E → (117, 164)
                    Pune      18.52°N 73.86°E → (214, 195)
                    Nashik    19.99°N 73.79°E → (206, 136)
                    Surat     21.17°N 72.83°E → (89, 89)
                    Ahmedabad 23.02°N 72.57°E → (57, 15)
                  */}
                  <svg ref={svgRef} viewBox="5 60 248 162" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <filter id="ng3" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                      <filter id="hg3" x="-180%" y="-180%" width="460%" height="460%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                      <filter id="rg3" x="-30%" y="-60%" width="160%" height="220%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>

                    {/* Konkan coastline hint — very faint */}
                    <path d="M 85,220 Q 90,196 95,173 Q 91,132 89,89 Q 80,52 57,15"
                      fill="none" stroke="rgba(163,230,53,0.07)" strokeWidth="1.5" strokeLinecap="round"/>

                    {/* ── Routes: outer glow ── */}
                    <path d="M 95,173 Q 105,168 117,164" fill="none" stroke="#A3E635" strokeWidth="3"   opacity="0.04"/>
                    <path d="M 95,173 Q 155,190 214,195" fill="none" stroke="#A3E635" strokeWidth="2.5" opacity="0.04"/>
                    <path d="M 95,173 Q 150,152 206,136" fill="none" stroke="#A3E635" strokeWidth="2.5" opacity="0.04"/>
                    <path d="M 95,173 Q 90,128 89,89"    fill="none" stroke="#A3E635" strokeWidth="2"   opacity="0.03"/>
                    <path d="M 95,173 Q 78,94 57,15"     fill="none" stroke="#A3E635" strokeWidth="1.5" opacity="0.02"/>

                    {/* ── Routes: mid glow ── */}
                    <path d="M 95,173 Q 105,168 117,164" fill="none" stroke="#A3E635" strokeWidth="1"   opacity="0.22" filter="url(#rg3)"/>
                    <path d="M 95,173 Q 155,190 214,195" fill="none" stroke="#A3E635" strokeWidth="0.9" opacity="0.16" filter="url(#rg3)"/>
                    <path d="M 95,173 Q 150,152 206,136" fill="none" stroke="#A3E635" strokeWidth="0.9" opacity="0.14" filter="url(#rg3)"/>
                    <path d="M 95,173 Q 90,128 89,89"    fill="none" stroke="#A3E635" strokeWidth="0.8" opacity="0.10" filter="url(#rg3)"/>
                    <path d="M 95,173 Q 78,94 57,15"     fill="none" stroke="#A3E635" strokeWidth="0.6" opacity="0.06" filter="url(#rg3)"/>

                    {/* ── Routes: animated dashes ── */}
                    <path d="M 95,173 Q 105,168 117,164" fill="none" stroke="rgba(163,230,53,0.75)" strokeWidth="0.7" className="route-line"/>
                    <path d="M 95,173 Q 155,190 214,195" fill="none" stroke="rgba(163,230,53,0.58)" strokeWidth="0.6" className="route-line" style={{animationDuration:'5s'}}/>
                    <path d="M 95,173 Q 150,152 206,136" fill="none" stroke="rgba(163,230,53,0.55)" strokeWidth="0.6" className="route-line" style={{animationDuration:'4.8s'}}/>
                    <path d="M 95,173 Q 90,128 89,89"    fill="none" stroke="rgba(163,230,53,0.38)" strokeWidth="0.5" className="route-line" style={{animationDuration:'6.5s'}}/>
                    <path d="M 95,173 Q 78,94 57,15"     fill="none" stroke="rgba(163,230,53,0.18)" strokeWidth="0.4" className="route-line" style={{animationDuration:'10s'}}/>

                    {/* ── Future routes (not yet started — no animation) ── */}
                    {/*
                      Sinnar  20.07°N 74.10°E → (243,133)  — northeast of Nashik
                      Nifad   20.07°N 74.10°E → (243,133)  — same corridor
                      Saswad  18.34°N 74.03°E → (235,202)  — east of Pune
                    */}
                    <path d="M 206,136 Q 222,135 243,133" fill="none" stroke="rgba(163,230,53,0.14)" strokeWidth="0.5" strokeDasharray="3 7"/>
                    <path d="M 214,195 Q 225,198 235,202" fill="none" stroke="rgba(163,230,53,0.12)" strokeWidth="0.5" strokeDasharray="3 7"/>

                    {/* ── Moving shipment particles ── */}
                    <circle r="2.8" fill="#A3E635" filter="url(#ng3)" opacity="0.9">
                      <animateMotion dur="2.4s" repeatCount="indefinite" path="M 95,173 Q 105,168 117,164"/>
                    </circle>
                    <circle r="2.8" fill="#A3E635" filter="url(#ng3)" opacity="0.75">
                      <animateMotion dur="5s" repeatCount="indefinite" begin="0.8s" path="M 95,173 Q 155,190 214,195"/>
                    </circle>
                    <circle r="2.5" fill="#A3E635" filter="url(#ng3)" opacity="0.70">
                      <animateMotion dur="4.8s" repeatCount="indefinite" begin="1.5s" path="M 95,173 Q 150,152 206,136"/>
                    </circle>
                    <circle r="2.2" fill="#A3E635" filter="url(#ng3)" opacity="0.55">
                      <animateMotion dur="6.5s" repeatCount="indefinite" begin="2.2s" path="M 95,173 Q 90,128 89,89"/>
                    </circle>

                    {/* ── Secondary city markers (faint, no animation) ── */}
                    {/*
                      Vasai-Virar  19.47°N 72.81°E → (86, 157)
                      Alibaug      18.64°N 72.87°E → (94, 190)
                      Thane        19.21°N 73.12°E → (124, 168)
                      Vapi         20.37°N 72.91°E → (99, 121)
                      Daman        20.39°N 72.83°E → (89, 120)
                      Igatpuri     19.70°N 73.57°E → (179, 148)
                      Karjat       18.91°N 73.32°E → (149, 180)
                      Wada         19.65°N 73.18°E → (131, 150)
                    */}

                    {/* Vasai-Virar */}
                    <circle cx="86" cy="157" r="1.8" fill="rgba(163,230,53,0.28)" stroke="rgba(163,230,53,0.18)" strokeWidth="0.5"/>
                    <text x="81" y="154" fill="rgba(255,255,255,0.42)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500" textAnchor="end">Vasai-Virar</text>

                    {/* Alibaug */}
                    <circle cx="94" cy="190" r="1.8" fill="rgba(163,230,53,0.25)" stroke="rgba(163,230,53,0.16)" strokeWidth="0.5"/>
                    <text x="89" y="187" fill="rgba(255,255,255,0.38)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500" textAnchor="end">Alibaug</text>

                    {/* Thane */}
                    <circle cx="124" cy="168" r="2" fill="rgba(163,230,53,0.30)" stroke="rgba(163,230,53,0.20)" strokeWidth="0.5"/>
                    <text x="129" y="165" fill="rgba(255,255,255,0.45)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500">Thane</text>

                    {/* Daman */}
                    <circle cx="89" cy="120" r="1.6" fill="rgba(163,230,53,0.22)" stroke="rgba(163,230,53,0.14)" strokeWidth="0.5"/>
                    <text x="84" y="117" fill="rgba(255,255,255,0.36)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500" textAnchor="end">Daman</text>

                    {/* Vapi */}
                    <circle cx="99" cy="112" r="1.6" fill="rgba(163,230,53,0.22)" stroke="rgba(163,230,53,0.14)" strokeWidth="0.5"/>
                    <text x="104" y="109" fill="rgba(255,255,255,0.36)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500">Vapi</text>

                    {/* Igatpuri */}
                    <circle cx="179" cy="148" r="1.6" fill="rgba(163,230,53,0.22)" stroke="rgba(163,230,53,0.14)" strokeWidth="0.5"/>
                    <text x="184" y="145" fill="rgba(255,255,255,0.36)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500">Igatpuri</text>

                    {/* Karjat */}
                    <circle cx="149" cy="180" r="1.6" fill="rgba(163,230,53,0.22)" stroke="rgba(163,230,53,0.14)" strokeWidth="0.5"/>
                    <text x="154" y="177" fill="rgba(255,255,255,0.36)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500">Karjat</text>

                    {/* Wada */}
                    <circle cx="131" cy="150" r="1.5" fill="rgba(163,230,53,0.18)" stroke="rgba(163,230,53,0.12)" strokeWidth="0.5"/>
                    <text x="136" y="147" fill="rgba(255,255,255,0.33)" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500">Wada</text>

                    {/* ── Node: Bhiwandi ── */}
                    <circle cx="117" cy="164" r="7" fill="none" stroke="rgba(163,230,53,0.22)" strokeWidth="0.8">
                      <animate attributeName="r" values="7;14;7" dur="3.2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="3.2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="117" cy="164" r="4.5" fill="rgba(163,230,53,0.14)" stroke="rgba(163,230,53,0.42)" strokeWidth="1"/>
                    <circle cx="117" cy="164" r="2.2" fill="#A3E635" filter="url(#ng3)"/>
                    <text x="124" y="160" fill="rgba(255,255,255,0.80)" fontSize="10.5" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.2">Bhiwandi</text>

                    {/* ── Node: Pune ── */}
                    <circle cx="214" cy="195" r="7" fill="none" stroke="rgba(163,230,53,0.18)" strokeWidth="0.8">
                      <animate attributeName="r" values="7;13;7" dur="3.8s" repeatCount="indefinite" begin="1s"/>
                      <animate attributeName="opacity" values="0.45;0;0.45" dur="3.8s" repeatCount="indefinite" begin="1s"/>
                    </circle>
                    <circle cx="214" cy="195" r="4.5" fill="rgba(163,230,53,0.12)" stroke="rgba(163,230,53,0.36)" strokeWidth="1"/>
                    <circle cx="214" cy="195" r="2.2" fill="#A3E635" filter="url(#ng3)" opacity="0.9"/>
                    <text x="221" y="191" fill="rgba(255,255,255,0.80)" fontSize="10.5" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.2">Pune</text>

                    {/* ── Node: Nashik ── */}
                    <circle cx="206" cy="136" r="7" fill="none" stroke="rgba(163,230,53,0.18)" strokeWidth="0.8">
                      <animate attributeName="r" values="7;13;7" dur="4.0s" repeatCount="indefinite" begin="0.6s"/>
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="4.0s" repeatCount="indefinite" begin="0.6s"/>
                    </circle>
                    <circle cx="206" cy="136" r="4.5" fill="rgba(163,230,53,0.12)" stroke="rgba(163,230,53,0.34)" strokeWidth="1"/>
                    <circle cx="206" cy="136" r="2.2" fill="#A3E635" filter="url(#ng3)" opacity="0.85"/>
                    <text x="213" y="132" fill="rgba(255,255,255,0.80)" fontSize="10.5" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.2">Nashik</text>

                    {/* ── Node: Surat ── */}
                    <circle cx="89" cy="89" r="6" fill="none" stroke="rgba(163,230,53,0.14)" strokeWidth="0.8">
                      <animate attributeName="r" values="6;12;6" dur="4.4s" repeatCount="indefinite" begin="1.8s"/>
                      <animate attributeName="opacity" values="0.38;0;0.38" dur="4.4s" repeatCount="indefinite" begin="1.8s"/>
                    </circle>
                    <circle cx="89" cy="89" r="4" fill="rgba(163,230,53,0.11)" stroke="rgba(163,230,53,0.28)" strokeWidth="0.9"/>
                    <circle cx="89" cy="89" r="2" fill="#A3E635" filter="url(#ng3)" opacity="0.78"/>
                    <text x="96" y="85" fill="rgba(255,255,255,0.75)" fontSize="10.5" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.2">Surat</text>

                    {/* ── Node: Ahmedabad (faint / future route) ── */}
                    <circle cx="57" cy="15" r="3" fill="rgba(163,230,53,0.06)" stroke="rgba(163,230,53,0.18)" strokeWidth="0.6"/>
                    <circle cx="57" cy="15" r="1.5" fill="#A3E635" opacity="0.38"/>
                    <text x="64" y="26" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="500" letterSpacing="0.2">Ahmedabad</text>

                    {/* ── Future nodes (connected but not yet started) ── */}
                    {/* Sinnar — NE of Nashik on NH-160 */}
                    <circle cx="243" cy="133" r="3" fill="rgba(163,230,53,0.05)" stroke="rgba(163,230,53,0.20)" strokeWidth="0.6"/>
                    <circle cx="243" cy="133" r="1.5" fill="#A3E635" opacity="0.32"/>
                    <text x="249" y="130" fill="rgba(255,255,255,0.32)" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="400" letterSpacing="0.2">Sinnar</text>

                    {/* Saswad — SE of Pune, future corridor */}
                    <circle cx="235" cy="202" r="3" fill="rgba(163,230,53,0.05)" stroke="rgba(163,230,53,0.18)" strokeWidth="0.6"/>
                    <circle cx="235" cy="202" r="1.5" fill="#A3E635" opacity="0.28"/>
                    <text x="241" y="199" fill="rgba(255,255,255,0.30)" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="400" letterSpacing="0.2">Saswad</text>

                    {/* Nifad — north of Sinnar, wine-belt logistics */}
                    <circle cx="248" cy="120" r="2.5" fill="rgba(163,230,53,0.04)" stroke="rgba(163,230,53,0.15)" strokeWidth="0.5"/>
                    <circle cx="248" cy="120" r="1.2" fill="#A3E635" opacity="0.25"/>
                    <text x="253" y="117" fill="rgba(255,255,255,0.26)" fontSize="7.5" fontFamily="Inter,sans-serif" fontWeight="400" letterSpacing="0.2">Nifad</text>

                    {/* ── Hub: Mumbai ── */}
                    <circle cx="95" cy="173" r="18" fill="none" stroke="rgba(163,230,53,0.10)" strokeWidth="0.8">
                      <animate attributeName="r" values="18;32;18" dur="3.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="3.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="95" cy="173" r="12" fill="none" stroke="rgba(163,230,53,0.16)" strokeWidth="0.8">
                      <animate attributeName="r" values="12;23;12" dur="3.5s" repeatCount="indefinite" begin="0.45s"/>
                      <animate attributeName="opacity" values="0.42;0;0.42" dur="3.5s" repeatCount="indefinite" begin="0.45s"/>
                    </circle>
                    <circle cx="95" cy="173" r="8" fill="rgba(163,230,53,0.05)" stroke="rgba(163,230,53,0.22)" strokeWidth="0.8"/>
                    <circle cx="95" cy="173" r="5" fill="rgba(255,255,255,0.80)" filter="url(#hg3)"/>
                    <circle cx="95" cy="173" r="3" fill="#ffffff"/>
                    <text x="95" y="194" textAnchor="middle" fill="rgba(255,255,255,0.90)" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.5">Mumbai</text>
                  </svg>
                </div>

              </div>

              {/* ── Footer ── */}
              <div className="px-4 py-2.5 border-t border-white/[0.05] flex items-center gap-2.5 flex-wrap shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-pulse shrink-0"/>
                  <span className="text-gray-500 text-[9.5px]">4 active routes</span>
                </div>
                <div className="w-px h-2.5 bg-white/10 shrink-0"/>
                <span className="text-gray-600 text-[9.5px]">Maharashtra · West India</span>
                <div className="w-px h-2.5 bg-white/10 shrink-0"/>
                <span className="text-gray-600 text-[9.5px]">Mumbai Hub</span>
              </div>
            </motion.div>

            {/* ── Floating Routes Widget ── */}
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="absolute hidden xl:flex flex-col z-30 rounded-[18px] overflow-hidden routes-widget-pos"
              style={{
                background: 'rgba(4,10,26,0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}>
              <div className="h-[1.5px] w-full shrink-0" style={{
                background:'linear-gradient(90deg,transparent,rgba(163,230,53,0.5) 40%,rgba(163,230,53,0.5) 60%,transparent)',
              }}/>
              <div className="px-4 py-2.5 border-b border-white/[0.05] shrink-0">
                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400">Routes</span>
              </div>
              <div className="px-4 py-2 border-b border-white/[0.04] shrink-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-white shrink-0" style={{boxShadow:'0 0 8px rgba(255,255,255,0.70)'}}/>
                  <span className="text-white text-[11px] font-bold">Mumbai</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#A3E635] text-[8.5px] font-bold uppercase tracking-[0.10em]">Primary Hub</span>
                </div>
              </div>
              {[
                {city:'Bhiwandi',  dist:'60 km',  active:true},
                {city:'Pune',      dist:'150 km', active:true},
                {city:'Nashik',    dist:'170 km', active:true},
                {city:'Surat',     dist:'265 km', active:true},
                {city:'Ahmedabad', dist:'530 km', active:false},
              ].map(r=>(
                <div key={r.city}
                  className={`px-4 py-1.5 flex items-center justify-between border-b border-white/[0.03] ${!r.active?'opacity-35':''}`}>
                  <div className="min-w-0">
                    <div className={`text-[10.5px] font-medium truncate ${r.active?'text-white/70':'text-gray-600'}`}>{r.city}</div>
                    <div className="text-[8.5px] text-gray-600 mt-0.5">{r.dist}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full shrink-0 ml-2" style={{
                    background:r.active?'#A3E635':'#374151',
                    boxShadow:r.active?'0 0 6px rgba(163,230,53,0.70)':'none',
                  }}/>
                </div>
              ))}
              <div className="px-4 py-2 border-t border-white/[0.05] mt-auto shrink-0">
                <div className="text-[8.5px] text-gray-600 leading-snug">West India · Logistics Network</div>
              </div>
            </motion.div>

            {/* Mumbai Active pill */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-1 hidden xl:flex z-20"
              style={{ bottom: '-15px' }}>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="bg-white/95 backdrop-blur-sm border border-[#A3E635]/25 rounded-xl px-3 py-2 flex items-center gap-2"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.16)' }}>
                <div className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
                <span className="text-gray-600 text-xs font-medium">Mumbai Active</span>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* ══ Stats bar ══ */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-3 sm:mb-5 mt-5 sm:mt-6 lg:mt-12 xl:-mt-4 rounded-2xl overflow-hidden self-stretch xl:self-start"
          style={{
            background: 'rgba(4,8,20,0.28)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderBottom: '1px solid rgba(163,230,53,0.35)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(163,230,53,0.18), 0 1px 0 rgba(163,230,53,0.10)',
          }}>
          {/* Green neon glow line at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] rounded-b-2xl pointer-events-none" style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(163,230,53,0.6) 20%, #A3E635 50%, rgba(163,230,53,0.6) 80%, transparent 100%)',
            boxShadow: '0 0 12px rgba(163,230,53,0.7), 0 0 24px rgba(163,230,53,0.35)',
          }} />
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { Icon: IconTruck,    target: 150,   suffix: '+', label: 'Active Fleet'       },
              { Icon: IconRoute,    target: 12000, suffix: '+', label: 'Trips Completed'    },
              { Icon: IconBuilding, target: 25,    suffix: '+', label: 'Enterprise Clients' },
              { Icon: IconMapPin,   target: 2,     suffix: '+', label: 'Cities'             },
            ].map(({ Icon, target, suffix, label }, i) => (
              <div key={label}
                className={`flex items-center justify-center xl:justify-start gap-2.5 px-4 py-4 sm:py-5 border-white/[0.06]
                  ${i === 0 ? 'border-r' : ''}
                  ${i === 1 ? 'sm:border-r' : ''}
                  ${i === 2 ? 'border-r border-t sm:border-t-0' : ''}
                  ${i === 3 ? 'border-t sm:border-t-0' : ''}
                `}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(163,230,53,0.10)', border: '1px solid rgba(163,230,53,0.18)' }}>
                  <Icon size={18} style={{ color: '#A3E635' }} />
                </div>
                <div>
                  <div className="font-heading font-black text-white text-xl sm:text-2xl leading-none">
                    <PanelCounter target={target} suffix={suffix} inView={statsInView} />
                  </div>
                  <div className="text-gray-500 text-[11px] sm:text-[12px] mt-0.5 font-medium leading-tight">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
