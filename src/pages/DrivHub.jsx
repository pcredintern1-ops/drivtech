import { motion } from 'framer-motion'
import { IconUsers, IconCar, IconDeviceDesktop, IconSend, IconHeadset, IconClipboardList, IconTool, IconShield, IconActivity, IconMapPin, IconArrowRight } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { hubFeatures } from '../data/content'

const iconMap = { users: IconUsers, car: IconCar, monitor: IconDeviceDesktop, send: IconSend, headphones: IconHeadset, clipboard: IconClipboardList, tool: IconTool, shield: IconShield, activity: IconActivity }

const hubStats = [
  { val: '24/7', label: 'Operations', color: '#F97316' },
  { val: '500+', label: 'Vehicle Capacity', color: '#A3E635' },
  { val: '2025', label: 'Launch Year', color: '#A3E635' },
  { val: 'BHW', label: 'Bhiwandi Hub', color: '#F97316' },
]

export default function DrivHub() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-14 md:pt-32 md:pb-20 overflow-x-clip">
        <div className="absolute inset-0" style={{ background: '#080808' }} />
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#F97316]/4 blur-[140px] pointer-events-none" />
        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass-dark border border-[#F97316]/20 rounded-full text-[#F97316] text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
            Coming 2025 · Bhiwandi, Mumbai
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-7">
            Building the Next
            <br /><span className="gradient-text">Generation Logistics</span>
            <br />Operations Hub
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            A centralised fleet and operations command centre in Bhiwandi, designed to power enterprise logistics
            across Mumbai and beyond.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-white/30 text-sm">
            <IconMapPin size={14} className="text-[#F97316]" />
            Chincholi Bunder Junction area, Bhiwandi corridor, Mumbai
          </motion.div>
        </div>
      </section>

      {/* HUB Stats */}
      <section className="py-16 relative">
        <div className="absolute inset-0" style={{ background: '#0a0a0a' }} />
        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {hubStats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.45, delay: i * 0.05 }}
                className="glass-dark border border-white/8 rounded-2xl p-4 md:p-6 text-center">
                <div className="font-heading font-black text-4xl md:text-5xl mb-2" style={{ color: s.color }}>{s.val}</div>
                <div className="text-white/40 text-base">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About HUB */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0" style={{ background: '#080808' }} />
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="glass-dark border border-white/8 rounded-3xl p-6 md:p-8 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316]/4 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <h2 className="font-heading font-black text-2xl md:text-3xl text-white mb-6">What is DRIV HUB?</h2>
              <div className="space-y-4 text-white/45 text-sm md:text-base leading-relaxed max-w-3xl mb-8">
                <p>
                  DRIV is developing a centralised fleet and operations HUB in Bhiwandi designed to streamline
                  enterprise logistics operations, driver management, fleet deployment, and operational coordination.
                </p>
                <p>
                  The HUB will function as a scalable command centre for fleet movement, enterprise support,
                  and future logistics expansion across multiple cities, forming the backbone of DRIV's national infrastructure.
                </p>
                <p>
                  Strategically positioned near the Chincholi Bunder Junction, the HUB will serve as the primary
                  base for Mumbai-region operations and the launchpad for pan-India corridor expansion.
                </p>
              </div>
              <Link to="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#F97316]/10 border border-[#F97316]/25 hover:border-[#F97316]/50 text-[#F97316] hover:text-white font-bold rounded-xl text-sm transition-all duration-300">
                Register Interest
                <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* HUB Features grid */}
          <div className="text-center mb-12">
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">HUB Facilities & Capabilities</h2>
            <p className="text-white/30 text-base max-w-md mx-auto">Everything under one roof, built for enterprise fleet operations at scale.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {hubFeatures.map((feat, i) => {
              const Icon = iconMap[feat.icon] || IconActivity
              return (
                <motion.div key={feat.title}      
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="group glass-dark border border-white/6 rounded-2xl p-4 md:p-6 flex flex-col items-center text-center hover:border-[#F97316]/20 group-hover:bg-[#A3E635]/12 group-hover:border-[#A3E635]/35 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center mb-3 group-hover:bg-[#F97316]/15 transition-colors">
                    <Icon size={16} className="text-[#F97316]" />
                  </div>
                  <p className="text-white/70 text-sm font-medium leading-snug">{feat.title}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
  