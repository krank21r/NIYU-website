import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { getTrendingProducts } from '../data/products'

const trendingProducts = getTrendingProducts()

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
}

function TrendingCard({ product, index }) {
  const { openProductDetail } = useCart()
  const { toggleWishlist, isWished } = useWishlist()

  return (
    <motion.div
      variants={itemVariants}
      className="flex-shrink-0 w-[220px] sm:w-[240px] snap-start"
    >
      <motion.div
        className="card flex flex-col h-full cursor-pointer overflow-hidden group"
        onClick={() => openProductDetail(product)}
        whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
        whileTap={{ scale: 0.98 }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProductDetail(product) } }}
      >
        <div className="relative flex justify-center items-center pt-6 pb-2 min-h-[180px] bg-surface-soft overflow-hidden">
          <motion.button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full border border-black/5 z-10 hover:bg-white transition-colors"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isWished(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <motion.svg
              className={`w-4 h-4 ${isWished(product.id) ? 'text-red-500' : 'text-ink-subtle'}`}
              fill={isWished(product.id) ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              animate={isWished(product.id) ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </motion.svg>
          </motion.button>

          {product.tag && (
            <motion.span
              className="absolute top-3 left-3 px-2.5 py-1 bg-gold text-white text-[10px] tracking-[0.1em] uppercase font-body font-medium rounded-md"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {product.tag}
            </motion.span>
          )}

          <motion.img
            src={product.image}
            alt={`${product.name} perfume`}
            loading="lazy"
            className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-heading text-ink mb-2 group-hover:text-gold-dark transition-colors">{product.name}</h3>
          <div className="flex gap-1.5 mb-3">
            {product.sizes.slice(0, 3).map((s) => (
              <div key={s.label} className="flex-1 text-center py-1.5 bg-surface-soft rounded-lg">
                <p className="text-[10px] text-ink-muted font-body">{s.label}</p>
                <p className="text-xs font-heading text-ink-soft">₹{s.price}</p>
              </div>
            ))}
          </div>
          <motion.div
            className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-ink/5 text-ink text-[11px] tracking-[0.08em] uppercase font-body font-medium rounded-xl group-hover:bg-ink group-hover:text-white transition-all duration-300 min-h-[40px]"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            View Details
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function TrendingProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' })
    }
  }

  return (
    <section id="trending" className="py-12 sm:py-16 overflow-hidden" aria-label="Trending products">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <motion.p
              className="text-label text-gold-dark mb-2"
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Trending Now
            </motion.p>
            <motion.h2
              className="heading text-2xl sm:text-3xl md:text-4xl text-ink"
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Most Loved
            </motion.h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <motion.button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-ink hover:text-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-ink hover:text-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={scrollRef}
        className="flex gap-4 px-4 sm:px-6 overflow-x-auto scrollbar-none overscroll-contain touch-manipulation"
        style={{ scrollSnapType: 'x mandatory' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {trendingProducts.map((product, i) => (
          <TrendingCard key={product.name} product={product} index={i} />
        ))}
        <div className="flex-shrink-0 w-4" aria-hidden="true" />
      </motion.div>
    </section>
  )
}
