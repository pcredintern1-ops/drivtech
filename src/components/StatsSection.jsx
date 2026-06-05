import { useRef, useEffect, useState, Fragment } from 'react'
import { motion, useInView } from 'framer-motion'
import { IconTruck, IconRoute, IconBuilding, IconMapPin } from '@tabler/icons-react'

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
  { Icon: IconRoute,    target: 12000, suffix: '+', label: 'Trips Completed'    },
  { Icon: IconBuilding, target: 25,    suffix: '+', label: 'Enterprise Clients' },
  { Icon: IconMapPin,   target: 2,     suffix: '+', label: 'Cities'             },
]

export default function StatsSection() {
  const statsRef    = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <section id="stats" className="relative py-6 md:py-8 border-t border-white/8 overflow-x-clip bg-[#111827]">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 70%)' }} />

      {/* Green neon glow line at section bottom */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] pointer-events-none z-10" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(163,230,53,0.6) 20%, #A3E635 50%, rgba(163,230,53,0.6) 80%, transparent 100%)',
        boxShadow: '0 0 8px rgba(163,230,53,0.5)',
      }} />
      <div className="relative w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24">

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap lg:flex-nowrap items-stretch justify-center">
          <div className="hidden lg:block w-px self-stretch bg-white/10 my-2"/>
          {stats.map(({ Icon, target, suffix, label }, i) => (
            <Fragment key={label}>
              {i > 0 && <div className="hidden lg:block w-px self-stretch bg-white/10 my-2"/>}
              <div
              className="flex items-center justify-start lg:justify-start gap-3 lg:gap-3 pl-4 pr-1 sm:pl-16 md:pl-24 lg:pl-16 lg:pr-2 py-6 sm:py-8 flex-1 min-w-[50%] lg:min-w-0">
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
        </motion.div>

      </div>
    </section>
  )
}
