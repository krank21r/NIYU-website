import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function OfferBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="offer" className="relative py-24 sm:py-36 px-4 sm:px-6 overflow-hidden" aria-label="Launch offer">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-cream to-ivory" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.06)_0%,transparent_60%)]" />

      {/* Decorative corner accents */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-gold/15" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-gold/15" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
          className="double-bezel"
        >
          <div className="double-bezel-inner p-10 sm:p-14 md:p-16 text-center relative overflow-hidden">
            {/* Subtle shimmer */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage: 'linear-gradient(110deg, transparent 25%, rgba(184,134,11,0.3) 50%, transparent 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer-gold 4s linear infinite',
              }}
            />

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/8 border border-gold/15 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-gold-dark font-body font-medium mb-8">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-gold"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
                />
                Limited Launch Offer
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gold-gradient mb-6"
            >
              Buy One
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="mb-6"
            >
              <span className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal">
                Get One{' '}
                <span className="gold-gradient">Free</span>
              </span>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.32, 0.72, 0, 1] }}
              className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1, ease: [0.32, 0.72, 0, 1] }}
              className="text-ink-muted font-body font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10"
            >
              Purchase any fragrance from our collection and receive a second one absolutely free. Choose your pair and experience the luxury of NIYU.
            </motion.p>

            {/* Offer highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10"
            >
              {[
                { icon: '✦', text: 'Any Product' },
                { icon: '✦', text: 'Second One Free' },
                { icon: '✦', text: 'Free Shipping' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-ink-muted font-body">
                  <span className="text-gold text-[10px]">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#collection"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.32, 0.72, 0, 1] }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-charcoal text-ivory font-body font-medium text-xs sm:text-sm tracking-[0.1em] uppercase rounded-full hover:bg-dark-brown transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group min-h-[44px]"
            >
              Shop Now
              <span className="w-7 h-7 rounded-full bg-ivory/10 flex items-center justify-center group-hover:bg-ivory/15 transition-all duration-500">
                <svg className="w-3.5 h-3.5 text-ivory group-hover:translate-x-0.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
