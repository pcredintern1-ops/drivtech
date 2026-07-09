import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  IconSend, IconCircleCheck, IconShield,
  IconUser, IconMail, IconPhone, IconMapPin, IconArrowDown,
} from '@tabler/icons-react'
import {
  SectionTitle,
  SectionDescription,
  SECTION_PB,
  SECTION_GAP,
  SECTION_CONTAINER,
  SECTION_HEADER_MB,
} from './SectionHeader'

// ─── EmailJS ─────────────────────────────────────────────────────────────────
const EJS_SERVICE = import.meta.env.VITE_EJS_SERVICE_ID || ''
const EJS_TEMPLATE = import.meta.env.VITE_EJS_TEMPLATE_ID || ''
const EJS_NOTIFY = import.meta.env.VITE_EJS_NOTIFY_ID || ''
const EJS_KEY = import.meta.env.VITE_EJS_PUBLIC_KEY || ''
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
  { metric: 'Up to 150% ROI', sub: 'Within 5 Years*' },
  { metric: '19+ Years', sub: 'Industry Experience' },
  { metric: 'Enterprise', sub: 'Fleet Operations' },
  { metric: 'Asset-Backed', sub: 'Investment Opportunity' },
  { metric: 'Technology-Driven', sub: 'Operations' },
  { metric: 'Professionally Managed', sub: 'End-to-End Execution' },
]

const STORY_LINES = [
  'Someone owns the warehouses',
  'Someone owns the fleets',
  'Someone earns from every movement',
]

const INITIAL = { name: '', phone: '', email: '', city: '' }

const PANEL = 'rounded-2xl p-6 sm:p-8 md:p-10'
const BLOCK_GAP = 'flex flex-col gap-6 md:gap-8'
const CARD_HOVER =
  'transition-all duration-300 hover:-translate-y-1 hover:border-[#A3E635]/30 dark:hover:border-[#A3E635]/40 hover:shadow-[0_12px_36px_rgba(163,230,53,0.1)] dark:hover:shadow-[0_12px_36px_rgba(163,230,53,0.14)]'

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

function InvestorHeading({ children, darkOnly = false, className = '' }) {
  if (darkOnly) {
    return <span className={`investor-heading-gradient-dark ${className}`}>{children}</span>
  }
  return (
    <>
      <span className={`investor-heading-gradient-light dark:hidden ${className}`}>{children}</span>
      <span className={`hidden dark:inline-block investor-heading-gradient-dark ${className}`}>{children}</span>
    </>
  )
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="block text-gray-500 dark:text-white/40 text-xs uppercase tracking-wider mb-2 text-center">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 pointer-events-none"
          />
        )}
        {children}
      </div>
      {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1 text-center">{error}</p>}
    </div>
  )
}

const inp =
  'w-full bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.1] rounded-xl pl-9 pr-9 py-3 text-gray-900 dark:text-white text-sm text-center placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-[#A3E635]/60 dark:focus:border-[#A3E635]/50 focus:bg-white dark:focus:bg-white/[0.08] transition-colors input-tech'

const formCard =
  'bg-white dark:bg-[#111827] border-2 border-gray-200 dark:border-white/[0.14] rounded-3xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A3E635]/25 dark:hover:border-[#A3E635]/35 hover:shadow-[0_16px_48px_rgba(163,230,53,0.1)] dark:hover:shadow-[0_16px_48px_rgba(163,230,53,0.12)]'

function InvestmentForm({ form, setForm, errors, status, onSubmit }) {
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${formCard} p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[300px]`}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/12 flex items-center justify-center mb-5">
            <IconSend size={22} className="text-[#65a30d] dark:text-[#A3E635]" />
          </div>
          <h3 className="font-heading font-bold text-xl mb-3 text-transparent">
            <InvestorHeading>You&apos;re on the list.</InvestorHeading>
          </h3>
          <p className="text-black dark:text-white/70 text-base sm:text-lg leading-relaxed max-w-xs">
            Our team will send you the investor brochure and get back within 24 hours.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          className={`${formCard} p-6 md:p-8 space-y-5 text-center`}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name *" icon={IconUser} error={errors.name}>
              <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" className={inp} />
            </Field>
            <Field label="Mobile Number *" icon={IconPhone} error={errors.phone}>
              <input
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 12) }))
                }
                placeholder="91 XXXXXXXXXX"
                className={inp}
              />
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
            className="w-full flex items-center justify-center gap-2 py-4 bg-[#A3E635] hover:bg-[#bef264] disabled:opacity-60 disabled:cursor-wait text-black font-bold rounded-xl text-sm glow-lime hover:scale-105 transition-all duration-300 btn-shine btn-glow-hover"
          >
            {status === 'sending' ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <IconSend size={14} />
                Explore Opportunity
              </>
            )}
          </button>

          <div className="flex flex-col items-center gap-2 pt-1 text-center">
            <IconShield size={12} className="text-gray-400 dark:text-white/40 shrink-0" />
            <p className="text-gray-400 dark:text-white/40 text-xs leading-relaxed max-w-md">
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
  const [form, setForm] = useState(INITIAL)
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
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('sending')
    try {
      const a = document.createElement('a')
      a.href = '/driv-investor-program.pdf'
      a.download = 'DrivTech-Investor-Program.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch {
      /* download blocked — continue */
    }

    try {
      const p = { from_name: form.name, from_email: form.email, phone: form.phone, city: form.city || 'N/A' }
      if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) {
        await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, { ...p, to_email: form.email }, EJS_KEY)
      }
      if (EJS_SERVICE && EJS_NOTIFY && EJS_KEY) {
        await emailjs.send(EJS_SERVICE, EJS_NOTIFY, p, EJS_KEY)
      }
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const formProps = { form, setForm, errors, status, onSubmit: handleSubmit }

  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <section id="investor-hero" className="relative pt-40 sm:pt-36 md:pt-40 lg:pt-36 pb-6 sm:pb-8 min-h-screen h-screen flex items-start sm:items-center bg-[#050b18] overflow-hidden section-sep">
        <div className="absolute inset-0">
          <img
            src="/partnership_program.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[58%_top] sm:object-[65%_top] md:object-[70%_top] lg:object-[76%_top] xl:object-[80%_top]"
            draggable={false}
            fetchPriority="high"
          />
        </div>

        <div className={`${SECTION_CONTAINER} relative z-10 w-full`}>
          <div className="max-w-3xl text-left">
            <motion.div {...up(0)} className="max-sm:mt-12">
              <SectionTitle as="h1" onDark align="left" className="investor-hero-title max-w-3xl !mb-2 max-sm:!mb-3 sm:!mb-5 md:!mb-6 lg:!mb-3">
                <InvestorHeading darkOnly>Invest in Commercial Fleet Assets</InvestorHeading>
              </SectionTitle>
              <p className="investor-hero-tagline text-lg sm:text-xl leading-relaxed max-w-2xl text-white/70 max-sm:mb-0 sm:mb-0 md:mb-0 lg:mb-5">
                Powered by Real Logistics Operations
              </p>
            </motion.div>

            <motion.div {...up(0.08)} className="max-sm:mt-14 sm:mt-10 md:mt-12 lg:mt-0">
              <SectionDescription onDark align="left" maxWidth="max-w-2xl" className="investor-hero-desc max-sm:!mb-10 sm:!mb-10 md:!mb-12 lg:!mb-8 xl:!mb-10">
                As India&apos;s commerce grows, so does the demand for reliable commercial fleet infrastructure.
                DrivTech gives you the opportunity to invest in professionally managed commercial vehicles
                operating under enterprise logistics contracts across India.
              </SectionDescription>
            </motion.div>

            <motion.button
              {...up(0.14)}
              type="button"
              onClick={scrollToForm}
              className="btn-shine btn-glow-hover group inline-flex items-center gap-2.5 px-8 py-4 bg-[#A3E635] hover:bg-[#bef264] text-black font-bold rounded-xl text-sm glow-lime transition-all duration-300 hover:scale-105 max-sm:mt-2 sm:mt-6 md:mt-8 lg:mt-0"
            >
              Unlock Investment Deck
              <IconArrowDown size={15} className="group-hover:translate-y-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── 2–6. Main content + sticky form ─────────────────────────────── */}
      <section className={`${SECTION_GAP} ${SECTION_PB} overflow-x-clip bg-white dark:bg-[#0b0f1a]`}>
        <div className={SECTION_CONTAINER}>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14 lg:items-start">

            {/* Left column */}
            <div className={`lg:col-span-7 ${BLOCK_GAP}`}>

              {/* Story */}
              <motion.div
                {...up(0)}
                className={`${PANEL} bg-gray-50 dark:bg-[#0f1623] border border-gray-200 dark:border-white/[0.08]`}
              >
                <SectionTitle as="h2" align="left" className="!text-2xl sm:!text-3xl md:!text-4xl !text-transparent">
                  <InvestorHeading>Every Delivery Tells a Bigger Story</InvestorHeading>
                </SectionTitle>

                <p className="text-gray-600 dark:text-white/60 text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
                  Millions of deliveries happen every day.
                </p>

                <ul className="space-y-3 mb-6 md:mb-8">
                  {STORY_LINES.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <p className="text-gray-800 dark:text-white/80 text-base sm:text-lg font-heading font-semibold leading-relaxed">
                        {line}
                      </p>
                    </li>
                  ))}
                </ul>

                <p className="font-heading font-black text-xl sm:text-2xl md:text-3xl leading-snug text-transparent">
                  <InvestorHeading>Why shouldn&apos;t that be you?</InvestorHeading>
                </p>
              </motion.div>

              {/* Checklist */}
              <motion.div
                {...up(0.05)}
                className={`${PANEL} bg-white dark:bg-[#0f1623] border border-gray-200 dark:border-white/[0.08]`}
              >
                <SectionTitle as="h2" align="left" className="!text-2xl sm:!text-3xl md:!text-4xl !text-transparent">
                  <span className="block">
                    <InvestorHeading>Built on Real Operations</InvestorHeading>
                  </span>
                  <span className="block">
                    <InvestorHeading>Not Just Projections</InvestorHeading>
                  </span>
                </SectionTitle>

                <div className="grid sm:grid-cols-2 gap-3 mt-6 md:mt-8">
                  {CHECKS.map((c) => (
                    <div
                      key={c}
                      className={`group flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.08] ${CARD_HOVER}`}
                    >
                      <div className="w-5 h-5 rounded-full bg-[#A3E635]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <IconCircleCheck size={12} className="text-[#65a30d] dark:text-[#A3E635]" />
                      </div>
                      <span className="text-gray-800 dark:text-white/80 text-sm sm:text-base leading-relaxed">
                        {c}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Why */}
              <motion.div
                {...up(0.05)}
                className={`${PANEL} bg-gray-50 dark:bg-[#050b18] border border-gray-200/80 dark:border-white/[0.06]`}
              >
                <SectionTitle as="h2" align="left" className="!text-2xl sm:!text-3xl md:!text-4xl !text-transparent">
                  <InvestorHeading>Every Great Investment Starts With One Question</InvestorHeading>
                </SectionTitle>
                <p className="text-gray-500 dark:text-white/50 text-base sm:text-lg italic leading-relaxed mb-4 md:mb-5">
                  What if an everyday business could become an investment opportunity?
                </p>
                <p className="text-gray-700 dark:text-white/70 text-base sm:text-lg leading-relaxed">
                  That&apos;s the idea behind DrivTech. We&apos;re transforming commercial logistics into a
                  professionally managed, asset-backed investment opportunity built on real operations and
                  enterprise demand.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                {...up(0.05)}
                className={`${PANEL} bg-gray-50 dark:bg-[#0f1623] border border-gray-200 dark:border-white/[0.08]`}
              >
                <div className={SECTION_HEADER_MB}>
                  <SectionTitle as="h2" align="left" className="!text-2xl sm:!text-3xl md:!text-4xl !mb-0 !text-transparent">
                    <InvestorHeading>Why Investors Are Paying Attention</InvestorHeading>
                  </SectionTitle>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {WHY_CARDS.map((c) => (
                    <div
                      key={c.metric}
                      className={`group relative overflow-hidden p-4 sm:p-6 rounded-2xl border text-center bg-white dark:bg-white/[0.03] border-gray-200/80 dark:border-white/[0.08] ${CARD_HOVER}`}
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A3E635]/0 to-transparent group-hover:via-[#A3E635]/50 transition-all duration-300"
                      />
                      <p className="font-heading font-black text-base sm:text-lg leading-tight mb-2 text-gray-900 dark:text-white group-hover:text-[#65a30d] dark:group-hover:text-[#A3E635] transition-colors duration-300">
                        {c.metric}
                      </p>
                      <p className="text-gray-500 dark:text-white/45 text-xs sm:text-sm leading-snug">{c.sub}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column — form */}
            <motion.aside
              ref={formRef}
              {...up(0.08)}
              className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start mt-8 lg:mt-0 scroll-mt-28"
            >
              <div className={`${SECTION_HEADER_MB} text-center`}>
                <SectionTitle as="h2" align="center" className="!text-2xl sm:!text-3xl md:!text-4xl !text-transparent">
                  <InvestorHeading>Access the Investment Deck</InvestorHeading>
                </SectionTitle>
                <SectionDescription align="center" maxWidth="max-w-none" className="!mt-3 dark:text-white/70">
                  Gain exclusive access to the confidential DrivTech Investment Deck, including the investment
                  model, business framework, and operational overview.
                </SectionDescription>
                <p className="text-gray-500 dark:text-white/40 text-sm mt-3">
                  Enter your details to continue.
                </p>
              </div>

              <InvestmentForm {...formProps} />
            </motion.aside>

          </div>
        </div>
      </section>
    </>
  )
}
