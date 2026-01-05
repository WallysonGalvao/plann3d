import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { CAMERA_PRESETS } from './camera-preset-controller'

interface AutoTourControllerProps {
  controlsRef: React.RefObject<any>
}

export function AutoTourController({ controlsRef }: AutoTourControllerProps) {
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return

    const presets = Object.values(CAMERA_PRESETS)
    let currentIndex = 0
    const intervalDuration = 4000 // 4 seconds per preset

    const rotateCamera = () => {
      const targetPreset = presets[currentIndex]
      const startPosition = camera.position.clone()
      const startTarget = controlsRef.current.target.clone()
      const endPosition = new THREE.Vector3(...targetPreset.position)
      const endTarget = new THREE.Vector3(...targetPreset.target)

      let progress = 0
      const duration = 1500 // 1.5 seconds animation
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        progress = Math.min(elapsed / duration, 1)

        const eased =
          progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

        camera.position.lerpVectors(startPosition, endPosition, eased)
        const newTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, eased)
        controlsRef.current.target.copy(newTarget)
        controlsRef.current.update()

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
      currentIndex = (currentIndex + 1) % presets.length
    }

    // Start tour
    rotateCamera()
    const interval = setInterval(rotateCamera, intervalDuration)

    return () => clearInterval(interval)
  }, [camera, controlsRef])

  return null
}
