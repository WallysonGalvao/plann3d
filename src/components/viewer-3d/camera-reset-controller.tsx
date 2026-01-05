import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

interface CameraResetControllerProps {
  trigger: number
  initialPosition: [number, number, number]
  controlsRef: React.RefObject<any>
}

export function CameraResetController({
  trigger,
  initialPosition,
  controlsRef,
}: CameraResetControllerProps) {
  const { camera } = useThree()

  useEffect(() => {
    if (trigger === 0 || !controlsRef.current) return

    const startPosition = camera.position.clone()
    const startTarget = controlsRef.current.target.clone()
    const endPosition = new THREE.Vector3(...initialPosition)
    const endTarget = new THREE.Vector3(0, 0, 0)

    let progress = 0
    const duration = 800 // 0.8 seconds animation
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      progress = Math.min(elapsed / duration, 1)

      // Ease-in-out animation
      const eased =
        progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

      // Interpolate camera position
      camera.position.lerpVectors(startPosition, endPosition, eased)

      // Interpolate camera target to origin
      const newTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, eased)
      controlsRef.current.target.copy(newTarget)

      controlsRef.current.update()

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [trigger, camera, controlsRef, initialPosition])

  return null
}
