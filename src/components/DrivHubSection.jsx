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

const HUB_BUILDING = '/scenes/building-hub.webp'

/** Even pentagon on the orbit — 72° apart, starting at top */
const ORBIT_RADIUS = 54
const HUB_RING_RADIUS = 20

const FACILITY_CARD_W = 'w-[148px] sm:w-[160px]'
const FACILITY_IMG_H = 'h-[100px] sm:h-[110px]'

const facilities = [
  {
    id: 'washing',
    short: 'Wash Center',
    building: '/scenes/building-warehouse.webp',
    Icon: IconDroplet,
    color: '#65a30d',
    tint: 'rgba(163,230,53,0.08)',
  },
  {
    id: 'parking',
    short: 'Parking',
    building: '/scenes/building-warehouse.webp',
    Icon: IconParking,
    color: '#ea6c0a',
    tint: 'rgba(249,115,22,0.08)',
  },
  {
    id: 'monitoring',
    short: 'Monitoring',
    building: '/scenes/dispatch-hub.webp',
    Icon: IconRadar,
    color: '#65a30d',
    tint: 'rgba(163,230,53,0.08)',
  },
  {
    id: 'dispatch',
    short: 'Dispatch',
    building: '/scenes/dispatch-hub.webp',
    Icon: IconRoute,
    color: '#ea6c0a',
    tint: 'rgba(249,115,22,0.08)',
  },
  {
    id: 'helpdesk',
    short: 'Help Desk',
    building: '/scenes/customer-house.webp',
    Icon: IconHeadphones,
    color: '#65a30d',
    tint: 'rgba(163,230,53,0.08)',
  },
].map((f, i) => ({ ...f, angle: -90 + i * 72 }))

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

function polarToXY(angleDeg, radius = ORBIT_RADIUS) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  }
}

function FacilityCard({ f }) {
  const FIcon = f.Icon
  return (
    <div
      className={`relative ${FACILITY_CARD_W} rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.08)] shrink-0`}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: f.color }} />
      <div
        className={`relative ${FACILITY_IMG_H} flex items-end justify-center px-2 pt-2`}
        style={{
          background: `linear-gradient(180deg, ${f.tint} 0%, #fff 55%)`,
        }}
      >
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[72%] h-2 rounded-[100%] opacity-40"
          style={{ backgroundColor: f.color }}
        />
        <img
          src={f.building}
          alt=""
          className="relative z-[1] max-h-[92%] max-w-[96%] object-contain object-bottom drop-shadow-[0_6px_12px_rgba(0,0,0,0.12)]"
        />
      </div>
      <span
        className="absolute top-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border-2 border-white shadow-md"
        style={{ backgroundColor: f.color }}
      >
        <FIcon size={17} className="text-white" stroke={2.5} />
      </span>
    </div>
  )
}

/** Rotate from center + fixed radius — slot angle is clockwise from top (12 o'clock) */
function OrbitFacility({ f }) {
  const slot = f.angle + 90
  return (
    <div
      className="absolute left-1/2 top-1/2 z-10 origin-center"
      style={{ transform: `rotate(${slot}deg) translateY(calc(-1 * var(--hub-orbit-r)))` }}
    >
      <div
        className={`flex flex-col items-center ${FACILITY_CARD_W} origin-center`}
        style={{ transform: `rotate(${-slot}deg) translate(-50%, calc(-1 * var(--hub-card-half)))` }}
      >
        <FacilityCard f={f} />
        <span
          className="mt-2 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-gray-900 py-1.5 px-3 rounded-full bg-white border shadow-sm whitespace-nowrap"
          style={{ borderColor: `${f.color}40` }}
        >
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
          {f.short}
        </span>
      </div>
    </div>
  )
}

function OrbitDiagram() {
  return (
    <div className="relative w-full max-w-[780px] mx-auto px-3 sm:px-6 py-10 sm:py-14">
      <div
        className="relative w-full aspect-square overflow-visible [container-type:size] hub-orbit-stage box-content p-5 sm:p-8"
        style={{
          '--hub-orbit-r': `${ORBIT_RADIUS}cqmin`,
          '--hub-card-half': '50px',
        }}
      >
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A3E635" stopOpacity="0.28" />
            <stop offset="55%" stopColor="#A3E635" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A3E635" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#F97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#A3E635" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="49" fill="url(#hub-glow)" />
        <circle
          cx="50"
          cy="50"
          r={ORBIT_RADIUS}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="0.55"
          strokeDasharray="3 4"
        />
        <circle
          cx="50"
          cy="50"
          r={ORBIT_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="0.2"
        />
        <circle cx="50" cy="50" r={HUB_RING_RADIUS} fill="rgba(163,230,53,0.04)" />
        <circle cx="50" cy="50" r={HUB_RING_RADIUS} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" />

        {facilities.map((f) => {
          const end = polarToXY(f.angle)
          return (
            <g key={f.id}>
              <line
                x1="50"
                y1="50"
                x2={end.x}
                y2={end.y}
                stroke={f.color}
                strokeWidth="0.65"
                strokeLinecap="round"
                opacity="0.22"
              />
              <line
                x1="50"
                y1="50"
                x2={end.x}
                y2={end.y}
                stroke={f.color}
                strokeWidth="0.25"
                strokeLinecap="round"
                strokeDasharray="1.2 2"
                opacity="0.5"
              />
              <circle cx={end.x} cy={end.y} r="1.2" fill={f.color} opacity="0.5" />
            </g>
          )
        })}
        <circle cx="50" cy="50" r="2.2" fill="#1a1a1a" opacity="0.15" />
        <circle cx="50" cy="50" r="1.1" fill="#A3E635" />
      </svg>

      {/* Center hub — above facility nodes */}
      <div className="absolute left-1/2 top-1/2 z-30 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 w-[min(68%,260px)] sm:w-[min(62%,280px)] max-w-[300px]">
        <div className="relative w-full">
          <div
            className="absolute -inset-[3px] rounded-[1.4rem] opacity-70 blur-[1px]"
            style={{
              background: 'linear-gradient(135deg, #A3E635 0%, #F97316 45%, #A3E635 100%)',
            }}
          />
          <div className="relative rounded-2xl sm:rounded-[1.35rem] bg-white border border-white/90 shadow-lime overflow-hidden">
            <div className="bg-gradient-to-r from-[#1a1a1a] via-[#252525] to-[#1a1a1a] px-5 py-2.5 text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white">
                DRIV HUB
              </p>
              <p className="text-[9px] sm:text-[10px] text-white/55 mt-0.5 font-medium tracking-wide">
                Command Center
              </p>
            </div>

            <div className="relative px-4 pt-4 pb-1 sm:px-6 sm:pt-5 sm:pb-2 bg-gradient-to-b from-[#eef4e6] via-[#f8faf5] to-white overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-[100%] bg-[#1a1a1a]/[0.07] blur-md" />
              <img
                src={HUB_BUILDING}
                alt="DRIV HUB campus"
                className="relative z-[1] w-full h-auto object-contain object-bottom max-h-[140px] sm:max-h-[180px] mx-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
              />
            </div>

            <div className="px-5 py-4 sm:px-6 sm:py-5 border-t-2 border-[#A3E635]/30 bg-[#eef4e6] text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-[#A3E635]/25 mb-2">
                <IconMapPin size={20} className="text-[#65a30d]" stroke={2} />
              </span>
              <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Bhiwandi Logistics Park
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                Bhiwandi, Maharashtra, India
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-[#A3E635]/15 bg-white">
              {hubStats.map(({ label, Icon }, i) => (
                <p
                  key={label}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-3.5 text-[10px] sm:text-xs font-semibold text-gray-700 ${
                    i === 0 ? 'border-r border-[#A3E635]/12' : ''
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f7ef]">
                    <Icon size={16} className="text-[#65a30d] shrink-0" stroke={2} />
                  </span>
                  <span className="leading-snug">{label}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {facilities.map((f) => (
        <OrbitFacility key={f.id} f={f} />
      ))}
      </div>
    </div>
  )
}

export default function DrivHubSection() {
  return (
    <section
      id="hub"
      className="relative py-10 sm:py-14 md:py-20 lg:py-24 overflow-x-clip section-sep bg-[#f6f7f4]"
    >
      <div
        className="absolute left-0 top-1/4 w-[min(520px,55vw)] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="absolute right-0 bottom-1/4 w-[min(400px,45vw)] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163,230,53,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163,230,53,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-24">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 text-[#65a30d] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3">
            <span className="w-6 h-px bg-[#A3E635]/60" />
            Operations Hub
            <span className="w-6 h-px bg-[#A3E635]/60" />
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-2">
            The DRIV <span className="gradient-text-orange">HUB</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            India&apos;s fleet operations, unified at one address —{' '}
            <span className="font-semibold text-gray-800">Bhiwandi Logistics Park</span>, where
            washing, parking, GPS monitoring, dispatch, and driver support run around the clock.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-br from-[#A3E635]/50 via-white to-[#F97316]/40 shadow-[0_20px_60px_rgba(163,230,53,0.12),0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="rounded-2xl sm:rounded-3xl bg-white overflow-visible">
              <div className="px-5 sm:px-8 py-4 border-b border-gray-100 bg-gradient-to-r from-[#fafaf8] via-white to-[#fffaf5] flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#65a30d]">
                    Campus layout
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1 leading-snug">
                    Bhiwandi Logistics Park
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-relaxed">
                    Five on-site facilities connected to one central command hub
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a1a] text-[10px] sm:text-xs font-semibold text-white shrink-0">
                  <IconMapPin size={13} className="text-[#A3E635]" stroke={2} />
                  Bhiwandi, MH
                </span>
              </div>

              <div className="relative px-1 sm:px-2 py-8 sm:py-12 bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.06)_0%,transparent_65%)] overflow-visible">
                <OrbitDiagram />
              </div>

              <div className="px-5 sm:px-8 py-4 border-t border-gray-100 bg-[#fafaf8] text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto sm:mx-0">
                  <span className="font-semibold text-[#65a30d]">Green</span> — washing, monitoring
                  &amp; help desk &nbsp;·&nbsp;{' '}
                  <span className="font-semibold text-[#ea6c0a]">Orange</span> — fleet parking
                  &amp; dispatch
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-2">
          {highlights.map(({ label, color }) => (
            <span
              key={label}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                color === 'lime'
                  ? 'border border-[#A3E635]/35 text-[#65a30d] bg-white shadow-sm'
                  : 'border border-[#F97316]/35 text-[#ea6c0a] bg-white shadow-sm'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .hub-orbit-stage { --hub-card-half: 55px; }
        }
      `}</style>
    </section>
  )
}
