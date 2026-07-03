import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'https://drivtech.in'
const DEFAULT_OG = `${SITE}/logo.webp`

/* Per-route metadata. '/' falls back to '/home'. */
const META = {
  '/home': {
    title: 'DrivTech — Smart Logistics. Seamless Delivery.',
    description:
      "DrivTech is Mumbai's premier enterprise logistics operations company — fleet management, linehaul logistics, driver sourcing, and scalable mobility solutions across India.",
    path: '/home',
  },
  '/about': {
    title: 'About DrivTech — Enterprise Logistics Operations Company in Mumbai',
    description:
      'Learn about DrivTech, a Mumbai-based enterprise logistics operations company powering fleet management, linehaul, and driver sourcing for India’s fastest-growing businesses.',
    path: '/about',
  },
  '/services': {
    title: 'Logistics Services — First, Middle & Last Mile Delivery | DrivTech',
    description:
      'DrivTech delivers end-to-end logistics: first-mile, middle-mile, and last-mile transportation, fleet management, adhoc vehicles, and driver sourcing across India.',
    path: '/services',
  },
  '/hub': {
    title: 'Driv HUB — Technology Platform for Fleet Operations | DrivTech',
    description:
      'Driv HUB is the technology platform powering real-time fleet operations, driver management, and logistics visibility for enterprise supply chains.',
    path: '/hub',
  },
  '/invest': {
    title: 'Fleet Investor Program — Partner & Earn With DrivTech',
    description:
      'Join the DrivTech fleet investor program. Invest in a managed fleet model and earn predictable returns from India’s growing enterprise logistics market.',
    path: '/invest',
  },
  '/contact': {
    title: 'Contact DrivTech — Enterprise Logistics in Mumbai, India',
    description:
      'Get in touch with DrivTech for enterprise logistics, fleet management, and partnership inquiries. Based in Malad West, Mumbai. Call, email, or message us.',
    path: '/contact',
  },
}

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

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const key = pathname === '/' ? '/home' : pathname
    const m = META[key] || META['/home']
    const url = `${SITE}${m.path}`

    document.title = m.title
    setMeta('name', 'description', m.description)
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
  }, [pathname])

  return null
}
