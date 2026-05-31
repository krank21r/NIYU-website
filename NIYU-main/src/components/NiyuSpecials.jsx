import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import products from '../data/products'

const categories = [
  { id: 'perfume', name: 'Perfumes', tagline: 'Heritage, held in a bottle.', image: '/1 million.jpeg' },
  { id: 'attars', name: 'Attars', tagline: 'A timeless touch of tradition.', image: '/attar.jpeg', sectionId: 'attars' },
  { id: 'car-perfumes', name: 'Car Perfumes', tagline: 'Luxury scents for every journey.', image: '/Car images.jpeg', sectionId: 'car-perfumes' },
]

function ProductCard({ product, index }) {
  const { openProductDetail } = useCart()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="flex-shrink-0 w-[200px] sm:w-[220px] snap-start"
    >
      <div className="card flex flex-col h-full cursor-pointer overflow-hidden" onClick={() => openProductDetail(product)}>
        <div className="relative flex justify-center items-center pt-5 pb-2 min-h-[170px] bg-surface-soft">
          {product.tag && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-gold text-white text-[9px] tracking-[0.1em] uppercase font-body font-medium rounded-md">{product.tag}</span>
          )}
          <img src={product.image} alt={product.name} loading="lazy" className="h-32 w-auto object-contain" />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h4 className="text-sm font-heading text-ink mb-1">{product.name}</h4>
          <p className="text-[11px] font-body text-ink-muted line-clamp-2 mb-2">{product.description}</p>
          <div className="flex gap-1.5 mt-auto">
            {product.sizes.slice(0, 2).map((s) => (
              <span key={s.label} className="text-[10px] font-body text-ink-subtle bg-surface-soft px-2 py-1 rounded-md">{s.label} <span className="text-ink-soft">₹{s.price}</span></span>
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`cursor-pointer rounded-2xl overflow-hidden ${isActive ? 'ring-2 ring-gold ring-offset-2' : ''}`}
      onClick={onClick}
    >
      <div className="relative h-[160px] sm:h-[200px]">
        <img src={item.image} alt={item.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-6 sm:px-8 z-10">
          <h3 className="text-xl sm:text-2xl font-heading text-white mb-1">{item.name}</h3>
          <p className="text-sm text-white/70 font-body font-light max-w-xs">{item.tagline}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] tracking-[0.1em] uppercase font-body font-medium text-gold">
              {isActive ? 'Hide' : 'Explore'}
            </span>
            <svg className={`w-3.5 h-3.5 text-gold transition-transform ${isActive ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function NiyuSpecials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [showPerfumes, setShowPerfumes] = useState(false)
  const scrollRef = useRef(null)

  const handleCategoryClick = (cat) => {
    if (cat.id === 'perfume') setShowPerfumes(p => !p)
    else if (cat.sectionId) document.getElementById(cat.sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' })
  }

  return (
    <section id="specials" className="py-12 sm:py-16 overflow-hidden" aria-label="Categories">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <p className="text-label text-gold-dark mb-2">Shop by Category</p>
          <h2 className="heading text-2xl sm:text-3xl md:text-4xl text-ink">Explore Collections</h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          <CategoryCard item={categories[0]} index={0} isActive={showPerfumes} onClick={() => handleCategoryClick(categories[0])} />

          {showPerfumes && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-3 pt-2">
                <h3 className="text-base font-heading text-ink-soft">All Perfumes</h3>
                <div className="hidden sm:flex items-center gap-1.5">
                  <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-ink hover:text-white transition-all" aria-label="Scroll left">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-ink hover:text-white transition-all" aria-label="Scroll right">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
              <div ref={scrollRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none overscroll-contain touch-manipulation">
                {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                <div className="flex-shrink-0 w-4" aria-hidden="true" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-3">
          {categories.slice(1).map((item, i) => (
            <CategoryCard key={item.id} item={item} index={i + 1} isActive={false} onClick={() => handleCategoryClick(item)} />
          ))}
        </div>
      </div>
    </section>
  )
}
