import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ActivityEvent } from '@/types/MissionControl'
import '@/styles/Dashboard.css'

const typeIcon: Record<ActivityEvent['type'], string> = {
  agent: '◈',
  approval: '⬡',
  security: '⬢',
  trend: '◎',
  content: '◇',
  system: '●',
}

interface ActivityFeedProps {
  events: ActivityEvent[]
  max?: number
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  events,
  max = 8,
}) => {
  const items = events.slice(0, max)
  return (
    <div className="dash-activity-feed">
      <AnimatePresence initial={false}>
        {items.map((evt) => (
          <motion.div
            key={evt.id}
            className="dash-activity-item"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`dash-activity-icon type-${evt.type}`}>
              {typeIcon[evt.type]}
            </span>
            <div className="dash-activity-body">
              <p className="dash-activity-message">{evt.message}</p>
              <span className="dash-activity-meta">
                {evt.module} · {formatTime(evt.timestamp)}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

const formatTime = (ts: number) => {
  const diff = Date.now() - ts
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  return `${Math.floor(diff / 3600000)}h ago`
}
