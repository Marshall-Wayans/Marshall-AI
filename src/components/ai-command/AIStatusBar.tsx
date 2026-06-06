import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { useSimulationStore } from '@/store/simulationStore'
import type { CoreState } from './AICoreSphere'

interface AIStatusBarProps {
  state: CoreState
}

export const AIStatusBar = memo<AIStatusBarProps>(({ state }) => {
  const mission = useSimulationStore((s) => s.mission)
  const security = useSimulationStore((s) => s.security)

  const neuralActivity = Math.round(mission.aiCorePulse)
  const processingLoad =
    state === 'THINKING' ? 85 : state === 'SPEAKING' ? 72 : state === 'LISTENING' ? 45 : 22
  const latency = state === 'IDLE' ? 12 : state === 'THINKING' ? 48 : 24

  const items = [
    { label: 'NEURAL', value: `${neuralActivity}%` },
    { label: 'LOAD', value: `${processingLoad}%` },
    { label: 'HEALTH', value: `${mission.systemHealth}%` },
    { label: 'LATENCY', value: `${latency}ms` },
    { label: 'SECURITY', value: security.defconLabel },
    { label: 'READY', value: mission.aiCoreStatus.toUpperCase() },
  ]

  return (
    <div className="ai-status-bar">
      {items.map((item) => (
        <div key={item.label} className="ai-status-item">
          <span className="ai-status-label">{item.label}</span>
          <motion.span
            className="ai-status-value"
            key={item.value}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          >
            {item.value}
          </motion.span>
        </div>
      ))}
    </div>
  )
})

AIStatusBar.displayName = 'AIStatusBar'
