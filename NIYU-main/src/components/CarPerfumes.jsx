import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import carPerfumes from '../data/carPerfumes'

function CarItem({ item, index }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart({ ...item, size: null, qty: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      className="group py-3.5 border-b border-ink/5 last:border-b-0 flex items-center justify-between gap-3 hover:bg-ink/[0.02] transition-colors duration-300 -mx-4 px-4"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-xs text-ink font-body tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-base sm:text-lg font-heading text-ink-soft group-hover:text-ink transition-colors duration-300 truncate">
          {item.name}
        </h3>
        <div className="h-[1px] flex-1 mx-2 bg-ink/5 group-hover:bg-ink/20 transition-colors duration-500 hidden sm:block" />
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm font-body font-semibold text-ink">&#8377;{item.price}</span>
        <button
          onClick={handleAdd}
          className={`text-[11px] tracking-[0.08em] uppercase font-body font-medium px-3 py-1.5 transition-all duration-300 min-h-[32px] active:scale-[0.97] whitespace-nowrap ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-ink/8 border border-ink/15 text-ink-soft hover:bg-ink hover:text-cream'
          }`}
        >
          {added ? '✓ Added' : 'Add'}
        </button>
      </div>
    </motion.div>
  )
}

export default function CarPerfumes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { addToCart, setStep } = useCart()

  const handleBuyNow = () => {
    const item = carPerfumes[0]
    addToCart({ ...item, size: null, qty: 1 })
    setStep('cart')
  }

  return (
    <section id="car-perfumes" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden" aria-label="Car perfumes">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(28,28,28,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ clipPath: 'inset(0 50% 0 50%)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0%)' } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="section-divider"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ink mb-4">
            Car Perfumes
          </h2>
          <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
            Scent your journey — drive in elegance, arrive in style
          </p>
        </motion.div>

        {/* Editorial Split: Image left, list right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — Car perfume image */}
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="">
              <div className="overflow-hidden p-0.5">
                <img
                  src="/Car images.jpeg"
                  alt="NIYU car perfume — luxury car fragrance bottle on dashboard"
                  loading="lazy"
                  width="800"
                  height="1000"
                  className="w-full h-auto object-cover rounded-[calc(1.25rem-0.375rem-0.125rem)]"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 md:w-24 md:h-24 border-r border-b border-ink/15" aria-hidden="true" />
          </motion.div>

          {/* Right — Car perfume list */}
          <div className="lg:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-sm font-body text-ink-muted leading-relaxed mb-8 max-w-md"
            >
              Transform every drive into a luxurious experience. Our car perfumes are crafted with natural essential oils that eliminate odors and fill your car with a long-lasting, premium fragrance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-ink/8 border border-ink/15">
                <span className="text-xs font-body font-medium text-ink-soft tracking-wide">All Car Perfumes</span>
                <div className="w-[1px] h-4 bg-ink/25" aria-hidden="true" />
                <span className="text-sm font-body font-semibold text-ink">
                  <span className="text-[11px] font-normal mr-0.5">&#8377;</span>599
                </span>
              </div>
              <button
                onClick={handleBuyNow}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink hover:bg-ink-soft text-cream text-[11px] tracking-[0.1em] uppercase font-body font-medium transition-all duration-200 ease-[var(--ease-out)] min-h-[44px] active:scale-[0.97]"
              >
                Buy Now
              </button>
            </motion.div>

            <div>
              {carPerfumes.map((item, i) => (
                <CarItem key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
