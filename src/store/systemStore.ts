import { create } from 'zustand'
import type { SystemStatus } from '@/types'

const placeholderStatus: SystemStatus = {
  health: 'nominal',
  label: 'SYSTEM NOMINAL',
  uptimePercent: 99.9,
  lastCheckedAt: Date.now(),
  metrics: [
    { label: 'CORE TEMP', value: '42', unit: '°C' },
    { label: 'MEMORY', value: '12.4', unit: 'TB' },
    { label: 'UPLINK', value: '99.9', unit: '%' },
  ],
}

interface SystemState {
  status: SystemStatus
  syncPercent: number
  setStatus: (status: Partial<SystemStatus>) => void
}

export const useSystemStore = create<SystemState>((set) => ({
  status: placeholderStatus,
  syncPercent: 99.9,
  setStatus: (partial) =>
    set((state) => ({
      status: { ...state.status, ...partial },
    })),
}))
