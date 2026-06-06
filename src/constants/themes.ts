import type { AccentColor, VisualTheme } from '@/types'

export const ACCENT_HEX: Record<AccentColor, string> = {
  cyan: '#00D4C8',
  blue: '#0099FF',
  purple: '#8855FF',
  magenta: '#FF00AA',
  red: '#CC2222',
  gold: '#FFB800',
  green: '#00FF88',
}

/** @deprecated Use data-theme attribute. Kept for backward compatibility. */
export const VISUAL_THEME_CLASS: Record<VisualTheme, string> = {
  nexus: 'theme-nexus',
  cyberpunk: 'theme-cyberpunk',
  jarvis: 'theme-jarvis',
}

export const THEME_ORDER: VisualTheme[] = ['nexus', 'jarvis', 'cyberpunk']

export interface ThemeMeta {
  id: VisualTheme
  name: string
  description: string
  palette: { label: string; color: string }[]
  defaultAccent: AccentColor
}

export const THEME_META: Record<VisualTheme, ThemeMeta> = {
  nexus: {
    id: 'nexus',
    name: 'NEXUS',
    description:
      'Premium AI research lab aesthetic — clean glassmorphism, soft teal glow, and holographic panels.',
    palette: [
      { label: 'Primary', color: '#00D4FF' },
      { label: 'Secondary', color: '#00FFCC' },
      { label: 'Glow', color: '#00F5FF' },
    ],
    defaultAccent: 'blue',
  },
  jarvis: {
    id: 'jarvis',
    name: 'JARVIS',
    description:
      'Iron Man command lab — arc reactor energy, red-orange-gold HUD, and cinematic targeting systems.',
    palette: [
      { label: 'Primary', color: '#FF4500' },
      { label: 'Secondary', color: '#FFA500' },
      { label: 'Glow', color: '#FFD700' },
    ],
    defaultAccent: 'red',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'CYBERPUNK',
    description:
      'Night City neon rebellion — magenta pulses, digital scanlines, and glitch distortion.',
    palette: [
      { label: 'Primary', color: '#FF0080' },
      { label: 'Secondary', color: '#A000FF' },
      { label: 'Accent', color: '#00FFFF' },
    ],
    defaultAccent: 'magenta',
  },
}

export const STORAGE_KEYS = {
  settings: 'nexus_settings',
  user: 'nexus_current_user',
  users: 'nexus_users',
  logs: 'nexus_logs',
} as const

/** Migrate legacy 'default' theme value to 'nexus'. */
export const normalizeVisualTheme = (theme: string | undefined): VisualTheme => {
  if (theme === 'default' || theme === 'nexus') return 'nexus'
  if (theme === 'cyberpunk' || theme === 'jarvis') return theme
  return 'nexus'
}
