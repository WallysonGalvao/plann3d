'use client'

/**
 * IFC Selector Component
 * Handles raycasting and element selection in the IFC model
 */

import { useRef, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'

// ============================================
// HIGHLIGHT MATERIAL
// ============================================

const HIGHLIGHT_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0x17b0cf,
  transparent: true,
  opacity: 0.6,
  emissive: 0x17b0cf,
  emissiveIntensity: 0.3,
})

// ============================================
// COMPONENT
// ============================================

export function IFCSelector() {
  const { camera, scene, gl } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())

  const selectElement = useIFCViewerStore((state) => state.selectElement)
  const highlightElement = useIFCViewerStore((state) => state.highlightElement)

  // Store original materials for restoration
  const originalMaterials = useRef(new Map<number, THREE.Material | THREE.Material[]>())
  const highlightedMesh = useRef<THREE.Mesh | null>(null)

  const restoreHighlight = useCallback(() => {
    if (highlightedMesh.current) {
      const id = highlightedMesh.current.id
      const originalMaterial = originalMaterials.current.get(id)
      if (originalMaterial) {
        highlightedMesh.current.material = originalMaterial
      }
      highlightedMesh.current = null
    }
  }, [])

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = gl.domElement.getBoundingClientRect()
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.current.setFromCamera(mouse.current, camera)

      // Find intersections with IFC model meshes
      const intersects = raycaster.current.intersectObjects(scene.children, true)

      const meshIntersect = intersects.find(
        (i) => i.object instanceof THREE.Mesh && i.object.geometry
      )

      restoreHighlight()

      if (meshIntersect && meshIntersect.object instanceof THREE.Mesh) {
        const mesh = meshIntersect.object

        // Store original material
        if (!originalMaterials.current.has(mesh.id)) {
          originalMaterials.current.set(mesh.id, mesh.material)
        }

        // Apply highlight
        mesh.material = HIGHLIGHT_MATERIAL
        highlightedMesh.current = mesh
        highlightElement(mesh.id)

        gl.domElement.style.cursor = 'pointer'
      } else {
        highlightElement(null)
        gl.domElement.style.cursor = 'default'
      }
    },
    [camera, scene, gl, highlightElement, restoreHighlight]
  )

  const handleClick = useCallback(
    (event: MouseEvent) => {
      // Only process left clicks
      if (event.button !== 0) return

      const rect = gl.domElement.getBoundingClientRect()
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.current.setFromCamera(mouse.current, camera)
      const intersects = raycaster.current.intersectObjects(scene.children, true)

      const meshIntersect = intersects.find(
        (i) => i.object instanceof THREE.Mesh && i.object.geometry
      )

      if (meshIntersect && meshIntersect.object instanceof THREE.Mesh) {
        const mesh = meshIntersect.object

        // Get IFC properties (if available via userData)
        const expressID = mesh.userData?.expressID

        selectElement(mesh.id, {
          expressID: expressID ?? mesh.id,
          type: mesh.name || 'Unknown',
          name: mesh.userData?.name,
          properties: mesh.userData ?? {},
        })

        console.log('[IFCSelector] Selected:', mesh.name, mesh.userData)
      } else {
        selectElement(null)
      }
    },
    [camera, scene, gl, selectElement]
  )

  // Add event listeners
  useThree(({ gl: renderer }) => {
    const canvas = renderer.domElement

    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('click', handleClick)

    return () => {
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('click', handleClick)
    }
  })

  // Cleanup on unmount
  return null
}
