import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AIResponsePanelProps {
  displayedText: string
  isStreaming: boolean
  isComplete: boolean
  visible: boolean
}

export const AIResponsePanel = memo<AIResponsePanelProps>(
  ({ displayedText, isStreaming, isComplete, visible }) => (
    <AnimatePresence>
      {visible && displayedText && (
        <motion.div
          className="ai-response-panel"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <div className="ai-response-panel-header">
            <span className="ai-response-panel-label">NEURAL OUTPUT</span>
            {isStreaming && !isComplete && (
              <span className="ai-response-streaming">STREAMING</span>
            )}
            {isComplete && <span className="ai-response-complete">✓ COMPLETE</span>}
          </div>
          <div className="ai-response-panel-body">
            <span className="ai-response-prefix">&gt;&gt;</span>
            <span className="ai-response-text">{displayedText}</span>
            {(isStreaming || !isComplete) && (
              <span className="ai-response-cursor" aria-hidden />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
)

AIResponsePanel.displayName = 'AIResponsePanel'
