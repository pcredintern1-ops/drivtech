import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconTruck, IconRoute, IconBike } from '@tabler/icons-react'
import DrivWorldSection from './DrivWorldSection'
import { SectionHeader, SECTION_PT, SECTION_CONTAINER } from './SectionHeader'

/* ── 3-card journey data ── */
const JOURNEY_STEPS = [
  {
    label: 'First Mile', step: '01', Icon: IconTruck,
    title: 'Collection & Dispatch',
    desc: 'We manage the pickup and movement of goods from manufacturers, suppliers, and vendors to warehouses or fulfillment centers, ensuring a smooth start to your supply chain.',
    color: '#A3E635', textColor: '#65a30d',
    bg: 'rgba(163,230,53,0.05)', border: 'rgba(163,230,53,0.20)',
    img: '/services/first-mile.webp',
    imgDark: '/services/first-mile-dark.webp',
  },
  {
    label: 'Middle Mile', step: '02', Icon: IconRoute,
    title: 'Hub-to-Hub Transit',
    desc: 'Our mid-mile network connects warehouses, distribution centers, and regional hubs across India, optimizing inventory flow and reducing transit times.',
    color: '#A3E635', textColor: '#65a30d',
    bg: 'rgba(163,230,53,0.05)', border: 'rgba(163,230,53,0.20)',
    img: '/services/middle-mile.webp',
    imgDark: '/services/middle-mile-dark.webp',
  },
  {
    label: 'Last Mile', step: '03', Icon: IconBike,
    title: 'Customer Delivery',
    desc: 'We deliver products from local hubs to their final destination with speed, reliability, and precision, creating a seamless experience for your end customers.',
    color: '#A3E635', textColor: '#65a30d',
    bg: 'rgba(163,230,53,0.05)', border: 'rgba(163,230,53,0.20)',
    img: '/services/last-mile.webp',
    imgDark: '/services/last-mile-dark.webp',
  },
]

/* ── Shared card body (used by both desktop grid + mobile carousel) ── */
function JourneyCardBody({ step }) {
  const StepIcon = step.Icon
  return (
    <>
      {/* Header row — step number + label */}
      <div className="relative flex items-center gap-2.5 px-5 pt-5 z-10">
        <span className="font-black text-[10px] sm:text-xs tabular-nums"
          style={{ color: step.color, letterSpacing: '0.1em' }}>
          {step.step}
        </span>
        <span className="w-px h-3.5 rounded-full" style={{ background: `${step.color}50` }} />
        <span className="font-black text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-700">
          {step.label}
        </span>
      </div>

      {/* Image area with floating icon badge */}
      <div className="relative px-5 pt-3 z-10">
        {/* Floating icon badge */}
        <div className="absolute left-7 top-5 z-20 flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 xl:w-12 xl:h-12 rounded-2xl backdrop-blur-sm
                        transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
          style={{ background: `${step.color}1f`, border: `1.5px solid ${step.color}45` }}>
          <StepIcon style={{ color: step.color }} className="relative z-10 w-5 h-5 sm:w-7 sm:h-7 xl:w-6 xl:h-6" />
        </div>

        {/* Scene image (light + dark) */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img loading="lazy" decoding="async"
            src={step.img}
            alt={step.title}
            className="about-img-light w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
            style={{
              transform: step.label === 'Middle Mile' ? 'scale(1.03)' : 'scale(1.0)',
              transformOrigin: step.label === 'Middle Mile' ? '68% 38%' : '50% 50%',
              maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
          <img loading="lazy" decoding="async"
            src={step.imgDark}
            alt={step.title}
            className="about-img-dark absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
            style={{
              transform: step.label === 'Middle Mile' ? 'scale(1.03)' : 'scale(1.0)',
              transformOrigin: step.label === 'Middle Mile' ? '68% 38%' : '50% 50%',
              maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="relative px-5 pt-4 pb-5 flex flex-col gap-1.5 flex-1 z-10">
        <h3 className="font-heading font-black text-lg sm:text-xl leading-snug text-gray-900 mb-0.5">
          {step.title}
        </h3>
        <p className="text-black text-sm sm:text-base leading-relaxed">
          {step.desc}
        </p>
        {/* Progress dot line */}
        <div className="relative flex items-center mt-auto pt-4 h-2">
          <div className="h-px w-full rounded-full" style={{ background: `${step.color}40` }} />
          <div className="absolute left-1/2 w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-125"
            style={{ transform: 'translateX(-50%)', background: step.color, boxShadow: `0 0 8px ${step.color}` }} />
        </div>
      </div>

      {/* Bottom glow line — expands on hover */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, transparent 10%, ${step.color} 50%, transparent 90%)`,
                 boxShadow: `0 0 10px ${step.color}80` }} />
    </>
  )
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

/* ── Mobile carousel: tabs + arrows + slide + dots ── */
function JourneyCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const goTo = (idx) => {
    setDir(idx > active ? 1 : idx < active ? -1 : dir)
    setActive(idx)
  }
  const next = () => goTo((active + 1) % JOURNEY_STEPS.length)
  const prev = () => goTo((active - 1 + JOURNEY_STEPS.length) % JOURNEY_STEPS.length)

  const current = JOURNEY_STEPS[active]

  return (
    <div className="xl:hidden mb-5">

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {JOURNEY_STEPS.map((step, i) => (
          <button
            key={step.label}
            onClick={() => goTo(i)}
            className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-[0.14em] transition-all duration-300"
            style={{
              background: i === active ? `${step.color}1f` : 'transparent',
              border: `1px solid ${i === active ? step.color : 'rgba(0,0,0,0.14)'}`,
              color: i === active ? step.textColor : '#6b7280',
            }}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* Swipeable card — finger drag left/right to navigate, bigger card, widens further on tablet */}
      <div className="relative max-w-[420px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
        <div className="overflow-hidden relative">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={current.label}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              dragTransition={{ bounceStiffness: 420, bounceDamping: 32 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60 || info.velocity.x < -500) next()
                else if (info.offset.x > 60 || info.velocity.x > 500) prev()
              }}
              className="journey-card relative rounded-3xl overflow-hidden flex flex-col group cursor-grab active:cursor-grabbing"
              style={{
                border: `1px solid ${current.border}`,
                background: current.bg,
                backgroundClip: 'padding-box',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                touchAction: 'pan-y',
              }}
            >
              <JourneyCardBody step={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {JOURNEY_STEPS.map((step, i) => (
          <button
            key={step.label}
            onClick={() => goTo(i)}
            aria-label={`Go to ${step.label}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 18 : 7,
              height: 7,
              background: i === active ? step.color : '#d1d5db',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <>
      <section
        id="services"
        className={`relative ${SECTION_PT} pb-10 md:pb-12 lg:pb-14 overflow-x-clip section-sep bg-white`}
      >

        <div className={SECTION_CONTAINER}>
          <SectionHeader
            label="What We Do"
            title={<>Our <span className="gradient-text">Logistics Solutions</span></>}
            titleAs="h1"
            description="From pickup to final delivery, DrivTech powers every stage of the supply chain with scalable, technology-driven logistics solutions."
          />

          {/* ── Mobile: carousel (tabs + arrows + slide + dots) ── */}
          <JourneyCarousel />

          {/* ── Desktop only: 3 Journey cards: First Mile | Middle Mile | Last Mile ── */}
          <div className="hidden xl:grid xl:grid-cols-3 gap-4">
            {JOURNEY_STEPS.map((step, i) => (
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
                  backgroundClip: 'padding-box',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                }}>
                <JourneyCardBody step={step} />
              </motion.div>
            ))}
          </div>
          <style>{`
            .journey-card:hover {
              box-shadow: 0 18px 40px rgba(0,0,0,0.10), 0 4px 14px rgba(0,0,0,0.05) !important;
            }
          `}</style>
        </div>
      </section>

      {/* Parallax lives outside overflow-clip so ScrollTrigger pin works correctly */}
      <DrivWorldSection />
    </>
  )
}
