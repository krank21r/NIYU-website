import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

const reviews = [
  { name: 'Ananya Sharma', text: 'Absolutely divine! The Rose Oudh is the most beautiful perfume I have ever owned. It lasts all day and the compliments never stop.', rating: 5 },
  { name: 'Rahul Verma', text: 'Premium quality attars at such fair prices. NIYU has become my go-to for luxury fragrances. The Musk attar is pure magic.', rating: 5 },
  { name: 'Priya Kapoor', text: 'The gift set I ordered was stunning. The packaging, the scents — everything exudes elegance. Will definitely be ordering again.', rating: 5 },
  { name: 'Arjun Mehta', text: 'Discovered NIYU through a friend and I am hooked. The Aqua fragrance is fresh, sophisticated, and incredibly long-lasting.', rating: 5 },
  { name: 'Sneha Patel', text: 'Finally, a brand that delivers true luxury without the hefty price tag. The Cherry Blossom is my new signature scent!', rating: 5 },
]

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-black/10'}`}
          fill={i < rating ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={i < rating ? 0 : 1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)

  const next = useCallback(() => setCurrent(p => (p + 1) % reviews.length), [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="reviews" className="py-12 sm:py-16 px-4 sm:px-6 overflow-hidden bg-surface-soft" aria-label="Customer reviews">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-10"
        >
          <p className="text-label text-gold-dark mb-2">Testimonials</p>
          <h2 className="heading text-2xl sm:text-3xl md:text-4xl text-ink">What Customers Say</h2>
        </motion.div>

        {/* Review card */}
        <div className="relative min-h-[240px] flex items-center justify-center">
          <div className="card max-w-xl mx-auto text-center w-full" role="region" aria-live="polite" aria-label={`Review by ${reviews[current].name}`}>
            <div className="p-8 sm:p-10">
              <div className="mb-4 flex justify-center">
                <Stars rating={reviews[current].rating} />
              </div>
              <p className="text-base sm:text-lg text-ink-soft font-heading italic leading-relaxed mb-6">
                &ldquo;{reviews[current].text}&rdquo;
              </p>
              <div className="w-8 h-[1px] bg-gold mx-auto mb-3" aria-hidden="true" />
              <cite className="text-sm font-body text-ink tracking-wider uppercase not-italic">{reviews[current].name}</cite>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Review navigation">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Review ${i + 1} by ${reviews[i].name}`}
              className="h-2 rounded-full transition-all duration-300 hover:bg-black/20"
              style={{ width: i === current ? 32 : 8, backgroundColor: i === current ? '#c9a96e' : 'rgba(0,0,0,0.1)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
