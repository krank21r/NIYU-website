import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import WishlistOverlay from './WishlistOverlay'
import SearchOverlay from './SearchOverlay'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Shop', href: '#specials' },
  { label: 'Attars', href: '#attars' },
  { label: 'Aero Drive', href: '#car-perfumes' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('#hero')
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { wishlistCount } = useWishlist()
  const { items, setStep } = useCart()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60)
          const sections = ['hero', 'trending', 'specials', 'attars', 'car-perfumes', 'about', 'collection', 'contact']
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i])
            if (el && el.getBoundingClientRect().top <= 200) {
              setActive('#' + sections[i])
              break
            }
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' })
      setActive(href)
    }
    if (mobileOpen) setMobileOpen(false)
  }

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0)

  const openCart = () => {
    setStep('cart')
    document.body.style.overflow = 'hidden'
    if (mobileOpen) setMobileOpen(false)
  }

  const openSearch = () => {
    setSearchOpen(true)
    if (mobileOpen) setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop Nav */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ top: 'calc(2.25rem + env(safe-area-inset-top, 0px))' }}
        className={`fixed left-0 right-0 z-50 hidden lg:block h-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-glass-bg backdrop-blur-[12px] border-b border-glass-border ${
          scrolled ? 'shadow-[0_1px_30px_rgba(0,0,0,0.04)]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-8">
          {/* Logo — left */}
          <motion.a
            href="#"
            className="flex items-baseline gap-1 group shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="NIYU Perfumes — back to top"
          >
            <span className="text-xl font-heading font-bold tracking-[0.3em] text-text-primary leading-none transition-all duration-300 group-hover:tracking-[0.35em]">
              NIYU
            </span>
            <sup className="text-[11px] font-body font-light tracking-normal text-text-tertiary">&reg;</sup>
          </motion.a>

          {/* Nav Links — center */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-body font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                aria-current={active === link.href ? 'page' : undefined}
              >
                {link.label}
                {/* Hover underline reveal */}
                <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left" />
                {/* Active underline */}
                {active === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-4 right-4 h-[1px] bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Icons + CTA — right */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Search icon */}
            <button
              onClick={openSearch}
              className="w-10 h-10 flex items-center justify-center hover:text-accent transition-colors duration-300 min-w-[44px] min-h-[44px] text-text-secondary"
              aria-label="Open search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Wishlist icon */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center hover:text-accent transition-colors duration-300 min-w-[44px] min-h-[44px] text-text-secondary"
              aria-label="Open wishlist"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[9px] font-body font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart icon */}
            <button
              onClick={openCart}
              className="relative w-10 h-10 flex items-center justify-center hover:text-accent transition-colors duration-300 min-w-[44px] min-h-[44px] text-text-secondary"
              aria-label="Open cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[9px] font-body font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <div className="ml-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-block bg-accent text-text-primary px-8 py-3 text-[10px] tracking-[0.3em] uppercase font-body font-semibold rounded-full hover:brightness-95 transition-all duration-300"
                aria-label="Get in touch"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ top: 'calc(2.25rem + env(safe-area-inset-top, 0px))' }}
        className={`fixed left-0 right-0 z-50 lg:hidden h-14 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] bg-glass-bg backdrop-blur-[12px] border-b border-glass-border ${
          scrolled || mobileOpen ? 'shadow-[0_1px_30px_rgba(0,0,0,0.04)]' : ''
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5">
          {/* Hamburger — left */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-11 h-11 flex items-center justify-center -ml-1"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-[6px]">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="block w-full h-[1.5px] bg-text-primary origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -8, scaleX: 0 } : { opacity: 1, x: 0, scaleX: 1 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block w-full h-[1.5px] bg-text-primary origin-left"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="block w-full h-[1.5px] bg-text-primary origin-center"
              />
            </div>
          </button>

          {/* Logo — center */}
          <motion.a
            href="#"
            className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-0.5 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="NIYU Perfumes — back to top"
          >
            <span className="text-lg font-heading font-bold tracking-[0.3em] text-text-primary leading-none transition-all duration-300 group-hover:tracking-[0.35em]">
              NIYU
            </span>
            <sup className="text-[11px] font-body font-light tracking-normal text-text-tertiary">&reg;</sup>
          </motion.a>

          {/* Icons — right */}
          <div className="flex items-center gap-0.5">
            {/* Search icon */}
            <button
              onClick={openSearch}
              className="w-11 h-11 flex items-center justify-center hover:text-accent transition-colors duration-300 text-text-secondary"
              aria-label="Open search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Wishlist icon */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative w-11 h-11 flex items-center justify-center hover:text-accent transition-colors duration-300 text-text-secondary"
              aria-label="Open wishlist"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-accent text-white text-[9px] font-body font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart icon */}
            <button
              onClick={openCart}
              className="relative w-11 h-11 flex items-center justify-center hover:text-accent transition-colors duration-300 text-text-secondary"
              aria-label="Open cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-accent text-white text-[9px] font-body font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-glass-bg backdrop-blur-3xl flex flex-col items-center justify-center lg:hidden"
          >
            {/* Close button — top right */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-5 w-11 h-11 flex items-center justify-center"
              aria-label="Close menu"
            >
              <motion.svg
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-5 h-5 text-text-primary"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            </button>

            {/* Nav links */}
            <nav className="flex flex-col items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative text-[13px] tracking-[0.18em] uppercase font-body font-medium py-3 min-h-[44px] flex items-center transition-colors duration-200 ${
                    active === link.href
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  aria-current={active === link.href ? 'page' : undefined}
                >
                  {link.label}
                  {/* Hover underline */}
                  <span className="absolute bottom-1 left-0 right-0 h-[1px] bg-accent scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center" />
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-block bg-accent text-text-primary px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-body font-semibold rounded-full hover:brightness-95 transition-all duration-300"
                aria-label="Get in touch"
              >
                GET IN TOUCH
              </a>
            </motion.div>

            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-accent/30" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-accent font-body font-light">NIYU</span>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent/30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Wishlist Overlay */}
      <WishlistOverlay open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  )
}
