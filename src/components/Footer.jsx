import { useNavigate } from 'react-router-dom'
import { IconMail, IconPhone, IconMapPin, IconMessage, IconArrowRight } from '@tabler/icons-react'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="relative border-t border-white/8 bg-[#111827]">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #A3E635 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Top lime accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(163,230,53,0.45), transparent)' }} />

      <div className="relative w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-24 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12 mb-10 md:mb-14">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center mb-5">
              <img src="/logo-white.webp" alt="DRIV" className="h-9 sm:h-12 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-10 max-w-xs">
              Smart Logistics. Seamless Delivery.<br />
              Enterprise fleet operations powering modern India's supply chains.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'in', title: 'LinkedIn' },
                { label: 'ig', title: 'Instagram' },
                { label: 'fb', title: 'Facebook' },
              ].map(({ label, title }) => (
                <a key={label} href="#" title={title}
                  onClick={e => e.preventDefault()}
                  className="w-10 h-10 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center text-gray-500 hover:text-[#A3E635] hover:border-[#A3E635]/40 hover:bg-[#A3E635]/8 hover:shadow-[0_4px_16px_rgba(163,230,53,0.12)] hover:-translate-y-1 transition-all duration-300 text-xs font-bold uppercase">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-5 sm:mb-7">Quick Links</h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { label: 'Home', href: '/home' },
                { label: 'Services', href: '/services' },
                { label: 'DRIV HUB', href: '/hub' },
                { label: 'Investor Program', href: '/invest' },
                { label: 'Contact', href: '/contact' },
              ].map(l => (
                <li key={l.href}>
                  <a href={l.href}
                    onClick={e => { e.preventDefault(); navigate(l.href) }}
                    className="group flex items-center gap-1 text-gray-400 hover:text-[#A3E635] text-sm sm:text-base transition-colors duration-300">
                    <span className="link-underline">{l.label}</span>
                    <IconArrowRight size={11} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-5 sm:mb-7">Contact</h4>
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex gap-3 items-start">
                <IconMapPin size={13} className="text-[#A3E635] mt-0.5 shrink-0" />
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed">169, Evershine Mall, Chincholi Bunder Junction, Malad West, Mumbai - 400064</p>
              </li>
              <li className="flex gap-3 items-center group">
                <IconMail size={13} className="text-[#A3E635] shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <a href="mailto:contact@drivtech.in" className="text-gray-400 hover:text-[#A3E635] text-xs sm:text-sm transition-colors duration-300">contact@drivtech.in</a>
              </li>
              <li className="flex gap-3 items-center group">
                <IconPhone size={13} className="text-[#A3E635] shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <a href="tel:+917738046786" className="text-gray-400 hover:text-[#A3E635] text-xs sm:text-sm transition-colors duration-300">+91 77380 46786</a>
              </li>
              <li className="flex gap-3 items-center group">
                <IconMessage size={13} className="text-[#A3E635] shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <a href="https://wa.me/917738046786" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#A3E635] text-xs sm:text-sm transition-colors duration-300">WhatsApp Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-[11px] sm:text-xs text-center sm:text-left">© {new Date().getFullYear()} DRIV Logistics Pvt. Ltd. All rights reserved.</p>
          <p className="text-gray-500 text-[11px] sm:text-xs text-center sm:text-right">Enterprise Logistics Operations Company · Mumbai, India</p>
        </div>
      </div>
    </footer>
  )
}
