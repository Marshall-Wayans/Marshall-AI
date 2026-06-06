import { motion } from 'framer-motion'
import { LayoutTemplate } from 'lucide-react'
import { HoloPanel } from '@/components/panels/HoloPanel'
import { ProgressBar } from '@/components/dashboard'
import { useSimulationStore } from '@/store/simulationStore'
import type { ContentItem, ContentStage } from '@/types/Content'
import '@/styles/Dashboard.css'
import '@/styles/Views.css'

const STAGES: { key: ContentStage; label: string }[] = [
  { key: 'idea', label: 'IDEAS' },
  { key: 'script', label: 'SCRIPT QUEUE' },
  { key: 'storyboard', label: 'STORYBOARD QUEUE' },
  { key: 'video', label: 'VIDEO QUEUE' },
  { key: 'thumbnail', label: 'THUMBNAIL QUEUE' },
]

export const ContentLabPage = () => {
  const content = useSimulationStore((s) => s.content)

  const getItems = (stage: ContentStage): ContentItem[] => {
    const map: Record<ContentStage, ContentItem[]> = {
      idea: content.ideas,
      script: content.scripts,
      storyboard: content.storyboards,
      video: content.videos,
      thumbnail: content.thumbnails,
      published: [],
    }
    return map[stage]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="view-container"
    >
      <HoloPanel
        title="CONTENT SYNTHESIS LABORATORY"
        icon={<LayoutTemplate size={14} />}
      >
        <div style={{ padding: 'var(--space-4)' }}>
          {STAGES.map(({ key, label }) => {
            const items = getItems(key)
            if (items.length === 0) return null
            return (
              <div key={key} className="dash-pipeline-stage">
                <div className="dash-pipeline-label">{label}</div>
                {items.map((item) => (
                  <div key={item.id} className="dash-pipeline-item">
                    <span className="dash-pipeline-title">{item.title}</span>
                    <div style={{ width: 120 }}>
                      <ProgressBar value={item.progress} showValue />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--text-muted)',
                        minWidth: 80,
                      }}
                    >
                      {item.agent}
                    </span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </HoloPanel>
    </motion.div>
  )
}
