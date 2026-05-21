import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const notes = [
  {
    title: 'Top Notes',
    description: 'The first impression — bright, fresh notes that captivate instantly and introduce the fragrance with elegance.',
    icon: (
      <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-gold/20 via-amber-800/20 to-transparent',
  },
  {
    title: 'Heart Notes',
    description: 'The soul of the fragrance — rich floral and spicy blends that bloom and define the character of the scent.',
    icon: (
      <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: 'from-rose-900/30 via-gold/10 to-transparent',
  },
  {
    title: 'Base Notes',
    description: 'The lasting memory — deep, warm notes of woods, musk, and amber that linger beautifully on the skin.',
    icon: (
      <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    color: 'from-amber-950/40 via-stone-800/20 to-transparent',
  },
]

function NoteCard({ note, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-sm"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${note.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="glass-card relative p-8 md:p-10 min-h-[300px] flex flex-col">
        <div className="mb-8 p-4 bg-gold/5 rounded-full w-fit group-hover:bg-gold/10 transition-colors duration-500">
          {note.icon}
        </div>

        <h3 className="text-2xl font-heading text-ink-soft mb-4 group-hover:text-gold transition-colors duration-500">
          {note.title}
        </h3>

        <p className="text-ink-muted font-body font-light text-sm leading-relaxed">
          {note.description}
        </p>

        <div className="mt-auto pt-6" aria-hidden="true">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gold/20 group-hover:bg-gold/40 transition-colors duration-500"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function FragranceNotes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.02)_0%,transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="section-divider" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gold-gradient mb-4">
            Fragrance Notes
          </h2>
          <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
            The architecture of every scent
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {notes.map((note, i) => (
            <NoteCard key={note.title} note={note} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
