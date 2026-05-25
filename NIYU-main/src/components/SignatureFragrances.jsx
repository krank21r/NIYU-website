import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import { getSignatureProducts } from '../data/products'

const fragrances = getSignatureProducts()

function FragranceCard({ fragrance, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { openProductModal } = useCart()

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
      className="group border border-ink/5 bg-cream hover:border-ink/10 transition-all duration-500 cursor-pointer"
    >
      <div className="p-6 min-h-[460px] flex flex-col justify-between">
        {/* Product Image */}
        <div className="flex justify-center items-center mb-4 flex-1">
          <img
            src={fragrance.image}
            alt={`${fragrance.name} perfume bottle`}
            loading="lazy"
            width="200"
            height="280"
            className="h-44 md:h-52 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div>
          <div className="w-8 h-[1px] bg-ink/30 group-hover:w-16 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] mb-4" />
          <h3 className="text-xl md:text-2xl font-heading text-ink-soft group-hover:text-ink transition-colors duration-700 mb-2">
            {fragrance.name}
          </h3>
          <p className="text-ink-subtle font-body font-light text-xs leading-relaxed group-hover:text-ink-muted transition-colors duration-700 mb-4">
            {fragrance.description}
          </p>

          {/* Pricing */}
          <div className="flex items-center gap-3 pt-3 border-t border-ink/5 mb-4">
            {fragrance.sizes.map((s) => (
              <div key={s.label} className="text-center flex-1">
                <p className="text-[11px] tracking-[0.12em] uppercase text-ink-subtle font-body mb-0.5">{s.label}</p>
                <p className="text-sm font-body font-semibold text-ink-soft">
                  <span className="text-[11px] text-ink-subtle font-normal mr-0.5">&#8377;</span>{s.price}
                </p>
              </div>
            ))}
          </div>

          {/* Buy Now */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              openProductModal(fragrance)
            }}
            className="w-full py-3 bg-ink/10 hover:bg-ink text-ink hover:text-white text-[11px] tracking-[0.1em] uppercase font-body font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[44px]"
            aria-label={`Buy ${fragrance.name}`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function SignatureFragrances() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="signature" className="relative py-24 sm:py-36 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(28,28,28,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(122,93,62,0.03)_0%,transparent_50%)]" />

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
            Signature Fragrances
          </h2>
          <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
            Each scent tells a story
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {fragrances.map((fragrance, i) => (
            <FragranceCard key={fragrance.name} fragrance={fragrance} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
