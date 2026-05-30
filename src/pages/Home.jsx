import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import DrivHubSection from '../components/DrivHubSection'
import InvestorSection from '../components/InvestorSection'
import Roadmap from '../components/Roadmap'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <TrustBar />
      <DrivHubSection />
      <InvestorSection />
      <Roadmap />
      <ContactSection />
    </>
  )
}
