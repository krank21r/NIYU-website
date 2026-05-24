import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'SHOP', href: '#collection' },
  { label: 'COLLECTIONS', href: '#signature' },
  { label: 'PERFUMES', href: '#about' },
  { label: 'ATTARS', href: '#attars' },
  { label: 'CAR PERFUMES', href: '#car-perfumes' },
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
      const sections = ['hero', 'trending', 'specials', 'attars', 'car-perfumes', 'about', 'collection', 'signature', 'contact']
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
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-[calc(2.25rem+1.5rem)] left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div
          className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? 'bg-ivory/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(26,22,18,0.06),0_0_0_1px_rgba(237,233,227,0.5)]'
              : 'bg-ivory/40 backdrop-blur-md shadow-[0_0_0_1px_rgba(237,233,227,0.3)]'
          }`}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 px-4 py-2 mr-1"
            whileHover={{ scale: 1.02 }}
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="NIYU Perfumes — back to top"
          >
            <span className="text-base lg:text-lg font-heading tracking-[0.2em] text-charcoal font-bold leading-none">
              NIYU<sup className="text-[7px] font-normal align-super ml-0.5 tracking-normal">®</sup>
            </span>
          </motion.a>

          <div className="w-[1px] h-4 bg-ink/8" aria-hidden="true" />

          {/* Nav Links */}
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[10px] xl:text-[11px] tracking-[0.1em] uppercase relative py-2 px-3 xl:px-4 rounded-full font-body font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                active === link.href
                  ? 'text-charcoal bg-gold/10'
                  : 'text-ink-muted hover:text-charcoal hover:bg-cream/60'
              }`}
              whileHover={{ y: -1 }}
              aria-current={active === link.href ? 'page' : undefined}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-[calc(2.25rem+1rem)] left-4 right-4 z-50 md:hidden"
      >
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? 'bg-ivory/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(26,22,18,0.06),0_0_0_1px_rgba(237,233,227,0.5)]'
              : 'bg-ivory/40 backdrop-blur-md shadow-[0_0_0_1px_rgba(237,233,227,0.3)]'
          }`}
        >
          <motion.a
            href="#"
            className="flex flex-col"
            whileHover={{ scale: 1.02 }}
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="NIYU Perfumes — back to top"
          >
            <span className="text-lg font-heading tracking-[0.2em] text-charcoal font-bold leading-none">
              NIYU<sup className="text-[7px] font-normal align-super ml-0.5 tracking-normal">®</sup>
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-ink-subtle mt-0.5 font-body">
              Pure Oils. Pure Luxury.
            </span>
          </motion.a>

          {/* Hamburger morph */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-11 h-11 flex items-center justify-center"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="block w-full h-[1.5px] bg-charcoal origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-full h-[1.5px] bg-charcoal"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="block w-full h-[1.5px] bg-charcoal origin-center"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile / Tablet Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-ivory/95 backdrop-blur-3xl flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className={`text-2xl sm:text-3xl tracking-[0.15em] uppercase font-heading transition-colors duration-500 py-3 ${
                    active === link.href
                      ? 'text-gold'
                      : 'text-ink-muted hover:text-charcoal'
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
    </>
  )
}
