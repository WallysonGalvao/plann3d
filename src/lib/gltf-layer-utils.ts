import * as THREE from 'three'

export interface LayerInfo {
  name: string
  type: 'structure' | 'furniture' | 'vegetation' | 'lighting' | 'unknown'
  objectCount: number
  objects: string[]
}

/**
 * Analyzes a GLTF scene to detect and categorize layers
 *
 * @param scene - THREE.js scene object from GLTF
 * @returns Array of detected layers with object counts
 */
export function analyzeGLTFLayers(scene: THREE.Object3D): LayerInfo[] {
  const layers = new Map<string, LayerInfo>()

  scene.traverse((child: any) => {
    if (child.isMesh) {
      // Detect layer from various sources
      const userDataLayer = child.userData?.layer?.toLowerCase()
      const materialName = child.material?.name?.toLowerCase() || ''
      const objectName = child.name.toLowerCase()
      const layerSource = userDataLayer || materialName || objectName

      // Categorize
      let type: LayerInfo['type'] = 'unknown'
      let layerName = 'Other'

      if (
        layerSource.includes('structure') ||
        layerSource.includes('wall') ||
        layerSource.includes('floor') ||
        layerSource.includes('ceiling') ||
        layerSource.includes('roof')
      ) {
        type = 'structure'
        layerName = 'Structure'
      } else if (
        layerSource.includes('furniture') ||
        layerSource.includes('chair') ||
        layerSource.includes('table') ||
        layerSource.includes('desk')
      ) {
        type = 'furniture'
        layerName = 'Furniture'
      } else if (
        layerSource.includes('vegetation') ||
        layerSource.includes('tree') ||
        layerSource.includes('plant') ||
        layerSource.includes('grass')
      ) {
        type = 'vegetation'
        layerName = 'Vegetation'
      } else if (
        layerSource.includes('light') ||
        layerSource.includes('lamp') ||
        layerSource.includes('bulb')
      ) {
        type = 'lighting'
        layerName = 'Lighting'
      }

      // Update or create layer info
      if (!layers.has(layerName)) {
        layers.set(layerName, {
          name: layerName,
          type,
          objectCount: 0,
          objects: [],
        })
      }

      const layer = layers.get(layerName)!
      layer.objectCount++
      layer.objects.push(child.name || 'Unnamed')
    }
  })

  return Array.from(layers.values()).sort((a, b) => b.objectCount - a.objectCount)
}

/**
 * Logs layer information to console for debugging
 *
 * @param scene - THREE.js scene object from GLTF
 */
export function debugGLTFLayers(scene: THREE.Object3D): void {
  console.group('🔍 GLTF Layer Analysis')

  const layers = analyzeGLTFLayers(scene)

  layers.forEach((layer) => {
    console.group(`📁 ${layer.name} (${layer.type})`)
    console.log(`Objects: ${layer.objectCount}`)
    console.log('Sample objects:', layer.objects.slice(0, 5).join(', '))
    console.groupEnd()
  })

  console.log('\n💡 Tip: Add "layer" to userData.extras in your 3D software to improve detection')
  console.groupEnd()
}

/**
 * Sets custom layer metadata on GLTF objects
 *
 * Useful for programmatically tagging objects when the model doesn't have metadata
 *
 * @param scene - THREE.js scene object from GLTF
 * @param objectName - Name or partial name of object to tag
 * @param layer - Layer category to assign
 */
export function setLayerMetadata(
  scene: THREE.Object3D,
  objectName: string,
  layer: 'structure' | 'furniture' | 'vegetation' | 'lighting',
): void {
  scene.traverse((child: any) => {
    if (child.isMesh && child.name.toLowerCase().includes(objectName.toLowerCase())) {
      child.userData.layer = layer
      console.log(`✓ Tagged "${child.name}" as ${layer}`)
    }
  })
}

/**
 * Export layer information as JSON for external use
 *
 * @param scene - THREE.js scene object from GLTF
 * @returns JSON string with layer data
 */
export function exportLayerMetadata(scene: THREE.Object3D): string {
  const layers = analyzeGLTFLayers(scene)
  return JSON.stringify(layers, null, 2)
}
