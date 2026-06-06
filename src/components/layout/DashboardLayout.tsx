import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ROUTES } from '@/constants'
import { TopNav } from '@/components/navigation/TopNav'
import { CommandRibbon } from '@/components/navigation/CommandRibbon'
import { PageContainer } from './PageContainer'

export const DashboardLayout = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />
  }

  return (
    <>
      <TopNav />
      <CommandRibbon />
      <PageContainer />
    </>
  )
}

export const DashboardLayoutShell = () => (
  <>
    <TopNav />
    <PageContainer />
  </>
)
