import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Panel = ({ className, children, ...props }: PanelProps) => (
  <div className={cn('ui-panel', className)} {...props}>
    {children}
  </div>
)
