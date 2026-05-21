import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const images = [
  { id: 1, span: 'md:row-span-2', label: 'Rose Oudh', color: 'from-rose-900/40', src: '/Rose oudh.jpeg' },
  { id: 2, span: '', label: 'Premium Collection', color: 'from-amber-900/40', src: '/1 million.jpeg' },
  { id: 3, span: '', label: 'Attars', color: 'from-gold/30', src: '/oudh.jpeg' },
  { id: 4, span: 'md:row-span-2', label: 'Gift Sets', color: 'from-rose-800/40', src: '/pretty women.jpeg' },
  { id: 5, span: 'md:col-span-2', label: 'Signature Collection', color: 'from-amber-950/40', src: '/cherry blossom.jpeg' },
  { id: 6, span: '', label: 'Car Perfumes', color: 'from-blue-900/40', src: '/NIYU Aqua.jpeg' },
  { id: 7, span: '', label: 'Dezire', color: 'from-red-900/40', src: '/dezire.jpeg' },
]

function GalleryItem({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-sm cursor-pointer ${item.span || ''}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${item.color} via-cream/20 to-cream opacity-60 group-hover:opacity-40 transition-opacity duration-700 z-10`} />
      <div className="absolute inset-0 bg-gradient-to-t from-cream/80 via-transparent to-transparent z-10" />

      <div className="relative h-full min-h-[200px] md:min-h-[250px] bg-gradient-to-br from-parchment to-linen flex items-center justify-center overflow-hidden">
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          width="400"
          height="300"
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 scale-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="text-center z-20 relative">
          <p className="text-base md:text-lg font-heading text-white/90 group-hover:text-gold transition-colors duration-500 drop-shadow-lg">
            {item.label}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 border border-ink/5 group-hover:border-gold/20 transition-all duration-500 z-20" />
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="gallery" className="relative py-20 sm:py-32 px-4 sm:px-6" aria-label="Fragrance gallery">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.02)_0%,transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-divider" />
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
