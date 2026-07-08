import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  IconTruck, IconRoute, IconBolt, IconBike, IconUsers, IconClock,
  IconMapPin, IconTrendingUp, IconRocket, IconSend2, IconArrowRight,
} from '@tabler/icons-react'
import { SECTION_CONTAINER } from './SectionHeader'

const ZONES = [
  {
    id: 'fleet',
    Icon: IconTruck,
    color: '#A3E635',
    title: 'Enterprise Dedicated Fleet',
    desc: 'Dedicated fleet solutions tailored to your business with reliable vehicles, drivers, and end-to-end operational support.',
    img: '/zones/enterprise-dedicated-fleet.webp',
    features: [
      { Icon: IconTruck, label: 'Dedicated Vehicles' },
      { Icon: IconUsers, label: 'Trained Drivers' },
      { Icon: IconClock, label: '24/7 Monitoring' },
    ],
  },
  {
    id: 'linehaul',
    Icon: IconRoute,
    color: '#A3E635',
    title: 'Linehaul Logistics',
    desc: 'Efficient intercity and hub-to-hub transportation designed for seamless long-distance freight movement.',
    img: '/zones/linehaul_logistics.webp',
    features: [
      { Icon: IconRoute, label: 'Hub-to-Hub Transit' },
      { Icon: IconMapPin, label: 'Intercity Network' },
      { Icon: IconClock, label: 'On-Time Transit' },
    ],
  },
  {
    id: 'adhoc',
    Icon: IconBolt,
    color: '#A3E635',
    title: 'Adhoc Vehicle Support',
    desc: 'On-demand vehicle availability to handle urgent deliveries, peak demand, and temporary logistics requirements.',
    img: '/zones/adhoc.webp',
    features: [
      { Icon: IconBolt, label: 'On-Demand Fleet' },
      { Icon: IconTrendingUp, label: 'Peak Ready' },
      { Icon: IconRocket, label: 'Fast Deployment' },
    ],
  },
  {
    id: 'quick',
    Icon: IconBike,
    color: '#A3E635',
    title: 'Quick Commerce Riders',
    desc: 'Fast and dependable rider network for hyperlocal, same-day, and instant deliveries.',
    img: '/zones/quick-commerce-riders.webp',
    features: [
      { Icon: IconBike, label: 'Hyperlocal Riders' },
      { Icon: IconClock, label: 'Same-Day Delivery' },
      { Icon: IconSend2, label: 'Instant Dispatch' },
    ],
  },
]

function makeTheme(isDark) {
  return isDark ? {
    sectionBg:   '#111827',
    cardBg:      '#151b28',
    cardBorder:  'rgba(255,255,255,0.08)',
    imgBg:       '#0d1520',
    imgDot:      'rgba(255,255,255,0.035)',
    imgAccent:   'rgba(163,230,53,0.18)',
    badgeBg:     'rgba(163,230,53,0.12)',
    badgeBorder: 'rgba(163,230,53,0.35)',
    badgeText:   '#A3E635',
    titleColor:  '#ffffff',
    descColor:   'rgba(255,255,255,0.62)',
    chipIconBg:  'rgba(163,230,53,0.10)',
    chipText:    'rgba(255,255,255,0.75)',
    shadow:      '0 18px 50px rgba(0,0,0,.35)',
  } : {
    sectionBg:   '#f0f4f8',
    cardBg:      '#ffffff',
    cardBorder:  'rgba(15,23,42,0.08)',
    imgBg:       '#1a2332',
    imgDot:      'rgba(255,255,255,0.04)',
    imgAccent:   'rgba(163,230,53,0.20)',
    badgeBg:     'rgba(77,124,15,0.08)',
    badgeBorder: 'rgba(77,124,15,0.28)',
    badgeText:   '#4d7c0f',
    titleColor:  '#0f172a',
    descColor:   'rgba(15,23,42,0.62)',
    chipIconBg:  'rgba(77,124,15,0.08)',
    chipText:    'rgba(15,23,42,0.68)',
    shadow:      '0 18px 44px rgba(15,23,42,.08)',
  }
}

// ── Floating icon badge — fills with brand color as it crosses viewport center ──
function ZoneIconBadge({ zone, T, seamLeft }) {
  const ref = useRef(null)

  // 0 → badge enters from the bottom, 0.5 → badge center sits at viewport center, 1 → badge exits the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ['center end', 'center start'] })
  const fillRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const fill = useSpring(fillRaw, { stiffness: 140, damping: 24, mass: 0.6 })

  return (
    <div
      ref={ref}
      className="hidden lg:flex absolute z-10 items-center justify-center rounded-full overflow-hidden"
      style={{
        top: '50%', left: seamLeft, transform: 'translate(-50%, -50%)',
        width: 72, height: 72,
        background: T.cardBg,
        border: `1.5px solid ${T.badgeBorder}`,
        boxShadow: T.shadow,
      }}
    >
      {/* Fill — expands from the center outward as the badge crosses viewport center */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ background: T.badgeText, scale: fill }}
      />
      {/* Glow that peaks alongside the fill */}
      <motion.div
        aria-hidden
        className="absolute -inset-2 rounded-full pointer-events-none"
        style={{ boxShadow: `0 0 26px ${T.badgeText}`, opacity: fill }}
      />

      {/* Base icon — brand color, always present underneath */}
      <zone.Icon size={30} color={T.badgeText} stroke={1.8} className="relative" />
      {/* Filled-state icon — crossfades to white as the fill grows */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: fill }}>
        <zone.Icon size={30} color="#ffffff" stroke={1.8} />
      </motion.div>
    </div>
  )
}

function FeatureChip({ feature, T }) {
  const { Icon, label } = feature
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex items-center justify-center w-6 h-6 rounded-full shrink-0"
        style={{ background: T.chipIconBg }}>
        <Icon size={13} color={T.badgeText} />
      </span>
      <span className="text-xs sm:text-[13px] font-medium whitespace-nowrap" style={{ color: T.chipText }}>
        {label}
      </span>
    </div>
  )
}

function ImgPlaceholder({ zone, T }) {
  const { Icon, color } = zone

  if (zone.img) {
    return (
      <img src={zone.img} alt={zone.title} loading="lazy" decoding="async" draggable={false}
        className="w-full h-full object-cover" />
    )
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      minHeight: '260px',
      background: T.imgBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, ${T.imgDot} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1, pointerEvents: 'none',
        background: `linear-gradient(90deg, transparent 10%, ${color}45 50%, transparent 90%)`,
      }} />
      {/* Corner accent */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, pointerEvents: 'none',
        background: `linear-gradient(90deg, transparent 30%, ${T.imgAccent} 60%, transparent 90%)`,
      }} />
      {/* Center icon placeholder */}
      <div style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        opacity: 0.22, userSelect: 'none',
      }}>
        <Icon size={48} color={color} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
        }}>
          Image
        </span>
      </div>
    </div>
  )
}

export default function DrivWorldSection() {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true
  )

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark'))
    )
    obs.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const T = makeTheme(isDark)

  return (
    <section
      className="w-full py-14 sm:py-20 lg:py-24 overflow-x-hidden"
      style={{ background: T.sectionBg, transition: 'background 0.5s ease' }}
    >
      <div className={SECTION_CONTAINER}>
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-8 max-w-[1280px] mx-auto">
          {ZONES.map((zone, i) => {
            /* even (0,2) → image LEFT on desktop  */
            /* odd  (1,3) → image RIGHT on desktop */
            const imgLeft = i % 2 === 0
            const num = String(i + 1).padStart(2, '0')

            const imgFraction  = 1.15
            const textFraction = 0.85
            const seamLeft = imgLeft
              ? `${(imgFraction / (imgFraction + textFraction)) * 100}%`
              : `${(textFraction / (imgFraction + textFraction)) * 100}%`

            return (
              <Fragment key={zone.id}>
                <div
                  className={`relative grid grid-cols-1 gap-3 lg:gap-0 items-stretch ${
                    imgLeft ? 'lg:grid-cols-[1.15fr_0.85fr]' : 'lg:grid-cols-[0.85fr_1.15fr]'
                  }`}
                >

                  {/* ── Content card — first on mobile/tablet (description above image) ── */}
                  <div
                    className={`order-1 flex flex-col justify-center gap-4 rounded-3xl p-7 sm:p-9 lg:p-10 ${imgLeft ? 'lg:order-2' : 'lg:order-1'}`}
                    style={{
                      background: T.cardBg,
                      border: `1px solid ${T.cardBorder}`,
                      boxShadow: T.shadow,
                      transition: 'background 0.5s ease, border-color 0.5s ease',
                    }}
                  >
                    {/* Numbered badge */}
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl text-xs font-black shrink-0"
                      style={{ background: T.badgeBg, border: `1.5px solid ${T.badgeBorder}`, color: T.badgeText }}>
                      {num}
                    </span>

                    {/* Title */}
                    <h3
                      className="font-heading font-black leading-[1.1] tracking-tight text-2xl sm:text-3xl"
                      style={{ color: T.titleColor }}
                    >
                      {zone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base leading-relaxed" style={{ color: T.descColor }}>
                      {zone.desc}
                    </p>

                    {/* Feature chips */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mt-1">
                      {zone.features.map(f => (
                        <FeatureChip key={f.label} feature={f} T={T} />
                      ))}
                    </div>
                  </div>

                  {/* ── Image card — second on mobile/tablet; kept in its true rectangular
                       aspect ratio (8:3) below lg so the whole photo fits with no crop ── */}
                  <div
                    className={`order-2 rounded-3xl overflow-hidden aspect-[8/3] lg:aspect-auto lg:min-h-[260px] ${imgLeft ? 'lg:order-1' : 'lg:order-2'}`}
                    style={{
                      border: `1px solid ${T.cardBorder}`,
                      boxShadow: T.shadow,
                      transition: 'border-color 0.5s ease',
                    }}
                  >
                    <ImgPlaceholder zone={zone} T={T} />
                  </div>

                  {/* ── Floating icon — sits on the seam between the two cards, desktop only ── */}
                  <ZoneIconBadge zone={zone} T={T} seamLeft={seamLeft} />

                </div>

                {/* ── Divider — separates services on mobile/tablet only, avoids run-on confusion ── */}
                <div className="lg:hidden h-px w-full" style={{ background: T.cardBorder }} />
              </Fragment>
            )
          })}

          {/* ── Grow CTA — last item in the same list, no separate section/background ── */}
          <div className="relative rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] flex items-center"
            style={{ border: `1px solid ${T.cardBorder}`, boxShadow: T.shadow }}
          >
            {/* Background image (light + dark) — reuses Hero's exact desktop images */}
            <div className="absolute inset-0" aria-hidden>
              <img src="/hero-light.webp" alt=""
                className="hero-img-light absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: '82% 68%' }} draggable={false} loading="lazy" />
              <img src="/hero-dark.webp" alt=""
                className="hero-img-dark absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: '82% 68%' }} draggable={false} loading="lazy" />
            </div>

            {/* Overlays — light / dark theme */}
            <div className="hero-overlay-light absolute inset-0" style={{
              background: 'linear-gradient(90deg, rgba(240,245,250,0.96) 0%, rgba(235,242,248,0.90) 16%, rgba(215,230,245,0.66) 32%, rgba(215,230,245,0.28) 48%, rgba(255,255,255,0) 68%)'
            }} />
            <div className="hero-overlay-dark absolute inset-0" style={{
              background: 'linear-gradient(90deg, rgba(8,12,22,0.94) 0%, rgba(10,14,24,0.86) 16%, rgba(11,16,28,0.58) 34%, rgba(11,16,28,0.22) 50%, rgba(11,16,28,0) 70%)'
            }} />

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [.22, 1, .36, 1] }}
              className="relative z-10 max-w-md px-6 sm:px-10 lg:px-14 py-6 sm:py-8"
            >
              <span className="block text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-2 text-[#65a30d] dark:text-[#A3E635]">
                Ready To Grow With Us?
              </span>

              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-[2.1rem] leading-[1.12] mb-2.5 text-gray-900 dark:text-white">
                Let&apos;s Drive Your Business <span className="gradient-text-lime">Forward.</span>
              </h2>

              <p className="hero-desc-shadow text-black dark:text-white/70 text-sm sm:text-base leading-relaxed mb-5 max-w-sm">
                Partner with DrivTech and experience logistics solutions that deliver more.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="/contact"
                  onClick={e => { e.preventDefault(); navigate('/contact') }}
                  className="btn-shine btn-glow-hover group flex items-center justify-center gap-2.5 px-6 py-3 bg-[#A3E635] hover:bg-[#bef264] text-black font-bold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105">
                  Contact Us
                  <IconArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
