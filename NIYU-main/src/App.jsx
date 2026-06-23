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
const TrendingNow = lazy(() => import('./components/TrendingNow'))
const Categories = lazy(() => import('./components/Categories'))
const AttarSection = lazy(() => import('./components/AttarSection'))
const CarPerfumes = lazy(() => import('./components/CarPerfumes'))
const Footer = lazy(() => import('./components/Footer'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))


const Terms = lazy(() => import('./components/legal/Terms'))
const Privacy = lazy(() => import('./components/legal/Privacy'))
const RefundPolicy = lazy(() => import('./components/legal/RefundPolicy'))
const ShippingPolicy = lazy(() => import('./components/legal/ShippingPolicy'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-accent/30 border-t-accent rounded-full animate-spin" />
        <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary font-body">Loading</p>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Hero />
      <TrendingNow />
      <Categories />
      <AttarSection />
      <CarPerfumes />
      <About />
      <Contact />
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
          <div className="bg-white min-h-screen relative">
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
