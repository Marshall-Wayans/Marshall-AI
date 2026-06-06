import React from 'react'
import { motion } from 'framer-motion'
import {
  Globe,
  Target,
  Eye,
  Clock,
  DollarSign,
  Swords,
  ShieldAlert,
  Coins,
  Activity,
} from 'lucide-react'
import { HoloPanel } from '@/components/panels/HoloPanel'
import { Card } from '@/components/ui/Card'
import { HolographicCard } from '@/components/ui/HolographicCard'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { SIMULATION_CENTER_MOCK } from '@/constants/simulationCenterMock'
import type { SimulationMetric, SimulationStatus } from '@/types/SimulationCenter'
import '@/styles/Views.css'
import '@/styles/SimulationCenter.css'

const scenarioStatusMap: Record<
  SimulationStatus,
  'nominal' | 'warning' | 'error' | 'offline'
> = {
  complete: 'nominal',
  running: 'warning',
  queued: 'offline',
}

const scenarioStatusLabel: Record<SimulationStatus, string> = {
  complete: 'SIMULATION COMPLETE',
  running: 'SIMULATION RUNNING',
  queued: 'QUEUED',
}

interface MetricCardProps {
  metric: SimulationMetric
  icon: React.ReactNode
  delay?: number
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, icon, delay = 0 }) => {
  const fillPercent = Math.round((metric.value / metric.maxValue) * 100)

  return (
    <HolographicCard>
      <Card className="simulation-center-metric-card">
        <div className="simulation-center-metric-header">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
          >
            <span style={{ color: 'var(--accent)', opacity: 0.7 }}>{icon}</span>
            <span className="simulation-center-metric-label">{metric.label}</span>
          </div>
          <span className="simulation-center-metric-confidence">
            CONF {metric.confidence}%
          </span>
        </div>

        <motion.div
          className={`simulation-center-metric-value is-${metric.variant}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {metric.displayValue}
        </motion.div>

        <div className="simulation-center-metric-bar-track">
          <motion.div
            className={`simulation-center-metric-bar-fill is-${metric.variant}`}
            initial={{ width: 0 }}
            animate={{ width: `${fillPercent}%` }}
            transition={{ duration: 0.9, delay: delay + 0.1, ease: 'easeOut' }}
          />
        </div>

        <div className="simulation-center-metric-footer">
          <span className="simulation-center-metric-meta">{metric.meta}</span>
          <span className="simulation-center-metric-percent">{fillPercent}%</span>
        </div>
      </Card>
    </HolographicCard>
  )
}

export const SimulationCenterPage: React.FC = () => {
  const data = SIMULATION_CENTER_MOCK
  const { scenario } = data

  const performanceMetrics: { metric: SimulationMetric; icon: React.ReactNode }[] = [
    { metric: data.opportunityScore, icon: <Target size={12} /> },
    { metric: data.predictedViews, icon: <Eye size={12} /> },
    { metric: data.predictedRetention, icon: <Clock size={12} /> },
    { metric: data.predictedRevenue, icon: <DollarSign size={12} /> },
  ]

  const riskMetrics: { metric: SimulationMetric; icon: React.ReactNode }[] = [
    { metric: data.competitionScore, icon: <Swords size={12} /> },
    { metric: data.copyrightRisk, icon: <ShieldAlert size={12} /> },
    { metric: data.monetizationScore, icon: <Coins size={12} /> },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="view-container"
    >
      <div className="view-grid">
        <div className="view-col-2">
          <HoloPanel
            title="SIMULATION OUTPUT"
            icon={<Activity size={14} />}
            color="blue"
          >
            <div className="simulation-center-scenario">
              <div className="simulation-center-scenario-name">
                {scenario.name}
              </div>
              <div className="simulation-center-scenario-meta">
                <span>RUN ID · {scenario.runId}</span>
                <span>
                  {scenario.contentType} · {scenario.platform}
                </span>
              </div>
              <StatusIndicator
                label={scenarioStatusLabel[scenario.status]}
                status={scenarioStatusMap[scenario.status]}
              />
            </div>

            <div className="simulation-center-metrics-grid simulation-center-metrics-grid--primary">
              {performanceMetrics.map(({ metric, icon }, index) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  icon={icon}
                  delay={index * 0.08}
                />
              ))}
            </div>
          </HoloPanel>
        </div>

        <div className="view-col-1 simulation-center-stack">
          <HoloPanel
            title="QUANTUM SIMULATION ENGINE"
            icon={<Globe size={14} />}
          >
            <div className="simulation-center-engine">
              <div className="simulation-center-pulse-ring">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Globe size={72} className="simulation-center-globe" />
                </motion.div>
              </div>
              <p className="simulation-center-engine-status">
                ENVIRONMENT ACTIVE · PARAMETERS LOCKED
              </p>
            </div>
          </HoloPanel>

          <HoloPanel
            title="RISK & MARKET SIGNALS"
            icon={<ShieldAlert size={14} />}
            color="magenta"
          >
            <div className="simulation-center-metrics-grid">
              {riskMetrics.map(({ metric, icon }, index) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  icon={icon}
                  delay={0.35 + index * 0.08}
                />
              ))}
            </div>
          </HoloPanel>
        </div>
      </div>
    </motion.div>
  )
}
