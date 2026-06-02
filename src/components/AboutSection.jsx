import { useRef, Fragment } from 'react'
import { motion, useInView } from 'framer-motion'
import { IconShield, IconTruck, IconAffiliate } from '@tabler/icons-react'

/* ── Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}
const fadeFromLeft = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stag      = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const stagCards = { hidden: {}, show: { transition: { staggerChildren: 0.18 } } }

/* ── Feature cards ── */
const features = [
  { icon: IconTruck,     title: 'Enterprise Focused',      desc: 'Solutions built for modern businesses.'   },
  { icon: IconAffiliate, title: 'Technology Driven',  desc: 'Real time visibility, smarter decisions.' },
  { icon: IconShield,    title: 'Reliable & Scalable',     desc: 'Built to deliver consistently, at scale.' },
]

export default function AboutSection() {
  const arrowRef     = useRef(null)
  const arrowVisible = useInView(arrowRef, { once: true, margin: '0px' })

  return (
    <section id="about"
      className="relative py-8 md:py-12 lg:py-14 overflow-hidden section-sep"
      style={{ background: '#ebecf0' }}>

      {/* Lime glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 65%)', filter:'blur(24px)' }}/>

      <div className="relative w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.75 }}
          className="text-center mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2.5 text-[#65a30d] text-sm font-bold uppercase tracking-[0.3em]">
            <span className="w-8 h-px bg-[#A3E635]/60"/>
            <span className="w-2 h-2 rounded-full bg-[#A3E635]"/>
            About DRIV
            <span className="w-2 h-2 rounded-full bg-[#A3E635]"/>
            <span className="w-8 h-px bg-[#A3E635]/60"/>
          </span>
        </motion.div>

        {/* ── Main grid: LEFT text · RIGHT arrow ── */}
        <div className="grid lg:grid-cols-[38%_62%] gap-6 xl:gap-8 items-center">

          {/* LEFT: Text */}
          <motion.div
            variants={stag} initial="hidden"
            whileInView="show" viewport={{ once: true, amount: 0.05 }}
            className="flex flex-col items-start relative z-10">

            {/* Heading + green accent line */}
            <motion.div variants={fadeUp} className="w-full text-center lg:text-left mb-5 md:mb-6">
              <span className="inline-block text-center lg:text-left">
                <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] text-gray-900 leading-[1.08] mb-2 lg:whitespace-nowrap">
                  Mumbai's Premier<br/>
                  <span className="gradient-text">Enterprise Logistics</span>
                </h2>
              </span>
            </motion.div>

            <motion.p variants={fadeUp}
              className="text-black text-lg sm:text-xl md:text-xl lg:text-xl leading-relaxed mb-3">
              DRIV is a Mumbai based logistics and fleet operations company focused on{' '}
              <span className="text-gray-900 font-semibold">enterprise transportation</span>,
              linehaul movement, adhoc fleet support, and driver management solutions.
            </motion.p>

            <motion.p variants={fadeUp}
              className="text-black text-base sm:text-lg md:text-lg lg:text-lg leading-relaxed mb-6 md:mb-8">
              Founded in 2023, we're building a scalable logistics ecosystem designed to support
              modern supply chains, quick commerce operations, and future ready mobility infrastructure.
            </motion.p>

          </motion.div>

          {/* RIGHT: Network image */}
          <div ref={arrowRef}
            className="flex items-center justify-center lg:translate-x-0 xl:translate-x-0"
            style={{ overflowX: 'clip' }}>
            <motion.div
              initial={{ x: '110%', opacity: 0 }}
              animate={arrowVisible ? { x: 0, opacity: 1 } : { x: '110%', opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 w-full">
              <img
                src="/about-network-2.webp"
                alt="DRIV Logistics Network"
                className="w-full h-auto"
                draggable={false}
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }}
              />
            </motion.div>
          </div>

        </div>

        {/* ── Feature items — full width below grid ── */}
        <motion.div
          variants={stagCards} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-stretch mt-6 md:mt-8 max-w-2xl sm:mx-auto lg:mx-0 xl:max-w-full">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <Fragment key={title}>
              {i > 0 && <div className="hidden sm:block w-px bg-gray-300/60 shrink-0 self-stretch xl:mx-2"/>}
              {i > 0 && <div className="sm:hidden h-px bg-gray-300/60 w-full my-1"/>}
              <motion.div variants={fadeFromLeft}
                className="flex flex-row items-center gap-2 sm:gap-3 py-3 sm:py-4 min-w-0 pl-3 pr-2 sm:pl-4 sm:pr-3 xl:pl-3 xl:pr-5 rounded-3xl cursor-default"
                style={{ border: '1px solid transparent', transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(163,230,53,0.07) 0%, rgba(255,255,255,0.60) 100%)'
                  e.currentTarget.style.borderColor = 'rgba(163,230,53,0.38)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(163,230,53,0.18), 0 2px 8px rgba(0,0,0,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                <motion.div
                  whileHover={{ scale: 1.18, rotate: -8, boxShadow: '0 0 28px rgba(163,230,53,0.60), 0 0 10px rgba(163,230,53,0.30)' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:'rgba(163,230,53,0.10)',
                    border:'1.5px solid rgba(101,163,13,0.35)',
                    boxShadow:'0 0 14px rgba(163,230,53,0.28), 0 0 5px rgba(163,230,53,0.14)',
                  }}>
                  <Icon size={14} className="text-[#65a30d]" strokeWidth={1.6}/>
                </motion.div>
                <div>
                  <h4 className="font-heading font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug xl:whitespace-nowrap">{title}</h4>
                  <p className="text-black text-[10px] sm:text-xs leading-relaxed xl:max-w-[140px]">{desc}</p>
                </div>
              </motion.div>
            </Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
