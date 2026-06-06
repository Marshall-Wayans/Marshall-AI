import { motion } from 'framer-motion'
import { ClipboardCheck, AlertTriangle } from 'lucide-react'
import { HoloPanel } from '@/components/panels/HoloPanel'
import { KPICard } from '@/components/dashboard'
import { useSimulationStore } from '@/store/simulationStore'
import type { ApprovalItem } from '@/types/Approval'
import '@/styles/Dashboard.css'
import '@/styles/Views.css'

const priorityColor: Record<ApprovalItem['priority'], string> = {
  low: 'var(--text-dim)',
  medium: 'var(--accent)',
  high: 'var(--theme-secondary)',
  critical: 'var(--nexus-red)',
}

export const ApprovalCenterPage = () => {
  const approvals = useSimulationStore((s) => s.approvals)
  const approveItem = useSimulationStore((s) => s.approveItem)
  const rejectItem = useSimulationStore((s) => s.rejectItem)
  const reviewItem = useSimulationStore((s) => s.reviewItem)

  const pending = approvals.filter((a) => a.status === 'pending')
  const reviewing = approvals.filter((a) => a.status === 'reviewing')
  const approved = approvals.filter((a) => a.status === 'approved')
  const rejected = approvals.filter((a) => a.status === 'rejected')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="view-container"
    >
      <div className="mc-approval-banner" style={{ marginBottom: 'var(--space-4)' }}>
        <AlertTriangle size={14} style={{ display: 'inline', marginRight: 8 }} />
        NOTHING HAPPENS WITHOUT APPROVAL — ALL SYSTEM ACTIONS REQUIRE COMMANDER
        AUTHORIZATION
      </div>

      <div className="mc-kpi-row" style={{ marginBottom: 'var(--space-6)' }}>
        <KPICard label="PENDING" value={String(pending.length)} />
        <KPICard label="IN REVIEW" value={String(reviewing.length)} />
        <KPICard label="APPROVED" value={String(approved.length)} />
        <KPICard label="REJECTED" value={String(rejected.length)} />
      </div>

      <div className="view-grid">
        <div className="view-col-2">
          <HoloPanel
            title="REVIEW QUEUE"
            icon={<ClipboardCheck size={14} />}
            color="cyan"
          >
            <div style={{ padding: 'var(--space-4)' }}>
              {[...pending, ...reviewing].map((item) => (
                <div
                  key={item.id}
                  className={`dash-approval-item ${item.status === 'pending' ? 'is-pending' : ''}`}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-orbitron)',
                        fontSize: '10px',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: priorityColor[item.priority],
                      }}
                    >
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text-dim)',
                    }}
                  >
                    {item.summary}
                  </p>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--text-muted)',
                      marginTop: 'var(--space-2)',
                    }}
                  >
                    {item.module} · {item.requestedBy} · {item.id}
                  </div>
                  {item.status !== 'approved' && item.status !== 'rejected' && (
                    <div className="dash-approval-actions">
                      <button
                        type="button"
                        className="dash-approval-btn"
                        onClick={() => reviewItem(item.id)}
                      >
                        REVIEW
                      </button>
                      <button
                        type="button"
                        className="dash-approval-btn is-approve"
                        onClick={() => approveItem(item.id)}
                      >
                        APPROVE
                      </button>
                      <button
                        type="button"
                        className="dash-approval-btn is-reject"
                        onClick={() => rejectItem(item.id)}
                      >
                        REJECT
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </HoloPanel>
        </div>

        <div
          className="view-col-1"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
        >
          <HoloPanel title="APPROVED" color="blue">
            <div style={{ padding: 'var(--space-3)' }}>
              {approved.map((item) => (
                <div key={item.id} className="dash-approval-item">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--theme-secondary)',
                    }}
                  >
                    ✓ {item.title}
                  </span>
                </div>
              ))}
            </div>
          </HoloPanel>
          <HoloPanel title="REJECTED" color="red">
            <div style={{ padding: 'var(--space-3)' }}>
              {rejected.map((item) => (
                <div key={item.id} className="dash-approval-item">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--nexus-red)',
                    }}
                  >
                    ✗ {item.title}
                  </span>
                </div>
              ))}
            </div>
          </HoloPanel>
        </div>
      </div>
    </motion.div>
  )
}
