import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Shop', href: '#shop' },
  { label: 'Collections', href: '#collection' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = navLinks.map(l => l.href.slice(1))
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070B0F]/90 backdrop-blur-xl shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-20 py-5 flex items-center justify-between">
        {/* Logo + Tagline */}
        <motion.a
          href="#"
          className="flex flex-col"
          whileHover={{ scale: 1.02 }}
          aria-label="NIYU Perfumes — back to top"
        >
          <span className="text-2xl md:text-[1.7rem] font-heading tracking-[0.25em] text-white font-bold leading-none">
            NIYU<sup className="text-[9px] font-normal align-super ml-0.5 tracking-normal">®</sup>
          </span>
          <span className="text-[7px] md:text-[8px] tracking-[0.18em] uppercase text-white/40 mt-1 font-body">
            Pure Oils. Pure Luxury.
          </span>
        </motion.a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className={`text-[12px] lg:text-[13px] tracking-[0.14em] uppercase transition-colors duration-300 relative py-1 font-body font-medium ${
                active === link.href ? 'text-white' : 'text-white/55 hover:text-white'
              }`}
              whileHover={{ y: -1 }}
              aria-current={active === link.href ? 'page' : undefined}
            >
              {link.label}
              {active === link.href && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white/50"
                />
              )}
            </motion.a>
          ))}

          {/* Divider + Icons */}
          <div className="flex items-center gap-3 ml-1">
            <button
              aria-label="Search"
              className="text-white/50 hover:text-white transition-colors duration-300 p-1.5"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            <span className="w-px h-4 bg-white/15" aria-hidden="true" />

            <button
              aria-label="Shopping bag"
              className="text-white/50 hover:text-white transition-colors duration-300 p-1.5"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </button>
          </div>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#070B0F]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm tracking-[0.15em] uppercase transition-colors duration-300 py-3 px-4 min-h-[44px] flex items-center rounded-sm font-body font-medium ${
                    active === link.href
                      ? 'text-white bg-white/5'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={active === link.href ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
