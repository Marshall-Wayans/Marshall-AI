import { ROUTES } from './routes'

export interface QuickCommand {
  id: string
  label: string
  route: string
  prompt: string
}

export const QUICK_COMMANDS: QuickCommand[] = [
  {
    id: 'trending',
    label: 'Trending Content',
    route: ROUTES.trendRadar,
    prompt: 'What content is trending right now?',
  },
  {
    id: 'analyze-trends',
    label: 'Analyze Trends',
    route: ROUTES.trendRadar,
    prompt: 'Analyze current trend vectors.',
  },
  {
    id: 'simulation',
    label: 'Simulation Center',
    route: ROUTES.simulationCenter,
    prompt: 'Run simulation status report.',
  },
  {
    id: 'approval',
    label: 'Approval Queue',
    route: ROUTES.approvalCenter,
    prompt: 'What is in the approval queue?',
  },
  {
    id: 'security',
    label: 'Security Scan',
    route: ROUTES.securityCenter,
    prompt: 'Perform security status scan.',
  },
  {
    id: 'mission',
    label: 'Mission Status',
    route: ROUTES.missionControl,
    prompt: 'Give me mission control status.',
  },
  {
    id: 'content',
    label: 'Content Lab',
    route: ROUTES.contentLab,
    prompt: 'Report content pipeline status.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    route: ROUTES.analyticsCenter,
    prompt: 'Show analytics overview.',
  },
  {
    id: 'activity',
    label: 'Recent Activity',
    route: ROUTES.missionControl,
    prompt: 'What is recent system activity?',
  },
]
