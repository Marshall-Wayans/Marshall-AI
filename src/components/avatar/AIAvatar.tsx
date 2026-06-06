import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Loader2, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useSettingsStore } from '@/store'
import '@/styles/AIAvatar.css'
type AvatarState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'ERROR'
export const AIAvatar: React.FC = () => {
  const [currentState, setCurrentState] = useState<AvatarState>('IDLE')
  const [time, setTime] = useState(new Date())
  const [transcript, setTranscript] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [supported, setSupported] = useState(true)
  const recognitionRef = useRef<any>(null)
  const { user } = useAuth()
  const settings = useSettingsStore((s) => s.settings)
  const getGreeting = () => {
    const hour = time.getHours()
    const name = user?.fullName?.split(' ')[0] || 'COMMANDER'
    if (hour >= 5 && hour < 12) return `GOOD MORNING, ${name}`
    if (hour >= 12 && hour < 17) return `GOOD AFTERNOON, ${name}`
    if (hour >= 17 && hour < 21) return `GOOD EVENING, ${name}`
    return `GOOD NIGHT, ${name}`
  }
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
      return
    }
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = settings.language === 'es' ? 'es-ES' : 'en-US'
    recognition.onresult = (event: any) => {
      let finalText = ''
      let interimText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript
        if (event.results[i].isFinal) finalText += t
        else interimText += t
      }
      setTranscript(finalText || interimText)
      if (finalText) {
        respondToUser(finalText)
      }
    }
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error)
      setCurrentState('ERROR')
      setTimeout(() => setCurrentState('IDLE'), 3000)
    }
    recognition.onend = () => {
      if (currentState === 'LISTENING') {
        setCurrentState('IDLE')
      }
    }
    recognitionRef.current = recognition
  }, [settings.language])
  const respondToUser = (userText: string) => {
    setCurrentState('THINKING')
    const name = user?.fullName?.split(' ')[0] || 'Commander'
    setTimeout(() => {
      const responses = [
        `Acknowledged, ${name}. Processing your directive: ${userText.slice(0, 40)}`,
        `Affirmative. I have logged your command and am executing now.`,
        `Understood, ${name}. Initiating protocol based on your request.`,
        `Command received. Neural pathways are aligned with your objective.`,
      ]
      const response = responses[Math.floor(Math.random() * responses.length)]
      setAiResponse(response)
      setCurrentState('SPEAKING')
      if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(response)
        utter.lang = settings.language === 'es' ? 'es-ES' : 'en-US'
        utter.rate = 1
        utter.pitch = 0.9
        utter.onend = () => setCurrentState('IDLE')
        window.speechSynthesis.speak(utter)
      } else {
        setTimeout(() => setCurrentState('IDLE'), 3500)
      }
    }, 1500)
  }
  const handleVoiceToggle = () => {
    if (!supported) return
    if (currentState === 'LISTENING') {
      recognitionRef.current?.stop()
      setCurrentState('IDLE')
    } else if (currentState === 'IDLE' || currentState === 'ERROR') {
      setTranscript('')
      setAiResponse('')
      try {
        recognitionRef.current?.start()
        setCurrentState('LISTENING')
      } catch (e) {
        console.error(e)
      }
    }
  }
  const isListening = currentState === 'LISTENING'
  const isThinking = currentState === 'THINKING'
  const isSpeaking = currentState === 'SPEAKING'
  const isError = currentState === 'ERROR'
  const isBusy = isThinking || isSpeaking
  // Determine button CSS classes based on state
  let micClass = 'mic-button'
  if (isListening) micClass += ' is-listening'
  if (isThinking) micClass += ' is-processing'
  if (isError) micClass += ' is-error'
  if (!supported) micClass += ' is-disabled'
  return (
    <div className="avatar-container">
      <div className="avatar-greeting-wrapper">
        <h2 className="avatar-greeting">{getGreeting()}</h2>
        <div className="avatar-time-sync">
          <span>SYS.TIME: {time.toLocaleTimeString()}</span>
          <span className="avatar-sync-dot animate-pulse" />
          <span>SYNC: 99.9%</span>
        </div>
      </div>

      <div className="avatar-core-wrapper">
        <motion.div
          className="avatar-ambient-glow"
          animate={{
            scale: isSpeaking ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: isSpeaking ? Infinity : 0,
          }}
        />

        <svg viewBox="0 0 400 400" className="avatar-svg">
          <motion.g
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 12"
              opacity="0.3"
            />
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.2"
            />
            <circle cx="20" cy="200" r="3" fill="currentColor" />
            <circle cx="380" cy="200" r="3" fill="currentColor" />
            <circle cx="200" cy="20" r="3" fill="currentColor" />
            <circle cx="200" cy="380" r="3" fill="currentColor" />
          </motion.g>

          <AnimatePresence>
            {isListening && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    cx="200"
                    cy="200"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{
                      r: 60,
                      opacity: 0.8,
                    }}
                    animate={{
                      r: 180,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          <motion.g
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="60 20 10 20"
              opacity="0.6"
            />
            <path
              d="M 60 200 A 140 140 0 0 1 340 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
          </motion.g>

          <motion.g
            animate={{
              rotate: 360,
              scale: isSpeaking
                ? [1, 1.1, 1]
                : isListening
                  ? [1, 1.05, 1]
                  : [1, 1.03, 1],
            }}
            transition={{
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              },
              scale: {
                duration: isSpeaking ? 0.2 : 3,
                repeat: Infinity,
              },
            }}
          >
            <polygon
              points="200,80 304,140 304,260 200,320 96,260 96,140"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.8"
            />
            <polygon
              points="200,100 286,150 286,250 200,300 114,250 114,150"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="40"
              fill="currentColor"
              opacity="0.2"
            />
            <circle
              cx="200"
              cy="200"
              r="20"
              fill="currentColor"
              opacity="0.8"
            />
          </motion.g>
        </svg>
      </div>

      <div className="avatar-bottom-section">
        <div className="avatar-state-label">
          <motion.div
            className="avatar-state-dot"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
          <h3 className="avatar-state-text">NEURAL CORE • {currentState}</h3>
        </div>

        <div className="avatar-waveform">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="avatar-waveform-bar"
              animate={{
                height: isSpeaking
                  ? ['20%', `${Math.random() * 80 + 20}%`, '20%']
                  : isListening
                    ? ['10%', `${Math.random() * 60 + 20}%`, '10%']
                    : '10%',
              }}
              transition={{
                duration:
                  isSpeaking || isListening ? 0.2 + Math.random() * 0.2 : 1,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {(transcript || aiResponse) && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="avatar-transcript"
            >
              {transcript && !isSpeaking && (
                <div className="avatar-transcript-user">
                  <span>{`> `}</span>
                  {transcript}
                </div>
              )}
              {aiResponse && isSpeaking && (
                <div className="avatar-transcript-ai">{aiResponse}</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mic-button-wrapper">
          {isListening && (
            <>
              <div className="mic-pulse-ring" />
              <div className="mic-pulse-ring" />
            </>
          )}

          <button
            onClick={handleVoiceToggle}
            disabled={isBusy || !supported}
            className={micClass}
            title={
              !supported
                ? 'Microphone not supported in this browser'
                : 'Toggle Microphone'
            }
          >
            {isListening ? (
              <MicOff size={22} />
            ) : isThinking ? (
              <Loader2 size={22} className="mic-spinner" />
            ) : isError ? (
              <AlertTriangle size={22} />
            ) : (
              <Mic size={22} />
            )}
          </button>

          <div className="mic-label">
            {isListening
              ? 'TAP TO STOP'
              : isThinking
                ? 'PROCESSING...'
                : isError
                  ? 'ERROR'
                  : !supported
                    ? 'UNSUPPORTED'
                    : 'TAP TO SPEAK'}
          </div>
        </div>
      </div>
    </div>
  )
}
