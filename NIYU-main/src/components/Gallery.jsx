import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const images = [
  { id: 1, span: 'md:row-span-2', label: 'Rose Oudh', src: '/Rose oudh.jpeg' },
  { id: 2, span: '', label: 'Premium Collection', src: '/1 million.jpeg' },
  { id: 3, span: '', label: 'Attars', src: '/oudh.jpeg' },
  { id: 4, span: 'md:row-span-2', label: 'Gift Sets', src: '/pretty women.jpeg' },
  { id: 5, span: 'md:col-span-2', label: 'Signature Collection', src: '/cherry blossom.jpeg' },
  { id: 6, span: '', label: 'Car Perfumes', src: '/NIYU Aqua.jpeg' },
  { id: 7, span: '', label: 'Dezire', src: '/dezire.jpeg' },
]

function GalleryItem({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
      animate={isInView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative overflow-hidden cursor-pointer ${item.span || ''}`}
    >
      <div className="relative h-full min-h-[200px] md:min-h-[250px] bg-gradient-to-br from-parchment to-linen flex items-center justify-center overflow-hidden">
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          width="400"
          height="300"
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 scale-100 group-hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
        <div className="absolute inset-0 border border-white/5 group-hover:border-ink/15 transition-all duration-300" />
        <div className="text-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
          <p className="text-sm font-body text-white tracking-wider uppercase">{item.label}</p>
          <div className="w-8 h-[1px] bg-gold-light mx-auto mt-3" />
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="gallery" className="relative py-16 sm:py-24 overflow-hidden" aria-label="Product gallery">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={isInView ? { clipPath: 'inset(0 0 0 0%)' } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="section-divider origin-center"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ink mb-4">
            The NIYU Gallery
          </h2>
          <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
            A visual journey through our collection
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
