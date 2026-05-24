import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import AnnouncementBar from './components/AnnouncementBar'
import Particles from './components/Particles'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import useLenis from './hooks/useLenis'

const Hero = lazy(() => import('./components/Hero'))
const TrialPack = lazy(() => import('./components/TrialPack'))
const TrendingProducts = lazy(() => import('./components/TrendingProducts'))
const NiyuSpecials = lazy(() => import('./components/NiyuSpecials'))
const AttarSection = lazy(() => import('./components/AttarSection'))
const CarPerfumes = lazy(() => import('./components/CarPerfumes'))
const About = lazy(() => import('./components/About'))
const ProductCollection = lazy(() => import('./components/ProductCollection'))
const OfferBanner = lazy(() => import('./components/OfferBanner'))
const SignatureFragrances = lazy(() => import('./components/SignatureFragrances'))
const Reviews = lazy(() => import('./components/Reviews'))
const Gallery = lazy(() => import('./components/Gallery'))
const Contact = lazy(() => import('./components/Contact'))
const TrustBar = lazy(() => import('./components/TrustBar'))
const Footer = lazy(() => import('./components/Footer'))

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

export default function App() {
  useLenis()

  return (
    <div className="bg-ivory min-h-screen relative">
      {/* Film grain overlay */}
      <div
        className="fixed inset-0 z-[90] pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <Preloader />
      <ScrollProgress />
      <ScrollToTop />
      <Particles count={40} />
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
          <TrialPack />
          <TrendingProducts />
          <NiyuSpecials />
          <AttarSection />
          <CarPerfumes />
          <About />
          <ProductCollection />
          <OfferBanner />
          <SignatureFragrances />
          <Reviews />
          <Gallery />
          <Contact />
          <TrustBar />
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}
