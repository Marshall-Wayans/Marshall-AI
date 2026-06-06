import React from 'react'
import { motion } from 'framer-motion'
import {
  Settings as SettingsIcon,
  Palette,
  Bell,
  Type,
  Monitor,
  Sparkles,
} from 'lucide-react'
import { useSettingsStore } from '@/store'
import { THEME_META, THEME_ORDER } from '@/constants'
import { HoloPanel } from '@/components/panels/HoloPanel'
import type { AccentColor, ColorMode, FontSize, VisualTheme } from '@/types'
import {
  ACCENT_COLOR_OPTIONS,
  applyAccentVariables,
  persistAccent,
} from '@/utils/accent'
import '@/styles/Views.css'

const themePreviewClass = (theme: VisualTheme) =>
  `theme-preview-card theme-preview-card--${theme}`

export const SettingsPage: React.FC = () => {
  const settings = useSettingsStore((s) => s.settings)
  const updateSettings = useSettingsStore((s) => s.updateSettings)
  const handleAccentSelect = (accentId: AccentColor) => {
    applyAccentVariables(accentId)
    persistAccent(accentId)
    updateSettings({ accentColor: accentId })
  }

  const handleThemeSelect = (theme: VisualTheme) => {
    const meta = THEME_META[theme]
    updateSettings({
      visualTheme: theme,
      accentColor: meta.defaultAccent,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="view-container"
    >
      <HoloPanel title="SYSTEM CONFIGURATION" icon={<SettingsIcon size={14} />}>
        <div style={{ padding: 'var(--space-4)' }}>
          {/* Theme Preview */}
          <section className="settings-section">
            <h3 className="settings-section-title">
              <Sparkles size={14} /> VISUAL THEME
            </h3>
            <div className="theme-preview-grid">
              {THEME_ORDER.map((theme) => {
                const meta = THEME_META[theme]
                const isActive = settings.visualTheme === theme
                return (
                  <motion.button
                    key={theme}
                    type="button"
                    onClick={() => handleThemeSelect(theme)}
                    className={`${themePreviewClass(theme)} ${isActive ? 'is-active' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    <div className="theme-preview-visual" data-theme-preview={theme}>
                      <div className="theme-preview-glow" />
                      <div className="theme-preview-grid-lines" />
                      <div className="theme-preview-core" />
                      {theme === 'jarvis' && <div className="theme-preview-ring" />}
                      {theme === 'cyberpunk' && <div className="theme-preview-scanlines" />}
                    </div>
                    <div className="theme-preview-info">
                      <span className="theme-preview-name">{meta.name}</span>
                      <div className="theme-preview-palette">
                        {meta.palette.map((swatch) => (
                          <span
                            key={swatch.label}
                            className="theme-preview-swatch"
                            style={{ backgroundColor: swatch.color }}
                            title={swatch.label}
                          />
                        ))}
                      </div>
                      <p className="theme-preview-desc">{meta.description}</p>
                    </div>
                    {isActive && (
                      <motion.div
                        className="theme-preview-active-ring"
                        layoutId="theme-active-ring"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </section>

          {/* Accent Color */}
          <section className="settings-section">
            <h3 className="settings-section-title">
              <Palette size={14} /> PRIMARY ACCENT
            </h3>
            <div className="settings-color-row">
              {ACCENT_COLOR_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleAccentSelect(c.id)}
                  className={`settings-color-btn ${settings.accentColor === c.id ? 'is-active' : ''}`}
                  style={{
                    backgroundColor: c.hex,
                    color: c.hex,
                  }}
                />
              ))}
            </div>
          </section>

          {/* Notifications */}
          <section className="settings-section">
            <h3 className="settings-section-title">
              <Bell size={14} /> ALERTS & NOTIFICATIONS
            </h3>
            <label className="settings-toggle-label">
              <div style={{ position: 'relative' }}>
                <input
                  type="checkbox"
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                  className="settings-toggle-input"
                  checked={settings.notificationsEnabled}
                  onChange={(e) =>
                    updateSettings({ notificationsEnabled: e.target.checked })
                  }
                />
                <div className="settings-toggle-track">
                  <div className="settings-toggle-thumb" />
                </div>
              </div>
              <span className="settings-toggle-text">ENABLE SYSTEM ALERTS</span>
            </label>
          </section>

          {/* Font Size */}
          <section className="settings-section">
            <h3 className="settings-section-title">
              <Type size={14} /> DISPLAY SCALING
            </h3>
            <div className="settings-segmented-control">
              {(['sm', 'md', 'lg'] as FontSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => updateSettings({ fontSize: size })}
                  className={`settings-segment-btn ${settings.fontSize === size ? 'is-active' : ''}`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </section>

          <section className="settings-section" style={{ marginBottom: 0 }}>
            <h3 className="settings-section-title">
              <Monitor size={14} /> COLOR MODE
            </h3>
            <div className="settings-segmented-control">
              {(['dark', 'light', 'system'] as ColorMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => updateSettings({ colorMode: mode })}
                  className={`settings-segment-btn ${settings.colorMode === mode ? 'is-active' : ''}`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </section>
        </div>
      </HoloPanel>
    </motion.div>
  )
}
