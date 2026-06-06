import type { AnalyticsSnapshot } from '@/types/Analytics'

const mkHistory = (base: number, variance: number, len = 12) =>
  Array.from({ length: len }, (_, i) =>
    Math.round(base + Math.sin(i * 0.8) * variance + (Math.random() - 0.5) * variance * 0.3)
  )

export const ANALYTICS_MOCK: AnalyticsSnapshot = {
  views: {
    id: 'views',
    label: 'VIEWS',
    value: 2847000,
    unit: '',
    change: 12.4,
    history: mkHistory(240000, 40000),
  },
  watchTime: {
    id: 'watchTime',
    label: 'WATCH TIME',
    value: 184200,
    unit: 'hrs',
    change: 8.7,
    history: mkHistory(160000, 15000),
  },
  subscribers: {
    id: 'subscribers',
    label: 'SUBSCRIBERS',
    value: 487200,
    unit: '',
    change: 3.2,
    history: mkHistory(470000, 8000),
  },
  revenue: {
    id: 'revenue',
    label: 'REVENUE',
    value: 42800,
    unit: '$',
    change: 15.1,
    history: mkHistory(38000, 4000),
  },
  ctr: {
    id: 'ctr',
    label: 'CTR',
    value: 6.8,
    unit: '%',
    change: 0.4,
    history: mkHistory(6.2, 0.5, 12).map((v) => +v.toFixed(1)),
  },
  retention: {
    id: 'retention',
    label: 'RETENTION',
    value: 62.3,
    unit: '%',
    change: -1.2,
    history: mkHistory(63, 2, 12).map((v) => +v.toFixed(1)),
  },
}
