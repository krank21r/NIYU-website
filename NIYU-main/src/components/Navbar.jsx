import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import WishlistOverlay from './WishlistOverlay'

const categories = [
  { label: 'All', href: '#trending' },
  { label: 'Perfumes', href: '#specials' },
  { label: 'Attars', href: '#attars' },
  { label: 'Car Perfumes', href: '#car-perfumes' },
  { label: 'Gift Sets', href: '#collection' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const { items } = useCart()
  const { wishlist } = useWishlist()
  const cartCount = items.length

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.06)]' : ''
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {/* Main nav row */}
        <div className={`bg-surface transition-all duration-300 ${scrolled ? '' : 'border-b border-black/5'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 sm:gap-4 h-14 sm:h-16">
              {/* Hamburger — mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-soft transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Logo */}
              <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-baseline gap-1 shrink-0">
                <span className="text-xl sm:text-2xl font-heading tracking-[0.2em] text-ink font-semibold">NIYU</span>
                <sup className="text-[9px] text-ink-muted font-body">®</sup>
              </a>

              {/* Right icons */}
              <div className="flex items-center gap-1 sm:gap-2 ml-auto">
                {/* Wishlist */}
                <button
                  onClick={() => setWishlistOpen(true)}
                  className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-soft transition-colors"
                  aria-label={`Wishlist (${wishlist.length} items)`}
                >
                  <svg className="w-5 h-5 text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {wishlist.length > 0 && (
                    <span className="cart-badge">{wishlist.length}</span>
                  )}
                </button>

                {/* Cart */}
                <button
                  className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-soft transition-colors"
                  aria-label={`Cart (${cartCount} items)`}
                >
                  <svg className="w-5 h-5 text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category nav row — desktop */}
        <div className="hidden lg:block bg-surface border-b border-black/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-0 h-11 overflow-x-auto scrollbar-none" aria-label="Category navigation">
              {categories.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  onClick={(e) => handleNavClick(e, cat.href)}
                  className="px-4 h-full flex items-center text-[13px] font-body font-medium text-ink-muted hover:text-ink hover:bg-surface-soft transition-colors whitespace-nowrap"
                >
                  {cat.label}
                </a>
              ))}
              <div className="ml-auto px-4 h-full flex items-center">
                <span className="text-[11px] font-body text-green-700 font-semibold tracking-wide">🎉 Launch Offer: Extra 10% Off</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[104px] sm:h-[120px] lg:h-[156px]" aria-hidden="true" />

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="absolute left-0 top-0 bottom-0 w-[280px] bg-surface shadow-xl overflow-y-auto"
            >
              <div className="p-4 border-b border-black/5">
                <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-baseline gap-1">
                  <span className="text-xl font-heading tracking-[0.2em] text-ink font-semibold">NIYU</span>
                  <sup className="text-[9px] text-ink-muted">®</sup>
                </a>
              </div>
              <nav className="p-4" aria-label="Mobile navigation">
                <p className="text-label text-ink-subtle mb-3">Categories</p>
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat.label}>
                      <a
                        href={cat.href}
                        onClick={(e) => handleNavClick(e, cat.href)}
                        className="block px-3 py-2.5 text-sm font-body text-ink-soft hover:text-ink hover:bg-surface-soft rounded-lg transition-colors"
                      >
                        {cat.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-black/5">
                  <p className="text-label text-ink-subtle mb-3">Quick Links</p>
                  <ul className="space-y-1">
                    <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="block px-3 py-2.5 text-sm font-body text-ink-soft hover:text-ink hover:bg-surface-soft rounded-lg transition-colors">About Us</a></li>
                    <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block px-3 py-2.5 text-sm font-body text-ink-soft hover:text-ink hover:bg-surface-soft rounded-lg transition-colors">Contact</a></li>
                    <li><a href="https://wa.me/916302040779" target="_blank" rel="noopener noreferrer" className="block px-3 py-2.5 text-sm font-body text-ink-soft hover:text-ink hover:bg-surface-soft rounded-lg transition-colors">WhatsApp Us</a></li>
                  </ul>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WishlistOverlay open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  )
}
