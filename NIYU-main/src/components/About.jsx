import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

const cards = [
  {
    title: 'Handmade Inspired Perfumes',
    description:
      'At NIYU, every fragrance is lovingly crafted by hand. Inspired by nature, traditions, and emotions, our perfumes and attars are soulful, timeless, and deeply personal.',
    icon: (
      <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Affordable Luxury Concept',
    description:
      'Luxury should be accessible. NIYU delivers premium-quality perfumes and attars at fair prices without compromising purity, elegance, or sophistication.',
    icon: (
      <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Quality Fragrance Promise',
    description:
      'We use pure oils, quality alcohol bases, and eco-conscious methods to create long-lasting fragrances that feel luxurious, safe, and memorable.',
    icon: (
      <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

function SectionTitle() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mb-20"
    >
      <div className="section-divider" />
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gold-gradient mb-4">
        Why NIYU Perfumes?
      </h2>
      <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
        Crafted with passion, defined by purity
      </p>
    </motion.div>
  )
}

function Card({ card, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="glass-card group rounded-sm p-8 md:p-10"
    >
      <div className="mb-6 w-14 h-14 rounded-full bg-gold/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-500">
        {card.icon}
      </div>
      <h3 className="text-xl md:text-2xl font-heading text-ink-soft mb-4">{card.title}</h3>
      <p className="text-ink-muted font-body font-light leading-relaxed text-sm md:text-base">
        {card.description}
      </p>
      <div className="mt-6 w-12 h-[1px] bg-gold/30 group-hover:w-full transition-all duration-700" />
    </motion.div>
  )
}

function ImageWithParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <motion.div ref={ref} style={{ y }} className="overflow-hidden rounded-sm">
      <img
        src="/images/about-editorial.svg"
        alt="NIYU Perfumes artisan craftsmanship"
        className="w-full h-auto object-cover"
      />
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,134,11,0.03)_0%,transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto">
        <SectionTitle />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-sm">
              <ImageWithParallax />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-gold/20" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-gold/20" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {cards.map((card, i) => (
              <Card key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
