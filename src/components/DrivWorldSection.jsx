/**
 * DrivWorldSection v3 — Premium cinematic logistics world
 * Route as visual centerpiece · Truck as hero · 40% less dead space
 * Clean architecture: sky → buildings → route + truck → content
 */
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconTruck, IconRoute, IconBolt, IconBike, IconMapPin } from '@tabler/icons-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Layout constants (% from bottom) ──────────────────────────────────── */
// Ground sits at 28% from bottom.
// Road runs from 20% to 28% from bottom (8% thick).
// Vehicle bottom = 28% = road top → vehicle sits ON road surface.
// Buildings anchor at 28% and rise 63% up.
const GROUND  = 28   // ground plane (road top / building base)
const ROAD_B  = 20   // road bottom edge
const ROAD_H  = 8    // road height

/* ─── Zone data ──────────────────────────────────────────────────────────── */
const ZONES = [
  {
    id: 'fleet', index: 0,
    Icon: IconTruck, color: '#A3E635', glowRgb: '163,230,53',
    title: 'Enterprise Dedicated Fleet',
    desc: 'Dedicated vehicles and trained drivers assigned to your corridors — scheduled, monitored, and managed entirely by DRIV. Reliability built in, not bolted on.',
    vehicle: '/vehicles/tata_ace.webp',
    fromBg: '/scenes/building-warehouse.webp', toBg: '/scenes/dispatch-hub.webp',
    from: 'Warehouse', to: 'Dark Store',
    vehicleDur: 5.5, vehicleDelay: 0,
  },
  {
    id: 'linehaul', index: 1,
    Icon: IconRoute, color: '#F97316', glowRgb: '249,115,22',
    title: 'Linehaul Logistics',
    desc: 'Full-load and part-load intercity movement across key trade corridors. Built for businesses that ship at volume and need consistent transit times, every time.',
    vehicle: '/vehicles/truck.webp',
    fromBg: '/scenes/building-hub.webp', toBg: '/scenes/building-warehouse.webp',
    from: 'Mumbai', to: 'Pune',
    vehicleDur: 4.5, vehicleDelay: 1.2,
  },
  {
    id: 'adhoc', index: 2,
    Icon: IconBolt, color: '#F97316', glowRgb: '249,115,22',
    title: 'Adhoc Vehicle Support',
    desc: 'Surge coverage, emergency dispatch, and peak-season backup fleet — deployed fast when your primary capacity runs short.',
    vehicle: '/vehicles/tata_tempo.webp',
    fromBg: '/scenes/building-hub.webp', toBg: '/scenes/building-warehouse.webp',
    from: 'DRIV Hub', to: 'On Demand',
    vehicleDur: 4.0, vehicleDelay: 0.7,
  },
  {
    id: 'quick', index: 3,
    Icon: IconBike, color: '#A3E635', glowRgb: '163,230,53',
    title: 'Quick Commerce Riders',
    desc: 'Rider sourcing, onboarding, and day-to-day operations management for hyperlocal delivery businesses running last-mile at volume.',
    vehicle: '/vehicles/scooty.webp',
    fromBg: '/scenes/dispatch-hub.webp', toBg: '/scenes/customer-house.webp',
    from: 'Dark Store', to: 'Doorstep',
    vehicleDur: 3.8, vehicleDelay: 0.3,
  },
]

/* ─── SVG route CSS keyframes (injected once) ───────────────────────────── */
const ROUTE_STYLE = `
  @keyframes driv-dash    { to { stroke-dashoffset: -42; } }
  @keyframes driv-sweep   { to { stroke-dashoffset: -1200; } }
  @keyframes driv-shimmer { 0%,100% { opacity:0.03; } 50% { opacity:0.08; } }
`

/* ─── ZoneScene ──────────────────────────────────────────────────────────── */
function ZoneScene({ zone, isActive, isDark, vehicleRef }) {
  const c  = zone.color
  const gr = zone.glowRgb

  /* vehicle dimensions — linehaul truck biggest, scooty smallest */
  const vW = zone.id === 'linehaul' ? 'clamp(190px, 28vw, 410px)'
           : zone.id === 'quick'    ? 'clamp(120px, 17vw, 230px)'
           : 'clamp(160px, 23vw, 340px)'
  const vH = zone.id === 'linehaul' ? 'clamp(90px, 16vh, 210px)'
           : zone.id === 'quick'    ? 'clamp(85px, 17vh, 200px)'
           : 'clamp(80px, 15vh, 195px)'

  return (
    <div
      className="relative flex-shrink-0 h-full select-none"
      style={{
        width: '100vw',
        opacity: isActive ? 1 : 0.3,
        filter: isActive ? 'none' : 'brightness(0.40) saturate(0.35)',
        transition: 'opacity 0.95s cubic-bezier(0.4,0,0.2,1), filter 0.95s cubic-bezier(0.4,0,0.2,1)',
      }}
    >

      {/* ── 0 · Sky ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Base sky */}
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'linear-gradient(180deg, #010b18 0%, #020e1e 45%, #031224 80%, #03131f 100%)'
            : 'linear-gradient(180deg, #f0f5fb 0%, #e5edf6 45%, #dce6f0 80%, #d5e0eb 100%)',
        }} />
        {/* Zone-color bloom from top */}
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{
          height: '55%',
          background: `radial-gradient(ellipse 85% 60% at 50% -10%, rgba(${gr},${isDark ? '0.13' : '0.15'}) 0%, transparent 65%)`,
        }} />
        {/* Horizon atmosphere glow */}
        <div className="absolute inset-x-0 pointer-events-none" style={{
          bottom: `${GROUND - 3}%`, height: '18%',
          background: isDark
            ? `linear-gradient(to top, rgba(${gr},0.055) 0%, rgba(${gr},0.016) 55%, transparent 100%)`
            : `linear-gradient(to top, rgba(${gr},0.09) 0%, rgba(${gr},0.025) 55%, transparent 100%)`,
        }} />
      </div>

      {/* ── 1 · Sub-ground ──────────────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{
        height: `${GROUND}%`, zIndex: 1,
        background: isDark
          ? 'linear-gradient(to bottom, #020c19 0%, #010810 100%)'
          : 'linear-gradient(to bottom, #bfcfde 0%, #afc0d2 100%)',
      }} />
      {/* Horizon line */}
      <div className="absolute inset-x-0 pointer-events-none" style={{
        bottom: `${GROUND}%`, height: '1.5px', zIndex: 2,
        background: `linear-gradient(90deg,
          transparent 0%,
          rgba(${gr},${isDark ? '0.22' : '0.35'}) 15%,
          rgba(${gr},${isDark ? '0.32' : '0.50'}) 50%,
          rgba(${gr},${isDark ? '0.22' : '0.35'}) 85%,
          transparent 100%)`,
      }} />

      {/* ── 2 · Buildings ───────────────────────────────────────────────── */}
      {/* LEFT building */}
      <div className="absolute pointer-events-none" style={{
        left: 0, bottom: `${GROUND}%`,
        width: 'clamp(130px, 23%, 28%)', height: '63%',
        zIndex: 10,
      }}>
        <img
          src={zone.fromBg} alt={zone.from} draggable={false}
          className="w-full h-full object-contain object-left-bottom"
          style={{
            filter: isDark
              ? 'brightness(0.82) drop-shadow(0 0 22px rgba(0,0,0,0.55))'
              : 'brightness(0.95) drop-shadow(0 8px 20px rgba(0,0,0,0.10))',
          }}
        />
        {/* Origin label */}
        <div className="absolute bottom-full left-0 pb-1 flex items-center gap-1 pointer-events-none"
          style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}>
          <IconMapPin size={9} color={c} strokeWidth={2.5} />
          <span style={{
            fontSize: '7.5px', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '0.28em',
            color: c,
          }}>{zone.from}</span>
        </div>
      </div>
      {/* RIGHT building */}
      <div className="absolute pointer-events-none" style={{
        right: 0, bottom: `${GROUND}%`,
        width: 'clamp(130px, 23%, 28%)', height: '63%',
        zIndex: 10,
      }}>
        <img
          src={zone.toBg} alt={zone.to} draggable={false}
          className="w-full h-full object-contain object-right-bottom"
          style={{
            filter: isDark
              ? 'brightness(0.82) drop-shadow(0 0 22px rgba(0,0,0,0.55))'
              : 'brightness(0.95) drop-shadow(0 8px 20px rgba(0,0,0,0.10))',
          }}
        />
        {/* Destination label */}
        <div className="absolute bottom-full right-0 pb-1 flex items-center justify-end gap-1 pointer-events-none"
          style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}>
          <span style={{
            fontSize: '7.5px', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '0.28em',
            color: c,
          }}>{zone.to}</span>
          <IconMapPin size={9} color={c} strokeWidth={2.5} />
        </div>
      </div>

      {/* ── 3 · Road + Route SVG (visual centerpiece) ───────────────────── */}
      <div className="absolute inset-x-0 pointer-events-none" style={{
        bottom: `${ROAD_B}%`, height: `${ROAD_H}%`, zIndex: 20,
        overflow: 'visible',
      }}>
        {/* Tarmac surface */}
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'linear-gradient(180deg, #060f1b 0%, #07101d 55%, #050c17 100%)'
            : 'linear-gradient(180deg, #8da2b5 0%, #96acbf 55%, #8499ac 100%)',
          boxShadow: isDark
            ? '0 -1px 0 #0f2235, 0 2px 0 #020810'
            : '0 -1px 0 #6e8aa0, 0 2px 0 #92a9bc',
        }} />

        {/* SVG route — the visual heart of the scene */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          {/* Deep outer glow */}
          <path
            d="M 0 52 L 1000 52"
            stroke={c} strokeWidth="22" fill="none"
            opacity={isDark ? 0.055 : 0.04}
            style={{ animation: 'driv-shimmer 4s ease-in-out infinite' }}
          />
          {/* Mid glow */}
          <path
            d="M 0 52 L 1000 52"
            stroke={c} strokeWidth="9" fill="none"
            opacity={isDark ? 0.13 : 0.09}
          />
          {/* Animated dashed centerline */}
          <path
            d="M 0 52 L 1000 52"
            stroke={c} strokeWidth="2.5" fill="none"
            strokeDasharray="28 14"
            style={{
              opacity: isActive ? 0.75 : 0.30,
              animation: isActive ? 'driv-dash 0.65s linear infinite' : 'none',
              transition: 'opacity 0.5s',
            }}
          />
          {/* Bright sweep highlight */}
          <path
            d="M 0 52 L 1000 52"
            stroke="white" strokeWidth="1.5" fill="none"
            strokeDasharray="8 280"
            style={{
              opacity: 0.22,
              animation: isActive ? 'driv-sweep 3.2s linear infinite' : 'none',
            }}
          />

          {/* ── Waypoint: LEFT (x=240 ≈ 24% = right edge of left building) */}
          <circle cx="240" cy="52" r="5.5" fill={c} opacity="0.92" />
          <circle cx="240" cy="52" r="5.5" fill="none" stroke={c} strokeWidth="1.5"
            opacity={isActive ? 0.35 : 0}
            style={{ transition: 'opacity 0.5s' }}>
            {isActive && <>
              <animate attributeName="r" values="5.5;15;5.5" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0;0.35" dur="2.8s" repeatCount="indefinite" />
            </>}
          </circle>

          {/* ── Waypoint: RIGHT (x=760 ≈ 76% = left edge of right building) */}
          <circle cx="760" cy="52" r="5.5" fill={c} opacity="0.92" />
          <circle cx="760" cy="52" r="5.5" fill="none" stroke={c} strokeWidth="1.5"
            opacity={isActive ? 0.35 : 0}
            style={{ transition: 'opacity 0.5s' }}>
            {isActive && <>
              <animate attributeName="r" values="5.5;15;5.5" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0;0.35" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
            </>}
          </circle>
        </svg>

        {/* Road shimmer sweep */}
        {isActive && (
          <motion.div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
            <motion.div
              className="absolute inset-y-0"
              style={{
                width: '22%',
                background: `linear-gradient(90deg, transparent 0%, rgba(${gr},0.06) 50%, transparent 100%)`,
              }}
              animate={{ x: ['-22%', '550%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            />
          </motion.div>
        )}
      </div>

      {/* ── 4 · Vehicle — hero of the scene ─────────────────────────────── */}
      <div
        ref={vehicleRef}
        className="absolute pointer-events-none"
        style={{
          bottom: `${GROUND}%`,   /* sits exactly on road top surface    */
          left: 0,                /* GSAP translateX drives x movement   */
          width:  vW,
          height: vH,
          zIndex: 30,
          willChange: 'transform',
        }}
      >
        {/* Speed streaks (to the left of vehicle — the trail) */}
        {[
          { w: '58%', h: '2px',   top: '36%', op: '#cc' },
          { w: '44%', h: '1.5px', top: '50%', op: '#88' },
          { w: '30%', h: '1px',   top: '64%', op: '#50' },
          { w: '18%', h: '1px',   top: '74%', op: '#2c' },
        ].map((s, i) => (
          <div key={i} className="absolute pointer-events-none rounded-full" style={{
            width: s.w, height: s.h,
            background: `linear-gradient(to left, ${c}${s.op}, transparent)`,
            top: s.top,
            right: '98%',
          }} />
        ))}

        {/* Vehicle image */}
        <img
          src={zone.vehicle}
          alt={zone.title}
          draggable={false}
          className="w-full h-full object-contain object-bottom"
          style={{
            filter: isDark
              ? 'drop-shadow(0 5px 18px rgba(0,0,0,0.70))'
              : 'drop-shadow(0 4px 12px rgba(0,0,0,0.30))',
            /* fade top edge so vehicle blends with sky */
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 100%)',
          }}
        />
      </div>

      {/* ── 5 · Content — title & description ───────────────────────────── */}
      {/*  Desktop: top-center of scene (sky portion)                       */}
      {/*  Mobile (< sm): pinned just above the road                        */}
      <div
        className="absolute z-40 pointer-events-none
          left-3 right-3 bottom-[32%]
          sm:left-1/2 sm:right-auto sm:bottom-auto sm:top-[9%]
          sm:-translate-x-1/2 sm:w-[min(54%,500px)] sm:text-center"
      >
        <h3 style={{
          fontFamily: 'var(--font-heading, inherit)',
          fontWeight: 900,
          fontSize: 'clamp(17px, 2.3vw, 29px)',
          lineHeight: 1.14,
          letterSpacing: '-0.012em',
          color: isDark ? '#ffffff' : '#0f172a',
          marginBottom: '10px',
          textShadow: isDark
            ? '0 2px 30px rgba(0,0,0,0.90)'
            : '0 2px 16px rgba(255,255,255,0.75)',
        }}>
          {zone.title}
        </h3>
        <p style={{
          fontSize: 'clamp(11.5px, 1.15vw, 14px)',
          lineHeight: 1.74,
          color: isDark ? 'rgba(255,255,255,0.52)' : 'rgba(15,23,42,0.56)',
          textShadow: isDark
            ? '0 1px 18px rgba(0,0,0,0.92)'
            : '0 1px 12px rgba(255,255,255,0.75)',
        }}>
          {zone.desc}
        </p>
      </div>

      {/* ── 6 · Edge vignettes (zone separation) ────────────────────────── */}
      <div className="absolute inset-y-0 left-0 pointer-events-none" style={{
        width: '5.5%', zIndex: 45,
        background: isDark
          ? 'linear-gradient(to right, rgba(1,8,20,0.94) 0%, rgba(1,8,20,0.30) 60%, transparent 100%)'
          : 'linear-gradient(to right, rgba(240,245,251,0.94) 0%, rgba(240,245,251,0.30) 60%, transparent 100%)',
      }} />
      <div className="absolute inset-y-0 right-0 pointer-events-none" style={{
        width: '5.5%', zIndex: 45,
        background: isDark
          ? 'linear-gradient(to left, rgba(1,8,20,0.94) 0%, rgba(1,8,20,0.30) 60%, transparent 100%)'
          : 'linear-gradient(to left, rgba(240,245,251,0.94) 0%, rgba(240,245,251,0.30) 60%, transparent 100%)',
      }} />

      {/* ── 7 · Zone counter ─────────────────────────────────────────────── */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 46 }}>
        <span style={{
          fontSize: '7px', fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: '0.38em',
          color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)',
        }}>
          {String(zone.index + 1).padStart(2, '0')} / {String(ZONES.length).padStart(2, '0')}
        </span>
      </div>

    </div>
  )
}

/* ─── DrivWorldSection ───────────────────────────────────────────────────── */
export default function DrivWorldSection() {
  const viewportRef   = useRef(null)
  const worldRef      = useRef(null)
  const vehicleRefs   = useRef([])
  const vehicleAnims  = useRef([])
  const traverseAnims = useRef([])
  const [activeZone, setActiveZone] = useState(0)
  const [isDark, setIsDark]         = useState(false)

  /* ── Theme detection ─────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const mo = new MutationObserver(check)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])

  /* ── Vehicle animations — bounce always on, traverse scroll-gated ────── */
  useEffect(() => {
    vehicleAnims.current.forEach(a => a.kill())
    vehicleAnims.current  = []
    traverseAnims.current = []

    ZONES.forEach((zone, i) => {
      const el = vehicleRefs.current[i]
      if (!el) return

      /* traverse: off-screen left → off-screen right, starts paused */
      const traverse = gsap.fromTo(el,
        { x: '-28vw', force3D: true },
        {
          x: '128vw',
          duration: zone.vehicleDur,
          ease: 'power1.inOut',
          repeat: -1,
          delay: zone.vehicleDelay,
          repeatDelay: 0.22,
          force3D: true,
          paused: true,   /* scroll-direction gate controls play/pause */
        }
      )

      /* idle suspension bounce — always active */
      const bounce = gsap.to(el, {
        y: '-5px',
        duration: 0.44,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        force3D: true,
      })

      traverseAnims.current.push(traverse)
      vehicleAnims.current.push(traverse, bounce)
    })

    return () => vehicleAnims.current.forEach(a => a.kill())
  }, [])

  /* ── Scroll-driven horizontal pan ───────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const viewport = viewportRef.current
      const world    = worldRef.current
      if (!viewport || !world) return

      const panTween = gsap.to(world, {
        x: () => -(world.scrollWidth - window.innerWidth),
        ease: 'none',
        force3D: true,
      })

      ScrollTrigger.create({
        animation: panTween,
        trigger:   viewport,
        pin:       true,
        pinSpacing: true,
        start:     'top top',
        end:       () => `+=${world.scrollWidth - window.innerWidth}`,
        scrub:     1.3,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate(self) {
          /* active zone index — 0.07 offset so zone switches slightly early */
          const idx = Math.min(
            ZONES.length - 1,
            Math.floor(self.progress * ZONES.length + 0.07)
          )
          setActiveZone(idx)

          /* vehicle direction gate */
          if (self.direction === 1) {
            traverseAnims.current.forEach(t => t.play())
          } else {
            traverseAnims.current.forEach(t => t.pause())
          }
        },
      })
    }, viewportRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* CSS keyframes for SVG route animation (injected once per page) */}
      <style>{ROUTE_STYLE}</style>

      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100svh' }}
      >
        {/* ── World strip — 4 × 100vw ──────────────────────────────────── */}
        <div
          ref={worldRef}
          className="flex h-full"
          style={{ width: `${ZONES.length * 100}vw`, willChange: 'transform' }}
        >
          {ZONES.map((zone, i) => (
            <ZoneScene
              key={zone.id}
              zone={zone}
              isActive={activeZone === i}
              isDark={isDark}
              vehicleRef={el => { vehicleRefs.current[i] = el }}
            />
          ))}
        </div>

        {/* ── Scroll hint (first zone only) ────────────────────────────── */}
        <AnimatePresence>
          {activeZone === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute bottom-4 right-5 z-50 hidden sm:flex items-center gap-1.5"
              style={{ color: isDark ? 'rgba(255,255,255,0.24)' : 'rgba(0,0,0,0.22)' }}
            >
              <span style={{
                fontSize: '8px', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.28em',
              }}>
                Scroll to explore
              </span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '11px', lineHeight: 1 }}
              >›</motion.span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  )
}
