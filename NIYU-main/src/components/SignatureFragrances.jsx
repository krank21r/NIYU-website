import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fragrances = [
  {
    name: 'Rose Oudh',
    description: 'A romantic symphony of velvety roses entwined with the depth of oudh, leaving behind warmth and mystery.',
    image: '/images/bottle-rose-oudh.svg',
    gradient: 'from-rose-900/30 via-purple-900/20 to-transparent',
  },
  {
    name: 'Dezire',
    description: 'An ode to passion and longing with tender yet powerful notes that celebrate desire.',
    image: '/images/bottle-dezire.svg',
    gradient: 'from-red-900/30 via-gold/10 to-transparent',
  },
  {
    name: 'Oudh',
    description: 'Rich, smoky, and enchanting — the pure essence of luxury and timeless heritage.',
    image: '/images/bottle-oudh.svg',
    gradient: 'from-amber-950/40 via-amber-900/20 to-transparent',
  },
  {
    name: '1 Million',
    description: 'A bold declaration of confidence filled with radiant energy and golden allure.',
    image: '/images/bottle-1million.svg',
    gradient: 'from-gold/20 via-amber-800/20 to-transparent',
  },
  {
    name: 'Musk',
    description: 'Soft, earthy, sensual, and comforting with an intimate lingering aroma.',
    image: '/images/bottle-musk.svg',
    gradient: 'from-stone-700/30 via-linen/10 to-transparent',
  },
  {
    name: 'Cherry Blossom',
    description: 'A delicate spring-inspired fragrance celebrating renewal, joy, and serenity.',
    image: '/images/bottle-cherry.svg',
    gradient: 'from-pink-800/30 via-rose-900/20 to-transparent',
  },
  {
    name: 'Aqua',
    description: 'Fresh, crisp, and invigorating like the spirit of the ocean bottled with elegance.',
    image: '/images/bottle-aqua.svg',
    gradient: 'from-blue-900/30 via-cyan-900/20 to-transparent',
  },
  {
    name: 'Creed',
    description: 'A majestic fragrance of strength, refinement, and timeless legacy.',
    image: '/images/bottle-creed.svg',
    gradient: 'from-emerald-900/30 via-teal-900/20 to-transparent',
  },
]

function FragranceCard({ fragrance, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-sm cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${fragrance.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700`} />
      <div className="absolute inset-0 bg-gradient-to-t from-cream/80 via-cream/20 to-transparent" />

      <div className="relative p-6 min-h-[340px] flex flex-col justify-between border border-ink/5 group-hover:border-gold/20 transition-all duration-500">
        <div className="flex justify-center mb-4">
          <img
            src={fragrance.image}
            alt={`${fragrance.name} perfume bottle`}
            className="h-40 w-auto object-contain opacity-60 group-hover:opacity-90 transition-opacity duration-700 drop-shadow-[0_0_30px_rgba(184,134,11,0.15)]"
          />
        </div>
        <div>
          <div className="mb-3" aria-hidden="true">
            <div className="w-8 h-[1px] bg-gold/40 group-hover:w-16 transition-all duration-700 mb-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-heading text-ink-soft group-hover:text-gold transition-colors duration-500 mb-3">
            {fragrance.name}
          </h3>
          <p className="text-ink-subtle font-body font-light text-sm leading-relaxed group-hover:text-ink-muted transition-colors duration-500">
            {fragrance.description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export default function SignatureFragrances() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="fragrances" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,134,11,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(122,93,62,0.03)_0%,transparent_50%)]" />

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
            Signature Fragrances
          </h2>
          <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
            Each scent tells a story
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {fragrances.map((fragrance, i) => (
            <FragranceCard key={fragrance.name} fragrance={fragrance} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
