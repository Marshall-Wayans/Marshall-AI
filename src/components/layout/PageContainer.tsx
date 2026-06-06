import { useEffect, type ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { pageTransitionConfig, pageTransitionVariants } from '@/hooks'
import { RouteErrorBoundary } from '@/components/errors'
import { NAV_ITEMS } from '@/constants'
import { useNavigationStore } from '@/store'

export const PageContainer = () => {
  const location = useLocation()
  const setLastVisitedPath = useNavigationStore((s) => s.setLastVisitedPath)
  const setBreadcrumbs = useNavigationStore((s) => s.setBreadcrumbs)

  useEffect(() => {
    setLastVisitedPath(location.pathname)
    const match = NAV_ITEMS.find((item) => item.path === location.pathname)
    const label =
      match?.label ??
      (location.pathname.includes('profile')
        ? 'Profile'
        : location.pathname.includes('logs')
          ? 'Logs'
          : 'Module')
    setBreadcrumbs([label])
  }, [location.pathname, setLastVisitedPath, setBreadcrumbs])

  return (
    <main className="app-main">
      <RouteErrorBoundary>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={pageTransitionVariants.initial}
            animate={pageTransitionVariants.animate}
            exit={pageTransitionVariants.exit}
            transition={pageTransitionConfig}
            style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </RouteErrorBoundary>
    </main>
  )
}

export const PageContainerStatic = ({ children }: { children: ReactNode }) => (
  <main className="app-main">{children}</main>
)
