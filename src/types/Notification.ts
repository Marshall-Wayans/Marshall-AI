export type NotificationVariant = 'success' | 'warning' | 'error' | 'info'

export interface Notification {
  id: string
  title: string
  message: string
  variant: NotificationVariant
  createdAt: number
  durationMs?: number
}
