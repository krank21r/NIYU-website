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
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
      animate={isInView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="group border border-ink/5 bg-cream hover:border-ink/10 transition-all duration-200 cursor-default active:scale-[0.98]"
    >
      <div className="overflow-hidden relative">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
          <img
            src={product.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative p-10 md:p-14 text-center">
          <div className="mb-6 w-24 h-24 mx-auto rounded-full overflow-hidden border border-ink/10">
            <img
              src={product.image}
              alt={`${product.title} by NIYU Perfumes`}
              loading="lazy"
              width="200"
              height="200"
              className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            />
          </div>

          <h3 className="text-2xl md:text-3xl font-heading text-ink-soft mb-4">
            {product.title}
          </h3>

          <div className="w-8 h-[1px] bg-gold mx-auto mb-4" />

          <p className="text-ink-muted font-body font-light leading-relaxed text-sm md:text-base max-w-sm mx-auto">
            {product.description}
          </p>

          <div className="mt-6 w-10 h-[1px] bg-ink/30 group-hover:w-full group-hover:bg-gold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] mx-auto" />
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductCollection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="collection" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden" aria-label="Product collections">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={isInView ? { clipPath: 'inset(0 0 0 0%)' } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="section-divider origin-center"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ink mb-4">
            Explore Our Collections
          </h2>
          <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
            Every collection tells a story — find yours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.title} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
