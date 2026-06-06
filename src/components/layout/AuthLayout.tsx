import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ROUTES } from '@/constants'
import { PageContainerStatic } from './PageContainer'

export const AuthLayout = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.missionControl} replace />
  }

  return <PageContainerStatic><Outlet /></PageContainerStatic>
}
