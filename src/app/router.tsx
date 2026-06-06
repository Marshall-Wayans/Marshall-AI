import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants'
import {
  MainLayout,
  AuthLayout,
  DashboardLayout,
  MissionControlLayout,
} from '@/components/layout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { AICommandPage } from '@/pages/ai-command/AICommandPage'
import { MissionControlPage } from '@/pages/mission-control/MissionControlPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { SettingsPage } from '@/pages/settings/SettingsPage'
import { LogsPage } from '@/pages/logs/LogsPage'
import { TrendRadarPage } from '@/pages/trend-radar/TrendRadarPage'
import { SimulationCenterPage } from '@/pages/simulation-center/SimulationCenterPage'
import { ApprovalCenterPage } from '@/pages/approval-center/ApprovalCenterPage'
import { AgentCommandPage } from '@/pages/agent-command/AgentCommandPage'
import { ContentLabPage } from '@/pages/content-lab/ContentLabPage'
import { AnalyticsCenterPage } from '@/pages/analytics-center/AnalyticsCenterPage'
import { SecurityCenterPage } from '@/pages/security-center/SecurityCenterPage'
import { useAuth } from '@/contexts/AuthContext'

const RootRedirect = () => {
  const { isAuthenticated } = useAuth()
  return (
    <Navigate
      to={isAuthenticated ? ROUTES.aiCommand : ROUTES.login}
      replace
    />
  )
}

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.signup} element={<SignupPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route element={<MissionControlLayout />}>
          <Route index element={<AICommandPage />} />
        </Route>
        <Route path={ROUTES.missionControl} element={<MissionControlPage />} />
        <Route path={ROUTES.trendRadar} element={<TrendRadarPage />} />
        <Route path={ROUTES.simulationCenter} element={<SimulationCenterPage />} />
        <Route path={ROUTES.approvalCenter} element={<ApprovalCenterPage />} />
        <Route path={ROUTES.agentCommand} element={<AgentCommandPage />} />
        <Route path={ROUTES.contentLab} element={<ContentLabPage />} />
        <Route path={ROUTES.analyticsCenter} element={<AnalyticsCenterPage />} />
        <Route path={ROUTES.securityCenter} element={<SecurityCenterPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route path={ROUTES.settings} element={<SettingsPage />} />
        <Route path={ROUTES.logs} element={<LogsPage />} />
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Route>
  </Routes>
)
