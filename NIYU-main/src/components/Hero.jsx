import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const banners = [
  {
    id: 1,
    badge: 'Launch Offer',
    title: 'Pure Oils.',
    subtitle: 'Pure Luxury.',
    description: 'Up to 15% off on premium perfumes, attars & gift sets',
    cta: 'Shop Now',
    href: '#trending',
    image: '/hero-bg.png',
  },
  {
    id: 2,
    badge: 'New Collection',
    title: 'Scent That',
    subtitle: 'Stays.',
    description: 'Long-lasting fragrances crafted from the finest ingredients',
    cta: 'Explore',
    href: '#trending',
    image: '/2nd scsroll.png',
  },
]

const variants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
}

export default function Hero() {
  const ref = useRef(null)
  const [current, setCurrent] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80])

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % banners.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const banner = banners[current]

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden" aria-label="Promotional banners">
      <div className="relative h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px]">
        {/* Background image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.id}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            <img
              src={banner.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <motion.div
          className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 flex items-center"
          style={{ y: textY }}
        >
          <div className="max-w-xl">
            <motion.div
              key={`badge-${banner.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-3 sm:mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse-soft" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-white/90 font-body font-medium">{banner.badge}</span>
            </motion.div>

            <motion.h1
              key={`title-${banner.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-2 sm:mb-3"
            >
              {banner.title}{' '}
              <span className="text-gold-light">{banner.subtitle}</span>
            </motion.h1>

            <motion.p
              key={`desc-${banner.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-white/60 font-body font-light text-sm sm:text-base mb-5 sm:mb-6 max-w-md"
            >
              {banner.description}
            </motion.p>

            <motion.a
              href={banner.href}
              key={`cta-${banner.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="inline-flex items-center gap-2 px-7 py-3 bg-gold hover:bg-gold-dark text-white text-[11px] sm:text-xs tracking-[0.08em] uppercase font-body font-semibold rounded-lg transition-all duration-200 min-h-[48px]"
            >
              {banner.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Dot indicators */}
        <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Banner ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-400"
              style={{
                width: i === current ? 28 : 8,
                backgroundColor: i === current ? '#c9a96e' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
