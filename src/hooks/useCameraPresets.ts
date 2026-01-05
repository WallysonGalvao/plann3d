import { useCallback, useEffect, useState } from 'react'
import * as THREE from 'three'

export interface CameraPreset {
  name: string
  position: [number, number, number]
  target: [number, number, number]
  timestamp: number
}

interface UseCameraPresetsOptions {
  /** Unique identifier for storage key (e.g., project ID) */
  storageKey: string
  /** Maximum number of presets to store */
  maxPresets?: number
}

/**
 * Hook for managing camera presets with localStorage persistence
 *
 * Allows users to save, load, and delete camera positions for quick navigation
 *
 * @example
 * ```tsx
 * const { presets, savePreset, loadPreset, deletePreset } = useCameraPresets({
 *   storageKey: 'tower-project'
 * })
 *
 * // Save current camera position
 * savePreset('Front View', [0, 5, 15], [0, 0, 0])
 *
 * // Load saved preset
 * const preset = loadPreset('Front View')
 * ```
 */
export function useCameraPresets({ storageKey, maxPresets = 10 }: UseCameraPresetsOptions) {
  const [presets, setPresets] = useState<CameraPreset[]>([])
  const fullKey = `plann3d_camera_presets_${storageKey}`

  // Load presets from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(fullKey)
      if (stored) {
        const parsed = JSON.parse(stored) as CameraPreset[]
        setPresets(parsed)
      }
    } catch (error) {
      console.error('Failed to load camera presets:', error)
    }
  }, [fullKey])

  // Save preset to localStorage and state
  const savePreset = useCallback(
    (
      name: string,
      position: [number, number, number] | THREE.Vector3,
      target: [number, number, number] | THREE.Vector3,
    ) => {
      const posArray: [number, number, number] =
        position instanceof THREE.Vector3 ? [position.x, position.y, position.z] : position

      const targetArray: [number, number, number] =
        target instanceof THREE.Vector3 ? [target.x, target.y, target.z] : target

      const newPreset: CameraPreset = {
        name,
        position: posArray,
        target: targetArray,
        timestamp: Date.now(),
      }

      setPresets((prev) => {
        // Remove existing preset with same name
        const filtered = prev.filter((p) => p.name !== name)

        // Add new preset at beginning
        const updated = [newPreset, ...filtered]

        // Limit to maxPresets
        const limited = updated.slice(0, maxPresets)

        // Save to localStorage
        try {
          localStorage.setItem(fullKey, JSON.stringify(limited))
        } catch (error) {
          console.error('Failed to save camera preset:', error)
        }

        return limited
      })

      return newPreset
    },
    [fullKey, maxPresets],
  )

  // Load preset by name
  const loadPreset = useCallback(
    (name: string): CameraPreset | null => {
      return presets.find((p) => p.name === name) || null
    },
    [presets],
  )

  // Delete preset by name
  const deletePreset = useCallback(
    (name: string) => {
      setPresets((prev) => {
        const updated = prev.filter((p) => p.name !== name)

        // Save to localStorage
        try {
          localStorage.setItem(fullKey, JSON.stringify(updated))
        } catch (error) {
          console.error('Failed to delete camera preset:', error)
        }

        return updated
      })
    },
    [fullKey],
  )

  // Clear all presets
  const clearAllPresets = useCallback(() => {
    setPresets([])
    try {
      localStorage.removeItem(fullKey)
    } catch (error) {
      console.error('Failed to clear camera presets:', error)
    }
  }, [fullKey])

  // Export presets as JSON
  const exportPresets = useCallback(() => {
    const json = JSON.stringify(presets, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `camera-presets-${storageKey}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [presets, storageKey])

  // Import presets from JSON
  const importPresets = useCallback(
    (json: string) => {
      try {
        const imported = JSON.parse(json) as CameraPreset[]

        if (!Array.isArray(imported)) {
          throw new Error('Invalid preset format')
        }

        setPresets(imported)
        localStorage.setItem(fullKey, json)
      } catch (error) {
        console.error('Failed to import camera presets:', error)
        throw error
      }
    },
    [fullKey],
  )

  return {
    presets,
    savePreset,
    loadPreset,
    deletePreset,
    clearAllPresets,
    exportPresets,
    importPresets,
  }
}
