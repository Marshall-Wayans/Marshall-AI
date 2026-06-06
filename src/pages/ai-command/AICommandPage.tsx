import { AICommandInterface } from '@/components/ai-command'
import { UIErrorBoundary } from '@/components/errors'

export const AICommandPage = () => (
  <UIErrorBoundary fallbackTitle="NEURAL CORE OFFLINE">
    <AICommandInterface />
  </UIErrorBoundary>
)
