import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconTruck, IconRoute, IconBolt, IconBike } from '@tabler/icons-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HOLD        = 0.45
const SCROLL_MULT = 1.5
const CARD_TOP    = 44
const BAR_H       = 54

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
    id: 'fleet', index: 0, noGlow: true,
    Icon: IconTruck, color: '#A3E635', glowRgb: '163,230,53',
    tag: 'Fleet Operations',
    title: 'Enterprise Dedicated Fleet',
    desc: 'Dedicated fleet solutions tailored to your business with reliable vehicles, drivers, and end-to-end operational support.',
    from: 'Warehouse', to: 'Dark Store',
    scene: {
      fromImg: '/scenes/building-warehouse.webp',
      vehicle:  '/vehicles/tata_ace.webp',
      toImg:    '/scenes/dispatch-hub.webp',
    },
  },
  {
    id: 'linehaul', index: 1, noGlow: true,
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
    id: 'adhoc', index: 2, noGlow: true,
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
    id: 'quick', index: 3, noGlow: true,
    Icon: IconBike, color: '#A3E635', glowRgb: '163,230,53',
    tag: 'Quick Commerce',
    title: 'Quick Commerce Riders',
    desc: 'Fast and dependable rider network for hyperlocal, same-day, and instant deliveries.',
    from: 'Dark Store', to: 'Doorstep',
    scene: {
      fromImg: '/scenes/dispatch-hub.webp',
      vehicle:  '/vehicles/scooty.webp',
      toImg:    '/scenes/customer-house.webp',
    },
  },
]

function makeTheme(isDark) {
  return isDark ? {
    sectionBg:        '#050b18',
    dotColor:         'rgba(255,255,255,0.05)',
    cardBorder:       'rgba(255,255,255,0.09)',
    cardBg:           'linear-gradient(160deg, #101010 0%, #050505 100%)',
    cardShadow: (g) => `0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.55), 0 40px 100px rgba(0,0,0,0.65), 0 0 80px rgba(${g},0.11), inset 0 1px 0 rgba(255,255,255,0.05)`,
    progressInactive: 'rgba(255,255,255,0.13)',
    progressTrack:    'rgba(255,255,255,0.03)',
    vignette:         'rgba(0,0,0,0.44)',
    glowOpacity:      0.16,
    scrollHint:       'rgba(255,255,255,0.16)',
    routeLine:        'rgba(255,255,255,0.06)',
    destDot:          'rgba(255,255,255,0.20)',
    destText:         'rgba(255,255,255,0.40)',
    telemetryLabel:   'rgba(255,255,255,0.18)',
  } : {
    sectionBg:        '#f0f4f8',
    dotColor:         'rgba(0,0,0,0.055)',
    cardBorder:       'rgba(0,0,0,0.12)',
    cardBg:           '#111827',
    cardShadow: (g) => `0 0 0 1px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.14), 0 32px 80px rgba(0,0,0,0.18), 0 0 60px rgba(${g},0.08), inset 0 1px 0 rgba(255,255,255,0.06)`,
    progressInactive: 'rgba(0,0,0,0.12)',
    progressTrack:    'rgba(0,0,0,0.05)',
    vignette:         'rgba(0,0,0,0.06)',
    glowOpacity:      0.12,
    scrollHint:       'rgba(15,23,42,0.24)',
    routeLine:        'rgba(255,255,255,0.10)',
    destDot:          'rgba(255,255,255,0.30)',
    destText:         'rgba(255,255,255,0.50)',
    telemetryLabel:   'rgba(255,255,255,0.28)',
  }
}

function RouteTelemetry({ zone, T }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* FROM */}
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
          background: zone.color, boxShadow: `0 0 6px ${zone.color}` }} />
        <span style={{ color: zone.color, fontSize: '10px', fontWeight: 800,
          letterSpacing: '0.15em', textTransform: 'uppercase' }}>{zone.from}</span>
      </span>

      {/* Connector line */}
      <div style={{ flex: 1, minWidth: '18px', maxWidth: '60px', height: '1px',
        background: `linear-gradient(90deg, ${zone.color}55, ${T.routeLine} 70%, transparent)` }} />

      {/* TO */}
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
          background: T.destDot }} />
        <span style={{ color: T.destText, fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.15em', textTransform: 'uppercase' }}>{zone.to}</span>
      </span>
    </div>
  )
}

// Scene panel — refs for vehicle elements passed in so GSAP can drive them directly
function ZoneScene({ zone, T, sceneRefs }) {
  const { scene, color, glowRgb, title, noGlow } = zone
  const isConvoy = zone.id === 'adhoc'
  const ga = noGlow ? 0 : 1   // glow alpha multiplier — 0 kills all colour glow

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>

      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Atmospheric sky gradient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(8,14,28,0.0) 0%, rgba(4,8,18,0.5) 60%, rgba(0,0,0,0.85) 100%)',
      }} />

      {/* Zone color radial glow at base */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 90% 65% at 50% 110%, rgba(${glowRgb},${0.32 * ga}) 0%, transparent 70%)`,
      }} />

      {/* Road */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, #242424 0%, #161616 55%, #0e0e0e 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent 2%, #404040 20%, #404040 80%, transparent 98%)' }} />
        <div style={{ position: 'absolute', top: '46%', left: '8%', right: '8%', height: '2px',
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,210,0.45) 0px, rgba(255,255,210,0.45) 22px, transparent 22px, transparent 46px)' }} />
        <div style={{ position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 70% 100% at 50% 100%, rgba(${glowRgb},${0.20 * ga}) 0%, transparent 72%)` }} />
      </div>

      {/* From building */}
      {scene.fromImg && (
        <div style={{ position: 'absolute', bottom: 0, left: '1%', width: '30%', height: '76%',
          animation: 'driv-building-float 5s ease-in-out infinite', pointerEvents: 'none' }}>
          <img src={scene.fromImg} alt="" draggable={false} style={{
            width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom left',
            filter: noGlow ? 'none' : `drop-shadow(0 0 18px rgba(${glowRgb},0.32))`,
          }} />
        </div>
      )}

      {/* To building */}
      {scene.toImg && (
        <div style={{ position: 'absolute', bottom: 0, right: '1%', width: '26%', height: '64%',
          animation: 'driv-building-float 5s ease-in-out infinite 1.6s', pointerEvents: 'none' }}>
          <img src={scene.toImg} alt="" draggable={false} style={{
            width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom right',
            filter: noGlow ? 'none' : `drop-shadow(0 0 14px rgba(${glowRgb},0.28))`,
          }} />
        </div>
      )}

      {/* Route connector */}
      <div style={{
        position: 'absolute', bottom: '15%',
        left: scene.fromImg ? '27%' : '8%',
        right: scene.toImg ? '24%' : '8%',
        height: '3px',
        background: `linear-gradient(90deg, transparent, ${color}70 20%, ${color} 50%, ${color}70 80%, transparent)`,
        boxShadow: noGlow ? 'none' : `0 0 16px ${color}90, 0 0 32px ${color}45`,
        pointerEvents: 'none',
      }} />

      {/* Convoy vehicles (adhoc) — positions driven by GSAP via sceneRefs */}
      {isConvoy && (
        <>
          <div ref={el => { sceneRefs.convoy3 = el }} style={{ position: 'absolute', bottom: '4%', left: '-35%',
            transform: 'translateX(-50%)', width: '20%', height: '26%', pointerEvents: 'none', zIndex: 1 }}>
            <img src={scene.extra} alt="" draggable={false} style={{
              width: '100%', height: '100%', objectFit: 'contain',
              filter: `drop-shadow(0 0 16px rgba(${glowRgb},0.32)) drop-shadow(0 5px 12px rgba(0,0,0,0.60))`,
              animation: 'driv-drive 3.4s ease-in-out infinite 0.9s', transformOrigin: 'center bottom',
            }} />
          </div>
          <div ref={el => { sceneRefs.convoy2 = el }} style={{ position: 'absolute', bottom: '4%', left: '-15%',
            transform: 'translateX(-50%)', width: '28%', height: '34%', pointerEvents: 'none', zIndex: 2 }}>
            <img src={scene.vehicle} alt="" draggable={false} style={{
              width: '100%', height: '100%', objectFit: 'contain',
              filter: `drop-shadow(0 0 20px rgba(${glowRgb},0.45)) drop-shadow(0 6px 14px rgba(0,0,0,0.62))`,
              animation: 'driv-drive 3.5s ease-in-out infinite 0.45s', transformOrigin: 'center bottom',
            }} />
          </div>
        </>
      )}

      {/* Extra vehicle (non-convoy) */}
      {scene.extra && !isConvoy && (
        <div ref={el => { sceneRefs.extra = el }} style={{ position: 'absolute', bottom: '3%', left: '22%',
          transform: 'translateX(-50%)', width: '28%', height: '36%',
          animation: 'driv-drive 3.4s ease-in-out infinite 0.8s',
          transformOrigin: 'center bottom', pointerEvents: 'none', zIndex: 1 }}>
          <img src={scene.extra} alt="" draggable={false} style={{
            width: '100%', height: '100%', objectFit: 'contain',
            filter: `drop-shadow(0 0 16px rgba(${glowRgb},0.32)) drop-shadow(0 5px 12px rgba(0,0,0,0.60))`,
          }} />
        </div>
      )}

      {/* Main vehicle — position driven by GSAP via sceneRefs.vehicle */}
      <div ref={el => { sceneRefs.vehicle = el }} style={{ position: 'absolute', bottom: '4%', left: '22%',
        transform: 'translateX(-50%)', width: '38%', height: '46%',
        pointerEvents: 'none', zIndex: isConvoy ? 3 : 2 }}>
        <img src={isConvoy ? scene.extra2 : scene.vehicle} alt={title} draggable={false} style={{
          width: '100%', height: '100%', objectFit: 'contain',
          filter: noGlow ? `drop-shadow(0 8px 16px rgba(0,0,0,0.65))` : `drop-shadow(0 0 26px rgba(${glowRgb},0.58)) drop-shadow(0 8px 16px rgba(0,0,0,0.65))`,
          animation: zone.id === 'quick'
            ? 'driv-scooty 2.4s ease-in-out infinite'
            : 'driv-drive 3.6s ease-in-out infinite',
          transformOrigin: 'center bottom',
        }} />
      </div>

      {/* Colour tint */}
      {!noGlow && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(135deg, ${color}08 0%, transparent 40%, rgba(0,0,0,0.10) 100%)` }} />
      )}

      {/* Bottom edge accent */}
      {!noGlow && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent 5%, ${color}60 35%, ${color}75 50%, ${color}60 65%, transparent 95%)`,
          pointerEvents: 'none', zIndex: 3,
        }} />
      )}
    </div>
  )
}

// Static card shell — GSAP drives transform/opacity directly via outerRef
function StackCard({ zone, isDesktop, T, cardH, outerRef, sceneRefs }) {
  const { color, glowRgb, noGlow } = zone
  const ZIcon = zone.Icon

  return (
    <div
      ref={outerRef}
      style={{
        position: 'absolute',
        left: '50%',
        top: `${CARD_TOP}px`,
        width: isDesktop ? 'min(94vw, 1480px)' : '94vw',
        height: `${cardH}px`,
        // transform set entirely by GSAP — do NOT put transform here
        zIndex: 10 + zone.index,
        borderRadius: isDesktop ? '20px' : '16px',
        overflow: 'hidden',
        border: `1px solid ${T.cardBorder}`,
        boxShadow: T.cardShadow(glowRgb),
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        isolation: 'isolate',
      }}
    >

      {/* Full card dark background */}
      <div style={{ position: 'absolute', inset: 0, background: T.cardBg }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
      }}>

        {/* LEFT: Text panel */}
        <div style={{
          width: isDesktop ? '38%' : '100%',
          height: isDesktop ? '100%' : '42%',
          position: 'relative',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: isDesktop
            ? 'clamp(24px,2.8vw,52px) clamp(28px,3.2vw,56px) clamp(24px,2.8vw,52px) clamp(32px,3.6vw,60px)'
            : '16px 22px',
          flexShrink: 0,
          zIndex: 2,
        }}>

          <div style={{
            position: 'absolute', left: 0, top: '15%', height: '70%',
            width: '2px', borderRadius: '0 2px 2px 0',
            background: `linear-gradient(to bottom, transparent, ${color} 30%, ${color} 70%, transparent)`,
            boxShadow: noGlow ? 'none' : `0 0 18px ${color}60`,
          }} />

          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: noGlow ? 'none' : `radial-gradient(ellipse 80% 60% at -20% 50%, rgba(${glowRgb},0.10) 0%, transparent 70%)`,
          }} />

          <h3 style={{
            fontFamily: 'var(--font-heading, inherit)', fontWeight: 900,
            fontSize: isDesktop ? 'clamp(24px,2.6vw,44px)' : 'clamp(18px,5vw,26px)',
            lineHeight: 1.06, letterSpacing: '-0.025em',
            color: '#ffffff', marginBottom: '12px',
            position: 'relative',
          }}>
            {zone.title}
          </h3>

          <p style={{
            fontSize: isDesktop ? 'clamp(13px,0.9vw,15px)' : '12px',
            lineHeight: 1.78, color: 'rgba(203,213,225,0.80)',
            marginBottom: isDesktop ? '22px' : '14px',
            maxWidth: '380px',
            position: 'relative',
          }}>
            {zone.desc}
          </p>

          <div style={{ position: 'relative' }}>
            <RouteTelemetry zone={zone} T={T} />
          </div>

        </div>

        {/* Vertical divider (desktop) */}
        {isDesktop && (
          <div style={{
            width: '1px', flexShrink: 0, alignSelf: 'stretch',
            background: `linear-gradient(to bottom, transparent 5%, ${color}28 25%, ${color}45 50%, ${color}28 75%, transparent 95%)`,
          }} />
        )}

        {/* Horizontal divider (mobile) */}
        {!isDesktop && (
          <div style={{
            height: '1px', flexShrink: 0,
            background: `linear-gradient(to right, transparent 5%, ${color}30 35%, ${color}45 50%, ${color}30 65%, transparent 95%)`,
          }} />
        )}

        {/* RIGHT: Scene panel */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
          <ZoneScene zone={zone} T={T} sceneRefs={sceneRefs} />
        </div>
      </div>

      {/* Card-level glow overlay */}
      {!noGlow && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: `linear-gradient(135deg, rgba(${glowRgb},0.05) 0%, transparent 45%)`,
        }} />
      )}

      {/* Bottom edge accent */}
      {!noGlow && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent 5%, ${color}45 30%, ${color}65 50%, ${color}45 70%, transparent 95%)`,
          pointerEvents: 'none', zIndex: 15,
        }} />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function DrivWorldSection() {
  const viewportRef = useRef(null)

  // Per-zone DOM refs — card outer div + scene vehicle elements
  const elRefs = useRef(
    ZONES.map(() => ({ card: null, vehicle: null, convoy2: null, convoy3: null, extra: null }))
  )

  // UI state — only re-renders for structural/theme changes, NOT every scroll tick
  const [activeZone, setActiveZone]   = useState(0)
  const activeZoneRef                 = useRef(0)
  const [isDesktop, setIsDesktop]     = useState(
    () => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )
  const [isDark, setIsDark]           = useState(
    () => typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true
  )
  const [vh, setVh]                   = useState(
    () => typeof window !== 'undefined' ? window.innerHeight : 800
  )

  // Set cards off-screen before first paint to prevent flash
  useLayoutEffect(() => {
    elRefs.current.forEach(r => {
      if (r.card) {
        r.card.style.transform = 'translateX(-50%) translateY(10000px)'
        r.card.style.opacity   = '0'
      }
    })
  }, [])

  // Resize handler
  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
      setVh(window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Theme observer
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark'))
    )
    obs.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // GSAP ScrollTrigger — all animation via direct DOM manipulation, zero React state per frame
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return

    const _ss = t => t * t * (3 - 2 * t)
    const _cl = t => Math.max(0, Math.min(1, t))
    const steps = ZONES.length - 1

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: vp,
        pin: true, pinSpacing: true,
        start: 'top top',
        end: () => `+=${(steps + HOLD) * window.innerHeight * SCROLL_MULT}`,
        scrub: 1,
        anticipatePin: 1, invalidateOnRefresh: true,
        fastScrollEnd: true, preventOverlaps: true,

        onUpdate(self) {
          const progress  = self.progress
          const cvh        = window.innerHeight
          const cardH      = Math.min(Math.round(cvh * 0.65), 520)
          const cardCenter = Math.round((cvh - cardH) / 2 + 44)  // +44 = half navbar height with slight upward nudge
          const rawSeg     = progress * (steps + HOLD)
          const clampedSeg = Math.min(rawSeg, steps)

          // Update progress pills only when active zone changes
          const newActive = Math.min(steps, Math.round(clampedSeg))
          if (newActive !== activeZoneRef.current) {
            activeZoneRef.current = newActive
            setActiveZone(newActive)
          }

          ZONES.forEach((zone, i) => {
            const r = elRefs.current[i]
            if (!r.card) return

            const offset = clampedSeg - i
            let cardY, opacity = 1, cardScale = 1

            // stackShift: pushes the whole group down so the stack (peeks + active card)
            // stays centred. Each past card peeks 18 px above; half that (9 px) shifts
            // the group's visual midpoint back to cardCenter.
            const stackShift = clampedSeg * 9   // 0 for card 0, +9 per zone

            if (offset < -HOLD) {
              // Not yet approaching — park below viewport
              cardY   = cvh
              opacity = 0
            } else if (offset < 0) {
              // Sliding up from below into centred position (accounting for stack)
              const t   = _ss(_cl((offset + HOLD) / HOLD))
              const dst = cardCenter + stackShift   // land at compensated centre
              cardY     = cvh - t * (cvh - dst)
              opacity   = Math.min(1, t * 2)
            } else {
              // Active (offset=0) or past — compensated centre; past cards nudge up
              // so their top edges peek above the active card.
              const depth = Math.min(offset, 3)
              cardY      = cardCenter + stackShift - depth * 18
              cardScale  = 1 - depth * 0.015
            }

            // Direct DOM write — no GSAP overhead, no React batching delay
            r.card.style.transform = `translateX(-50%) translateY(${(cardY - CARD_TOP).toFixed(2)}px) scale(${cardScale.toFixed(4)})`
            r.card.style.opacity   = opacity.toFixed(3)

            // Vehicle travel — pure position-based, works identically forward & backward
            const isLast      = i === steps
            const travelRaw   = isLast
              ? _cl((rawSeg - i) / HOLD)   // last zone uses rawSeg for full travel
              : _cl(offset)                 // others: 0 entering → 1 leaving
            const travel      = _ss(travelRaw)
            const mainPct     = 22 + travel * 56

            if (r.vehicle) r.vehicle.style.left = `${mainPct.toFixed(2)}%`

            // Convoy vehicles — staggered
            if (r.convoy2) {
              const f2 = _ss(_cl((travelRaw - 0.10) / 0.80))
              r.convoy2.style.left = `${(-15 + f2 * 93).toFixed(2)}%`
            }
            if (r.convoy3) {
              const f3 = _ss(_cl((travelRaw - 0.20) / 0.80))
              r.convoy3.style.left = `${(-35 + f3 * 113).toFixed(2)}%`
            }

            // Extra vehicle (non-convoy)
            if (r.extra && zone.id !== 'adhoc') {
              const extraGap = 28 * 4 * travel * (1 - travel)
              r.extra.style.left = `${(mainPct - extraGap).toFixed(2)}%`
            }
          })
        },

        onLeave()     { setActiveZone(steps) },
        onLeaveBack() { setActiveZone(0) },
      })
    }, vp)

    return () => ctx.revert()
  }, []) // run once — invalidateOnRefresh handles resize

  const T           = makeTheme(isDark)
  const cardH       = Math.min(Math.round(vh * 0.65), 520)
  const activeColor = ZONES[activeZone]?.color    ?? '#A3E635'
  const activeGlow  = ZONES[activeZone]?.glowRgb  ?? '163,230,53'

  return (
    <div ref={viewportRef} className="relative w-full overflow-hidden"
      style={{ height: '100svh', background: T.sectionBg, transition: 'background 0.5s ease',
        isolation: 'isolate' }}>

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

      {/* Dynamic zone glow — removed */}

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
          transform: `scaleY(${activeZone / (ZONES.length - 1)})`,
          transformOrigin: 'top',
          transition: 'transform 0.6s ease, background 0.9s ease, box-shadow 0.9s ease',
        }} />
      </div>

      {/* Section header */}
      <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-center pointer-events-none"
        style={{ height: `${CARD_TOP}px` }}>
        <div className="flex items-center gap-2">
          <span style={{ width: '24px', height: '1px', background: `${activeColor}60`, transition: 'background 0.9s ease' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%',
            background: activeColor, boxShadow: `0 0 6px ${activeColor}`,
            transition: 'background 0.9s ease, box-shadow 0.9s ease',
            animation: 'driv-dot-pulse 2.5s ease-in-out infinite' }} />
          <span className="text-xs font-bold uppercase tracking-[0.28em]"
            style={{ color: activeColor, transition: 'color 0.9s ease' }}>
            What We Do
          </span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%',
            background: activeColor, boxShadow: `0 0 6px ${activeColor}`,
            transition: 'background 0.9s ease, box-shadow 0.9s ease',
            animation: 'driv-dot-pulse 2.5s ease-in-out infinite 1.25s' }} />
          <span style={{ width: '24px', height: '1px', background: `${activeColor}60`, transition: 'background 0.9s ease' }} />
        </div>
      </div>

      {/* Stacked cards */}
      <div className="absolute inset-0">
        {ZONES.map((zone, i) => (
          <StackCard
            key={zone.id}
            zone={zone}
            isDesktop={isDesktop}
            T={T}
            cardH={cardH}
            outerRef={el => { elRefs.current[i].card = el }}
            sceneRefs={elRefs.current[i]}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <AnimatePresence>
        {activeZone === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute bottom-4 sm:bottom-5 right-5 sm:right-7 z-50 hidden sm:flex items-center gap-1.5 pointer-events-none"
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
