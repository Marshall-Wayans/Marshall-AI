import { Outlet } from 'react-router-dom'
import { ParticleField } from '@/components/panels/ParticleField'
import { GlobalNotificationArea } from '@/components/notifications'
import { LoadingOverlay } from '@/components/ui'
import { GlobalModalHost } from '@/app/GlobalModalHost'
import { useSimulationEngine } from '@/hooks/useSimulationEngine'

export const MainLayout = () => {
  useSimulationEngine()
  return (
  <div className="app-container">
    <ParticleField />
    <Outlet />
    <GlobalNotificationArea />
    <GlobalModalHost />
    <LoadingOverlay />
  </div>
  )
}
