import { create } from 'zustand'

interface UiState {
  isGlobalLoading: boolean
  activeModalId: string | null
  sidebarOpen: boolean
  setGlobalLoading: (loading: boolean) => void
  openModal: (id: string) => void
  closeModal: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
  isGlobalLoading: false,
  activeModalId: null,
  sidebarOpen: false,
  setGlobalLoading: (isGlobalLoading) => set({ isGlobalLoading }),
  openModal: (activeModalId) => set({ activeModalId }),
  closeModal: () => set({ activeModalId: null }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}))
