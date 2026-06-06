import React, { useState } from 'react'
import { Bell, User, Hexagon, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { NAV_ITEMS, ROUTES } from '@/constants'
import { useNotificationStore, useSystemStore } from '@/store'
import { notify } from '@/store/notificationStore'
import '@/styles/TopNav.css'

export const TopNav: React.FC = () => {
  const [showSystem, setShowSystem] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [legacyAlerts] = useState([1, 2, 3])
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const systemStatus = useSystemStore((s) => s.status)
  const toastItems = useNotificationStore((s) => s.items)
  const clearToasts = useNotificationStore((s) => s.clearAll)

  const handleNavClick = (path: string) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    if (path === ROUTES.missionControl) return location.pathname === '/'
    return location.pathname === path
  }

  return (
    <>
      <nav className="topnav">
        <button
          className="topnav-hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="topnav-logo-wrapper">
          <div className="topnav-logo-icon">
            <div className="topnav-logo-hex">
              <Hexagon size={32} strokeWidth={1} />
            </div>
            <div className="topnav-logo-dot animate-pulse" />
          </div>
          <h1 className="topnav-logo-text mobile-hidden">
            NEXUS<span>_AI</span>
          </h1>
        </div>

        <div className="topnav-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => handleNavClick(item.path)}
              className={`topnav-link ${isActive(item.path) ? 'is-active' : ''}`}
            >
              {item.label}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeNav"
                  className="topnav-link-indicator"
                />
              )}
              <div className="topnav-link-hover-line" />
            </button>
          ))}
        </div>

        <div className="topnav-actions">
          <div className="topnav-dropdown-wrapper mobile-hidden">
            <button
              type="button"
              onClick={() => {
                setShowSystem(!showSystem)
                setShowNotifications(false)
                setShowProfile(false)
              }}
              className="topnav-status-pill clip-angled"
            >
              <div className="topnav-status-dot animate-pulse" />
              <span className="topnav-status-text">{systemStatus.label}</span>
            </button>

            <AnimatePresence>
              {showSystem && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="topnav-dropdown-menu clip-angled"
                >
                  <div className="topnav-dropdown-header">DIAGNOSTICS</div>
                  {systemStatus.metrics.map((metric) => (
                    <div key={metric.label} className="topnav-dropdown-item">
                      <span>{metric.label}</span>
                      <span>
                        {metric.value}
                        {metric.unit ?? ''}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="topnav-dropdown-wrapper">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowSystem(false)
                setShowProfile(false)
              }}
              className="topnav-bell-btn"
            >
              <Bell size={18} />
              {(legacyAlerts.length > 0 || toastItems.length > 0) && (
                <span className="topnav-badge">
                  {legacyAlerts.length + toastItems.length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="topnav-dropdown-menu notifications clip-angled"
                >
                  <div className="topnav-dropdown-header">
                    <span>ALERTS</span>
                    {(legacyAlerts.length > 0 || toastItems.length > 0) && (
                      <button
                        type="button"
                        onClick={() => {
                          clearToasts()
                        }}
                        style={{ fontSize: '8px', color: 'inherit' }}
                      >
                        CLEAR ALL
                      </button>
                    )}
                  </div>
                  {toastItems.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-mono)',
                        color: '#cbd5e1',
                        padding: '4px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      [{n.variant.toUpperCase()}] {n.title}: {n.message}
                    </div>
                  ))}
                  {legacyAlerts.length > 0 ? (
                    legacyAlerts.map((n) => (
                      <div
                        key={n}
                        style={{
                          fontSize: '9px',
                          fontFamily: 'var(--font-mono)',
                          color: '#cbd5e1',
                          padding: '4px 0',
                          borderBottom: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        Priority message {n} received.
                      </div>
                    ))
                  ) : toastItems.length === 0 ? (
                    <div
                      style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-mono)',
                        color: '#64748b',
                        textAlign: 'center',
                        padding: '8px 0',
                      }}
                    >
                      NO NEW ALERTS
                    </div>
                  ) : null}
                  <button
                    type="button"
                    className="topnav-profile-menu-btn"
                    style={{ marginTop: '8px', width: '100%' }}
                    onClick={() =>
                      notify('info', 'SYSTEM', 'Notification channel active.')
                    }
                  >
                    TEST ALERT
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="topnav-profile-section">
            <div className="topnav-profile-info">
              <div className="topnav-profile-name">
                {user?.fullName || 'CMDR. STARK'}
              </div>
              <div className="topnav-profile-role">
                AUTH-LEVEL: {user?.role || 'OMEGA'}
              </div>
            </div>

            <div className="topnav-dropdown-wrapper">
              <button
                type="button"
                onClick={() => {
                  setShowProfile(!showProfile)
                  setShowSystem(false)
                  setShowNotifications(false)
                }}
                className="topnav-avatar-btn"
              >
                <div className="topnav-avatar-circle">
                  {user?.fullName ? (
                    <span
                      style={{
                        fontFamily: 'var(--font-orbitron)',
                        fontSize: '12px',
                      }}
                    >
                      {user.fullName.charAt(0)}
                    </span>
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <div className="topnav-avatar-status" />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="topnav-dropdown-menu clip-angled"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        handleNavClick(ROUTES.profile)
                        setShowProfile(false)
                      }}
                      className="topnav-profile-menu-btn"
                    >
                      PROFILE SETTINGS
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleNavClick(ROUTES.logs)
                        setShowProfile(false)
                      }}
                      className="topnav-profile-menu-btn"
                    >
                      ACCESS LOGS
                    </button>
                    <div className="topnav-divider" />
                    <button
                      type="button"
                      onClick={() => {
                        logout()
                        setShowProfile(false)
                        navigate(ROUTES.login)
                      }}
                      className="topnav-profile-menu-btn danger"
                    >
                      LOGOUT SEQUENCE
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-drawer-overlay"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="mobile-drawer"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  className={`mobile-drawer-link ${isActive(item.path) ? 'is-active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
              <Link
                to={ROUTES.profile}
                className="mobile-drawer-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to={ROUTES.logs}
                className="mobile-drawer-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Logs
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
