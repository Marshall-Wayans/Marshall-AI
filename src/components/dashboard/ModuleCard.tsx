import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { DashboardModule } from '@/types/DashboardModule'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import '@/styles/Dashboard.css'

const statusMap: Record<
  DashboardModule['status'],
  'nominal' | 'warning' | 'error' | 'offline'
> = {
  operational: 'nominal',
  active: 'nominal',
  standby: 'warning',
  maintenance: 'warning',
  offline: 'offline',
}

interface ModuleCardProps {
  module: DashboardModule
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const navigate = useNavigate()
  const Icon = module.icon
  const disabled = !module.enabled

  return (
    <motion.button
      type="button"
      className={`dash-module-card ${disabled ? 'is-disabled' : ''}`}
      onClick={() => !disabled && navigate(module.route)}
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
    >
      <div className="dash-module-icon">
        <Icon size={20} />
      </div>
      <div className="dash-module-info">
        <span className="dash-module-name">{module.name}</span>
        <StatusIndicator
          status={statusMap[module.status]}
          label={module.status.toUpperCase()}
        />
      </div>
      {module.comingSoon && (
        <span className="dash-module-badge">SOON</span>
      )}
    </motion.button>
  )
}
