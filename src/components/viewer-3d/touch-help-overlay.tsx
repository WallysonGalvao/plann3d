import { motion, AnimatePresence } from 'framer-motion'
import { Hand, Move, ZoomIn, RotateCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface TouchHelpOverlayProps {
  /** Auto-hide after this many seconds */
  autoHideDuration?: number
}

/**
 * Touch gesture help overlay for 3D viewer
 *
 * Shows on first load for mobile users, can be toggled via button
 */
export function TouchHelpOverlay({ autoHideDuration = 5 }: TouchHelpOverlayProps) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)

  // Detect if device supports touch
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window

  useEffect(() => {
    // Only show automatically on touch devices and if never shown before
    const hasShownBefore = localStorage.getItem('plann3d_touch_help_shown')

    if (isTouchDevice && !hasShownBefore && !hasBeenShown) {
      setIsVisible(true)
      setHasBeenShown(true)
      localStorage.setItem('plann3d_touch_help_shown', 'true')

      // Auto-hide after duration
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, autoHideDuration * 1000)

      return () => clearTimeout(timer)
    }
  }, [isTouchDevice, autoHideDuration, hasBeenShown])

  if (!isTouchDevice) return null

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute top-4 right-4 z-30 p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg hover:bg-background transition-colors"
        aria-label="Toggle touch help"
      >
        <Hand size={20} className="text-foreground" />
      </button>

      {/* Help Overlay */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30 max-w-sm"
          >
            <div className="bg-background/95 backdrop-blur-md border border-border rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {t('viewer3d.touchHelp.title', 'Touch Gestures')}
                </h3>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {/* One finger rotate */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <RotateCw size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {t('viewer3d.touchHelp.rotate', 'One Finger')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('viewer3d.touchHelp.rotateDesc', 'Drag to rotate model')}
                    </p>
                  </div>
                </div>

                {/* Two finger zoom */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ZoomIn size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {t('viewer3d.touchHelp.pinch', 'Pinch')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('viewer3d.touchHelp.pinchDesc', 'Pinch to zoom in/out')}
                    </p>
                  </div>
                </div>

                {/* Two finger pan */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Move size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {t('viewer3d.touchHelp.twoFingers', 'Two Fingers')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('viewer3d.touchHelp.twoFingersDesc', 'Drag to pan view')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
