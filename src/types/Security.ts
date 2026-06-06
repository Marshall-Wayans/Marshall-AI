export type ThreatLevel = 1 | 2 | 3 | 4 | 5

export type SecurityEventType =
  | 'login'
  | 'approval'
  | 'audit'
  | 'alert'
  | 'scan'

export interface SecurityEvent {
  id: string
  type: SecurityEventType
  message: string
  timestamp: number
  severity: 'info' | 'warning' | 'critical'
}

export interface SecuritySnapshot {
  threatLevel: ThreatLevel
  defconLabel: string
  activeAlerts: number
  blockedAttempts: number
  systemHealth: number
  events: SecurityEvent[]
}
