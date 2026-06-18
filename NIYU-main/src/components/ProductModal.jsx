import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import ProductJsonLd from './ProductJsonLd'

const defaultSizes = [
  { label: '15ml', price: 499 },
  { label: '30ml', price: 899 },
  { label: '50ml', price: 1299 },
]

export default function ProductModal() {
  const { selectedProduct, addToCart, closeFlow } = useCart()
  const [selectedSize, setSelectedSize] = useState(defaultSizes[2])
  const [qty, setQty] = useState(1)

  // Reset state when a new product is selected
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
      stock: selectedSize.stock || 99,
      qty,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      onClick={closeFlow}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-cream shadow-[0_24px_80px_rgba(0,0,0,0.15)] overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <ProductJsonLd product={product} selectedSize={selectedSize} />
        {/* Close button */}
        <button
          onClick={closeFlow}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-cream/80 backdrop-blur-sm flex items-center justify-center hover:bg-cream transition-colors duration-300 min-w-[44px] min-h-[44px]"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product image */}
        <div className="relative bg-white/50 flex justify-center items-center py-10 px-6">
          <img
            src={product.image}
            alt={product.name}
            className="h-52 w-auto object-contain"
          />
          {product.tag && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-ink text-cream text-[11px] tracking-[0.12em] uppercase font-body font-medium">
              {product.tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-heading text-ink-soft mb-1">{product.name}</h3>

          {product.description && (
            <p className="text-sm text-ink-muted font-body font-light leading-relaxed mb-4">{product.description}</p>
          )}

          {notes.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-5">
              {notes.map((note) => (
                <span key={note} className="px-3 py-1 bg-white border border-ink/8 text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body">
                  {note}
                </span>
              ))}
            </div>
          )}

          <div className="h-[1px] bg-ink/5 mb-5" />

          <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-3">Select Size</p>
          <div className="flex gap-3 mb-6">
            {sizes.map((s) => (
              <button
                key={s.label}
                onClick={() => setSelectedSize(s)}
                className={`flex-1 py-3 border text-center transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[44px] ${
                  selectedSize.label === s.label
                    ? 'border-ink bg-ink/5'
                    : 'border-ink/8 bg-cream/40 hover:border-ink/20'
                }`}
              >
                <p className={`text-xs tracking-[0.08em] uppercase font-body font-medium mb-0.5 ${
                  selectedSize.label === s.label ? 'text-ink' : 'text-ink-subtle'
                }`}>{s.label}</p>
                <p className={`text-sm font-body font-semibold ${
                  selectedSize.label === s.label ? 'text-ink' : 'text-ink-soft'
                }`}>
                  <span className="text-[11px] font-normal mr-px">&#8377;</span>{s.price}
                </p>
              </button>
            ))}
          </div>

          <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-3">Quantity</p>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-11 h-11 border border-ink/10 bg-cream/40 flex items-center justify-center hover:border-ink/20 transition-colors duration-300 min-w-[44px] min-h-[44px]"
              aria-label="Decrease quantity"
            >
              <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="text-lg font-body font-semibold text-ink-soft w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-11 h-11 border border-ink/10 bg-cream/40 flex items-center justify-center hover:border-ink/20 transition-colors duration-300 min-w-[44px] min-h-[44px]"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-3.5 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.12em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[44px] mb-[env(safe-area-inset-bottom,0px)]"
          >
            Add to Cart — &#8377;{selectedSize.price * qty}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
