import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen h-screen overflow-hidden">
      {/* Background Image with parallax zoom */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <img
          src="/hero-bg.png"
          alt="NIYU luxury perfume background"
          width="1920"
          height="1080"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        />
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/70 via-[#0a0f1e]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 via-transparent to-[#0a0f1e]/30" />

      <motion.div
        className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-6 lg:px-12 xl:px-20 pb-6 sm:pb-10 pt-24 sm:pt-28"
        style={{ y: textY }}
      >
        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h1 className="sr-only">NIYU Perfumes — Pure Oils, Pure Luxury</h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-body max-w-xl leading-relaxed">
              And All the Energy You Need to Never Give In.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-heading font-bold text-white/90 tracking-wide">
              AQUA RUSH
            </span>
            <motion.a
              href="#collection"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#0a0f1e] font-body font-semibold text-xs sm:text-sm md:text-base tracking-wide uppercase rounded-full hover:bg-white/90 transition-colors duration-300"
            >
              FIND YOURS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative z-20"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/70 font-body font-semibold">
              NIYU
            </span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50 font-body">
              PURE OILS. PURE LUXURY.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
