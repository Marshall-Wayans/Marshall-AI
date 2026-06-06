import type { ContentPipeline } from '@/types/Content'

const now = Date.now()

export const CONTENT_MOCK: ContentPipeline = {
  ideas: [
    { id: 'c-01', title: 'AI OS Wars: Who Wins?', stage: 'idea', progress: 100, agent: 'Trend Hunter', updatedAt: now - 3600000 },
    { id: 'c-02', title: 'Building JARVIS in 2026', stage: 'idea', progress: 85, agent: 'CEO Agent', updatedAt: now - 7200000 },
    { id: 'c-03', title: 'Cyberpunk UI Design Masterclass', stage: 'idea', progress: 60, agent: 'Content Strategist', updatedAt: now - 10800000 },
  ],
  scripts: [
    { id: 'c-04', title: 'Neural Core Explained', stage: 'script', progress: 90, agent: 'Content Strategist', updatedAt: now - 1800000 },
    { id: 'c-05', title: 'Mission Control Walkthrough', stage: 'script', progress: 45, agent: 'Content Strategist', updatedAt: now - 5400000 },
  ],
  storyboards: [
    { id: 'c-06', title: 'Trend Radar Deep Dive', stage: 'storyboard', progress: 70, agent: 'Video Editor', updatedAt: now - 2400000 },
  ],
  videos: [
    { id: 'c-07', title: 'AI OS Deep Dive — Ep 12', stage: 'video', progress: 95, agent: 'Video Editor', updatedAt: now - 600000 },
    { id: 'c-08', title: 'Simulation Center Tour', stage: 'video', progress: 40, agent: 'Video Editor', updatedAt: now - 9000000 },
  ],
  thumbnails: [
    { id: 'c-09', title: 'Ep 12 — Variant Set A', stage: 'thumbnail', progress: 100, agent: 'Thumbnail Specialist', updatedAt: now - 1200000 },
    { id: 'c-10', title: 'Cyberpunk Series Batch', stage: 'thumbnail', progress: 75, agent: 'Thumbnail Specialist', updatedAt: now - 4800000 },
  ],
}
