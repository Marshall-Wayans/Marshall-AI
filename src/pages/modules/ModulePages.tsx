import React from 'react'
import { motion } from 'framer-motion'
import {
  Radar,
  Globe,
  LayoutTemplate,
  BarChart2,
  ShieldAlert,
} from 'lucide-react'
import { HoloPanel } from '@/components/panels/HoloPanel'
import '@/styles/Views.css'
const ViewWrapper: React.FC<{
  children: React.ReactNode
}> = ({ children }) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 20,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: -20,
    }}
    className="view-container"
  >
    {children}
  </motion.div>
)
export const TrendRadarView = () => {
  return (
    <ViewWrapper>
      <div className="view-grid">
        <div className="view-col-2">
          <HoloPanel title="GLOBAL TREND VECTORS" icon={<Radar size={14} />}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                opacity: 0.5,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '16rem',
                  height: '16rem',
                  borderRadius: '50%',
                  border: '1px solid rgba(6, 255, 240, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'rgba(6, 255, 240, 0.2)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '1px',
                    backgroundColor: 'rgba(6, 255, 240, 0.2)',
                  }}
                />
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    position: 'absolute',
                    width: '50%',
                    height: '50%',
                    top: '50%',
                    left: '50%',
                    transformOrigin: 'top left',
                    background:
                      'linear-gradient(to bottom right, rgba(6, 255, 240, 0.4), transparent)',
                  }}
                />
              </div>
            </div>
          </HoloPanel>
        </div>
        <div
          className="view-col-1"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          <HoloPanel title="EMERGING THREATS" color="magenta">
            <div
              style={{
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
              }}
            >
              <div
                style={{
                  borderLeft: '2px solid var(--nexus-magenta)',
                  paddingLeft: 'var(--space-2)',
                }}
              >
                VECTOR_7A DETECTED
              </div>
              <div
                style={{
                  borderLeft: '2px solid var(--nexus-magenta)',
                  paddingLeft: 'var(--space-2)',
                }}
              >
                ANOMALY IN SECTOR 4
              </div>
            </div>
          </HoloPanel>
          <HoloPanel title="OPPORTUNITY MATRIX" color="blue">
            <div
              style={{
                padding: 'var(--space-4)',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'var(--space-2)',
              }}
            >
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '2rem',
                    backgroundColor:
                      Math.random() > 0.5
                        ? 'rgba(0, 212, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              ))}
            </div>
          </HoloPanel>
        </div>
      </div>
    </ViewWrapper>
  )
}
export const SimulationCenterView = () => {
  return (
    <ViewWrapper>
      <HoloPanel title="QUANTUM SIMULATION ENGINE" icon={<Globe size={14} />}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            fontFamily: 'var(--font-mono)',
            color: '#94a3b8',
          }}
        >
          <Globe
            size={64}
            style={{
              color: 'var(--accent)',
              marginBottom: 'var(--space-4)',
              opacity: 0.5,
            }}
          />
          SIMULATION ENVIRONMENT ACTIVE. AWAITING PARAMETERS.
        </div>
      </HoloPanel>
    </ViewWrapper>
  )
}
export const ContentLabView = () => {
  return (
    <ViewWrapper>
      <HoloPanel
        title="SYNTHESIS LABORATORY"
        icon={<LayoutTemplate size={14} />}
      >
        <div
          style={{
            padding: 'var(--space-6)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: '16/9',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '10px',
                  color: '#64748b',
                }}
              >
                ASSET_{i}
              </span>
            </div>
          ))}
        </div>
      </HoloPanel>
    </ViewWrapper>
  )
}
export const AnalyticsCenterView = () => {
  return (
    <ViewWrapper>
      <div className="view-grid">
        <div className="view-col-2">
          <HoloPanel title="NEURAL THROUGHPUT" icon={<BarChart2 size={14} />}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                padding: 'var(--space-8)',
                height: '100%',
                gap: 'var(--space-2)',
              }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(var(--accent), 0.5)',
                  }}
                  initial={{
                    height: '10%',
                  }}
                  animate={{
                    height: `${Math.random() * 80 + 10}%`,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
              ))}
            </div>
          </HoloPanel>
        </div>
        <div
          className="view-col-1"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          <HoloPanel title="AGENT PERFORMANCE" color="blue" />
          <HoloPanel title="SYSTEM LOAD" color="purple" />
        </div>
      </div>
    </ViewWrapper>
  )
}
export const SecurityCenterView = () => {
  return (
    <ViewWrapper>
      <HoloPanel
        title="THREAT OPS CONSOLE"
        color="magenta"
        icon={<ShieldAlert size={14} />}
      >
        <div
          style={{
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <ShieldAlert
            size={80}
            style={{
              color: 'var(--nexus-magenta)',
              marginBottom: 'var(--space-6)',
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 234, 0.6))',
            }}
            className="animate-pulse"
          />
          <h2
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: 'var(--text-2xl)',
              color: 'var(--nexus-magenta)',
              letterSpacing: '0.1em',
            }}
          >
            DEFCON 3
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              color: '#94a3b8',
              marginTop: 'var(--space-2)',
            }}
          >
            MULTIPLE INTRUSION ATTEMPTS BLOCKED
          </p>
        </div>
      </HoloPanel>
    </ViewWrapper>
  )
}
