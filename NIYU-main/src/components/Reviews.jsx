import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const reviews = [
  {
    name: 'Ananya Sharma',
    text: 'Absolutely divine! The Rose Oudh is the most beautiful perfume I have ever owned. It lasts all day and the compliments never stop.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    text: 'Premium quality attars at such fair prices. NIYU has become my go-to for luxury fragrances. The Musk attar is pure magic.',
    rating: 5,
  },
  {
    name: 'Priya Kapoor',
    text: 'The gift set I ordered was stunning. The packaging, the scents — everything exudes elegance. Will definitely be ordering again.',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    text: 'Discovered NIYU through a friend and I am hooked. The Aqua fragrance is fresh, sophisticated, and incredibly long-lasting.',
    rating: 5,
  },
  {
    name: 'Sneha Patel',
    text: 'Finally, a brand that delivers true luxury without the hefty price tag. The Cherry Blossom is my new signature scent!',
    rating: 5,
  },
]

function Stars({ rating }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-ink/10'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % reviews.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative py-32 px-6 overflow-hidden" aria-label="Customer reviews">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.03)_0%,transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-divider" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gold-gradient mb-4">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-10 md:p-14 rounded-sm max-w-2xl mx-auto text-center"
            >
              <div className="mb-6 flex justify-center">
                <Stars rating={reviews[current].rating} />
              </div>
              <p className="text-lg md:text-xl text-ink-muted font-elegant italic leading-relaxed mb-8">
                &ldquo;{reviews[current].text}&rdquo;
              </p>
              <div className="w-12 h-[1px] bg-gold/30 mx-auto mb-4" aria-hidden="true" />
              <cite className="text-sm font-heading text-gold tracking-wider uppercase not-italic">
                {reviews[current].name}
              </cite>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-10" role="tablist" aria-label="Review navigation">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Review ${i + 1}`}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? 'w-8 h-3 bg-gold'
                  : 'w-3 h-3 bg-ink/10 hover:bg-ink/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
