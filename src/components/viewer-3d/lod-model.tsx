import { useEffect, Suspense, useState } from 'react'
import { Model, ModelMetadata } from './model'
import { useProgressiveModel, ModelQuality } from '@/hooks/useProgressiveModel'

interface LODModelProps {
  /** Project ID for building model paths */
  projectId: string
  /** Base path for models (default: /models) */
  basePath?: string
  /** Model scale */
  scale?: number
  /** Callback when model metadata is extracted */
  onMetadataExtracted?: (metadata: ModelMetadata) => void
  /** Callback for loading progress */
  onProgress?: (progress: number) => void
  /** Callback when quality changes */
  onQualityChange?: (quality: ModelQuality) => void
  /** Callback for quality status changes */
  onQualityStatusChange?: (status: Record<ModelQuality, { available: boolean; loading: boolean; loaded: boolean }>) => void
  /** Override LOD URLs */
  lodUrls?: {
    low?: string
    medium?: string
    high?: string
  }
  /** Force a specific quality level */
  forceQuality?: ModelQuality
  /** Layer visibility settings */
  visibleLayers?: {
    structure: boolean
    furniture: boolean
    vegetation: boolean
    lighting: boolean
  }
}

/**
 * LODModel component that automatically loads the appropriate model quality
 * based on device capabilities and progressively upgrades to higher quality.
 */
export function LODModel({
  projectId,
  basePath = '/models',
  scale = 1,
  onMetadataExtracted,
  onProgress,
  onQualityChange,
  onQualityStatusChange,
  lodUrls,
  forceQuality,
  visibleLayers,
}: LODModelProps) {
  const modelPath = `${basePath}/${projectId}`

  // Build LOD URLs from project path or use overrides
  const lowUrl = lodUrls?.low || `${modelPath}/low.glb`
  const mediumUrl = lodUrls?.medium || `${modelPath}/medium.glb`
  const highUrl = lodUrls?.high || `${modelPath}/high.glb`
  const fallbackUrl = `${modelPath}/model.glb`

  // Track if the model is ready to render (prevents flicker/crash on quality change)
  const [isModelReady, setIsModelReady] = useState(false)
  const [activeUrl, setActiveUrl] = useState<string | null>(null)

  const {
    currentUrl,
    quality,
    qualityStatus,
    progress,
    loadQuality,
  } = useProgressiveModel({
    lowUrl,
    mediumUrl,
    highUrl,
    fallbackUrl,
  })

  // Apply forced quality if specified
  useEffect(() => {
    if (forceQuality && qualityStatus[forceQuality].loaded) {
      loadQuality(forceQuality)
    }
  }, [forceQuality, loadQuality, qualityStatus])

  // Report quality changes
  useEffect(() => {
    onQualityChange?.(quality)
  }, [quality, onQualityChange])

  // Report quality status changes
  useEffect(() => {
    onQualityStatusChange?.(qualityStatus)
  }, [qualityStatus, onQualityStatusChange])

  // Report progress
  useEffect(() => {
    onProgress?.(progress)
  }, [progress, onProgress])

  // Handle URL change - reset ready state and update active URL
  useEffect(() => {
    if (currentUrl !== activeUrl) {
      setIsModelReady(false)
      // Small delay to allow cleanup before loading new model
      const timer = setTimeout(() => {
        setActiveUrl(currentUrl)
        setIsModelReady(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentUrl, activeUrl])

  // Don't render until we have a valid URL and are ready
  if (!isModelReady || !activeUrl) {
    return null
  }

  // Use key to force complete remount when URL changes
  // This prevents R3F errors from stale scene references
  return (
    <Suspense fallback={null}>
      <Model
        key={activeUrl}
        url={activeUrl}
        scale={scale}
        onMetadataExtracted={onMetadataExtracted}
        visibleLayers={visibleLayers}
      />
    </Suspense>
  )
}

/**
 * Quality indicator component to show current LOD level
 */
export function QualityIndicator({
  quality,
  isHighReady,
  onUpgrade,
}: {
  quality: ModelQuality
  isHighReady: boolean
  onUpgrade?: () => void
}) {
  const labels: Record<ModelQuality, string> = {
    low: 'Carregando...',
    medium: 'Qualidade média',
    high: 'Alta qualidade',
  }

  const colors: Record<ModelQuality, string> = {
    low: 'bg-yellow-500',
    medium: 'bg-blue-500',
    high: 'bg-green-500',
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-sm text-white">
      <div className={`w-2 h-2 rounded-full ${colors[quality]}`} />
      <span>{labels[quality]}</span>
      {quality !== 'high' && isHighReady && onUpgrade && (
        <button
          onClick={onUpgrade}
          className="ml-2 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-xs transition-colors"
        >
          Upgrade
        </button>
      )}
    </div>
  )
}
