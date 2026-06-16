import { motion } from 'framer-motion'

/* Verified, locally-hosted logos (sourced from Wikimedia Commons, checked
   against each brand's actual mark — see /public/brands/).
   Westside & Zudio have no verified freely-licensed logo file available;
   they render as a clean text/initials badge until a real asset is supplied. */
const brands = [
  { name: 'Zepto',     logo: '/brands/zepto.svg',     initials: 'Z',  color: '#950EDB' },
  { name: 'Amazon',    logo: '/brands/amazon.svg',    initials: 'A',  color: '#FF9900' },
  { name: 'Flipkart',  logo: '/brands/flipkart.svg',  initials: 'F',  color: '#2874F0' },
  { name: 'Blinkit',   logo: '/brands/blinkit.svg',   initials: 'B',  color: '#F8CB46' },
  { name: 'DMart',     logo: '/brands/dmart.png',     initials: 'D',  color: '#F47820' },
  { name: 'Meesho',    logo: '/brands/meesho.png',    initials: 'M',  color: '#5F0A87' },
  { name: 'Westside',  logo: null,                    initials: 'W',  color: '#1f2937' },
  { name: 'Zudio',     logo: null,                    initials: 'Zu', color: '#dc2626' },
  { name: 'BigBasket', logo: '/brands/bigbasket.png', initials: 'BB', color: '#84BD00' },
]

const half = Math.ceil(brands.length / 2)
const rowOne = brands.slice(0, half)
const rowTwo = brands.slice(half)
const loopRowOne = [...rowOne, ...rowOne, ...rowOne]
const loopRowTwo = [...rowTwo, ...rowTwo, ...rowTwo]

function BrandLogo({ brand }) {
  // Verified local logo file. No logo asset yet → clean initials badge
  // (never a guessed/unverified image).
  if (!brand.logo) {
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
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center shrink-0 p-1.5">
      <img
        src={brand.logo}
        alt={brand.name}
        className="w-full h-full object-contain"
      />
    </div>
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
          <span className="flex items-center justify-center gap-3 text-[#A3E635] text-sm font-bold uppercase tracking-[0.3em] mb-3">
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
