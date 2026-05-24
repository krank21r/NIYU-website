import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

const cards = [
  {
    title: 'Handmade Inspired Perfumes',
    description:
      'At NIYU, every fragrance is lovingly crafted by hand. We draw inspiration from nature, traditions, and emotions to create perfumes and attars that feel personal, soulful, and timeless.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Affordable Luxury Concept',
    description:
      'Luxury shouldn\'t be out of reach. NIYU brings premium, chemical-free perfumes and attars to everyone who values elegance and purity.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Quality Fragrance Promise',
    description:
      'We promise uncompromising quality in every drop. Using pure oils, alcohol bases, and eco-friendly methods, NIYU ensures long-lasting scents that are safe, natural, and memorable.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
      className="text-center mb-24"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="section-divider origin-center"
      />
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
      initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.32, 0.72, 0, 1] }}
      className="double-bezel group cursor-default"
    >
      <div className="double-bezel-inner p-8 md:p-10">
        <div className="mb-6 w-14 h-14 rounded-2xl bg-gold/8 flex items-center justify-center group-hover:bg-gold/12 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] text-gold">
          {card.icon}
        </div>
        <h3 className="text-xl md:text-2xl font-heading text-ink-soft mb-4">{card.title}</h3>
        <p className="text-ink-muted font-body font-light leading-relaxed text-sm md:text-base">
          {card.description}
        </p>
        <div className="mt-6 w-10 h-[1px] bg-gold/30 group-hover:w-full transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]" />
      </div>
    </motion.div>
  )
}

function ImageWithParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <motion.div ref={ref} style={{ y }} className="overflow-hidden rounded-[1rem]">
      <div className="double-bezel">
        <div className="double-bezel-inner overflow-hidden p-0.5">
          <img
            src="/1 million.jpeg"
            alt="NIYU Perfumes artisan craftsmanship"
            loading="lazy"
            width="800"
            height="1000"
            className="w-full h-auto object-cover rounded-[calc(1.25rem-0.375rem-0.125rem)]"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-36 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,134,11,0.03)_0%,transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto">
        <SectionTitle />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <ImageWithParallax />
          </div>
          <div className="grid grid-cols-1 gap-5">
            {cards.map((card, i) => (
              <Card key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
