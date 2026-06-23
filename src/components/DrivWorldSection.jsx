import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconTruck, IconRoute, IconBolt, IconBike } from '@tabler/icons-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HOLD        = 0.45
const VEHICLE_SEG = 1
const SCROLL_MULT = 2.2
const CARD_TOP    = 44

/** Timeline helpers — vehicle finishes before the next card enters */
function zoneEntranceStart(i) {
  return i === 0 ? 0 : i + (i - 1) * HOLD
}
function zoneVehicleStart(i) {
  return i === 0 ? 0 : i + i * HOLD
}
function zoneVehicleEnd(i) {
  return zoneVehicleStart(i) + VEHICLE_SEG
}
function totalScrollSeg() {
  return zoneVehicleEnd(ZONES.length - 1)
}
function activeZoneIndex(rawSeg) {
  for (let i = ZONES.length - 1; i >= 0; i--) {
    if (rawSeg >= zoneEntranceStart(i)) return i
  }
  return 0
}

const CSS_KEYFRAMES = `
  @keyframes driv-grid-drift {
    from { transform: translateY(0);    }
    to   { transform: translateY(52px); }
  }
  @keyframes driv-dot-pulse {
    0%, 100% { opacity: 1;    }
    50%       { opacity: 0.3; }
  }
`

const ZONES = [
  {
    id: 'fleet', index: 0, noGlow: true,
    Icon: IconTruck, color: '#A3E635', glowRgb: '163,230,53',
    tag: 'Fleet Operations',
    title: 'Enterprise Dedicated Fleet',
    desc: 'Dedicated fleet solutions tailored to your business with reliable vehicles, drivers, and end-to-end operational support.',
    from: 'Origin', to: 'Destination',
    scene: {
      fromImg: '/scenes/building-warehouse.webp',
      vehicle:  '/vehicles/truck.webp',
      toImg:    '/scenes/building-warehouse.webp',
      vehicleW: '44%', vehicleH: '76%',
      vehicleBottom: '-10%',
    },
  },
  {
    id: 'adhoc', index: 1, noGlow: true,
    Icon: IconBolt, color: '#A3E635', glowRgb: '163,230,53',
    tag: 'Adhoc Deploy',
    title: 'Adhoc Vehicle Support',
    desc: 'On-demand vehicle availability to handle urgent deliveries, peak demand, and temporary logistics requirements.',
    from: 'DRIV Hub', to: 'Warehouse',
    scene: {
      fromImg: '/scenes/building-hub.webp',
      toImg:    '/scenes/building-warehouse.webp',
      vehicle:  '/vehicles/truck.webp',
      vehicleW: '44%', vehicleH: '76%',
      vehicleBottom: '-10%',
      convoy: [
        { src: '/vehicles/tata_ace.webp',   w: '34%', h: '62%', offset: 27, bottom: '-4%' },
        { src: '/vehicles/tata_tempo.webp', w: '40%', h: '72%', offset: 54, bottom: '-12%' },
      ],
    },
  },
  {
    id: 'linehaul', index: 2, noGlow: true,
    Icon: IconRoute, color: '#A3E635', glowRgb: '163,230,53',
    tag: 'Linehaul',
    title: 'Linehaul Logistics',
    desc: 'Efficient intercity and hub-to-hub transportation designed for seamless long-distance freight movement.',
    from: 'Mumbai', to: 'Pune',
    scene: {
      fromImg: '/scenes/building-warehouse.webp',
      vehicle:  '/vehicles/truck.webp',
      toImg:    '/scenes/building-warehouse.webp',
      vehicleW: '44%', vehicleH: '76%',
      vehicleBottom: '-10%',
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
    sectionBg:        '#111827',
    dotColor:         'transparent',
    cardBorder:       'rgba(255,255,255,0.09)',
    cardBg:           'linear-gradient(160deg, #101010 0%, #050505 100%)',
    cardShadow: (g) => `0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.55), 0 40px 100px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05)`,
    progressInactive: 'rgba(255,255,255,0.13)',
    progressTrack:    'rgba(255,255,255,0.03)',
    vignette:         'rgba(0,0,0,0.44)',
    glowOpacity:      0.16,
    scrollHint:       'rgba(255,255,255,0.16)',
    routeLine:        'rgba(255,255,255,0.06)',
    destDot:          'rgba(255,255,255,0.20)',
    destText:         'rgba(255,255,255,0.40)',
    telemetryLabel:   'rgba(255,255,255,0.18)',
    scanLine:         'transparent',
  } : {
    sectionBg:        '#f0f4f8',
    dotColor:         'rgba(0,0,0,0)',
    cardBorder:       'rgba(0,0,0,0.12)',
    cardBg:           '#111827',
    cardShadow: (g) => `0 0 0 1px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.14), 0 32px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)`,
    progressInactive: 'rgba(0,0,0,0.12)',
    progressTrack:    'rgba(0,0,0,0.05)',
    vignette:         'rgba(0,0,0,0.06)',
    glowOpacity:      0.12,
    scrollHint:       'rgba(15,23,42,0.24)',
    routeLine:        'rgba(255,255,255,0.10)',
    destDot:          'rgba(255,255,255,0.30)',
    destText:         'rgba(255,255,255,0.50)',
    telemetryLabel:   'rgba(255,255,255,0.28)',
    scanLine:         'transparent',
  }
}

function RouteTelemetry({ zone, T }) {
  const label = {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
          background: zone.color }} />
        <span style={{ ...label, color: zone.color }}>{zone.from}</span>
      </span>

      <div style={{ width: '40px', minWidth: '18px', maxWidth: '56px', height: '1px', flexShrink: 0,
        background: `linear-gradient(90deg, ${zone.color}44, ${T.routeLine} 70%, transparent)` }} />

      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
          background: T.destDot }} />
        <span style={{ ...label, color: T.destText }}>{zone.to}</span>
      </span>
    </div>
  )
}

function ZoneCardText({ zone, T }) {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-[3] flex flex-col items-center text-center pointer-events-none
                 px-4 sm:px-6 md:px-10 pt-5 sm:pt-6 md:pt-8 pb-3 sm:pb-4"
    >
      <h3
        className="font-heading font-black text-white leading-[1.1] tracking-tight
                   text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem]
                   mb-1.5 sm:mb-2 max-w-[720px] w-full min-h-[2.35em]"
      >
        {zone.title}
      </h3>

      <div className="-mt-0.5 sm:-mt-1 md:-mt-1.5">
        <p
          className="text-[13px] sm:text-sm md:text-[15px] leading-relaxed text-slate-300/90
                     mb-2 sm:mb-2.5 max-w-[560px] w-full min-h-[3.5em] sm:min-h-[3.75em]"
        >
          {zone.desc}
        </p>

        <RouteTelemetry zone={zone} T={T} />
      </div>
    </div>
  )
}

// Scene panel — refs for vehicle elements passed in so GSAP can drive them directly
const ROAD_H = '28%'

function ZoneScene({ zone, T, sceneRefs, isDesktop }) {
  const { scene, color, glowRgb, title, noGlow } = zone
  const ga = noGlow ? 0 : 1
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const isTablet = !isDesktop && vw >= 600
  const mvW = (pct) => isDesktop ? pct : `${(parseFloat(pct) * (isTablet ? 0.50 : 0.60)).toFixed(1)}%`
  const mvH = (pct) => isDesktop ? pct : `${(parseFloat(pct) * 0.60).toFixed(1)}%`
  const mvBldH = (pct) => isDesktop ? pct : `${(parseFloat(pct) * 0.65).toFixed(1)}%`

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


      {/* Road — horizontal left-to-right asphalt strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: isDesktop ? ROAD_H : '18%', pointerEvents: 'none', zIndex: 0 }}>
        {/* Verge */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, #1c1f18 0%, #121410 55%, #0a0b09 100%)' }} />

        {/* Asphalt surface */}
        <div style={{
          position: 'absolute', inset: '8% 0 0 0',
          background: 'linear-gradient(to bottom, #454842 0%, #323530 45%, #242622 100%)',
          boxShadow: 'inset 0 6px 18px rgba(0,0,0,0.28)',
        }}>
          {/* Asphalt grain */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2, mixBlendMode: 'overlay',
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 3px), repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, transparent 2px, transparent 5px)' }} />

          {/* Top road edge */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent 1%, rgba(255,255,255,0.55) 8%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.55) 92%, transparent 99%)' }} />

          {/* Center lane dashes — left to right */}
          <div style={{ position: 'absolute', top: '50%', left: '6%', right: '6%', height: '2px', transform: 'translateY(-50%)',
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,248,200,0.92) 0px, rgba(255,248,200,0.92) 22px, transparent 22px, transparent 46px)' }} />

          {/* Wear patches */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.16,
            background: 'radial-gradient(ellipse 22% 55% at 18% 60%, rgba(0,0,0,0.45) 0%, transparent 70%), radial-gradient(ellipse 20% 50% at 82% 45%, rgba(0,0,0,0.4) 0%, transparent 70%)' }} />
        </div>

        {/* Horizon shadow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '18%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)' }} />
      </div>

      {/* From building — sits above road, not on it */}
      {scene.fromImg && (
        <div style={{ position: 'absolute', bottom: `25%`, left: '1%', width: '34%', height: mvBldH('76%'),
          pointerEvents: 'none', zIndex: 1 }}>
          <img src={scene.fromImg} alt="" draggable={false} style={{
            width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom left',
            filter: noGlow ? 'none' : `drop-shadow(0 0 18px rgba(${glowRgb},0.32))`,
          }} />
        </div>
      )}

      {/* To building — sits above road, not on it */}
      {scene.toImg && (
        <div style={{ position: 'absolute', bottom: `25%`, right: '1%', width: '34%', height: mvBldH('76%'),
          pointerEvents: 'none', zIndex: 1 }}>
          <img src={scene.toImg} alt="" draggable={false} style={{
            width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom right',
            filter: noGlow ? 'none' : `drop-shadow(0 0 14px rgba(${glowRgb},0.28))`,
          }} />
        </div>
      )}

      {/* Convoy vehicles (behind main vehicle) — GSAP drives left via vehicle2, vehicle3 refs */}
      {scene.convoy && scene.convoy.map((cv, ci) => (
        <div key={ci}
          ref={el => { sceneRefs[`vehicle${ci + 2}`] = el }}
          style={{
            position: 'absolute',
            bottom: isDesktop ? (cv.bottom ?? scene.vehicleBottom ?? '2%') : (scene.vehicleBottom ?? '2%'),
            left: '22%',
            transform: 'translateX(-50%)',
            transformOrigin: '50% 100%',
            width: mvW(cv.w),
            height: mvH(cv.h),
            pointerEvents: 'none',
            zIndex: 2,
          }}>
          <img src={cv.src} alt="" draggable={false} style={{
            width: '100%', height: '100%', objectFit: 'contain',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.65))',
          }} />
        </div>
      ))}

      {/* Main vehicle — position driven by GSAP via sceneRefs.vehicle */}
      <div ref={el => { sceneRefs.vehicle = el }} style={{
        position: 'absolute',
        bottom: scene.vehicleBottom ?? '2%',
        left: '22%',
        transform: 'translateX(-50%)',
        transformOrigin: '50% 100%',
        width: mvW(scene.vehicleW ?? '48%'),
        height: mvH(scene.vehicleH ?? '58%'),
        pointerEvents: 'none',
        zIndex: 3,
      }}>
        <img src={scene.vehicle} alt={title} draggable={false} style={{
          width: '100%', height: '100%', objectFit: 'contain',
          filter: noGlow ? `drop-shadow(0 8px 16px rgba(0,0,0,0.65))` : `drop-shadow(0 0 26px rgba(${glowRgb},0.58)) drop-shadow(0 8px 16px rgba(0,0,0,0.65))`,
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

      {/* Full-width scene */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <ZoneScene zone={zone} T={T} sceneRefs={sceneRefs} isDesktop={isDesktop} />
      </div>

      {/* Top gradient for text legibility */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: isDesktop ? '46%' : '52%',
        pointerEvents: 'none', zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(5,11,24,0.92) 0%, rgba(5,11,24,0.55) 55%, transparent 100%)',
      }} />

      {/* Centered top text overlay */}
      <ZoneCardText zone={zone} T={T} />

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
    ZONES.map(() => ({ card: null, vehicle: null }))
  )
  const maxTravelRef = useRef(ZONES.map(() => 0))

  // UI state — only re-renders for structural/theme changes, NOT every scroll tick
  const [activeZone, setActiveZone]   = useState(0)
  const activeZoneRef                 = useRef(0)
  const [isDesktop, setIsDesktop]     = useState(
    () => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )
  const isDesktopRef                  = useRef(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)
  const [isDark, setIsDark]           = useState(
    () => typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true
  )
  const [vh, setVh]                   = useState(
    () => typeof window !== 'undefined' ? window.innerHeight : 800
  )

  // Hide stacked cards before first paint; card 0 is positioned by ScrollTrigger sync
  useLayoutEffect(() => {
    elRefs.current.forEach((r, i) => {
      if (r.card && i > 0) {
        r.card.style.transform = 'translateX(-50%) translateY(10000px)'
        r.card.style.opacity   = '0'
      }
      if (r.vehicle) r.vehicle.style.left = '22%'
    })
  }, [])

  // Resize handler
  useEffect(() => {
    const onResize = () => {
      const d = window.innerWidth >= 1024
      setIsDesktop(d)
      isDesktopRef.current = d
      setVh(window.innerHeight)
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [isDesktop, vh])

  // Theme observer
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark'))
    )
    obs.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // GSAP ScrollTrigger — all animation via direct DOM manipulation, zero React state per frame
  useLayoutEffect(() => {
    const vp = viewportRef.current
    if (!vp) return

    const _ss = t => t * t * (3 - 2 * t)
    const _cl = t => Math.max(0, Math.min(1, t))

    const updateFrame = (progress) => {
      const cvh        = window.innerHeight
      const cardH      = Math.min(Math.round(cvh * 0.65), 520)
      const cardCenter = Math.round((cvh - cardH) / 2 + CARD_TOP)
      const rawSeg     = progress * totalScrollSeg()
      const activeIdx  = activeZoneIndex(rawSeg)
      const stackShift = activeIdx * 9

      const newActive = activeIdx
      if (newActive !== activeZoneRef.current) {
        activeZoneRef.current = newActive
        setActiveZone(newActive)
      }


      ZONES.forEach((zone, i) => {
        const r = elRefs.current[i]
        if (!r.card) return

        const eStart = zoneEntranceStart(i)
        const vStart = zoneVehicleStart(i)
        const vEnd   = zoneVehicleEnd(i)
        let cardY, opacity = 1, cardScale = 1

        if (i > 0 && rawSeg < eStart) {
          cardY   = cvh
          opacity = 0
        } else if (rawSeg < vStart) {
          const t   = _ss(_cl((rawSeg - eStart) / HOLD))
          const dst = cardCenter + stackShift
          cardY     = cvh - t * (cvh - dst)
          opacity   = Math.min(1, t * 2)
        } else if (rawSeg < vEnd) {
          cardY = cardCenter + stackShift
        } else {
          const depth = Math.min(Math.max(0, activeIdx - i), 3)
          cardY     = cardCenter + stackShift - depth * 18
          cardScale = 1 - depth * 0.015
        }

        r.card.style.transform = `translateX(-50%) translateY(${(cardY - CARD_TOP).toFixed(2)}px) scale(${cardScale.toFixed(4)})`
        r.card.style.opacity   = opacity.toFixed(3)

        if (r.vehicle) {
          const travelRaw = _cl((rawSeg - vStart) / VEHICLE_SEG)
          maxTravelRef.current[i] = Math.max(maxTravelRef.current[i], travelRaw)
          // Convoy zones extend truck travel to 100% so all vehicles reach near the right building
          const travelDist = ZONES[i].scene.convoy ? 78 : 56
          const baseLeft = 22 + _ss(maxTravelRef.current[i]) * travelDist
          r.vehicle.style.left = `${baseLeft.toFixed(2)}%`
          // Lock-step convoy: all move at equal speed, fixed spacing throughout
          const convoy = ZONES[i].scene.convoy
          if (convoy) {
            convoy.forEach((cv, ci) => {
              const cvRef = r[`vehicle${ci + 2}`]
              if (cvRef) cvRef.style.left = `${(baseLeft - cv.offset).toFixed(2)}%`
            })
          }
        }
      })
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: vp,
        pin: true, pinSpacing: true,
        start: 'top top',
        end: () => `+=${totalScrollSeg() * window.innerHeight * SCROLL_MULT}`,
        scrub: 1,
        anticipatePin: 1, invalidateOnRefresh: true,
        fastScrollEnd: true, preventOverlaps: true,

        onUpdate(self) {
          if (self.direction === -1) {
            // Skip vehicle segments when scrolling up — jump to the segment start
            // so only the short card-entrance phase needs to be scrubbed back
            const raw = self.progress * totalScrollSeg()
            for (let i = ZONES.length - 1; i >= 0; i--) {
              const vS = zoneVehicleStart(i)
              const vE = zoneVehicleEnd(i)
              if (raw > vS && raw < vE) {
                const targetProgress = vS / totalScrollSeg()
                const targetScroll = self.start + targetProgress * (self.end - self.start)
                updateFrame(targetProgress)
                window.scrollTo(0, Math.max(0, targetScroll - 1))
                return
              }
            }
          }
          updateFrame(self.progress)
        },
        onRefresh(self) { updateFrame(self.progress) },

        onLeave() { setActiveZone(ZONES.length - 1) },
        onLeaveBack() {
          setActiveZone(0)
          activeZoneRef.current = 0
          maxTravelRef.current = ZONES.map(() => 0)
          elRefs.current.forEach((r, i) => {
            if (r.vehicle) r.vehicle.style.left = '22%'
            const convoy = ZONES[i].scene.convoy
            if (convoy) {
              convoy.forEach((cv, ci) => {
                const cvRef = r[`vehicle${ci + 2}`]
                if (cvRef) cvRef.style.left = `${(22 - cv.offset).toFixed(2)}%`
              })
            }
          })
          updateFrame(0)
        },
      })

      updateFrame(st.progress)
      ScrollTrigger.refresh()
      requestAnimationFrame(() => updateFrame(st.progress))
    }, vp)

    return () => ctx.revert()
  }, []) // run once — invalidateOnRefresh handles resize

  const T           = makeTheme(isDark)
  const cardH       = Math.min(Math.round(vh * 0.65), 520)
  const activeColor = ZONES[activeZone]?.color ?? '#A3E635'

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
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${T.scanLine} 3px, ${T.scanLine} 4px)`,
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
