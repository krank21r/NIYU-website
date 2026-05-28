import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function OrderConfirmation() {
  const { items, subtotal, delivery, orderId, closeFlow } = useCart()

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

      {/* Continue shopping */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-sm"
      >
        <button
          onClick={closeFlow}
          className="w-full py-3 border border-ink/10 text-ink-muted text-[11px] tracking-[0.08em] uppercase font-body font-medium hover:border-ink/20 transition-all duration-400 min-h-[44px]"
        >
          Continue Shopping
        </button>
      </motion.div>
    </div>
  )
}
