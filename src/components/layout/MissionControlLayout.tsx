import { Outlet } from 'react-router-dom'

/** Full-height layout wrapper for the neural core / mission control surface */
export const MissionControlLayout = () => (
  <div className="mission-control-layout" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
    <Outlet />
  </div>
)
