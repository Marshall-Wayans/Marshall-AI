import React from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Zap,
  Swords,
  Sprout,
  Grid3x3,
} from 'lucide-react'
import { HoloPanel } from '@/components/panels/HoloPanel'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { TREND_RADAR_MOCK } from '@/constants/trendRadarMock'
import type { TrendLevel, VelocityDirection } from '@/types/TrendRadar'
import '@/styles/Views.css'
import '@/styles/TrendRadar.css'

const formatVolume = (value: number) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}K` : String(value)

const formatChange = (value: number) =>
  `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

const velocityDirectionLabel: Record<VelocityDirection, string> = {
  rising: 'RISING',
  stable: 'STABLE',
  declining: 'DECLINING',
}

const competitionStatus: Record<
  TrendLevel,
  'nominal' | 'warning' | 'error' | 'offline'
> = {
  low: 'nominal',
  medium: 'warning',
  high: 'warning',
  critical: 'error',
}

const competitionLevelClass: Record<TrendLevel, string> = {
  low: 'is-low',
  medium: 'is-medium',
  high: 'is-high',
  critical: 'is-critical',
}

export const TrendRadarPage: React.FC = () => {
  const {
    trendingTopics,
    trendVelocities,
    competitionLevels,
    growthPotentials,
    heatMap,
  } = TREND_RADAR_MOCK

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="view-container"
    >
      <div className="view-grid">
        <div className="view-col-2">
          <HoloPanel
            title="TREND HEAT MAP"
            icon={<Grid3x3 size={14} />}
          >
            <div
              className="trend-radar-heatmap"
              style={{
                gridTemplateColumns: `repeat(${heatMap.cols}, 1fr)`,
              }}
            >
              {heatMap.cells.map((cell) => (
                <div
                  key={`${cell.row}-${cell.col}`}
                  className="trend-radar-heatmap-cell"
                  style={{
                    backgroundColor: `rgba(6, 255, 240, ${cell.intensity * 0.65})`,
                  }}
                  title={cell.label}
                >
                  {cell.label && (
                    <span className="trend-radar-heatmap-label">
                      {cell.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="trend-radar-radar-display">
              <div className="trend-radar-radar-ring">
                <div className="trend-radar-radar-axis-h" />
                <div className="trend-radar-radar-axis-v" />
                <motion.div
                  className="trend-radar-radar-sweep"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </div>
          </HoloPanel>
        </div>

        <div className="view-col-1 trend-radar-stack">
          <HoloPanel
            title="TRENDING TOPICS"
            icon={<TrendingUp size={14} />}
            color="cyan"
          >
            <div className="trend-radar-topic-list">
              {trendingTopics.map((topic) => (
                <div key={topic.id} className="trend-radar-topic-row">
                  <span className="trend-radar-topic-rank">
                    #{topic.rank}
                  </span>
                  <div className="trend-radar-topic-info">
                    <div className="trend-radar-topic-name">{topic.name}</div>
                    <div className="trend-radar-topic-meta">
                      {topic.category} · VOL {formatVolume(topic.volume)}
                    </div>
                  </div>
                  <span
                    className={`trend-radar-topic-change ${topic.changePercent < 0 ? 'is-negative' : ''}`}
                  >
                    {formatChange(topic.changePercent)}
                  </span>
                </div>
              ))}
            </div>
          </HoloPanel>

          <HoloPanel
            title="TREND VELOCITY"
            icon={<Zap size={14} />}
            color="blue"
          >
            <div className="trend-radar-velocity-list">
              {trendVelocities.map((item) => (
                <div key={item.id} className="trend-radar-velocity-row">
                  <div className="trend-radar-velocity-header">
                    <span className="trend-radar-velocity-name">
                      {item.topicName}
                    </span>
                    <span className="trend-radar-velocity-value">
                      {item.velocity}%
                    </span>
                  </div>
                  <div className="trend-radar-velocity-bar-track">
                    <motion.div
                      className="trend-radar-velocity-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.velocity}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="trend-radar-velocity-meta">
                    <span>
                      {velocityDirectionLabel[item.direction]}
                    </span>
                    <span>PEAK {item.peakWindow}</span>
                  </div>
                </div>
              ))}
            </div>
          </HoloPanel>
        </div>
      </div>

      <div
        className="view-grid"
        style={{ marginTop: 'var(--space-6)' }}
      >
        <div className="view-col-1">
          <HoloPanel
            title="COMPETITION LEVEL"
            icon={<Swords size={14} />}
            color="magenta"
          >
            <div className="trend-radar-competition-list">
              {competitionLevels.map((item) => (
                <div key={item.id} className="trend-radar-competition-row">
                  <span className="trend-radar-competition-name">
                    {item.topicName}
                  </span>
                  <span
                    className={`trend-radar-level-badge ${competitionLevelClass[item.level]}`}
                  >
                    {item.level}
                  </span>
                  <div className="trend-radar-competition-stats">
                    <div>{item.competitorCount} COMPETITORS</div>
                    <div>SAT {item.saturationIndex}%</div>
                  </div>
                  <StatusIndicator
                    label={item.level.toUpperCase()}
                    status={competitionStatus[item.level]}
                  />
                </div>
              ))}
            </div>
          </HoloPanel>
        </div>

        <div className="view-col-2">
          <HoloPanel
            title="GROWTH POTENTIAL"
            icon={<Sprout size={14} />}
            color="purple"
          >
            <div className="trend-radar-growth-list">
              {growthPotentials.map((item) => (
                <div key={item.id} className="trend-radar-growth-row">
                  <div className="trend-radar-growth-header">
                    <span className="trend-radar-growth-name">
                      {item.topicName}
                    </span>
                    <span className="trend-radar-growth-score">
                      {item.score}/100
                    </span>
                  </div>
                  <div className="trend-radar-growth-bar-track">
                    <motion.div
                      className="trend-radar-growth-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="trend-radar-growth-meta">
                    <span>WINDOW {item.timeframe}</span>
                    <span>CONF {item.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </HoloPanel>
        </div>
      </div>
    </motion.div>
  )
}
