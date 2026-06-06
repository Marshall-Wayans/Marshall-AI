import { useEffect, useState } from 'react'

/** Simulates character-by-character AI response streaming. */
export const useStreamingText = (
  fullText: string,
  active: boolean,
  charsPerTick = 2,
  intervalMs = 28
) => {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!active || !fullText) {
      setDisplayed('')
      setIsComplete(false)
      return
    }

    setDisplayed('')
    setIsComplete(false)
    let index = 0

    const id = window.setInterval(() => {
      index = Math.min(index + charsPerTick, fullText.length)
      setDisplayed(fullText.slice(0, index))
      if (index >= fullText.length) {
        setIsComplete(true)
        window.clearInterval(id)
      }
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [fullText, active, charsPerTick, intervalMs])

  return { displayed, isComplete }
}
