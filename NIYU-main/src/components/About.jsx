import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function Card({ card, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="card p-6 group"
    >
      <div className="w-12 h-12 rounded-2xl bg-surface-soft border border-black/5 flex items-center justify-center text-ink mb-4 group-hover:bg-gold/10 group-hover:border-gold/20 transition-all duration-300">
        {card.icon}
      </div>
      <h3 className="text-lg font-heading text-ink mb-2 group-hover:text-gold-dark transition-colors">{card.title}</h3>
      <p className="text-sm font-body text-ink-muted leading-relaxed">{card.description}</p>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const cards = [
    {
      title: 'Handmade Inspired',
      description: 'Every fragrance is lovingly crafted by hand. We draw inspiration from nature, traditions, and emotions to create perfumes and attars that feel personal, soulful, and timeless.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
    },
    {
      title: 'Affordable Luxury',
      description: "Luxury shouldn't be out of reach. NIYU brings premium, chemical-free perfumes and attars to everyone who values elegance and purity.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      title: 'Quality Promise',
      description: 'We promise uncompromising quality in every drop. Using pure oils, alcohol bases, and eco-friendly methods, NIYU ensures long-lasting scents that are safe, natural, and memorable.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 bg-surface" aria-label="About NIYU">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-10"
        >
          <motion.p className="text-label text-gold-dark mb-2" initial={{ opacity: 0, x: -12 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            Why NIYU?
          </motion.p>
          <motion.h2 className="heading text-2xl sm:text-3xl md:text-4xl text-ink mb-3" initial={{ opacity: 0, x: -12 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            Crafted with Passion
          </motion.h2>
          <motion.p className="text-ink-muted font-body font-light text-sm max-w-md mx-auto" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            Defined by purity, driven by love for fragrance
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-2xl overflow-hidden"
          >
            <img src="/1 million.jpeg" alt="NIYU Perfumes artisan craftsmanship" width="800" height="1000" loading="lazy" className="w-full h-auto object-cover" />
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {cards.map((card, i) => (
              <Card key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
