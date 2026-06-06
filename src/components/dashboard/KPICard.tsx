import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import '@/styles/Dashboard.css'

interface KPICardProps {
  label: string
  value: string
  change?: number
  unit?: string
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  change,
  unit,
}) => {
  const isPositive = change !== undefined && change >= 0
  return (
    <motion.div
      className="dash-kpi-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span className="dash-kpi-label">{label}</span>
      <div className="dash-kpi-value-row">
        <span className="dash-kpi-value">
          {unit === '$' && unit}
          {value}
          {unit && unit !== '$' && (
            <span className="dash-kpi-unit">{unit}</span>
          )}
        </span>
        {change !== undefined && (
          <span
            className={`dash-kpi-change ${isPositive ? 'is-up' : 'is-down'}`}
          >
            {isPositive ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {isPositive ? '+' : ''}
            {change}%
          </span>
        )}
      </div>
    </motion.div>
  )
}
