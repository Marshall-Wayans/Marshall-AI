import React from 'react'
import '@/styles/HoloPanel.css'
interface HoloPanelProps {
  children?: React.ReactNode
  className?: string
  title?: string
  color?: 'cyan' | 'blue' | 'purple' | 'magenta' | 'red' | 'accent'
  icon?: React.ReactNode
}
export const HoloPanel: React.FC<HoloPanelProps> = ({
  children,
  className = '',
  title,
  color = 'accent',
  icon,
}) => {
  return (
    <div className={`holo-panel theme-${color} clip-angled ${className}`}>
      <div className="holo-panel-bracket top-left"></div>
      <div className="holo-panel-bracket top-right"></div>
      <div className="holo-panel-bracket bottom-left"></div>
      <div className="holo-panel-bracket bottom-right"></div>

      {title && (
        <div className="holo-panel-header">
          <div className="holo-panel-title-wrapper">
            {icon && <span className="holo-panel-icon">{icon}</span>}
            <h2 className="holo-panel-title">{title}</h2>
          </div>
          <div className="holo-panel-status">
            <div className="holo-panel-dot animate-pulse"></div>
            <div className="holo-panel-dot animate-pulse"></div>
            <div className="holo-panel-dot animate-pulse"></div>
          </div>
        </div>
      )}
      <div className="holo-panel-content">{children}</div>
    </div>
  )
}
