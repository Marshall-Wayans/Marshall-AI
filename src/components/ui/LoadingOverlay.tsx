import { AnimatePresence, motion } from 'framer-motion'
import { useUiStore } from '@/store'

export const LoadingOverlay = () => {
  const isGlobalLoading = useUiStore((s) => s.isGlobalLoading)

  return (
    <AnimatePresence>
      {isGlobalLoading && (
        <motion.div
          className="ui-loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-busy
          aria-label="Loading"
        >
          <div className="ui-loading-spinner" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
