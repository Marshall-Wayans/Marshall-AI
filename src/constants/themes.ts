import type { AccentColor, VisualTheme } from '@/types'

export const ACCENT_HEX: Record<AccentColor, string> = {
  cyan: '#06fff0',
  blue: '#00d4ff',
  purple: '#a855f7',
  magenta: '#ff00ea',
  red: '#ff003c',
}

export const VISUAL_THEME_CLASS: Record<VisualTheme, string> = {
  default: 'theme-default',
  cyberpunk: 'theme-cyberpunk',
  jarvis: 'theme-jarvis',
}

export const STORAGE_KEYS = {
  settings: 'nexus_settings',
  user: 'nexus_current_user',
  users: 'nexus_users',
  logs: 'nexus_logs',
} as const
