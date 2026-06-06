import { BrowserRouter } from 'react-router-dom'
import { AppErrorBoundary } from '@/components/errors'
import { AppProviders } from './providers'
import { ThemeApplicator } from './ThemeApplicator'
import { AppRouter } from './router'

export const App = () => (
  <AppErrorBoundary>
    <BrowserRouter>
      <AppProviders>
        <ThemeApplicator />
        <AppRouter />
      </AppProviders>
    </BrowserRouter>
  </AppErrorBoundary>
)
