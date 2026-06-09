import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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
    </BrowserRouter>
  )
}
