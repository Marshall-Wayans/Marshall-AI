import { AIAvatar } from '@/components/avatar/AIAvatar'
import { UIErrorBoundary } from '@/components/errors'

export const MissionControlPage = () => (
  <UIErrorBoundary fallbackTitle="NEURAL CORE OFFLINE">
    <AIAvatar />
  </UIErrorBoundary>
)
