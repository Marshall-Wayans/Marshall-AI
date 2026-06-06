import { useEffect } from 'react'
import { normalizeVisualTheme, VISUAL_THEME_CLASS } from '@/constants'
import { useSettingsStore } from '@/store'
import { applyAccentVariables, persistAccent } from '@/utils/accent'

export const useTheme = () => {
  const settings = useSettingsStore((s) => s.settings)

  useEffect(() => {
    const html = document.documentElement
    const theme = normalizeVisualTheme(settings.visualTheme)

    html.classList.remove('text-sm', 'text-md', 'text-lg')
    html.classList.add(`text-${settings.fontSize}`)

    html.classList.remove('light', 'dark')
    if (settings.colorMode === 'light') html.classList.add('light')
    else if (settings.colorMode === 'dark') html.classList.add('dark')
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      html.classList.add('light')
    }

    Object.values(VISUAL_THEME_CLASS).forEach((cls) => html.classList.remove(cls))
    html.classList.add(VISUAL_THEME_CLASS[theme])
    html.setAttribute('data-theme', theme)

    applyAccentVariables(settings.accentColor)
    persistAccent(settings.accentColor)

    html.classList.add('theme-transitioning')
    const timer = window.setTimeout(() => {
      html.classList.remove('theme-transitioning')
    }, 600)
    return () => window.clearTimeout(timer)
  }, [settings])

  return settings
}
