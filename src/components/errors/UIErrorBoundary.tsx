import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallbackTitle?: string
}

interface State {
  hasError: boolean
}

export class UIErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[UIErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="clip-angled"
          style={{
            padding: 'var(--space-4)',
            border: '1px solid rgba(255, 60, 60, 0.3)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: '#fca5a5',
          }}
        >
          {this.props.fallbackTitle ?? 'UI COMPONENT ERROR'}
        </div>
      )
    }
    return this.props.children
  }
}
