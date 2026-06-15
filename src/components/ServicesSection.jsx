import { motion } from 'framer-motion'
import { IconTruck, IconRoute, IconBike } from '@tabler/icons-react'
import DrivWorldSection from './DrivWorldSection'

/* ── 3-card journey data ── */
const JOURNEY_STEPS = [
  {
    label: 'First Mile', step: '01', Icon: IconTruck,
    title: 'Collection & Dispatch',
    desc: 'We manage the pickup and movement of goods from manufacturers, suppliers, and vendors to warehouses or fulfillment centers, ensuring a smooth start to your supply chain.',
    color: '#A3E635', textColor: '#65a30d',
    bg: 'rgba(163,230,53,0.05)', border: 'rgba(163,230,53,0.20)',
    img: '/services/first-mile.webp',
  },
  {
    label: 'Middle Mile', step: '02', Icon: IconRoute,
    title: 'Hub-to-Hub Transit',
    desc: 'Our mid-mile network enables efficient transportation between warehouses, distribution centers, and regional hubs, optimizing inventory flow and reducing transit times.',
    color: '#F97316', textColor: '#c2410c',
    bg: 'rgba(249,115,22,0.05)', border: 'rgba(249,115,22,0.20)',
    img: '/services/middle-mile.webp',
  },
  {
    label: 'Last Mile', step: '03', Icon: IconBike,
    title: 'Customer Delivery',
    desc: 'We deliver products from local hubs to their final destination with speed, reliability, and precision, creating a seamless experience for your end customers.',
    color: '#A3E635', textColor: '#65a30d',
    bg: 'rgba(163,230,53,0.05)', border: 'rgba(163,230,53,0.20)',
    img: '/services/last-mile.webp',
  },
]

export default function ServicesSection() {
  return (
    <section id="services"
      className="relative pt-28 sm:pt-36 md:pt-40 lg:pt-36 pb-1 md:pb-2 overflow-x-clip section-sep bg-white">

      <div className="absolute right-0 top-1/3 w-[500px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.04) 0%, transparent 70%)' }} />

      <div className="relative w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24">

        {/* ── Header ── */}
        <div className="mb-8 md:mb-12 lg:mb-16 text-center">
          <span className="flex items-center justify-center gap-2 text-[#65a30d] text-sm font-bold uppercase tracking-[0.3em] mb-5">
            <span className="w-8 h-px bg-[#A3E635]/60" /><span className="w-2 h-2 rounded-full bg-[#A3E635]" />What We Do<span className="w-2 h-2 rounded-full bg-[#A3E635]" /><span className="w-8 h-px bg-[#A3E635]/60" />
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
                  <span className="font-black text-xs sm:text-sm uppercase tracking-[0.14em] text-gray-700">
                    {step.label}
                  </span>
                </div>

                {/* Image area with floating icon badge */}
                <div className="relative px-5 pt-3 z-10">
                  {/* Floating icon badge */}
                  <div className="absolute left-7 top-5 z-20 flex items-center justify-center w-16 h-16 rounded-2xl backdrop-blur-sm
                                  transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    style={{ background: `${step.color}1f`, border: `1.5px solid ${step.color}45` }}>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: `0 0 20px ${step.color}55, inset 0 0 12px ${step.color}25` }} />
                    <StepIcon size={32} style={{ color: step.color }} className="relative z-10" />
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
                  <p className="text-black text-base sm:text-lg leading-relaxed">
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
              </motion.div>
            )
          })}
        </div>
        <style>{`
          .journey-card:hover {
            box-shadow: 0 18px 40px rgba(0,0,0,0.10), 0 4px 14px rgba(0,0,0,0.05) !important;
          }
        `}</style>

        {/* ── 4 Service zones — cinematic scroll world ── */}
      </div>

      {/* Full-bleed world (outside the padded container) */}
      <DrivWorldSection />

    </section>
  )
}
