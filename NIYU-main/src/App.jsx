import { lazy, Suspense, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DealBanner from './components/DealBanner'
import ProductGrid from './components/ProductGrid'
import TrendingNow from './components/TrendingNow'
import ProductCollection from './components/ProductCollection'
import TrustBar from './components/TrustBar'
import AttarSection from './components/AttarSection'
import CarPerfumes from './components/CarPerfumes'
import About from './components/About'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import OrderFlow from './components/OrderFlow'
import ProductDetail from './components/ProductDetail'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

function LoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        <p className="text-[10px] tracking-[0.15em] uppercase text-ink-subtle font-body">Loading</p>
      </div>
    </div>
  )
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.pathname === '/admin')

  useEffect(() => {
    const handlePathChange = () => setIsAdmin(window.location.pathname === '/admin')
    window.addEventListener('popstate', handlePathChange)
    return () => window.removeEventListener('popstate', handlePathChange)
  }, [])

  if (isAdmin) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <div className="min-h-screen bg-surface">
          <div className="p-8 max-w-4xl mx-auto">
            <h1 className="heading text-3xl text-ink mb-6">Admin Dashboard</h1>
            <p className="text-ink-muted font-body text-sm">Coming soon...</p>
          </div>
        </div>
      </Suspense>
    )
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="bg-surface min-h-screen relative">
          <a href="#main-content" className="skip-nav">Skip to main content</a>
          <Preloader />
          <ScrollProgress />
          <ScrollToTop />
          <Navbar />
          <OrderFlow />
          <ProductDetail />
          <main id="main-content">
            <Suspense fallback={<LoadingFallback />}>
              <Hero />
              <DealBanner />
              <TrendingNow />
              <div id="collection"><ProductCollection /></div>
              <TrustBar />
              <AttarSection />
              <CarPerfumes />
              <About />
              <Reviews />
              <Contact />
              <Footer />
            </Suspense>
          </main>
        </div>
      </WishlistProvider>
    </CartProvider>
  )
}
