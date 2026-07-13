import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  IconSend, IconCircleCheck, IconShield,
  IconUser, IconMail, IconPhone, IconMapPin, IconArrowDown, IconArrowRight,
  IconTrendingUp, IconAward, IconBuildingSkyscraper, IconCpu, IconRoute,
} from '@tabler/icons-react'
import {
  SectionLabel, SectionDescription,
  SECTION_PB, SECTION_GAP, SECTION_CONTAINER, SECTION_HEADER_MB,
} from './SectionHeader'

const EJS_SERVICE   = import.meta.env.VITE_EJS_SERVICE_ID  || ''
const EJS_TEMPLATE  = import.meta.env.VITE_EJS_TEMPLATE_ID || ''
const EJS_NOTIFY    = import.meta.env.VITE_EJS_NOTIFY_ID   || ''
const EJS_KEY       = import.meta.env.VITE_EJS_PUBLIC_KEY  || ''
const SHEETS_URL    = import.meta.env.VITE_SHEETS_WEBHOOK_URL || ''

function saveToSheets(payload) {
  if (!SHEETS_URL) return
  fetch(SHEETS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) }).catch(() => {})
}

const CHECKS = [
  'Asset-Backed Investment',
  'Enterprise Logistics Contracts',
  'Professionally Managed Fleet',
  'Technology-Driven Execution',
  'Experienced Leadership Team',
  'Monthly Earnings Start After Vehicle Deployment',
]

const WHY_CARDS = [
  { metric: 'Up to 150%',  sub: 'ROI Within 5 Years*',        icon: IconTrendingUp },
  { metric: '19+ Years',   sub: 'Industry Experience',         icon: IconAward },
  { metric: 'Enterprise',  sub: 'Fleet Operations',            icon: IconBuildingSkyscraper },
  { metric: 'Asset-Backed',sub: 'Investment Model',            icon: IconShield },
  { metric: 'Tech-Driven', sub: 'Operations',                  icon: IconCpu },
  { metric: 'End-to-End',  sub: 'Professional Management',     icon: IconRoute },
]

const STORY_LINES = [
  'Someone owns the warehouses',
  'Someone owns the fleets',
  'Someone earns from every movement',
]

const INITIAL = { name: '', phone: '', email: '', city: '' }

/* Site-standard easing — matches Roadmap & ServicesSection */
const ease = [0.22, 1, 0.36, 1]

const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true, amount: 0.05 },
  transition: { duration: 0.55, delay, ease },
})

/* Site-standard card hover — matches ServicesSection & Roadmap */
const cardHover = {
  whileHover: { y: -6, transition: { type: 'spring', stiffness: 340, damping: 22 } },
}

/* Gradient heading — swaps light/dark variant automatically.
   Both spans carry inline-block via Tailwind so CSS-cascade
   conflicts with the gradient class don't prevent `hidden` from working. */
function InvestorHeading({ children, darkOnly = false, className = '' }) {
  if (darkOnly) {
    return <span className={`inline-block investor-heading-gradient-dark ${className}`}>{children}</span>
  }
  return (
    <>
      <span className={`inline-block investor-heading-gradient-light dark:hidden ${className}`}>{children}</span>
      <span className={`hidden dark:inline-block investor-heading-gradient-dark ${className}`}>{children}</span>
    </>
  )
}

/* Heading weight/size inside content cards */
const H2 = 'font-heading font-black text-2xl sm:text-3xl md:text-[2rem] leading-tight'

/* Form input — matches ContactSection base style + icon offset */
const inp =
  'w-full bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.10] rounded-xl pl-9 pr-4 py-3 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-[#A3E635]/60 dark:focus:border-[#A3E635]/50 focus:bg-white dark:focus:bg-white/[0.08] transition-colors input-tech'

/* Form card — matches ContactSection card style */
const formCard =
  'bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/[0.10] rounded-3xl shadow-sm'

/* Form label — matches ContactSection exactly */
const lbl = 'block text-gray-400 dark:text-white/40 text-xs uppercase tracking-wider mb-2'

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <div className="relative">
        {Icon && (
          <Icon
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 pointer-events-none"
          />
        )}
        {children}
      </div>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}

function InvestmentForm({ form, setForm, errors, status, onSubmit }) {
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease }}
          className={`${formCard} p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[360px]`}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/12 flex items-center justify-center mb-5">
            <IconSend size={22} className="text-[#65a30d] dark:text-[#A3E635]" />
          </div>
          <h3 className="font-heading font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-3">
            You&apos;re on the list.
          </h3>
          <p className="text-black dark:text-white/60 text-base leading-relaxed max-w-[260px]">
            Our team will send the investor brochure and reach out within 24 hours.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${formCard} p-6 md:p-8 space-y-5`}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name *" icon={IconUser} error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="Your name"
                autoComplete="name"
                className={inp}
              />
            </Field>
            <Field label="Mobile *" icon={IconPhone} error={errors.phone}>
              <input
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 12) }))
                }
                placeholder="91 XXXXXXXXXX"
                autoComplete="tel"
                className={inp}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email *" icon={IconMail} error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="you@example.com"
                autoComplete="email"
                className={inp}
              />
            </Field>
            <Field label="City" icon={IconMapPin}>
              <input
                type="text"
                value={form.city}
                onChange={set('city')}
                placeholder="Your city"
                autoComplete="address-level2"
                className={inp}
              />
            </Field>
          </div>

          {status === 'error' && (
            <p className="text-red-500 dark:text-red-400 text-sm text-center">
              Something went wrong. Email us at{' '}
              <a href="mailto:contact@drivtech.in" className="underline">
                contact@drivtech.in
              </a>
              .
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#A3E635] hover:bg-[#bef264] text-black font-semibold rounded-xl text-sm glow-lime hover:scale-105 transition-all duration-300 btn-shine btn-glow-hover disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {status === 'sending' ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <IconSend size={14} />
                Unlock Investment Deck
              </>
            )}
          </button>

          <div className="flex items-start gap-2.5">
            <IconShield size={13} className="text-gray-400 dark:text-white/30 shrink-0 mt-0.5" />
            <p className="text-gray-400 dark:text-white/30 text-xs leading-relaxed">
              By submitting you agree to be contacted by DrivTech regarding the investor program.
              Asset-backed model structured through formal agreements. Not a guaranteed return product.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default function InvestorSection() {
  const formRef = useRef(null)
  const [form, setForm]     = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

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
      document.body.appendChild(a); a.click(); document.body.removeChild(a)
    } catch { /* download blocked — continue */ }
    try {
      const p = { from_name: form.name, from_email: form.email, phone: form.phone, city: form.city || 'N/A' }
      if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY)
        await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, { ...p, to_email: form.email }, EJS_KEY)
      if (EJS_SERVICE && EJS_NOTIFY && EJS_KEY)
        await emailjs.send(EJS_SERVICE, EJS_NOTIFY, p, EJS_KEY)
    } catch (err) {
      console.error('Email send failed:', err)
    }

    saveToSheets({ form: 'investor', name: form.name, phone: form.phone, email: form.email, city: form.city || '' })
    setStatus('success')
    setForm(INITIAL)
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section
        id="investor-hero"
        className="relative min-h-screen h-screen flex flex-col bg-[#050b18] overflow-hidden section-sep"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/partnership_program.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[63%_45%] sm:object-[68%_45%] md:object-[70%_45%] lg:object-[76%_45%] xl:object-[80%_45%]"
            draggable={false}
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(165deg, rgba(5,11,24,0.96) 0%, rgba(5,11,24,0.88) 22%, rgba(5,11,24,0.58) 48%, rgba(5,11,24,0.18) 72%, rgba(5,11,24,0) 100%)',
            }}
          />
        </div>

        {/* Content — flex-1 so it fills the hero height; justify-between pins button to bottom on mobile/tablet */}
        <div className={`${SECTION_CONTAINER} relative z-10 flex-1 flex flex-col pt-28 sm:pt-36 md:pt-40 lg:pt-44 xl:pt-24 pb-8 sm:pb-10 xl:pb-0 justify-between xl:justify-center`}>

          {/* Top: heading + text + desktop button */}
          <div className="flex flex-col">
            <motion.h1
              {...up(0)}
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] leading-[1.08] mb-4 text-white text-center xl:text-left"
            >
              <span className="block">Invest in <span className="gradient-text-lime-light">Commercial</span></span>
              <span className="block pb-[0.1em]">Fleet <span className="gradient-text-lime-light">Assets</span></span>
            </motion.h1>

            <motion.p {...up(0.04)} className="text-white text-lg sm:text-xl leading-relaxed mb-3 sm:mb-4 max-w-lg text-center xl:text-left mx-auto xl:mx-0">
              Powered by Real Logistics Operations
            </motion.p>

            <motion.div {...up(0.08)}>
              <p className="text-white xl:text-white/60 text-base sm:text-lg max-w-lg leading-relaxed mb-5 text-center xl:text-left mx-auto xl:mx-0">
                As India&apos;s commerce grows, so does the demand for reliable commercial fleet
                infrastructure. DrivTech gives you the opportunity to invest in professionally managed
                commercial vehicles operating under enterprise logistics contracts across India.
              </p>
            </motion.div>

            {/* Desktop button — sits inline with top content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="hidden xl:flex mt-2"
            >
              <button
                type="button"
                onClick={scrollToForm}
                className="btn-shine btn-glow-hover group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#A3E635] hover:bg-[#bef264] text-black font-semibold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105"
              >
                Unlock Investment Deck
                <IconArrowDown size={15} className="group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>

          {/* Mobile / tablet button — pinned to bottom */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
            className="xl:hidden mt-auto flex justify-center"
          >
            <button
              type="button"
              onClick={scrollToForm}
              className="btn-shine btn-glow-hover group flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#A3E635] hover:bg-[#bef264] text-black font-semibold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105 w-full sm:w-[70%]"
            >
              Unlock Investment Deck
              <IconArrowDown size={15} className="group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* ── 2–6. Content + sticky form ──────────────────────────────────── */}
      <section className={`${SECTION_GAP} ${SECTION_PB} overflow-x-clip bg-white dark:bg-[#0b0f1a]`}>
        <div className={SECTION_CONTAINER}>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">

            {/* ── Left column top: Blocks 1 & 2 ── */}
            <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1 flex flex-col gap-6 md:gap-8">

              {/* Block 1 — Story */}
              <motion.div
                {...up(0)}
                {...cardHover}
                className="rounded-2xl p-6 sm:p-8 bg-gray-50 dark:bg-[#0f1623] border border-gray-200 dark:border-white/[0.08] transition-colors duration-300 hover:border-[#A3E635]/25 dark:hover:border-[#A3E635]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
              >
                <h2 className={`${H2} mb-4`}>
                  <InvestorHeading>Every Delivery Tells a Bigger Story</InvestorHeading>
                </h2>
                <p className="text-black dark:text-white/55 text-base sm:text-lg leading-relaxed mb-6">
                  Millions of deliveries happen every day across India.
                </p>
                <ul className="space-y-3 mb-7">
                  {STORY_LINES.map((line, i) => (
                    <motion.li
                      key={line}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, delay: i * 0.07, ease }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#A3E635]/12 dark:bg-[#A3E635]/10 flex items-center justify-center shrink-0">
                        <IconArrowRight size={11} className="text-[#65a30d] dark:text-[#A3E635]" />
                      </span>
                      <span className="text-gray-800 dark:text-white/80 text-base sm:text-lg font-heading font-semibold leading-snug">
                        {line}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <h2 className={`${H2} mt-2`}>
                  <InvestorHeading>Why shouldn&apos;t that be you?</InvestorHeading>
                </h2>
              </motion.div>

              {/* Block 2 — Built on Real Operations */}
              <motion.div
                {...up(0.05)}
                {...cardHover}
                className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0f1623] border border-gray-200 dark:border-white/[0.08] transition-colors duration-300 hover:border-[#A3E635]/25 dark:hover:border-[#A3E635]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
              >
                <h2 className={`${H2} mb-1`}>
                  <InvestorHeading>Built on Real Operations,</InvestorHeading>
                </h2>
                <h2 className={`${H2} mb-6 md:mb-7`}>
                  <InvestorHeading>Not Just Projections</InvestorHeading>
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {CHECKS.map((c, i) => (
                    <motion.div
                      key={c}
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.05 }}
                      transition={{ duration: 0.5, delay: i * 0.07, ease }}
                      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 340, damping: 22 } }}
                      className="group relative flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] overflow-hidden cursor-default transition-all duration-300 hover:border-[#A3E635]/40 dark:hover:border-[#A3E635]/25 hover:shadow-[0_8px_28px_rgba(163,230,53,0.10)] dark:hover:shadow-[0_8px_28px_rgba(163,230,53,0.07)]"
                    >
                      {/* Bottom accent bar — slides in on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A3E635] to-[#65a30d] rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

                      {/* Subtle background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#A3E635]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Icon */}
                      <div className="relative shrink-0 w-9 h-9 rounded-xl bg-[#A3E635]/[0.10] dark:bg-[#A3E635]/[0.07] border border-[#A3E635]/20 dark:border-[#A3E635]/15 flex items-center justify-center transition-all duration-300 group-hover:bg-[#A3E635]/20 group-hover:border-[#A3E635]/50 group-hover:shadow-[0_0_14px_rgba(163,230,53,0.30)]">
                        <IconCircleCheck size={16} className="text-[#65a30d] dark:text-[#A3E635]" strokeWidth={2.2} />
                      </div>

                      {/* Text */}
                      <span className="relative text-gray-700 dark:text-white/70 text-sm sm:text-base font-medium leading-snug group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                        {c}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* ── Right column: sticky form — mobile/tablet: after Block 2; desktop: spans both rows ── */}
            <motion.aside
              ref={formRef}
              {...up(0.1)}
              className="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28 lg:self-start mt-8 lg:mt-0 scroll-mt-28"
            >
              <div className={`${SECTION_HEADER_MB} text-center`}>
                <h2 className={`${H2} mb-3 text-gray-900 dark:text-white`}>
                  Access the{' '}
                  <span className="gradient-text dark:hidden">Investment Deck</span>
                  <span className="hidden dark:inline gradient-text-lime-light">Investment Deck</span>
                </h2>
                <p className="text-black dark:text-white/55 text-base leading-relaxed max-w-sm mx-auto">
                  Gain exclusive access to the confidential DrivTech Investment Deck, including the investment
                  model, business framework, and operational overview.
                </p>
                <p className="text-gray-400 dark:text-white/30 text-sm mt-2">
                  Enter your details to continue.
                </p>
              </div>

              <InvestmentForm
                form={form}
                setForm={setForm}
                errors={errors}
                status={status}
                onSubmit={handleSubmit}
              />
            </motion.aside>

            {/* ── Left column bottom: Blocks 3 & 4 ── */}
            <div className="lg:col-start-1 lg:col-span-7 lg:row-start-2 flex flex-col gap-6 md:gap-8 mt-6 md:mt-8 lg:mt-0">

              {/* Block 3 — The Idea */}
              <motion.div
                {...up(0.05)}
                {...cardHover}
                className="rounded-2xl p-6 sm:p-8 bg-gray-50 dark:bg-[#050b18] border border-gray-200/80 dark:border-white/[0.06] transition-colors duration-300 hover:border-[#A3E635]/25 dark:hover:border-[#A3E635]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
              >
                <h2 className={`${H2} mb-4 text-gray-900 dark:text-white`}>
                  <span className="block">Every Great <span className="gradient-text">Investment</span></span>
                  <span className="block">Starts With One <span className="gradient-text">Question</span></span>
                </h2>
                <p className="text-gray-500 dark:text-white/45 text-base sm:text-lg italic leading-relaxed mb-4">
                  What if an everyday business could become an investment opportunity?
                </p>
                <p className="text-black dark:text-white/65 text-base sm:text-lg leading-relaxed">
                  That&apos;s the idea behind DrivTech. We&apos;re transforming commercial logistics into a
                  professionally managed, asset-backed investment opportunity built on real operations and
                  enterprise demand.
                </p>
              </motion.div>

              {/* Block 4 — Stats grid */}
              <motion.div
                {...up(0.05)}
                {...cardHover}
                className="rounded-2xl p-6 sm:p-8 bg-gray-50 dark:bg-[#0f1623] border border-gray-200 dark:border-white/[0.08] transition-colors duration-300 hover:border-[#A3E635]/25 dark:hover:border-[#A3E635]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
              >
                <h2 className={`${H2} mb-6 md:mb-7`}>
                  <InvestorHeading>Why Investors Are Paying Attention</InvestorHeading>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {WHY_CARDS.map((c, i) => {
                    const Icon = c.icon
                    return (
                      <motion.div
                        key={c.metric}
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={{ duration: 0.5, delay: i * 0.07, ease }}
                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 340, damping: 22 } }}
                        className="group relative overflow-hidden flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border bg-white dark:bg-[#0d1525] border-gray-200 dark:border-white/[0.07] transition-all duration-300 hover:border-[#A3E635]/50 dark:hover:border-[#A3E635]/35 hover:shadow-[0_8px_32px_rgba(163,230,53,0.10)] dark:hover:shadow-[0_8px_32px_rgba(163,230,53,0.08)] cursor-default"
                      >
                        {/* Radial glow on hover */}
                        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(163,230,53,0.07),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                        {/* Top accent line — faint always, bright on hover */}
                        <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#A3E635] to-transparent opacity-15 group-hover:opacity-80 transition-opacity duration-300" />

                        {/* Icon badge */}
                        <div className="relative mb-3 w-10 h-10 rounded-xl bg-[#A3E635]/[0.08] dark:bg-[#A3E635]/[0.06] border border-[#A3E635]/20 dark:border-[#A3E635]/15 flex items-center justify-center transition-all duration-300 group-hover:bg-[#A3E635]/[0.18] group-hover:border-[#A3E635]/50 group-hover:shadow-[0_0_16px_rgba(163,230,53,0.28)]">
                          <Icon size={17} strokeWidth={2} className="text-[#65a30d] dark:text-[#A3E635] transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        {/* Metric */}
                        <p className="relative font-heading font-black text-lg sm:text-xl leading-tight mb-1 text-gray-900 dark:text-white group-hover:text-[#65a30d] dark:group-hover:text-[#A3E635] transition-colors duration-300">
                          {c.metric}
                        </p>

                        {/* Sub */}
                        <p className="relative text-gray-500 dark:text-white/40 text-[11px] sm:text-xs leading-snug group-hover:text-gray-600 dark:group-hover:text-white/55 transition-colors duration-300">
                          {c.sub}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>
    </>
  )
}
