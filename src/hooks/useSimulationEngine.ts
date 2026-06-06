import { useEffect } from 'react'
import { useSimulationStore } from '@/store/simulationStore'

const TICK_INTERVAL_MS = 3000

/** Starts the global real-time simulation loop. Mount once at app shell level. */
export const useSimulationEngine = () => {
  const tick = useSimulationStore((s) => s.tick)

  useEffect(() => {
    const id = window.setInterval(tick, TICK_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [tick])
}
