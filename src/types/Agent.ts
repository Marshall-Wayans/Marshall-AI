export type AgentStatus = 'idle' | 'active' | 'busy' | 'offline' | 'error'

export interface Agent {
  id: string
  name: string
  codename: string
  status: AgentStatus
  specialization: string
  lastActiveAt: number
  clearanceLevel: number
}
