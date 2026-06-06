import { create } from 'zustand'
import type { AppSettings } from '@/types'
import { normalizeVisualTheme, STORAGE_KEYS } from '@/constants'
import { isAccentColor, MARSHALL_ACCENT_KEY } from '@/utils/accent'

const defaultSettings: AppSettings = {
  accentColor: 'cyan',
  notificationsEnabled: true,
  language: 'en',
  fontSize: 'md',
  colorMode: 'dark',
  visualTheme: 'nexus',
}

const loadSettings = (): AppSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.settings)
    if (!saved) return defaultSettings
    const parsed = JSON.parse(saved) as Partial<AppSettings> & {
      theme?: string
      visualTheme?: string
    }
    const marshallAccent = localStorage.getItem(MARSHALL_ACCENT_KEY)
    const accentColor =
      marshallAccent && isAccentColor(marshallAccent)
        ? marshallAccent
        : parsed.accentColor ?? defaultSettings.accentColor

    return {
      ...defaultSettings,
      ...parsed,
      accentColor,
      visualTheme: normalizeVisualTheme(parsed.visualTheme),
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
      const merged = { ...state.settings, ...partial }
      const settings: AppSettings = {
        ...merged,
        visualTheme: partial.visualTheme
          ? normalizeVisualTheme(partial.visualTheme)
          : merged.visualTheme,
      }
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings))
      if (partial.accentColor) {
        localStorage.setItem(MARSHALL_ACCENT_KEY, settings.accentColor)
      }
      return { settings }
    }),
  resetSettings: () => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(defaultSettings))
    set({ settings: defaultSettings })
  },
}))
