import type { HTMLAttributes } from 'react'
import { cn } from '@/utils'

export interface StatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  status?: 'nominal' | 'warning' | 'error' | 'offline'
}

export const StatusIndicator = ({
  label,
  status = 'nominal',
  className,
  ...props
}: StatusIndicatorProps) => (
  <div
    className={cn(
      'ui-status',
      status === 'warning' && 'ui-status--warning',
      status === 'error' && 'ui-status--error',
      status === 'offline' && 'ui-status--offline',
      className,
    )}
    {...props}
  >
    <span className="ui-status-dot animate-pulse" />
    <span>{label}</span>
  </div>
)
