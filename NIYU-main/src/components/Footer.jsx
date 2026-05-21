import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative py-16 px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B0F] to-[#0a0f1e]" />
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-4 tracking-[0.3em]">
            NIYU
          </div>
          <div className="w-12 h-[1px] bg-gold/30 mx-auto my-6" aria-hidden="true" />
          <p className="text-sm md:text-base text-white/70 font-elegant italic max-w-lg mx-auto leading-relaxed mb-8">
            NIYU Perfumes — Crafted for Presence. Designed for Memory.
          </p>
          <div className="flex justify-center gap-4 mb-8" aria-hidden="true">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-gold/50"
              />
            ))}
          </div>
          <p className="text-xs text-white/50 font-body font-light tracking-wider">
            &copy; {new Date().getFullYear()} NIYU Perfumes. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
