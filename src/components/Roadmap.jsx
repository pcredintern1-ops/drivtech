import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { roadmap } from '../data/content'

export default function Roadmap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="roadmap" ref={ref} className="relative py-12 md:py-20 lg:py-24 overflow-x-clip section-sep bg-[#ebecf0]">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7 }} className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-3 text-[#65a30d] text-sm font-bold uppercase tracking-[0.3em] mb-5 block">
            <span className="w-8 h-px bg-[#A3E635]/60" /><span className="w-2 h-2 rounded-full bg-[#A3E635]" />Growth Timeline<span className="w-2 h-2 rounded-full bg-[#A3E635]" /><span className="w-8 h-px bg-[#A3E635]/60" />
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] text-gray-900 leading-[1.08] mb-4 md:mb-6">
            The DRIV <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-lg mx-auto">
            From Mumbai operations to a national logistics infrastructure.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(163,230,53,0.4) 10%, rgba(163,230,53,0.4) 90%, transparent)' }} />
          <div className="absolute left-5 top-0 bottom-0 w-px md:hidden"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(163,230,53,0.35) 5%, rgba(163,230,53,0.35) 95%, transparent)' }} />

          <div className="space-y-5 md:space-y-8">
            {roadmap.map((item, i) => {
              const isLeft = i % 2 === 0
              const currentYear = new Date().getFullYear().toString()
              const isPast = parseInt(item.year) < parseInt(currentYear)
              const isCurrent = item.year === currentYear
              const isFuture = parseInt(item.year) > parseInt(currentYear)

              return (
                <motion.div key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex md:items-center">

                  {/* Mobile dot */}
                  <div className="md:hidden absolute left-5 -translate-x-1/2 z-10 top-7">
                    <div className={`w-4 h-4 rounded-full border-2 ${isCurrent ? 'bg-[#F97316] border-[#F97316]' : isPast ? 'bg-[#A3E635] border-[#A3E635]' : 'bg-white border-gray-300'}`} />
                  </div>

                  {/* Mobile card */}
                  <div className="md:hidden pl-12 w-full">
                    <div className={`bg-white border rounded-2xl p-5 shadow-sm card-instant-pop ${isCurrent ? 'border-[#F97316]/30' : isPast ? 'border-[#A3E635]/25' : 'border-gray-200'} ${isFuture ? 'opacity-50' : ''}`}>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5 ${isCurrent ? 'bg-[#F97316]/10 text-[#c2410c]' : isPast ? 'bg-[#A3E635]/12 text-[#65a30d]' : 'bg-gray-100 text-gray-400'}`}>
                        {item.year}
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />}
                        {isPast && <span className="opacity-60 ml-1">✓</span>}
                      </div>
                      <h4 className="font-heading font-bold text-gray-900 text-xl mb-3">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Desktop card */}
                  <div className={`hidden md:block w-[calc(50%-36px)] ${isLeft ? 'pr-12' : 'ml-auto pl-12'}`}>
                    <div className={`bg-white border rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] card-instant-pop ${isCurrent ? 'border-[#F97316]/30 hover:border-[#F97316]/50' : isPast ? 'border-[#A3E635]/25 hover:border-[#A3E635]/45' : 'border-gray-200 hover:border-gray-300'} ${isFuture ? 'opacity-50' : ''}`}>
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 ${isCurrent ? 'bg-[#F97316]/10 text-[#c2410c]' : isPast ? 'bg-[#A3E635]/12 text-[#65a30d]' : 'bg-gray-100 text-gray-400'}`}>
                        {item.year}
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />}
                        {isPast && <span className="opacity-60 ml-1">✓</span>}
                      </div>
                      <h4 className="font-heading font-bold text-gray-900 text-2xl mb-3">{item.title}</h4>
                      <p className="text-gray-500 text-base md:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Desktop center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-5 h-5 rounded-full border-2 shadow-sm ${isCurrent ? 'bg-[#F97316] border-[#F97316] animate-pulse-glow' : isPast ? 'bg-[#A3E635] border-[#A3E635]' : 'bg-white border-gray-300'}`} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
