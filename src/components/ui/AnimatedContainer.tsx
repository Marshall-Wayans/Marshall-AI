import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

const pageMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export interface AnimatedContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode
}

export const AnimatedContainer = ({
  children,
  ...props
}: AnimatedContainerProps) => (
  <motion.div
    initial={pageMotion.initial}
    animate={pageMotion.animate}
    exit={pageMotion.exit}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    {...props}
  >
    {children}
  </motion.div>
)
