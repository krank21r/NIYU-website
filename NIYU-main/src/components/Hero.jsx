import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    image: '/hero-perfume.jpg.png',
    badge: 'NEW ARRIVAL',
    title: '',
    subtitle: '',
    cta: 'Shop Now',
    ctaLink: '#specials',
    secondaryCta: 'View All',
    secondaryLink: '#collection',
    discount: '',
    gradient: 'from-charcoal/80 via-charcoal/40 to-transparent',
  },
  {
    id: 2,
    image: '/hero-attar.jpg.png',
    badge: 'BESTSELLER',
    title: 'Pure Attar\nCollection',
    subtitle: 'Alcohol-free traditional attars — long-lasting, handcrafted luxury',
    cta: 'Explore Attars',
    ctaLink: '#attars',
    secondaryCta: 'New Arrivals',
    secondaryLink: '#specials',
    discount: 'Starting ₹499',
    gradient: 'from-dark-brown/80 via-dark-brown/40 to-transparent',
  },
  {
    id: 3,
    image: '/Car images.jpeg',
    badge: 'TRENDING',
    title: 'Car Perfumes\nFor Every Drive',
    subtitle: 'Transform your commute with luxury fragrances that last',
    cta: 'Shop Car Perfumes',
    ctaLink: '#car-perfumes',
    secondaryCta: 'Best Deals',
    secondaryLink: '#specials',
    discount: 'Flat ₹200 OFF',
    gradient: 'from-ink/80 via-ink/40 to-transparent',
  },
]

const categories = [
  { label: 'Perfumes', icon: '✦', href: '#specials' },
  { label: 'Attars', icon: '◈', href: '#attars' },
  { label: 'Car Perfumes', icon: '⬡', href: '#car-perfumes' },
  { label: 'Gift Sets', icon: '❖', href: '#specials' },
]

const autoplayInterval = 5000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, autoplayInterval)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const slide = slides[current]

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Announcement Bar ── */}
      <div className="bg-charcoal text-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2">
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            Free Shipping on Orders Above ₹999
          </span>
          <span className="inline-block px-4 text-gold/40" aria-hidden="true">✦</span>
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            100% Authentic Arabian Fragrances
          </span>
          <span className="inline-block px-4 text-gold/40" aria-hidden="true">✦</span>
          {/* Duplicate for seamless loop */}
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            Free Shipping on Orders Above ₹999
          </span>
          <span className="inline-block px-4 text-gold/40" aria-hidden="true">✦</span>
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            100% Authentic Arabian Fragrances
          </span>
        </div>
      </div>

      {/* ── Main Carousel ── */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[400px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

            {/* Text Content */}
            <div className="relative h-full flex items-center px-6 sm:px-12 lg:px-20">
              <div className="max-w-lg">
                {/* Badge */}
                {slide.badge && (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="inline-block px-4 py-1.5 mb-4 text-[10px] tracking-[0.2em] uppercase font-body font-medium text-gold border border-gold/30 bg-gold/5 backdrop-blur-sm"
                  >
                    {slide.badge}
                  </motion.span>
                )}

                {/* Title */}
                {slide.title && (
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-4 whitespace-pre-line"
                  >
                    {slide.title}
                  </motion.h1>
                )}

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="text-sm sm:text-base md:text-lg text-white/70 font-body font-light leading-relaxed mb-6 max-w-md"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="flex items-center gap-3 mt-24"
                >
                  <a
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-ink text-[11px] tracking-[0.15em] uppercase font-body font-semibold hover:bg-gold-light transition-colors duration-200"
                  >
                    {slide.cta}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href={slide.secondaryLink}
                    className="inline-flex items-center gap-2 px-6 py-3 text-white/70 text-[11px] tracking-[0.15em] uppercase font-body font-medium border border-white/20 hover:bg-white/10 hover:text-white transition-colors duration-200"
                  >
                    {slide.secondaryCta}
                  </a>
                </motion.div>
              </div>

              {/* Discount Tag */}
              {slide.discount && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute right-6 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center justify-center w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30"
                >
                  <span className="text-[10px] tracking-[0.15em] uppercase text-gold/80 font-body font-medium">Save</span>
                  <span className="text-lg lg:text-xl font-heading font-bold text-gold">{slide.discount}</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation Arrows ── */}
        <button
          onClick={prev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200 active:scale-95"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200 active:scale-95"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ── Dots ── */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 bg-gold'
                  : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Quick Deals Strip ── */}
      <div className="bg-white border-b border-gold/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
              <DealPill label="Flat 10% OFF" sub="" code="NIYU10" />
            </div>
            <a
              href="#specials"
              className="hidden sm:flex-shrink-0 flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-body font-medium text-gold-dark hover:text-gold transition-colors duration-200"
            >
              View All Offers
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function DealPill({ label, sub, code }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-3 py-1.5 bg-gold/5 border border-gold/10">
      <div>
        <p className="text-[11px] tracking-[0.06em] font-body font-semibold text-charcoal leading-tight">{label}</p>
        <p className="text-[10px] font-body text-ink-subtle leading-tight">{sub}</p>
      </div>
      <span className="px-2 py-0.5 bg-charcoal/5 text-[10px] tracking-[0.08em] font-body font-semibold text-charcoal border border-dashed border-charcoal/20">
        {code}
      </span>
    </div>
  )
}
