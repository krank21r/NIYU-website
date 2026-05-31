import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ease = [0.23, 1, 0.32, 1]

export default function ProductDetail() {
  const { detailProduct, closeProductDetail, addToCart, setStep } = useCart()
  const { toggleWishlist, isWished } = useWishlist()
  const [selectedSize, setSelectedSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [pincode, setPincode] = useState('')
  const [deliveryChecked, setDeliveryChecked] = useState(false)
  const scrollRef = useRef(null)

  const product = detailProduct

  useEffect(() => {
    if (product) {
      const sizes = product.sizes || []
      setSelectedSize(sizes[sizes.length - 1] || null)
      setQty(1)
      setActiveImage(0)
      setPincode('')
      setDeliveryChecked(false)
    }
  }, [product?.id])

  // Escape key to close
  useEffect(() => {
    if (!product) return
    const onKey = (e) => { if (e.key === 'Escape') closeProductDetail() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product, closeProductDetail])

  useEffect(() => {
    if (!product) return
    const handleKey = (e) => { if (e.key === 'Escape') closeProductDetail() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [product, closeProductDetail])

  useEffect(() => {
    if (!product) return
    const handlePop = () => closeProductDetail()
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [product, closeProductDetail])

  useEffect(() => {
    if (!product) return
    const el = scrollRef.current
    if (!el) return
    const handleWheel = (e) => {
      e.stopPropagation()
      el.scrollTop += e.deltaY
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [product])

  const sizes = product?.sizes || []
  const images = product?.images || [product?.image].filter(Boolean)
  const notes = product?.notes || []

  const handleAddToCart = () => {
    if (!product || !selectedSize) return
    addToCart({
      name: product.name,
      image: product.image,
      description: product.description || '',
      size: selectedSize.label,
      price: selectedSize.price,
      qty,
    })
    closeProductDetail()
  }

  const handleBuyNow = () => {
    if (!product || !selectedSize) return
    addToCart({
      name: product.name,
      image: product.image,
      description: product.description || '',
      size: selectedSize.label,
      price: selectedSize.price,
      qty,
    })
    closeProductDetail()
    setTimeout(() => setStep('checkout'), 50)
  }

  const checkDelivery = () => {
    if (pincode.length === 6) setDeliveryChecked(true)
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          ref={scrollRef}
          key="product-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease }}
          className="fixed inset-0 z-[150] bg-surface overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-surface/95 backdrop-blur-xl border-b border-black/5">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
              <button
                onClick={() => { closeProductDetail(); history.back() }}
                className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors min-w-[44px] min-h-[44px] justify-center -ml-2"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="text-xs tracking-[0.08em] uppercase font-body font-medium hidden sm:inline">Back</span>
              </button>

              <h1 className="text-sm font-heading text-ink truncate max-w-[200px] sm:max-w-none">{product.name}</h1>

              <div className="flex items-center">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-11 h-11 flex items-center justify-center transition-colors"
                  aria-label={isWished(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg
                    className={`w-5 h-5 transition-colors ${isWished(product.id) ? 'text-red-500' : 'text-ink-muted'}`}
                    fill={isWished(product.id) ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
                <button
                  onClick={() => { closeProductDetail(); history.back() }}
                  className="w-11 h-11 flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 sm:pb-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

              {/* Left: Image Gallery */}
              <div className="lg:w-[55%]">
                <div className="relative bg-surface-soft rounded-2xl border border-black/5 flex justify-center items-center py-8 sm:py-12 mb-4 overflow-hidden">
                  {product.tag && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-gold text-white text-[10px] tracking-[0.1em] uppercase font-body font-medium rounded-lg">
                      {product.tag}
                    </span>
                  )}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      src={images[activeImage]}
                      alt={`${product.name} perfume bottle`}
                      className="h-56 sm:h-72 md:h-80 w-auto object-contain"
                    />
                  </AnimatePresence>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`flex-1 rounded-xl border p-2 flex justify-center items-center transition-all ${
                          activeImage === i ? 'border-gold bg-gold/5' : 'border-black/5 hover:border-black/10'
                        }`}
                        aria-label={`View image ${i + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} image ${i + 1}`}
                          className={`h-14 sm:h-18 w-auto object-contain transition-all ${activeImage === i ? 'opacity-100' : 'opacity-50'}`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="lg:w-[45%] lg:py-2">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <h2 className="text-2xl sm:text-3xl font-heading text-ink mb-2">{product.name}</h2>
                  {product.description && (
                    <p className="text-sm text-ink-muted font-body font-light leading-relaxed mb-5">{product.description}</p>
                  )}
                </motion.div>

                {/* Notes pills */}
                {notes.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-1.5 flex-wrap mb-5">
                    {notes.map((note) => (
                      <span key={note} className="px-2.5 py-1 bg-surface-soft border border-black/5 text-[10px] tracking-[0.08em] uppercase text-ink-muted font-body rounded-lg">
                        {note}
                      </span>
                    ))}
                  </motion.div>
                )}

                <div className="h-[1px] bg-black/5 mb-5" />

                {/* Size Selector */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted font-body font-medium mb-2">Select Size</p>
                  <div className="flex gap-2 mb-5">
                    {sizes.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => setSelectedSize(s)}
                        className={`flex-1 py-3 rounded-xl border text-center transition-all min-h-[44px] ${
                          selectedSize?.label === s.label
                            ? 'border-ink bg-ink/5'
                            : 'border-black/8 bg-white hover:border-black/15'
                        }`}
                      >
                        <p className={`text-[10px] tracking-[0.08em] uppercase font-body font-medium mb-0.5 ${
                          selectedSize?.label === s.label ? 'text-ink' : 'text-ink-muted'
                        }`}>{s.label}</p>
                        <p className={`text-sm font-semibold ${selectedSize?.label === s.label ? 'text-ink' : 'text-ink-soft'}`}>
                          ₹{s.price}
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Delivery */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mb-5">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted font-body font-medium mb-2">Delivery</p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); setDeliveryChecked(false) }}
                      placeholder="Enter pincode"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-black/10 bg-white text-sm font-body text-ink placeholder:text-ink-subtle/40 focus:outline-none focus:border-gold transition-colors"
                    />
                    <button
                      onClick={checkDelivery}
                      disabled={pincode.length !== 6}
                      className="px-5 py-2.5 rounded-xl border border-black/10 text-[10px] tracking-[0.08em] uppercase font-body font-medium text-ink-muted hover:border-black/20 hover:text-ink transition-all disabled:opacity-30 disabled:cursor-not-allowed min-h-[44px]"
                    >
                      Check
                    </button>
                  </div>
                  {deliveryChecked && pincode.length === 6 && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12px] text-green-600 font-body">
                      Delivery by 3-5 business days. Free delivery on orders above ₹999.
                    </motion.p>
                  )}
                  {!deliveryChecked && <p className="text-[11px] text-ink-subtle font-body">Enter pincode to check delivery availability</p>}
                </motion.div>

                {/* Quantity */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted font-body font-medium mb-2">Quantity</p>
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center hover:bg-surface-soft transition-colors" aria-label="Decrease">
                      <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                    </button>
                    <span className="text-lg font-semibold text-ink w-8 text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center hover:bg-surface-soft transition-colors" aria-label="Increase">
                      <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </motion.div>

                {/* Price */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }} className="mb-6">
                  <p className="text-2xl font-heading text-ink">
                    ₹{selectedSize ? selectedSize.price * qty : '—'}
                  </p>
                </motion.div>

                {/* Action Buttons — desktop */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="hidden sm:flex flex-col gap-2">
                  <button onClick={handleAddToCart} className="btn btn-primary text-[11px]">Add to Cart</button>
                  <button onClick={handleBuyNow} className="btn btn-gold text-[11px]">Buy Now</button>
                </motion.div>
              </div>
            </div>

            {/* Fragrance Notes Pyramid */}
            {(product.topNotes || product.heartNotes || product.baseNotes) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="mt-14"
              >
                <div className="text-center mb-8">
                  <div className="divider mb-6" />
                  <h3 className="heading text-2xl sm:text-3xl text-ink">Fragrance Notes</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 max-w-2xl mx-auto">
                  {[
                    { label: 'Top Notes', notes: product.topNotes },
                    { label: 'Heart Notes', notes: product.heartNotes },
                    { label: 'Base Notes', notes: product.baseNotes },
                  ].filter(col => col.notes?.length > 0).map((col, i, arr) => (
                    <div key={col.label} className={`text-center px-4 ${i < arr.length - 1 ? 'sm:border-r sm:border-black/5' : ''}`}>
                      <p className="text-label text-gold-dark mb-3">{col.label}</p>
                      {col.notes.map((note) => (
                        <p key={note} className="text-base font-heading text-ink-soft mb-1.5">{note}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Fragrance Story */}
            {product.longDescription && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="mt-14"
              >
                <div className="bg-surface-soft rounded-2xl py-12 sm:py-16 px-6 sm:px-10">
                  <div className="max-w-xl mx-auto text-center">
                    <div className="divider mb-6" />
                    <h3 className="heading text-2xl sm:text-3xl text-ink mb-5">The Essence</h3>
                    <p className="text-ink-muted font-body font-light text-base leading-relaxed">{product.longDescription}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky Bottom Bar — mobile only */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-xl border-t border-black/5 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-[10px] text-ink-muted font-body">Total</p>
                <p className="text-lg font-heading font-bold text-ink">₹{selectedSize ? selectedSize.price * qty : '—'}</p>
              </div>
              <button onClick={handleAddToCart} className="flex-1 btn btn-primary text-[11px] min-h-[48px]">Add to Cart</button>
              <button onClick={handleBuyNow} className="flex-1 btn btn-gold text-[11px] min-h-[48px]">Buy Now</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
