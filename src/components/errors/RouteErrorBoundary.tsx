import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[RouteErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="view-container">
          <div className="initializing-card clip-angled" style={{ margin: 'auto' }}>
            <h2 className="initializing-title">ROUTE ERROR</h2>
            <p className="initializing-status">Module failed to render.</p>
            <Link to={ROUTES.missionControl} className="auth-submit-btn" style={{ display: 'inline-block', marginTop: 'var(--space-6)', textDecoration: 'none' }}>
              RETURN TO MISSION CONTROL
            </Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
