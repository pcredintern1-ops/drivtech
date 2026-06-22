import { motion } from 'framer-motion'
import {
  IconRocket,
  IconBriefcase,
  IconBuildingWarehouse,
  IconBolt,
  IconMap,
  IconCheck,
} from '@tabler/icons-react'
import { roadmap } from '../data/content'
import { SectionHeader, SECTION_PB, SECTION_CONTAINER, CONTAINER_GAP, SECTION_PT } from './SectionHeader'

const MILESTONE_ICONS = {
  '2023': IconRocket,
  '2024': IconBriefcase,
  '2025': IconBuildingWarehouse,
  '2026': IconBolt,
  '2027': IconMap,
}

function getStatus(year) {
  const current = new Date().getFullYear()
  const y = parseInt(year, 10)
  if (y < current) return 'past'
  if (y === current) return 'current'
  return 'future'
}

const statusStyles = {
  past: {
    accent: '#65a30d',
    glow: 'rgba(163,230,53,0.18)',
    bar: 'linear-gradient(90deg, #65a30d, #A3E635)',
    tint: 'rgba(163,230,53,0.1)',
    iconBorder: 'border-[#A3E635]/30',
    badge: 'bg-[#A3E635]/10 text-[#65a30d] border-[#A3E635]/20',
    border: 'border-gray-200/80 hover:border-[#A3E635]/40',
    hoverShadow: 'hover:shadow-[0_16px_40px_rgba(163,230,53,0.12)]',
    node: 'bg-[#A3E635] border-[#A3E635] text-white shadow-[0_0_20px_rgba(163,230,53,0.45)]',
    connector: 'from-[#A3E635]/50',
    label: 'Completed',
  },
  current: {
    accent: '#ea6c0a',
    glow: 'rgba(249,115,22,0.22)',
    bar: 'linear-gradient(90deg, #F97316, #fb923c)',
    tint: 'rgba(249,115,22,0.1)',
    iconBorder: 'border-[#F97316]/35',
    badge: 'bg-[#F97316]/10 text-[#c2410c] border-[#F97316]/25',
    border: 'border-[#F97316]/30 hover:border-[#F97316]/55',
    hoverShadow: 'hover:shadow-[0_16px_40px_rgba(249,115,22,0.14)]',
    node: 'bg-[#F97316] border-[#F97316] text-white shadow-[0_0_24px_rgba(249,115,22,0.5)] ring-4 ring-[#F97316]/15',
    connector: 'from-[#F97316]/55',
    label: 'In progress',
  },
  future: {
    accent: '#9ca3af',
    glow: 'transparent',
    bar: 'linear-gradient(90deg, #e5e7eb, #d1d5db)',
    tint: 'rgba(0,0,0,0.03)',
    iconBorder: 'border-gray-200',
    badge: 'bg-gray-50 text-gray-500 border-gray-200',
    border: 'border-gray-200/80 hover:border-gray-300',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]',
    node: 'bg-white border-gray-200 text-gray-400 shadow-sm',
    connector: 'from-gray-200',
    label: 'Upcoming',
  },
}

function TimelineCard({ item, index, side }) {
  const status = getStatus(item.year)
  const styles = statusStyles[status]
  const Icon = MILESTONE_ICONS[item.year] ?? IconRocket
  const isFuture = status === 'future'
  const slideX = side === 'left' ? -20 : side === 'right' ? 20 : -12

  return (
    <motion.article
      initial={{ opacity: 0, x: slideX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-3xl border bg-white/90 backdrop-blur-sm overflow-hidden transition-all duration-300 ${styles.border} ${styles.hoverShadow} ${
        isFuture ? 'opacity-70' : ''
      }`}
    >
      <div className="h-[3px] w-full" style={{ background: styles.bar }} />

      <span
        aria-hidden
        className="absolute -right-1 -top-2 font-heading font-black text-[4.5rem] sm:text-[5rem] leading-none text-gray-900/[0.04] select-none pointer-events-none"
      >
        {item.year.slice(2)}
      </span>

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${styles.iconBorder} transition-transform duration-300 group-hover:scale-105`}
            style={{ backgroundColor: styles.tint }}
          >
            <Icon size={22} style={{ color: styles.accent }} stroke={2} />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles.badge}`}
            >
              {status === 'past' && <IconCheck size={11} stroke={2.5} />}
              {status === 'current' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
              )}
              {styles.label}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
              Phase {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <p className="font-heading font-black text-3xl text-gray-900 leading-none mb-2 tracking-tight">
          {item.year}
        </p>
        <h4 className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-2 leading-snug">
          {item.title}
        </h4>
        <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed">{item.desc}</p>
      </div>
    </motion.article>
  )
}

function TimelineNode({ item, side }) {
  const status = getStatus(item.year)
  const styles = statusStyles[status]
  const Icon = MILESTONE_ICONS[item.year] ?? IconRocket

  return (
    <>
      {side && (
        <span
          aria-hidden
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-10 bg-gradient-to-r ${styles.connector} ${
            side === 'left' ? 'right-[calc(50%+1.4rem)]' : 'left-[calc(50%+1.4rem)] rotate-180'
          }`}
        />
      )}
      <div className="absolute top-6 md:top-1/2 left-5 md:left-1/2 -translate-x-0 md:-translate-x-1/2 md:-translate-y-1/2 z-20">
        <div
          className={`relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl border-2 transition-transform duration-300 ${styles.node}`}
        >
          <Icon size={18} stroke={2.2} />
          {status === 'current' && (
            <span
              className="absolute inset-0 rounded-2xl animate-ping opacity-20"
              style={{ backgroundColor: styles.glow }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default function Roadmap({ continuation = false }) {
  const currentYear = new Date().getFullYear()
  const activeIdx = roadmap.findIndex((r) => parseInt(r.year, 10) >= currentYear)
  const progressIdx = activeIdx === -1 ? roadmap.length - 1 : activeIdx
  const progressPct = ((progressIdx + 0.5) / roadmap.length) * 100

  return (
    <section
      id="roadmap"
      className={`relative pt-0 ${SECTION_PB} overflow-x-clip section-sep bg-[#f6f7f4]`}
    >
      <div
        className="absolute left-0 top-1/4 w-[min(480px,50vw)] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="absolute right-0 bottom-0 w-[min(400px,45vw)] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
      />

      <div className={`${SECTION_CONTAINER} max-w-6xl ${continuation ? CONTAINER_GAP : SECTION_PT}`}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
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

        <div className="rounded-3xl p-[1px] bg-gradient-to-br from-[#A3E635]/30 via-white/80 to-[#F97316]/25 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="rounded-3xl bg-white/95 backdrop-blur-md overflow-hidden">
            <div className="px-5 sm:px-8 py-6 sm:py-7 border-b border-gray-100/80 bg-gradient-to-r from-[#fafaf8] via-white to-[#fffaf5]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#65a30d]">
                  2023 → {roadmap[roadmap.length - 1].year}
                </p>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] animate-pulse" />
                  Today: <span className="text-gray-900">{currentYear}</span>
                </span>
              </div>
              <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progressPct}%`,
                    background: 'linear-gradient(90deg, #65a30d 0%, #A3E635 55%, #F97316 100%)',
                    boxShadow: '0 0 12px rgba(163,230,53,0.35)',
                  }}
                />
              </div>
            </div>

            <div className="relative px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
              <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-8 bottom-8 w-px rounded-full bg-gray-200/80 overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full rounded-full"
                  style={{
                    height: `${progressPct}%`,
                    background: 'linear-gradient(180deg, #65a30d 0%, #A3E635 50%, #F97316 100%)',
                    boxShadow: '0 0 10px rgba(163,230,53,0.4)',
                  }}
                />
              </div>

              <div className="space-y-6 md:space-y-10">
                {roadmap.map((item, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <div key={item.year} className="relative md:flex md:items-center">
                      <TimelineNode item={item} side={isLeft ? 'left' : 'right'} />

                      <div className="md:hidden pl-14 pt-1">
                        <TimelineCard item={item} index={i} side="mobile" />
                      </div>

                      <div
                        className={`hidden md:block w-[calc(50%-2.5rem)] ${
                          isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8'
                        }`}
                      >
                        <TimelineCard
                          item={item}
                          index={i}
                          side={isLeft ? 'left' : 'right'}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="px-5 sm:px-8 py-4 border-t border-gray-100/80 bg-[#fafaf8]/80 flex flex-wrap items-center justify-center gap-5 text-xs">
              <span className="inline-flex items-center gap-2 text-gray-500">
                <span className="w-2 h-2 rounded-full bg-[#A3E635] shadow-[0_0_8px_rgba(163,230,53,0.5)]" />
                <span className="font-semibold text-[#65a30d]">Completed</span>
              </span>
              <span className="inline-flex items-center gap-2 text-gray-500">
                <span className="w-2 h-2 rounded-full bg-[#F97316] shadow-[0_0_8px_rgba(249,115,22,0.45)]" />
                <span className="font-semibold text-[#ea6c0a]">In progress</span>
              </span>
              <span className="inline-flex items-center gap-2 text-gray-500">
                <span className="w-2 h-2 rounded-full bg-white border border-gray-300" />
                <span className="font-semibold text-gray-500">Upcoming</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
