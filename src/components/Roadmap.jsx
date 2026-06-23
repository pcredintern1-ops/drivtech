import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  IconRocket, IconBriefcase, IconBuildingWarehouse,
  IconBolt, IconMap, IconCheck,
} from '@tabler/icons-react'
import { roadmap } from '../data/content'
import { SectionHeader, SECTION_PB, SECTION_CONTAINER, CONTAINER_GAP, SECTION_PT } from './SectionHeader'

const ICONS = {
  '2023': IconRocket,
  '2024': IconBriefcase,
  '2025': IconBuildingWarehouse,
  '2026': IconBolt,
  '2027': IconMap,
}

function getStatus(year) {
  const now = new Date().getFullYear()
  const y = parseInt(year, 10)
  if (y < now) return 'past'
  if (y === now) return 'current'
  return 'future'
}

const S = {
  past: {
    accent: '#65a30d',
    bar: 'linear-gradient(90deg,#65a30d,#A3E635)',
    tint: 'rgba(163,230,53,0.1)',
    iconBorder: 'border-[#A3E635]/30',
    badge: 'bg-[#A3E635]/10 text-[#65a30d] border-[#A3E635]/20',
    card: 'border-[#A3E635]/20 hover:border-[#A3E635]/45 hover:shadow-[0_20px_50px_rgba(163,230,53,0.13)]',
    node: 'bg-[#A3E635] border-[#A3E635] text-white shadow-[0_0_22px_rgba(163,230,53,0.5)]',
    year: 'text-[#A3E635]/[0.07]',
    label: 'Completed',
  },
  current: {
    accent: '#ea6c0a',
    bar: 'linear-gradient(90deg,#F97316,#fb923c)',
    tint: 'rgba(249,115,22,0.1)',
    iconBorder: 'border-[#F97316]/35',
    badge: 'bg-[#F97316]/10 text-[#c2410c] border-[#F97316]/25',
    card: 'border-[#F97316]/30 hover:border-[#F97316]/55 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)]',
    node: 'bg-[#F97316] border-[#F97316] text-white shadow-[0_0_28px_rgba(249,115,22,0.55)] ring-4 ring-[#F97316]/15',
    year: 'text-[#F97316]/[0.08]',
    label: 'In progress',
  },
  future: {
    accent: '#9ca3af',
    bar: 'linear-gradient(90deg,#e5e7eb,#d1d5db)',
    tint: 'rgba(0,0,0,0.03)',
    iconBorder: 'border-gray-200',
    badge: 'bg-gray-50 text-gray-400 border-gray-200',
    card: 'border-gray-200 hover:border-gray-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] opacity-70',
    node: 'bg-white border-gray-300 text-gray-400 shadow-sm',
    year: 'text-gray-900/[0.04]',
    label: 'Upcoming',
  },
}

// ─── single milestone card ────────────────────────────────────────────────────
function MilestoneCard({ item, index, side }) {
  const status = getStatus(item.year)
  const st = S[status]
  const Icon = ICONS[item.year] ?? IconRocket
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const xStart = side === 'left' ? -40 : side === 'right' ? 40 : 0
  const yStart = side === 'mobile' ? 24 : 0

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: xStart, y: yStart }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 340, damping: 22 } }}
      className={`group relative rounded-3xl border bg-white/90 backdrop-blur-sm overflow-hidden transition-colors duration-300 ${st.card}`}
    >
      {/* colour top bar */}
      <div className="h-[3px]" style={{ background: st.bar }} />

      {/* ghost year */}
      <span
        aria-hidden
        className={`absolute -right-2 -top-1 font-heading font-black leading-none select-none pointer-events-none ${st.year}`}
        style={{ fontSize: 'clamp(5rem,12vw,7rem)' }}
      >
        {item.year.slice(2)}
      </span>

      <div className="relative p-5 sm:p-6">
        {/* icon + badge row */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div
            className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${st.iconBorder}`}
            style={{ backgroundColor: st.tint }}
          >
            <Icon size={20} style={{ color: st.accent }} stroke={2} />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${st.badge}`}>
              {status === 'past'    && <IconCheck size={11} stroke={2.5} />}
              {status === 'current' && <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />}
              {st.label}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
              Phase {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* year + title + desc */}
        <p className="font-heading font-black text-3xl text-gray-900 leading-none mb-1.5 tracking-tight">
          {item.year}
        </p>
        <h4 className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-2 leading-snug">
          {item.title}
        </h4>
        <p className="text-black text-base leading-relaxed">{item.desc}</p>
      </div>
    </motion.article>
  )
}

// ─── timeline node on the center axis ────────────────────────────────────────
function Node({ item, side }) {
  const status = getStatus(item.year)
  const st = S[status]
  const Icon = ICONS[item.year] ?? IconRocket
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="absolute top-6 md:top-1/2 left-5 md:left-1/2 -translate-x-0 md:-translate-x-1/2 md:-translate-y-1/2 z-20">
      {/* horizontal connector arm */}
      {side && (
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-10 origin-${side === 'left' ? 'right' : 'left'} ${
            side === 'left'
              ? 'right-[calc(100%+0.6rem)]'
              : 'left-[calc(100%+0.6rem)]'
          }`}
          style={{ background: `linear-gradient(${side === 'left' ? '270deg' : '90deg'},${st.accent},transparent)` }}
        />
      )}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border-2 transition-transform duration-300 hover:scale-110 ${st.node}`}
      >
        <Icon size={18} stroke={2.2} />
        {status === 'current' && (
          <span
            className="absolute inset-0 rounded-2xl animate-ping opacity-25"
            style={{ backgroundColor: 'rgba(249,115,22,0.4)' }}
          />
        )}
      </motion.div>
    </div>
  )
}

// ─── main ─────────────────────────────────────────────────────────────────────
export default function Roadmap({ continuation = false }) {
  const currentYear = new Date().getFullYear()
  const sectionRef  = useRef(null)
  const lineRef     = useRef(null)

  // scroll-driven line fill
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 85%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const progressIdx = (() => {
    const i = roadmap.findIndex(r => parseInt(r.year, 10) >= currentYear)
    return i === -1 ? roadmap.length - 1 : i
  })()
  const progressPct = ((progressIdx + 0.55) / roadmap.length) * 100

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className={`relative pt-0 ${SECTION_PB} overflow-x-clip section-sep bg-[#f6f7f4]`}
    >
      <div className={`${SECTION_CONTAINER} max-w-6xl ${continuation ? CONTAINER_GAP : SECTION_PT}`}>

        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            label="Growth Timeline"
            title={<>The DRIV <span className="gradient-text">Roadmap</span></>}
            description="From Mumbai operations to a national logistics infrastructure."
            descMaxWidth="max-w-xl"
          />
        </motion.div>

        {/* ── timeline ── */}
        <div className="relative">

          {/* center vertical line */}
          <div
            ref={lineRef}
            className="absolute left-5 md:left-1/2 md:-translate-x-[0.5px] top-8 bottom-8 w-px bg-gray-200/80 overflow-hidden"
          >
            {/* static filled portion */}
            <div
              className="absolute top-0 left-0 w-full rounded-full"
              style={{
                height: `${progressPct}%`,
                background: 'linear-gradient(180deg,#65a30d 0%,#A3E635 50%,#F97316 100%)',
                boxShadow: '0 0 10px rgba(163,230,53,0.4)',
              }}
            />
            {/* scroll-driven animated overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full"
              style={{
                height: lineScale,
                background: 'linear-gradient(180deg,rgba(163,230,53,0.6) 0%,rgba(163,230,53,0.2) 100%)',
              }}
            />
          </div>

          {/* milestone rows */}
          <div className="space-y-8 md:space-y-12">
            {roadmap.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={item.year} className="relative md:flex md:items-center">
                  <Node item={item} side={isLeft ? 'left' : 'right'} />

                  {/* mobile card */}
                  <div className="md:hidden pl-14 pt-1">
                    <MilestoneCard item={item} index={i} side="mobile" />
                  </div>

                  {/* desktop card — alternating sides */}
                  <div
                    className={`hidden md:block w-[calc(50%-2.75rem)] ${
                      isLeft ? 'mr-auto pr-10' : 'ml-auto pl-10'
                    }`}
                  >
                    <MilestoneCard item={item} index={i} side={isLeft ? 'left' : 'right'} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── legend ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-6 text-xs"
        >
          {[
            { color: '#A3E635', glow: 'rgba(163,230,53,0.5)',  label: 'Completed',   text: 'text-[#65a30d]' },
            { color: '#F97316', glow: 'rgba(249,115,22,0.45)', label: 'In progress',  text: 'text-[#ea6c0a]' },
            { color: '#d1d5db', glow: 'transparent',           label: 'Upcoming',     text: 'text-gray-500'  },
          ].map(l => (
            <span key={l.label} className="inline-flex items-center gap-2 text-gray-500">
              <span
                className="w-2 h-2 rounded-full border border-white/30"
                style={{ backgroundColor: l.color, boxShadow: `0 0 8px ${l.glow}` }}
              />
              <span className={`font-semibold ${l.text}`}>{l.label}</span>
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
