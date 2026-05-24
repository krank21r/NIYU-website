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
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${item.span || ''}`}
    >
      <div className="relative h-full min-h-[200px] md:min-h-[250px] bg-gradient-to-br from-parchment to-linen flex items-center justify-center overflow-hidden">
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          width="400"
          height="300"
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 scale-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
        <div className="absolute inset-0 border border-white/5 group-hover:border-gold/15 transition-all duration-700 rounded-2xl" />
        <div className="text-center z-20 relative">
          <p className="text-base md:text-lg font-heading text-white/90 group-hover:text-gold-light transition-colors duration-700 drop-shadow-lg">
            {item.label}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="gallery" className="relative py-24 sm:py-36 px-4 sm:px-6" aria-label="Fragrance gallery">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.03)_0%,transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="section-divider origin-center"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gold-gradient mb-4">
            Gallery
          </h2>
          <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
            A glimpse into the world of NIYU
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[250px]">
          {images.map((img, i) => (
            <GalleryItem key={img.id} item={img} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
