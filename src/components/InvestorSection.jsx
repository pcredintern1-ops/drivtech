import { motion } from 'framer-motion'
import { IconTrendingUp, IconShield, IconSettings, IconArrowRight, IconCircleCheck } from '@tabler/icons-react'

const model = [
  { icon: IconTrendingUp, title: 'Fleet Asset Funding', desc: 'Investors participate in funding logistics fleet assets deployed for enterprise operations.' },
  { icon: IconSettings, title: 'Fully Managed by DRIV', desc: 'Vehicle deployment, driver management, maintenance, and daily operations handled entirely by DRIV.' },
  { icon: IconShield, title: 'Asset Backed Model', desc: 'Investment backed by physical vehicle assets with structured revenue sharing opportunities.' },
]

const whyInvest = [
  { val: '₹', label: 'Asset backed returns', desc: 'Physical vehicle assets underpin your investment.' },
  { val: '0', label: 'Zero ops overhead', desc: 'DRIV handles everything. You just invest.' },
  { val: '∞', label: 'Scalable model', desc: 'Grow your fleet holding as DRIV expands nationally.' },
]

const features = [
  'Revenue-sharing model structured through agreements',
  'Vehicle lifecycle professionally managed by DRIV',
  'Fleet deployment and operations handled by DRIV',
  'Driver management included',
  'Asset liquidation structured transparently post-tenure',
  'Regular reporting and operational updates',
]

export default function InvestorSection() {
  return (
    <section id="invest" className="relative py-12 md:py-20 lg:py-24 overflow-x-clip section-sep bg-white">

      <div className="relative w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.75 }}
          className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="flex items-center justify-center gap-2 text-[#65a30d] text-sm font-bold uppercase tracking-[0.3em] mb-6">
            <span className="w-8 h-px bg-[#A3E635]/60" /><span className="w-2 h-2 rounded-full bg-[#A3E635]" />Investor Program<span className="w-2 h-2 rounded-full bg-[#A3E635]" /><span className="w-8 h-px bg-[#A3E635]/60" />
          </span>
          <div className="w-fit mx-auto mb-4 md:mb-6">
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] text-gray-900 leading-[1.08] mb-2 text-center">
              Invest in Logistics <span className="gradient-text">Assets with DRIV</span>
            </h2>
          </div>
          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            DRIV offers an asset backed fleet investment model for individuals and partners
            looking to participate in the growing logistics and mobility sector.
          </p>
        </motion.div>

        {/* Asset-backed highlight */}
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="group relative bg-white border border-[#F97316]/20 rounded-2xl p-5 md:p-6 mb-10 flex gap-5 items-start hover:border-[#F97316]/45 hover:shadow-[0_8px_32px_rgba(249,115,22,0.08)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{ background: 'radial-gradient(circle at 0% 50%, rgba(249,115,22,0.04) 0%, transparent 60%)' }} />
          <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#F97316]/18 transition-all duration-300 relative">
            <IconTrendingUp size={20} className="text-[#F97316]" />
          </div>
          <div className="relative">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#c2410c] text-xs font-bold uppercase tracking-wider mb-2">Service</span>
            <h3 className="font-heading font-bold text-gray-900 text-lg mb-1.5">Asset Backed Investment</h3>
            <p className="text-black text-base sm:text-lg leading-relaxed">A managed logistics investment model where DRIV handles fleet operations, maintenance, and deployment for investors. Your capital, our operations.</p>
          </div>
        </motion.div>

        {/* Why invest — 3 highlight cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5 mb-8 md:mb-12">
          {whyInvest.map((w, i) => (
            <motion.div key={w.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.65, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
              className="group bg-white border border-[#A3E635]/20 rounded-2xl p-5 md:p-6 text-center hover:border-[#A3E635]/45 hover:shadow-[0_8px_32px_rgba(163,230,53,0.10),0_2px_8px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow,background-color] duration-300 card-instant-pop">
              <div className="font-heading font-black text-4xl text-[#65a30d] mb-3">{w.val}</div>
              <h4 className="font-heading font-bold text-gray-900 text-sm mb-2">{w.label}</h4>
              <p className="text-black text-base sm:text-lg leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* How it works + what's included */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">

          {/* How it works */}
          <div>
            <h3 className="font-heading font-bold text-gray-900 text-xl md:text-2xl mb-8">How the Model Works</h3>
            <div className="space-y-4">
              {model.map((m, i) => {
                const Icon = m.icon
                return (
                  <motion.div key={m.title}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.65, delay: i * 0.11 }}
                    whileHover={{ x: 4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
                    className="group bg-white border border-[#A3E635]/18 rounded-2xl p-5 flex gap-4 hover:border-[#A3E635]/40 hover:shadow-[0_4px_20px_rgba(163,230,53,0.08)] transition-[border-color,box-shadow,background-color] duration-300 card-instant-pop">
                    <div className="w-11 h-11 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#A3E635]/20 group-hover:border-[#A3E635]/40 transition-all duration-300">
                      <Icon size={18} className="text-[#65a30d]" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-gray-900 text-sm mb-1">{m.title}</h4>
                      <p className="text-black text-base sm:text-lg leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* What's included + CTA */}
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">What's Included</h3>
              <p className="text-black text-base sm:text-lg mb-7">Under the managed fleet investment model:</p>
              <div className="grid sm:grid-cols-1 gap-3 mb-8">
                {features.map(f => (
                  <div key={f} className="group flex items-start gap-3 text-black text-base sm:text-lg transition-colors">
                    <IconCircleCheck size={14} className="text-[#65a30d] mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="bg-[#F97316]/5 border border-[#F97316]/18 rounded-xl p-4 mb-8">
                <p className="text-[#c2410c]/80 text-base sm:text-lg leading-relaxed">
                  <strong className="text-[#c2410c]">Important:</strong> This is a managed fleet investment model with revenue-sharing opportunities structured through formal agreements. Not a guaranteed income or fixed-return product. All terms subject to individual agreements and applicable regulations.
                </p>
              </div>

              <a href="/investor-program"
                onClick={e => { e.preventDefault(); const el=document.getElementById('contact'); if(el){const nav=document.querySelector('nav');const top=el.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:80)-12;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})} history.pushState(null,'','/investor-program') }}
                className="btn-shine btn-glow-hover group inline-flex items-center gap-2 px-7 py-3.5 bg-[#A3E635] hover:bg-[#bef264] text-black font-bold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105">
                Express Investor Interest
                <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
