import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function OfferBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="offer" className="relative py-24 sm:py-36 px-4 sm:px-6 overflow-hidden bg-charcoal text-white" aria-label="Launch offer">
      {/* Subtle shimmer */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer-gold 4s linear infinite',
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-3 px-5 py-2 border border-gold/20 text-label text-gold-light mb-10">
            <span className="w-1.5 h-1.5 bg-gold animate-pulse-soft" />
            Limited Launch Offer
          </span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="heading-display text-3xl md:text-4xl lg:text-5xl text-ivory mb-4"
          >
            Buy One Get One Free
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto my-10"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="text-body text-white/40 max-w-xl mx-auto mb-12"
          >
            Purchase any fragrance from our collection and receive a second one absolutely free. Choose your pair and experience the luxury of NIYU.
          </motion.p>

          {/* Offer highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10"
          >
            {['Any Product', 'Second One Free', 'Free Shipping'].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-ivory/50 font-body font-light">
                <span className="w-1 h-1 bg-gold/60" />
                {text}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            href="#collection"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gold text-charcoal font-body font-medium text-xs sm:text-sm tracking-[0.1em] uppercase hover:bg-gold-light transition-colors duration-500 group min-h-[44px]"
          >
            Shop Now
            <span className="w-7 h-7 rounded-full bg-charcoal/10 flex items-center justify-center group-hover:bg-charcoal/15 transition-all duration-500">
              <svg className="w-3.5 h-3.5 text-charcoal group-hover:translate-x-0.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
