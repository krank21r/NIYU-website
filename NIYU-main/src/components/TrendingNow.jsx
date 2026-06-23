import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { getTrendingProducts } from '../data/products'
import RevealUp from './RevealUp'

const products = getTrendingProducts()

const tagMap = {
  'Bestseller': 'bg-accent text-text-primary',
  'Trending': 'bg-text-primary text-white',
  'Fresh Pick': 'bg-accent-light text-text-primary',
  "Editor's Choice": 'bg-surface-tertiary text-text-primary',
  'New Arrival': 'bg-accent text-white',
}

export default function TrendingNow() {
  const { openProductDetail } = useCart()
  const { toggleWishlist, isWished } = useWishlist()

  return (
    <section className="bg-surface py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealUp>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-body">
              Curated Selection
            </span>
            <span className="block h-[1px] bg-accent/40 flex-1 max-w-[80px]" />
          </div>
          <h2 className="font-heading font-black text-[clamp(2rem,6vw,4.5rem)] leading-[0.85] tracking-[-0.03em] text-text-primary mb-4">
            Trending Now
          </h2>
          <p className="text-base md:text-lg font-body font-light text-text-secondary max-w-xl mb-16 md:mb-20">
            Our most sought-after fragrances, curated for those who demand the extraordinary.
          </p>
        </RevealUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product, i) => (
            <RevealUp key={product.id} delay={i * 80}>
              <div className="group flex flex-col h-full">
                {/* Image container */}
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-surface-secondary rounded-[16px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 md:p-6 grayscale-hover"
                    loading="lazy"
                  />

                  {/* Wishlist heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                    className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] active:scale-[0.95] hover:bg-white"
                    aria-label={isWished(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <svg
                      className={`w-4 h-4 transition-colors duration-300 ${isWished(product.id) ? 'text-red-500' : 'text-text-tertiary group-hover:text-text-secondary'}`}
                      fill={isWished(product.id) ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>

                  {/* Tag badge */}
                  {product.tag && (
                    <span className={`absolute top-2 left-2 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] font-body rounded-full ${tagMap[product.tag] || 'bg-accent text-text-primary'}`}>
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1">
                  <div className="w-6 h-[1px] bg-accent mb-3 transition-all duration-400 group-hover:w-10" style={{transitionTimingFunction: 'var(--ease-premium)'}} />
                  <h3 className="font-heading font-bold text-base md:text-lg text-text-primary mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-3">
                    {product.sizes.map((s) => (
                      <span key={s.label} className="text-[11px] font-body text-text-tertiary">
                        {s.label} &#8377;{s.price}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-2">
                    <button
                      onClick={() => openProductDetail(product)}
                      className="w-full py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] font-body text-text-secondary hover:text-accent border border-text-secondary/20 hover:border-accent rounded-full transition-all duration-300"
                      style={{transitionTimingFunction: 'var(--ease-premium)'}}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </section>
  )
}
