import React, { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { CoreState } from './AICoreSphere'

interface VoiceWaveformProps {
  state: CoreState
  barCount?: number
}

export const VoiceWaveform = memo<VoiceWaveformProps>(({ state, barCount = 24 }) => {
  const isSpeaking = state === 'SPEAKING'
  const isListening = state === 'LISTENING'
  const isActive = isSpeaking || isListening

  const bars = useMemo(() => Array.from({ length: barCount }, (_, i) => i), [barCount])

  return (
    <div className={`ai-voice-waveform ${isActive ? 'is-active' : ''} state-${state.toLowerCase()}`}>
      {isSpeaking && (
        <>
          <div className="ai-energy-wave ai-energy-wave--1" />
          <div className="ai-energy-wave ai-energy-wave--2" />
        </>
      )}
      <div className="ai-voice-bars">
        {bars.map((i) => (
          <motion.div
            key={i}
            className="ai-voice-bar"
            animate={{
              height: isSpeaking
                ? [`15%`, `${35 + Math.sin(i * 0.8) * 30 + 25}%`, `15%`]
                : isListening
                  ? [`8%`, `${20 + Math.cos(i * 0.5) * 15}%`, `8%`]
                  : state === 'THINKING'
                    ? [`5%`, `${12 + Math.sin(i) * 8}%`, `5%`]
                    : '6%',
            }}
            transition={{
              duration: isSpeaking ? 0.15 + (i % 5) * 0.03 : isListening ? 0.3 : 1.2,
              repeat: Infinity,
              delay: i * 0.025,
            }}
          />
        ))}
      </div>
      {isSpeaking && <div className="ai-neural-burst" />}
    </div>
  )
})

VoiceWaveform.displayName = 'VoiceWaveform'
