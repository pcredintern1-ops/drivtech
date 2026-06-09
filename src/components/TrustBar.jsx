import { useState } from 'react'
import { motion } from 'framer-motion'

const brands = [
  { name: 'Zepto',        domain: 'zeptonow.com',       initials: 'Z',  color: '#8b5cf6' },
  { name: 'Zomato',       domain: 'zomato.com',         initials: 'Zo', color: '#e23744' },
  { name: 'Blinkit',      domain: 'blinkit.com',        initials: 'B',  color: '#f9c22e' },
  { name: 'Swiggy',       domain: 'swiggy.com',         initials: 'Sw', color: '#fc8019' },
  { name: 'Meesho',       domain: 'meesho.com',         initials: 'M',  color: '#9b2a8f' },
  { name: 'Delhivery',    domain: 'delhivery.com',      initials: 'D',  color: '#d2232a' },
  { name: 'Shadowfax',    domain: 'shadowfax.in',       initials: 'Sf', color: '#4f46e5' },
  { name: 'Porter',       domain: 'porter.in',          initials: 'P',  color: '#ff6b35' },
  { name: 'Rivigo',       domain: 'rivigo.com',         initials: 'R',  color: '#e63946' },
  { name: 'Loadshare',    domain: 'loadshare.in',       initials: 'L',  color: '#2563eb' },
  { name: 'Ecom Express', domain: 'ecomexpress.in',     initials: 'EE', color: '#dc2626' },
  { name: 'XpressBees',   domain: 'xpressbees.com',     initials: 'XB', color: '#f97316' },
]

const half = Math.ceil(brands.length / 2)
const rowOne = brands.slice(0, half)
const rowTwo = brands.slice(half)
const loopRowOne = [...rowOne, ...rowOne, ...rowOne]
const loopRowTwo = [...rowTwo, ...rowTwo, ...rowTwo]

function BrandLogo({ brand }) {
  // Source chain: Google favicon (256) → Clearbit → Google favicon (128) → initials
  const sources = [
    `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=256`,
    `https://logo.clearbit.com/${brand.domain}?size=128`,
    `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`,
  ]
  const [stage, setStage] = useState(0)
  const src = sources[stage]

  const next = () => {
    setStage(s => s + 1)
  }

  if (stage >= sources.length) {
    return (
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white text-[11px] font-black leading-none shrink-0"
        style={{ background: brand.color }}
      >
        {brand.initials}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={brand.name}
      onError={next}
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-xl shrink-0"
    />
  )
}

function BrandCard({ brand }) {
  return (
    <div
      className="
        inline-flex items-center gap-2 sm:gap-3 mx-1.5 sm:mx-3 px-3 sm:px-5 py-2.5 sm:py-3.5 shrink-0 w-[140px] sm:w-[208px]
        bg-white/8 border border-white/12 rounded-2xl
        cursor-default select-none
        transition-all duration-300
        hover:border-[#A3E635]/50 hover:-translate-y-1.5
        hover:shadow-[0_10px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(163,230,53,0.15)]
        group
      "
    >
      <BrandLogo brand={brand} />
      <span className="font-heading font-bold text-[12px] sm:text-[13.5px] text-gray-300 group-hover:text-white tracking-wide whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-300">
        {brand.name}
      </span>
    </div>
  )
}

export default function TrustBar() {
  return (
    <section className="relative py-14 md:py-20 border-y border-white/8 bg-[#111827]">

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-11 px-6">
          <span className="flex items-center justify-center gap-3 text-[#A3E635] text-xs font-bold uppercase tracking-[0.3em] mb-3">
            <span className="w-8 h-px bg-[#A3E635]/60" /><span className="w-2 h-2 rounded-full bg-[#A3E635]" />Trusted Partners<span className="w-2 h-2 rounded-full bg-[#A3E635]" /><span className="w-8 h-px bg-[#A3E635]/60" />
          </span>
          <div className="w-fit mx-auto mt-3">
            <h3 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] leading-[1.08] text-white mb-2 text-center">
              Powering India's <span className="gradient-text-lime-light">Fastest Growing Enterprises</span>
            </h3>
          </div>
        </div>

        <div
          className="relative marquee-wrap py-3 flex flex-col gap-3 sm:gap-4"
          style={{ overflowX: 'clip' }}
        >
          {/* Row 1 — scrolls left */}
          <div
            className="flex animate-marquee"
            style={{ willChange: 'transform', width: 'max-content' }}
          >
            {loopRowOne.map((brand, i) => (
              <BrandCard key={i} brand={brand} />
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div
            className="flex animate-marquee-reverse"
            style={{ willChange: 'transform', width: 'max-content' }}
          >
            {loopRowTwo.map((brand, i) => (
              <BrandCard key={i} brand={brand} />
            ))}
          </div>

          {/* Edge fades — dark background */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-48 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, #111827 15%, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-48 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to left, #111827 15%, transparent)' }}
          />
        </div>
      </div>
    </section>
  )
}
