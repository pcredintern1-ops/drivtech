import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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

/* Footer on every page except Home */
function ConditionalFooter() {
  const { pathname } = useLocation()
  if (pathname === '/' || pathname === '/home') return null
  return <Footer />
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
    </BrowserRouter>
  )
}
