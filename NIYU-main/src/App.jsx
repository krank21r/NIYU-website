import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Particles from './components/Particles'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import useLenis from './hooks/useLenis'

const Hero = lazy(() => import('./components/Hero'))
const About = lazy(() => import('./components/About'))
const ProductCollection = lazy(() => import('./components/ProductCollection'))
const SignatureFragrances = lazy(() => import('./components/SignatureFragrances'))
const Reviews = lazy(() => import('./components/Reviews'))
const Gallery = lazy(() => import('./components/Gallery'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black-soft">
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
    <div className="bg-black-soft min-h-screen">
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <Preloader />
      <ScrollProgress />
      <ScrollToTop />
      <Particles count={40} />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
          <About />
          <ProductCollection />
          <SignatureFragrances />
          <Reviews />
          <Gallery />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}
