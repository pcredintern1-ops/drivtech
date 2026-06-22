import Hero from '../components/Hero'
import StatsSection from '../components/StatsSection'
import AboutSection from '../components/AboutSection'
import TrustBar from '../components/TrustBar'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutSection continuation />
      <TrustBar continuation />
    </>
  )
}
