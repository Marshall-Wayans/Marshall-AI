export type SystemHealth = 'nominal' | 'degraded' | 'critical' | 'offline'

export interface SystemMetric {
  label: string
  value: string
  unit?: string
}

export interface SystemStatus {
  health: SystemHealth
  label: string
  uptimePercent: number
  metrics: SystemMetric[]
  lastCheckedAt: number
}
