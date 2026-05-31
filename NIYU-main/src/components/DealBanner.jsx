import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const deals = [
  { text: '🎉 Launch Offer: Extra 10% Off on all fragrances', highlight: 'Extra 10% Off' },
  { text: '🚚 Free Shipping on orders above ₹499', highlight: 'Free Shipping' },
  { text: '↩️ 7-Day Easy Returns — No questions asked', highlight: '7-Day Easy Returns' },
]

export default function DealBanner() {
  const [visible, setVisible] = useState(true)
  const [current, setCurrent] = useState(0)

  // Auto-rotate deal text every 3 seconds
  useState(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % deals.length), 3000)
    return () => clearInterval(timer)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-ink text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-9 sm:h-10">
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[11px] sm:text-xs font-body text-white/90 truncate"
                  >
                    <span className="text-gold font-semibold">{deals[current].highlight}</span>
                    <span className="hidden sm:inline"> — {deals[current].text.replace(deals[current].highlight, '').trim()}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="ml-3 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0"
                aria-label="Dismiss offer banner"
              >
                <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
