import { useTheme } from '@/hooks'

/** Applies theme tokens from Zustand settings to the document root */
export const ThemeApplicator = () => {
  useTheme()
  return null
}
