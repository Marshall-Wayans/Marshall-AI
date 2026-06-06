export const ROUTES = {
  aiCommand: '/',
  missionControl: '/mission-control',
  trendRadar: '/trend-radar',
  simulationCenter: '/simulation-center',
  approvalCenter: '/approval-center',
  agentCommand: '/agent-command',
  contentLab: '/content-lab',
  analyticsCenter: '/analytics-center',
  securityCenter: '/security-center',
  profile: '/profile',
  settings: '/settings',
  logs: '/logs',
  login: '/login',
  signup: '/signup',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export interface NavItem {
  label: string
  path: AppRoute
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'AI Command', path: ROUTES.aiCommand },
  { label: 'Mission Control', path: ROUTES.missionControl },
  { label: 'Trend Radar', path: ROUTES.trendRadar },
  { label: 'Simulation Center', path: ROUTES.simulationCenter },
  { label: 'Approval Center', path: ROUTES.approvalCenter },
  { label: 'Agent Command', path: ROUTES.agentCommand },
  { label: 'Content Lab', path: ROUTES.contentLab },
  { label: 'Analytics Center', path: ROUTES.analyticsCenter },
  { label: 'Security Center', path: ROUTES.securityCenter },
  { label: 'Settings', path: ROUTES.settings },
]
