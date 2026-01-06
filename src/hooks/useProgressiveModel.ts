import { useState, useEffect, useCallback, useRef } from 'react'
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

interface QualityStatus {
  available: boolean
  loading: boolean
  loaded: boolean
  url?: string
}

interface UseProgressiveModelReturn {
  /** Current URL to use for loading */
  currentUrl: string
  /** Current quality level */
  quality: ModelQuality
  /** Status of each quality level */
  qualityStatus: Record<ModelQuality, QualityStatus>
  /** Overall loading progress 0-100 */
  progress: number
  /** Force load a specific quality */
  loadQuality: (quality: ModelQuality) => void
  /** Check if a quality can be selected */
  canSelectQuality: (quality: ModelQuality) => boolean
}

/**
 * Hook for progressive model loading with LOD support.
 * Tracks download status of each quality level.
 */
export function useProgressiveModel(config: ProgressiveModelConfig): UseProgressiveModelReturn {
  const { lowUrl, mediumUrl, highUrl, fallbackUrl } = config

  const [quality, setQuality] = useState<ModelQuality>(() => {
    if (lowUrl) return 'low'
    if (mediumUrl) return 'medium'
    return 'high'
  })

  const [qualityStatus, setQualityStatus] = useState<Record<ModelQuality, QualityStatus>>({
    low: {
      available: !!lowUrl,
      loading: false,
      loaded: false,
      url: lowUrl,
    },
    medium: {
      available: !!mediumUrl,
      loading: false,
      loaded: false,
      url: mediumUrl,
    },
    high: {
      available: !!highUrl,
      loading: false,
      loaded: false,
      url: highUrl,
    },
  })

  const [progress, setProgress] = useState(0)
  const preloadedRef = useRef<Set<string>>(new Set())

  // Calculate current URL based on quality
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

  // Mark current quality as loaded when model loads
  useEffect(() => {
    // When current URL changes, mark as loaded after a delay
    const timer = setTimeout(() => {
      setQualityStatus((prev) => ({
        ...prev,
        [quality]: {
          ...prev[quality],
          loading: false,
          loaded: true,
        },
      }))

      // Update progress based on quality
      if (quality === 'low') setProgress(33)
      else if (quality === 'medium') setProgress(66)
      else setProgress(100)
    }, 500)

    return () => clearTimeout(timer)
  }, [quality, currentUrl])

  // Preload higher quality versions in background
  useEffect(() => {
    const preloadQueue: Array<{ url: string; quality: ModelQuality }> = []

    // Build queue based on what's available and not yet preloaded
    if (lowUrl && !preloadedRef.current.has(lowUrl)) {
      preloadQueue.push({ url: lowUrl, quality: 'low' })
    }
    if (mediumUrl && !preloadedRef.current.has(mediumUrl)) {
      preloadQueue.push({ url: mediumUrl, quality: 'medium' })
    }
    if (highUrl && !preloadedRef.current.has(highUrl)) {
      preloadQueue.push({ url: highUrl, quality: 'high' })
    }

    let cancelled = false

    const preloadWithProgress = async () => {
      for (const { url, quality: q } of preloadQueue) {
        if (cancelled) break

        // Mark as loading
        setQualityStatus((prev) => ({
          ...prev,
          [q]: { ...prev[q], loading: true },
        }))

        try {
          useGLTF.preload(url)
          preloadedRef.current.add(url)

          // Wait for preload to complete (approximate)
          await new Promise((resolve) => setTimeout(resolve, 1500))

          if (!cancelled) {
            // Mark as loaded
            setQualityStatus((prev) => ({
              ...prev,
              [q]: { ...prev[q], loading: false, loaded: true },
            }))

            // Auto-upgrade to next quality on desktop
            if (!isMobileDevice()) {
              if (q === 'low' && quality === 'low' && mediumUrl) {
                // Don't auto-upgrade, let user control
              } else if (q === 'medium' && quality === 'medium' && highUrl) {
                // Don't auto-upgrade, let user control
              }
            }
          }
        } catch (error) {
          console.warn(`Failed to preload ${q}: ${url}`, error)
          setQualityStatus((prev) => ({
            ...prev,
            [q]: { ...prev[q], loading: false },
          }))
        }
      }
    }

    preloadWithProgress()

    return () => {
      cancelled = true
    }
  }, [lowUrl, mediumUrl, highUrl, quality])

  const loadQuality = useCallback(
    (targetQuality: ModelQuality) => {
      const status = qualityStatus[targetQuality]
      if (status.available && status.loaded) {
        setQuality(targetQuality)
      }
    },
    [qualityStatus],
  )

  const canSelectQuality = useCallback(
    (targetQuality: ModelQuality) => {
      const status = qualityStatus[targetQuality]
      return status.available && status.loaded
    },
    [qualityStatus],
  )

  return {
    currentUrl,
    quality,
    qualityStatus,
    progress,
    loadQuality,
    canSelectQuality,
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

  if (isMobileDevice()) {
    const isHighEndMobile =
      navigator.hardwareConcurrency >= 6 ||
      /iPhone (1[2-9]|[2-9][0-9])/i.test(navigator.userAgent) ||
      (/Android.*Chrome/i.test(navigator.userAgent) && navigator.hardwareConcurrency >= 6)
    return isHighEndMobile ? 'medium' : 'low'
  }

  const hasGoodGPU = navigator.hardwareConcurrency >= 8
  return hasGoodGPU ? 'high' : 'medium'
}
