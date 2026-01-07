'use client'

/**
 * IFC Model Component
 * Loads and renders IFC model using web-ifc-three
 */

import { useEffect, useRef, useState } from 'react'
import { IFCLoader } from 'web-ifc-three'
import * as THREE from 'three'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'

// ============================================
// TYPES
// ============================================

interface IFCModelProps {
  url: string
  onLoad?: () => void
  onError?: (error: Error) => void
}

// ============================================
// COMPONENT
// ============================================

export function IFCModel({ url, onLoad, onError }: IFCModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [model, setModel] = useState<THREE.Object3D | null>(null)

  const setModelLoading = useIFCViewerStore((state) => state.setModelLoading)
  const setModelError = useIFCViewerStore((state) => state.setModelError)

  useEffect(() => {
    let mounted = true
    let loadedModel: THREE.Object3D | null = null

    async function loadModel() {
      setModelLoading(true)
      setModelError(null)

      try {
        const loader = new IFCLoader()

        // Set WASM path - files copied to public/wasm/
        await loader.ifcManager.setWasmPath('/wasm/')

        // Load the model
        const loaded = (await loader.loadAsync(url)) as THREE.Object3D

        if (!mounted) {
          // Component unmounted during loading
          return
        }

        // Center the model
        const box = new THREE.Box3().setFromObject(loaded)
        const center = box.getCenter(new THREE.Vector3())
        loaded.position.sub(center)

        // Scale to reasonable size if needed
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        if (maxDim > 100) {
          const scale = 50 / maxDim
          loaded.scale.setScalar(scale)
        }

        loadedModel = loaded
        setModel(loaded)
        setModelLoading(false)

        console.log('[IFCModel] Model loaded successfully')
        onLoad?.()
      } catch (error) {
        console.error('[IFCModel] Failed to load:', error)
        if (mounted) {
          setModelLoading(false)
          const err = error instanceof Error ? error : new Error('Failed to load IFC model')
          setModelError(err.message)
          onError?.(err)
        }
      }
    }

    loadModel()

    return () => {
      mounted = false
      if (loadedModel) {
        // Clean up geometry and materials
        loadedModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose())
            } else {
              child.material?.dispose()
            }
          }
        })
      }
    }
  }, [url, onLoad, onError, setModelLoading, setModelError])

  if (!model) {
    return null
  }

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  )
}
