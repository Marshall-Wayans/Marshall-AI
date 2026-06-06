import { motion } from 'framer-motion'
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import type { Notification } from '@/types'
import { useNotificationStore } from '@/store'

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
}

interface NotificationToastProps {
  notification: Notification
}

export const NotificationToast = ({ notification }: NotificationToastProps) => {
  const dismiss = useNotificationStore((s) => s.dismiss)
  const Icon = icons[notification.variant]

  return (
    <motion.div
      layout
      className={`ui-toast ui-toast--${notification.variant}`}
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ duration: 0.28 }}
    >
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
        <Icon size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
        <div style={{ flex: 1 }}>
          <div className="ui-toast-title">{notification.title}</div>
          <div className="ui-toast-message">{notification.message}</div>
        </div>
        <button
          type="button"
          onClick={() => dismiss(notification.id)}
          aria-label="Dismiss notification"
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
        >
          <X size={12} />
        </button>
      </div>
    </motion.div>
  )
}
