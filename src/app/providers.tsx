import type { ReactNode } from 'react'
import { LogsProvider } from '@/contexts/LogsContext'
import { AuthProvider } from '@/contexts/AuthContext'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <LogsProvider>
    <AuthProvider>{children}</AuthProvider>
  </LogsProvider>
)
