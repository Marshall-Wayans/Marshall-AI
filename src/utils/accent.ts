import { ACCENT_HEX } from '@/constants'
import type { AccentColor } from '@/types'
import { hexToRgb } from './color'

export const MARSHALL_ACCENT_KEY = 'marshall-accent'

const ACCENT_ORDER: AccentColor[] = [
  'cyan',
  'blue',
  'purple',
  'magenta',
  'red',
  'gold',
  'green',
]

export const isAccentColor = (value: string): value is AccentColor =>
  value in ACCENT_HEX

export const ACCENT_COLOR_OPTIONS = ACCENT_ORDER.map((id) => ({
  id,
  hex: ACCENT_HEX[id],
}))

/** Apply all accent CSS custom properties to the document root. */
export const applyAccentVariables = (accentId: AccentColor): void => {
  const hex = ACCENT_HEX[accentId]
  const rgb = hexToRgb(hex)
  const html = document.documentElement

  html.style.setProperty('--accent', hex)
  html.style.setProperty('--accent-rgb', rgb)
  html.style.setProperty('--accent-dim', `rgba(${rgb}, 0.15)`)
  html.style.setProperty('--accent-glow', `rgba(${rgb}, 0.4)`)
  html.style.setProperty('--accent-border', `rgba(${rgb}, 0.5)`)
  html.style.setProperty('--accent-strong', `rgba(${rgb}, 0.8)`)
  html.style.setProperty('--border-accent', `rgba(${rgb}, 0.5)`)
  html.style.setProperty('--chart-fill', hex)
  html.style.setProperty('--gauge-fill', hex)
  html.style.setProperty('--avatar-core-glow', `rgba(${rgb}, 0.45)`)
}

export const persistAccent = (accentId: AccentColor): void => {
  localStorage.setItem(MARSHALL_ACCENT_KEY, accentId)
}

export const loadAccentId = (): AccentColor | null => {
  const saved = localStorage.getItem(MARSHALL_ACCENT_KEY)
  return saved && isAccentColor(saved) ? saved : null
}

/** Load persisted accent and apply CSS variables before first paint. */
export const initAccentFromStorage = (): void => {
  const accentId = loadAccentId() ?? 'cyan'
  applyAccentVariables(accentId)
}
