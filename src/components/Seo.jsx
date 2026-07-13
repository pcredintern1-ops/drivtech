import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'https://drivtech.in'
const DEFAULT_OG = `${SITE}/logo.webp`

const META = {
  '/': {
    title: 'DrivTech | Smart Logistics & Fleet Operations in Mumbai',
    description:
      "DrivTech is Mumbai's premier enterprise logistics company. Fleet management, linehaul logistics, driver sourcing, and scalable mobility solutions across India.",
    path: '/',
  },
  '/about': {
    title: 'About DrivTech | Enterprise Fleet & Logistics Operations Company',
    description:
      'DrivTech is a Mumbai-based enterprise logistics company powering fleet management, linehaul, and driver operations for India\'s fastest-growing businesses. Founded 2023.',
    path: '/about',
  },
  '/services': {
    title: 'Logistics Services | First, Middle & Last Mile Delivery | DrivTech',
    description:
      'End-to-end logistics by DrivTech: first-mile, middle-mile, and last-mile transportation, dedicated fleet, ad hoc vehicles, and driver sourcing across India.',
    path: '/services',
  },
  '/investor-program': {
    title: 'Fleet Investor Program | Earn With DrivTech Logistics',
    description:
      'Invest in DrivTech\'s managed fleet model and earn predictable returns from India\'s growing enterprise logistics market. Asset-backed, professionally managed.',
    path: '/investor-program',
  },
  '/contact': {
    title: 'Contact DrivTech | Enterprise Logistics & Fleet Management Mumbai',
    description:
      'Contact DrivTech for enterprise logistics, fleet management, and partnership inquiries. Headquartered in Malad West, Mumbai. Call, email, or WhatsApp us.',
    path: '/contact',
  },
}

const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'DrivTech Logistics Pvt. Ltd.',
      url: SITE,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/logo.webp`,
        width: 210,
        height: 56,
      },
      sameAs: [
        'https://www.linkedin.com/company/driv-tech/',
        'https://www.instagram.com/drivtech.in',
        'https://www.facebook.com/share/1B28W9bziJ/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-88558-86673',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE}/#localbusiness`,
      name: 'DrivTech Logistics Pvt. Ltd.',
      url: SITE,
      telephone: '+91-88558-86673',
      email: 'contact@drivtech.in',
      description:
        'Enterprise fleet operations and logistics company in Mumbai, India. Fleet management, linehaul logistics, driver sourcing, and investor programs.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '158, Evershine Mall, Chincholi Bunder Junction',
        addressLocality: 'Malad West',
        addressRegion: 'Maharashtra',
        postalCode: '400064',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 19.1864,
        longitude: 72.8454,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
      priceRange: '$$',
      image: DEFAULT_OG,
      parentOrganization: { '@id': `${SITE}/#organization` },
    },
  ],
})

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function injectJsonLd() {
  const id = 'driv-json-ld'
  let el = document.head.querySelector(`script#${id}`)
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON_LD
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const key = pathname === '/home' ? '/' : pathname
    const m = META[key] || META['/']
    const url = `${SITE}${m.path}`

    document.title = m.title
    setMeta('name', 'description', m.description)
    setMeta('name', 'robots', 'index, follow')
    setCanonical(url)

    setMeta('property', 'og:title', m.title)
    setMeta('property', 'og:description', m.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:image', DEFAULT_OG)
    setMeta('property', 'og:site_name', 'DrivTech')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', m.title)
    setMeta('name', 'twitter:description', m.description)
    setMeta('name', 'twitter:image', DEFAULT_OG)

    injectJsonLd()
  }, [pathname])

  return null
}
