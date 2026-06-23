import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import products from '../data/products'
import RevealUp from './RevealUp'

const categories = [
  {
    id: 'perfume',
    name: 'Perfume',
    tagline: 'Connoisseurs of perfumery — heritage, held in a bottle.',
    image: '/category-perfume.webp',
  },
  {
    id: 'attars',
    name: 'Attars',
    tagline: 'Rich fragrant oils — a timeless touch of tradition.',
    image: '/category-attar.webp',
  },
  {
    id: 'car-perfumes',
    name: 'NIYU Aero Drive',
    tagline: 'Luxury scents for every journey.',
    image: '/category-car.webp',
  },
]

export default function Categories() {
  const navigate = useNavigate()
  const { openProductDetail } = useCart()
  const [expanded, setExpanded] = useState(null)

  const handleCategoryClick = (cat) => {
    if (cat.id === 'attars') {
      navigate('/')
      setTimeout(() => document.getElementById('attars')?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else if (cat.id === 'car-perfumes') {
      navigate('/')
      setTimeout(() => document.getElementById('car-perfumes')?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      setExpanded(expanded === cat.id ? null : cat.id)
    }
  }

  return (
    <section id="specials" className="bg-surface-secondary py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealUp>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-body">
              Browse by Category
            </span>
            <span className="block h-[1px] bg-accent/40 flex-1 max-w-[80px]" />
          </div>
          <h2 className="font-heading font-black text-[clamp(2rem,6vw,4.5rem)] leading-[0.85] tracking-[-0.03em] text-text-primary mb-16 md:mb-20">
            Categories
          </h2>
        </RevealUp>

        <div className="flex flex-col gap-6">
          {categories.map((cat, i) => (
            <RevealUp key={cat.id} delay={i * 100}>
              <div>
                {/* Category card */}
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className="group w-full text-left relative overflow-hidden h-[200px] sm:h-[260px] rounded-[24px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <img
                    src={cat.image}
                    alt={`NIYU ${cat.name} collection`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    style={{transitionTimingFunction: 'var(--ease-premium)'}}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/80 group-hover:via-black/50" />
                  <div className="relative h-full flex flex-col justify-center px-8 sm:px-12 z-10">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300" style={{transitionTimingFunction: 'var(--ease-premium)'}}>
                      {cat.name}
                    </h3>
                    <p className="text-sm sm:text-base font-body font-light text-white/80 max-w-xs leading-relaxed">
                      {cat.tagline}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-[11px] tracking-[0.1em] uppercase font-body font-medium text-accent-light transition-colors duration-300">
                        {cat.id === 'perfume'
                          ? (expanded === cat.id ? 'Hide Collection' : 'Discover the Collection')
                          : (cat.id === 'attars' ? 'View Attars' : 'Browse Collection')}
                      </span>
                      <svg
                        className={`w-4 h-4 text-accent-light transition-transform duration-300 ${expanded === cat.id ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="w-8 h-[1px] bg-accent-light mt-4 group-hover:w-16 transition-all duration-500" style={{transitionTimingFunction: 'var(--ease-premium)'}} />
                  </div>

                  {/* Expand/collapse arrow indicator */}
                  {expanded === cat.id && (
                    <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Expanded product collection for Perfume */}
                {expanded === cat.id && (
                  <div className="mt-6 animate-fadeIn">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                      {products
                        .filter(p => p.type === cat.id)
                        .map((product, pi) => (
                        <button
                          key={product.id}
                          onClick={() => openProductDetail(product)}
                          className="group text-left bg-surface rounded-[16px] p-4 hover:bg-accent/5 transition-all duration-400 active:scale-[0.98]"
                          style={{transitionTimingFunction: 'var(--ease-premium)'}}
                        >
                          <div className="aspect-square bg-surface-secondary rounded-[12px] flex items-center justify-center p-3 mb-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain grayscale-hover"
                              loading="lazy"
                            />
                          </div>
                          <div className="w-5 h-[1px] bg-accent mb-2 transition-all duration-400 group-hover:w-8" style={{transitionTimingFunction: 'var(--ease-premium)'}} />
                          <h4 className="font-heading font-bold text-sm text-text-primary mb-1 leading-tight">
                            {product.name}
                          </h4>
                          <p className="text-[11px] font-body text-text-tertiary line-clamp-1">
                            {product.sizes[0]?.label} &#8377;{product.sizes[0]?.price}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </section>
  )
}
