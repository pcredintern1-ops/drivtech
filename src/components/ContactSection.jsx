import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconMail, IconPhone, IconMapPin, IconSend } from '@tabler/icons-react'
import emailjs from '@emailjs/browser'
import { SectionHeader, SECTION_SHELL, SECTION_CONTAINER } from './SectionHeader'

const EJS_SERVICE  = import.meta.env.VITE_EJS_SERVICE_ID       || ''
const EJS_TEMPLATE = import.meta.env.VITE_EJS_CONTACT_TEMPLATE || ''
const EJS_KEY      = import.meta.env.VITE_EJS_PUBLIC_KEY       || ''
const SHEETS_URL   = import.meta.env.VITE_SHEETS_WEBHOOK_URL   || ''

function saveToSheets(payload) {
  if (!SHEETS_URL) return
  fetch(SHEETS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) }).catch(() => {})
}

const inquiryTypes = [
  { value: 'enterprise', label: 'Enterprise Inquiry' },
  { value: 'investor', label: 'Investor Inquiry' },
  { value: 'driver', label: 'Driver Registration' },
  { value: 'vendor', label: 'Vendor Partnership' },
]

const INITIAL = { name: '', email: '', phone: '', type: '', message: '' }

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) {
        await emailjs.send(
          EJS_SERVICE,
          EJS_TEMPLATE,
          {
            from_name:    form.name,
            from_email:   form.email,
            phone:        form.phone || 'N/A',
            inquiry_type: inquiryTypes.find(t => t.value === form.type)?.label || form.type,
            message:      form.message,
          },
          EJS_KEY
        )
      }
    } catch (err) {
      console.error('Email send failed:', err)
    }

    saveToSheets({ form: 'contact', name: form.name, email: form.email, phone: form.phone || '', type: inquiryTypes.find(t => t.value === form.type)?.label || form.type, message: form.message })
    setStatus('success')
    setForm(INITIAL)
  }

  return (
    <section id="contact" className={`${SECTION_SHELL} bg-white min-h-screen`}>

      <div className={SECTION_CONTAINER}>

        <SectionHeader
          label="Get In Touch"
          title={<>Let&apos;s Build Something <span className="gradient-text">Together</span></>}
          titleAs="h1"
          description="Whether you're an enterprise client, investor, driver partner, or vendor, we'd love to hear from you."
          descMaxWidth="max-w-xl"
        />

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-16">

          {/* Contact info + map */}
          <div className="order-2 md:order-1 flex flex-col gap-8">
            <div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-gray-900 mb-5 md:mb-8">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: IconMapPin, label: 'Hub', value: 'F4-01, Bhumi World Industrial Park, Kalyan Bypass, Pimplas village, Bhiwandi - 421311', href: 'https://maps.google.com/?q=F4-01+Bhumi+World+Industrial+Park+Kalyan+Bypass+Pimplas+Bhiwandi+421311', external: true },
                  { icon: IconMail, label: 'Email', value: 'contact@drivtech.in', href: 'mailto:contact@drivtech.in' },
                  { icon: IconPhone, label: 'Phone', value: '+91 88558 86673', href: 'tel:+918855886673' },
                ].map(({ icon: Icon, label, value, href, external }) => (
                  <motion.div key={label} className="group flex gap-4 items-start" whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}>
                    <div className="w-10 h-10 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/25 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#A3E635]/20 transition-all duration-300">
                      <Icon size={15} className="text-[#65a30d]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="text-gray-700 hover:text-[#65a30d] text-base sm:text-lg transition-colors leading-relaxed cursor-pointer hover:underline"
                        >{value}</a>
                      ) : (
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Headquarters map widget */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: [.22, 1, .36, 1] }}
              className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-10 h-10 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/25 flex items-center justify-center shrink-0">
                  <IconMapPin size={15} className="text-[#65a30d]" />
                </div>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Headquarters</p>
              </div>
              <iframe
                title="DrivTech Headquarters"
                src="https://www.google.com/maps?q=158+Evershine+Mall+Chincholi+Bunder+Junction+Malad+West+Mumbai+400064&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Form */}
          <div className="order-1 md:order-2">
            {status === 'success' ? (
              <div className="bg-white border border-[#A3E635]/25 rounded-3xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px] shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/[0.12] flex items-center justify-center mb-5">
                  <IconSend size={22} className="text-[#65a30d]" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-3">Message Received!</h3>
                <p className="text-black text-base sm:text-lg max-w-xs">Our team will get back to you within 24 hours. Thank you for reaching out to DrivTech.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
                <h3 className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-2">Send an Inquiry</h3>

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
                      pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                      title="Enter a valid email address (e.g. name@example.com)"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors input-tech" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Phone</label>
                  <input type="tel" inputMode="numeric" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 12) })}
                    placeholder="91 XXXXXXXXXX"
                    pattern="[0-9]{10,12}"
                    minLength={10}
                    maxLength={12}
                    title="Enter 10 to 12 digits"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors input-tech" />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Inquiry Type *</label>
                  <select required value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors input-tech ${form.type === '' ? 'text-gray-400' : 'text-gray-900'}`}>
                    <option value="" disabled hidden>Select</option>
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

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">Something went wrong. Please try again or email us directly.</p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#A3E635] hover:bg-[#bef264] text-black font-semibold rounded-xl text-sm glow-lime hover:scale-105 transition-all duration-300 btn-shine btn-glow-hover disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                  <IconSend size={14} />
                  {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
