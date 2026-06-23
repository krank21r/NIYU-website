import { useState } from 'react'
import { useCart } from '../context/CartContext'
import RevealUp from './RevealUp'
import categories from '../data/carPerfumes'

function CarItem({ item }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart({ ...item, size: null, qty: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b border-text-primary/5 last:border-b-0">
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-bold text-base text-text-primary">
          {item.name}
        </h4>
        <p className="text-[11px] font-body text-text-tertiary mt-0.5 leading-relaxed line-clamp-1">
          {item.notes.join(' · ')}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="font-heading font-bold text-sm text-text-primary whitespace-nowrap">
          &#8377;{item.price}
        </span>
        <button
          onClick={handleAdd}
          className={`text-[10px] font-bold uppercase tracking-[0.25em] font-body rounded-full transition-all duration-300 px-4 py-1.5 min-w-[5rem] text-center ${
            added
              ? 'bg-accent text-text-primary'
              : 'text-text-secondary border border-text-secondary/20 hover:bg-accent hover:text-text-primary hover:border-accent'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-premium)' }}
        >
          {added ? 'Added' : 'Add'}
        </button>
      </div>
    </div>
  )
}

export default function CarPerfumes() {
  return (
    <section id="car-perfumes" className="bg-surface-secondary py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <RevealUp>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-body">
              Scent Your Journey
            </span>
            <span className="block h-[1px] bg-accent/40 flex-1 max-w-[80px]" />
          </div>
          <h2 className="font-heading font-black text-[clamp(2rem,6vw,4.5rem)] leading-[0.85] tracking-[-0.03em] text-text-primary">
            NIYU Aero Drive
          </h2>
          <p className="text-base md:text-lg font-body font-light text-text-secondary max-w-xl mt-4 mb-16 md:mb-20">
            Scent your journey — drive in elegance, arrive in style.
          </p>
        </RevealUp>

        {/* 2-column editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-16">
          {/* LEFT — Image */}
          <div className="lg:sticky lg:top-32">
            <img
              src="/Car images.jpeg"
              alt="NIYU Aero Drive — luxury car fragrance bottle on dashboard"
              loading="lazy"
              width="800"
              height="1000"
              className="w-full h-auto object-cover rounded-[24px] grayscale-hover"
            />
          </div>

          {/* RIGHT — Category groups */}
          <div>
            <p className="text-sm md:text-base font-body text-text-secondary leading-relaxed mb-12 max-w-lg">
              Transform every drive into a luxurious experience. Our Aero Drive collection spans four distinct families — find your signature scent.
            </p>

            {/* Category accordion */}
            <div className="space-y-6">
              {categories.map((cat) => (
                <CategoryGroup key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryGroup({ category }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-text-primary/5 rounded-[16px] bg-surface overflow-hidden transition-all duration-400"
      style={{ transitionTimingFunction: 'var(--ease-premium)' }}
    >
      {/* Category header — clickable toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <div>
          <h3 className="font-heading font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-xs font-body text-text-tertiary mt-0.5">{category.description}</p>
        </div>
        <svg
          className={`w-5 h-5 text-text-secondary transition-transform duration-400 flex-shrink-0 ml-4 ${open ? 'rotate-45' : ''}`}
          style={{ transitionTimingFunction: 'var(--ease-premium)' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Expandable items */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[var(--ease-premium)] ${
          open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 pt-1 border-t border-text-primary/5">
          {category.items.map((item) => (
            <CarItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
