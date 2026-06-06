import {
  LayoutDashboard,
  Radar,
  Globe,
  ClipboardCheck,
  Bot,
  BarChart2,
  ShieldAlert,
  LayoutTemplate,
  Cpu,
} from 'lucide-react'
import type { DashboardModule } from '@/types/DashboardModule'
import { ROUTES } from './routes'

export const DASHBOARD_MODULES: DashboardModule[] = [
  {
    id: 'ai-command',
    name: 'AI Command',
    description:
      'Primary neural interface — voice-driven command center for all Marshall systems.',
    status: 'operational',
    icon: Cpu,
    route: ROUTES.aiCommand,
    enabled: true,
    comingSoon: false,
  },
  {
    id: 'mission-control',
    name: 'Mission Control',
    description:
      'Central neural command hub for system oversight, agent coordination, and real-time operational awareness.',
    status: 'operational',
    icon: LayoutDashboard,
    route: ROUTES.missionControl,
    enabled: true,
    comingSoon: false,
  },
  {
    id: 'trend-radar',
    name: 'Trend Radar',
    description:
      'Global trend vector analysis, emerging threat detection, and opportunity matrix visualization.',
    status: 'active',
    icon: Radar,
    route: ROUTES.trendRadar,
    enabled: true,
    comingSoon: false,
  },
  {
    id: 'simulation-center',
    name: 'Simulation Center',
    description:
      'Quantum simulation environment for scenario modeling, parameter testing, and predictive outcomes.',
    status: 'standby',
    icon: Globe,
    route: ROUTES.simulationCenter,
    enabled: true,
    comingSoon: false,
  },
  {
    id: 'approval-center',
    name: 'Approval Center',
    description:
      'Workflow review queue for content approvals, clearance requests, and multi-stage authorization gates.',
    status: 'active',
    icon: ClipboardCheck,
    route: ROUTES.approvalCenter,
    enabled: true,
    comingSoon: false,
  },
  {
    id: 'agent-command',
    name: 'Agent Command',
    description:
      'Direct agent fleet management, task dispatch, clearance levels, and autonomous unit telemetry.',
    status: 'operational',
    icon: Bot,
    route: ROUTES.agentCommand,
    enabled: true,
    comingSoon: false,
  },
  {
    id: 'analytics-center',
    name: 'Analytics Center',
    description:
      'Neural throughput metrics, agent performance dashboards, and system load analytics.',
    status: 'operational',
    icon: BarChart2,
    route: ROUTES.analyticsCenter,
    enabled: true,
    comingSoon: false,
  },
  {
    id: 'security-center',
    name: 'Security Center',
    description:
      'Threat operations console for intrusion monitoring, DEFCON status, and perimeter defense controls.',
    status: 'active',
    icon: ShieldAlert,
    route: ROUTES.securityCenter,
    enabled: true,
    comingSoon: false,
  },
  {
    id: 'content-lab',
    name: 'Content Lab',
    description:
      'Synthesis laboratory for asset generation, content pipelines, and creative output staging.',
    status: 'operational',
    icon: LayoutTemplate,
    route: ROUTES.contentLab,
    enabled: true,
    comingSoon: false,
  },
]
