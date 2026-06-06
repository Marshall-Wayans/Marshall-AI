export type LogType = 'AUTH' | 'SYSTEM' | 'SECURITY' | 'USER'

export interface Log {
  id: string
  timestamp: number
  type: LogType
  description: string
  ip: string
}
