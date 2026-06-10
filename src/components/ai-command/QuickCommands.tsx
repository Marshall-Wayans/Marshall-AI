import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { QUICK_COMMANDS, type QuickCommand } from '@/constants/aiCommands'

interface QuickCommandsProps {
  onCommand: (command: QuickCommand) => void
  disabled?: boolean
}

export const QuickCommands = memo<QuickCommandsProps>(({ onCommand, disabled }) => {
  const navigate = useNavigate()

  const handleClick = useCallback(
    (cmd: QuickCommand) => {
      if (disabled) return
      onCommand(cmd)
      window.setTimeout(() => navigate(cmd.route), 1200)
    },
    [onCommand, disabled, navigate]
  )

  return (
    <div className="ai-quick-commands">
      {QUICK_COMMANDS.map((cmd, i) => (
        <motion.button
          key={cmd.id}
          type="button"
          className="ai-quick-command-chip"
          onClick={() => handleClick(cmd)}
          disabled={disabled}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          {cmd.label}
        </motion.button>
      ))}
    </div>
  )
})

QuickCommands.displayName = 'QuickCommands'
