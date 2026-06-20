import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconTruck, IconRoute, IconBolt, IconBike } from '@tabler/icons-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HOLD = 0.45          // hold phase as fraction of each zone's scroll window
const SCROLL_MULT = 1.5    // screen-heights of scroll per zone

const CSS_KEYFRAMES = `
  @keyframes driv-grid-drift {
    from { transform: translateY(0);    }
    to   { transform: translateY(52px); }
  }
  @keyframes driv-dot-pulse {
    0%, 100% { opacity: 1;    }
    50%       { opacity: 0.3; }
  }
  @keyframes driv-drive {
    0%   { transform: translateY(0px)     rotate(-0.5deg); }
    18%  { transform: translateY(-4px)    rotate(0.25deg); }
    36%  { transform: translateY(-1.5px)  rotate(-0.15deg); }
    55%  { transform: translateY(-5px)    rotate(0.3deg); }
    74%  { transform: translateY(-2px)    rotate(-0.2deg); }
    100% { transform: translateY(0px)     rotate(-0.5deg); }
  }
  @keyframes driv-scooty {
    0%   { transform: translateY(0px)    rotate(-1.8deg); }
    22%  { transform: translateY(-7px)   rotate(0.6deg);  }
    48%  { transform: translateY(-3px)   rotate(-1deg);   }
    72%  { transform: translateY(-8px)   rotate(0.8deg);  }
    100% { transform: translateY(0px)    rotate(-1.8deg); }
  }
  @keyframes driv-building-float {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-4px); }
  }
`

const ZONES = [
  {
    id: 'fleet', index: 0,
    Icon: IconTruck, color: '#A3E635', glowRgb: '163,230,53',
    tag: 'Fleet Operations',
    title: 'Enterprise Dedicated Fleet',
    desc: 'Dedicated fleet solutions tailored to your business with reliable vehicles, drivers, and end-to-end operational support.',
    from: 'Warehouse', to: 'Dark Store',
    scene: {
      fromImg: '/scenes/building-warehouse.webp',
      vehicle:  '/vehicles/tata_ace.webp',
      toImg:    '/scenes/building-hub.webp',
    },
  },
  {
    id: 'linehaul', index: 1,
    Icon: IconRoute, color: '#F97316', glowRgb: '249,115,22',
    tag: 'Linehaul',
    title: 'Linehaul Logistics',
    desc: 'Efficient intercity and hub-to-hub transportation designed for seamless long-distance freight movement.',
    from: 'Warehouse', to: 'Warehouse',
    scene: {
      fromImg: '/scenes/building-warehouse.webp',
      vehicle:  '/vehicles/truck.webp',
      toImg:    '/scenes/building-warehouse.webp',
    },
  },
  {
    id: 'adhoc', index: 2,
    Icon: IconBolt, color: '#F97316', glowRgb: '249,115,22',
    tag: 'Adhoc Deploy',
    title: 'Adhoc Vehicle Support',
    desc: 'On-demand vehicle availability to handle urgent deliveries, peak demand, and temporary logistics requirements.',
    from: 'DRIV Hub', to: 'Warehouse',
    scene: {
      fromImg: '/scenes/building-hub.webp',
      toImg:    '/scenes/building-warehouse.webp',
      vehicle:  '/vehicles/tata_ace.webp',
      extra:    '/vehicles/tata_tempo.webp',
      extra2:   '/vehicles/truck.webp',
    },
  },
  {
    id: 'quick', index: 3,
    Icon: IconBike, color: '#A3E635', glowRgb: '163,230,53',
    tag: 'Quick Commerce',
    title: 'Quick Commerce Riders',
    desc: 'Fast and dependable rider network for hyperlocal, same-day, and instant deliveries.',
    from: 'Dark Store', to: 'Doorstep',
    scene: {
      fromImg: '/scenes/building-hub.webp',
      vehicle:  '/vehicles/scooty.webp',
      toImg:    '/scenes/customer-house.webp',
    },
  },
]

function makeTheme(isDark) {
  return isDark ? {
    sectionBg:           '#050b18',
    dotColor:            'rgba(255,255,255,0.05)',
    heading:             '#ffffff',
    labelText:           'rgba(255,255,255,0.26)',
    subtitleColor:       '#f1f5f9',
    zoneTitle:           '#ffffff',
    zoneDesc:            '#cbd5e1',
    watermark:           'rgba(255,255,255,0.025)',
    systemLabel:         'rgba(255,255,255,0.10)',
    routeLine:           'rgba(255,255,255,0.06)',
    destDot:             'rgba(255,255,255,0.20)',
    destText:            'rgba(255,255,255,0.40)',
    telemetryLabel:      'rgba(255,255,255,0.18)',
    cardBorder:          'rgba(255,255,255,0.07)',
    cardBg:              'linear-gradient(135deg, #0d0d0d 0%, #020202 100%)',
    cardShadow: (g) =>  `0 48px 110px rgba(0,0,0,0.72), 0 0 0 1px rgba(255,255,255,0.025), 0 0 90px rgba(${g},0.12)`,
    progressInactive:    'rgba(255,255,255,0.13)',
    progressTrack:       'rgba(255,255,255,0.03)',
    vignette:            'rgba(0,0,0,0.44)',
    glowOpacity:         0.16,
    scrollHint:          'rgba(255,255,255,0.16)',
  } : {
    sectionBg:           '#f0f4f8',
    dotColor:            'rgba(0,0,0,0.055)',
    heading:             '#0f172a',
    labelText:           'rgba(15,23,42,0.38)',
    subtitleColor:       '#111827',
    zoneTitle:           '#0f172a',
    zoneDesc:            '#374151',
    watermark:           'rgba(0,0,0,0.028)',
    systemLabel:         'rgba(15,23,42,0.14)',
    routeLine:           'rgba(0,0,0,0.07)',
    destDot:             'rgba(0,0,0,0.18)',
    destText:            'rgba(15,23,42,0.42)',
    telemetryLabel:      'rgba(15,23,42,0.30)',
    cardBorder:          'rgba(0,0,0,0.09)',
    cardBg:              'linear-gradient(135deg, #0c1f48 0%, #060f2c 100%)',
    cardShadow: (g) =>  `0 28px 70px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.06), 0 0 60px rgba(${g},0.09)`,
    progressInactive:    'rgba(0,0,0,0.12)',
    progressTrack:       'rgba(0,0,0,0.05)',
    vignette:            'rgba(0,0,0,0.06)',
    glowOpacity:         0.12,
    scrollHint:          'rgba(15,23,42,0.24)',
  }
}

function RouteTelemetry({ zone, T }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
            background: zone.color, boxShadow: `0 0 6px ${zone.color}` }} />
          <span style={{ color: zone.color, fontSize: '10px', fontWeight: 800,
            letterSpacing: '0.15em', textTransform: 'uppercase' }}>{zone.from}</span>
        </div>
        <span style={{ display: 'block', marginLeft: '11px', color: T.telemetryLabel,
          fontSize: '8px', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
          Origin
        </span>
      </div>

      <div style={{ flex: 1, paddingTop: '5px', minWidth: '18px', maxWidth: '70px' }}>
        <div style={{ height: '1px',
          background: `linear-gradient(90deg, ${zone.color}50, ${T.routeLine} 70%, transparent)` }} />
      </div>

      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
            background: T.destDot }} />
          <span style={{ color: T.destText, fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase' }}>{zone.to}</span>
        </div>
        <span style={{ display: 'block', marginLeft: '11px', color: T.telemetryLabel,
          fontSize: '8px', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
          Destination
        </span>
      </div>
    </div>
  )
}

function ZoneText({ zone, isDesktop, offset, T }) {
  const ZIcon = zone.Icon
  return (
    <div style={{ position: 'relative', maxWidth: isDesktop ? '440px' : '100%' }}>

      {isDesktop && (
        <div aria-hidden style={{
          position: 'absolute', top: '30%', left: '-8px',
          transform: `translateY(-50%) translateX(${offset * 10}vw)`,
          fontSize: 'clamp(100px, 15vw, 190px)', fontWeight: 900,
          letterSpacing: '-0.06em', lineHeight: 1,
          color: T.watermark,
          userSelect: 'none', pointerEvents: 'none',
          fontFamily: 'var(--font-heading, inherit)', zIndex: 0, whiteSpace: 'nowrap',
        }}>
          {zone.tag.split(' ')[0]}
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1, paddingLeft: '18px' }}>

        <div style={{
          position: 'absolute', left: 0, top: '4px', height: '70%',
          width: '2px', borderRadius: '1px',
          background: `linear-gradient(to bottom, ${zone.color}90, ${zone.color}30, transparent)`,
          boxShadow: `0 0 10px ${zone.color}50`,
        }} />

        <h3 style={{
          fontFamily: 'var(--font-heading, inherit)', fontWeight: 900,
          fontSize: isDesktop ? 'clamp(28px, 3.4vw, 52px)' : 'clamp(22px, 6.5vw, 36px)',
          lineHeight: 1.06, letterSpacing: '-0.025em',
          color: T.zoneTitle, marginBottom: '14px',
          transition: 'color 0.5s ease',
        }}>
          {zone.title}
        </h3>

        <p style={{
          fontSize: isDesktop ? 'clamp(14px, 1.1vw, 17px)' : '14px',
          lineHeight: 1.75, fontWeight: 400,
          color: T.zoneDesc, marginBottom: '24px',
          transition: 'color 0.5s ease',
        }}>
          {zone.desc}
        </p>

        <RouteTelemetry zone={zone} T={T} />

      </div>
    </div>
  )
}

function ZoneCard({ zone, isDesktop, T, travelProgress = 0 }) {
  const { scene, color, glowRgb, tag, title } = zone
  // Vehicle travels from near from-building (left) to near to-building (right)
  const mainPct      = 22 + travelProgress * 56
  // Parabolic gap: 0 at origin, peaks mid-travel, 0 at destination (adhoc)
  const extraGap     = 28 * 4 * travelProgress * (1 - travelProgress)
  const extraLeft    = `${mainPct - extraGap}%`

  // Adhoc 3-vehicle convoy: staggered one-by-one departure (Ace → Tempo → Truck)
  const isConvoy = zone.id === 'adhoc'
  const _ss = t => t * t * (3 - 2 * t)
  const _cl = t => Math.max(0, Math.min(1, t))
  // Convoy: truck departs first, ace enters from off-screen at 0.10, tempo at 0.20
  // Vehicles slide in from behind the hub as the lead departs — no overlap at origin
  const convoyF1 = _ss(_cl(travelProgress / 0.80))
  const convoyF2 = _ss(_cl((travelProgress - 0.10) / 0.80))
  const convoyF3 = _ss(_cl((travelProgress - 0.20) / 0.80))
  // Truck parked at hub (32%), ace & tempo start off-screen left (-15%, -35%)
  // All converge at 78% (warehouse)
  const vehicleLeft  = isConvoy ? `${32 + convoyF1 * 46}%` : `${mainPct}%`
  const convoy2Left  = `${-15 + convoyF2 * 93}%`
  const convoy3Left  = `${-35 + convoyF3 * 113}%`
  return (
    <div style={{
      position: 'relative',
      width: isDesktop ? 'min(62vw, 840px)' : 'min(88vw, 480px)',
      aspectRatio: '1857 / 847',
      borderRadius: isDesktop ? '18px' : '13px',
      overflow: 'hidden',
      border: `1px solid ${T.cardBorder}`,
      boxShadow: T.cardShadow(glowRgb),
      transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
    }}>

      {/* Card background — black in dark mode, deep navy in light mode */}
      <div style={{
        position: 'absolute', inset: 0,
        background: T.cardBg,
        transition: 'background 0.5s ease',
      }} />

      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }} />

      {/* Atmospheric sky gradient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(to bottom, rgba(8,14,28,0.0) 0%, rgba(4,8,18,0.5) 60%, rgba(0,0,0,0.85) 100%)`,
      }} />

      {/* Zone color radial glow at base */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 90% 65% at 50% 110%, rgba(${glowRgb},0.32) 0%, transparent 70%)`,
      }} />

      {/* Realistic road */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '28%', pointerEvents: 'none',
      }}>
        {/* Asphalt base */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, #242424 0%, #161616 55%, #0e0e0e 100%)',
        }} />
        {/* Top kerb edge */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 2%, #404040 20%, #404040 80%, transparent 98%)',
        }} />
        {/* Dashed centre line */}
        <div style={{
          position: 'absolute', top: '46%', left: '8%', right: '8%',
          height: '2px',
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,210,0.45) 0px, rgba(255,255,210,0.45) 22px, transparent 22px, transparent 46px)',
        }} />
        {/* Zone ambient glow on road surface */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 70% 100% at 50% 100%, rgba(${glowRgb},0.20) 0%, transparent 72%)`,
        }} />
      </div>

      {/* From building — left, floats gently */}
      {scene.fromImg && (
        <div style={{
          position: 'absolute', bottom: 0, left: '1%',
          width: '30%', height: '76%',
          animation: 'driv-building-float 5s ease-in-out infinite',
          pointerEvents: 'none',
        }}>
          <img src={scene.fromImg} alt="" draggable={false} style={{
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'bottom left',
            filter: `drop-shadow(0 0 18px rgba(${glowRgb},0.32))`,
          }} />
        </div>
      )}

      {/* To building — right, floats with offset */}
      {scene.toImg && (
        <div style={{
          position: 'absolute', bottom: 0, right: '1%',
          width: '26%', height: '64%',
          animation: 'driv-building-float 5s ease-in-out infinite 1.6s',
          pointerEvents: 'none',
        }}>
          <img src={scene.toImg} alt="" draggable={false} style={{
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'bottom right',
            filter: `drop-shadow(0 0 14px rgba(${glowRgb},0.28))`,
          }} />
        </div>
      )}

      {/* Route connector */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: scene.fromImg ? '27%' : '8%',
        right: scene.toImg ? '24%' : '8%',
        height: '3px',
        background: `linear-gradient(90deg, transparent, ${color}70 20%, ${color} 50%, ${color}70 80%, transparent)`,
        boxShadow: `0 0 16px ${color}90, 0 0 32px ${color}45`,
        pointerEvents: 'none',
      }} />

      {/* Linehaul convoy: trucks 3 & 2 (rendered behind truck 1/main) */}
      {isConvoy && (
        <>
          {/* Vehicle 3 — Tata Tempo, rear, enters last from off-screen */}
          <div style={{
            position: 'absolute', bottom: '4%',
            left: convoy3Left, transform: 'translateX(-50%)',
            width: '20%', height: '26%',
            pointerEvents: 'none', zIndex: 1,
          }}>
            <img src={scene.extra} alt="" draggable={false} style={{
              width: '100%', height: '100%', objectFit: 'contain',
              filter: `drop-shadow(0 0 16px rgba(${glowRgb},0.32)) drop-shadow(0 5px 12px rgba(0,0,0,0.60))`,
              animation: 'driv-drive 3.4s ease-in-out infinite 0.9s',
              transformOrigin: 'center bottom',
            }} />
          </div>
          {/* Vehicle 2 — Tata Ace, middle, enters second from off-screen */}
          <div style={{
            position: 'absolute', bottom: '4%',
            left: convoy2Left, transform: 'translateX(-50%)',
            width: '28%', height: '34%',
            pointerEvents: 'none', zIndex: 2,
          }}>
            <img src={scene.vehicle} alt="" draggable={false} style={{
              width: '100%', height: '100%', objectFit: 'contain',
              filter: `drop-shadow(0 0 20px rgba(${glowRgb},0.45)) drop-shadow(0 6px 14px rgba(0,0,0,0.62))`,
              animation: 'driv-drive 3.5s ease-in-out infinite 0.45s',
              transformOrigin: 'center bottom',
            }} />
          </div>
        </>
      )}

      {/* Extra vehicle — parabolic gap trailing (non-convoy zones only) */}
      {scene.extra && !isConvoy && (
        <div style={{
          position: 'absolute', bottom: '3%',
          left: extraLeft,
          transform: 'translateX(-50%)',
          width: '28%', height: '36%',
          animation: 'driv-drive 3.4s ease-in-out infinite 0.8s',
          transformOrigin: 'center bottom',
          pointerEvents: 'none', zIndex: 1,
        }}>
          <img src={scene.extra} alt="" draggable={false} style={{
            width: '100%', height: '100%',
            objectFit: 'contain',
            filter: `drop-shadow(0 0 16px rgba(${glowRgb},0.32)) drop-shadow(0 5px 12px rgba(0,0,0,0.60))`,
          }} />
        </div>
      )}

      {/* Main vehicle — scroll-driven travel from origin to destination */}
      <div style={{
        position: 'absolute', bottom: '4%',
        left: vehicleLeft, transform: 'translateX(-50%)',
        width: '38%', height: '46%',
        pointerEvents: 'none', zIndex: isConvoy ? 3 : 2,
      }}>
        <img src={isConvoy ? scene.extra2 : scene.vehicle} alt={title} draggable={false} style={{
          width: '100%', height: '100%',
          objectFit: 'contain',
          filter: `drop-shadow(0 0 26px rgba(${glowRgb},0.58)) drop-shadow(0 8px 16px rgba(0,0,0,0.65))`,
          animation: zone.id === 'quick'
            ? 'driv-scooty 2.4s ease-in-out infinite'
            : 'driv-drive 3.6s ease-in-out infinite',
          transformOrigin: 'center bottom',
        }} />
      </div>

      {/* Colour tint */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(135deg, ${color}08 0%, transparent 40%, rgba(0,0,0,0.10) 100%)`,
      }} />

      {/* Top label bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, padding: '11px 16px',
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.80), transparent)',
        pointerEvents: 'none', zIndex: 3,
      }}>
        <span style={{ color, fontSize: '11px', fontWeight: 800,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          textShadow: `0 0 8px ${color}65` }}>{tag}</span>
        <span style={{ width: '1px', height: '9px', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%',
            background: '#4ade80', boxShadow: '0 0 5px #4ade80',
            animation: 'driv-dot-pulse 2s ease-in-out infinite' }} />
          <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: '8px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase' }}>Live</span>
        </span>
      </div>

      {/* Bottom edge accent */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent 5%, ${color}60 35%, ${color}75 50%, ${color}60 65%, transparent 95%)`,
        pointerEvents: 'none', zIndex: 3,
      }} />
    </div>
  )
}

function ZoneScene({ zone, pos, seg, scrollDir, isDesktop, T }) {
  const offset = zone.index - pos
  const dist   = Math.abs(offset)
  const cd     = Math.min(dist, 1)

  const opacity   = Math.max(0, 1 - cd * cd * (3 - 2 * cd))
  const textScale = 1 - cd * 0.06
  const textBlur  = cd * 3
  const cardBlur  = cd * 5
  const z         = Math.round(100 - dist * 10)

  const textTD = `translate3d(${offset * -42}vw, ${offset * 3}vh, 0) rotateY(${offset * 5}deg) scale(${textScale})`
  const cardTD = `translate3d(${offset * 34}vw, ${offset * 4}vh, 0) rotateY(${offset * -8}deg)`
  const textTM = `translate3d(0, ${offset * -38}vh, 0) scale(${textScale})`
  const cardTM = `translate3d(0, ${offset * 44}vh, 0) rotate(${offset * 5}deg)`

  // Per-zone vehicle travel: 0 = at origin building, 1 = at destination building
  const STEPS = ZONES.length - 1
  const isLastZone = zone.index === STEPS
  // Last zone has two travel windows: entry (down) vs end-hold (up)
  // Other zones use the HOLD phase which is always visible (card stationary)
  // Last zone going UP uses rawSeg [STEPS, STEPS+HOLD] — card is pinned, fully visible
  let travelStart, travelDur
  if (isLastZone && scrollDir < 0) {
    travelStart = STEPS           // 3.0 — start of end-hold
    travelDur   = HOLD            // 0.45
  } else if (isLastZone) {
    travelStart = (STEPS - 1) + HOLD  // 2.45 — entry transition
    travelDur   = 1 - HOLD             // 0.55
  } else {
    travelStart = zone.index
    travelDur   = HOLD
  }
  const downRaw    = Math.max(0, Math.min(1, (seg - travelStart) / travelDur))
  // When going up, invert so vehicle always travels origin → destination
  const rawTravel  = scrollDir >= 0 ? downRaw : (1 - downRaw)
  const travelProgress = rawTravel * rawTravel * (3 - 2 * rawTravel) // smoothstep

  return (
    <div className="absolute inset-0 select-none"
      style={{ zIndex: z, pointerEvents: dist < 0.5 ? 'auto' : 'none',
        contain: 'layout style', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>

      {isDesktop ? (
        <>
          <div className="absolute inset-0 flex items-center pointer-events-none"
            style={{ paddingTop: '10vh', paddingBottom: '8vh', paddingLeft: 'clamp(48px, 7vw, 112px)',
              perspective: '1600px', perspectiveOrigin: '50% 50%' }}>
            <div style={{ transform: textTD,
              filter: textBlur > 0.05 ? `blur(${textBlur}px)` : 'none',
              opacity, willChange: 'transform, opacity',
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <ZoneText zone={zone} isDesktop offset={offset} T={T} />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-end pointer-events-none"
            style={{ paddingTop: '10vh', paddingBottom: '8vh', paddingRight: 'clamp(36px, 5vw, 80px)',
              perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
            <div style={{ transform: cardTD,
              filter: cardBlur > 0.05 ? `blur(${cardBlur}px)` : 'none',
              opacity, willChange: 'transform, opacity',
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <ZoneCard zone={zone} isDesktop T={T} travelProgress={travelProgress} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none"
            style={{ paddingTop: '18vh', paddingLeft: '20px', paddingRight: '20px' }}>
            <div style={{ transform: textTM,
              filter: textBlur > 0.05 ? `blur(${textBlur}px)` : 'none',
              opacity, willChange: 'transform, opacity',
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <ZoneText zone={zone} isDesktop={false} offset={offset} T={T} />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none"
            style={{ paddingBottom: '10vh', paddingLeft: '16px', paddingRight: '16px' }}>
            <div style={{ transform: cardTM,
              filter: cardBlur > 0.05 ? `blur(${cardBlur}px)` : 'none',
              opacity, willChange: 'transform, opacity',
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <ZoneCard zone={zone} isDesktop={false} T={T} travelProgress={travelProgress} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function DrivWorldSection() {
  const viewportRef  = useRef(null)
  const scrollDirRef = useRef(1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true
  )

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    obs.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const viewport = viewportRef.current
      if (!viewport) return
      const steps = ZONES.length - 1
      ScrollTrigger.create({
        trigger: viewport, pin: true, pinSpacing: true,
        start: 'top top',
        end: () => `+=${(steps + HOLD) * window.innerHeight * SCROLL_MULT}`,
        scrub: 1.6, anticipatePin: 1, invalidateOnRefresh: true,
        fastScrollEnd: true, preventOverlaps: true,
        onUpdate(self) { scrollDirRef.current = self.direction; setScrollProgress(self.progress) },
        // Reset scroll state when leaving so sections below render cleanly
        onLeave()      { setScrollProgress(1) },
        onLeaveBack()  { setScrollProgress(0) },
      })
    }, viewportRef)
    return () => ctx.revert()
  }, [])

  const T = makeTheme(isDark)

  const steps      = ZONES.length - 1
  const rawSeg     = scrollProgress * (steps + HOLD)   // 0 → 3.45 (includes end hold)
  const clampedSeg = Math.min(rawSeg, steps)            // 0 → 3.0  (for card positioning)
  const seg        = rawSeg                             // full range passed to ZoneScene for vehicle travel
  const i          = Math.min(steps - 1, Math.floor(clampedSeg))
  const f          = clampedSeg - i
  const t          = f <= HOLD ? 0 : (f - HOLD) / (1 - HOLD)
  const eased      = t * t * t * (t * (t * 6 - 15) + 10)
  const pos        = i + eased
  const activeZone  = Math.round(pos)
  const activeColor   = ZONES[activeZone]?.color    ?? '#A3E635'
  const activeGlowRgb = ZONES[activeZone]?.glowRgb  ?? '163,230,53'

  return (
    <div ref={viewportRef} className="relative w-full overflow-hidden"
      style={{ height: '100svh', background: T.sectionBg, transition: 'background 0.5s ease',
        isolation: 'isolate', willChange: 'transform' }}>

      <style>{CSS_KEYFRAMES}</style>

      {/* Dot grid */}
      <div className="absolute pointer-events-none" style={{
        inset: '-52px 0 0 0', overflow: 'hidden',
        backgroundImage: `radial-gradient(circle, ${T.dotColor} 1px, transparent 1px)`,
        backgroundSize: '52px 52px',
        animation: 'driv-grid-drift 10s linear infinite',
      }} />

      {/* Scan-line texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px)',
      }} />

      {/* Dynamic zone glow — opacity transition is GPU-composited, background transition is not */}
      {ZONES.map(zone => (
        <div key={zone.id} className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 70% 52% at 62% 55%, rgba(${zone.glowRgb},${T.glowOpacity}) 0%, transparent 65%)`,
          opacity: activeZone === zone.index ? 1 : 0,
          transition: 'opacity 0.9s ease',
          willChange: 'opacity',
        }} />
      ))}

      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 46%, ${T.vignette} 100%)`,
        transition: 'background 0.5s ease',
      }} />

      {/* Left-edge scroll progress track */}
      <div className="absolute left-0 z-50 pointer-events-none overflow-hidden"
        style={{ top: '14vh', bottom: '10vh', width: '3px', background: T.progressTrack }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: `linear-gradient(to bottom, ${activeColor}90, ${activeColor}30)`,
          boxShadow: `1px 0 8px ${activeColor}50`,
          transform: `scaleY(${scrollProgress})`,
          transformOrigin: 'top',
          willChange: 'transform',
          transition: 'background 0.9s ease, box-shadow 0.9s ease',
        }} />
      </div>

      {/* Section header */}
      <div className="absolute top-0 inset-x-0 z-50 text-center pointer-events-none px-5 pt-[3vh] sm:pt-[2.5vh]">
        <div className="flex items-center justify-center gap-2 mb-5">
          <span style={{ width: '32px', height: '1px', background: `${activeColor}60`, flexShrink: 0,
            transition: 'background 0.9s ease' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
            background: activeColor, boxShadow: `0 0 6px ${activeColor}`,
            transition: 'background 0.9s ease, box-shadow 0.9s ease',
            animation: 'driv-dot-pulse 2.5s ease-in-out infinite' }} />
          <span className="text-sm font-bold uppercase tracking-[0.3em]"
            style={{ color: activeColor, transition: 'color 0.9s ease' }}>
            What We Do
          </span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
            background: activeColor, boxShadow: `0 0 6px ${activeColor}`,
            transition: 'background 0.9s ease, box-shadow 0.9s ease',
            animation: 'driv-dot-pulse 2.5s ease-in-out infinite 1.25s' }} />
          <span style={{ width: '32px', height: '1px', background: `${activeColor}60`, flexShrink: 0,
            transition: 'background 0.9s ease' }} />
        </div>

      </div>

      {/* Zone scenes */}
      <div className="relative w-full h-full">
        {ZONES.map((zone) => (
          <ZoneScene key={zone.id} zone={zone} pos={pos} seg={seg} scrollDir={scrollDirRef.current} isDesktop={isDesktop} T={T} />
        ))}
      </div>

      {/* Progress pills */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-50 flex items-center justify-center gap-2 pointer-events-none">
        {ZONES.map((zone, idx) => {
          const active = activeZone === idx
          return (
            <div key={zone.id} style={{
              height: '4px', width: active ? '36px' : '14px', borderRadius: '2px',
              background: active ? zone.color : T.progressInactive,
              boxShadow: active ? `0 0 8px ${zone.color}80` : 'none',
              transition: 'all 0.55s cubic-bezier(0.16,1,0.3,1)',
            }} />
          )
        })}
      </div>

      {/* Scroll hint */}
      <AnimatePresence>
        {activeZone === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute bottom-6 sm:bottom-8 right-5 sm:right-7 z-50 hidden sm:flex items-center gap-1.5 pointer-events-none"
            style={{ color: T.scrollHint }}>
            <span style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.28em' }}>Scroll</span>
            <motion.span animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '11px', lineHeight: 1 }}>›</motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
