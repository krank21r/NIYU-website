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
          className={`w-4 h-4 ${i < rating ? 'text-ink' : 'text-ink/10'}`}
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
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="reviews" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden" aria-label="Customer reviews">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,28,28,0.04)_0%,transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="section-divider origin-center"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ink mb-4">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="border border-ink/5 bg-cream max-w-2xl mx-auto"
            >
              <div className="p-10 md:p-14 text-center">
                <div className="mb-6 flex justify-center">
                  <Stars rating={reviews[current].rating} />
                </div>
                <p className="text-lg md:text-xl text-ink-muted font-elegant italic leading-relaxed mb-8">
                  &ldquo;{reviews[current].text}&rdquo;
                </p>
                <div className="w-12 h-[1px] bg-ink/30 mx-auto mb-4" aria-hidden="true" />
                <cite className="text-sm font-heading text-ink tracking-wider uppercase not-italic">
                  {reviews[current].name}
                </cite>
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12" role="tablist" aria-label="Review navigation">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Review ${i + 1}`}
              className={`transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center ${
                i === current
                  ? 'w-10 h-4 bg-ink'
                  : 'w-4 h-4 bg-ink/10 hover:bg-ink/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
