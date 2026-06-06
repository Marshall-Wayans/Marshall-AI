import React, { useEffect, useState, createContext, useContext } from 'react'
import type { Log, LogType } from '@/types'
import { STORAGE_KEYS } from '@/constants'

export type LogEntry = Log

interface LogsContextType {
  logs: Log[]
  addLog: (type: LogType, description: string) => void
  clearLogs: () => void
}
const LogsContext = createContext<LogsContextType | undefined>(undefined)
export const LogsProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [logs, setLogs] = useState<Log[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.logs)
    return saved ? JSON.parse(saved) : []
  })
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(logs))
  }, [logs])
  const addLog = (type: LogType, description: string) => {
    const newLog: Log = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      type,
      description,
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`, // Mock IP
    }
    setLogs((prev) => [newLog, ...prev])
  }
  const clearLogs = () => setLogs([])
  return (
    <LogsContext.Provider
      value={{
        logs,
        addLog,
        clearLogs,
      }}
    >
      {children}
    </LogsContext.Provider>
  )
}
export const useLogs = () => {
  const context = useContext(LogsContext)
  if (!context) throw new Error('useLogs must be used within LogsProvider')
  return context
}
