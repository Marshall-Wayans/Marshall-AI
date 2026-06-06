import { motion } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'
import { HoloPanel } from '@/components/panels/HoloPanel'
import { KPICard, Gauge } from '@/components/dashboard'
import { useSimulationStore } from '@/store/simulationStore'
import '@/styles/Dashboard.css'
import '@/styles/Views.css'

const severityColor = {
  info: 'var(--text-dim)',
  warning: 'var(--accent)',
  critical: 'var(--nexus-red)',
}

export const SecurityCenterPage = () => {
  const security = useSimulationStore((s) => s.security)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="view-container"
    >
      <div className="mc-kpi-row" style={{ marginBottom: 'var(--space-6)' }}>
        <KPICard label="THREAT LEVEL" value={security.defconLabel} />
        <KPICard label="ACTIVE ALERTS" value={String(security.activeAlerts)} />
        <KPICard
          label="BLOCKED ATTEMPTS"
          value={String(security.blockedAttempts)}
        />
        <KPICard
          label="SYSTEM HEALTH"
          value={String(security.systemHealth)}
          unit="%"
        />
      </div>

      <div className="view-grid">
        <div className="view-col-1">
          <HoloPanel
            title="THREAT OPS CONSOLE"
            color="magenta"
            icon={<ShieldAlert size={14} />}
          >
            <div
              style={{
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ShieldAlert
                size={64}
                style={{ color: 'var(--accent)', marginBottom: 'var(--space-4)' }}
                className="animate-pulse"
              />
              <div
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'var(--text-3xl)',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                }}
              >
                {security.defconLabel}
              </div>
              <Gauge
                value={security.systemHealth}
                label="INTEGRITY"
                size="md"
              />
            </div>
          </HoloPanel>
        </div>
        <div className="view-col-2">
          <HoloPanel title="SECURITY EVENT LOG" color="red">
            <div style={{ padding: 'var(--space-4)' }}>
              {security.events.map((evt) => (
                <div key={evt.id} className="dash-activity-item">
                  <div className="dash-activity-body">
                    <p
                      className="dash-activity-message"
                      style={{ color: severityColor[evt.severity] }}
                    >
                      [{evt.type.toUpperCase()}] {evt.message}
                    </p>
                    <span className="dash-activity-meta">
                      {new Date(evt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </HoloPanel>
        </div>
      </div>
    </motion.div>
  )
}
