import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function GoldSparkle() {
  const { size, left, top, driftY, duration, delay } = useMemo(() => ({
    size: 3 + Math.random() * 6,
    left: `${10 + Math.random() * 80}%`,
    top: `${5 + Math.random() * 90}%`,
    driftY: -40 - Math.random() * 30,
    duration: 3 + Math.random() * 3,
    delay: Math.random() * 4,
  }), [])

  return (
    <motion.div
      className="absolute rounded-full z-[3]"
      style={{
        left,
        top,
        width: `${size}px`,
        height: `${size}px`,
        background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(212,175,55,0.7) 40%, transparent 100%)',
        boxShadow: `0 0 ${size * 3}px rgba(212,175,55,0.5), 0 0 ${size * 6}px rgba(212,175,55,0.2)`,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.3, 1.5, 0.3],
        y: [0, driftY, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: [0.32, 0.72, 0, 1],
      }}
    />
  )
}

function FloatingPetal({ index }) {
  const { startX, size, duration, delay } = useMemo(() => ({
    startX: 10 + Math.random() * 80,
    size: 10 + Math.random() * 18,
    duration: 10 + Math.random() * 6,
    delay: Math.random() * 8,
  }), [])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        top: '-5%',
        width: `${size}px`,
        height: `${size * 1.4}px`,
      }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, Math.sin(index) * 80, Math.cos(index) * 50, 0],
        rotate: [0, 180, 360],
        opacity: [0, 0.35, 0.35, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      <div
        className="w-full h-full rounded-[50%_50%_50%_0%] bg-gradient-to-br from-white/50 to-gold-light/30"
        style={{ transform: 'rotate(45deg)', boxShadow: '0 0 8px rgba(212,175,55,0.15)' }}
      />
    </motion.div>
  )
}

function LightRay({ index }) {
  const angle = -30 + index * 15
  const delay = index * 0.8

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: '-20%',
        right: `${10 + index * 12}%`,
        width: '2px',
        height: '140%',
        background: 'linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 50%, transparent 100%)',
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'top center',
      }}
      animate={{
        opacity: [0, 0.6, 0.3, 0.6, 0],
      }}
      transition={{
        duration: 6 + Math.random() * 3,
        repeat: Infinity,
        delay,
        ease: [0.32, 0.72, 0, 1],
      }}
    />
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.6])
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 2])

  return (
    <section ref={ref} id="hero" className="relative min-h-[100dvh] overflow-hidden">
      {/* Background Image with cinematic parallax */}
      <motion.div
        className="absolute inset-[-5%] w-[110%] h-[110%]"
        style={{ scale: bgScale, y: bgY, rotate: bgRotate }}
      >
        <motion.img
          src="/hero-bg.png"
          alt="NIYU luxury perfume bottle"
          width="1920"
          height="1080"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          initial={{ scale: 1.1, filter: 'blur(8px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: [0.32, 0.72, 0, 1] }}
        />
      </motion.div>

      {/* Light rays from top-right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
        {[0, 1, 2, 3].map((i) => (
          <LightRay key={i} index={i} />
        ))}
      </div>

      {/* Floating gold sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
        {Array.from({ length: 18 }, (_, i) => (
          <GoldSparkle key={i} index={i} />
        ))}
      </div>

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
        {Array.from({ length: 8 }, (_, i) => (
          <FloatingPetal key={i} index={i} />
        ))}
      </div>

      {/* Ambient glow pulse behind bottle area */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: [0.32, 0.72, 0, 1],
        }}
      />

      {/* Cinematic gradient overlays — behind motion elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-ivory/60 via-ivory/15 to-transparent z-[1]"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/40 via-transparent to-ivory/5 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-transparent to-transparent z-[1]" />

      <motion.div
        className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-6 lg:px-12 xl:px-20 pb-8 sm:pb-12 pt-36 sm:pt-40"
        style={{ y: textY }}
      >
        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal/5 border border-charcoal/8 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-ink-muted font-body font-medium">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-gold"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              Pure Oils. Pure Luxury.
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, delay: 1, ease: [0.32, 0.72, 0, 1] }}
            className="sr-only"
          >
            NIYU Perfumes — Pure Oils, Pure Luxury
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-ink-soft font-heading max-w-2xl leading-relaxed mb-4"
          >
            A fragrance that blooms with you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 1.4, ease: [0.32, 0.72, 0, 1] }}
            className="text-sm sm:text-base md:text-lg text-ink-muted font-body font-light max-w-xl leading-relaxed"
          >
            Delicate yet unforgettable.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1.7, ease: [0.32, 0.72, 0, 1] }}
            className="mt-8 sm:mt-10 w-16 sm:w-20 h-[1px] bg-gradient-to-r from-gold to-transparent origin-left"
          />
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.32, 0.72, 0, 1] }}
          className="relative z-20"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-ink-muted font-body font-semibold">
              NIYU
            </span>
            <span className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-ink-subtle font-body">
              PURE OILS. PURE LUXURY.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
