import type { AgentStatus } from './Agent'

export interface LiveAgent {
  id: string
  name: string
  codename: string
  status: AgentStatus
  specialization: string
  currentTask: string
  activityLevel: number
  lastAction: string
  efficiencyScore: number
  clearanceLevel: number
}
