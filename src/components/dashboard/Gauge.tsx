import React from 'react'
import { motion } from 'framer-motion'
import '@/styles/Dashboard.css'

interface GaugeProps {
  value: number
  max?: number
  label: string
  size?: 'sm' | 'md' | 'lg'
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  max = 100,
  label,
  size = 'md',
}) => {
  const pct = Math.min(100, (value / max) * 100)
  const circumference = 2 * Math.PI * 42
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className={`dash-gauge dash-gauge--${size}`}>
      <svg viewBox="0 0 100 100" className="dash-gauge-svg">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth="6"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          transform="rotate(-90 50 50)"
          style={{ filter: 'drop-shadow(0 0 4px var(--accent-glow))' }}
        />
      </svg>
      <div className="dash-gauge-center">
        <span className="dash-gauge-value">{Math.round(value)}</span>
        {max !== 100 && (
          <span className="dash-gauge-max">/{max}</span>
        )}
      </div>
      <span className="dash-gauge-label">{label}</span>
    </div>
  )
}
