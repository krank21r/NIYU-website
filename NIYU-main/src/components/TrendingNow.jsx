import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import products, { getTrendingProducts } from '../data/products'

const trendingProducts = getTrendingProducts()

function StarRating({ rating = 5 }) {
  return (
    <div className="star-rating" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`star ${s <= rating ? 'star-filled' : 'star-empty'}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  )
}

export default function TrendingNow() {
  const scrollRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const { addToCart, openProductDetail } = useCart()
  const { toggleWishlist, isWished } = useWishlist()

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', checkScroll, { passive: true })
    return () => { if (el) el.removeEventListener('scroll', checkScroll) }
  }, [])

  // Auto-scroll carousel
  useEffect(() => {
    const timer = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      const cardWidth = el.querySelector('[data-card]')?.offsetWidth || 240
      const maxScroll = el.scrollWidth - el.clientWidth
      const nextScroll = el.scrollLeft + cardWidth + 16
      if (nextScroll >= maxScroll) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
        setActiveIndex(0)
      } else {
        el.scrollTo({ left: nextScroll, behavior: 'smooth' })
        setActiveIndex(prev => Math.min(prev + 1, trendingProducts.length - 1))
      }
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const scroll = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('[data-card]')?.offsetWidth || 240
    const scrollAmount = direction === 'left' ? -(cardWidth + 16) : cardWidth + 16
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    setActiveIndex(prev => {
      const next = direction === 'left' ? prev - 1 : prev + 1
      return Math.max(0, Math.min(next, trendingProducts.length - 1))
    })
  }

  const lowestPrice = (p) => Math.min(...p.sizes.map(s => s.price))
  const highestPrice = (p) => Math.max(...p.sizes.map(s => s.price))

  return (
    <section className="py-6 sm:py-8 bg-surface-soft" aria-label="Trending products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-4 sm:mb-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-[10px] sm:text-[11px] font-body font-semibold text-red-600 tracking-[0.12em] uppercase">Trending Now</p>
            </div>
            <h2 className="heading text-2xl sm:text-3xl text-ink">Most Loved Fragrances</h2>
          </div>
          {/* Arrow buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <motion.button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-black/10 bg-surface flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-black/10 bg-surface flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Left fade gradient */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-surface-soft to-transparent z-10 pointer-events-none" />
          )}
          {/* Right fade gradient */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface-soft to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-none overscroll-contain touch-manipulation snap-x snap-mandatory"
          >
            {trendingProducts.map((product, i) => {
              const wished = isWished(product.id)
              const tagClass = product.tag?.toLowerCase().includes('best') ? 'badge-bestseller'
                : product.tag?.toLowerCase().includes('new') ? 'badge-new'
                : product.tag?.toLowerCase().includes('trend') ? 'badge-hot'
                : 'badge-sale'
              const discount = Math.round(((highestPrice(product) - lowestPrice(product)) / highestPrice(product)) * 100)

              return (
                <motion.div
                  key={product.id}
                  data-card
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="flex-shrink-0 w-[220px] sm:w-[240px] lg:w-[260px] card overflow-hidden group cursor-pointer snap-start"
                  onClick={() => openProductDetail(product)}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] bg-surface overflow-hidden">
                    {product.tag && (
                      <span className={`badge ${tagClass} absolute top-2.5 left-2.5 z-10`}>
                        {product.tag}
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
                      className="absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-black/5 hover:bg-white transition-colors"
                      aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <svg className={`w-4 h-4 ${wished ? 'text-red-500' : 'text-ink-subtle'}`} fill={wished ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                    <img
                      src={product.image}
                      alt={`${product.name} perfume bottle`}
                      loading="lazy"
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col">
                    <h3 className="text-sm font-heading text-ink leading-tight mb-1.5 group-hover:text-gold-dark transition-colors">
                      {product.name}
                    </h3>
                    <div className="mb-2">
                      <StarRating rating={5} />
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="price-sale">₹{lowestPrice(product)}</span>
                      {discount > 0 && (
                        <>
                          <span className="price-mrp">₹{highestPrice(product)}</span>
                          <span className="price-discount">{discount}% off</span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart({
                          name: product.name,
                          image: product.image,
                          description: product.description,
                          size: product.sizes[1]?.label || product.sizes[0].label,
                          price: product.sizes[1]?.price || product.sizes[0].price,
                          qty: 1,
                        })
                      }}
                      className="btn-add-to-cart mt-2"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Dot indicators — mobile */}
        <div className="flex sm:hidden justify-center gap-1.5 mt-4">
          {trendingProducts.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 24 : 6,
                backgroundColor: i === activeIndex ? '#c9a96e' : 'rgba(0,0,0,0.1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
