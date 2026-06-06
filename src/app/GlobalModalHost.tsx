import { Modal } from '@/components/ui'
import { useUiStore } from '@/store'

/** Global modal mount point — register modals by id via uiStore.openModal */
export const GlobalModalHost = () => {
  const activeModalId = useUiStore((s) => s.activeModalId)

  if (!activeModalId) return null

  return (
    <Modal id={activeModalId} title="SYSTEM DIALOG">
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: '#94a3b8',
        }}
      >
        Modal surface ready for future command overlays.
      </p>
    </Modal>
  )
}
