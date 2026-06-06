export interface AnalyticsMetric {
  id: string
  label: string
  value: number
  unit: string
  change: number
  history: number[]
}

export interface AnalyticsSnapshot {
  views: AnalyticsMetric
  watchTime: AnalyticsMetric
  subscribers: AnalyticsMetric
  revenue: AnalyticsMetric
  ctr: AnalyticsMetric
  retention: AnalyticsMetric
}
