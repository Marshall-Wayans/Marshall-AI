import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AppErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-initializing">
          <div className="initializing-card clip-angled">
            <h2 className="initializing-title">SYSTEM FAULT</h2>
            <p className="initializing-status">Critical application error. Reload to recover.</p>
            <button
              type="button"
              className="auth-submit-btn"
              style={{ marginTop: 'var(--space-6)' }}
              onClick={() => window.location.reload()}
            >
              REINITIALIZE
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
