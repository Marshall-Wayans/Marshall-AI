import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DASHBOARD_MODULES } from '@/constants/dashboardModules'
import { ROUTES } from '@/constants'
import { useSimulationStore } from '@/store/simulationStore'
import { useSystemStore } from '@/store'
import '@/styles/Dashboard.css'

const ENABLED_MODULES = DASHBOARD_MODULES.filter((m) => m.enabled)

export const CommandRibbon: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const mission = useSimulationStore((s) => s.mission)
  const syncPercent = useSystemStore((s) => s.syncPercent)

  const activeModule =
    ENABLED_MODULES.find((m) => {
      if (m.route === ROUTES.aiCommand) return location.pathname === '/'
      return location.pathname === m.route
    })?.name ?? 'SYSTEM'

  return (
    <div className="command-ribbon">
      <div className="command-ribbon-left">
        <span className="command-ribbon-module">{activeModule}</span>
        <span className="command-ribbon-stat">
          <span className="command-ribbon-dot animate-pulse" />
          SYNC {syncPercent}%
        </span>
        {mission.pendingApprovals > 0 && (
          <span className="command-ribbon-stat" style={{ color: 'var(--accent)' }}>
            ⬡ {mission.pendingApprovals} PENDING APPROVAL
          </span>
        )}
      </div>

      <div className="command-ribbon-switcher">
        {ENABLED_MODULES.map((m) => {
          const isActive =
            m.route === ROUTES.aiCommand
              ? location.pathname === '/'
              : location.pathname === m.route
          return (
            <button
              key={m.id}
              type="button"
              className={`command-ribbon-module-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => navigate(m.route)}
            >
              {m.name.split(' ')[0].toUpperCase()}
            </button>
          )
        })}
      </div>

      <div className="command-ribbon-right">
        <span className="command-ribbon-stat">
          HEALTH {mission.systemHealth}%
        </span>
        <span className="command-ribbon-stat">
          DEFCON {mission.securityLevel}
        </span>
      </div>
    </div>
  )
}
