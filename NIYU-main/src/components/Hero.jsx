export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-8 md:px-16 lg:px-24 pt-[120px] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/document_6185746714427661630.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto flex items-center gap-16 z-10">
        <div className="flex-1">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              PURE OILS · PURE LUXURY
            </span>
          </div>

          <h1 className="font-heading font-black tracking-[-0.03em] leading-[0.8] text-[clamp(3rem,15vw,10rem)] text-white max-w-4xl">
            DISCOVER<br />
            LUXURY<br />
            <span className="italic text-accent lowercase">perfumes</span>
          </h1>

          <p className="text-2xl text-white/70 font-light tracking-wide max-w-md mb-10 mt-8">
            Handcrafted fragrances for those who demand the extraordinary.
          </p>

          <a
            href="#specials"
            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] font-bold border-b-2 border-accent pb-1 text-white hover:text-accent transition-colors duration-300"
          >
            EXPLORE COLLECTION
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
