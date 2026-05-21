import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const products = [
  {
    title: 'Premium Perfumes',
    description:
      'Experience luxury in every spray with rich fragrance notes and long-lasting freshness designed to leave a lasting impression.',
    image: '/images/bottle-1million.svg',
    gradient: 'from-amber-900/30 via-gold/5 to-transparent',
    icon: (
      <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Attars',
    description:
      'Traditional alcohol-free attars blended with modern elegance for a deep and soothing fragrance experience.',
    image: '/images/bottle-oudh.svg',
    gradient: 'from-amber-950/30 via-gold/5 to-transparent',
    icon: (
      <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: 'Car Perfumes',
    description:
      'Transform every drive into a refreshing journey with luxurious fragrances that eliminate unwanted odors.',
    image: '/images/bottle-aqua.svg',
    gradient: 'from-gold/10 via-gold/5 to-transparent',
    icon: (
      <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Gift Sets',
    description:
      'Beautifully curated fragrance collections designed for special occasions and unforgettable gifting.',
    image: '/images/gallery-bottles.svg',
    gradient: 'from-rose-900/20 via-gold/5 to-transparent',
    icon: (
      <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-sm cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />

      <div className="relative p-10 md:p-14 flex flex-col items-start min-h-[360px] border border-ink/5 group-hover:border-gold/20 transition-all duration-500">
        <div className="absolute top-6 right-6 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
          <img
            src={product.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mb-8 p-4 bg-gold/5 rounded-full group-hover:bg-gold/10 transition-colors duration-500">
          {product.icon}
        </div>

        <h3 className="text-2xl md:text-3xl font-heading text-ink-soft mb-4 group-hover:text-gold transition-colors duration-500">
          {product.title}
        </h3>

        <p className="text-ink-muted font-body font-light leading-relaxed text-sm md:text-base max-w-sm">
          {product.description}
        </p>

        <div className="mt-auto pt-8">
          <div className="w-12 h-[1px] bg-gold/30 group-hover:w-24 transition-all duration-700" />
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductCollection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="collection" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(184,134,11,0.03)_0%,transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="section-divider" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gold-gradient mb-4">
            Our Collection
          </h2>
          <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
            Discover the world of NIYU
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.title} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
