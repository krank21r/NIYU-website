import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import OrderFlow from './components/OrderFlow'
import ProductDetail from './components/ProductDetail'
import Particles from './components/Particles'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import useLenis from './hooks/useLenis'

const Hero = lazy(() => import('./components/Hero'))
const TrendingProducts = lazy(() => import('./components/TrendingProducts'))
const NiyuSpecials = lazy(() => import('./components/NiyuSpecials'))
const AttarSection = lazy(() => import('./components/AttarSection'))
const CarPerfumes = lazy(() => import('./components/CarPerfumes'))
const About = lazy(() => import('./components/About'))
const ProductCollection = lazy(() => import('./components/ProductCollection'))
const Reviews = lazy(() => import('./components/Reviews'))
const Gallery = lazy(() => import('./components/Gallery'))
const Contact = lazy(() => import('./components/Contact'))
const TrustBar = lazy(() => import('./components/TrustBar'))
const Footer = lazy(() => import('./components/Footer'))

const Terms = lazy(() => import('./components/legal/Terms'))
const Privacy = lazy(() => import('./components/legal/Privacy'))
const RefundPolicy = lazy(() => import('./components/legal/RefundPolicy'))
const ShippingPolicy = lazy(() => import('./components/legal/ShippingPolicy'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-gold/30 border-t-gold rounded-full animate-spin" />
        <p className="text-xs tracking-[0.2em] uppercase text-ink-subtle font-body">Loading</p>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Hero />
      <TrendingProducts />
      <NiyuSpecials />
      <AttarSection />
      <CarPerfumes />
      <About />
      <ProductCollection />
      <Reviews />
      <Gallery />
      <Contact />
      <TrustBar />
      <Footer />
    </Suspense>
  )
}

function LegalPage({ children }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
      <Footer />
    </Suspense>
  )
}

export default function App() {
  useLenis()

  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <div className="bg-ivory min-h-screen relative">
            <a href="#main-content" className="skip-nav">
              Skip to main content
            </a>
            <Preloader />
            <Particles />
            <ScrollProgress />
            <ScrollToTop />
            <Navbar />
            <OrderFlow />
            <ProductDetail />
            <Routes>
              <Route path="/" element={
                <main id="main-content">
                  <HomePage />
                </main>
              } />
              <Route path="/terms" element={
                <main id="main-content">
                  <LegalPage><Terms /></LegalPage>
                </main>
              } />
              <Route path="/privacy" element={
                <main id="main-content">
                  <LegalPage><Privacy /></LegalPage>
                </main>
              } />
              <Route path="/refund" element={
                <main id="main-content">
                  <LegalPage><RefundPolicy /></LegalPage>
                </main>
              } />
              <Route path="/shipping" element={
                <main id="main-content">
                  <LegalPage><ShippingPolicy /></LegalPage>
                </main>
              } />
            </Routes>
          </div>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
