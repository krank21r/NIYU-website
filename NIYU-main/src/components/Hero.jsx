export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden" aria-label="Hero banner">
      <div className="relative h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px]">
        {/* Background image */}
        <img
          src="/nw hero.png"
          alt="NIYU Aqua — Pure Oils, Pure Luxury"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
