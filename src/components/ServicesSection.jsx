import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconTruck, IconRoute, IconBolt, IconBike, IconMapPin } from '@tabler/icons-react'
import { services } from '../data/content'

const iconMap = { truck: IconTruck, route: IconRoute, zap: IconBolt, bike: IconBike }

/* ─────────────────────────────────────────────────────────────────────────────
   Card meta (2×2 service grid)
───────────────────────────────────────────────────────────────────────────── */
const VEHICLE_DUR = 6.0
const WH   = '/scenes/building-warehouse.webp'
const HUB  = '/scenes/building-hub.webp'
const DS   = '/scenes/dispatch-hub.webp'
const CUST = '/scenes/customer-house.webp'
const cardMeta = {
  1: { img: '/vehicles/tata_ace.webp',   alt: 'Tata Ace',   dur: VEHICLE_DUR, delay: 0,                fromBg: WH,  toBg: DS,   from: 'Warehouse',  to: 'Dark Store' },
  2: { img: '/vehicles/truck.webp',      alt: 'Eicher',     dur: VEHICLE_DUR, delay: VEHICLE_DUR*0.25,  fromBg: HUB, toBg: WH,   from: 'Mumbai',     to: 'Pune'     },
  3: { img: '/vehicles/tata_tempo.webp', alt: 'Tata Tempo', dur: VEHICLE_DUR, delay: VEHICLE_DUR*0.5,   fromBg: HUB, toBg: WH,   from: 'DRIV Hub',   to: 'Warehouse'},
  4: { img: '/vehicles/scooty.webp',     alt: 'Scooter',    dur: VEHICLE_DUR, delay: VEHICLE_DUR*0.75,  fromBg: DS,  toBg: CUST, from: 'Dark Store', to: 'Doorstep' },
}

const tilt = {
  onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 7
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -7
    e.currentTarget.style.transition = 'transform 0.05s linear'
    e.currentTarget.style.transform =
      `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(4px) translateY(-2px)`
  },
  onMouseLeave(e) {
    e.currentTarget.style.transition = 'transform 0.2s ease-out'
    e.currentTarget.style.transform = ''
  },
}

const vehicleMask = {
  maskImage:       'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
}

const SCENE_H = 138

/* ── 3-card journey data ── */
const JOURNEY_STEPS = [
  {
    label: 'First Mile', step: '01', Icon: IconTruck,
    title: 'Collection & Dispatch',
    desc: 'Seamless transportation from manufacturing units to warehouses and distribution centres.',
    color: '#A3E635', textColor: '#65a30d',
    bg: 'rgba(163,230,53,0.05)', border: 'rgba(163,230,53,0.20)',
    img: '/services/first-mile.webp',
  },
  {
    label: 'Middle Mile', step: '02', Icon: IconRoute,
    title: 'Hub-to-Hub Transit',
    desc: 'Efficient movement of goods between warehouses, retail outlets, and restaurants.',
    color: '#F97316', textColor: '#c2410c',
    bg: 'rgba(249,115,22,0.05)', border: 'rgba(249,115,22,0.20)',
    img: '/services/middle-mile.webp',
  },
  {
    label: 'Last Mile', step: '03', Icon: IconBike,
    title: 'Customer Delivery',
    desc: 'Reliable and timely delivery of goods directly to customers.',
    color: '#A3E635', textColor: '#65a30d',
    bg: 'rgba(163,230,53,0.05)', border: 'rgba(163,230,53,0.20)',
    img: '/services/last-mile.webp',
  },
]

export default function ServicesSection() {

  /* ── Responsive vehicle/building sizes ── */
  const [screenSize, setScreenSize] = useState('desktop')
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      setScreenSize(w >= 1280 ? 'desktop' : w >= 900 ? 'largeTablet' : w >= 640 ? 'smallTablet' : 'phone')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  const isDesktop = screenSize === 'desktop'

  return (
    <section id="services"
      className="relative pt-24 sm:pt-26 md:pt-28 lg:pt-32 pb-1 md:pb-2 overflow-x-clip section-sep bg-white">

      <div className="absolute right-0 top-1/3 w-[500px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.04) 0%, transparent 70%)' }} />

      <div className="relative w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24">

        {/* ── Header ── */}
        <div className="mb-4 md:mb-6 text-center">
          <span className="flex items-center justify-center gap-2 text-[#65a30d] text-xs font-bold uppercase tracking-[0.3em] mb-2">
            <span className="w-6 h-px bg-[#A3E635]/60" /><span className="w-2 h-2 rounded-full bg-[#A3E635]" />What We Do<span className="w-2 h-2 rounded-full bg-[#A3E635]" /><span className="w-6 h-px bg-[#A3E635]/60" />
          </span>
          <div className="w-fit mx-auto">
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] text-gray-900 leading-[1.08] mb-2 text-center">
              Logistics Solutions <span className="gradient-text">Built for Enterprise</span>
            </h1>
          </div>
        </div>

        {/* ── 3 Journey cards: First Mile | Middle Mile | Last Mile ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 md:mb-7">
          {JOURNEY_STEPS.map((step, i) => {
            const StepIcon = step.Icon
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 340, damping: 22 } }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                className="journey-card relative rounded-3xl overflow-hidden flex flex-col group cursor-default"
                style={{
                  border: `1px solid ${step.border}`,
                  background: step.bg,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                }}>

                {/* Hover radial glow */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 30%, ${step.color}14 0%, transparent 65%)` }} />

                {/* Header row */}
                <div className="relative flex items-center gap-2 px-5 pt-5 z-10">
                  <span className="font-black text-[9px] uppercase tracking-[0.22em] px-2 py-0.5 rounded-md transition-all duration-300 group-hover:scale-105 origin-left"
                    style={{ color: step.textColor, background: `${step.color}22` }}>
                    {step.step}
                  </span>
                  <span className="font-black text-[11px] sm:text-xs uppercase tracking-[0.14em] text-gray-700">
                    {step.label}
                  </span>
                </div>

                {/* Image area with floating icon badge */}
                <div className="relative px-5 pt-3 z-10">
                  {/* Floating icon badge */}
                  <div className="absolute left-7 top-5 z-20 flex items-center justify-center w-12 h-12 rounded-2xl backdrop-blur-sm
                                  transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    style={{ background: `${step.color}1f`, border: `1.5px solid ${step.color}45` }}>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: `0 0 20px ${step.color}55, inset 0 0 12px ${step.color}25` }} />
                    <StepIcon size={24} style={{ color: step.color }} className="relative z-10" />
                  </div>

                  {/* Scene image (light + dark) */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img loading="lazy" decoding="async"
                      src="/services/mile-light.webp"
                      alt={step.title}
                      className="about-img-light w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                      style={{
                        transform: 'scale(1.08)',
                        transformOrigin: '68% 38%',
                        maskImage: 'linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
                        maskComposite: 'intersect',
                        WebkitMaskComposite: 'source-in',
                      }}
                    />
                    <img loading="lazy" decoding="async"
                      src="/services/mile-dark.webp"
                      alt={step.title}
                      className="about-img-dark absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                      style={{
                        transform: 'scale(1.08)',
                        transformOrigin: '68% 38%',
                        maskImage: 'linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
                        maskComposite: 'intersect',
                        WebkitMaskComposite: 'source-in',
                      }}
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="relative px-5 pt-4 pb-5 flex flex-col gap-1 flex-1 z-10">
                  <h4 className="font-heading font-bold text-gray-900 text-lg sm:text-xl leading-tight mb-0.5">
                    {step.title}
                  </h4>
                  <p className="text-black text-base sm:text-lg leading-relaxed">
                    {step.desc}
                  </p>
                  {/* Progress dot line */}
                  <div className="relative flex items-center mt-4 h-2">
                    <div className="h-px w-full rounded-full" style={{ background: `${step.color}40` }} />
                    <div className="absolute left-1/2 w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-125"
                      style={{ transform: 'translateX(-50%)', background: step.color, boxShadow: `0 0 8px ${step.color}` }} />
                  </div>
                </div>

                {/* Bottom glow line — expands on hover */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(90deg, transparent 10%, ${step.color} 50%, transparent 90%)`,
                           boxShadow: `0 0 10px ${step.color}80` }} />
              </motion.div>
            )
          })}
        </div>
        <style>{`
          .journey-card:hover {
            box-shadow: 0 18px 40px rgba(0,0,0,0.10), 0 4px 14px rgba(0,0,0,0.05) !important;
          }
        `}</style>

        {/* ── 2 × 2 card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 md:mb-5">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon] || IconTruck
            const meta = cardMeta[svc.id]

            const vCfg = {
              1: {
                w:  isDesktop ? '25%' : '30%',
                b:  screenSize === 'desktop' ? '-14px' : screenSize === 'largeTablet' ? '-8px'  : screenSize === 'smallTablet' ? '-10px' : '-10px',
                sh: screenSize === 'desktop' ? 27      : screenSize === 'largeTablet' ? 21      : screenSize === 'smallTablet' ? 23      : 23,
                kf: isDesktop ? 'driv-s-1' : 'driv-s-1-m',
              },
              2: {
                w:  isDesktop ? '34%' : '38%',
                b:  screenSize === 'desktop' ? '-44px' : screenSize === 'largeTablet' ? '-20px' : screenSize === 'smallTablet' ? '-24px' : '-28px',
                sh: screenSize === 'desktop' ? 57      : screenSize === 'largeTablet' ? 33      : screenSize === 'smallTablet' ? 37      : 41,
                kf: isDesktop ? 'driv-s-2' : 'driv-s-2-m',
              },
              4: {
                w:  isDesktop ? '22%' : '27%',
                b:  '0px',
                sh: 6,
                kf: isDesktop ? 'driv-s-4' : 'driv-s-4-m',
              },
            }

            const c3Vehicles = [
              { kf: isDesktop ? 'driv-ace'   : 'driv-ace-m',
                img: '/vehicles/tata_ace.webp',   alt: 'Tata Ace',
                w:  isDesktop ? '25%' : '30%',
                vb: screenSize === 'desktop' ? '-14px' : screenSize === 'largeTablet' ? '-8px'  : screenSize === 'smallTablet' ? '-10px' : '-10px',
                sh: screenSize === 'desktop' ? 27      : screenSize === 'largeTablet' ? 21      : screenSize === 'smallTablet' ? 23      : 23,
                delay: 0 },
              { kf: isDesktop ? 'driv-truck' : 'driv-truck-m',
                img: '/vehicles/truck.webp',      alt: 'Eicher',
                w:  isDesktop ? '34%' : '38%',
                vb: screenSize === 'desktop' ? '-44px' : screenSize === 'largeTablet' ? '-20px' : screenSize === 'smallTablet' ? '-24px' : '-28px',
                sh: screenSize === 'desktop' ? 57      : screenSize === 'largeTablet' ? 33      : screenSize === 'smallTablet' ? 37      : 41,
                delay: -(meta.dur / 3) },
              { kf: isDesktop ? 'driv-tempo' : 'driv-tempo-m',
                img: '/vehicles/tata_tempo.webp', alt: 'Tata Tempo',
                w:  isDesktop ? '28%' : '32%',
                vb: screenSize === 'desktop' ? '-25px' : screenSize === 'largeTablet' ? '-12px' : screenSize === 'smallTablet' ? '-15px' : '-16px',
                sh: screenSize === 'desktop' ? 38      : screenSize === 'largeTablet' ? 25      : screenSize === 'smallTablet' ? 28      : 29,
                delay: -(meta.dur * 2 / 3) },
            ]

            const bldH = isDesktop
              ? (svc.id === 4 ? '115%' : '100%')
              : (svc.id === 4 ? '88%'  : '80%')
            const bldHTo = isDesktop
              ? (svc.id === 4 ? '88%'  : '100%')
              : (svc.id === 4 ? '76%'  : '80%')
            const bldBottom = isDesktop && svc.id === 4 ? '-14px' : '0'

            return (
              <div key={svc.id} className="group rounded-2xl" {...tilt}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="relative bg-white border border-gray-200 rounded-2xl
                           group-hover:border-[#A3E635]/40 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(163,230,53,0.07)]
                           transition-[border-color,box-shadow] duration-300 overflow-hidden cursor-default h-full card-instant-pop">

                {/* Colored top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${svc.color}, ${svc.color}88)` }} />
                {/* Hover tint */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                                transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 20% 20%, ${svc.color}08 0%, transparent 60%)` }} />

                {/* ── Text block ── */}
                <div className="relative z-10 px-4 pt-4 pb-2 md:px-5 md:pt-4">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
                                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}30` }}>
                      <Icon size={15} style={{ color: svc.id === 1 || svc.id === 4 ? '#65a30d' : svc.color }} />
                    </div>
                    <h3 className="font-heading font-bold text-gray-900 text-lg sm:text-xl leading-tight">
                      {svc.title}
                    </h3>
                  </div>
                  <p className="text-black text-base sm:text-lg leading-relaxed line-clamp-2">
                    {svc.description}
                  </p>
                </div>

                {/* ══ SCENE STRIP — buildings + vehicle ══ */}
                <div className="relative overflow-hidden"
                  style={{ height: `${SCENE_H}px`, background: '#000' }}>

                  {/* FROM building */}
                  <div className="absolute left-0 top-0 overflow-hidden" style={{ width: svc.id === 4 ? '55%' : '44%', height: '100%' }}>
                    {svc.id === 2 ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IconMapPin size={44} style={{ color: svc.color }} strokeWidth={1.6} />
                      </div>
                    ) : (
                      <img src={meta.fromBg} alt={meta.from} className="absolute left-0"
                        style={{ bottom: bldBottom, height: bldH, width: '100%', objectFit: 'contain', objectPosition: 'left bottom' }} />
                    )}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(to right, transparent 55%, #000 100%)' }} />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: svc.color, boxShadow: `0 0 5px ${svc.color}` }} />
                      <span className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-white/70">{meta.from}</span>
                    </div>
                    <div style={{ position:'absolute', bottom:6, left:'5%', width:'60%', height:'6px', background:'rgba(255,255,255,0.28)', borderRadius:'50%', filter:'blur(5px)' }} />
                  </div>

                  {/* TO building */}
                  {meta.toBg && (
                    <div className="absolute right-0 top-0 overflow-hidden" style={{ width: svc.id === 4 ? '38%' : '44%', height: '100%' }}>
                      {svc.id === 2 ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <IconMapPin size={44} style={{ color: svc.color }} strokeWidth={1.6} />
                        </div>
                      ) : (
                      <img src={meta.toBg} alt={meta.to} className="absolute bottom-0 right-0"
                        style={{ height: bldHTo, width: '100%', objectFit: 'contain', objectPosition: 'right bottom', transform: svc.id === 4 ? 'translateX(-2px)' : 'none' }} />
                      )}
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to left, transparent 55%, #000 100%)' }} />
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
                        <span className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-white/70">{meta.to}</span>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: svc.color, boxShadow: `0 0 5px ${svc.color}` }} />
                      </div>
                      <div style={{ position:'absolute', bottom:6, right:'5%', width:'60%', height:'6px', background:'rgba(255,255,255,0.28)', borderRadius:'50%', filter:'blur(5px)' }} />
                    </div>
                  )}

                  {/* Vehicle(s) */}
                  {svc.id === 3 ? (
                    <>
                      <style>{`
                        @keyframes driv-ace     { 0%{transform:translateX(-110%)} 100%{transform:translateX(400%)} }
                        @keyframes driv-truck   { 0%{transform:translateX(-110%)} 100%{transform:translateX(294%)} }
                        @keyframes driv-tempo   { 0%{transform:translateX(-110%)} 100%{transform:translateX(357%)} }
                        @keyframes driv-ace-m   { 0%{transform:translateX(-110%)} 100%{transform:translateX(333%)} }
                        @keyframes driv-truck-m { 0%{transform:translateX(-110%)} 100%{transform:translateX(263%)} }
                        @keyframes driv-tempo-m { 0%{transform:translateX(-110%)} 100%{transform:translateX(313%)} }
                        @keyframes driv-s-1   { 0%{transform:translateX(-110%)} 100%{transform:translateX(400%)} }
                        @keyframes driv-s-2   { 0%{transform:translateX(-110%)} 100%{transform:translateX(294%)} }
                        @keyframes driv-s-4   { 0%{transform:translateX(-110%)} 100%{transform:translateX(454%)} }
                        @keyframes driv-s-1-m { 0%{transform:translateX(-110%)} 100%{transform:translateX(333%)} }
                        @keyframes driv-s-2-m { 0%{transform:translateX(-110%)} 100%{transform:translateX(263%)} }
                        @keyframes driv-s-4-m { 0%{transform:translateX(-110%)} 100%{transform:translateX(370%)} }
                      `}</style>
                      {c3Vehicles.map(v => (
                        <div key={v.alt} className="absolute" style={{ bottom: v.vb, width: v.w, left: 0, zIndex: 20, willChange: 'transform',
                          animation: `${v.kf} ${meta.dur}s linear ${v.delay}s infinite` }}>
                          <div style={{ position:'absolute', bottom: v.sh, left:'12%', width:'76%', height:'6px', background:'rgba(255,255,255,0.28)', borderRadius:'50%', filter:'blur(5px)' }} />
                          <img src={v.img} alt={v.alt} className="w-full h-auto block" style={{...vehicleMask}} />
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="absolute" style={{
                      bottom: vCfg[svc.id].b,
                      width:  vCfg[svc.id].w,
                      left: 0, zIndex: 20, willChange: 'transform',
                      animation: `${vCfg[svc.id].kf} ${meta.dur}s linear -${meta.delay}s infinite`,
                    }}>
                      <div style={{ position:'absolute', bottom: vCfg[svc.id].sh, left:'12%', width:'76%', height:'6px', background:'rgba(255,255,255,0.28)', borderRadius:'50%', filter:'blur(5px)' }} />
                      <img src={meta.img} alt={meta.alt} className="w-full h-auto block" style={{ ...vehicleMask }} />
                    </div>
                  )}
                </div>

                {/* Bottom bar on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full
                                transition-all duration-700 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }} />
              </motion.div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
