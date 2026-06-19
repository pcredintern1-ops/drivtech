import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconTruck, IconRoute, IconBolt, IconBike } from '@tabler/icons-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
      vehicle:  '/vehicles/tata_tempo.webp',
      toImg:    '/scenes/building-hub.webp',
    },
  },
  {
    id: 'linehaul', index: 1,
    Icon: IconRoute, color: '#F97316', glowRgb: '249,115,22',
    tag: 'Linehaul',
    title: 'Linehaul Logistics',
    desc: 'Efficient intercity and hub-to-hub transportation designed for seamless long-distance freight movement.',
    from: 'Mumbai', to: 'Pune',
    scene: {
      fromImg: '/scenes/dispatch-hub.webp',
      vehicle:  '/vehicles/truck.webp',
      toImg:    '/scenes/building-hub.webp',
    },
  },
  {
    id: 'adhoc', index: 2,
    Icon: IconBolt, color: '#F97316', glowRgb: '249,115,22',
    tag: 'Adhoc Deploy',
    title: 'Adhoc Vehicle Support',
    desc: 'On-demand vehicle availability to handle urgent deliveries, peak demand, and temporary logistics requirements.',
    from: 'DRIV Hub', to: 'On Demand',
    scene: {
      fromImg: '/scenes/dispatch-hub.webp',
      vehicle:  '/vehicles/tata_ace.webp',
      extra:    '/vehicles/tata_tempo.webp',
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
    subtitleColor:       'rgba(255,255,255,0.32)',
    zoneTitle:           '#ffffff',
    zoneDesc:            'rgba(255,255,255,0.48)',
    watermark:           'rgba(255,255,255,0.025)',
    systemLabel:         'rgba(255,255,255,0.10)',
    routeLine:           'rgba(255,255,255,0.06)',
    destDot:             'rgba(255,255,255,0.20)',
    destText:            'rgba(255,255,255,0.40)',
    telemetryLabel:      'rgba(255,255,255,0.18)',
    cardBorder:          'rgba(255,255,255,0.07)',
    cardShadow: (g) =>  `0 48px 110px rgba(0,0,0,0.72), 0 0 0 1px rgba(255,255,255,0.025), 0 0 90px rgba(${g},0.12)`,
    progressInactive:    'rgba(255,255,255,0.13)',
    progressTrack:       'rgba(255,255,255,0.03)',
    vignette:            'rgba(0,0,0,0.44)',
    glowOpacity:         0.11,
    scrollHint:          'rgba(255,255,255,0.16)',
  } : {
    sectionBg:           '#f0f4f8',
    dotColor:            'rgba(0,0,0,0.055)',
    heading:             '#0f172a',
    labelText:           'rgba(15,23,42,0.38)',
    subtitleColor:       'rgba(15,23,42,0.52)',
    zoneTitle:           '#0f172a',
    zoneDesc:            'rgba(15,23,42,0.58)',
    watermark:           'rgba(0,0,0,0.028)',
    systemLabel:         'rgba(15,23,42,0.14)',
    routeLine:           'rgba(0,0,0,0.07)',
    destDot:             'rgba(0,0,0,0.18)',
    destText:            'rgba(15,23,42,0.42)',
    telemetryLabel:      'rgba(15,23,42,0.30)',
    cardBorder:          'rgba(0,0,0,0.09)',
    cardShadow: (g) =>  `0 28px 70px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.06), 0 0 60px rgba(${g},0.09)`,
    progressInactive:    'rgba(0,0,0,0.12)',
    progressTrack:       'rgba(0,0,0,0.05)',
    vignette:            'rgba(0,0,0,0.06)',
    glowOpacity:         0.09,
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

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          marginBottom: '18px', padding: '5px 12px 5px 7px', borderRadius: '100px',
          background: `${zone.color}14`, border: `1px solid ${zone.color}30`,
        }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '7px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${zone.color}22` }}>
            <ZIcon size={13} style={{ color: zone.color }} />
          </div>
          <span style={{ color: zone.color, fontSize: '10px', fontWeight: 800,
            letterSpacing: '0.18em', textTransform: 'uppercase' }}>{zone.tag}</span>
        </div>

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

        <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ color: T.systemLabel, fontSize: '8px', fontWeight: 700,
            letterSpacing: '0.24em', textTransform: 'uppercase' }}>DRIV.LOGISTICS</span>
          <span style={{ width: '2px', height: '2px', borderRadius: '50%', background: T.systemLabel }} />
          <span style={{ color: T.systemLabel, fontSize: '8px', fontWeight: 700,
            letterSpacing: '0.20em', textTransform: 'uppercase' }}>SYS OPERATIONAL</span>
        </div>
      </div>
    </div>
  )
}

function ZoneCard({ zone, isDesktop, T }) {
  const { scene, color, glowRgb, tag, title } = zone
  return (
    <div style={{
      position: 'relative',
      width: isDesktop ? 'min(56vw, 720px)' : 'min(88vw, 480px)',
      aspectRatio: '1857 / 847',
      borderRadius: isDesktop ? '18px' : '13px',
      overflow: 'hidden',
      border: `1px solid ${T.cardBorder}`,
      boxShadow: T.cardShadow(glowRgb),
      transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
    }}>

      {/* Dark card background — always dark regardless of section theme */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0c1628 0%, #050b18 100%)',
      }} />

      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }} />

      {/* Zone color radial glow at base */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 80% 55% at 50% 115%, rgba(${glowRgb},0.22) 0%, transparent 70%)`,
      }} />

      {/* From building — left, floats gently */}
      {scene.fromImg && (
        <div style={{
          position: 'absolute', bottom: 0, left: '1%',
          width: '30%', height: '58%',
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
          width: '26%', height: '52%',
          animation: 'driv-building-float 5s ease-in-out infinite 1.6s',
          pointerEvents: 'none',
        }}>
          <img src={scene.toImg} alt="" draggable={false} style={{
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'bottom right',
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.08))',
            opacity: 0.82,
          }} />
        </div>
      )}

      {/* Route connector */}
      <div style={{
        position: 'absolute',
        bottom: '13%',
        left: scene.fromImg ? '27%' : '8%',
        right: scene.toImg ? '24%' : '8%',
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${color}70 20%, ${color} 50%, ${color}70 80%, transparent)`,
        boxShadow: `0 0 12px ${color}70, 0 0 24px ${color}35`,
        pointerEvents: 'none',
      }} />

      {/* Extra vehicle — adhoc only, slightly behind & mirrored */}
      {scene.extra && (
        <div style={{
          position: 'absolute', bottom: '5%', left: '26%',
          width: '20%', height: '28%',
          animation: 'driv-drive 3.2s ease-in-out infinite 1.1s',
          transformOrigin: 'center bottom',
          pointerEvents: 'none', zIndex: 1,
        }}>
          <img src={scene.extra} alt="" draggable={false} style={{
            width: '100%', height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 3px 8px rgba(255,255,255,0.06))',
            opacity: 0.52,
            transform: 'scaleX(-1)',
          }} />
        </div>
      )}

      {/* Main vehicle — centred, driving animation */}
      <div style={{
        position: 'absolute', bottom: '4%',
        left: '50%', transform: 'translateX(-50%)',
        width: '38%', height: '46%',
        pointerEvents: 'none', zIndex: 2,
      }}>
        <img src={scene.vehicle} alt={title} draggable={false} style={{
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
        position: 'absolute', top: 0, left: 0, right: 0, padding: '9px 14px',
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.80), transparent)',
        pointerEvents: 'none', zIndex: 3,
      }}>
        <span style={{ color, fontSize: '9px', fontWeight: 800,
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

function ZoneScene({ zone, pos, isDesktop, T }) {
  const offset = zone.index - pos
  const dist   = Math.abs(offset)
  const cd     = Math.min(dist, 1)

  const opacity   = Math.max(0, 1 - cd * cd * (3 - 2 * cd))
  const textScale = 1 - cd * 0.06
  const cardScale = 1 - cd * 0.10
  const textBlur  = cd * 3
  const cardBlur  = cd * 5
  const z         = Math.round(100 - dist * 10)

  const textTD = `translate3d(${offset * -42}vw, ${offset * 3}vh, 0) rotateY(${offset * 5}deg) scale(${textScale})`
  const cardTD = `translate3d(${offset * 34}vw, ${offset * 4}vh, 0) rotateY(${offset * -8}deg) scale(${cardScale})`
  const textTM = `translate3d(0, ${offset * -38}vh, 0) scale(${textScale})`
  const cardTM = `translate3d(0, ${offset * 44}vh, 0) rotate(${offset * 5}deg) scale(${cardScale})`

  return (
    <div className="absolute inset-0 select-none"
      style={{ zIndex: z, pointerEvents: dist < 0.5 ? 'auto' : 'none' }}>

      {isDesktop ? (
        <>
          <div className="absolute inset-0 flex items-center pointer-events-none"
            style={{ paddingTop: '22vh', paddingLeft: 'clamp(48px, 7vw, 112px)',
              perspective: '1600px', perspectiveOrigin: '50% 50%' }}>
            <div style={{ transform: textTD,
              filter: textBlur > 0.05 ? `blur(${textBlur}px)` : 'none',
              opacity, willChange: 'transform, opacity' }}>
              <ZoneText zone={zone} isDesktop offset={offset} T={T} />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-end pointer-events-none"
            style={{ paddingTop: '22vh', paddingRight: 'clamp(36px, 5vw, 80px)',
              perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
            <div style={{ transform: cardTD,
              filter: cardBlur > 0.05 ? `blur(${cardBlur}px)` : 'none',
              opacity, willChange: 'transform, opacity, filter' }}>
              <ZoneCard zone={zone} isDesktop T={T} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none"
            style={{ paddingTop: '26vh', paddingLeft: '20px', paddingRight: '20px' }}>
            <div style={{ transform: textTM,
              filter: textBlur > 0.05 ? `blur(${textBlur}px)` : 'none',
              opacity, willChange: 'transform, opacity' }}>
              <ZoneText zone={zone} isDesktop={false} offset={offset} T={T} />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none"
            style={{ paddingBottom: '10vh', paddingLeft: '16px', paddingRight: '16px' }}>
            <div style={{ transform: cardTM,
              filter: cardBlur > 0.05 ? `blur(${cardBlur}px)` : 'none',
              opacity, willChange: 'transform, opacity, filter' }}>
              <ZoneCard zone={zone} isDesktop={false} T={T} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function DrivWorldSection() {
  const viewportRef = useRef(null)
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
        end: () => `+=${steps * window.innerHeight * 1.1}`,
        scrub: 1.6, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate(self) { setScrollProgress(self.progress) },
      })
    }, viewportRef)
    return () => ctx.revert()
  }, [])

  const T = makeTheme(isDark)

  const steps  = ZONES.length - 1
  const seg    = scrollProgress * steps
  const i      = Math.min(steps - 1, Math.floor(seg))
  const f      = seg - i
  const HOLD   = 0.18
  const t      = f <= HOLD ? 0 : (f - HOLD) / (1 - HOLD)
  const eased  = t * t * t * (t * (t * 6 - 15) + 10)
  const pos         = scrollProgress >= 1 ? steps : i + eased
  const activeZone  = Math.round(pos)
  const activeColor   = ZONES[activeZone]?.color    ?? '#A3E635'
  const activeGlowRgb = ZONES[activeZone]?.glowRgb  ?? '163,230,53'

  return (
    <div ref={viewportRef} className="relative w-full overflow-hidden"
      style={{ height: '100svh', background: T.sectionBg, transition: 'background 0.5s ease' }}>

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

      {/* Dynamic zone glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 46% at 64% 60%, rgba(${activeGlowRgb},${T.glowOpacity}) 0%, transparent 65%)`,
        transition: 'background 0.9s ease',
      }} />

      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 46%, ${T.vignette} 100%)`,
        transition: 'background 0.5s ease',
      }} />

      {/* Left-edge scroll progress track */}
      <div className="absolute left-0 z-50 pointer-events-none overflow-hidden"
        style={{ top: '22vh', bottom: '14vh', width: '2px', background: T.progressTrack }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: `${scrollProgress * 100}%`,
          background: `linear-gradient(to bottom, ${activeColor}90, ${activeColor}30)`,
          boxShadow: `1px 0 8px ${activeColor}50`,
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
            style={{ color: T.labelText, transition: 'color 0.5s ease' }}>
            What We Do
          </span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
            background: activeColor, boxShadow: `0 0 6px ${activeColor}`,
            transition: 'background 0.9s ease, box-shadow 0.9s ease',
            animation: 'driv-dot-pulse 2.5s ease-in-out infinite 1.25s' }} />
          <span style={{ width: '32px', height: '1px', background: `${activeColor}60`, flexShrink: 0,
            transition: 'background 0.9s ease' }} />
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] leading-[1.08]"
          style={{ color: T.heading, transition: 'color 0.5s ease' }}>
          Logistics Solutions That{' '}
          <span className="gradient-text">Move Business Forward</span>
        </h2>
        <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto mt-3"
          style={{ color: T.subtitleColor, transition: 'color 0.5s ease' }}>
          Flexible, scalable, and technology-driven logistics solutions for enterprises
          across every stage of the supply chain.
        </p>
      </div>

      {/* Zone scenes */}
      <div className="relative w-full h-full">
        {ZONES.map((zone) => (
          <ZoneScene key={zone.id} zone={zone} pos={pos} isDesktop={isDesktop} T={T} />
        ))}
      </div>

      {/* Progress pills */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-50 flex items-center justify-center gap-2 pointer-events-none">
        {ZONES.map((zone, idx) => {
          const active = activeZone === idx
          return (
            <div key={zone.id} style={{
              height: '3px', width: active ? '28px' : '12px', borderRadius: '2px',
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
