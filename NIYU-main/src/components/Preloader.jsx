import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf
    let start = performance.now()
    const duration = 1500

    function tick(now) {
      const elapsed = now - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setLoading(false), 300)
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-surface"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-5xl md:text-6xl font-heading font-bold text-ink tracking-[0.25em] mb-2">NIYU</div>
            <div className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-ink-subtle font-body mb-8">Pure Oils. Pure Luxury.</div>
          </motion.div>

          <div className="relative w-40 h-[2px] bg-surface-muted rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <p className="mt-3 text-[10px] tracking-[0.15em] text-ink-subtle/40 font-body">{Math.round(progress * 100)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
