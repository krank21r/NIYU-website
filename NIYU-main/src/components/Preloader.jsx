import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf
    let start = performance.now()
    const duration = 1800

    function tick(now) {
      const elapsed = now - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased)

      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setLoading(false), 400)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black-soft"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-5xl md:text-6xl font-heading font-bold gold-gradient tracking-[0.3em] mb-3">
              NIYU
            </div>
            <div className="text-xs tracking-[0.4em] uppercase text-gold/60 font-body mb-10">
              Pure Oils. Pure Luxury.
            </div>
          </motion.div>

          <div className="relative w-48 h-[1px] bg-ink/5 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dark via-gold to-gold-dark"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                transform: `translateX(${progress * 100}%)`,
                transition: 'transform 0.1s linear',
              }}
            />
          </div>

          <motion.p
            className="mt-4 text-[10px] tracking-[0.2em] text-ink-subtle/40 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress * 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
