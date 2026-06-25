import { useRef, useState, useCallback } from 'react'
import {
  motion, useScroll, useTransform, useSpring,
  useMotionValue, useInView,
} from 'framer-motion'
import { IconTruck, IconClock, IconMapPin } from '@tabler/icons-react'
import { SectionLabel, SECTION_CONTAINER } from './SectionHeader'

// ─── unchanged content ─────────────────────────────────────────────────────────

const facilities = [
  { id:'washing',    label:'Wash Center'   },
  { id:'parking',    label:'Fleet Parking' },
  { id:'monitoring', label:'Monitoring'    },
  { id:'dispatch',   label:'Dispatch'      },
  { id:'helpdesk',   label:'Help Desk'     },
]
const hubStats = [
  { label:'500+ vehicle capacity', Icon:IconTruck },
  { label:'24/7 operations',       Icon:IconClock },
]
const highlights = [
  { label:'500+ Vehicle Capacity', color:'lime'   },
  { label:'24/7 Operations',       color:'orange' },
  { label:'Bhiwandi, Mumbai',      color:'lime'   },
  { label:'GPS Fleet Tracking',    color:'orange' },
  { label:'On site Driver Support',color:'lime'   },
]

// ─── keyframes ────────────────────────────────────────────────────────────────

const CSS = `
  @keyframes gpsRing  { 0%{r:4;opacity:.9} 100%{r:32;opacity:0} }
  @keyframes routeAnim{ from{stroke-dashoffset:120} to{stroke-dashoffset:0} }
  @keyframes blink    { 0%,100%{opacity:.4} 50%{opacity:1} }
  @keyframes hubBreath{ 0%,100%{opacity:.15} 50%{opacity:.32} }
  @keyframes driveR   { from{transform:translateX(-260px)} to{transform:translateX(2600px)} }
  @keyframes driveL   { from{transform:translateX(2600px)} to{transform:translateX(-260px)} }
`

// ─── GPS pulse ────────────────────────────────────────────────────────────────

function Pulse({ cx, cy, color, delay = 0, r = 5 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={color}
        style={{ filter:`drop-shadow(0 0 5px ${color})` }}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1.6"
        style={{ animation:`gpsRing 2.8s ease-out ${delay}s infinite` }}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth=".8" opacity=".38"
        style={{ animation:`gpsRing 2.8s ease-out ${delay + .9}s infinite` }}/>
    </g>
  )
}

// ─── campus scene ─────────────────────────────────────────────────────────────

function CampusScene({ sectionRef }) {
  const wrapRef = useRef(null)
  const inView  = useInView(wrapRef, { once: true, amount: .1 })

  // mouse tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotY   = useSpring(useTransform(mouseX, [-.5, .5], [-4, 4]), { stiffness: 65, damping: 22 })
  const rotX   = useSpring(useTransform(mouseY, [-.5, .5], [2.5, -2.5]), { stiffness: 65, damping: 22 })

  // scroll parallax layers
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY   = useTransform(scrollYProgress, [0, 1], [0, -20])
  const whY   = useTransform(scrollYProgress, [0, 1], [0, -40])
  const bldY  = useTransform(scrollYProgress, [0, 1], [0, -65])
  const svgY  = useTransform(scrollYProgress, [0, 1], [0, -50])
  const vehY  = useTransform(scrollYProgress, [0, 1], [0, -18])

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
          position: 'relative', overflow: 'hidden', borderRadius: '20px',
          border: '1px solid rgba(163,230,53,.12)',
          boxShadow: '0 32px 80px rgba(0,0,0,.65)',
          height: 'clamp(380px,52vw,660px)',
          background: '#06101e',
        }}
        initial={{ opacity: 0, y: 50, scale: .97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1, ease: [.22, 1, .36, 1] }}
      >

        {/* ── LAYER 1: background atmosphere ───────────────────────────────── */}
        <motion.div style={{ y: bgY, position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
          {/* dot grid */}
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(163,230,53,.2) 1px, transparent 1px)',
            backgroundSize: '28px 28px', opacity: .32 }}/>
          {/* center hub glow */}
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            width: '55%', paddingBottom: '38%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(163,230,53,.12) 0%, transparent 68%)',
            filter: 'blur(40px)',
            animation: 'hubBreath 4s ease-in-out infinite' }}/>
          {/* left accent glow */}
          <div style={{ position: 'absolute', bottom: '20%', left: '5%',
            width: '28%', paddingBottom: '20%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,.08) 0%, transparent 68%)',
            filter: 'blur(48px)' }}/>
          {/* right accent glow */}
          <div style={{ position: 'absolute', bottom: '22%', right: '5%',
            width: '26%', paddingBottom: '18%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(163,230,53,.07) 0%, transparent 68%)',
            filter: 'blur(48px)' }}/>
          {/* vignette edges */}
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 40%, rgba(6,16,30,.75) 100%)' }}/>
        </motion.div>

        {/* ── LAYER 2: ground + road fills ─────────────────────────────────── */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* sky-to-ground gradient */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%',
            background: 'linear-gradient(to top, rgba(10,24,14,.55) 0%, transparent 100%)' }}/>
          {/* back road band */}
          <div style={{ position: 'absolute', bottom: '37%', left: 0, right: 0, height: 'clamp(12px,1.6vw,22px)',
            background: '#0b1e2f', borderTop: '1px solid rgba(163,230,53,.12)', borderBottom: '1px solid rgba(163,230,53,.08)' }}/>
          {/* ground line */}
          <div style={{ position: 'absolute', bottom: '22%', left: 0, right: 0, height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(163,230,53,.4) 20%, rgba(163,230,53,.6) 50%, rgba(163,230,53,.4) 80%, transparent)' }}/>
          {/* front road band */}
          <div style={{ position: 'absolute', bottom: '7%', left: 0, right: 0, height: 'clamp(16px,2.2vw,30px)',
            background: '#0b1e2f', borderTop: '1px solid rgba(163,230,53,.15)', borderBottom: '1px solid rgba(163,230,53,.1)' }}/>
        </div>

        {/* ── LAYER 3: SVG route lines + GPS pulses ────────────────────────── */}
        <motion.div style={{ y: svgY, position: 'absolute', inset: 0, pointerEvents: 'none' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: .6, delay: .8 }} aria-hidden>
          <svg viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            {/* back road route (y≈220) */}
            <path d="M 0,222 H 1000" fill="none" stroke="rgba(163,230,53,.22)" strokeWidth="1"
              strokeDasharray="14 10"
              style={{ animation: 'routeAnim 4s linear 0s infinite' }}/>
            <path d="M 1000,222 H 0" fill="none" stroke="rgba(249,115,22,.18)" strokeWidth="1"
              strokeDasharray="10 14"
              style={{ animation: 'routeAnim 5s linear 1.5s infinite' }}/>

            {/* front road route (y≈420) */}
            <path d="M 0,420 H 1000" fill="none" stroke="rgba(163,230,53,.28)" strokeWidth="1.2"
              strokeDasharray="16 10"
              style={{ animation: 'routeAnim 3.5s linear 0.4s infinite' }}/>
            <path d="M 1000,420 H 0" fill="none" stroke="rgba(249,115,22,.22)" strokeWidth="1.2"
              strokeDasharray="12 14"
              style={{ animation: 'routeAnim 4.5s linear 2s infinite' }}/>

            {/* vertical connector (dispatch → hub) */}
            <path d="M 230,222 V 380" fill="none" stroke="rgba(249,115,22,.2)" strokeWidth=".8"
              strokeDasharray="6 8"
              style={{ animation: 'routeAnim 3s linear 0.8s infinite' }}/>
            {/* vertical connector (hub → monitoring right) */}
            <path d="M 770,222 V 380" fill="none" stroke="rgba(163,230,53,.18)" strokeWidth=".8"
              strokeDasharray="6 8"
              style={{ animation: 'routeAnim 3.2s linear 1.2s infinite' }}/>

            {/* moving data packets */}
            <motion.circle r={3.5} fill="#A3E635" opacity=".9"
              style={{ filter: 'drop-shadow(0 0 5px #A3E635)' }}
              animate={{ cx: [0, 1000], cy: [222, 222], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5.5, delay: .3, repeat: Infinity, times: [0, .04, .96, 1] }}/>
            <motion.circle r={3} fill="#F97316" opacity=".9"
              style={{ filter: 'drop-shadow(0 0 5px #F97316)' }}
              animate={{ cx: [1000, 0], cy: [222, 222], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 7, delay: 2.1, repeat: Infinity, times: [0, .04, .96, 1] }}/>
            <motion.circle r={3.8} fill="#A3E635" opacity=".9"
              style={{ filter: 'drop-shadow(0 0 5px #A3E635)' }}
              animate={{ cx: [0, 1000], cy: [420, 420], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6.5, delay: 1, repeat: Infinity, times: [0, .04, .96, 1] }}/>
            <motion.circle r={3} fill="#F97316"
              style={{ filter: 'drop-shadow(0 0 5px #F97316)' }}
              animate={{ cx: [1000, 0], cy: [420, 420], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 8, delay: 3.5, repeat: Infinity, times: [0, .04, .96, 1] }}/>

            {/* GPS pulses on building positions */}
            <Pulse cx={500} cy={185} color="#A3E635" delay={0}    r={5}/>
            <Pulse cx={215} cy={260} color="#F97316" delay={0.8}  r={4}/>
            <Pulse cx={785} cy={260} color="#A3E635" delay={1.6}  r={4}/>
            <Pulse cx={85}  cy={190} color="#A3E635" delay={1.1}  r={3.2}/>
            <Pulse cx={915} cy={190} color="#A3E635" delay={2.0}  r={3.2}/>
          </svg>
        </motion.div>

        {/* ── LAYER 4: back warehouses ──────────────────────────────────────── */}
        <motion.div style={{ y: whY, position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
          <motion.img src="/scenes/building-warehouse.webp" alt=""
            loading="lazy"
            initial={{ opacity: 0, y: 24, scale: .88 }}
            animate={inView ? { opacity: .62, y: 0, scale: 1 } : {}}
            transition={{ duration: .85, delay: .5, ease: [.22, 1, .36, 1] }}
            style={{ position: 'absolute', bottom: '37%', left: '0%',
              width: 'clamp(70px,10.5vw,140px)', height: 'auto',
              filter: 'brightness(.72) drop-shadow(0 8px 18px rgba(0,0,0,.5))' }}/>
          <motion.img src="/scenes/building-warehouse.webp" alt=""
            loading="lazy"
            initial={{ opacity: 0, y: 24, scale: .88 }}
            animate={inView ? { opacity: .56, y: 0, scale: 1 } : {}}
            transition={{ duration: .85, delay: .55, ease: [.22, 1, .36, 1] }}
            style={{ position: 'absolute', bottom: '38%', right: '0%',
              width: 'clamp(65px,9.5vw,128px)', height: 'auto',
              filter: 'brightness(.68) drop-shadow(0 8px 18px rgba(0,0,0,.5))',
              transform: 'scaleX(-1)' }}/>
        </motion.div>

        {/* ── LAYER 5: back-road vehicles ───────────────────────────────────── */}
        {inView && (
          <motion.div style={{ y: vehY, position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
            <img src="/vehicles/tata_tempo.webp" alt="" loading="lazy"
              style={{ position: 'absolute', bottom: 'calc(37% + 2px)',
                height: 'clamp(14px,1.8vw,24px)', width: 'auto',
                filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.6)) brightness(.82)',
                animation: 'driveR 18s linear 1.5s infinite' }}/>
            <img src="/vehicles/scooty.webp" alt="" loading="lazy"
              style={{ position: 'absolute', bottom: 'calc(37% + 3px)',
                height: 'clamp(10px,1.3vw,18px)', width: 'auto',
                filter: 'drop-shadow(0 2px 5px rgba(0,0,0,.6)) brightness(.78)',
                transform: 'scaleX(-1)',
                animation: 'driveL 12s linear 5s infinite' }}/>
          </motion.div>
        )}

        {/* ── LAYER 6: main mid buildings ───────────────────────────────────── */}
        <motion.div style={{ y: bldY, position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
          {/* dispatch hub left */}
          <motion.img src="/scenes/dispatch-hub.webp" alt=""
            loading="lazy"
            initial={{ opacity: 0, y: 28, scale: .9 }}
            animate={inView ? { opacity: .95, y: 0, scale: 1 } : {}}
            transition={{ duration: .82, delay: .28, ease: [.22, 1, .36, 1] }}
            style={{ position: 'absolute', bottom: '21%', left: '5%',
              width: 'clamp(90px,13.5vw,190px)', height: 'auto',
              filter: 'drop-shadow(0 12px 28px rgba(249,115,22,.15)) drop-shadow(0 5px 14px rgba(0,0,0,.5))',
              zIndex: 5 }}/>
          {/* customer/helpdesk right */}
          <motion.img src="/scenes/customer-house.webp" alt=""
            loading="lazy"
            initial={{ opacity: 0, y: 28, scale: .9 }}
            animate={inView ? { opacity: .93, y: 0, scale: 1 } : {}}
            transition={{ duration: .82, delay: .32, ease: [.22, 1, .36, 1] }}
            style={{ position: 'absolute', bottom: '20%', right: '5%',
              width: 'clamp(85px,12.5vw,178px)', height: 'auto',
              filter: 'drop-shadow(0 12px 28px rgba(163,230,53,.1)) drop-shadow(0 5px 14px rgba(0,0,0,.5))',
              zIndex: 5 }}/>
          {/* main DRIV HUB – center, dominant */}
          <motion.img src="/scenes/building-hub.webp" alt="DRIV HUB"
            loading="lazy"
            initial={{ opacity: 0, y: 55, scale: .87 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: .95, delay: .12, ease: [.22, 1, .36, 1] }}
            style={{ position: 'absolute', bottom: '22%', left: '50%', transform: 'translateX(-50%)',
              width: 'clamp(140px,20vw,270px)', height: 'auto',
              filter: 'drop-shadow(0 18px 48px rgba(163,230,53,.22)) drop-shadow(0 6px 20px rgba(0,0,0,.6))',
              zIndex: 6 }}/>
        </motion.div>

        {/* ── LAYER 7: front-road vehicles ──────────────────────────────────── */}
        {inView && (
          <motion.div style={{ y: vehY, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 7 }} aria-hidden>
            <img src="/vehicles/truck.webp" alt="" loading="lazy"
              style={{ position: 'absolute', bottom: 'calc(7% + 2px)',
                height: 'clamp(26px,3.5vw,46px)', width: 'auto',
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.65))',
                animation: 'driveR 13s linear 0s infinite' }}/>
            <img src="/vehicles/tata_ace.webp" alt="" loading="lazy"
              style={{ position: 'absolute', bottom: 'calc(7% + 3px)',
                height: 'clamp(18px,2.6vw,36px)', width: 'auto',
                filter: 'drop-shadow(0 3px 8px rgba(0,0,0,.6))',
                animation: 'driveR 10s linear 6s infinite' }}/>
            <img src="/vehicles/scooty.webp" alt="" loading="lazy"
              style={{ position: 'absolute', bottom: 'calc(7% + 6px)',
                height: 'clamp(14px,2vw,28px)', width: 'auto',
                transform: 'scaleX(-1)',
                filter: 'drop-shadow(0 3px 7px rgba(0,0,0,.6))',
                animation: 'driveL 8s linear 3s infinite' }}/>
            <img src="/vehicles/tata_tempo.webp" alt="" loading="lazy"
              style={{ position: 'absolute', bottom: 'calc(7% + 1px)',
                height: 'clamp(20px,2.8vw,38px)', width: 'auto',
                transform: 'scaleX(-1)',
                filter: 'drop-shadow(0 4px 9px rgba(0,0,0,.65))',
                animation: 'driveL 16s linear 9s infinite' }}/>
          </motion.div>
        )}

        {/* ── LAYER 8: UI overlay ───────────────────────────────────────────── */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '16px 20px', pointerEvents: 'none' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px',
            borderRadius: '20px', border: '1px solid rgba(163,230,53,.22)',
            background: 'rgba(163,230,53,.1)', padding: '4px 12px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A3E635',
              animation: 'blink 1.6s ease-in-out infinite' }}/>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.2em',
              textTransform: 'uppercase', color: '#A3E635' }}>Live</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '2%', right: '1.5%', zIndex: 10, pointerEvents: 'none' }}>
          <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'rgba(163,230,53,.42)', margin: 0 }}>Bhiwandi Logistics Park</p>
        </div>

      </motion.div>
    </div>
  )
}

// ─── section ──────────────────────────────────────────────────────────────────

export default function DrivHubSection() {
  const sectionRef   = useRef(null)
  const headerInView = useInView(sectionRef, { once: true, amount: .06 })
  const [hov, setHov] = useState(null)

  return (
    <>
      <style>{CSS}</style>

      <section id="hub" ref={sectionRef}
        style={{
          position: 'relative', overflowX: 'clip', background: '#070c14',
          paddingTop: 'clamp(80px,11vw,152px)',
          paddingBottom: 'clamp(60px,8vw,120px)',
        }}
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle,rgba(163,230,53,.1) 1px,transparent 1px)',
          backgroundSize: '28px 28px', opacity: .2 }}/>

        <div className={SECTION_CONTAINER} style={{ maxWidth: '90rem' }}>

          {/* header */}
          <motion.div className="text-center"
            style={{ marginBottom: 'clamp(32px,4vw,48px)' }}
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
          >
            <SectionLabel onDark>Operations Hub</SectionLabel>
            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-[3.2rem] leading-[1.06] tracking-tight text-white mt-4 mb-4">
              The DRIV{' '}
              <span style={{ background: 'linear-gradient(130deg,#F97316,#fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HUB</span>
            </h1>
            <p className="text-base sm:text-lg text-white/52 max-w-2xl mx-auto leading-relaxed">
              India&apos;s fleet operations, unified at one address —{' '}
              <span className="font-semibold text-white/78">Bhiwandi Logistics Park</span>, where
              washing, parking, GPS monitoring, dispatch, and driver support run around the clock.
            </p>
          </motion.div>

          {/* campus — dominant visual */}
          <div style={{ marginBottom: 'clamp(20px,3vw,32px)' }}>
            <CampusScene sectionRef={sectionRef}/>
          </div>

          {/* service labels */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .42 }}
            style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
              gap: 'clamp(6px,1.8vw,18px)',
              padding: 'clamp(12px,1.8vw,18px) 0',
              borderTop: '1px solid rgba(255,255,255,.06)',
              borderBottom: '1px solid rgba(255,255,255,.06)',
              marginBottom: 'clamp(18px,2.5vw,28px)',
            }}
          >
            {facilities.map(f => (
              <button key={f.id}
                onMouseEnter={() => setHov(f.id)}
                onMouseLeave={() => setHov(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '7px',
                  background: 'none', border: 'none', cursor: 'default', padding: '3px 0' }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                  background: hov === f.id ? '#A3E635' : 'rgba(163,230,53,.32)',
                  transition: 'background .3s',
                  boxShadow: hov === f.id ? '0 0 8px #A3E635' : 'none' }}/>
                <span style={{ fontSize: '13px', fontWeight: 600,
                  color: hov === f.id ? '#A3E635' : 'rgba(255,255,255,.5)',
                  transition: 'color .3s', letterSpacing: '.02em' }}>{f.label}</span>
              </button>
            ))}
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: .4 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'clamp(14px,3vw,34px)', flexWrap: 'wrap',
              marginBottom: 'clamp(28px,4vw,44px)' }}
          >
            {hubStats.map(({ label, Icon: HIcon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HIcon size={15} color="#A3E635"/>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,.5)' }}>{label}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconMapPin size={15} color="#F97316"/>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,.5)' }}>Bhiwandi, Maharashtra</span>
            </div>
          </motion.div>

          {/* badges */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .42 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}
          >
            {highlights.map(({ label, color }, i) => (
              <motion.span key={label}
                initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: .3, delay: i * .05 }}
                style={{
                  padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                  border: color === 'lime' ? '1px solid rgba(163,230,53,.24)' : '1px solid rgba(249,115,22,.24)',
                  color: color === 'lime' ? '#A3E635' : '#F97316',
                  background: color === 'lime' ? 'rgba(163,230,53,.07)' : 'rgba(249,115,22,.07)',
                }}>{label}</motion.span>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  )
}
