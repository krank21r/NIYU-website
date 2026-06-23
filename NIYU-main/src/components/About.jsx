import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import RevealUp from './RevealUp'

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
      "Luxury shouldn't be out of reach. NIYU brings premium, chemical-free perfumes and attars to everyone who values elegance and purity.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

function Card({ card, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-[rgba(38,38,38,0.06)] bg-surface hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-400 cursor-default active:scale-[0.98]"
      style={{ transitionTimingFunction: 'var(--ease-premium)' }}
    >
      <div className="p-8 md:p-10">
        <div className="mb-6 w-14 h-14 bg-[rgba(38,38,38,0.05)] flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-400 text-accent/70 group-hover:text-accent" style={{ transitionTimingFunction: 'var(--ease-premium)' }}>
          {card.icon}
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-4">{card.title}</h3>
        <p className="text-text-secondary font-body font-light leading-relaxed text-sm md:text-base">
          {card.description}
        </p>
        <div className="mt-6 w-10 h-[1px] bg-accent/30 group-hover:w-full group-hover:bg-accent transition-all duration-700 ease-[var(--ease-premium)]" />
      </div>
    </motion.div>
  )
}

function ImageWithParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <motion.div ref={ref} style={{ y }} className="overflow-hidden rounded-[24px] p-0.5 bg-surface-secondary">
      <div className="overflow-hidden rounded-[20px]">
        <img
          src="/hero-perfume.jpg.png"
          alt="NIYU Perfumes artisan craftsmanship"
          loading="lazy"
          width="800"
          height="1000"
          className="w-full h-auto object-cover"
        />
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <RevealUp>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-body">
              About Us
            </span>
            <h2 className="font-heading font-black text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-[-0.03em] text-text-primary mt-4 mb-4">
              Why NIYU Perfumes?
            </h2>
            <p className="text-base md:text-lg font-body font-light text-text-secondary max-w-xl mx-auto">
              Crafted with passion, defined by purity
            </p>
            <span className="block w-8 h-[1px] bg-accent mx-auto mt-6" />
          </div>
        </RevealUp>

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
