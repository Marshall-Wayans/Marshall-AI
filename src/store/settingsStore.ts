import { create } from 'zustand'
import type { AppSettings } from '@/types'
import { STORAGE_KEYS } from '@/constants'

const defaultSettings: AppSettings = {
  accentColor: 'cyan',
  notificationsEnabled: true,
  language: 'en',
  fontSize: 'md',
  colorMode: 'dark',
  visualTheme: 'default',
}

const loadSettings = (): AppSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.settings)
    if (!saved) return defaultSettings
    const parsed = JSON.parse(saved) as Partial<AppSettings> & { theme?: string }
    return {
      ...defaultSettings,
      ...parsed,
      colorMode:
        (parsed.colorMode as AppSettings['colorMode']) ??
        (parsed.theme as AppSettings['colorMode']) ??
        defaultSettings.colorMode,
    }
  } catch {
    return defaultSettings
  }
}

interface SettingsState {
  settings: AppSettings
  updateSettings: (partial: Partial<AppSettings>) => void
  resetSettings: () => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: loadSettings(),
  updateSettings: (partial) =>
    set((state) => {
      const settings = { ...state.settings, ...partial }
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings))
      return { settings }
    }),
  resetSettings: () => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(defaultSettings))
    set({ settings: defaultSettings })
  },
}))
