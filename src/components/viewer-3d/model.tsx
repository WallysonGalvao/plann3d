import { Center, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import { debugGLTFLayers } from '@/lib/gltf-layer-utils'

export interface ModelMetadata {
  vertices: number
  triangles: number
  materials: number
  objects: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  boundingBox: {
    min: { x: number; y: number; z: number }
    max: { x: number; y: number; z: number }
  }
  fileSize?: string
  format?: string
  textures?: number
  animations?: number
  area?: number
  volume?: number
  detailLevel?: 'Low' | 'Medium' | 'High' | 'Ultra'
}

interface ModelProps {
  url: string
  scale?: number
  onProgress?: (progress: number) => void
  onMetadataExtracted?: (metadata: ModelMetadata) => void
  visibleLayers?: {
    structure: boolean
    furniture: boolean
    vegetation: boolean
    lighting: boolean
  }
}

export function Model({
  url,
  scale = 1,
  onProgress,
  onMetadataExtracted,
  visibleLayers = { structure: true, furniture: true, vegetation: true, lighting: true },
}: ModelProps) {
  // Load model with progress tracking
  const { scene } = useGLTF(url, undefined, undefined, (loader) => {
    loader.manager.onProgress = (_url, loaded, total) => {
      if (total > 0) {
        const progress = (loaded / total) * 100
        onProgress?.(progress)
      }
    }
  })

  useEffect(() => {
    // Ensure 100% progress when model is loaded
    onProgress?.(100)

    // Debug layers in development
    if (import.meta.env.DEV && scene) {
      debugGLTFLayers(scene)
    }

    // Extract model metadata
    if (scene && onMetadataExtracted) {
      let vertices = 0
      let triangles = 0
      const materials = new Set<string>()
      let objects = 0

      const box = new THREE.Box3().setFromObject(scene)
      const size = new THREE.Vector3()
      box.getSize(size)

      scene.traverse((child: any) => {
        if (child.isMesh) {
          objects++

          if (child.geometry) {
            const geometry = child.geometry

            // Count vertices
            if (geometry.attributes.position) {
              vertices += geometry.attributes.position.count
            }

            // Count triangles
            if (geometry.index) {
              triangles += geometry.index.count / 3
            } else if (geometry.attributes.position) {
              triangles += geometry.attributes.position.count / 3
            }
          }

          // Track unique materials
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat: any) => materials.add(mat.uuid))
            } else {
              materials.add(child.material.uuid)
            }
          }
        }
      })

      // Count textures and animations
      const textures = new Set<string>()
      let animations = 0

      scene.traverse((child: any) => {
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((mat: any) => {
            if (mat.map) textures.add(mat.map.uuid)
            if (mat.normalMap) textures.add(mat.normalMap.uuid)
            if (mat.roughnessMap) textures.add(mat.roughnessMap.uuid)
            if (mat.metalnessMap) textures.add(mat.metalnessMap.uuid)
          })
        }
      })

      // Check for animations in the gltf
      if ((scene as any).animations) {
        animations = (scene as any).animations.length
      }

      // Extract format from URL
      const format = url.toLowerCase().endsWith('.glb')
        ? 'GLB'
        : url.toLowerCase().endsWith('.gltf')
          ? 'GLTF'
          : 'Unknown'

      const metadata: ModelMetadata = {
        vertices,
        triangles: Math.floor(triangles),
        materials: materials.size,
        objects,
        dimensions: {
          width: parseFloat(size.x.toFixed(2)),
          height: parseFloat(size.y.toFixed(2)),
          depth: parseFloat(size.z.toFixed(2)),
        },
        boundingBox: {
          min: {
            x: parseFloat(box.min.x.toFixed(2)),
            y: parseFloat(box.min.y.toFixed(2)),
            z: parseFloat(box.min.z.toFixed(2)),
          },
          max: {
            x: parseFloat(box.max.x.toFixed(2)),
            y: parseFloat(box.max.y.toFixed(2)),
            z: parseFloat(box.max.z.toFixed(2)),
          },
        },
        format,
        textures: textures.size,
        animations,
      }

      onMetadataExtracted(metadata)
    }
  }, [scene, onProgress, onMetadataExtracted])

  // Apply layer visibility filtering
  useEffect(() => {
    if (!scene) return

    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Priority 1: Check userData.layer (GLTF extras metadata)
        const userDataLayer = child.userData?.layer?.toLowerCase()

        // Priority 2: Check material name
        const materialName = child.material?.name?.toLowerCase() || ''

        // Priority 3: Check object name
        const objectName = child.name.toLowerCase()

        // Determine layer from metadata, material, or name
        const layerSource = userDataLayer || materialName || objectName

        // Map to layer visibility
        if (
          layerSource.includes('structure') ||
          layerSource.includes('wall') ||
          layerSource.includes('floor') ||
          layerSource.includes('ceiling') ||
          layerSource.includes('roof') ||
          layerSource.includes('foundation')
        ) {
          child.visible = visibleLayers.structure
          child.userData.layer = 'structure' // Store for future reference
        } else if (
          layerSource.includes('furniture') ||
          layerSource.includes('chair') ||
          layerSource.includes('table') ||
          layerSource.includes('desk') ||
          layerSource.includes('sofa') ||
          layerSource.includes('bed')
        ) {
          child.visible = visibleLayers.furniture
          child.userData.layer = 'furniture'
        } else if (
          layerSource.includes('vegetation') ||
          layerSource.includes('tree') ||
          layerSource.includes('plant') ||
          layerSource.includes('grass') ||
          layerSource.includes('landscape')
        ) {
          child.visible = visibleLayers.vegetation
          child.userData.layer = 'vegetation'
        } else if (
          layerSource.includes('light') ||
          layerSource.includes('lamp') ||
          layerSource.includes('bulb') ||
          layerSource.includes('luminaire')
        ) {
          child.visible = visibleLayers.lighting
          child.userData.layer = 'lighting'
        }
        // If no layer detected, keep default visibility (true)
      }
    })
  }, [scene, visibleLayers])

  return (
    <Center>
      <primitive object={scene} scale={scale} dispose={null} />
    </Center>
  )
}

// Preload helper for better performance
export function preloadModel(url: string) {
  useGLTF.preload(url)
}
