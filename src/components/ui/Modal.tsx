import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useUiStore } from '@/store'
import { Button } from './Button'

export interface ModalProps {
  id: string
  title: string
  children: ReactNode
}

export const Modal = ({ id, title, children }: ModalProps) => {
  const activeModalId = useUiStore((s) => s.activeModalId)
  const closeModal = useUiStore((s) => s.closeModal)
  const isOpen = activeModalId === id

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ui-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          role="presentation"
        >
          <motion.div
            className="ui-modal-panel clip-angled"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal
            aria-labelledby={`modal-${id}`}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)',
              }}
            >
              <h2
                id={`modal-${id}`}
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                }}
              >
                {title}
              </h2>
              <Button variant="ghost" onClick={closeModal} aria-label="Close modal">
                <X size={16} />
              </Button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
