import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { stopSmoothScroll, startSmoothScroll } from '../hooks/useLenis'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'niyu_cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // localStorage full or unavailable
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [step, setStep] = useState('closed')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [delivery, setDelivery] = useState({ name: '', phone: '', email: '', address: '', pincode: '' })
  const [orderId, setOrderId] = useState(null)
  const [detailProduct, setDetailProduct] = useState(null)

  // Persist cart to localStorage on every change
  useEffect(() => {
    saveCart(items)
  }, [items])

  const openProductModal = useCallback((product) => {
    setSelectedProduct(product)
    setStep('product-modal')
    document.body.style.overflow = 'hidden'
    stopSmoothScroll()
  }, [])

  const closeFlow = useCallback(() => {
    setStep('closed')
    setSelectedProduct(null)
    document.body.style.overflow = ''
    startSmoothScroll()
  }, [])

  const openProductDetail = useCallback((product) => {
    setDetailProduct(product)
    stopSmoothScroll()
    history.pushState({ view: 'product-detail', productId: product.id }, '')
  }, [])

  const closeProductDetail = useCallback(() => {
    setDetailProduct(null)
    startSmoothScroll()
  }, [])

  const addToCart = useCallback((item) => {
    setItems(prev => {
      const existing = prev.findIndex(i => i.name === item.name && i.size === item.size)
      if (existing >= 0) {
        const updated = [...prev]
        const maxStock = item.stock || 99
        const newQty = Math.min(updated[existing].qty + item.qty, maxStock)
        updated[existing] = { ...updated[existing], qty: newQty, stock: maxStock }
        return updated
      }
      return [...prev, { ...item, stock: item.stock || 99 }]
    })
    setStep('cart')
    stopSmoothScroll()
  }, [])

  const removeFromCart = useCallback((index) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const updateQty = useCallback((index, qty) => {
    if (qty < 1) return
    setItems(prev => {
      const updated = [...prev]
      const maxStock = updated[index].stock || 99
      updated[index] = { ...updated[index], qty: Math.min(qty, maxStock) }
      return updated
    })
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal

  const confirmOrder = useCallback(async () => {
    let savedOrderId = null

    // Insert to Supabase if configured
    if (supabase) {
      try {
        console.log('[NIYU] Attempting Supabase insert...', { delivery, items, subtotal })
        const { data, error } = await supabase
          .from('orders')
          .insert({
            customer_name: delivery.name,
            phone: delivery.phone,
            email: delivery.email,
            address: delivery.address,
            pincode: delivery.pincode,
            items: items.map(i => ({ name: i.name, size: i.size, price: i.price, qty: i.qty })),
            subtotal,
            total,
            payment_method: 'UPI',
            status: 'pending',
          })
          .select('id')
          .single()

        if (error) {
          console.error('[NIYU] Supabase insert error:', error)
        } else {
          console.log('[NIYU] Order saved:', data.id)
          savedOrderId = data.id
          setOrderId(data.id)
        }
      } catch (err) {
        console.error('[NIYU] Supabase exception:', err)
      }
    } else {
      console.warn('[NIYU] Supabase not configured — order not saved')
    }

    // Send order confirmation email (fire-and-forget)
    const emailPayload = {
      email: delivery.email,
      name: delivery.name,
      phone: delivery.phone,
      orderId: savedOrderId,
      items: items.map(i => ({ name: i.name, size: i.size, price: i.price, qty: i.qty })),
      subtotal,
      total,
      address: delivery.address,
      pincode: delivery.pincode,
    }
    fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    }).catch(err => console.error('[NIYU] Email failed:', err))

    setStep('confirmation')
    // Clear cart after successful order
    setItems([])
  }, [items, delivery, subtotal, total])

  return (
    <CartContext.Provider value={{
      items, step, selectedProduct, delivery, subtotal, total, orderId, detailProduct,
      openProductModal, closeFlow, addToCart, removeFromCart, updateQty, clearCart,
      openProductDetail, closeProductDetail,
      setStep, setDelivery, confirmOrder,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
