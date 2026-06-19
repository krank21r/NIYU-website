import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import products from '../data/products'

const categories = [
  {
    id: 'perfume',
    name: 'Perfume',
    tagline: 'Connoisseurs of perfumery \u2014 heritage, held in a bottle.',
    image: '/category-perfume.webp',
  },
  {
    id: 'attars',
    name: 'Attars',
    tagline: 'Rich fragrant oils \u2014 a timeless touch of tradition.',
    image: '/category-attar.webp',
    sectionId: 'attars',
  },
  {
    id: 'car-perfumes',
    name: 'Car Perfumes',
    tagline: 'Luxury scents for every journey.',
    image: '/category-car.webp',
    sectionId: 'car-perfumes',
  },
]

function ProductCard({ product, index }) {
  const { openProductDetail } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      className="flex-shrink-0 w-[220px] sm:w-[240px] snap-start"
    >
      <div
        className="group card-luxury flex flex-col h-full cursor-pointer active:scale-[0.97] transition-transform duration-150"
        onClick={() => openProductDetail(product)}
      >
        <div className="relative flex justify-center items-center py-6 min-h-[200px]">
          {product.tag && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-gold text-white text-[11px] tracking-[0.12em] uppercase font-body font-medium">
              {product.tag}
            </span>
          )}
          <img
            src={product.image}
            alt={`${product.name} perfume`}
            loading="lazy"
            className="h-40 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 ease-[var(--ease-out)] group-hover:scale-105 group-hover:drop-shadow-[0_12px_32px_rgba(201,169,110,0.25)]"
          />
        </div>
        <div className="p-5 mt-auto">
          <div className="w-6 h-[1px] bg-ink/25 group-hover:w-12 transition-all duration-500 ease-[var(--ease-out)] mb-3" />
          <h4 className="text-base font-heading text-ink-soft group-hover:text-ink transition-colors duration-300 mb-1">
            {product.name}
          </h4>
          <p className="text-[11px] font-body font-light text-ink-subtle line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex gap-2">
            {product.sizes.map((s) => (
              <span key={s.label} className="text-[11px] font-body text-ink-subtle">
                {s.label} <span className="text-ink-soft">&#8377;{s.price}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CategoryCard({ item, index, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className={`group cursor-pointer active:scale-[0.97] transition-transform duration-150 ${isActive ? 'ring-2 ring-gold ring-offset-2 ring-offset-white' : ''}`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-[200px] sm:h-[240px]">
        <img
          src={item.image}
          alt={`NIYU ${item.name} collection`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/80 group-hover:via-black/50" />
        <div className="relative h-full flex flex-col justify-center px-8 sm:px-12 z-10">
          <h3 className="text-2xl sm:text-3xl font-heading text-white mb-2 group-hover:translate-x-1 transition-transform duration-300 ease-[var(--ease-out)]">
            {item.name}
          </h3>
          <p className="text-sm sm:text-base font-body font-light text-white/80 max-w-xs leading-relaxed group-hover:text-white/90 transition-colors duration-300">
            {item.tagline}
          </p>
          {item.id === 'perfume' ? (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[11px] tracking-[0.1em] uppercase font-body font-medium text-gold group-hover:text-gold-light transition-colors duration-300">
                {isActive ? 'Hide Collection' : 'Discover the Collection'}
              </span>
              <svg
                className={`w-4 h-4 text-gold transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300 ease-[var(--ease-out)]">
              <span className="text-[11px] tracking-[0.1em] uppercase font-body font-medium text-gold">
                Explore
              </span>
              <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          )}
          <div className="w-10 h-[1px] bg-gold mt-4 group-hover:w-20 transition-all duration-500 ease-[var(--ease-out)]" />
        </div>
      </div>
    </motion.div>
  )
}

export default function NiyuSpecials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showPerfumes, setShowPerfumes] = useState(false)
  const scrollRef = useRef(null)

  const handleCategoryClick = (cat) => {
    if (cat.id === 'perfume') {
      setShowPerfumes(prev => !prev)
    } else if (cat.sectionId) {
      document.getElementById(cat.sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -260 : 260,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="specials" className="relative py-16 sm:py-24 overflow-hidden" aria-label="Categories">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(28,28,28,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14"
        >
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0%)' } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="w-10 h-[1px] bg-gold mb-6 origin-left"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ink">
            Categories
          </h2>
        </motion.div>

        {/* Perfume Card + Collection */}
        <div className="flex flex-col gap-4">
          <CategoryCard
            item={categories[0]}
            index={0}
            isActive={showPerfumes}
            onClick={() => handleCategoryClick(categories[0])}
          />

          {showPerfumes && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg sm:text-xl font-heading text-ink-soft">All Perfumes</h3>
                  <div className="w-8 h-[1px] bg-gold" />
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => scroll('left')}
                    className="w-10 h-10 border border-ink/8 bg-white/60 flex items-center justify-center hover:border-ink/20 hover:bg-ink/5 transition-all duration-200 group active:scale-[0.97]"
                    aria-label="Scroll left"
                  >
                    <svg className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="w-10 h-10 border border-ink/8 bg-white/60 flex items-center justify-center hover:border-ink/20 hover:bg-ink/5 transition-all duration-200 group active:scale-[0.97]"
                    aria-label="Scroll right"
                  >
                    <svg className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none overscroll-contain touch-manipulation"
              >
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
                <div className="flex-shrink-0 w-4" aria-hidden="true" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Attars & Car Perfumes Cards */}
        <div className="flex flex-col gap-5 mt-6">
          {categories.slice(1).map((item, i) => (
            <CategoryCard
              key={item.id}
              item={item}
              index={i + 1}
              isActive={false}
              onClick={() => handleCategoryClick(item)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
