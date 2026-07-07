import { useEffect, useState } from 'react'
import { IconTruck, IconRoute, IconBolt, IconBike } from '@tabler/icons-react'
import { SECTION_CONTAINER } from './SectionHeader'

const ZONES = [
  {
    id:    'fleet',
    Icon:  IconTruck,
    color: '#A3E635',
    tag:   'Fleet Operations',
    title: 'Enterprise Dedicated Fleet',
    desc:  'Dedicated fleet solutions tailored to your business with reliable vehicles, drivers, and end-to-end operational support.',
    from:  'Origin',
    to:    'Destination',
  },
  {
    id:    'linehaul',
    Icon:  IconRoute,
    color: '#A3E635',
    tag:   'Linehaul',
    title: 'Linehaul Logistics',
    desc:  'Efficient intercity and hub-to-hub transportation designed for seamless long-distance freight movement.',
    from:  'Mumbai',
    to:    'Pune',
  },
  {
    id:    'adhoc',
    Icon:  IconBolt,
    color: '#A3E635',
    tag:   'Adhoc Deploy',
    title: 'Adhoc Vehicle Support',
    desc:  'On-demand vehicle availability to handle urgent deliveries, peak demand, and temporary logistics requirements.',
    from:  'Driv Hub',
    to:    'Warehouse',
  },
  {
    id:    'quick',
    Icon:  IconBike,
    color: '#A3E635',
    tag:   'Quick Commerce',
    title: 'Quick Commerce Riders',
    desc:  'Fast and dependable rider network for hyperlocal, same-day, and instant deliveries.',
    from:  'Dark Store',
    to:    'Doorstep',
  },
]

function makeTheme(isDark) {
  return isDark ? {
    sectionBg:     '#111827',
    imgBg:         '#0d1520',
    imgBorder:     'rgba(255,255,255,0.07)',
    imgDot:        'rgba(255,255,255,0.035)',
    imgAccent:     'rgba(163,230,53,0.18)',
    tagBg:         'rgba(163,230,53,0.10)',
    tagColor:      '#A3E635',
    titleColor:    '#ffffff',
    descColor:     'rgba(255,255,255,0.62)',
    divider:       'rgba(255,255,255,0.06)',
    routeFrom:     '#A3E635',
    routeLine:     'rgba(255,255,255,0.15)',
    routeDest:     'rgba(255,255,255,0.22)',
    routeDestText: 'rgba(255,255,255,0.40)',
  } : {
    sectionBg:     '#f0f4f8',
    imgBg:         '#1a2332',
    imgBorder:     'rgba(0,0,0,0.10)',
    imgDot:        'rgba(255,255,255,0.04)',
    imgAccent:     'rgba(163,230,53,0.20)',
    tagBg:         'rgba(101,163,13,0.10)',
    tagColor:      '#4d7c0f',
    titleColor:    '#0f172a',
    descColor:     'rgba(15,23,42,0.62)',
    divider:       'rgba(0,0,0,0.07)',
    routeFrom:     '#4d7c0f',
    routeLine:     'rgba(15,23,42,0.18)',
    routeDest:     'rgba(15,23,42,0.22)',
    routeDestText: 'rgba(15,23,42,0.42)',
  }
}

function RouteBadge({ zone, T }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: T.routeFrom, flexShrink: 0,
        }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: T.routeFrom,
        }}>
          {zone.from}
        </span>
      </span>

      <div style={{
        width: 36, height: 1, flexShrink: 0,
        background: `linear-gradient(90deg, ${T.routeFrom}55, ${T.routeLine})`,
      }} />

      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: T.routeDest, flexShrink: 0,
        }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: T.routeDestText,
        }}>
          {zone.to}
        </span>
      </span>
    </div>
  )
}

function ImgPlaceholder({ zone, T }) {
  const { Icon, color } = zone
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1 / 1',
      borderRadius: 20,
      overflow: 'hidden',
      background: T.imgBg,
      border: `1px solid ${T.imgBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
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
        {/* Cap row width so the image/description gap stays constant on large screens */}
        <div className="flex flex-col max-w-[1280px] mx-auto">
          {ZONES.map((zone, i) => {
            /* even (0,2) → image LEFT on desktop  */
            /* odd  (1,3) → image RIGHT on desktop */
            const imgLeft = i % 2 === 0

            return (
              <div key={zone.id}>
                {/* Row */}
                <div
                  className={[
                    'flex flex-col gap-8 sm:gap-10 items-center',
                    'lg:flex-row lg:justify-between',
                    imgLeft ? 'lg:flex-row-reverse' : '',
                  ].join(' ')}
                >
                  {/* ── Content — DOM-first so mobile shows text above image ── */}
                  <div className="w-full lg:w-[44%] flex flex-col gap-4 sm:gap-5 items-center text-center">

                    {/* Title */}
                    <h3
                      className="font-heading font-black leading-[1.1] tracking-tight
                        text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.4rem]"
                      style={{ color: T.titleColor }}
                    >
                      {zone.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-base sm:text-lg leading-relaxed"
                      style={{ color: T.descColor }}
                    >
                      {zone.desc}
                    </p>

                    {/* Route badge */}
                    <RouteBadge zone={zone} T={T} />
                  </div>

                  {/* ── Image — DOM-second so mobile shows image below text ── */}
                  <div className="w-full md:w-4/5 lg:w-[52%] lg:max-w-[580px]">
                    <ImgPlaceholder zone={zone} T={T} />
                  </div>
                </div>

                {/* Divider — skip after last row */}
                {i < ZONES.length - 1 && (
                  <div
                    className="my-14 sm:my-16 lg:my-20 h-px w-full"
                    style={{ background: T.divider }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
