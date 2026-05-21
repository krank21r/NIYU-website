import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen h-screen overflow-hidden">
      {/* Background Image with parallax zoom */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <img
          src="/hero-bg.png"
          alt="NIYU Aqua Rush perfume with dramatic ocean wave"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        />
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#010A1A]/70 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#010A1A]/50 via-transparent to-[#010A1A]/20" />

      <motion.div
        className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-12 xl:px-20 pb-10 pt-32"
        style={{ y: textY }}
      >
        {/* Watermark text — left side, vertically centered */}
        <div className="absolute left-6 lg:left-12 xl:left-20 top-[30%] select-none pointer-events-none">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
            className="hero-watermark-text text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-heading font-black leading-[1.05] tracking-[-0.02em] uppercase"
          >
            WAVE
            <br />
            POWER
            <br />
            MOTION
            <br />
            ENERGY
          </motion.p>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative z-20"
        >
          <div className="flex items-center gap-3">
            <span className="text-[11px] md:text-xs tracking-[0.45em] uppercase text-white/80 font-body font-semibold">
              STRONG INTENSITY
            </span>
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.7)]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
