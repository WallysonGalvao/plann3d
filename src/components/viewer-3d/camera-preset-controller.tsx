import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

export const CAMERA_PRESETS: Record<
  'front' | 'back' | 'left' | 'right' | 'top' | 'perspective',
  { position: [number, number, number]; target: [number, number, number] }
> = {
  front: { position: [0, 3, 15], target: [0, 0, 0] },
  back: { position: [0, 3, -15], target: [0, 0, 0] },
  left: { position: [-15, 3, 0], target: [0, 0, 0] },
  right: { position: [15, 3, 0], target: [0, 0, 0] },
  top: { position: [0, 20, 0], target: [0, 0, 0] },
  perspective: { position: [12, 12, 12], target: [0, 0, 0] },
}

interface CameraPresetControllerProps {
  preset: 'front' | 'back' | 'left' | 'right' | 'top' | 'perspective'
  controlsRef: React.RefObject<any>
  onApplied?: () => void
}

export function CameraPresetController({
  preset,
  controlsRef,
  onApplied,
}: CameraPresetControllerProps) {
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return

    const targetPreset = CAMERA_PRESETS[preset]
    const startPosition = camera.position.clone()
    const startTarget = controlsRef.current.target.clone()
    const endPosition = new THREE.Vector3(...targetPreset.position)
    const endTarget = new THREE.Vector3(...targetPreset.target)

    let progress = 0
    const duration = 1000 // 1 second animation
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      progress = Math.min(elapsed / duration, 1)

      // Ease-in-out animation
      const eased =
        progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

      // Interpolate camera position
      camera.position.lerpVectors(startPosition, endPosition, eased)

      // Interpolate camera target
      const newTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, eased)
      controlsRef.current.target.copy(newTarget)

      controlsRef.current.update()

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else if (onApplied) {
        onApplied()
      }
    }

    animate()
  }, [preset, camera, controlsRef, onApplied])

  return null
}
