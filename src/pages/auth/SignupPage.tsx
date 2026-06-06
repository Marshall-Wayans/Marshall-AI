import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, User, AlertCircle, CheckCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ROUTES } from '@/constants'
import { notify } from '@/store'
import '@/styles/Auth.css'

export const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Security keys do not match')
      return
    }
    setIsLoading(true)
    try {
      await signup(fullName, email, password)
      setSuccess(true)
      notify('success', 'REGISTRY', 'Identity registered successfully.')
      setTimeout(() => {
        navigate(ROUTES.login)
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Registration failed')
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
          <h1 className="auth-title">NEW CLEARANCE</h1>
          <p className="auth-subtitle">REGISTER IDENTITY</p>
        </div>

        {error && (
          <div className="auth-alert error">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        {success && (
          <div className="auth-alert success">
            <CheckCircle size={14} />
            Identity registered. Redirecting to login...
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
          style={{
            gap: '1rem',
          }}
        >
          <div className="auth-form-group">
            <label className="auth-label">DESIGNATION (FULL NAME)</label>
            <div className="auth-input-wrapper">
              <User className="auth-input-icon" size={16} />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="auth-input"
                placeholder="Tony Stark"
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">COMM-LINK (EMAIL)</label>
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

          <div className="auth-form-group">
            <label className="auth-label">VERIFY KEY</label>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" size={16} />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || success}
            className="auth-submit-btn"
            style={{
              marginTop: '0.5rem',
            }}
          >
            {isLoading ? (
              <div className="auth-spinner animate-spin" />
            ) : (
              'ESTABLISH IDENTITY'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <Link to={ROUTES.login} className="auth-switch-btn">
            EXISTING CLEARANCE? <span>AUTHENTICATE</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
