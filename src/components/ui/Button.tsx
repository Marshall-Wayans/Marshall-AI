import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost'
  children: ReactNode
}

export const Button = ({
  variant = 'default',
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={cn(
      'ui-btn',
      variant === 'primary' && 'ui-btn--primary',
      variant === 'ghost' && 'ui-btn--ghost',
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
