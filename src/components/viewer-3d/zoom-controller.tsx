import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ZoomControllerProps {
  /** Zoom level from 10 to 200 (50 = normal, <50 = closer, >50 = farther) */
  zoomLevel: number
  /** Reference to OrbitControls */
  controlsRef: React.RefObject<any>
  /** Initial camera position */
  initialPosition: [number, number, number]
}

/**
 * Controls camera zoom based on zoom level slider
 *
 * Adjusts camera distance from target smoothly
 */
export function ZoomController({ zoomLevel, controlsRef, initialPosition }: ZoomControllerProps) {
  const { camera } = useThree()
  const previousZoomLevel = useRef(zoomLevel)

  useEffect(() => {
    if (!controlsRef.current) return

    // Only apply zoom when slider actually changes
    if (previousZoomLevel.current === zoomLevel) return
    previousZoomLevel.current = zoomLevel

    // Calculate zoom factor (50 = 1.0x, 10 = 0.2x, 200 = 4.0x)
    const zoomFactor = zoomLevel / 50

    // Get target position
    const target = controlsRef.current.target as THREE.Vector3

    // Calculate direction from target to camera
    const direction = new THREE.Vector3()
      .subVectors(camera.position, target)
      .normalize()

    // Calculate initial distance
    const initialDistance = Math.sqrt(
      initialPosition[0] ** 2 + initialPosition[1] ** 2 + initialPosition[2] ** 2,
    )

    // New distance based on zoom factor
    const newDistance = initialDistance / zoomFactor

    // Set new camera position IMMEDIATELY (no animation for instant response)
    const newPosition = target.clone().add(direction.multiplyScalar(newDistance))
    camera.position.copy(newPosition)
    controlsRef.current.update()
  }, [zoomLevel, camera, controlsRef, initialPosition])

  return null
}
