import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import '@/styles/ParticleField.css'
export const ParticleField: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({
      length: 40,
    }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      color: Math.random() > 0.5 ? '#00d4ff' : '#06fff0',
    }))
  }, [])
  return (
    <div className="particle-field-container">
      {/* Base gradient glows */}
      <div className="particle-glow top-left" />
      <div className="particle-glow bottom-right" />
      <div className="particle-glow center" />

      {/* Grid overlay */}
      <div className="particle-grid" />

      {/* Drifting Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle-dot"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
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
