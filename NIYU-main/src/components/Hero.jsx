import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    image: '/niyu-hero-ocean.jpg.PNG',
    badge: 'NEW ARRIVAL',
    title: 'Discover Your\nSignature Scent',
    subtitle: 'Premium Arabian & French perfumes crafted from the finest ingredients',
    cta: 'Shop Now',
    ctaLink: '#specials',
    secondaryCta: 'View All',
    secondaryLink: '#collection',
    discount: 'Up to 30% OFF',
    gradient: 'from-charcoal/80 via-charcoal/40 to-transparent',
  },
  {
    id: 2,
    image: '/attar.jpeg',
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
  { label: 'New In', icon: '★', href: '#collection' },
  { label: 'Bestsellers', icon: '◆', href: '#trending' },
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
      <div className="bg-charcoal text-ivory overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2">
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            Free Shipping on Orders Above ₹999
          </span>
          <span className="inline-block px-4 text-gold/40" aria-hidden="true">✦</span>
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            100% Authentic Arabian Fragrances
          </span>
          <span className="inline-block px-4 text-gold/40" aria-hidden="true">✦</span>
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            Cash on Delivery Available
          </span>
          <span className="inline-block px-4 text-gold/40" aria-hidden="true">✦</span>
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            Easy 7-Day Returns
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
          <span className="inline-block px-4 text-gold/40" aria-hidden="true">✦</span>
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            Cash on Delivery Available
          </span>
          <span className="inline-block px-4 text-gold/40" aria-hidden="true">✦</span>
          <span className="inline-block px-8 text-[11px] tracking-[0.15em] uppercase font-body font-light">
            Easy 7-Day Returns
          </span>
        </div>
      </div>

      {/* ── Category Chips ── */}
      <div className="bg-cream/80 backdrop-blur-md border-b border-gold/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-none overscroll-contain touch-manipulation">
            {categories.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-ivory border border-gold/10 hover:border-gold/30 hover:bg-gold/5 text-ink-soft hover:text-charcoal transition-all duration-200 text-[11px] tracking-[0.08em] uppercase font-body font-medium min-h-[36px]"
              >
                <span className="text-gold text-[10px]">{cat.icon}</span>
                {cat.label}
              </a>
            ))}
          </div>
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
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover object-center"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="max-w-xl">
                  {/* Discount Badge */}
                  {slide.discount && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="inline-block mb-4"
                    >
                      <span className="inline-flex items-center px-4 py-1.5 bg-gold text-charcoal text-[11px] tracking-[0.12em] uppercase font-body font-semibold">
                        {slide.discount}
                      </span>
                    </motion.div>
                  )}

                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <span className="inline-flex items-center gap-2 text-gold-light text-[11px] tracking-[0.2em] uppercase font-body font-medium mb-3">
                      <span className="w-6 h-[1px] bg-gold-light" />
                      {slide.badge}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="font-heading font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory leading-[1.1] mb-4 whitespace-pre-line"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-ivory/70 font-body font-light text-sm sm:text-base max-w-md mb-8 leading-relaxed"
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-wrap items-center gap-3"
                  >
                    <a
                      href={slide.ctaLink}
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-ivory text-charcoal font-body font-medium text-[11px] tracking-[0.12em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-300 min-h-[44px]"
                    >
                      {slide.cta}
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                    {slide.secondaryCta && (
                      <a
                        href={slide.secondaryLink}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-ivory/30 text-ivory font-body font-medium text-[11px] tracking-[0.12em] uppercase hover:bg-ivory/10 hover:border-ivory/50 transition-all duration-300 min-h-[44px]"
                      >
                        {slide.secondaryCta}
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation Arrows ── */}
        <button
          onClick={prev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-ivory/10 backdrop-blur-md border border-ivory/20 text-ivory hover:bg-ivory/20 transition-all duration-200 active:scale-95"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-ivory/10 backdrop-blur-md border border-ivory/20 text-ivory hover:bg-ivory/20 transition-all duration-200 active:scale-95"
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
                  : 'w-1.5 bg-ivory/40 hover:bg-ivory/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Quick Deals Strip ── */}
      <div className="bg-ivory border-b border-gold/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
              <DealPill label="Flat 20% OFF" sub="on first order" code="NIYU20" />
              <DealPill label="Buy 2 Get 1" sub="on Attars" code="ATTAR321" />
              <DealPill label="Free Gift" sub="on orders above ₹1499" code="GIFT1499" />
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
