import React from 'react'
import { motion } from 'framer-motion'
import '@/styles/Dashboard.css'

interface MiniChartProps {
  data: number[]
  height?: number
}

export const MiniChart: React.FC<MiniChartProps> = ({ data, height = 48 }) => {
  const max = Math.max(...data, 1)
  return (
    <div className="dash-mini-chart" style={{ height }}>
      {data.map((v, i) => (
        <motion.div
          key={i}
          className="dash-mini-chart-bar"
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  )
}
