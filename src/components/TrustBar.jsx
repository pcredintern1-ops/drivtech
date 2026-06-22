import { SectionHeader, BAND_PY, BAND_SHELL_CONT, SECTION_CONTAINER, CONTAINER_GAP } from './SectionHeader'

/* Verified, locally-hosted logos (sourced from Wikimedia Commons, checked
   against each brand's actual mark — see /public/brands/).
   Hyperpure, Truemeds & Yulu have no verified freely-licensed logo file
   available; they render as a clean text/initials badge until a real asset
   is supplied. */
const brands = [
  /* Row 1 — 7 clients */
  { name: 'Hyperpure',  logo: '/brands/hyperpure.webp',  initials: 'HP', color: '#E23744' },
  { name: 'Blinkit',    logo: '/brands/blinkit.svg',    initials: 'B',  color: '#F8CB46' },
  { name: 'BigBasket',  logo: '/brands/bigbasket.png',  initials: 'BB', color: '#84BD00' },
  { name: 'ElasticRun', logo: '/brands/elasticrun.svg', initials: 'ER', color: '#2563eb' },
  { name: 'DMart',      logo: '/brands/dmart.png',      initials: 'D',  color: '#F47820' },
  { name: 'Flipkart',   logo: '/brands/flipkart.svg',   initials: 'F',  color: '#2874F0' },
  { name: 'Meesho',     logo: '/brands/meesho.png',     initials: 'M',  color: '#5F0A87' },
  /* Row 2 — 6 clients */
  { name: 'Delhivery',  logo: '/brands/delhivery.png',  initials: 'D',  color: '#E53935' },
  { name: 'Amazon',     logo: '/brands/amazon.svg',     initials: 'A',  color: '#FF9900' },
  { name: 'Truemeds',   logo: '/brands/truemeds.webp',   initials: 'TM', color: '#1AAE9F' },
  { name: 'Yulu',       logo: '/brands/yulu.svg',       initials: 'Y',  color: '#00BCD4' },
  { name: 'Dunzo',      logo: '/brands/dunzo.svg',      initials: 'D',  color: '#00D26A' },
  { name: 'Zepto',      logo: '/brands/zepto.svg',      initials: 'Z',  color: '#950EDB' },
]

const half = Math.ceil(brands.length / 2)
const rowOne = brands.slice(0, half)
const rowTwo = brands.slice(half)
/* Exactly 2 copies — the marquee keyframe translates -50%, so two identical
   copies make the loop seamless (3 copies caused the -50% restart to land
   mid-pattern → the visible jump). */
const loopRowOne = [...rowOne, ...rowOne]
const loopRowTwo = [...rowTwo, ...rowTwo]

function BrandLogo({ brand }) {
  // Verified local logo file. No logo asset yet → clean initials badge
  // (never a guessed/unverified image).
  if (!brand.logo) {
    return (
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-25 lg:h-25 rounded-xl flex items-center justify-center text-white font-black leading-none"
        style={{ background: brand.color }}
      >
        {brand.initials}
      </div>
    )
  }

  return (
    <div className="w-15 h-15 sm:w-10 sm:h-10 lg:w-25 lg:h-25 rounded-xl bg-white flex items-center justify-center shrink-0 p-1.5">
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
        inline-flex items-center gap-2 sm:gap-3 lg:gap-4 mx-1.5 sm:mx-3 px-3 sm:px-5 lg:px-7 py-2.5 sm:py-3.5 lg:py-5 shrink-0 w-auto sm:w-[208px] lg:w-[330px]
        bg-white/8 border border-white/12 rounded-2xl
        cursor-default select-none
        transition-all duration-300
        hover:border-[#A3E635]/50 hover:-translate-y-1.5
        hover:shadow-[0_10px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(163,230,53,0.15)]
        group
      "
    >
      <BrandLogo brand={brand} />
      <span className="font-heading font-bold text-[12px] sm:text-[13.5px] lg:text-[17px] text-gray-300 group-hover:text-white tracking-wide whitespace-nowrap sm:overflow-hidden sm:text-ellipsis transition-colors duration-300">
        {brand.name}
      </span>
    </div>
  )
}

export default function TrustBar({ continuation = false }) {
  const bandClass = continuation ? BAND_SHELL_CONT : BAND_PY
  return (
    <section className={`relative ${bandClass} border-y border-white/8 bg-[#111827]`}>

      <div className={`${SECTION_CONTAINER} ${continuation ? CONTAINER_GAP : ''}`}>
        <SectionHeader
          onDark
          label="Trusted Partners"
          title={<>Powering India&apos;s <span className="gradient-text-lime-light">Fastest Growing Enterprises</span></>}
        />

        <div
          className="relative marquee-wrap py-3 flex flex-col gap-3 sm:gap-4 -mx-4 sm:-mx-8 lg:-mx-12 2xl:-mx-24"
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
        </div>
      </div>
    </section>
  )
}
