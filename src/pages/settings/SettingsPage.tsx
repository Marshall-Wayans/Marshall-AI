import React from 'react'
import { motion } from 'framer-motion'
import {
  Settings as SettingsIcon,
  Palette,
  Bell,
  Type,
  Monitor,
} from 'lucide-react'
import { useSettingsStore } from '@/store'
import { ACCENT_HEX } from '@/constants'
import { HoloPanel } from '@/components/panels/HoloPanel'
import type { AccentColor, ColorMode, FontSize, VisualTheme } from '@/types'
import '@/styles/Views.css'

export const SettingsPage: React.FC = () => {
  const settings = useSettingsStore((s) => s.settings)
  const updateSettings = useSettingsStore((s) => s.updateSettings)
  const colors = (Object.keys(ACCENT_HEX) as AccentColor[]).map((id) => ({
    id,
    hex: ACCENT_HEX[id],
  }))
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      className="view-container"
    >
      <HoloPanel title="SYSTEM CONFIGURATION" icon={<SettingsIcon size={14} />}>
        <div
          style={{
            padding: 'var(--space-4)',
          }}
        >
          {/* Accent Color */}
          <section className="settings-section">
            <h3 className="settings-section-title">
              <Palette size={14} /> PRIMARY ACCENT
            </h3>
            <div className="settings-color-row">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() =>
                    updateSettings({ accentColor: c.id })
                  }
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
              <div
                style={{
                  position: 'relative',
                }}
              >
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
                    updateSettings({
                      notificationsEnabled: e.target.checked,
                    })
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
              {['sm', 'md', 'lg'].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    updateSettings({ fontSize: size as FontSize })
                  }
                  className={`settings-segment-btn ${settings.fontSize === size ? 'is-active' : ''}`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </section>

          <section className="settings-section">
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

          <section className="settings-section" style={{ marginBottom: 0 }}>
            <h3 className="settings-section-title">
              <Monitor size={14} /> VISUAL THEME
            </h3>
            <div className="settings-segmented-control">
              {(['default', 'cyberpunk', 'jarvis'] as VisualTheme[]).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => updateSettings({ visualTheme: theme })}
                  className={`settings-segment-btn ${settings.visualTheme === theme ? 'is-active' : ''}`}
                >
                  {theme.toUpperCase()}
                </button>
              ))}
            </div>
          </section>
        </div>
      </HoloPanel>
    </motion.div>
  )
}
