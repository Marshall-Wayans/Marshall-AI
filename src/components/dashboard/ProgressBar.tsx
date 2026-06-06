import React from 'react'
import { motion } from 'framer-motion'
import '@/styles/Dashboard.css'

interface ProgressBarProps {
  value: number
  label?: string
  showValue?: boolean
  variant?: 'default' | 'velocity' | 'risk'
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValue = true,
  variant = 'default',
}) => (
  <div className="dash-progress">
    {(label || showValue) && (
      <div className="dash-progress-header">
        {label && <span className="dash-progress-label">{label}</span>}
        {showValue && (
          <span className="dash-progress-value">{Math.round(value)}%</span>
        )}
      </div>
    )}
    <div className={`dash-progress-track dash-progress-track--${variant}`}>
      <motion.div
        className="dash-progress-fill"
        animate={{ width: `${Math.min(100, value)}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  </div>
)
