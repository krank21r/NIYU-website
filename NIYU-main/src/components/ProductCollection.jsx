import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const products = [
  {
    title: 'Premium Perfumes',
    description:
      'Experience luxury in every spray with our premium perfume collection. Crafted with rich fragrance notes and long-lasting freshness, Niyu Premium Perfumes are designed to leave a lasting impression wherever you go.',
    image: '/1 million.jpeg',
    gradient: 'from-amber-900/30 via-gold/5 to-transparent',
  },
  {
    title: 'Attars',
    description:
      'Discover the timeless beauty of traditional attars blended with modern elegance. Our alcohol-free attars offer deep, soothing aromas perfect for everyday wear and special occasions.',
    image: '/oudh.jpeg',
    gradient: 'from-amber-950/30 via-gold/5 to-transparent',
  },
  {
    title: 'Car Perfumes',
    description:
      'Turn every drive into a refreshing journey with Niyu Car Perfumes. Designed to eliminate unwanted odors and fill your car with luxurious fragrance that lasts for days.',
    image: '/NIYU Aqua.jpeg',
    gradient: 'from-gold/10 via-gold/5 to-transparent',
  },
  {
    title: 'Gift Sets',
    description:
      'Celebrate special moments with beautifully curated Niyu Gift Sets. A perfect combination of luxury, fragrance, and elegance for your loved ones on every occasion.',
    image: '/pretty women.jpeg',
    gradient: 'from-rose-900/20 via-gold/5 to-transparent',
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

      <div className="relative p-6 sm:p-8 md:p-10 flex flex-col min-h-[280px] sm:min-h-[320px] md:min-h-[360px] border border-ink/5 group-hover:border-gold/20 transition-all duration-500">
        {/* Background image */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
          <img
            src={product.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1218] via-[#0E1218]/80 to-transparent" />

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-heading text-ink-soft mb-3 sm:mb-4 group-hover:text-gold transition-colors duration-500">
            {product.title}
          </h3>

          <p className="text-ink-muted font-body font-light leading-relaxed text-xs sm:text-sm md:text-base max-w-sm">
            {product.description}
          </p>

          <div className="mt-auto pt-6 sm:pt-8">
            <div className="w-10 sm:w-12 h-[1px] bg-gold/30 group-hover:w-20 sm:group-hover:w-24 transition-all duration-700" />
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
    <section id="collection" className="relative py-20 sm:py-32 px-4 sm:px-6">
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
