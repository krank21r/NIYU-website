import { motion } from 'framer-motion'

export default function AnnouncementBar() {
  const text = "LAUNCH OFFER — Buy One Get One Free"
  const repeats = 4

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] bg-ink overflow-hidden flex items-center" style={{ height: 'calc(2.25rem + env(safe-area-inset-top, 0px))', paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <motion.div
        className="flex items-center whitespace-nowrap gap-8"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: repeats }, (_, i) => (
          <span key={i} className="flex items-center gap-8 text-[11px] sm:text-xs tracking-[0.12em] uppercase font-body text-white/70">
            <span>{text}</span>
            <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
