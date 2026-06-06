import { useCallback } from 'react'
import { useSimulationStore } from '@/store/simulationStore'

/** Generates module-aware AI responses from live simulated data. */
export const useAIResponses = () => {
  const getState = useSimulationStore.getState

  const generateResponse = useCallback((userText: string, commanderName: string): string => {
    const text = userText.toLowerCase()
    const { trends, simulation, approvals, security, mission, analytics, content } =
      getState()

    const pending = approvals.filter((a) => a.status === 'pending').length
    const topTrend = trends.trendingTopics[0]

    if (text.includes('trend') || text.includes('trending')) {
      return `Trend Radar reports rising engagement on "${topTrend?.name ?? 'AI Systems'}" with ${topTrend?.changePercent ?? 0}% velocity shift. ${trends.trendingTopics.length} active vectors monitored. Recommend Trend Radar for full matrix analysis, Commander ${commanderName}.`
    }

    if (text.includes('simulation') || text.includes('predict') || text.includes('monetiz')) {
      const score = simulation.monetizationScore.value
      return `Simulation Center predicts ${score}% monetization potential for scenario ${simulation.scenario.name}. Opportunity score at ${simulation.opportunityScore.value}%. Copyright risk: ${simulation.copyrightRisk.displayValue}.`
    }

    if (text.includes('approval') || text.includes('queue') || text.includes('pending')) {
      return `Approval Queue contains ${pending} pending directive${pending !== 1 ? 's' : ''}. Nothing happens without your authorization, Commander. Review required before any system action executes.`
    }

    if (text.includes('security') || text.includes('threat') || text.includes('defcon')) {
      return `Security Center reports ${security.defconLabel} — threat level nominal. ${security.blockedAttempts} intrusion attempts blocked. System integrity at ${security.systemHealth}%. All perimeters secure.`
    }

    if (text.includes('mission') || text.includes('status') || text.includes('system')) {
      return `Mission Control status: ${mission.activeModules}/${mission.totalModules} modules operational. AI Core ${mission.aiCoreStatus}. System health ${mission.systemHealth}%. ${pending} approvals awaiting review.`
    }

    if (text.includes('content') || text.includes('pipeline') || text.includes('video')) {
      const inProd = content.videos.length + content.scripts.length
      return `Content Lab pipeline: ${content.ideas.length} ideas, ${content.scripts.length} scripts in queue, ${content.videos.length} videos in production. ${inProd} assets actively processing.`
    }

    if (text.includes('analytic') || text.includes('view') || text.includes('revenue')) {
      const views = analytics.views.value
      const rev = analytics.revenue.value
      return `Analytics Center: ${(views / 1_000_000).toFixed(1)}M views tracked. Revenue projection $${(rev / 1000).toFixed(1)}K. CTR at ${analytics.ctr.value}%. Retention ${analytics.retention.value}%.`
    }

    if (text.includes('activity') || text.includes('recent')) {
      const latest = mission.activityFeed[0]
      return latest
        ? `Recent activity: ${latest.message} — ${latest.module}. ${mission.activityFeed.length} events in mission log.`
        : `All systems nominal. Monitoring ${mission.activeModules} active modules.`
    }

    const defaults = [
      `Acknowledged, ${commanderName}. All ${mission.activeModules} subsystems report ready. Neural pathways aligned with your directive.`,
      `Command received, ${commanderName}. Trend Radar, Simulation Center, and Security modules are standing by for your orders.`,
      `Affirmative. I am the core intelligence coordinating all Marshall systems. How may I assist?`,
    ]
    return defaults[Math.floor(Math.random() * defaults.length)]
  }, [getState])

  return { generateResponse }
}
