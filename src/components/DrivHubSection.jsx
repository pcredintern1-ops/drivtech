import { motion } from 'framer-motion'
import {
  IconDroplet,
  IconParking,
  IconRadar,
  IconRoute,
  IconHeadphones,
  IconMapPin,
  IconClock,
  IconTruck,
} from '@tabler/icons-react'
import { SectionHeader, SECTION_SHELL, SECTION_CONTAINER } from './SectionHeader'

const HUB_BUILDING = '/scenes/building-hub.webp'

const facilities = [
  {
    id: 'washing',
    title: 'Wash Center',
    desc: 'Fleet washing & vehicle upkeep on campus',
    Icon: IconDroplet,
    accent: 'lime',
  },
  {
    id: 'parking',
    title: 'Parking',
    desc: 'Secure parking for entire fleet capacity',
    Icon: IconParking,
    accent: 'orange',
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    desc: 'Live GPS tracking & fleet visibility',
    Icon: IconRadar,
    accent: 'lime',
  },
  {
    id: 'dispatch',
    title: 'Dispatch',
    desc: 'Route planning & load coordination',
    Icon: IconRoute,
    accent: 'orange',
  },
  {
    id: 'helpdesk',
    title: 'Help Desk',
    desc: 'On-site driver support, 24/7',
    Icon: IconHeadphones,
    accent: 'lime',
  },
]

const hubStats = [
  { label: '500+ vehicle capacity', Icon: IconTruck },
  { label: '24/7 operations', Icon: IconClock },
]

const highlights = [
  { label: '500+ Vehicle Capacity', color: 'lime' },
  { label: '24/7 Operations', color: 'orange' },
  { label: 'Bhiwandi, Mumbai', color: 'lime' },
  { label: 'GPS Fleet Tracking', color: 'orange' },
  { label: 'On site Driver Support', color: 'lime' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const accentStyles = {
  lime: {
    icon: 'bg-[#A3E635]/15 text-[#65a30d] border-[#A3E635]/25',
    dot: 'bg-[#A3E635]',
    hover: 'hover:border-[#A3E635]/40 hover:shadow-[0_12px_40px_rgba(163,230,53,0.12)]',
    line: 'from-[#A3E635]/80 to-[#A3E635]/0',
  },
  orange: {
    icon: 'bg-[#F97316]/12 text-[#ea6c0a] border-[#F97316]/25',
    dot: 'bg-[#F97316]',
    hover: 'hover:border-[#F97316]/40 hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)]',
    line: 'from-[#F97316]/80 to-[#F97316]/0',
  },
}

function FacilityTile({ f }) {
  const FIcon = f.Icon
  const a = accentStyles[f.accent]

  return (
    <motion.article
      variants={fadeUp}
      className={`group relative flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 transition-all duration-300 ${a.hover}`}
    >
      <div className={`absolute top-0 left-5 right-5 h-px bg-gradient-to-r ${a.line}`} />
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${a.icon}`}>
        <FIcon size={22} stroke={2} />
      </div>
      <div>
        <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900">{f.title}</h3>
        <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
      </div>
      <span className={`mt-auto inline-flex w-fit items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500`}>
        <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
        On campus
      </span>
    </motion.article>
  )
}

function HubHero() {
  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-3xl border border-gray-200/60 bg-[#0c1018] shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163,230,53,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163,230,53,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#A3E635]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#F97316]/8 blur-3xl pointer-events-none" />

      <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] min-h-[320px] sm:min-h-[360px]">
        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:py-12 order-2 lg:order-1">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#A3E635]/25 bg-[#A3E635]/10 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635] animate-pulse" />
            Command Center
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mt-4 tracking-tight">
            DRIV <span className="text-[#A3E635]">HUB</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
            One integrated campus where fleet operations, dispatch, and driver support run as a single system.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A3E635]/15">
              <IconMapPin size={18} className="text-[#A3E635]" stroke={2} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Bhiwandi Logistics Park</p>
              <p className="text-xs sm:text-sm text-white/50 mt-0.5">Bhiwandi, Maharashtra, India</p>
            </div>
          </div>
        </div>

        <div className="relative flex items-end justify-center px-6 pt-8 lg:pt-10 order-1 lg:order-2 min-h-[200px] lg:min-h-0">
          <div className="absolute inset-x-8 bottom-8 h-16 rounded-full bg-black/40 blur-2xl" />
          <img
            src={HUB_BUILDING}
            alt="DRIV HUB campus"
            className="relative z-[1] w-full max-w-[300px] lg:max-w-none object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      <div className="relative grid sm:grid-cols-2 border-t border-white/10 bg-black/20">
        {hubStats.map(({ label, Icon }, i) => (
          <div
            key={label}
            className={`flex items-center gap-3 px-6 py-4 sm:py-5 ${i === 0 ? 'sm:border-r border-white/10' : ''}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
              <Icon size={18} className="text-[#A3E635]" stroke={2} />
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white/80">{label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function DrivHubSection() {
  return (
    <section
      id="hub"
      className={`${SECTION_SHELL} bg-[#f6f7f4]`}
    >
      <div
        className="absolute left-0 top-1/4 w-[min(520px,55vw)] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="absolute right-0 bottom-1/4 w-[min(400px,45vw)] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
      />

      <div className={`${SECTION_CONTAINER} max-w-6xl`}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <SectionHeader
            label="Operations Hub"
            title={<>The DRIV <span className="gradient-text-orange">HUB</span></>}
            titleAs="h1"
            description={
              <>
                India&apos;s fleet operations, unified at one address —{' '}
                <span className="font-semibold text-gray-800">Bhiwandi Logistics Park</span>, where
                washing, parking, GPS monitoring, dispatch, and driver support run around the clock.
              </>
            }
          />
        </motion.div>

        <motion.div
          className="space-y-5 sm:space-y-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
        >
          <HubHero />

          <div className="flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#65a30d]">On-site facilities</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1">Five services, one campus</p>
            </div>
            <p className="hidden sm:block text-xs text-gray-500 max-w-[200px] text-right leading-relaxed">
              <span className="text-[#65a30d] font-semibold">Green</span> ops &nbsp;·&nbsp;
              <span className="text-[#ea6c0a] font-semibold">Orange</span> fleet
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
            {facilities.map((f) => (
              <FacilityTile key={f.id} f={f} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {highlights.map(({ label, color }) => (
            <motion.span
              key={label}
              variants={fadeUp}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                color === 'lime'
                  ? 'border border-[#A3E635]/35 text-[#65a30d] bg-white shadow-sm'
                  : 'border border-[#F97316]/35 text-[#ea6c0a] bg-white shadow-sm'
              }`}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
