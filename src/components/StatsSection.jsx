import { useRef, useEffect, useState, Fragment } from 'react'
import { motion, useInView } from 'framer-motion'
import { IconTruck, IconRoute, IconBuilding, IconMapPin } from '@tabler/icons-react'
import { BAND_PY, BAND_SHELL_CONT, SECTION_CONTAINER, CONTAINER_GAP } from './SectionHeader'

/* ── Count-up ── */
function PanelCounter({ target, suffix, inView }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 2000
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setN(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
      else setN(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <>{n.toLocaleString()}{suffix}</>
}

const stats = [
  { Icon: IconTruck,    target: 150,   suffix: '+', label: 'Active Fleet'       },
  { Icon: IconRoute,    target: 20,    suffix: 'Lakhs+', label: 'Trips Completed'    },
  { Icon: IconBuilding, target: 25,    suffix: '+', label: 'Clients' },
  { Icon: IconMapPin,   target: 2,     suffix: '+', label: 'Cities'             },
]

export default function StatsSection({ continuation = false }) {
  const statsRef    = useRef(null)
  const statsInView = useInView(statsRef, { once: true })
  const bandClass = continuation ? BAND_SHELL_CONT : BAND_PY

  return (
    <section id="stats" className={`relative ${bandClass} border-t border-white/8 overflow-x-clip bg-[#111827]`}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 70%)' }} />

      {/* Green neon glow line at section bottom */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] pointer-events-none z-10" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(163,230,53,0.6) 20%, #A3E635 50%, rgba(163,230,53,0.6) 80%, transparent 100%)',
        boxShadow: '0 0 8px rgba(163,230,53,0.5)',
      }} />
      <div className={`${SECTION_CONTAINER} ${continuation ? CONTAINER_GAP : ''}`}>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex flex-wrap lg:flex-nowrap items-stretch justify-center">
          {stats.map(({ Icon, target, suffix, label }, i) => (
            <Fragment key={label}>
              {/* Vertical divider between stat blocks — desktop only */}
              {i > 0 && (
                <div className="hidden lg:block w-px self-stretch my-4 shrink-0"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(163,230,53,0.20) 30%, rgba(163,230,53,0.20) 70%, transparent)' }} />
              )}

              <div className="flex items-center justify-start lg:justify-start gap-3 lg:gap-3 px-2 sm:px-4 lg:px-6 py-2 flex-1 min-w-[50%] lg:min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(163,230,53,0.10)', border: '1px solid rgba(163,230,53,0.18)' }}>
                  <Icon size={24} style={{ color: '#A3E635' }} />
                </div>
                <div>
                  <div className="font-heading font-black text-white text-2xl sm:text-3xl lg:text-4xl leading-none whitespace-nowrap">
                    <PanelCounter target={target} suffix={suffix} inView={statsInView} />
                  </div>
                  <div className="text-gray-500 text-base sm:text-lg mt-1 font-medium leading-tight lg:whitespace-nowrap">{label}</div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>

      </div>
    </section>
  )
}
