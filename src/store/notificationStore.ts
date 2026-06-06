import { create } from 'zustand'
import type { Notification, NotificationVariant } from '@/types'

interface NotificationState {
  items: Notification[]
  push: (payload: Omit<Notification, 'id' | 'createdAt'>) => string
  dismiss: (id: string) => void
  clearAll: () => void
}

const createId = () => Math.random().toString(36).slice(2, 11)

export const useNotificationStore = create<NotificationState>((set) => ({
  items: [],
  push: ({ title, message, variant, durationMs = 5000 }) => {
    const id = createId()
    const notification: Notification = {
      id,
      title,
      message,
      variant,
      createdAt: Date.now(),
      durationMs,
    }
    set((state) => ({ items: [notification, ...state.items].slice(0, 8) }))
    if (durationMs > 0) {
      window.setTimeout(() => {
        set((state) => ({
          items: state.items.filter((n) => n.id !== id),
        }))
      }, durationMs)
    }
    return id
  },
  dismiss: (id) =>
    set((state) => ({
      items: state.items.filter((n) => n.id !== id),
    })),
  clearAll: () => set({ items: [] }),
}))

export const notify = (
  variant: NotificationVariant,
  title: string,
  message: string,
) => useNotificationStore.getState().push({ title, message, variant })
