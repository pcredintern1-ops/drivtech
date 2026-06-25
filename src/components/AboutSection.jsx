import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { IconShield, IconTruck, IconAffiliate } from '@tabler/icons-react'
import { SectionLabel, SectionTitle, SECTION_SHELL, SECTION_SHELL_CONT, SECTION_CONTAINER, SECTION_LABEL_MB, CONTAINER_GAP } from './SectionHeader'

/* ── Variants ── */
const wa = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.7, ease: 'easeOut' } },
}
const fadeUp     = wa
const fadeFromLeft = wa
const stag      = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } }
const stagCards = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

/* ── Feature cards ── */
const features = [
  { icon: IconTruck,     title: 'Enterprise Focused',      desc: 'Solutions built for modern businesses.'   },
  { icon: IconAffiliate, title: 'Technology Driven',  desc: 'Real time visibility, smarter decisions.' },
  { icon: IconShield,    title: 'Reliable & Scalable',     desc: 'Built to deliver consistently, at scale.' },
]

export default function AboutSection({ continuation = false }) {
  const shell = continuation ? SECTION_SHELL_CONT : SECTION_SHELL
  return (
    <section id="about"
      className={`theme-surface ${shell} overflow-hidden`}>


      <div className={`${SECTION_CONTAINER} ${continuation ? CONTAINER_GAP : ''}`}>

        {/* ── Section label ── */}
        <div className={`text-center ${SECTION_LABEL_MB}`}>
          <SectionLabel className="mb-0">About DRIV</SectionLabel>
        </div>

        {/* ── Main grid: LEFT text · RIGHT arrow ── */}
        <div className="grid lg:grid-cols-[38%_62%] gap-6 xl:gap-8 items-center">

          {/* LEFT: Text */}
          <div className="flex flex-col items-start relative z-10">

            {/* Heading */}
            <div className="w-full text-center lg:text-left mb-5 md:mb-6">
              <span className="inline-block text-center lg:text-left">
                <SectionTitle as="h2" className="text-center lg:text-left lg:whitespace-nowrap mb-2">
                  Powering Enterprise<br/>
                  <span className="gradient-text">Logistics End-to-End</span>
                </SectionTitle>
              </span>
            </div>

            <p className="text-black text-base sm:text-lg leading-relaxed mb-3">
              DRIV is a Mumbai-based fleet operations and logistics company built for{' '}
              <span className="text-gray-900 font-semibold">enterprise clients</span>.
              We manage dedicated transportation, linehaul movement, on-demand fleet deployment, and end-to-end driver operations.
            </p>

            <p className="text-black text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
              Founded in 2023, we're building India's logistics backbone. Serving quick commerce operators,
              enterprise supply chains, and the businesses powering India's fastest-growing cities.
            </p>


          </div>

          {/* RIGHT: Network image */}
          <div
            className="flex items-center justify-center lg:translate-x-0 xl:translate-x-0"
            style={{ overflowX: 'clip' }}>
            <div className="shrink-0 w-full grid">
              <img loading="lazy" decoding="async"
                src="/about-network-3.webp"
                alt="DRIV Logistics Network"
                className="about-img-light w-full h-auto"
                draggable={false}
                style={{
                  gridArea: '1 / 1',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }}
              />
              <img loading="lazy" decoding="async"
                src="/about-network-dark.webp"
                alt="DRIV Logistics Network"
                className="about-img-dark w-full h-auto"
                draggable={false}
                style={{
                  gridArea: '1 / 1',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }}
              />
            </div>
          </div>

        </div>

        {/* ── Feature items — full width below grid ── */}
        <motion.div
          variants={stagCards} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col md:grid md:grid-cols-3 xl:flex xl:flex-row xl:items-stretch mt-6 md:mt-8 max-w-2xl md:max-w-none xl:max-w-full md:mx-auto xl:mx-0">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <Fragment key={title}>
              {i > 0 && <div className="hidden xl:block w-px bg-gray-300/60 shrink-0 self-stretch xl:mx-2"/>}
              {i > 0 && <div className="md:hidden h-px bg-gray-300/60 w-full my-1"/>}
              <motion.div variants={fadeFromLeft}
                className="flex flex-row items-center gap-2 sm:gap-3 py-3 sm:py-4 min-w-0 xl:flex-none pl-3 pr-2 sm:pl-4 sm:pr-3 xl:pl-3 xl:pr-5 rounded-3xl cursor-default"
                style={{ border: '1px solid transparent', transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease' }}
                >
                <motion.div
                  // whileHover={{ scale: 1.18, rotate: -8, boxShadow: '0 0 28px rgba(163,230,53,0.60), 0 0 10px rgba(163,230,53,0.30)' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:'rgba(163,230,53,0.10)',
                    border:'1.5px solid rgba(101,163,13,0.35)',
                    boxShadow:'0 0 14px rgba(163,230,53,0.28), 0 0 5px rgba(163,230,53,0.14)',
                  }}>
                  <Icon size={22} className="text-[#65a30d]" strokeWidth={1.6}/>
                </motion.div>
                <div>
                  <h4 className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-1 leading-snug xl:whitespace-nowrap">{title}</h4>
                  <p className="text-black text-base sm:text-lg leading-relaxed xl:max-w-[185px]">{desc}</p>
                </div>
              </motion.div>
            </Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
