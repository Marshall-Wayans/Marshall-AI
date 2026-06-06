import React, { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type CoreState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'ERROR'

interface AICoreSphereProps {
  state: CoreState
}

export const AICoreSphere = memo<AICoreSphereProps>(({ state }) => {
  const isListening = state === 'LISTENING'
  const isSpeaking = state === 'SPEAKING'
  const isThinking = state === 'THINKING'

  return (
    <div className="ai-core-sphere">
      <motion.div
        className="ai-core-ambient"
        animate={{
          scale: isSpeaking ? [1, 1.15, 1] : isListening ? [1, 1.08, 1] : [1, 1.04, 1],
          opacity: isThinking ? [0.4, 0.7, 0.4] : [0.5, 0.65, 0.5],
        }}
        transition={{
          duration: isSpeaking ? 0.35 : isThinking ? 0.8 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="ai-core-ring ai-core-ring--outer" />
      <div className="ai-core-ring ai-core-ring--mid" />
      <div className="ai-core-ring ai-core-ring--inner" />
      <div className="ai-core-scanner" />

      <svg viewBox="0 0 400 400" className="ai-core-svg" aria-hidden>
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="200" cy="200" r="185" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 10" opacity="0.25" />
          <circle cx="200" cy="200" r="175" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 16" opacity="0.35" />
        </motion.g>

        <AnimatePresence>
          {isListening && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={i}
                  cx="200"
                  cy="200"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  initial={{ r: 70, opacity: 0.7 }}
                  animate={{ r: 190, opacity: 0 }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.55, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="200" cy="200" r="145" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="40 15 8 15" opacity="0.55" />
        </motion.g>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <polygon points="200,55 318,125 318,275 200,345 82,275 82,125" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        </motion.g>

        <motion.g
          animate={{
            rotate: 360,
            scale: isSpeaking ? [1, 1.12, 1] : [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
            scale: { duration: isSpeaking ? 0.25 : 2.5, repeat: Infinity },
          }}
        >
          <circle cx="200" cy="200" r="55" fill="url(#coreGrad)" opacity="0.35" />
          <circle cx="200" cy="200" r="35" fill="currentColor" opacity="0.25" />
          <circle cx="200" cy="200" r="18" fill="currentColor" opacity="0.95" />
        </motion.g>

        {isSpeaking &&
          [...Array(6)].map((_, i) => (
            <motion.line
              key={i}
              x1="200"
              y1="200"
              x2={200 + Math.cos((i * Math.PI) / 3) * 90}
              y2={200 + Math.sin((i * Math.PI) / 3) * 90}
              stroke="currentColor"
              strokeWidth="1"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: [0, 0.6, 0], pathLength: [0, 1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
      </svg>

      <div className="ai-core-particles">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="ai-core-particle"
            style={{ '--i': i } as React.CSSProperties}
            animate={{
              y: [0, -20 - i * 2, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
})

AICoreSphere.displayName = 'AICoreSphere'
