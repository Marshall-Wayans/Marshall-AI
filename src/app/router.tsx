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
import { MissionControlPage } from '@/pages/mission-control/MissionControlPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { SettingsPage } from '@/pages/settings/SettingsPage'
import { LogsPage } from '@/pages/logs/LogsPage'
import {
  TrendRadarView,
  SimulationCenterView,
  ContentLabView,
  AnalyticsCenterView,
  SecurityCenterView,
} from '@/pages/modules/ModulePages'
import { useAuth } from '@/contexts/AuthContext'

const RootRedirect = () => {
  const { isAuthenticated } = useAuth()
  return (
    <Navigate
      to={isAuthenticated ? ROUTES.missionControl : ROUTES.login}
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
          <Route index element={<MissionControlPage />} />
        </Route>
        <Route path={ROUTES.trendRadar} element={<TrendRadarView />} />
        <Route path={ROUTES.simulationCenter} element={<SimulationCenterView />} />
        <Route path={ROUTES.contentLab} element={<ContentLabView />} />
        <Route path={ROUTES.analyticsCenter} element={<AnalyticsCenterView />} />
        <Route path={ROUTES.securityCenter} element={<SecurityCenterView />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route path={ROUTES.settings} element={<SettingsPage />} />
        <Route path={ROUTES.logs} element={<LogsPage />} />
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Route>
  </Routes>
)
