import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SmokeEffect from './SmokeEffect'

const heroImage = { src: '/niyu-hero-ocean.jpg.PNG', alt: 'NIYU Perfume — Essence of You' }

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.6])

  return (
    <section ref={ref} id="hero" className="relative min-h-[100dvh] overflow-hidden">
      {/* Background Slider with cinematic parallax */}
      <motion.div
        className="absolute top-[6%] -left-[5%] -right-[5%] -bottom-[5%] w-[110%] h-[110%]"
        style={{ scale: bgScale, y: bgY }}
      >
        <motion.img
          src={heroImage.src}
          alt={heroImage.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        />
      </motion.div>

      {/* Cinematic gradient overlays — dark left for text readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-[1]"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent z-[1]" />

      {/* Smoke particles */}
      <SmokeEffect count={3} className="z-[2]" />

      <motion.div
        className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-6 lg:px-12 xl:px-20 pb-8 sm:pb-12 pt-36 sm:pt-40"
        style={{ y: textY }}
      >
        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center">


          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8"
          >
            <a href="#specials" className="btn-luxury">
              <span>Discover the Collection</span>
              <span className="inline-block w-4 h-[1px] bg-gold-light" aria-hidden="true" />
            </a>
          </motion.div>
        </div>


      </motion.div>
    </section>
  )
}
