import { create } from 'zustand'
import type { ApprovalItem, ApprovalStatus } from '@/types/Approval'
import type { AnalyticsSnapshot } from '@/types/Analytics'
import type { SecuritySnapshot } from '@/types/Security'
import type { ContentPipeline } from '@/types/Content'
import type { MissionSnapshot, ActivityEvent } from '@/types/MissionControl'
import type { LiveAgent } from '@/types/LiveAgent'
import type { SimulationCenterData } from '@/types/SimulationCenter'
import type { TrendRadarData } from '@/types/TrendRadar'
import {
  APPROVALS_MOCK,
  AGENTS_MOCK,
  AGENT_TASKS,
  ANALYTICS_MOCK,
  SECURITY_MOCK,
  SECURITY_ALERT_MESSAGES,
  CONTENT_MOCK,
  MISSION_ACTIVITY_MOCK,
  ACTIVITY_MESSAGES,
  TREND_RADAR_MOCK,
  SIMULATION_CENTER_MOCK,
} from '@/constants/mock-data'
import { notify } from './notificationStore'
import { useSystemStore } from './systemStore'

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

const jitter = (value: number, amount: number) =>
  value + (Math.random() - 0.5) * amount * 2

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))

let tickCount = 0

interface SimulationState {
  trends: TrendRadarData
  simulation: SimulationCenterData
  approvals: ApprovalItem[]
  agents: LiveAgent[]
  analytics: AnalyticsSnapshot
  security: SecuritySnapshot
  content: ContentPipeline
  mission: MissionSnapshot
  tick: () => void
  approveItem: (id: string) => void
  rejectItem: (id: string) => void
  reviewItem: (id: string) => void
}

const buildMission = (
  approvals: ApprovalItem[],
  security: SecuritySnapshot,
  activityFeed: ActivityEvent[] = MISSION_ACTIVITY_MOCK.slice(0, 8)
): MissionSnapshot => ({
  aiCoreStatus: tickCount % 5 === 0 ? 'processing' : 'online',
  aiCorePulse: 60 + Math.sin(tickCount * 0.3) * 20,
  activeModules: 9,
  totalModules: 9,
  pendingApprovals: approvals.filter((a) => a.status === 'pending').length,
  securityLevel: security.threatLevel,
  systemHealth: security.systemHealth,
  activityFeed,
})

export const useSimulationStore = create<SimulationState>((set, get) => ({
  trends: deepClone(TREND_RADAR_MOCK),
  simulation: deepClone(SIMULATION_CENTER_MOCK),
  approvals: deepClone(APPROVALS_MOCK),
  agents: deepClone(AGENTS_MOCK),
  analytics: deepClone(ANALYTICS_MOCK),
  security: deepClone(SECURITY_MOCK),
  content: deepClone(CONTENT_MOCK),
  mission: buildMission(APPROVALS_MOCK, SECURITY_MOCK),

  approveItem: (id) => {
    set((s) => {
      const approvals = s.approvals.map((a) =>
        a.id === id ? { ...a, status: 'approved' as ApprovalStatus } : a
      )
      notify('success', 'APPROVED', `Directive ${id} authorized by commander.`)
      return {
        approvals,
        mission: buildMission(approvals, s.security, s.mission.activityFeed),
      }
    })
  },

  rejectItem: (id) => {
    set((s) => {
      const approvals = s.approvals.map((a) =>
        a.id === id ? { ...a, status: 'rejected' as ApprovalStatus } : a
      )
      notify('warning', 'REJECTED', `Directive ${id} denied.`)
      return {
        approvals,
        mission: buildMission(approvals, s.security, s.mission.activityFeed),
      }
    })
  },

  reviewItem: (id) => {
    set((s) => {
      const approvals = s.approvals.map((a) =>
        a.id === id ? { ...a, status: 'reviewing' as ApprovalStatus } : a
      )
      return {
        approvals,
        mission: buildMission(approvals, s.security, s.mission.activityFeed),
      }
    })
  },

  tick: () => {
    tickCount++
    const state = get()

    const trends = deepClone(state.trends)
    trends.trendingTopics.forEach((t) => {
      t.volume = Math.round(clamp(jitter(t.volume, t.volume * 0.02), 100, 999999))
      t.changePercent = +clamp(jitter(t.changePercent, 0.5), -30, 80).toFixed(1)
    })
    trends.trendVelocities.forEach((v) => {
      v.velocity = Math.round(clamp(jitter(v.velocity, 3), 0, 100))
    })
    trends.growthPotentials.forEach((g) => {
      g.score = Math.round(clamp(jitter(g.score, 2), 0, 100))
    })

    const simulation = deepClone(state.simulation)
    const simMetrics = [
      simulation.opportunityScore,
      simulation.predictedViews,
      simulation.predictedRetention,
      simulation.predictedRevenue,
      simulation.competitionScore,
      simulation.copyrightRisk,
      simulation.monetizationScore,
    ]
    simMetrics.forEach((m) => {
      m.value = Math.round(clamp(jitter(m.value, m.value * 0.03), 0, 100))
      m.confidence = Math.round(clamp(jitter(m.confidence, 1), 60, 99))
    })

    const analytics = deepClone(state.analytics)
    const metrics = [
      analytics.views,
      analytics.watchTime,
      analytics.subscribers,
      analytics.revenue,
      analytics.ctr,
      analytics.retention,
    ]
    metrics.forEach((m) => {
      const delta = m.value * 0.002
      m.value = Math.round(clamp(jitter(m.value, delta), 1, m.value * 1.5))
      m.change = +clamp(jitter(m.change, 0.3), -10, 20).toFixed(1)
      m.history = [...m.history.slice(1), m.value]
    })

    const agents = state.agents.map((a) => ({
      ...a,
      activityLevel: Math.round(clamp(jitter(a.activityLevel, 4), 20, 100)),
      efficiencyScore: Math.round(clamp(jitter(a.efficiencyScore, 1), 70, 100)),
      currentTask:
        tickCount % 8 === 0
          ? AGENT_TASKS[Math.floor(Math.random() * AGENT_TASKS.length)]
          : a.currentTask,
    }))

    const security = deepClone(state.security)
    security.systemHealth = Math.round(clamp(jitter(security.systemHealth, 0.5), 85, 100))
    security.blockedAttempts += tickCount % 12 === 0 ? 1 : 0

    if (tickCount % 20 === 0) {
      const msg =
        SECURITY_ALERT_MESSAGES[
          Math.floor(Math.random() * SECURITY_ALERT_MESSAGES.length)
        ]
      security.events.unshift({
        id: `sec-live-${tickCount}`,
        type: 'alert',
        message: msg,
        timestamp: Date.now(),
        severity: Math.random() > 0.6 ? 'warning' : 'info',
      })
      security.events = security.events.slice(0, 12)
      security.activeAlerts = security.events.filter(
        (e) => e.severity !== 'info'
      ).length
    }

    const content = deepClone(state.content)
    const allItems = [
      ...content.ideas,
      ...content.scripts,
      ...content.storyboards,
      ...content.videos,
      ...content.thumbnails,
    ]
    if (tickCount % 6 === 0) {
      const item = allItems[Math.floor(Math.random() * allItems.length)]
      if (item) {
        item.progress = Math.round(clamp(item.progress + Math.random() * 8, 0, 100))
        item.updatedAt = Date.now()
      }
    }

    let activityFeed = [...state.mission.activityFeed]
    if (tickCount % 10 === 0) {
      const evt = ACTIVITY_MESSAGES[Math.floor(Math.random() * ACTIVITY_MESSAGES.length)]
      activityFeed = [
        {
          id: `act-live-${tickCount}`,
          type: evt.type,
          message: evt.message,
          timestamp: Date.now(),
          module: evt.module,
        },
        ...activityFeed,
      ].slice(0, 12)
    }

    if (tickCount % 25 === 0) {
      const pending = state.approvals.filter((a) => a.status === 'pending')
      if (pending.length > 0) {
        notify(
          'info',
          'APPROVAL REQUIRED',
          `${pending.length} directive(s) awaiting commander authorization.`
        )
      }
    }

    if (tickCount % 30 === 0 && Math.random() > 0.5) {
      notify(
        'warning',
        'SECURITY ALERT',
        'Anomalous activity detected — review Security Center.'
      )
    }

    const mission: MissionSnapshot = {
      ...buildMission(state.approvals, security, activityFeed),
      aiCorePulse: 60 + Math.sin(tickCount * 0.3) * 20,
      aiCoreStatus: tickCount % 7 === 0 ? 'processing' : 'online',
    }

    useSystemStore.setState({
      syncPercent: +clamp(jitter(get().mission.systemHealth > 90 ? 99.9 : 98.5, 0.1), 97, 100).toFixed(1),
      status: {
        ...useSystemStore.getState().status,
        metrics: useSystemStore.getState().status.metrics.map((m) =>
          m.label === 'UPLINK'
            ? { ...m, value: String(+clamp(jitter(parseFloat(m.value), 0.2), 98, 100).toFixed(1)) }
            : m
        ),
      },
    })

    set({ trends, simulation, analytics, agents, security, content, mission })
  },
}))
