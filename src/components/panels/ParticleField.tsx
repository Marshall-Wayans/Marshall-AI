import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import '@/styles/ParticleField.css'

export const ParticleField: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      variant: Math.random() > 0.5 ? 1 : 2,
    }))
  }, [])

  return (
    <div className="particle-field-container">
      <div className="particle-glow top-left" />
      <div className="particle-glow bottom-right" />
      <div className="particle-glow center" />

      <div className="particle-hud-ring particle-hud-ring--outer" />
      <div className="particle-hud-ring particle-hud-ring--mid" />
      <div className="particle-hud-ring particle-hud-ring--inner" />
      <div className="particle-scanner" />

      <div className="particle-scanlines" />
      <div className="particle-glitch-pulse" />

      <div className="particle-grid" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`particle-dot particle-dot--${p.variant}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [`${p.y}%`, `${p.y - 10}%`, `${p.y}%`],
            x: [`${p.x}%`, `${p.x + 5}%`, `${p.x}%`],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
