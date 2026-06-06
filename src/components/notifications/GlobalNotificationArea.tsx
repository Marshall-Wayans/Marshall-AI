import { AnimatePresence } from 'framer-motion'
import { useNotificationStore } from '@/store'
import { NotificationToast } from './NotificationToast'

export const GlobalNotificationArea = () => {
  const items = useNotificationStore((s) => s.items)

  return (
    <div className="ui-toast-stack" aria-live="polite" aria-label="Notifications">
      <AnimatePresence mode="popLayout">
        {items.map((notification) => (
          <NotificationToast key={notification.id} notification={notification} />
        ))}
      </AnimatePresence>
    </div>
  )
}
