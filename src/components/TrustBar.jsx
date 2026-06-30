import { SectionHeader, BAND_PY, BAND_SHELL_CONT, SECTION_CONTAINER, CONTAINER_GAP } from './SectionHeader'

const brands = [
  /* Row 1 — 7 clients */
  { name: 'Hyperpure',  logo: '/brands/hyperpure.webp', cardBg: '#e23844', zoom: 1.5 },
  { name: 'Blinkit',    logo: '/brands/blinkit.webp',   cardBg: '#f6cb4a', zoom: 1.8 },
  { name: 'BigBasket',  logo: '/brands/bigbasket.webp', cardBg: '#000000', zoom: 2.6 },
  { name: 'ElasticRun', logo: '/brands/elasticrun.svg', cardBg: '#ffffff' },
  { name: 'DMart',      logo: '/brands/dmart.webp',     cardBg: '#ffffff', zoom: 2.4 },
  { name: 'Flipkart',   logo: '/brands/flipkart.webp',  cardBg: '#027cd5' },
  { name: 'Meesho',     logo: '/brands/meesho.webp',    cardBg: '#ffffff', zoom: 2.0 },
  /* Row 2 — 6 clients */
  { name: 'Delhivery',  logo: '/brands/delhivery.webp', cardBg: '#000000', zoom: 2.6 },
  { name: 'Amazon',     logo: '/brands/amazon.webp',    cardBg: '#161d26', zoom: 2.0 },
  { name: 'Truemeds',   logo: '/brands/truemeds.webp',  cardBg: '#ffffff', zoom: 2.2 },
  { name: 'Yulu',       logo: '/brands/yulu.svg',       cardBg: '#ffffff' },
  { name: 'Dunzo',      logo: '/brands/dunzo.svg',      cardBg: '#ffffff' },
  { name: 'Zepto',      logo: '/brands/zepto.svg',      cardBg: '#ffffff' },
]

const half = Math.ceil(brands.length / 2)
const rowOne = brands.slice(0, half)
const rowTwo = brands.slice(half)
const loopRowOne = [...rowOne, ...rowOne]
const loopRowTwo = [...rowTwo, ...rowTwo]

function BrandCard({ brand }) {
  const imgStyle = {
    ...(brand.zoom ? { transform: `scale(${brand.zoom})` } : {}),
  }

  return (
    <div
      className="
        inline-flex items-stretch mx-1.5 sm:mx-3 shrink-0
        min-w-[130px] sm:min-w-[170px] lg:min-w-[210px]
        border border-white/20 rounded-2xl overflow-hidden
        cursor-default select-none
        transition-all duration-300
        hover:border-[#A3E635]/50 hover:-translate-y-1.5
        hover:shadow-[0_10px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(163,230,53,0.15)]
      "
      style={{ backgroundColor: brand.cardBg || '#ffffff' }}
    >
      <div className="w-full flex items-center justify-center px-5 sm:px-7 lg:px-9 py-4 sm:py-5 lg:py-6">
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-10 sm:h-12 lg:h-14 w-auto max-w-full object-contain"
          style={Object.keys(imgStyle).length ? imgStyle : undefined}
        />
      </div>
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
