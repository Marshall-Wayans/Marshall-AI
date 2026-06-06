import type { LucideIcon } from 'lucide-react'

export type DashboardModuleStatus =
  | 'operational'
  | 'active'
  | 'standby'
  | 'maintenance'
  | 'offline'

export interface DashboardModule {
  id: string
  name: string
  description: string
  status: DashboardModuleStatus
  icon: LucideIcon
  route: string
  enabled: boolean
  comingSoon: boolean
}
