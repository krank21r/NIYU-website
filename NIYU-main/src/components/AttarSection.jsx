import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const attars = [
  {
    type: 'Oud / Oudh',
    bestFor: 'Parties & evenings',
    fragrance: 'Rich, smoky, luxury',
  },
  {
    type: 'Rose',
    bestFor: 'Daily & feminine use',
    fragrance: 'Romantic, soft',
  },
  {
    type: 'Jasmine',
    bestFor: 'Summer & casual wear',
    fragrance: 'Fresh floral',
  },
  {
    type: 'Musk',
    bestFor: 'Long-lasting signature scent',
    fragrance: 'Warm, sensual',
  },
  {
    type: 'Sandalwood',
    bestFor: 'Spiritual & calming vibe',
    fragrance: 'Woody, smooth',
  },
]

function AttarItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.32, 0.72, 0, 1] }}
      className="group py-5 border-b border-ink/5 last:border-b-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1.5">
            <h3 className="text-xl sm:text-2xl font-heading text-ink-soft group-hover:text-ink transition-colors duration-500">
              {item.type}
            </h3>
            <div className="h-[1px] flex-1 bg-ink/5 group-hover:bg-ink/20 transition-colors duration-700" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-xs font-body text-ink-muted">
              <span className="text-ink text-[10px] mr-1" aria-hidden="true">&#9670;</span>
              {item.bestFor}
            </span>
            <span className="text-xs font-body text-ink-subtle italic">
              {item.fragrance}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AttarSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="attars" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden" aria-label="Attar collection">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(28,28,28,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="section-divider origin-center"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ink mb-4">
            Attar Collection
          </h2>
          <p className="text-ink-subtle font-body font-light max-w-xl mx-auto">
            Pure oil fragrances, crafted for every moment
          </p>
        </motion.div>

        {/* Editorial Split: Image left, list right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — Attar image */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="">
              <div className="overflow-hidden p-0.5">
                <img
                  src="/attar.jpeg"
                  alt="NIYU pure attar oil bottle — gold glass bottle with aromatic oil"
                  loading="lazy"
                  width="800"
                  height="1000"
                  className="w-full h-auto object-cover rounded-[calc(1.25rem-0.375rem-0.125rem)]"
                />
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 md:w-24 md:h-24 border-r border-b border-ink/15" aria-hidden="true" />
          </motion.div>

          {/* Right — Attar types list */}
          <div className="lg:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="text-sm font-body text-ink-muted leading-relaxed mb-8 max-w-md"
            >
              Our attars are handcrafted using traditional distillation methods with pure essential oils. Each blend is alcohol-free and designed to linger beautifully on your skin all day.
            </motion.p>

            <div>
              {attars.map((item, i) => (
                <AttarItem key={item.type} item={item} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-ink/8 border border-ink/15">
                <span className="text-xs font-body font-medium text-ink-soft tracking-wide">All Attars</span>
                <div className="w-[1px] h-4 bg-ink/25" aria-hidden="true" />
                <span className="text-sm font-body font-semibold text-ink">
                  <span className="text-[11px] font-normal mr-0.5">&#8377;</span>699
                </span>
              </div>
              <a
                href="https://wa.me/916302040779"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink hover:bg-ink-soft text-cream text-[11px] tracking-[0.1em] uppercase font-body font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[44px]"
                aria-label="Buy attars on WhatsApp"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Buy Now
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
