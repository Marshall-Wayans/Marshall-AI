import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

export interface HolographicCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const HolographicCard = ({
  className,
  children,
  ...props
}: HolographicCardProps) => (
  <div className={cn('ui-holo-card clip-angled', className)} {...props}>
    <div className="corner-bracket top-left" />
    <div className="corner-bracket top-right" />
    <div className="corner-bracket bottom-left" />
    <div className="corner-bracket bottom-right" />
    {children}
  </div>
)
