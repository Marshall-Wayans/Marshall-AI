import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Shield, Save, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { HoloPanel } from '@/components/panels/HoloPanel'
import { notify } from '@/store'
import '@/styles/Views.css'

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.fullName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      updateProfile({
        fullName: name,
        email,
      })
      setIsSaving(false)
      setSaved(true)
      notify('success', 'PROFILE', 'Parameters updated successfully.')
      setTimeout(() => setSaved(false), 3000)
    }, 800)
  }
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
      <div className="view-grid">
        {/* Left Column: Identity Card */}
        <div className="view-col-1">
          <HoloPanel title="IDENTITY MATRIX" icon={<User size={14} />}>
            <div className="profile-identity">
              <div className="profile-avatar-circle">
                <span className="profile-avatar-text">{name.charAt(0)}</span>
              </div>
              <h2 className="profile-name">{name}</h2>
              <p className="profile-role">AUTH: {user?.role}</p>

              <div className="profile-stats">
                <div className="profile-stat-row">
                  <div className="profile-stat-label">STATUS</div>
                  <div className="profile-stat-value active">
                    <div
                      className="initializing-dot animate-pulse"
                      style={{
                        width: '8px',
                        height: '8px',
                      }}
                    />{' '}
                    ACTIVE
                  </div>
                </div>
                <div className="profile-stat-row">
                  <div className="profile-stat-label">LAST SYNC</div>
                  <div className="profile-stat-value">
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </HoloPanel>
        </div>

        {/* Right Column: Edit Form */}
        <div className="view-col-2">
          <HoloPanel title="MODIFY PARAMETERS" icon={<Shield size={14} />}>
            <form onSubmit={handleSave} className="view-form">
              <div className="auth-form-group">
                <label className="auth-label">DESIGNATION (FULL NAME)</label>
                <div className="auth-input-wrapper">
                  <User className="auth-input-icon" size={16} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">COMM-LINK (EMAIL)</label>
                <div className="auth-input-wrapper">
                  <Mail className="auth-input-icon" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="view-form-section">
                <h3 className="view-form-section-title">SECURITY PROTOCOLS</h3>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <input
                    type="password"
                    placeholder="CURRENT SECURITY KEY"
                    className="auth-input"
                    style={{
                      paddingLeft: '1rem',
                    }}
                  />
                  <input
                    type="password"
                    placeholder="NEW SECURITY KEY"
                    className="auth-input"
                    style={{
                      paddingLeft: '1rem',
                    }}
                  />
                </div>
              </div>

              <div className="view-form-actions">
                <button type="submit" disabled={isSaving} className="view-btn">
                  {isSaving ? (
                    <div className="auth-spinner animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {isSaving ? 'UPDATING...' : 'SAVE CHANGES'}
                </button>

                {saved && (
                  <span className="view-success-msg">
                    <CheckCircle size={14} /> PARAMETERS UPDATED
                  </span>
                )}
              </div>
            </form>
          </HoloPanel>
        </div>
      </div>
    </motion.div>
  )
}
