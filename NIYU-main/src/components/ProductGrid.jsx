import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import products from '../data/products'

const allProducts = [...products]

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
]

function StarRating({ rating = 5, count = 128 }) {
  return (
    <div className="star-rating" role="img" aria-label={`${rating} out of 5 stars, ${count} reviews`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`star ${s <= rating ? 'star-filled' : 'star-empty'}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
      <span className="rating-count">({count})</span>
    </div>
  )
}

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const { addToCart, openProductDetail } = useCart()
  const { toggleWishlist, isWished } = useWishlist()
  const wished = isWished(product.id)

  const lowestPrice = Math.min(...product.sizes.map(s => s.price))
  const highestPrice = Math.max(...product.sizes.map(s => s.price))
  const displayPrice = lowestPrice
  const discount = Math.round(((highestPrice - lowestPrice) / highestPrice) * 100)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart({
      name: product.name,
      image: product.image,
      description: product.description,
      size: product.sizes[1]?.label || product.sizes[0].label,
      price: product.sizes[1]?.price || product.sizes[0].price,
      qty: 1,
    })
  }

  const tagClass = product.tag?.toLowerCase().includes('best') ? 'badge-bestseller'
    : product.tag?.toLowerCase().includes('new') ? 'badge-new'
    : product.tag?.toLowerCase().includes('trend') ? 'badge-hot'
    : 'badge-sale'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: [0.23, 1, 0.32, 1] }}
      className="card overflow-hidden group cursor-pointer flex flex-col"
      onClick={() => openProductDetail(product)}
      role="article"
      aria-label={`${product.name} perfume`}
    >
      <div className="relative aspect-square bg-surface-soft overflow-hidden">
        {product.tag && (
          <span className={`badge ${tagClass} absolute top-2 left-2 z-10`}>
            {product.tag}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
          className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-black/5 hover:bg-white transition-colors"
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg className={`w-4 h-4 transition-colors ${wished ? 'text-red-500' : 'text-ink-subtle'}`} fill={wished ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <img
          src={product.image}
          alt={`${product.name} perfume bottle`}
          loading="lazy"
          width="300"
          height="300"
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-heading text-ink leading-tight mb-1 group-hover:text-gold-dark transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="mb-2">
          <StarRating rating={5} count={Math.floor((product.id * 37) % 200 + 50)} />
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="price-sale">₹{displayPrice}</span>
          {discount > 0 && (
            <>
              <span className="price-mrp">₹{highestPrice}</span>
              <span className="price-discount">{discount}% off</span>
            </>
          )}
        </div>
        <p className="text-[11px] font-body text-ink-muted line-clamp-1 mb-3">{product.description}</p>
        <div className="mt-auto space-y-1.5">
          <button onClick={handleAddToCart} className="btn-add-to-cart" aria-label={`Add ${product.name} to cart`}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductGrid({ title = 'All Products', productsToShow = allProducts }) {
  const [sortBy, setSortBy] = useState('featured')
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-60px' })

  const sorted = [...productsToShow].sort((a, b) => {
    if (sortBy === 'price-asc') return Math.min(...a.sizes.map(s => s.price)) - Math.min(...b.sizes.map(s => s.price))
    if (sortBy === 'price-desc') return Math.min(...b.sizes.map(s => s.price)) - Math.min(...a.sizes.map(s => s.price))
    return 0
  })

  return (
    <section id="trending" className="py-6 sm:py-8 bg-surface" aria-label={title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with sort */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-4 sm:mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="heading text-2xl sm:text-3xl text-ink">{title}</h2>
              <p className="text-sm font-body text-ink-muted mt-1">Showing 1-{sorted.length} of {sorted.length} results</p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-black/10 rounded-lg text-sm font-body text-ink-soft bg-surface focus:outline-none focus:border-gold min-h-[44px] cursor-pointer"
              aria-label="Sort products"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Product grid — full width, no sidebar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
