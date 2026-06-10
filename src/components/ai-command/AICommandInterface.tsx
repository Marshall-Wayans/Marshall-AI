import {
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
} from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff, Loader2, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useSettingsStore } from '@/store'
import { useAIConversationStore } from '@/store/aiConversationStore'
import { useAIResponses } from '@/hooks/useAIResponses'
import { useStreamingText } from '@/hooks/useStreamingText'
import type { QuickCommand } from '@/constants/aiCommands'
import { AICoreSphere, type CoreState } from './AICoreSphere'
import { VoiceWaveform } from './VoiceWaveform'
import { AIResponsePanel } from './AIResponsePanel'
import { ConversationHistory } from './ConversationHistory'
import { QuickCommands } from './QuickCommands'
import { AIStatusBar } from './AIStatusBar'
import '@/styles/AICommand.css'

const MIC_LABELS: Record<CoreState, string> = {
  IDLE: 'Tap To Speak',
  LISTENING: 'Listening...',
  THINKING: 'Analyzing...',
  SPEAKING: 'Speaking...',
  ERROR: 'Error — Tap To Retry',
}

export const AICommandInterface = memo(() => {
  const [state, setState] = useState<CoreState>('IDLE')
  const [time, setTime] = useState(new Date())
  const [transcript, setTranscript] = useState('')
  const [fullResponse, setFullResponse] = useState('')
  const [supported, setSupported] = useState(true)
  const [streamActive, setStreamActive] = useState(false)
  const recognitionRef = useRef<{ start: () => void; stop: () => void; abort: () => void } | null>(null)
  const stateRef = useRef<CoreState>('IDLE')

  const { user } = useAuth()
  const settings = useSettingsStore((s) => s.settings)
  const entries = useAIConversationStore((s) => s.entries)
  const addEntry = useAIConversationStore((s) => s.addEntry)
  const { generateResponse } = useAIResponses()

  const commanderName = user?.fullName?.split(' ')[0] || 'Commander'
  const { displayed, isComplete } = useStreamingText(fullResponse, streamActive)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = useCallback(() => {
    const hour = time.getHours()
    if (hour >= 5 && hour < 12) return `GOOD MORNING, ${commanderName.toUpperCase()}`
    if (hour >= 12 && hour < 17) return `GOOD AFTERNOON, ${commanderName.toUpperCase()}`
    if (hour >= 17 && hour < 21) return `GOOD EVENING, ${commanderName.toUpperCase()}`
    return `GOOD NIGHT, ${commanderName.toUpperCase()}`
  }, [time, commanderName])

  const speakResponse = useCallback(
    (text: string) => {
      setFullResponse(text)
      setStreamActive(true)
      setState('SPEAKING')
      addEntry({ role: 'ai', text, module: 'AI Command' })

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utter = new SpeechSynthesisUtterance(text)
        utter.lang = settings.language === 'es' ? 'es-ES' : 'en-US'
        utter.rate = 0.95
        utter.pitch = 0.92
        utter.onend = () => {
          setStreamActive(false)
          setState('IDLE')
        }
        window.speechSynthesis.speak(utter)
      } else {
        const duration = Math.max(2500, text.length * 35)
        setTimeout(() => {
          setStreamActive(false)
          setState('IDLE')
        }, duration)
      }
    },
    [addEntry, settings.language]
  )

  const respondToUser = useCallback(
    (userText: string, module?: string) => {
      setState('THINKING')
      addEntry({ role: 'user', text: userText, module })
      setTranscript('')

      setTimeout(() => {
        const response = generateResponse(userText, commanderName)
        speakResponse(response)
      }, 1400)
    },
    [addEntry, generateResponse, commanderName, speakResponse]
  )

  useEffect(() => {
    const w = window as Window & {
      SpeechRecognition?: new () => SpeechRecognitionLike
      webkitSpeechRecognition?: new () => SpeechRecognitionLike
    }
    const SpeechRecognitionCtor = w.SpeechRecognition ?? w.webkitSpeechRecognition
    if (!SpeechRecognitionCtor) {
      setSupported(false)
      return
    }

    const recognition = new SpeechRecognitionCtor()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = settings.language === 'es' ? 'es-ES' : 'en-US'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalText = ''
      let interimText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript
        if (event.results[i].isFinal) finalText += t
        else interimText += t
      }
      setTranscript(finalText || interimText)
      if (finalText) respondToUser(finalText)
    }

    recognition.onerror = () => {
      setState('ERROR')
      setTimeout(() => setState('IDLE'), 3000)
    }

    recognition.onend = () => {
      if (stateRef.current === 'LISTENING') setState('IDLE')
    }

    recognitionRef.current = recognition
    return () => recognition.abort()
  }, [settings.language, respondToUser])

  const handleVoiceToggle = useCallback(() => {
    if (!supported) return
    if (state === 'LISTENING') {
      recognitionRef.current?.stop()
      setState('IDLE')
    } else if (state === 'IDLE' || state === 'ERROR') {
      setTranscript('')
      setFullResponse('')
      setStreamActive(false)
      try {
        recognitionRef.current?.start()
        setState('LISTENING')
      } catch {
        setState('ERROR')
      }
    }
  }, [supported, state])

  const handleQuickCommand = useCallback(
    (cmd: QuickCommand) => {
      if (state === 'THINKING' || state === 'SPEAKING') return
      respondToUser(cmd.prompt, cmd.label)
    },
    [state, respondToUser]
  )

  const isBusy = state === 'THINKING' || state === 'SPEAKING'
  const isListening = state === 'LISTENING'
  const isThinking = state === 'THINKING'
  const isError = state === 'ERROR'

  let micClass = 'ai-mic-button'
  if (isListening) micClass += ' is-listening'
  if (isThinking) micClass += ' is-processing'
  if (state === 'SPEAKING') micClass += ' is-speaking'
  if (isError) micClass += ' is-error'
  if (!supported) micClass += ' is-disabled'

  return (
    <div className="ai-command-interface">
      <header className="ai-command-header">
        <div>
          <h1 className="ai-command-greeting">{getGreeting()}</h1>
          <p className="ai-command-subtitle">
            CORE INTELLIGENCE ONLINE · SYS.TIME {time.toLocaleTimeString()}
          </p>
        </div>
        <AIStatusBar state={state} />
      </header>

      <div className="ai-command-body">
        <aside className="ai-command-sidebar">
          <ConversationHistory entries={entries} />
        </aside>

        <main className="ai-command-main">
          <AICoreSphere state={state} />
          <VoiceWaveform state={state} />

          <AIResponsePanel
            displayedText={displayed}
            isStreaming={streamActive}
            isComplete={isComplete}
            visible={!!fullResponse || streamActive}
          />

          {transcript && state === 'LISTENING' && (
            <motion.p
              className="ai-live-transcript"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              &gt; {transcript}
            </motion.p>
          )}

          <div className="ai-mic-section">
            {isListening && (
              <>
                <div className="ai-mic-pulse-ring" />
                <div className="ai-mic-pulse-ring" />
              </>
            )}
            <button
              type="button"
              onClick={handleVoiceToggle}
              disabled={isBusy || !supported}
              className={micClass}
              aria-label={MIC_LABELS[state]}
            >
              {isListening ? (
                <MicOff size={28} />
              ) : isThinking ? (
                <Loader2 size={28} className="ai-mic-spinner" />
              ) : isError ? (
                <AlertTriangle size={28} />
              ) : (
                <Mic size={28} />
              )}
            </button>
            <span className="ai-mic-label">{supported ? MIC_LABELS[state] : 'UNSUPPORTED'}</span>
          </div>

          <QuickCommands onCommand={handleQuickCommand} disabled={isBusy} />
        </main>
      </div>
    </div>
  )
})

AICommandInterface.displayName = 'AICommandInterface'
