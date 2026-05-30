import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconMail, IconPhone, IconMapPin, IconMessage, IconSend } from '@tabler/icons-react'

const inquiryTypes = [
  { value: 'enterprise', label: 'Enterprise Inquiry' },
  { value: 'investor', label: 'Investor Inquiry' },
  { value: 'driver', label: 'Driver Registration' },
  { value: 'vendor', label: 'Vendor Partnership' },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'enterprise', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-12 md:py-20 lg:py-24 overflow-x-clip section-sep bg-white">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)' }} />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.75 }}
          className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 text-[#65a30d] text-sm font-bold uppercase tracking-[0.3em] mb-6 block">
            <span className="w-8 h-px bg-[#A3E635]/60" /><span className="w-2 h-2 rounded-full bg-[#A3E635]" />Get In Touch<span className="w-2 h-2 rounded-full bg-[#A3E635]" /><span className="w-8 h-px bg-[#A3E635]/60" />
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4 md:mb-6">
            Let's Build Something <span className="gradient-text">Together</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Whether you're an enterprise client, investor, driver partner, or vendor, we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-16">

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <h3 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-5 md:mb-8">Contact Information</h3>
            <div className="space-y-5 mb-10">
              {[
                { icon: IconMapPin, label: 'Location', value: '169, Evershine Mall, Chincholi Bunder Junction, Malad West, Mumbai - 400064' },
                { icon: IconMail, label: 'Email', value: 'contact@drivtech.in', href: 'mailto:contact@drivtech.in' },
                { icon: IconPhone, label: 'Phone', value: '+91 77380 46786', href: 'tel:+917738046786' },
                { icon: IconMessage, label: 'WhatsApp', value: 'Chat on WhatsApp', href: 'https://wa.me/917738046786' },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div key={label} className="group flex gap-4 items-start" whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}>
                  <div className="w-10 h-10 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/25 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#A3E635]/20 transition-all duration-300">
                    <Icon size={15} className="text-[#65a30d]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-gray-700 hover:text-gray-900 text-sm transition-colors leading-relaxed">{value}</a>
                    ) : (
                      <p className="text-gray-700 text-sm leading-relaxed">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Inquiry Categories</p>
              <div className="space-y-2">
                {inquiryTypes.map(t => (
                  <div key={t.value} className="flex items-center gap-2 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A3E635]/70" />
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}>
            {submitted ? (
              <div className="bg-white border border-[#A3E635]/25 rounded-3xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px] shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/12 flex items-center justify-center mb-5">
                  <IconSend size={22} className="text-[#65a30d]" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-xl mb-3">Message Received!</h3>
                <p className="text-gray-500 text-sm max-w-xs">Our team will get back to you within 24 hours. Thank you for reaching out to DRIV.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">Send an Inquiry</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Full Name *</label>
                    <input type="text" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors input-tech" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Email *</label>
                    <input type="email" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors input-tech" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Phone</label>
                  <input type="tel" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors input-tech" />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Inquiry Type *</label>
                  <select value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors input-tech">
                    {inquiryTypes.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Message *</label>
                  <textarea required rows={4} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors resize-none" />
                </div>

                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#A3E635] hover:bg-[#84cc16] text-black font-semibold rounded-xl text-sm glow-lime hover:scale-[1.02] transition-all duration-300 btn-glow-hover">
                  <IconSend size={14} />
                  Send Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
