import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

export interface GlowingBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const GlowingBorder = ({
  className,
  children,
  ...props
}: GlowingBorderProps) => (
  <div className={cn('ui-glow-border clip-angled', className)} {...props}>
    {children}
  </div>
)
