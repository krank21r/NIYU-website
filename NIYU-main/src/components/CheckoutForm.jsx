import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function CheckoutForm() {
  const { delivery, setDelivery, setStep, subtotal, total, items, discount, appliedCoupon } = useCart()
  const [errors, setErrors] = useState({})
  const [consent, setConsent] = useState({ terms: false, privacy: false })

  const validate = () => {
    const errs = {}
    if (!delivery.name.trim()) errs.name = 'Name is required'
    if (!/^\d{10}$/.test(delivery.phone)) errs.phone = 'Enter a valid 10-digit number'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(delivery.email)) errs.email = 'Enter a valid email address'
    if (!delivery.address.trim()) errs.address = 'Address is required'
    if (!/^\d{6}$/.test(delivery.pincode)) errs.pincode = 'Enter a valid 6-digit pincode'
    if (!consent.terms) errs.terms = 'You must accept the Terms & Conditions'
    if (!consent.privacy) errs.privacy = 'You must accept the Privacy Policy'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) setStep('payment')
  }

  const handleChange = (field) => (e) => {
    setDelivery({ ...delivery, [field]: e.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: null })
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-transparent border ${errors[field] ? 'border-red-400' : 'border-ink/10'} text-[15px] font-body text-ink-soft placeholder:text-ink-subtle/40 focus:outline-none focus:border-gold transition-colors duration-300`

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* Left: Delivery Form */}
        <div className="flex-1 min-w-0">
          {/* Section: Delivery Address */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-ink text-white text-[12px] font-body font-semibold flex items-center justify-center flex-shrink-0">
                1
              </span>
              <h3 className="text-base font-heading font-bold text-ink-soft">
                Delivery Address
              </h3>
            </div>

            <div className="space-y-4">
              {/* Name + Phone — side by side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-name" className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    autoComplete="name"
                    value={delivery.name}
                    onChange={handleChange('name')}
                    placeholder="Full name"
                    className={inputClass('name')}
                  />
                  {errors.name && <p className="text-[11px] text-red-500 font-body mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    autoComplete="tel"
                    value={delivery.phone}
                    onChange={handleChange('phone')}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={inputClass('phone')}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 font-body mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="checkout-email" className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                  Email Address *
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  autoComplete="email"
                  value={delivery.email}
                  onChange={handleChange('email')}
                  placeholder="you@example.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-[11px] text-red-500 font-body mt-1">{errors.email}</p>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="checkout-address" className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                  Delivery Address *
                </label>
                <textarea
                  id="checkout-address"
                  autoComplete="street-address"
                  value={delivery.address}
                  onChange={handleChange('address')}
                  placeholder="House no., Street, Locality, City, State"
                  rows={3}
                  className={`${inputClass('address')} resize-none`}
                />
                {errors.address && <p className="text-[11px] text-red-500 font-body mt-1">{errors.address}</p>}
              </div>

              {/* Pincode */}
              <div className="sm:w-1/2">
                <label htmlFor="checkout-pincode" className="block text-[11px] tracking-[0.05em] text-ink-subtle font-body mb-1.5">
                  Pincode *
                </label>
                <input
                  id="checkout-pincode"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={delivery.pincode}
                  onChange={handleChange('pincode')}
                  placeholder="6-digit pincode"
                  maxLength={6}
                  className={inputClass('pincode')}
                />
                {errors.pincode && <p className="text-[11px] text-red-500 font-body mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Consent checkboxes */}
          <div className="mb-6 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={consent.terms}
                onChange={(e) => {
                  setConsent({ ...consent, terms: e.target.checked })
                  if (errors.terms) setErrors({ ...errors, terms: null })
                }}
                className="mt-0.5 w-4 h-4 border-ink/20 text-gold focus:ring-gold accent-gold"
              />
              <span className="text-[13px] font-body text-ink-subtle group-hover:text-ink-soft transition-colors">
                I agree to the{' '}
                <a href="/terms" target="_blank" className="text-gold hover:underline">Terms & Conditions</a>
                {' '}*
              </span>
            </label>
            {errors.terms && <p className="text-[11px] text-red-500 font-body">{errors.terms}</p>}

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={consent.privacy}
                onChange={(e) => {
                  setConsent({ ...consent, privacy: e.target.checked })
                  if (errors.privacy) setErrors({ ...errors, privacy: null })
                }}
                className="mt-0.5 w-4 h-4 border-ink/20 text-gold focus:ring-gold accent-gold"
              />
              <span className="text-[13px] font-body text-ink-subtle group-hover:text-ink-soft transition-colors">
                I agree to the{' '}
                <a href="/privacy" target="_blank" className="text-gold hover:underline">Privacy Policy</a>
                {' '}*
              </span>
            </label>
            {errors.privacy && <p className="text-[11px] text-red-500 font-body">{errors.privacy}</p>}
          </div>

          {/* Secure checkout badge */}
          <div className="flex items-center gap-2 mb-4 text-[11px] text-ink-subtle font-body">
            <svg className="w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Secure checkout — your data is protected
          </div>

          {/* Trust bar */}
          <div className="flex items-center justify-center gap-6 py-4 border-t border-ink/5 text-[10px] text-ink-subtle/60 font-body">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              SSL Encrypted
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Secure Payment
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.183" />
              </svg>
              Easy Returns
            </div>
          </div>

          {/* Continue button — mobile only */}
          <button
            type="submit"
            className="w-full py-3.5 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[48px] lg:hidden"
          >
            Continue to Payment
          </button>
          <button
            type="button"
            onClick={() => setStep('cart')}
            className="w-full mt-3 py-2.5 text-[12px] text-ink-subtle font-body text-center hover:text-ink-soft transition-colors underline underline-offset-2 decoration-ink/20 lg:hidden"
          >
            Back to Cart
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="lg:sticky lg:top-24 border border-ink/5 bg-cream/30 p-5 sm:p-6">
            <h3 className="text-[11px] tracking-[0.1em] uppercase text-ink-subtle font-body font-medium mb-4 pb-3 border-b border-ink/5">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-12 h-14 flex-shrink-0 bg-cream/50 border border-ink/5 flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-10 w-auto object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-body text-ink-soft truncate">{item.name}</p>
                    <p className="text-[11px] text-ink-subtle font-body">{item.size ? `${item.size} × ` : ''}{item.qty}</p>
                  </div>
                  <span className="text-[13px] font-body font-medium text-ink-soft flex-shrink-0">
                    &#8377;{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-ink/5 pt-3 space-y-2">
              <div className="flex justify-between text-[13px] font-body">
                <span className="text-ink-subtle">Subtotal</span>
                <span className="text-ink-soft">&#8377;{subtotal}</span>
              </div>
              <div className="flex justify-between text-[13px] font-body">
                <span className="text-ink-subtle">Delivery</span>
                <span className="text-green-700 font-medium">Free</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[13px] font-body">
                  <span className="text-green-700">Discount ({appliedCoupon?.code})</span>
                  <span className="text-green-700 font-medium">-&#8377;{discount}</span>
                </div>
              )}
              <div className="border-t border-ink/5 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-body font-semibold text-ink-soft">Total</span>
                  <span className="text-lg font-heading font-bold text-gold">&#8377;{total}</span>
                </div>
              </div>
            </div>

            {/* Estimated delivery */}
            <p className="text-[11px] text-ink-subtle font-body mt-3 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Estimated delivery: 3-7 business days
            </p>

            {/* CTA — desktop */}
            <button
              type="submit"
              className="w-full mt-5 py-3.5 bg-ink hover:bg-ink-soft text-white text-[11px] tracking-[0.1em] uppercase font-body font-semibold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[48px] hidden lg:block"
            >
              Continue to Payment
            </button>
            {/* Trust signals under CTA */}
            <div className="hidden lg:flex items-center justify-center gap-4 mt-3 text-[10px] text-ink-subtle/50 font-body">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Secure
              </span>
              <span>·</span>
              <span>Free shipping</span>
              <span>·</span>
              <span>7-day returns</span>
            </div>
            <button
              type="button"
              onClick={() => setStep('cart')}
              className="w-full mt-3 py-2.5 text-[12px] text-ink-subtle font-body text-center hover:text-ink-soft transition-colors underline underline-offset-2 decoration-ink/20 hidden lg:block"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
