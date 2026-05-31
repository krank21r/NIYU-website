import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const attarProducts = [
  { id: 'oudh', name: 'Oudh', image: '/oudh.jpeg', description: 'Rich, smoky, and enchanting — the pure essence of luxury.', sizes: [{ label: '15ml', price: 699 }, { label: '30ml', price: 1199 }] },
  { id: 'musk', name: 'Musk', image: '/musk.jpeg', description: 'Warm, sensual, and deeply comforting pure musk.', sizes: [{ label: '15ml', price: 599 }, { label: '30ml', price: 999 }] },
  { id: 'rose-oudh', name: 'Rose Oudh', image: '/Product images new/Rossy_Oudh.png', description: 'A rich, romantic blend of rose and oudh.', sizes: [{ label: '15ml', price: 699 }, { label: '30ml', price: 1299 }] },
  { id: 'cherry-blossom', name: 'Cherry Blossom', image: '/Product images new/Cherry_Blossom.png', description: 'Delicate floral notes of cherry blossom.', sizes: [{ label: '15ml', price: 599 }, { label: '30ml', price: 1099 }] },
]

function StarRating() {
  return (
    <div className="star-rating" role="img" aria-label="5 out of 5 stars">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className="star star-filled" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
      <span className="rating-count">(86)</span>
    </div>
  )
}

export default function AttarSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="attars" className="overflow-hidden bg-surface-soft" aria-label="Attar collection">
      <div className="bg-gradient-to-r from-ink to-ink-soft py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <h2 className="heading text-2xl sm:text-3xl md:text-4xl text-white mb-1">Attar Collection</h2>
            <p className="text-white/50 font-body font-light text-sm">Pure oil fragrances, crafted for every moment</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {attarProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card overflow-hidden group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-square bg-surface-soft overflow-hidden p-4">
                <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-heading text-ink leading-tight mb-1">{product.name}</h3>
                <div className="mb-2"><StarRating /></div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="price-sale">₹{Math.min(...product.sizes.map(s => s.price))}</span>
                  <span className="price-mrp">₹{Math.max(...product.sizes.map(s => s.price))}</span>
                </div>
                <p className="text-[11px] text-ink-muted line-clamp-1 mb-3">{product.description}</p>
                <div className="mt-auto">
                  <button className="btn-add-to-cart" aria-label={`Add ${product.name} to cart`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
