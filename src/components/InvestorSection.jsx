import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  IconSend, IconCircleCheck,
  IconUser, IconMail, IconPhone, IconMapPin,
  IconCurrencyRupee, IconSettings, IconTrendingUp,
  IconShield,
} from '@tabler/icons-react'
import { SectionHeader, SECTION_SHELL, SECTION_CONTAINER } from './SectionHeader'

// ─── EmailJS ─────────────────────────────────────────────────────────────────
const EJS_SERVICE  = import.meta.env.VITE_EJS_SERVICE_ID  || ''
const EJS_TEMPLATE = import.meta.env.VITE_EJS_TEMPLATE_ID || ''
const EJS_NOTIFY   = import.meta.env.VITE_EJS_NOTIFY_ID   || ''
const EJS_KEY      = import.meta.env.VITE_EJS_PUBLIC_KEY  || ''
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  { num: '01', icon: IconCurrencyRupee, label: 'You fund a vehicle', desc: 'Pick a fleet tier and commit capital through a signed agreement.' },
  { num: '02', icon: IconSettings,      label: 'DrivTech runs everything', desc: 'Driver, routes, maintenance, compliance. We carry the full operational load.' },
  { num: '03', icon: IconTrendingUp,    label: 'Revenue flows back to you', desc: 'Earnings from live deployments are shared back. Asset liquidated at tenure end.' },
]

const FEATURES = [
  'Revenue sharing through a formal signed agreement',
  'Full vehicle lifecycle managed by DrivTech',
  'Enterprise fleet deployment and route planning',
  'Driver hiring, training and daily management',
  'Maintenance, insurance and compliance covered',
  'Monthly reports delivered to your inbox',
]

const STATS = [
  { value: 150, suffix: '+', label: 'Active vehicles',       tag: 'Fleet size'   },
  { value: 0,   prefix: '₹', suffix: '', label: 'On your end', tag: 'Ops overhead' },
  { raw: '2–3 Yr',            label: 'Investment period',    tag: 'Tenure'       },
]

const RANGES = [
  { value: '5L-10L',  label: '₹5L – ₹10L'  },
  { value: '10L-25L', label: '₹10L – ₹25L' },
  { value: '25L-50L', label: '₹25L – ₹50L' },
  { value: '50L+',    label: '₹50L & above' },
]

const INITIAL = { name: '', email: '', phone: '', range: '', city: '', message: '' }

// ─── animation helpers ────────────────────────────────────────────────────────
const up = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

// ─── count-up ────────────────────────────────────────────────────────────────
function useCountUp(target, inView, duration = 1600) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || target == null) return
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setN(Math.floor((1 - Math.pow(1 - p, 4)) * target))
      if (p < 1) requestAnimationFrame(tick)
      else setN(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])
  return n
}

function StatChip({ stat, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useCountUp(typeof stat.value === 'number' ? stat.value : 0, inView)
  const display = stat.raw ?? `${stat.prefix ?? ''}${count}${stat.suffix}`

  return (
    <motion.div ref={ref} {...up(delay)}
      className="relative text-center py-5 sm:py-7 px-2 sm:px-4 group hover:bg-white/[0.025] transition-colors duration-300 cursor-default"
    >
      {/* subtle per-column glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%,rgba(163,230,53,0.07),transparent)' }} />

      <p className="text-[#A3E635]/50 text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.28em] mb-2 sm:mb-3 truncate">{stat.tag}</p>

      <div className="font-heading font-black text-xl sm:text-3xl md:text-4xl text-white leading-none mb-1.5 sm:mb-2"
        style={{ textShadow: '0 0 36px rgba(163,230,53,0.22)' }}>
        {display}
      </div>

      <div className="flex items-center justify-center gap-1">
        <span className="hidden sm:block w-3 h-px bg-[#A3E635]/30 shrink-0" />
        <span className="text-gray-500 text-[9px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.15em] leading-tight text-center">{stat.label}</span>
        <span className="hidden sm:block w-3 h-px bg-[#A3E635]/30 shrink-0" />
      </div>
    </motion.div>
  )
}

// ─── form field ───────────────────────────────────────────────────────────────
function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

const inp = (icon = true) =>
  `w-full bg-gray-50 border border-gray-200 rounded-xl ${icon ? 'pl-9' : 'px-4'} pr-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors input-tech`

// ─────────────────────────────────────────────────────────────────────────────
export default function InvestorSection() {
  const [form, setForm]     = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!/^\d{10,12}$/.test(form.phone.replace(/\s/g, ''))) e.phone = '10–12 digits'
    if (!form.range) e.range = 'Select a range'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const p = { from_name: form.name, from_email: form.email, phone: form.phone, invest_range: form.range, city: form.city || 'N/A', message: form.message || 'N/A' }
      if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, { ...p, to_email: form.email }, EJS_KEY)
      if (EJS_SERVICE && EJS_NOTIFY   && EJS_KEY) await emailjs.send(EJS_SERVICE, EJS_NOTIFY, p, EJS_KEY)
      setStatus('success')
      setForm(INITIAL)
    } catch { setStatus('error') }
  }

  return (
    <section className={`${SECTION_SHELL} bg-white`}>
      <div className={SECTION_CONTAINER}>

        {/* ── section header ── */}
        <SectionHeader
          label="Investor Program"
          title={<>Own a Fleet. <span className="gradient-text">DrivTech Runs It.</span></>}
          description="Put capital into logistics vehicles. We handle drivers, operations, and deployments from start to finish."
          descMaxWidth="max-w-xl"
        />

        {/* ── stats band ── */}
        <motion.div {...up(0.05)} className="rounded-3xl p-[1px] mb-10 md:mb-14 overflow-hidden"
          style={{ background: 'linear-gradient(135deg,rgba(163,230,53,0.25) 0%,rgba(255,255,255,0.06) 50%,rgba(163,230,53,0.1) 100%)' }}
        >
          <div className="relative rounded-[calc(1.5rem-1px)] bg-[#111827] overflow-hidden">
            {/* lime top accent line */}
            <div className="absolute top-0 inset-x-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg,transparent,#A3E635 40%,#A3E635 60%,transparent)' }} />
            {/* ambient centre glow */}
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-20 blur-3xl pointer-events-none"
              style={{ background: 'rgba(163,230,53,0.06)' }} />
            <div className="grid grid-cols-3 divide-x divide-white/[0.07]">
              {STATS.map((s, i) => <StatChip key={s.label} stat={s} delay={i * 0.08} />)}
            </div>
          </div>
        </motion.div>

        {/* ── two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── LEFT: how it works + features ── */}
          <div className="space-y-10">

            {/* ── How it works: pipeline flow ── */}
            <div>
              <motion.h3 {...up(0)} className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-6">
                How it works
              </motion.h3>

              <div className="relative">
                <div className="absolute left-4 top-5 bottom-5 w-px"
                  style={{ background: 'linear-gradient(180deg,#A3E635 0%,rgba(163,230,53,0.25) 70%,transparent 100%)' }} />

                <div className="space-y-0">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon
                    const isLast = i === STEPS.length - 1
                    return (
                      <motion.div key={s.num} {...up(i * 0.1)}
                        className={`group relative flex gap-4 ${isLast ? 'pb-0' : 'pb-5'}`}
                      >
                        <div className="relative shrink-0 z-10">
                          <motion.div
                            whileHover={{ scale: 1.12 }}
                            transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                            className="w-8 h-8 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/30 flex items-center justify-center"
                          >
                            <Icon size={14} className="text-[#65a30d]" />
                          </motion.div>
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#A3E635] text-black text-[7px] font-black flex items-center justify-center leading-none">
                            {i + 1}
                          </span>
                        </div>
                        <div className="pt-0.5">
                          <h4 className="font-heading font-bold text-gray-900 text-base sm:text-lg leading-snug mb-0.5">{s.label}</h4>
                          <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed">{s.desc}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ── What's included: 2-col grid chips ── */}
            <div>
              <motion.h3 {...up(0)} className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-4">
                What&apos;s included
              </motion.h3>

              <div className="grid grid-cols-2 gap-2">
                {FEATURES.map((f, i) => (
                  <motion.div key={f} {...up(i * 0.06)}
                    whileHover={{ y: -2, transition: { type: 'spring', stiffness: 340, damping: 22 } }}
                    className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#A3E635]/30 hover:bg-[#A3E635]/[0.03] transition-colors duration-200 cursor-default"
                  >
                    <IconCircleCheck size={13} className="text-[#65a30d] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-snug">{f}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div {...up(0.15)} className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <IconShield size={13} className="text-gray-400 mt-0.5 shrink-0" />
                <p className="text-gray-500 text-xs leading-relaxed">
                  Asset-backed model, structured through formal agreements. Not a guaranteed return product.
                </p>
              </motion.div>
            </div>

          </div>

          {/* ── RIGHT: form ── */}
          <motion.div {...up(0.1)}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-gray-200 rounded-3xl p-10 md:p-14 flex flex-col items-center justify-center text-center min-h-[420px] shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/12 flex items-center justify-center mb-5">
                    <IconSend size={22} className="text-[#65a30d]" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-3">You&apos;re on the list.</h3>
                  <p className="text-black text-base sm:text-lg leading-relaxed max-w-xs">
                    Our team will send you the investor brochure and get back within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit}
                  className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm"
                >
                  <h3 className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-1">
                    Express your interest
                  </h3>
                  <p className="text-black text-sm sm:text-base leading-relaxed">
                    We&apos;ll send the investor brochure straight to your inbox.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" icon={IconUser} error={errors.name}>
                      <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" className={inp()} />
                    </Field>
                    <Field label="Email *" icon={IconMail} error={errors.email}>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={inp()} />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Phone *" icon={IconPhone} error={errors.phone}>
                      <input type="tel" inputMode="numeric" value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 12) }))}
                        placeholder="91 XXXXXXXXXX" className={inp()} />
                    </Field>
                    <Field label="City" icon={IconMapPin}>
                      <input type="text" value={form.city} onChange={set('city')} placeholder="Your city" className={inp()} />
                    </Field>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Investment Range *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {RANGES.map(r => (
                        <button key={r.value} type="button"
                          onClick={() => setForm(f => ({ ...f, range: r.value }))}
                          className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                            form.range === r.value
                              ? 'bg-[#A3E635]/10 border-[#A3E635]/50 text-[#65a30d]'
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#A3E635]/30 hover:bg-[#A3E635]/5'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                    {errors.range && <p className="text-red-500 text-xs mt-1.5">{errors.range}</p>}
                  </div>

                  <Field label="Message (optional)">
                    <textarea rows={3} value={form.message} onChange={set('message')}
                      placeholder="Any questions or specific requirements..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors resize-none" />
                  </Field>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm text-center">
                      Something went wrong. Email us at{' '}
                      <a href="mailto:contact@drivtech.in" className="underline">contact@drivtech.in</a>.
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#A3E635] hover:bg-[#bef264] disabled:opacity-60 disabled:cursor-wait text-black font-semibold rounded-xl text-sm glow-lime hover:scale-105 transition-all duration-300 btn-shine btn-glow-hover"
                  >
                    {status === 'sending'
                      ? <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Sending…</>
                      : <><IconSend size={14} /> Get Investor Brochure</>}
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    By submitting you agree to be contacted by DrivTech regarding the investor program.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
