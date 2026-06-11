import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Seo from './components/Seo'
import TextReveal from './components/TextReveal'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Hub from './pages/Hub'
import Investor from './pages/Investor'
import Contact from './pages/Contact'

/* Scroll to top whenever the route changes */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ConditionalFooter() {
  return <Footer />
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Seo />
      <TextReveal />
      <Navbar />
      <main className="min-h-screen w-full overflow-x-clip">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/invest" element={<Investor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <ConditionalFooter />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/917738046786"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:bg-[#20bf5a] hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-all duration-300"
      >
        <IconBrandWhatsapp size={26} className="text-white sm:hidden" />
        <IconBrandWhatsapp size={30} className="text-white hidden sm:block" />
      </a>
    </BrowserRouter>
  )
}
