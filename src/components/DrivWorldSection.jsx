/**
 * DrivWorldSection v5 — Premium cinematic logistics world
 * Pinned & stuck: the section locks in place while you scroll through it.
 * Each scroll step swaps the current service straight out (slides up) for
 * the next (slides up from below) — a discrete snap, not a drag-along pan.
 * Vehicles are static — parked on the route, not animated.
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
const GROUND = 28   // ground plane (road top / building base)
const ROAD_B = 20   // road bottom edge
const ROAD_H = 8    // road height

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
function ZoneScene({ zone, status, isDark }) {
  const c = zone.color
  const gr = zone.glowRgb
  const isActive = status === 'current'

  /* vehicle dimensions — linehaul truck biggest, scooty smallest */
  const vW = zone.id === 'linehaul' ? 'clamp(190px, 28vw, 410px)'
    : zone.id === 'quick' ? 'clamp(120px, 17vw, 230px)'
      : 'clamp(160px, 23vw, 340px)'
  const vH = zone.id === 'linehaul' ? 'clamp(90px, 16vh, 210px)'
    : zone.id === 'quick' ? 'clamp(85px, 17vh, 200px)'
      : 'clamp(80px, 15vh, 195px)'

  return (
    <div
      className="absolute inset-0 select-none"
      style={{
        /* Discrete stacked overlay, not a continuous pan:
           current  → in place, fully visible
           next     → parked just below the viewport, waiting to rise in
           prev     → already slid out above the viewport                */
        transform: status === 'current' ? 'translateY(0)'
          : status === 'prev' ? 'translateY(-100%)'
            : 'translateY(100%)',
        opacity: isActive ? 1 : 0,
        transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.55s ease',
        zIndex: isActive ? 2 : 1,
        pointerEvents: isActive ? 'auto' : 'none',
        willChange: 'transform, opacity',
      }}
    >
      {/* Inset padding — keeps the card off the viewport edges */}
      <div className="absolute inset-0 p-3 sm:p-5 md:p-7 lg:p-9">
        {/* The card itself — same internal layout, just framed and clipped */}
        <div
          className="relative w-full h-full rounded-2xl sm:rounded-[28px] overflow-hidden"
          style={{
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
            boxShadow: isDark
              ? '0 24px 60px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.35)'
              : '0 20px 48px rgba(15,23,42,0.14), 0 4px 14px rgba(15,23,42,0.06)',
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
            {/* Origin label — sits inside the building's top edge, never clips */}
            <div className="absolute top-2 left-2 flex items-center gap-1 pointer-events-none"
              style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}>
              <IconMapPin size={9} color={c} strokeWidth={2.5} />
              <span style={{
                fontSize: '7.5px', fontWeight: 900,
                textTransform: 'uppercase', letterSpacing: '0.28em',
                color: c,
                textShadow: isDark ? '0 1px 6px rgba(0,0,0,0.8)' : '0 1px 6px rgba(255,255,255,0.8)',
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
            {/* Destination label — sits inside the building's top edge, never clips */}
            <div className="absolute top-2 right-2 flex items-center justify-end gap-1 pointer-events-none"
              style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}>
              <span style={{
                fontSize: '7.5px', fontWeight: 900,
                textTransform: 'uppercase', letterSpacing: '0.28em',
                color: c,
                textShadow: isDark ? '0 1px 6px rgba(0,0,0,0.8)' : '0 1px 6px rgba(255,255,255,0.8)',
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

          {/* ── 4 · Vehicle — hero of the scene, parked on the route ─────────── */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: `${GROUND}%`,   /* sits exactly on road top surface    */
              left: '50%',
              transform: 'translateX(-50%)',  /* static — centered on the route, no movement */
              width: vW,
              height: vH,
              zIndex: 30,
            }}
          >
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

          <div
            className="absolute z-40 pointer-events-none
    left-3 right-3 bottom-[30%]
    sm:left-1/2 sm:right-auto sm:bottom-auto sm:top-[17%]
    sm:-translate-x-1/2 sm:w-[min(50%,460px)] sm:text-center"
          >
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div
                  key={zone.id}
                  initial={{
                    y: -80,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -80,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading, inherit)',
                      fontWeight: 800,
                      fontSize: 'clamp(15px, 1.7vw, 21px)',
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      color: isDark ? '#ffffff' : '#0f172a',
                      marginBottom: '8px',
                    }}
                  >
                    {zone.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'clamp(11px, 0.95vw, 13px)',
                      lineHeight: 1.68,
                      color: isDark
                        ? 'rgba(255,255,255,0.52)'
                        : 'rgba(15,23,42,0.56)',
                    }}
                  >
                    {zone.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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

        </div>{/* /card */}
      </div>{/* /inset padding */}
    </div>
  )
}

/* ─── DrivWorldSection ───────────────────────────────────────────────────── */
export default function DrivWorldSection() {
  const viewportRef = useRef(null)
  const [activeZone, setActiveZone] = useState(0)
  const [isDark, setIsDark] = useState(false)

  /* ── Theme detection ─────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const mo = new MutationObserver(check)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])

  /* ── Pinned + snapped scroll ─────────────────────────────────────────
     The section sticks in the viewport for the full scroll range. Each
     scroll step snaps cleanly to one of the 4 services — there is no
     drag-along pan, no in-between half state. ZoneScene reacts to the
     resulting `status` prop (prev/current/next) with its own discrete
     slide-up transition, so the swap is driven by React state, not by
     scrubbing an animation to scroll position.                        */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const viewport = viewportRef.current
      if (!viewport) return

      const steps = ZONES.length - 1

      ScrollTrigger.create({
        trigger: viewport,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${steps * window.innerHeight}`,
        snap: {
          snapTo: 1 / steps,
          duration: 0.5,
          ease: 'power1.inOut',
        },
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const idx = Math.min(steps, Math.round(self.progress * steps))
          setActiveZone(idx)
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
        style={{
          height: '100svh',
          /* Backdrop behind the framed cards — fills the inset gap so the
             padding around each card reads intentionally on both themes. */
          background: isDark ? '#0a0f1a' : '#eef2f7',
        }}
      >
        {/* ── Zone stack — 4 full-bleed overlays, one "current" at a time ── */}
        <div className="relative w-full h-full">
          {ZONES.map((zone, i) => (
            <ZoneScene
              key={zone.id}
              zone={zone}
              status={i === activeZone ? 'current' : i < activeZone ? 'prev' : 'next'}
              isDark={isDark}
            />
          ))}
        </div>

        {/* ── Vertical progress rail — techy section indicator ────────── */}
        <div className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3 pointer-events-none">
          {ZONES.map((zone, i) => (
            <div key={zone.id} className="relative flex items-center justify-center" style={{ width: '14px', height: activeZone === i ? '28px' : '14px' }}>
              <div
                className="rounded-full"
                style={{
                  width: activeZone === i ? '3px' : '4px',
                  height: activeZone === i ? '28px' : '4px',
                  background: activeZone === i ? zone.color : (isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.20)'),
                  boxShadow: activeZone === i ? `0 0 10px ${zone.color}90` : 'none',
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
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
