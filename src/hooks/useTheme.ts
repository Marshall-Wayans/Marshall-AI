import { useEffect } from 'react'
import { ACCENT_HEX, VISUAL_THEME_CLASS } from '@/constants'
import { useSettingsStore } from '@/store'
import { hexToRgb } from '@/utils'

export const useTheme = () => {
  const settings = useSettingsStore((s) => s.settings)

  useEffect(() => {
    const html = document.documentElement
    html.classList.remove('text-sm', 'text-md', 'text-lg')
    html.classList.add(`text-${settings.fontSize}`)

    html.classList.remove('light', 'dark')
    if (settings.colorMode === 'light') html.classList.add('light')
    else if (settings.colorMode === 'dark') html.classList.add('dark')
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      html.classList.add('light')
    }

    Object.values(VISUAL_THEME_CLASS).forEach((cls) => html.classList.remove(cls))
    html.classList.add(VISUAL_THEME_CLASS[settings.visualTheme])

    const hex = ACCENT_HEX[settings.accentColor]
    const rgb = hexToRgb(hex)
    html.style.setProperty('--accent', hex)
    html.style.setProperty('--accent-rgb', rgb)
    html.style.setProperty('--accent-glow', `rgba(${rgb}, 0.25)`)
    html.style.setProperty('--accent-dim', `rgba(${rgb}, 0.08)`)
  }, [settings])

  return settings
}
