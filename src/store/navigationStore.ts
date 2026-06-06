import { create } from 'zustand'
import { ROUTES } from '@/constants'

interface NavigationState {
  lastVisitedPath: string
  breadcrumbs: string[]
  setLastVisitedPath: (path: string) => void
  setBreadcrumbs: (crumbs: string[]) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  lastVisitedPath: ROUTES.missionControl,
  breadcrumbs: ['Mission Control'],
  setLastVisitedPath: (lastVisitedPath) => set({ lastVisitedPath }),
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}))
