import RevealUp from './RevealUp'

const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'Handmade Inspired Perfumes',
    desc: 'At NIYU, every fragrance is lovingly crafted by hand. We draw inspiration from nature, traditions, and emotions to create perfumes and attars that feel personal, soulful, and timeless.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75M9 6h1.5M12 6h1.5M15 6h1.5m-6 3h1.5m-1.5 3h1.5" />
      </svg>
    ),
    title: 'Affordable Luxury Concept',
    desc: "Luxury shouldn't be out of reach. NIYU brings premium, chemical-free perfumes and attars to everyone who values elegance and purity.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.183" />
      </svg>
    ),
    title: 'Quality Fragrance Promise',
    desc: 'We promise uncompromising quality in every drop. Using pure oils, alcohol bases, and eco-friendly methods, NIYU ensures long-lasting scents that are safe, natural, and memorable.',
  },
]

export default function ServicesGrid() {
  return (
    <section className="bg-surface-secondary py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealUp>
          <h2 className="font-heading font-black text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-[-0.03em] text-text-primary mb-4">
            Why NIYU
          </h2>
          <p className="text-base md:text-lg font-body font-light text-text-secondary max-w-xl mb-16 md:mb-20">
            Craftsmanship, purity, and an unwavering commitment to quality.
          </p>
        </RevealUp>

        {/* 3-column grid separated by 1px borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(38,38,38,0.08)]">
          {services.map((service, i) => (
            <RevealUp key={service.title} delay={i * 100}>
              <div className="service-card bg-surface p-8 md:p-10">
                <div className="service-icon text-accent mb-6 transition-colors duration-400" style={{transitionTimingFunction: 'var(--ease-premium)'}}>
                  {service.icon}
                </div>
                <h3 className="service-title font-heading font-bold text-xl uppercase tracking-wide mb-3 transition-colors duration-400" style={{transitionTimingFunction: 'var(--ease-premium)'}}>
                  {service.title}
                </h3>
                <p className="service-desc service-text font-body text-sm leading-relaxed text-text-secondary transition-colors duration-400" style={{transitionTimingFunction: 'var(--ease-premium)'}}>
                  {service.desc}
                </p>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </section>
  )
}
