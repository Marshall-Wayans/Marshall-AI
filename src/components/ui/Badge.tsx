import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export const Badge = ({ className, children, ...props }: BadgeProps) => (
  <span className={cn('ui-badge', className)} {...props}>
    {children}
  </span>
)
