import type { SecuritySnapshot } from '@/types/Security'

export const SECURITY_MOCK: SecuritySnapshot = {
  threatLevel: 3,
  defconLabel: 'DEFCON 3',
  activeAlerts: 2,
  blockedAttempts: 14,
  systemHealth: 94,
  events: [
    {
      id: 'sec-001',
      type: 'alert',
      message: 'Anomalous login pattern detected — IP masked',
      timestamp: Date.now() - 300000,
      severity: 'warning',
    },
    {
      id: 'sec-002',
      type: 'login',
      message: 'Commander authenticated via secure channel',
      timestamp: Date.now() - 900000,
      severity: 'info',
    },
    {
      id: 'sec-003',
      type: 'approval',
      message: 'Approval gate triggered — Content Lab publish request',
      timestamp: Date.now() - 1800000,
      severity: 'info',
    },
    {
      id: 'sec-004',
      type: 'audit',
      message: 'Weekly credential audit completed — 0 violations',
      timestamp: Date.now() - 3600000,
      severity: 'info',
    },
    {
      id: 'sec-005',
      type: 'alert',
      message: 'Perimeter scan: 2 probe attempts blocked',
      timestamp: Date.now() - 5400000,
      severity: 'warning',
    },
    {
      id: 'sec-006',
      type: 'scan',
      message: 'Full system integrity scan — PASSED',
      timestamp: Date.now() - 7200000,
      severity: 'info',
    },
  ],
}

export const SECURITY_ALERT_MESSAGES = [
  'Unauthorized API probe blocked at perimeter',
  'Credential rotation cycle initiated',
  'Anomaly detected in agent dispatch queue',
  'Firewall rule updated — sector 7',
  'Approval bypass attempt intercepted',
  'Encrypted uplink integrity verified',
]
