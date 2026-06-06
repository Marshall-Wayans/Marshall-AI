export type AccentColor = 'cyan' | 'blue' | 'purple' | 'magenta' | 'red'
export type FontSize = 'sm' | 'md' | 'lg'
export type ColorMode = 'dark' | 'light' | 'system'
export type VisualTheme = 'default' | 'cyberpunk' | 'jarvis'

export interface AppSettings {
  accentColor: AccentColor
  notificationsEnabled: boolean
  language: string
  fontSize: FontSize
  colorMode: ColorMode
  visualTheme: VisualTheme
}
