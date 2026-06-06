import type { ActivityEvent } from '@/types/MissionControl'

export const MISSION_ACTIVITY_MOCK: ActivityEvent[] = [
  {
    id: 'act-001',
    type: 'approval',
    message: 'New publish request awaiting commander approval',
    timestamp: Date.now() - 120000,
    module: 'Approval Center',
  },
  {
    id: 'act-002',
    type: 'trend',
    message: 'Trend Hunter flagged high-velocity topic: AI Agents',
    timestamp: Date.now() - 300000,
    module: 'Trend Radar',
  },
  {
    id: 'act-003',
    type: 'agent',
    message: 'Video Editor completed color grade — Project NEXUS-07',
    timestamp: Date.now() - 480000,
    module: 'Agent Command',
  },
  {
    id: 'act-004',
    type: 'security',
    message: 'Security Agent blocked 2 perimeter probe attempts',
    timestamp: Date.now() - 720000,
    module: 'Security Center',
  },
  {
    id: 'act-005',
    type: 'content',
    message: 'Script draft queued for storyboard — Neural Core Explained',
    timestamp: Date.now() - 900000,
    module: 'Content Lab',
  },
  {
    id: 'act-006',
    type: 'system',
    message: 'Simulation Center completed viral content model run',
    timestamp: Date.now() - 1200000,
    module: 'Simulation Center',
  },
]

export const ACTIVITY_MESSAGES = [
  { type: 'agent' as const, message: 'Agent efficiency recalibrated', module: 'Agent Command' },
  { type: 'trend' as const, message: 'Trend velocity spike detected in sector 4', module: 'Trend Radar' },
  { type: 'approval' as const, message: 'Approval queue updated — new item pending', module: 'Approval Center' },
  { type: 'security' as const, message: 'Perimeter scan completed — all clear', module: 'Security Center' },
  { type: 'content' as const, message: 'Content pipeline advanced to next stage', module: 'Content Lab' },
  { type: 'system' as const, message: 'System health check passed', module: 'Mission Control' },
]
