import { motion } from 'framer-motion'
import {
  Cpu,
  LayoutDashboard,
  Shield,
  ClipboardCheck,
  Activity,
} from 'lucide-react'
import { HoloPanel } from '@/components/panels/HoloPanel'
import { UIErrorBoundary } from '@/components/errors'
import {
  KPICard,
  ActivityFeed,
  ModuleCard,
  Gauge,
} from '@/components/dashboard'
import { DASHBOARD_MODULES } from '@/constants/dashboardModules'
import { useSimulationStore } from '@/store/simulationStore'
import { ROUTES } from '@/constants'
import { useNavigate } from 'react-router-dom'
import '@/styles/Dashboard.css'
import '@/styles/Views.css'

export const MissionControlPage = () => {
  const mission = useSimulationStore((s) => s.mission)
  const navigate = useNavigate()

  return (
    <UIErrorBoundary fallbackTitle="MISSION CONTROL OFFLINE">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mc-grid"
      >
        {mission.pendingApprovals > 0 && (
          <div className="mc-span-3">
            <button
              type="button"
              className="mc-approval-banner"
              onClick={() => navigate(ROUTES.approvalCenter)}
            >
              ⬡ NOTHING HAPPENS WITHOUT APPROVAL — {mission.pendingApprovals}{' '}
              DIRECTIVE(S) AWAITING COMMANDER AUTHORIZATION
            </button>
          </div>
        )}

        <div className="mc-span-2">
          <HoloPanel title="AI CORE STATUS" icon={<Cpu size={14} />}>
            <div style={{ padding: 'var(--space-4)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <motion.div
                  className="mc-core-pulse"
                  animate={{
                    scale: [1, 1.2 + mission.aiCorePulse / 200, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-orbitron)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--accent)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    NEURAL CORE — {mission.aiCoreStatus.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text-dim)',
                      marginTop: 'var(--space-1)',
                    }}
                  >
                    Pulse intensity: {Math.round(mission.aiCorePulse)}%
                  </div>
                </div>
              </div>
              <div className="mc-kpi-row">
                <KPICard
                  label="ACTIVE MODULES"
                  value={`${mission.activeModules}/${mission.totalModules}`}
                />
                <KPICard
                  label="SYSTEM HEALTH"
                  value={String(mission.systemHealth)}
                  unit="%"
                />
                <KPICard
                  label="PENDING APPROVALS"
                  value={String(mission.pendingApprovals)}
                />
                <KPICard
                  label="SECURITY LEVEL"
                  value={`DEFCON ${mission.securityLevel}`}
                />
              </div>
            </div>
          </HoloPanel>
        </div>

        <div>
          <HoloPanel title="SYSTEM HEALTH" icon={<Activity size={14} />}>
            <div
              style={{
                padding: 'var(--space-4)',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Gauge
                value={mission.systemHealth}
                label="OPERATIONAL"
                size="md"
              />
            </div>
          </HoloPanel>
        </div>

        <div className="mc-span-2">
          <HoloPanel
            title="ACTIVE MODULES"
            icon={<LayoutDashboard size={14} />}
          >
            <div
              style={{
                padding: 'var(--space-3)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              {DASHBOARD_MODULES.map((mod) => (
                <ModuleCard key={mod.id} module={mod} />
              ))}
            </div>
          </HoloPanel>
        </div>

        <div>
          <HoloPanel title="SECURITY STATUS" icon={<Shield size={14} />} color="magenta">
            <div style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                }}
              >
                DEFCON {mission.securityLevel}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-dim)',
                  marginTop: 'var(--space-2)',
                }}
              >
                Perimeter monitoring active
              </p>
            </div>
          </HoloPanel>
        </div>

        <div className="mc-span-2">
          <HoloPanel
            title="RECENT ACTIVITY"
            icon={<Activity size={14} />}
          >
            <div style={{ padding: 'var(--space-3)' }}>
              <ActivityFeed events={mission.activityFeed} />
            </div>
          </HoloPanel>
        </div>

        <div>
          <HoloPanel
            title="APPROVALS"
            icon={<ClipboardCheck size={14} />}
            color="cyan"
          >
            <div style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'var(--text-3xl)',
                  color: 'var(--accent)',
                }}
              >
                {mission.pendingApprovals}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-dim)',
                  marginTop: 'var(--space-2)',
                }}
              >
                AWAITING REVIEW
              </p>
              <button
                type="button"
                className="dash-approval-btn"
                style={{ marginTop: 'var(--space-4)' }}
                onClick={() => navigate(ROUTES.approvalCenter)}
              >
                OPEN APPROVAL CENTER
              </button>
            </div>
          </HoloPanel>
        </div>
      </motion.div>
    </UIErrorBoundary>
  )
}
