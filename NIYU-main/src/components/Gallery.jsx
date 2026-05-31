import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const images = [
  { id: 1, label: 'Rose Oudh', src: '/Rose oudh.jpeg' },
  { id: 2, label: 'Premium', src: '/1 million.jpeg' },
  { id: 3, label: 'Attars', src: '/oudh.jpeg' },
  { id: 4, label: 'Gift Sets', src: '/pretty women.jpeg' },
  { id: 5, label: 'Signature', src: '/cherry blossom.jpeg' },
  { id: 6, label: 'Car Perfumes', src: '/NIYU Aqua.jpeg' },
  { id: 7, label: 'Dezire', src: '/dezire.jpeg' },
]

function GalleryItem({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
    >
      <div className="relative aspect-square bg-surface-soft overflow-hidden">
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          width="400"
          height="400"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <p className="text-xs font-body text-white tracking-wider uppercase font-medium">{item.label}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" className="py-12 sm:py-16 overflow-hidden bg-surface" aria-label="Product gallery">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-10"
        >
          <p className="text-label text-gold-dark mb-2">Gallery</p>
          <h2 className="heading text-2xl sm:text-3xl md:text-4xl text-ink">The NIYU World</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
