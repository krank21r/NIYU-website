import { motion } from 'framer-motion'

const smokeVariants = {
  animate: (i) => ({
    opacity: [0, 0.2, 0.1, 0],
    y: [0, -80, -160],
    x: [0, i % 2 === 0 ? 30 : -30, i % 2 === 0 ? 60 : -60],
    scale: [1, 1.5, 2.5],
    transition: {
      duration: 8,
      repeat: Infinity,
      delay: i * 1.2,
      ease: "easeOut",
    },
  }),
}

export default function SmokeEffect({ count = 5 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            width: `${100 + i * 40}px`,
            height: `${100 + i * 40}px`,
            background: `radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, rgba(139,115,85,0.04) 40%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          custom={i}
          variants={smokeVariants}
          animate="animate"
        />
      ))}
    </div>
  )
}
