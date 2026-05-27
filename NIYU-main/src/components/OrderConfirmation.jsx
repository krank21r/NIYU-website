import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function OrderConfirmation() {
  const { items, subtotal, delivery, orderId, buildWhatsAppUrl, closeFlow } = useCart()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const url = buildWhatsAppUrl()

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          window.open(url, '_blank')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [buildWhatsAppUrl])

  const handleOpenWhatsApp = () => {
    window.open(buildWhatsAppUrl(), '_blank')
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center overflow-y-auto h-full">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="w-10 h-10 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <h3 className="text-2xl font-heading font-bold text-ink-soft mb-2">Order Placed!</h3>
        <p className="text-sm text-ink-subtle font-body font-light mb-6">Thank you for your order</p>
      </motion.div>

      {/* Order summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-sm bg-cream/40 border border-ink/5 p-5 mb-6 text-left"
      >
        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-3">Order Summary</p>
        {items.map((item, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-ink/5 last:border-0">
            <span className="text-sm font-body text-ink-soft">{item.name} ({item.size}) x{item.qty}</span>
            <span className="text-sm font-body font-semibold text-ink-soft">&#8377;{item.price * item.qty}</span>
          </div>
        ))}
        <div className="flex justify-between pt-3 mt-2 border-t border-ink/10">
          <span className="text-sm font-body font-semibold text-ink-soft">Total</span>
          <span className="text-lg font-heading font-bold text-gold">&#8377;{subtotal}</span>
        </div>
        {orderId && (
          <p className="text-[11px] text-ink-subtle font-body mt-3">Order ID: {orderId}</p>
        )}
        <div className="mt-3 pt-3 border-t border-ink/5">
          <p className="text-[11px] text-ink-subtle font-body">{delivery.name}</p>
          <p className="text-[11px] text-ink-subtle font-body">{delivery.phone}</p>
          <p className="text-[11px] text-ink-subtle font-body">{delivery.address}, {delivery.pincode}</p>
        </div>
      </motion.div>

      {/* WhatsApp redirect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-sm"
      >
        <p className="text-xs text-ink-subtle font-body mb-4">
          Redirecting to WhatsApp in {countdown}s...
        </p>
        <button
          onClick={handleOpenWhatsApp}
          className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-400 flex items-center justify-center gap-2 min-h-[44px]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Open WhatsApp Now
        </button>

        <button
          onClick={closeFlow}
          className="mt-3 w-full py-3 border border-ink/10 text-ink-muted text-[11px] tracking-[0.08em] uppercase font-body font-medium hover:border-ink/20 transition-all duration-400 min-h-[44px]"
        >
          Continue Shopping
        </button>
      </motion.div>
    </div>
  )
}
