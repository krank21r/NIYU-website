import RevealUp from './RevealUp'

const items = [
  {
    image: '/category-perfume.webp',
    category: 'Perfumes',
    title: 'Signature Collection',
    tags: 'Long-lasting · Alcohol-based · Unisex',
  },
  {
    image: '/category-attar.webp',
    category: 'Attars',
    title: 'Pure Attar Range',
    tags: 'Alcohol-free · Traditional · Concentrated',
  },
  {
    image: '/hero-perfume-branded.png',
    category: 'Car Perfumes',
    title: 'Drive in Elegance',
    tags: 'Essential oils · Premium · Long-lasting',
  },
  {
    image: '/Perfumes ss.png',
    category: 'Gift Sets',
    title: 'Curated Collections',
    tags: 'Handpacked · Gift-wrapped · Customizable',
  },
]

export default function PortfolioGrid() {
  return (
    <section className="bg-surface py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealUp>
          <h2 className="font-heading font-black text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-[-0.03em] text-text-primary mb-4">
            Our Collection
          </h2>
          <p className="text-base md:text-lg font-body font-light text-text-secondary max-w-xl mb-16 md:mb-20">
            Explore our curated range of handcrafted fragrances.
          </p>
        </RevealUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
          {items.map((item, i) => (
            <RevealUp key={item.title} delay={i * 100}>
              <div
                className={`portfolio-card group ${i % 2 === 1 ? 'md:translate-y-[100px]' : ''}`}
              >
                {/* Image container — 3:4 aspect ratio */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-hover"
                    loading="lazy"
                  />
                  {/* Hover overlay: centered 96px black circle with white text */}
                  <div className="portfolio-overlay absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
                      <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold font-body">
                        View Case
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-2 font-body">
                  {item.category}
                </p>
                <h3 className="font-heading font-bold text-3xl mb-1 text-text-primary">
                  {item.title}
                </h3>
                <p className="text-sm font-body text-text-tertiary">
                  {item.tags}
                </p>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </section>
  )
}
