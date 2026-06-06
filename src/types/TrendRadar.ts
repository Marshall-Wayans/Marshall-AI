export type TrendLevel = 'low' | 'medium' | 'high' | 'critical'

export type VelocityDirection = 'rising' | 'stable' | 'declining'

export interface TrendingTopic {
  id: string
  name: string
  category: string
  volume: number
  changePercent: number
  rank: number
}

export interface TrendVelocity {
  id: string
  topicName: string
  velocity: number
  direction: VelocityDirection
  peakWindow: string
}

export interface CompetitionLevel {
  id: string
  topicName: string
  level: TrendLevel
  competitorCount: number
  saturationIndex: number
}

export interface GrowthPotential {
  id: string
  topicName: string
  score: number
  timeframe: string
  confidence: number
}

export interface HeatMapCell {
  row: number
  col: number
  intensity: number
  label?: string
}

export interface TrendHeatMap {
  rows: number
  cols: number
  cells: HeatMapCell[]
}

export interface TrendRadarData {
  trendingTopics: TrendingTopic[]
  trendVelocities: TrendVelocity[]
  competitionLevels: CompetitionLevel[]
  growthPotentials: GrowthPotential[]
  heatMap: TrendHeatMap
}
