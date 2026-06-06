export type ActivityType =
  | 'agent'
  | 'approval'
  | 'security'
  | 'trend'
  | 'content'
  | 'system'

export interface ActivityEvent {
  id: string
  type: ActivityType
  message: string
  timestamp: number
  module: string
}

export interface MissionSnapshot {
  aiCoreStatus: 'online' | 'processing' | 'standby'
  aiCorePulse: number
  activeModules: number
  totalModules: number
  pendingApprovals: number
  securityLevel: number
  systemHealth: number
  activityFeed: ActivityEvent[]
}
