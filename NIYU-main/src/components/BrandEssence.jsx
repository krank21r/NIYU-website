import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function BrandEssence() {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <section id="brand" ref={sectionRef} className="relative py-40 overflow-hidden" aria-label="Brand essence">
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-charcoal to-ink" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.1)_0%,rgba(122,93,62,0.04)_40%,transparent_70%)]" />
        </motion.div>
      </div>

      <motion.div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1 }}
          className="section-divider !w-24 !mb-10"
        />

        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold gold-gradient text-shadow-gold mb-8 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          NIYU Perfumes
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl font-elegant italic text-champagne/70">
            Pure Oils. Pure Luxury.
          </span>
        </motion.h2>

        <motion.div
          className="w-16 h-[1px] bg-gold/30 mx-auto my-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          aria-hidden="true"
        />

        <motion.p
          className="text-base md:text-lg text-champagne/60 font-body font-light max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Handmade with care, designed for hearts that seek beauty, and delivered with a promise of purity.
        </motion.p>

        <motion.div
          className="mt-12 flex justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          aria-hidden="true"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gold/40"
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
