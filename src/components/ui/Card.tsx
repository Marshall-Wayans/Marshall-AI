import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Card = ({ className, children, ...props }: CardProps) => (
  <div className={cn('ui-card clip-angled', className)} {...props}>
    {children}
  </div>
)
