import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full overflow-x-clip">
        <Home />
      </main>
      <Footer />
    </>
  )
}
