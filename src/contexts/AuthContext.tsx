import React, { useEffect, useState, createContext, useContext } from 'react'
import type { User } from '@/types'
import { STORAGE_KEYS } from '@/constants'
import { useLogs } from './LogsContext'

export type { User }
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, pass: string) => Promise<void>
  signup: (fullName: string, email: string, pass: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)
export const AuthProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.user)
    return saved ? JSON.parse(saved) : null
  })
  const { addLog } = useLogs()
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.user)
    }
  }, [user])
  const login = async (email: string, pass: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    const usersStr = localStorage.getItem(STORAGE_KEYS.users)
    const users = usersStr ? JSON.parse(usersStr) : []
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === pass,
    )
    if (!foundUser) {
      addLog('AUTH', `Failed login attempt for ${email}`)
      throw new Error('Invalid credentials')
    }
    const { password, ...userData } = foundUser
    setUser(userData)
    addLog('AUTH', `User ${userData.fullName} logged in successfully`)
  }
  const signup = async (fullName: string, email: string, pass: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const usersStr = localStorage.getItem(STORAGE_KEYS.users)
    const users = usersStr ? JSON.parse(usersStr) : []
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Email already in use')
    }
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      fullName,
      email,
      password: pass,
      role: 'COMMANDER',
    }
    users.push(newUser)
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users))
    addLog('USER', `New user registered: ${email}`)
  }
  const logout = () => {
    if (user) addLog('AUTH', `User ${user.fullName} logged out`)
    setUser(null)
  }
  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null
      const updated = {
        ...prev,
        ...data,
      }
      // Update in users array too
      const usersStr = localStorage.getItem(STORAGE_KEYS.users)
      if (usersStr) {
        let users = JSON.parse(usersStr)
        users = users.map((u: any) =>
          u.id === updated.id
            ? {
                ...u,
                ...data,
              }
            : u,
        )
        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users))
      }
      addLog('USER', `Profile updated for ${updated.fullName}`)
      return updated
    })
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
