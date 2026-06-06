export type SimulationStatus = 'running' | 'complete' | 'queued'

export type MetricVariant =
  | 'accent'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'red'
  | 'cyan'

export interface SimulationScenario {
  id: string
  name: string
  status: SimulationStatus
  runId: string
  contentType: string
  platform: string
}

export interface SimulationMetric {
  id: string
  label: string
  value: number
  maxValue: number
  displayValue: string
  confidence: number
  variant: MetricVariant
  meta?: string
}

export interface SimulationCenterData {
  scenario: SimulationScenario
  opportunityScore: SimulationMetric
  predictedViews: SimulationMetric
  predictedRetention: SimulationMetric
  predictedRevenue: SimulationMetric
  competitionScore: SimulationMetric
  copyrightRisk: SimulationMetric
  monetizationScore: SimulationMetric
}
