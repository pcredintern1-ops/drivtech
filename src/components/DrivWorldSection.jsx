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
const GROUND = 15  // ground plane (road top / building base)
const ROAD_B = 10   // road bottom edge
const ROAD_H = 8  // road height

/* ─── Zone data ──────────────────────────────────────────────────────────── */
const ZONES = [
  {
    id: 'fleet', index: 0,
    Icon: IconTruck, color: '#A3E635', glowRgb: '163,230,53',
    title: 'Enterprise Dedicated Fleet',
    desc: 'Dedicated fleet solutions tailored to your business with reliable vehicles, drivers, and end-to-end operational support.',
    vehicle: '/vehicles/tata_ace.webp',
    fromBg: '/scenes/building-warehouse.webp', toBg: '/scenes/dispatch-hub.webp',
    from: 'Warehouse', to: 'Dark Store',
    vehicleDur: 5.5, vehicleDelay: 0,
    /* TODO: replace with each service's own image (light + dark) */
    img: '/services/service-card.png', imgDark: '/services/service-card.png',
  },
  {
    id: 'linehaul', index: 1,
    Icon: IconRoute, color: '#F97316', glowRgb: '249,115,22',
    title: 'Linehaul Logistics',
    desc: 'Efficient intercity and hub-to-hub transportation designed for seamless long-distance freight movement.',
    vehicle: '/vehicles/truck.webp',
    fromBg: '/scenes/building-hub.webp', toBg: '/scenes/building-warehouse.webp',
    from: 'Mumbai', to: 'Pune',
    vehicleDur: 4.5, vehicleDelay: 1.2,
    /* TODO: replace with each service's own image (light + dark) */
    img: '/services/service-card.png', imgDark: '/services/service-card.png',
  },
  {
    id: 'adhoc', index: 2,
    Icon: IconBolt, color: '#F97316', glowRgb: '249,115,22',
    title: 'Adhoc Vehicle Support',
    desc: 'On-demand vehicle availability to handle urgent deliveries, peak demand, and temporary logistics requirements.',
    vehicle: '/vehicles/tata_tempo.webp',
    fromBg: '/scenes/building-hub.webp', toBg: '/scenes/building-warehouse.webp',
    from: 'DRIV Hub', to: 'On Demand',
    vehicleDur: 4.0, vehicleDelay: 0.7,
    /* TODO: replace with each service's own image (light + dark) */
    img: '/services/service-card.png', imgDark: '/services/service-card.png',
  },
  {
    id: 'quick', index: 3,
    Icon: IconBike, color: '#A3E635', glowRgb: '163,230,53',
    title: 'Quick Commerce Riders',
    desc: 'Fast and dependable rider network for hyperlocal, same-day, and instant deliveries.',
    vehicle: '/vehicles/scooty.webp',
    fromBg: '/scenes/dispatch-hub.webp', toBg: '/scenes/customer-house.webp',
    from: 'Dark Store', to: 'Doorstep',
    vehicleDur: 3.8, vehicleDelay: 0.3,
    /* TODO: replace with each service's own image (light + dark) */
    img: '/services/service-card.png', imgDark: '/services/service-card.png',
  },
]

/* ─── SVG route CSS keyframes (injected once) ───────────────────────────── */
const ROUTE_STYLE = `
  @keyframes driv-dash    { to { stroke-dashoffset: -42; } }
  @keyframes driv-sweep   { to { stroke-dashoffset: -1200; } }
  @keyframes driv-shimmer { 0%,100% { opacity:0.03; } 50% { opacity:0.08; } }
`

/* ─── ZoneScene ──────────────────────────────────────────────────────────── */
/* `pos` is the CONTINUOUS scroll position in zone-space (0 → ZONES.length-1).
   Everything is derived from `offset = zone.index - pos`, so the motion tracks
   the scrollbar 1:1 instead of snapping to a rounded active index — that's what
   removes the "tap" feel and turns it into a real parallax.
     offset > 0  → zone is still below  (upcoming) → card sits low, text high
     offset = 0  → zone is centered     (active)
     offset < 0  → zone has passed      (above)    → card sits high, text low
   The card (rising from below) and the text (descending from above) move on
   OPPOSITE axes and at DIFFERENT rates → parallax depth. Reverse scroll simply
   runs the same maths backwards. */
function ZoneScene({ zone, isDark, pos }) {
  const offset = zone.index - pos
  const dist = Math.abs(offset)
  const cd = Math.min(dist, 1)                   // clamped distance for depth effects

  /* Eased crossfade — softer than linear, so cards "resolve" into focus */
  const opacity = Math.max(0, 1 - cd * cd * (3 - 2 * cd))   // smoothstep

  /* Card: rises from below + recedes in 3D — scales down, blurs out of
     focus, and arrives TILTED (rotateZ), straightening to 0° as it locks. */
  const cardY = offset * 56                      // vh — vertical travel
  const cardScale = 1 - cd * 0.14                // shrinks with depth
  const cardRot = offset * 14                    // deg — in-plane tilt → straight at centre
  const cardBlur = cd * 4                         // px — depth-of-field

  /* Text: descends from above, opposite axis + gentle scale/blur, and the
     same tilt-to-straight (opposite lean to the card for a layered feel). */
  const textY = -offset * 40                      // vh
  const textScale = 1 - cd * 0.06
  const textBlur = cd * 2.5
  const textRot = offset * -16                     // deg — tilt that resolves to straight

  const z = Math.round(100 - dist * 10)           // nearer zone overlaps on top

  return (
    <div
      className="absolute inset-0 select-none"
      style={{ zIndex: z, pointerEvents: dist < 0.5 ? 'auto' : 'none' }}
    >
      {/* Card layer — appears from below, recedes in 3D */}
      <div
        className="absolute inset-0 flex items-center justify-center px-4 pt-[38vh] sm:pt-[36vh]"
        style={{
          perspective: '1400px',
          transform: `translate3d(0, ${cardY}vh, 0)`,
          opacity,
          willChange: 'transform, opacity',
        }}
      >
        <div
          className="relative w-[min(94%,920px)] aspect-[1857/847] rounded-2xl sm:rounded-[28px] overflow-hidden"
          style={{
            transform: `rotate(${cardRot}deg) scale(${cardScale})`,
            filter: cardBlur > 0.05 ? `blur(${cardBlur}px)` : 'none',
            transformStyle: 'preserve-3d',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
            boxShadow: isDark
              ? '0 24px 60px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.35)'
              : '0 20px 48px rgba(15,23,42,0.14), 0 4px 14px rgba(15,23,42,0.06)',
            willChange: 'transform, filter',
          }}
        >
          {/* Light + dark image — theme swap via global .about-img-* CSS.
             Card aspect matches the image, so the full image shows uncropped. */}
          <img
            src={zone.img} alt={zone.title} draggable={false}
            className="about-img-light absolute inset-0 w-full h-full object-cover"
          />
          <img
            src={zone.imgDark} alt={zone.title} draggable={false}
            className="about-img-dark absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text layer — appears from above, tilted, and straightens as it locks */}
      <div
        className="absolute inset-0 flex items-start justify-center px-6 pt-[30vh] pointer-events-none"
        style={{
          transform: `translate3d(0, ${textY}vh, 0) rotate(${textRot}deg) scale(${textScale})`,
          filter: textBlur > 0.05 ? `blur(${textBlur}px)` : 'none',
          opacity,
          willChange: 'transform, opacity, filter',
        }}
      >
        <div className="max-w-[460px] text-center">
          <h3 style={{
            fontFamily: 'var(--font-heading, inherit)',
            fontWeight: 800,
            fontSize: 'clamp(20px, 2.2vw, 30px)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: isDark ? '#fff' : '#0f172a',
            marginBottom: '12px',
            /* Contrast halo so the title reads cleanly over the busy image */
            textShadow: isDark
              ? '0 2px 4px rgba(0,0,0,0.9), 0 4px 22px rgba(0,0,0,0.7)'
              : '0 1px 2px rgba(255,255,255,0.9), 0 2px 14px rgba(255,255,255,0.7)',
          }}>
            {zone.title}
          </h3>

          <p style={{
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            lineHeight: 1.7,
            fontWeight: 500,
            color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.82)',
            textShadow: isDark
              ? '0 1px 3px rgba(0,0,0,0.85), 0 2px 16px rgba(0,0,0,0.6)'
              : '0 1px 2px rgba(255,255,255,0.85), 0 2px 12px rgba(255,255,255,0.6)',
          }}>
            {zone.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── DrivWorldSection ───────────────────────────────────────────────────── */
export default function DrivWorldSection() {
  const viewportRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDark, setIsDark] = useState(false)

  /* ── Theme detection ─────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const mo = new MutationObserver(check)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])

  /* ── Pinned + continuous parallax scroll ─────────────────────────────
     The section pins for the full scroll range. Instead of snapping to a
     rounded index, we keep the RAW scroll progress and feed each zone a
     continuous `pos` (0 → ZONES.length-1). Each zone derives its own
     card/text transforms from that — so the cards rise from below and the
     text descends from above in lock-step with the scrollbar (true
     parallax), reversing perfectly on scroll-up. `scrub` adds a touch of
     inertia so the motion feels smooth rather than twitchy.            */
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
        /* Pin distance per service — trimmed so the section doesn't hold
           you for as long before releasing */
        end: () => `+=${steps * window.innerHeight * 1.1}`,
        /* Higher scrub = more inertia → glides to rest instead of tracking
           the scrollbar 1:1, which is what makes it feel premium & smooth */
        scrub: 1.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          setScrollProgress(self.progress)
        },
      })
    }, viewportRef)

    return () => ctx.revert()
  }, [])

  /* Continuous position in zone-space with a small DWELL on each service:
     the active card holds briefly at the start of its segment, then eases to
     the next over the REST of the segment. A short hold keeps a touch of
     "settle" without locking you in, and spreading the transition across most
     of the scroll makes each card's animation slow and clearly visible. */
  const steps = ZONES.length - 1
  const seg = scrollProgress * steps
  const i = Math.min(steps - 1, Math.floor(seg))
  const f = seg - i                                 // 0→1 within current segment
  const HOLD = 0.18                                 // fraction of segment spent holding
  const t = f <= HOLD ? 0 : (f - HOLD) / (1 - HOLD)
  const eased = t * t * t * (t * (t * 6 - 15) + 10) // smootherstep — gentler ease in/out
  const pos = scrollProgress >= 1 ? steps : i + eased
  const activeZone = Math.round(pos)

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
        {/* Persistent section header — lives at the top of the pinned world so
            the whole 4-service experience is one cohesive section (no stacked
            block above → no empty gap). */}
        <div className="absolute top-0 inset-x-0 z-50 text-center px-6 pt-[8vh] sm:pt-[7vh] pointer-events-none">
          <h2
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Logistics Solutions That <span className="gradient-text">Move Business Forward</span>
          </h2>
          <p
            className="max-w-2xl mx-auto mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed"
            style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.6)' }}
          >
            Flexible, scalable, and technology-driven logistics solutions for enterprises across every stage of the supply chain.
          </p>
        </div>

        {/* ── Zone stack — continuous parallax, driven by `pos` ─────────── */}
        <div className="relative w-full h-full">
          {ZONES.map((zone) => (
            <ZoneScene
              key={zone.id}
              zone={zone}
              isDark={isDark}
              pos={pos}
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
