import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  IconSend, IconCircleCheck, IconShield,
  IconUser, IconMail, IconPhone, IconMapPin, IconArrowDown,
} from '@tabler/icons-react'
import { SectionLabel, SECTION_PT, SECTION_CONTAINER } from './SectionHeader'

// ─── EmailJS ─────────────────────────────────────────────────────────────────
const EJS_SERVICE  = import.meta.env.VITE_EJS_SERVICE_ID  || ''
const EJS_TEMPLATE = import.meta.env.VITE_EJS_TEMPLATE_ID || ''
const EJS_NOTIFY   = import.meta.env.VITE_EJS_NOTIFY_ID   || ''
const EJS_KEY      = import.meta.env.VITE_EJS_PUBLIC_KEY  || ''
// ─────────────────────────────────────────────────────────────────────────────

const CHECKS = [
  'Asset-Backed Investment',
  'Enterprise Logistics Contracts',
  'Professionally Managed Fleet',
  'Technology-Driven Execution',
  'Experienced Leadership Team',
  'Monthly Earnings Start After Vehicle Deployment',
]

const WHY_CARDS = [
  { metric: 'Up to 150% ROI', sub: 'Within 5 Years*', accent: true },
  { metric: '19+ Years',      sub: 'Industry Experience' },
  { metric: 'Enterprise',     sub: 'Fleet Operations' },
  { metric: 'Asset-Backed',   sub: 'Investment Opportunity' },
  { metric: 'Technology-Driven', sub: 'Operations' },
  { metric: 'Professionally Managed', sub: 'End-to-End Execution' },
]

const INITIAL = { name: '', phone: '', email: '', city: '' }

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

// ─── form helpers ─────────────────────────────────────────────────────────────
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

const inp = 'w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#A3E635]/60 focus:bg-white transition-colors input-tech'

// ─────────────────────────────────────────────────────────────────────────────
export default function InvestorSection() {
  const formRef = useRef(null)
  const [form, setForm]     = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!/^\d{10,12}$/.test(form.phone.replace(/\s/g, ''))) e.phone = '10–12 digits'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const a = document.createElement('a')
      a.href = '/driv-investor-program.pdf'
      a.download = 'DrivTech-Investor-Program.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch { /* download blocked — continue */ }

    try {
      const p = { from_name: form.name, from_email: form.email, phone: form.phone, city: form.city || 'N/A' }
      if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, { ...p, to_email: form.email }, EJS_KEY)
      if (EJS_SERVICE && EJS_NOTIFY   && EJS_KEY) await emailjs.send(EJS_SERVICE, EJS_NOTIFY, p, EJS_KEY)
      setStatus('success')
      setForm(INITIAL)
    } catch { setStatus('error') }
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className={`relative ${SECTION_PT} pb-20 md:pb-28 bg-[#050b18] overflow-x-clip`}>
        <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-72 blur-3xl pointer-events-none opacity-25"
          style={{ background: 'radial-gradient(ellipse,#A3E635,transparent 70%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: 'radial-gradient(circle,#A3E635 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className={`${SECTION_CONTAINER} relative text-center`}>
          <motion.div {...up(0)}>
            <SectionLabel onDark>Investor Program</SectionLabel>
          </motion.div>

          <motion.h1 {...up(0.08)}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.08] text-white mb-6 max-w-3xl mx-auto"
          >
            Invest in Commercial Fleet Assets.{' '}
            <span className="gradient-text-lime-light">Powered by Real Logistics Operations.</span>
          </motion.h1>

          <motion.p {...up(0.14)} className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            As India's commerce grows, so does the demand for reliable commercial fleet infrastructure.
            DrivTech gives you the opportunity to invest in professionally managed commercial vehicles
            operating under enterprise logistics contracts across India.
          </motion.p>

          <motion.button {...up(0.2)} onClick={scrollToForm}
            className="btn-shine btn-glow-hover group inline-flex items-center gap-2.5 px-8 py-4 bg-[#A3E635] hover:bg-[#bef264] text-black font-bold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105"
          >
            Unlock Investment Deck
            <IconArrowDown size={15} className="group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </section>

      {/* ── 2. Story ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0f1623]">
        <div className={`${SECTION_CONTAINER}`}>
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2 {...up(0)}
              className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white mb-6 md:mb-8"
            >
              Every Delivery Tells a Bigger Story.
            </motion.h2>

            <motion.p {...up(0.07)} className="text-white/45 text-base sm:text-lg mb-8">
              Millions of deliveries happen every day.
            </motion.p>

            <div className="space-y-3 mb-8 md:mb-10">
              {[
                'Someone owns the warehouses.',
                'Someone owns the fleets.',
                'Someone earns from every movement.',
              ].map((line, i) => (
                <motion.div key={line} {...up(0.12 + i * 0.08)}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] shrink-0" />
                  <p className="text-white/85 text-lg sm:text-xl md:text-2xl font-heading font-semibold">
                    {line}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p {...up(0.38)}
              className="font-heading font-black text-2xl sm:text-3xl gradient-text-lime-light"
            >
              Why shouldn't that be you?
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── 3. Built on Real Operations ──────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className={SECTION_CONTAINER}>
          <motion.div {...up(0)} className="text-center mb-10 md:mb-14">
            <SectionLabel>What You Get</SectionLabel>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] text-gray-900 leading-[1.1] max-w-2xl mx-auto">
              Built on Real Operations.{' '}
              <span className="gradient-text">Not Just Projections.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {CHECKS.map((c, i) => (
              <motion.div key={c} {...up(0.05 + i * 0.06)}
                className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#A3E635]/40 hover:bg-[#A3E635]/[0.03] transition-all duration-200 cursor-default"
              >
                <div className="w-5 h-5 rounded-full bg-[#A3E635]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <IconCircleCheck size={12} className="text-[#65a30d]" />
                </div>
                <span className="text-gray-800 text-sm sm:text-[15px] font-medium leading-snug">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Every Great Investment ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#050b18]">
        <div className={SECTION_CONTAINER}>
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2 {...up(0)}
              className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white mb-6"
            >
              Every Great Investment Starts With One Question.
            </motion.h2>
            <motion.p {...up(0.08)} className="text-white/45 text-base sm:text-lg italic mb-5">
              What if an everyday business could become an investment opportunity?
            </motion.p>
            <motion.p {...up(0.14)} className="text-white/65 text-base sm:text-lg leading-relaxed">
              That's the idea behind DrivTech. We're transforming commercial logistics into a professionally
              managed, asset-backed investment opportunity built on real operations and enterprise demand.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── 5. Why Investors Are Paying Attention ────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0f1623]">
        <div className={SECTION_CONTAINER}>
          <motion.div {...up(0)} className="text-center mb-10 md:mb-14">
            <SectionLabel onDark>The Numbers</SectionLabel>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white">
              Why Investors Are Paying Attention
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {WHY_CARDS.map((c, i) => (
              <motion.div key={c.metric} {...up(0.05 + i * 0.07)}
                className={`relative p-5 sm:p-6 rounded-2xl border text-center group cursor-default transition-all duration-300 ${
                  c.accent
                    ? 'bg-[#A3E635]/8 border-[#A3E635]/30 hover:border-[#A3E635]/60'
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-[#A3E635]/25 hover:bg-white/[0.04]'
                }`}
              >
                <div aria-hidden className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(163,230,53,0.06),transparent)' }} />
                <p className={`relative font-heading font-black text-lg sm:text-xl md:text-2xl leading-tight mb-1.5 ${c.accent ? 'text-[#A3E635]' : 'text-white'}`}>
                  {c.metric}
                </p>
                <p className="relative text-white/40 text-xs sm:text-sm">{c.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Form ──────────────────────────────────────────────────────── */}
      <section ref={formRef} className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className={SECTION_CONTAINER}>
          <motion.div {...up(0)} className="text-center mb-8 md:mb-12">
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4">
              Access the Investment Deck
            </h2>
            <p className="text-black text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Gain exclusive access to the confidential DrivTech Investment Deck, including the investment
              model, business framework, and operational overview.
            </p>
            <p className="text-gray-400 text-sm mt-2">Enter your details to continue.</p>
          </motion.div>

          <motion.div {...up(0.1)} className="max-w-lg mx-auto">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-gray-200 rounded-3xl p-10 md:p-14 flex flex-col items-center justify-center text-center min-h-[320px] shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/12 flex items-center justify-center mb-5">
                    <IconSend size={22} className="text-[#65a30d]" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-xl mb-3">You're on the list.</h3>
                  <p className="text-black text-base leading-relaxed max-w-xs">
                    Our team will send you the investor brochure and get back within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit}
                  className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" icon={IconUser} error={errors.name}>
                      <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" className={inp} />
                    </Field>
                    <Field label="Mobile Number *" icon={IconPhone} error={errors.phone}>
                      <input type="tel" inputMode="numeric" value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 12) }))}
                        placeholder="91 XXXXXXXXXX" className={inp} />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email Address *" icon={IconMail} error={errors.email}>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={inp} />
                    </Field>
                    <Field label="City" icon={IconMapPin}>
                      <input type="text" value={form.city} onChange={set('city')} placeholder="Your city" className={inp} />
                    </Field>
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm text-center">
                      Something went wrong. Email us at{' '}
                      <a href="mailto:contact@drivtech.in" className="underline">contact@drivtech.in</a>.
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#A3E635] hover:bg-[#bef264] disabled:opacity-60 disabled:cursor-wait text-black font-bold rounded-xl text-sm glow-lime hover:scale-105 transition-all duration-300 btn-shine btn-glow-hover"
                  >
                    {status === 'sending'
                      ? <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Sending…</>
                      : <><IconSend size={14} /> Explore Opportunity</>}
                  </button>

                  <div className="flex items-start gap-2 pt-1">
                    <IconShield size={12} className="text-gray-400 mt-0.5 shrink-0" />
                    <p className="text-gray-400 text-xs leading-relaxed">
                      By submitting you agree to be contacted by DrivTech regarding the investor program.
                      Asset-backed model structured through formal agreements. Not a guaranteed return product.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  )
}
