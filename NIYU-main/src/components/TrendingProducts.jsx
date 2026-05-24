import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const trendingProducts = [
  {
    name: 'Rose Oudh',
    image: '/Rose oudh.jpeg',
    tag: 'Bestseller',
  },
  {
    name: '1 Million',
    image: '/1 million.jpeg',
    tag: 'Trending',
  },
  {
    name: 'Aqua',
    image: '/NIYU Aqua.jpeg',
    tag: 'Fresh Pick',
  },
  {
    name: 'Musk',
    image: '/musk.jpeg',
    tag: 'Editor\'s Choice',
  },
  {
    name: 'Cherry Blossom',
    image: '/cherry blossom.jpeg',
    tag: 'New Arrival',
  },
]

const sizes = [
  { label: '15ml', price: '499' },
  { label: '30ml', price: '899' },
  { label: '50ml', price: '1299' },
]

function TrendingCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
      className="flex-shrink-0 w-[240px] sm:w-[260px] snap-start"
    >
      <div className="double-bezel group h-full">
        <div className="double-bezel-inner p-5 flex flex-col h-full relative" style={{ zIndex: 10 }}>
          {/* Tag */}
          <span className="inline-flex self-start px-3 py-1 rounded-full bg-gold/8 border border-gold/15 text-[11px] tracking-[0.12em] uppercase text-gold-dark font-body font-medium mb-4">
            {product.tag}
          </span>

          {/* Image */}
          <div className="flex justify-center items-center flex-1 mb-4 min-h-[180px]">
            <img
              src={product.image}
              alt={`${product.name} perfume bottle`}
              loading="lazy"
              width="160"
              height="220"
              className="h-44 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] drop-shadow-[0_0_16px_rgba(184,134,11,0.06)] group-hover:scale-105 pointer-events-none"
            />
          </div>

          {/* Info */}
          <div className="mt-auto">
            <div className="w-6 h-[1px] bg-gold/25 group-hover:w-12 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] mb-3" />
            <h3 className="text-lg font-heading text-ink-soft group-hover:text-gold transition-colors duration-500 mb-3">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              {sizes.map((s) => (
                <div key={s.label} className="flex-1 text-center py-1.5 rounded-md bg-cream/60 border border-ink/5">
                  <p className="text-[10px] tracking-[0.08em] uppercase text-ink-subtle font-body">{s.label}</p>
                  <p className="text-xs font-body font-semibold text-ink-soft">
                    <span className="text-[10px] text-ink-subtle font-normal mr-px">&#8377;</span>{s.price}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/916302040779"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-white text-[11px] tracking-[0.1em] uppercase font-body font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[44px]"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Buy ${product.name} on WhatsApp`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TrendingProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -280 : 280,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="trending" className="relative py-24 sm:py-36 overflow-hidden" aria-label="Trending products">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,134,11,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with scroll arrows */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="section-divider !mx-0 !mb-6 !ml-0 origin-left"
            />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gold-gradient mb-4">
              Trending Now
            </h2>
            <p className="text-ink-subtle font-body font-light max-w-xl">
              Most loved fragrances this season
            </p>
          </div>

          {/* Scroll arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-ink/8 bg-ivory/60 flex items-center justify-center hover:border-gold/30 hover:bg-gold/5 transition-all duration-500 group"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 text-ink-muted group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-ink/8 bg-ivory/60 flex items-center justify-center hover:border-gold/30 hover:bg-gold/5 transition-all duration-500 group"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 text-ink-muted group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll row */}
      <div
        ref={scrollRef}
        className="flex gap-5 px-4 sm:px-6 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
      >
        {trendingProducts.map((product, i) => (
          <TrendingCard key={product.name} product={product} index={i} />
        ))}
        <div className="flex-shrink-0 w-4" aria-hidden="true" />
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
