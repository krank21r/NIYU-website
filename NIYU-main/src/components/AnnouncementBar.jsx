import { motion } from 'framer-motion'

export default function AnnouncementBar() {
  const text = "LAUNCH OFFER — Buy One Get One Free"
  const repeats = 4

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] bg-charcoal overflow-hidden h-9 flex items-center" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <motion.div
        className="flex items-center whitespace-nowrap gap-8"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        {Array.from({ length: repeats }, (_, i) => (
          <span key={i} className="flex items-center gap-8 text-[11px] sm:text-xs tracking-[0.15em] uppercase font-body text-ivory/80">
            <span>{text}</span>
            <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
