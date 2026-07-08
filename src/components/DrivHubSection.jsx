import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import {
  motion, useScroll, useTransform, useSpring, useMotionValue, useInView,
} from 'framer-motion'
import { SectionHeader, SECTION_SHELL, SECTION_CONTAINER } from './SectionHeader'

// ─── content (unchanged) ────────────────────────────────────────────────────

const facilities = [
  { id: 'washing',    label: 'Wash Center'   },
  { id: 'parking',    label: 'Fleet Parking' },
  { id: 'monitoring', label: 'Monitoring'    },
  { id: 'dispatch',   label: 'Dispatch'      },
  { id: 'helpdesk',   label: 'Help Desk'     },
]
const highlights = [
  { label: '500+ Vehicle Capacity',  color: 'lime'   },
  { label: '24/7 Operations',        color: 'orange' },
  { label: 'Bhiwandi, Mumbai',       color: 'lime'   },
  { label: 'GPS Fleet Tracking',     color: 'orange' },
  { label: 'On site Driver Support', color: 'lime'   },
]

// ─── theme tokens ───────────────────────────────────────────────────────────

function makeTheme(isDark) {
  return isDark ? {
    sectionBg:    '#0b0f1a',
    dotFill:      '#A3E635',
    facilityDot:  'rgba(163,230,53,0.32)',
    facilityText: 'rgba(255,255,255,0.5)',
    activeColor:  '#A3E635',
    divider:      'rgba(255,255,255,0.07)',
    liveBg:       'rgba(163,230,53,0.1)',
    liveBorder:   'rgba(163,230,53,0.22)',
  } : {
    sectionBg:    '#f0f4f8',
    dotFill:      '#4d7c0f',
    facilityDot:  'rgba(77,124,15,0.35)',
    facilityText: 'rgba(15,23,42,0.55)',
    activeColor:  '#4d7c0f',
    divider:      'rgba(15,23,42,0.09)',
    liveBg:       'rgba(77,124,15,0.08)',
    liveBorder:   'rgba(77,124,15,0.20)',
  }
}

// ─── keyframes ────────────────────────────────────────────────────────────

const CSS = `
  @keyframes blink { 0%,100%{opacity:.4} 50%{opacity:1} }
`

// ─── campus — the generated Driv HUB illustration, open composition ───────

function CampusScene({ sectionRef, T }) {
  const wrapRef = useRef(null)
  useInView(wrapRef, { once: true, amount: .1 })

  // mouse tilt — subtle, premium feel
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotY   = useSpring(useTransform(mouseX, [-.5, .5], [-2.5, 2.5]), { stiffness: 65, damping: 22 })
  const rotX   = useSpring(useTransform(mouseY, [-.5, .5], [1.5, -1.5]), { stiffness: 65, damping: 22 })

  // scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -30])

  const onMove  = useCallback((e) => {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width  - .5)
    mouseY.set((e.clientY - r.top)  / r.height - .5)
  }, [mouseX, mouseY])
  const onLeave = useCallback(() => { mouseX.set(0); mouseY.set(0) }, [mouseX, mouseY])

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ perspective: '1400px', willChange: 'transform' }}>
      <motion.div
        style={{
          rotateX: rotX, rotateY: rotY,
          transformStyle: 'preserve-3d',
          position: 'relative', overflow: 'visible',
        }}
        initial={{ opacity: 0, y: 30, scale: .96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: .2 }}
        transition={{ duration: .9, ease: [.22, 1, .36, 1] }}
      >
        <motion.img
          src="/scenes/driv-hub-campus.webp"
          alt="Driv HUB — Bhiwandi Logistics Park operations campus"
          loading="lazy"
          draggable={false}
          style={{
            y: imgY,
            width: '100%', height: 'auto', display: 'block',
            maxWidth: '900px', margin: '0 auto',
            filter: 'drop-shadow(0 24px 48px rgba(0,0,0,.22))',
          }}
        />

        {/* ── UI overlay ──────────────────────────────────────────────────── */}
        <div style={{ position: 'absolute', top: '2%', left: '2%', zIndex: 10, pointerEvents: 'none' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px',
            borderRadius: '20px', border: `1px solid ${T.liveBorder}`,
            background: T.liveBg, padding: '4px 12px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: T.dotFill,
              animation: 'blink 1.6s ease-in-out infinite' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.2em',
              textTransform: 'uppercase', color: T.dotFill }}>Live</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '0%', right: '2%', zIndex: 10, pointerEvents: 'none' }}>
          <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase',
            color: `${T.dotFill}6b`, margin: 0 }}>Bhiwandi Logistics Park</p>
        </div>

      </motion.div>
    </div>
  )
}

// ─── section ──────────────────────────────────────────────────────────────

export default function DrivHubSection() {
  const sectionRef    = useRef(null)
  const headerInView  = useInView(sectionRef, { once: true, amount: .06 })
  const [hovFacility, setHovFacility] = useState(null)

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

  // Stable element identity across theme re-renders — TextReveal splits these
  // into word spans via direct DOM mutation outside React's tracking, so a
  // fresh element reference on every isDark toggle would fight that mutation
  // and leave the text stuck invisible. Purely CSS-driven (dark: variant)
  // color swaps avoid needing a new reference at all.
  const heroTitle = useMemo(() => (
    <>The Driv{' '}
      <span style={{ background: 'linear-gradient(130deg,#F97316,#fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HUB</span>
    </>
  ), [])
  const heroDescription = useMemo(() => (
    <>India&apos;s fleet operations, unified at one address —{' '}
      <span className="font-semibold text-slate-900 dark:text-white/85">Bhiwandi Logistics Park</span>, where
      washing, parking, GPS monitoring, dispatch, and driver support run around the clock.</>
  ), [])

  return (
    <>
      <style>{CSS}</style>

      <section id="hub" ref={sectionRef} className={`${SECTION_SHELL} overflow-x-clip`}
        style={{ background: T.sectionBg, transition: 'background 0.5s ease' }}
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(163,230,53,.1)' : 'rgba(77,124,15,.08)'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px', opacity: .2 }} />

        <div className={SECTION_CONTAINER} style={{ maxWidth: '90rem' }}>

          {/* header — standard site typography */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
          >
            <SectionHeader
              onDark={isDark}
              label="Operations Hub"
              titleAs="h1"
              title={heroTitle}
              description={heroDescription}
            />
          </motion.div>

          {/* campus — the Driv HUB illustration */}
          <div className="mb-5 sm:mb-6 lg:mb-8 mt-4 sm:mt-6">
            <CampusScene sectionRef={sectionRef} T={T} />
          </div>

          {/* facility labels */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .42 }}
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6 py-3.5 sm:py-4 mb-4 sm:mb-6"
            style={{ borderTop: `1px solid ${T.divider}`, borderBottom: `1px solid ${T.divider}` }}
          >
            {facilities.map(f => (
              <button key={f.id} type="button"
                onMouseEnter={() => setHovFacility(f.id)}
                onMouseLeave={() => setHovFacility(null)}
                className="flex items-center gap-2 bg-transparent border-none cursor-default py-0.5"
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                  style={{
                    background: hovFacility === f.id ? T.activeColor : T.facilityDot,
                    boxShadow: hovFacility === f.id ? `0 0 8px ${T.activeColor}` : 'none',
                  }} />
                <span className="text-sm font-semibold tracking-tight transition-colors duration-300"
                  style={{ color: hovFacility === f.id ? T.activeColor : T.facilityText }}>{f.label}</span>
              </button>
            ))}
          </motion.div>

          {/* badges */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .42 }}
            className="flex flex-wrap justify-center gap-2 mt-1"
          >
            {highlights.map(({ label, color }, i) => (
              <motion.span key={label}
                initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: .3, delay: i * .05 }}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{
                  border: color === 'lime' ? '1px solid rgba(163,230,53,.28)' : '1px solid rgba(249,115,22,.28)',
                  color: color === 'lime' ? T.dotFill : '#ea7a1f',
                  background: color === 'lime' ? `${T.dotFill}12` : 'rgba(249,115,22,.09)',
                }}>{label}</motion.span>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  )
}
