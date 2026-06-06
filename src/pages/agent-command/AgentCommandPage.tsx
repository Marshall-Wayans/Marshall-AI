import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'
import { HoloPanel } from '@/components/panels/HoloPanel'
import { Gauge, ProgressBar } from '@/components/dashboard'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { useSimulationStore } from '@/store/simulationStore'
import type { AgentStatus } from '@/types/Agent'
import '@/styles/Dashboard.css'
import '@/styles/Views.css'

const statusMap: Record<AgentStatus, 'nominal' | 'warning' | 'error' | 'offline'> = {
  active: 'nominal',
  busy: 'warning',
  idle: 'offline',
  offline: 'offline',
  error: 'error',
}

export const AgentCommandPage = () => {
  const agents = useSimulationStore((s) => s.agents)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="view-container"
    >
      <HoloPanel title="AGENT FLEET COMMAND" icon={<Bot size={14} />}>
        <div style={{ padding: 'var(--space-4)' }}>
          {agents.map((agent) => (
            <div key={agent.id} className="dash-agent-row">
              <div style={{ minWidth: 140 }}>
                <div className="dash-agent-name">{agent.codename}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {agent.name}
                </div>
              </div>
              <StatusIndicator
                status={statusMap[agent.status]}
                label={agent.status.toUpperCase()}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="dash-agent-task">{agent.currentTask}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'var(--text-muted)',
                    marginTop: 2,
                  }}
                >
                  Last: {agent.lastAction}
                </div>
                <ProgressBar
                  value={agent.activityLevel}
                  label="ACTIVITY"
                  variant="velocity"
                />
              </div>
              <div style={{ width: 80, textAlign: 'center' }}>
                <Gauge
                  value={agent.efficiencyScore}
                  label="EFF"
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </HoloPanel>
    </motion.div>
  )
}
