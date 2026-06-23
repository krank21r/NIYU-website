import { useState } from 'react'
import { useCart } from '../context/CartContext'
import RevealUp from './RevealUp'
import attars from '../data/attars'

function AttarItem({ item, index }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart({ ...item, size: null, qty: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <RevealUp delay={index * 80}>
      <div className="group py-5 border-b border-[rgba(38,38,38,0.08)] last:border-b-0 transition-colors duration-300">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <h3 className="font-heading font-bold text-xl text-text-primary group-hover:text-accent transition-colors duration-300">
                {item.type}
              </h3>
              <div className="w-6 h-[1px] bg-accent" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-3">
              <span className="text-xs font-body text-text-secondary">
                {item.bestFor}
              </span>
              <span className="text-xs font-body text-text-tertiary italic">
                {item.fragrance}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-body font-semibold text-text-primary">
                &#8377;{item.price}
              </span>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className={`shrink-0 text-[11px] tracking-[0.08em] uppercase font-body font-medium px-4 py-2 rounded-full transition-all duration-300 min-h-[36px] active:scale-[0.97] ${
              added
                ? 'bg-green-600 text-white'
                : 'border border-accent text-accent hover:bg-accent hover:text-text-primary'
            }`}
          >
            {added ? '\u2713 Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </RevealUp>
  )
}

export default function AttarSection() {
  const { addToCart, setStep } = useCart()

  const handleBuyNow = () => {
    const item = attars[0]
    addToCart({ ...item, size: null, qty: 1 })
    setStep('cart')
  }

  return (
    <section id="attars" className="bg-surface py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealUp>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-body">
              Pure Oils
            </span>
            <div className="w-6 h-[1px] bg-accent" />
          </div>
          <h2 className="font-heading font-black text-[clamp(2rem,6vw,4.5rem)] leading-[0.85] tracking-[-0.03em] text-text-primary mb-4">
            Attar Collection
          </h2>
          <p className="text-base md:text-lg font-body font-light text-text-secondary max-w-xl">
            Pure oil fragrances, crafted for every moment
          </p>
        </RevealUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-16">
          {/* Left — Image */}
          <div className="relative lg:sticky lg:top-32">
            <img
              src="/attar.jpeg"
              alt="NIYU pure attar oil bottle"
              loading="lazy"
              width="800"
              height="1000"
              className="w-full h-auto object-cover rounded-[24px] grayscale-hover"
            />
          </div>

          {/* Right — Content */}
          <div>
            <p className="text-sm font-body text-text-secondary leading-relaxed mb-8 max-w-md">
              Our attars are handcrafted using traditional distillation methods with pure essential oils. Each blend is alcohol-free and designed to linger beautifully on your skin all day.
            </p>

            <div>
              {attars.map((item, i) => (
                <AttarItem key={item.id} item={item} index={i} />
              ))}
            </div>

            <RevealUp delay={attars.length * 80}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
                <button
                  onClick={handleBuyNow}
                  className="bg-accent text-text-primary px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold rounded-full transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
                >
                  Buy Now
                </button>
              </div>
            </RevealUp>
          </div>
        </div>
      </div>
    </section>
  )
}
