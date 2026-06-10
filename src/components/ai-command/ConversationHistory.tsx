import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ConversationEntry } from '@/store/aiConversationStore'

interface ConversationHistoryProps {
  entries: ConversationEntry[]
}

const roleLabel: Record<ConversationEntry['role'], string> = {
  user: 'CMD',
  ai: 'CORE',
  system: 'SYS',
}

export const ConversationHistory = memo<ConversationHistoryProps>(({ entries }) => (
  <div className="ai-conversation-history">
    <div className="ai-conversation-header">
      <span>MISSION LOG</span>
      <span className="ai-conversation-count">{entries.length}</span>
    </div>
    <div className="ai-conversation-scroll">
      <AnimatePresence initial={false}>
        {entries.length === 0 ? (
          <p className="ai-conversation-empty">Awaiting first directive...</p>
        ) : (
          entries.map((entry) => (
            <motion.div
              key={entry.id}
              className={`ai-conversation-entry role-${entry.role}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="ai-conversation-meta">
                <span className="ai-conversation-role">{roleLabel[entry.role]}</span>
                <span className="ai-conversation-time">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="ai-conversation-text">{entry.text}</p>
              {entry.module && (
                <span className="ai-conversation-module">{entry.module}</span>
              )}
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  </div>
))

ConversationHistory.displayName = 'ConversationHistory'
