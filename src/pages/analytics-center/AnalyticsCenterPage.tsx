import { motion } from 'framer-motion'
import { BarChart2 } from 'lucide-react'
import { HoloPanel } from '@/components/panels/HoloPanel'
import { KPICard, MiniChart } from '@/components/dashboard'
import { useSimulationStore } from '@/store/simulationStore'
import '@/styles/Dashboard.css'
import '@/styles/Views.css'

const formatValue = (value: number, unit: string) => {
  if (unit === '$') return value.toLocaleString()
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
  return String(value)
}

export const AnalyticsCenterPage = () => {
  const analytics = useSimulationStore((s) => s.analytics)
  const metrics = [
    analytics.views,
    analytics.watchTime,
    analytics.subscribers,
    analytics.revenue,
    analytics.ctr,
    analytics.retention,
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="view-container"
    >
      <div
        className="mc-kpi-row"
        style={{ marginBottom: 'var(--space-6)' }}
      >
        {metrics.map((m) => (
          <KPICard
            key={m.id}
            label={m.label}
            value={formatValue(m.value, m.unit)}
            unit={m.unit === '%' ? '%' : m.unit === 'hrs' ? 'hrs' : undefined}
            change={m.change}
          />
        ))}
      </div>

      <div className="view-grid">
        <div className="view-col-2">
          <HoloPanel title="PERFORMANCE TRENDS" icon={<BarChart2 size={14} />}>
            <div
              style={{
                padding: 'var(--space-6)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-6)',
              }}
            >
              {metrics.map((m) => (
                <div key={m.id}>
                  <div
                    style={{
                      fontFamily: 'var(--font-orbitron)',
                      fontSize: '9px',
                      color: 'var(--text-dim)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {m.label}
                  </div>
                  <MiniChart data={m.history} height={64} />
                </div>
              ))}
            </div>
          </HoloPanel>
        </div>
        <div className="view-col-1">
          <HoloPanel title="AGENT PERFORMANCE" color="blue">
            <div style={{ padding: 'var(--space-4)' }}>
              {['ORACLE', 'VECTOR', 'METRIC', 'SENTINEL'].map((name, i) => (
                <div key={name} className="dash-pipeline-item">
                  <span className="dash-pipeline-title">{name}</span>
                  <MiniChart
                    data={Array.from({ length: 8 }, (_, j) =>
                      70 + Math.sin(j + i) * 15
                    )}
                    height={32}
                  />
                </div>
              ))}
            </div>
          </HoloPanel>
          <HoloPanel title="SYSTEM LOAD" color="purple">
            <div style={{ padding: 'var(--space-4)' }}>
              <MiniChart
                data={[42, 55, 48, 62, 58, 71, 65, 59, 68, 72, 64, 58]}
                height={80}
              />
            </div>
          </HoloPanel>
        </div>
      </div>
    </motion.div>
  )
}
