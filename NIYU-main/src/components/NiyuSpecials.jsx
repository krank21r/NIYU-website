import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const specials = [
  {
    name: 'Rose + Musk',
    tagline: 'Romance meets warmth',
    image: '/Rose oudh.jpeg',
    tag: 'Bestseller',
  },
  {
    name: 'Oudh + Tobacco',
    tagline: 'Bold & smoky elegance',
    image: '/oudh.jpeg',
    tag: 'Popular',
  },
  {
    name: 'Jasmine + Sandalwood',
    tagline: 'Floral serenity',
    image: '/dezire.jpeg',
    tag: 'New Blend',
  },
  {
    name: 'White Musk + Vanilla',
    tagline: 'Soft indulgence',
    image: '/1 million white.jpeg',
    tag: 'Editor\'s Pick',
  },
  {
    name: 'Kesar + Chandan',
    tagline: 'Royal heritage blend',
    image: '/musk.jpeg',
    tag: 'Limited',
  },
]

function SpecialCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
      className="flex-shrink-0 w-[240px] sm:w-[260px] snap-start"
    >
      <div className="double-bezel group cursor-pointer h-full">
        <div className="double-bezel-inner p-5 flex flex-col h-full">
          {/* Tag */}
          <span className="inline-flex self-start px-3 py-1 rounded-full bg-gold/8 border border-gold/15 text-[11px] tracking-[0.12em] uppercase text-gold-dark font-body font-medium mb-4">
            {item.tag}
          </span>

          {/* Image */}
          <div className="flex justify-center items-center flex-1 mb-4 min-h-[180px]">
            <img
              src={item.image}
              alt={`${item.name} NIYU perfume blend`}
              loading="lazy"
              width="160"
              height="220"
              className="h-44 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] drop-shadow-[0_0_16px_rgba(184,134,11,0.06)] group-hover:scale-105"
            />
          </div>

          {/* Info */}
          <div className="mt-auto">
            <div className="w-6 h-[1px] bg-gold/25 group-hover:w-12 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] mb-3" />
            <h3 className="text-lg font-heading text-ink-soft group-hover:text-gold transition-colors duration-500 mb-1">
              {item.name}
            </h3>
            <p className="text-xs font-body font-light text-ink-subtle">
              {item.tagline}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function NiyuSpecials() {
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
    <section id="specials" className="relative py-24 sm:py-36 overflow-hidden" aria-label="NIYU special blends">
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
              NIYU Specials
            </h2>
            <p className="text-ink-subtle font-body font-light max-w-xl">
              Curated blends, crafted to perfection
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
        className="flex gap-5 px-4 sm:px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {specials.map((item, i) => (
          <SpecialCard key={item.name} item={item} index={i} />
        ))}
        <div className="flex-shrink-0 w-4" aria-hidden="true" />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}
