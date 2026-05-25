import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const products = [
  {
    title: 'Premium Perfumes',
    description:
      'Experience luxury in every spray with our premium perfume collection. Crafted with rich fragrance notes and long-lasting freshness.',
    image: '/1 million.jpeg',
  },
  {
    title: 'Attars',
    description:
      'Discover the timeless beauty of traditional attars blended with modern elegance. Our alcohol-free attars offer deep, soothing aromas.',
    image: '/oudh.jpeg',
  },
  {
    title: 'Car Perfumes',
    description:
      'Turn every drive into a refreshing journey with Niyu Car Perfumes. Designed to fill your car with luxurious fragrance.',
    image: '/NIYU Aqua.jpeg',
  },
  {
    title: 'Gift Sets',
    description:
      'Celebrate special moments with beautifully curated Niyu Gift Sets. A perfect combination of luxury, fragrance, and elegance.',
    image: '/pretty women.jpeg',
  },
]

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.32, 0.72, 0, 1] }}
      className="group border border-ink/5 bg-cream hover:border-ink/10 transition-all duration-500 cursor-pointer"
    >
      <div className="overflow-hidden relative">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <img
            src={product.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-transparent" />

        <div className="relative p-8 sm:p-10 md:p-12 flex flex-col min-h-[300px] sm:min-h-[340px]">
          <div className="w-10 h-[1px] bg-ink/40 mb-6 group-hover:w-20 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]" />

          <h3 className="text-2xl sm:text-3xl font-heading text-ink-soft mb-3 group-hover:text-ink transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
            {product.title}
          </h3>

          <p className="text-ink-muted font-body font-light leading-relaxed text-sm md:text-base max-w-sm">
            {product.description}
          </p>

          <div className="mt-auto pt-8">
            <div className="w-8 h-8 rounded-full bg-ink/8 group-hover:bg-ink/8 flex items-center justify-center transition-all duration-700">
              <svg className="w-4 h-4 text-ink group-hover:translate-x-0.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductCollection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="collection" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(28,28,28,0.03)_0%,transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="section-divider origin-center"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ink mb-4">
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
