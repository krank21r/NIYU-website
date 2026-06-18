import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import products from '../data/products'
import attars from '../data/attars'
import carPerfumes from '../data/carPerfumes'

const ease = [0.23, 1, 0.32, 1]

const allItems = [
  ...products.map(p => ({ ...p, type: 'perfume' })),
  ...attars.map(a => ({ ...a, type: 'attar' })),
  ...carPerfumes.map(c => ({ ...c, type: 'car-perfume' })),
]

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const { openProductDetail } = useCart()

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allItems.filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.notes && item.notes.some(n => n.toLowerCase().includes(q))) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.fragrance && item.fragrance.toLowerCase().includes(q)) ||
      (item.bestFor && item.bestFor.toLowerCase().includes(q))
    )
  }, [query])

  const handleSelect = (item) => {
    onClose()
    if (item.type === 'perfume') {
      openProductDetail(item)
    } else if (item.type === 'attar') {
      document.getElementById('attars')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      document.getElementById('car-perfumes')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.05, ease }}
            className="w-full max-w-2xl mx-auto px-6 pt-24 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="relative">
              <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search perfumes, attars, car scents..."
                className="w-full pl-8 pr-12 py-4 bg-transparent border-b-2 border-ink/10 focus:border-gold text-xl sm:text-2xl font-heading text-charcoal placeholder:text-ink-muted/50 outline-none transition-colors duration-300"
              />
              <button
                onClick={onClose}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-ink-muted hover:text-charcoal transition-colors"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Results */}
            <div className="mt-6 max-h-[60vh] overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-12 h-12 mx-auto mb-4 border border-ink/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-ink-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <p className="text-ink-muted text-sm font-body">No results found for "{query}"</p>
                  <p className="text-ink-muted/50 text-xs font-body mt-1">Try a different keyword or browse our collections</p>
                </motion.div>
              )}

              {results.length > 0 && (
                <div className="space-y-1">
                  {results.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.03, ease }}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-ink/[0.03] transition-colors duration-200 text-left group"
                    >
                      {item.image && (
                        <div className="w-14 h-14 flex-shrink-0 bg-cream flex items-center justify-center overflow-hidden border border-ink/5 group-hover:border-gold/30 transition-colors duration-200">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-heading text-charcoal group-hover:text-gold transition-colors duration-200 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs font-body text-ink-muted mt-0.5 truncate">
                          {item.type === 'perfume' && item.notes && `${item.notes.join(' · ')} · ₹${item.sizes?.[0]?.price || ''}`}
                          {item.type === 'attar' && `Attar · ₹${item.price || '699'}`}
                          {item.type === 'car-perfume' && `Car Perfume · ₹${item.price || '599'}`}
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-ink-muted group-hover:text-gold transition-colors duration-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              )}

              {!query.trim() && (
                <div className="text-center py-12">
                  <p className="text-ink-muted/50 text-sm font-body">Start typing to search</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {['Rose Oudh', 'Musk', 'Oudh'].map(suggestion => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className="px-3 py-1.5 text-xs font-body text-ink-muted border border-ink/10 hover:border-gold/40 hover:text-gold transition-all duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-3 text-[11px] text-ink-muted/40 font-body">
                    <span className="px-1.5 py-0.5 border border-ink/10 font-mono text-[10px]">ESC</span>
                    <span>to close</span>
                    <span className="mx-1">·</span>
                    <span className="px-1.5 py-0.5 border border-ink/10 font-mono text-[10px]">↵</span>
                    <span>to select</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
