import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Hexagon, Lock, Mail, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ROUTES } from '@/constants'
import { notify } from '@/store'
import '@/styles/Auth.css'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await login(email, password)
      notify('success', 'SESSION', 'Authorization sequence complete.')
      navigate(ROUTES.missionControl)
    } catch (err: any) {
      notify('error', 'AUTH FAILED', err.message || 'Login failed')
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="auth-container">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="auth-card clip-angled"
      >
        <div className="corner-bracket top-left"></div>
        <div className="corner-bracket top-right"></div>
        <div className="corner-bracket bottom-left"></div>
        <div className="corner-bracket bottom-right"></div>

        <div className="auth-header">
          <div className="auth-logo-wrapper">
            <div className="auth-logo-hex">
              <Hexagon size={48} strokeWidth={1} />
            </div>
            <div className="auth-logo-dot animate-pulse" />
          </div>
          <h1 className="auth-title">NEXUS_AI</h1>
          <p className="auth-subtitle">AUTHORIZATION REQUIRED</p>
        </div>

        {error && (
          <div className="auth-alert error">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">CREDENTIAL ID (EMAIL)</label>
            <div className="auth-input-wrapper">
              <Mail className="auth-input-icon" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                placeholder="commander@nexus.ai"
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">SECURITY KEY (PASSWORD)</label>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-submit-btn"
          >
            {isLoading ? (
              <div className="auth-spinner animate-spin" />
            ) : (
              'INITIALIZE SESSION'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <Link to={ROUTES.signup} className="auth-switch-btn">
            NO CLEARANCE? <span>REQUEST ACCESS</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
