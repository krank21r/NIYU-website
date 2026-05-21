import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'SHOP', href: '#collection' },
  { label: 'COLLECTIONS', href: '#signature' },
  { label: 'PERFUMES', href: '#about' },
  { label: 'ATTAR', href: '#about' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ['hero', 'collection', 'signature', 'about', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive('#' + sections[i])
          break
        }
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070B0F]/95 backdrop-blur-xl shadow-lg shadow-black/40'
          : 'bg-[#070B0F]/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex flex-col"
          whileHover={{ scale: 1.02 }}
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="NIYU Perfumes — back to top"
        >
          <span className="text-xl md:text-2xl lg:text-[1.7rem] font-heading tracking-[0.2em] lg:tracking-[0.25em] text-white font-bold leading-none">
            NIYU<sup className="text-[8px] lg:text-[9px] font-normal align-super ml-0.5 tracking-normal">®</sup>
          </span>
          <span className="text-[6px] md:text-[7px] lg:text-[8px] tracking-[0.15em] lg:tracking-[0.18em] uppercase text-white/40 mt-1 font-body hidden sm:block">
            Pure Oils. Pure Luxury.
          </span>
        </motion.a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[10px] xl:text-[11px] tracking-[0.1em] xl:tracking-[0.12em] uppercase relative py-2 px-3 xl:px-4 rounded-full font-body font-medium transition-all duration-300 ${
                active === link.href
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ y: -1 }}
              aria-current={active === link.href ? 'page' : undefined}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Tablet Nav - shorter list */}
        <div className="hidden md:flex lg:hidden items-center gap-1">
          {navLinks.slice(0, 5).map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[9px] tracking-[0.08em] uppercase relative py-2 px-2 rounded-full font-body font-medium transition-all duration-300 ${
                active === link.href
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              aria-current={active === link.href ? 'page' : undefined}
            >
              {link.label}
            </motion.a>
          ))}
          <button
            onClick={() => setMobileOpen(true)}
            className="text-[9px] tracking-[0.08em] uppercase text-white/60 hover:text-white py-2 px-3 rounded-full hover:bg-white/5 transition-all font-body"
            aria-label="Show more menu items"
          >
            MORE
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-3 min-w-[44px] min-h-[44px] items-center justify-center"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[1.5px] bg-white"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-[1.5px] bg-white"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[1.5px] bg-white"
          />
        </button>
      </div>

      {/* Mobile / Tablet Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#070B0F]/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-sm tracking-[0.12em] uppercase transition-all duration-300 py-3.5 px-5 min-h-[48px] flex items-center rounded-lg font-body font-medium ${
                    active === link.href
                      ? 'text-white bg-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={active === link.href ? 'page' : undefined}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
