import { useState, useEffect, useCallback } from 'react'
import { useGLTF } from '@react-three/drei'

export type ModelQuality = 'low' | 'medium' | 'high'

interface ProgressiveModelConfig {
  /** Low quality placeholder URL (fastest load) */
  lowUrl?: string
  /** Medium quality URL */
  mediumUrl?: string
  /** High quality URL */
  highUrl?: string
  /** Fallback URL if LOD not available */
  fallbackUrl: string
}

interface UseProgressiveModelReturn {
  /** Current URL to use for loading */
  currentUrl: string
  /** Current quality level */
  quality: ModelQuality
  /** True when high quality is ready */
  isHighQualityReady: boolean
  /** Loading progress 0-100 */
  progress: number
  /** Force load a specific quality */
  loadQuality: (quality: ModelQuality) => void
}

/**
 * Hook for progressive model loading with LOD support.
 * Starts with low quality, progressively upgrades to high quality.
 */
export function useProgressiveModel(config: ProgressiveModelConfig): UseProgressiveModelReturn {
  const { lowUrl, mediumUrl, highUrl, fallbackUrl } = config

  const [quality, setQuality] = useState<ModelQuality>(() => {
    // Start with lowest available quality
    if (lowUrl) return 'low'
    if (mediumUrl) return 'medium'
    return 'high'
  })

  const [isHighQualityReady, setIsHighQualityReady] = useState(false)
  const [progress, setProgress] = useState(0)

  // Determine current URL based on quality level
  const currentUrl = (() => {
    switch (quality) {
      case 'low':
        return lowUrl || mediumUrl || highUrl || fallbackUrl
      case 'medium':
        return mediumUrl || highUrl || fallbackUrl
      case 'high':
        return highUrl || fallbackUrl
      default:
        return fallbackUrl
    }
  })()

  // Preload higher quality versions in background
  useEffect(() => {
    const preloadQueue: string[] = []

    // If we're on low, queue medium and high
    if (quality === 'low') {
      if (mediumUrl) preloadQueue.push(mediumUrl)
      if (highUrl) preloadQueue.push(highUrl)
    }
    // If we're on medium, queue high
    else if (quality === 'medium') {
      if (highUrl) preloadQueue.push(highUrl)
    }

    // Preload each URL with a delay to not overwhelm
    let cancelled = false
    const preloadWithDelay = async () => {
      for (const url of preloadQueue) {
        if (cancelled) break

        try {
          useGLTF.preload(url)

          // Wait a bit before preloading next
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Auto-upgrade quality after preload
          if (url === mediumUrl && quality === 'low') {
            setQuality('medium')
            setProgress(50)
          } else if (url === highUrl) {
            setIsHighQualityReady(true)
            // Only auto-upgrade to high on desktop
            if (!isMobileDevice()) {
              setQuality('high')
              setProgress(100)
            }
          }
        } catch (error) {
          console.warn(`Failed to preload: ${url}`, error)
        }
      }
    }

    preloadWithDelay()

    return () => {
      cancelled = true
    }
  }, [quality, lowUrl, mediumUrl, highUrl])

  const loadQuality = useCallback((targetQuality: ModelQuality) => {
    setQuality(targetQuality)
    if (targetQuality === 'high') {
      setProgress(100)
    } else if (targetQuality === 'medium') {
      setProgress(50)
    } else {
      setProgress(25)
    }
  }, [])

  return {
    currentUrl,
    quality,
    isHighQualityReady,
    progress,
    loadQuality,
  }
}

/**
 * Detects if the current device is mobile
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false

  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768
  )
}

/**
 * Detects device capability for choosing appropriate LOD
 */
export function getRecommendedQuality(): ModelQuality {
  if (typeof window === 'undefined') return 'medium'

  // Check if mobile
  if (isMobileDevice()) {
    // Check for high-end mobile (recent iPhones, flagship Android)
    const isHighEndMobile =
      navigator.hardwareConcurrency >= 6 ||
      /iPhone (1[2-9]|[2-9][0-9])/i.test(navigator.userAgent) ||
      (/Android.*Chrome/i.test(navigator.userAgent) && navigator.hardwareConcurrency >= 6)

    return isHighEndMobile ? 'medium' : 'low'
  }

  // Desktop: check GPU/CPU capability
  const hasGoodGPU = navigator.hardwareConcurrency >= 8
  return hasGoodGPU ? 'high' : 'medium'
}
