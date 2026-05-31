import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const defaultSizes = [
  { label: '15ml', price: 499 },
  { label: '30ml', price: 899 },
  { label: '50ml', price: 1299 },
]

export default function ProductModal() {
  const { selectedProduct, addToCart, closeFlow } = useCart()
  const [selectedSize, setSelectedSize] = useState(defaultSizes[2])
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (selectedProduct) {
      const sizes = selectedProduct.sizes || defaultSizes
      setSelectedSize(sizes[sizes.length - 1])
      setQty(1)
    }
  }, [selectedProduct?.name])

  if (!selectedProduct) return null

  const product = selectedProduct
  const sizes = product.sizes || defaultSizes
  const notes = product.notes || []

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      image: product.image,
      description: product.description || '',
      size: selectedSize.label,
      price: selectedSize.price,
      qty,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={closeFlow}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeFlow}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-surface-soft transition-colors min-w-[36px] min-h-[36px] shadow-sm"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative bg-surface-soft rounded-t-2xl flex justify-center items-center py-8 px-6">
          <img src={product.image} alt={product.name} className="h-44 w-auto object-contain" />
          {product.tag && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-gold text-white text-[10px] tracking-[0.1em] uppercase font-body font-medium rounded-lg">
              {product.tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-heading text-ink mb-1">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-ink-muted font-body font-light leading-relaxed mb-3">{product.description}</p>
          )}
          {notes.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mb-4">
              {notes.map((note) => (
                <span key={note} className="px-2 py-0.5 bg-surface-soft border border-black/5 text-[10px] tracking-[0.08em] uppercase text-ink-muted font-body rounded-md">{note}</span>
              ))}
            </div>
          )}

          <div className="h-[1px] bg-black/5 mb-4" />

          <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted font-body font-medium mb-2">Select Size</p>
          <div className="flex gap-2 mb-4">
            {sizes.map((s) => (
              <button
                key={s.label}
                onClick={() => setSelectedSize(s)}
                className={`flex-1 py-2.5 rounded-xl border text-center transition-all min-h-[42px] ${
                  selectedSize.label === s.label ? 'border-ink bg-ink/5' : 'border-black/8 hover:border-black/15'
                }`}
              >
                <p className={`text-[10px] tracking-[0.08em] uppercase font-body font-medium ${selectedSize.label === s.label ? 'text-ink' : 'text-ink-muted'}`}>{s.label}</p>
                <p className={`text-sm font-semibold ${selectedSize.label === s.label ? 'text-ink' : 'text-ink-soft'}`}>₹{s.price}</p>
              </button>
            ))}
          </div>

          <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted font-body font-medium mb-2">Quantity</p>
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center hover:bg-surface-soft transition-colors" aria-label="Decrease">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
            </button>
            <span className="text-lg font-semibold text-ink w-8 text-center">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center hover:bg-surface-soft transition-colors" aria-label="Increase">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-3.5 btn btn-primary text-[11px] mb-[env(safe-area-inset-bottom,0px)]"
          >
            Add to Cart — ₹{selectedSize.price * qty}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
