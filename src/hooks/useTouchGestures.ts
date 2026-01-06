import { useEffect, useRef } from 'react'

interface TouchGesturesOptions {
  /** Element to attach touch listeners */
  target: React.RefObject<HTMLElement>
  /** Callback for pinch zoom */
  onPinch?: (scale: number, delta: number) => void
  /** Callback for two-finger pan */
  onTwoFingerPan?: (deltaX: number, deltaY: number) => void
  /** Callback for single-finger rotate */
  onRotate?: (deltaX: number, deltaY: number) => void
  /** Minimum pinch distance to trigger zoom */
  minPinchDistance?: number
}

interface TouchState {
  initial: Touch[]
  current: Touch[]
  initialDistance: number
  initialCenter: { x: number; y: number }
}

/**
 * Custom hook for advanced touch gestures in 3D viewer
 *
 * Provides:
 * - Pinch to zoom
 * - Two-finger pan
 * - Single-finger rotate
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 *
 * useTouchGestures({
 *   target: containerRef,
 *   onPinch: (scale, delta) => {
 *     console.log('Pinch zoom:', scale)
 *   },
 *   onTwoFingerPan: (dx, dy) => {
 *     console.log('Pan:', dx, dy)
 *   },
 * })
 * ```
 */
export function useTouchGestures({
  target,
  onPinch,
  onTwoFingerPan,
  onRotate,
  minPinchDistance = 20,
}: TouchGesturesOptions) {
  const touchState = useRef<TouchState | null>(null)

  useEffect(() => {
    const element = target.current
    if (!element) return

    // Calculate distance between two touches
    const getDistance = (touch1: Touch, touch2: Touch): number => {
      const dx = touch2.clientX - touch1.clientX
      const dy = touch2.clientY - touch1.clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    // Calculate center point between two touches
    const getCenter = (touch1: Touch, touch2: Touch) => ({
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    })

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return

      const touches = Array.from(e.touches)

      if (e.touches.length === 2) {
        // Two-finger gesture (pinch/pan)
        const distance = getDistance(touches[0], touches[1])
        const center = getCenter(touches[0], touches[1])

        touchState.current = {
          initial: touches,
          current: touches,
          initialDistance: distance,
          initialCenter: center,
        }
      } else if (e.touches.length === 1) {
        // Single-finger gesture (rotate)
        touchState.current = {
          initial: touches,
          current: touches,
          initialDistance: 0,
          initialCenter: { x: touches[0].clientX, y: touches[0].clientY },
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchState.current || e.touches.length === 0) return

      const touches = Array.from(e.touches)

      if (e.touches.length === 2 && touchState.current.initial.length === 2) {
        // Two-finger gesture
        e.preventDefault() // Prevent default browser zoom

        const currentDistance = getDistance(touches[0], touches[1])
        const currentCenter = getCenter(touches[0], touches[1])

        // Pinch zoom
        if (onPinch && touchState.current.initialDistance > minPinchDistance) {
          const scale = currentDistance / touchState.current.initialDistance
          const delta = currentDistance - touchState.current.initialDistance

          onPinch(scale, delta)
        }

        // Two-finger pan
        if (onTwoFingerPan) {
          const deltaX = currentCenter.x - touchState.current.initialCenter.x
          const deltaY = currentCenter.y - touchState.current.initialCenter.y

          onTwoFingerPan(deltaX, deltaY)
        }

        // Update state for continuous gestures
        touchState.current = {
          ...touchState.current,
          current: touches,
          initialDistance: currentDistance,
          initialCenter: currentCenter,
        }
      } else if (e.touches.length === 1 && touchState.current.initial.length === 1) {
        // Single-finger rotate
        if (onRotate) {
          const deltaX = touches[0].clientX - touchState.current.initialCenter.x
          const deltaY = touches[0].clientY - touchState.current.initialCenter.y

          onRotate(deltaX, deltaY)

          // Update for continuous rotation
          touchState.current = {
            ...touchState.current,
            current: touches,
            initialCenter: { x: touches[0].clientX, y: touches[0].clientY },
          }
        }
      }
    }

    const handleTouchEnd = () => {
      touchState.current = null
    }

    // Add event listeners with passive: false to enable preventDefault
    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd)
    element.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [target, onPinch, onTwoFingerPan, onRotate, minPinchDistance])
}
