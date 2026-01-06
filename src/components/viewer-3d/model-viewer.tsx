'use client'

import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ErrorBoundary, ErrorFallback } from './error-boundary'
import { LoadingOverlay } from './loading-overlay'
import type { ModelMetadata } from './model'
import { useProgressiveModel, type ModelQuality } from '@/hooks/useProgressiveModel'

// Lazy load heavy components
const Model = lazy(() => import('./model').then((mod) => ({ default: mod.Model })))
const CameraResetController = lazy(() =>
  import('./camera-reset-controller').then((mod) => ({ default: mod.CameraResetController })),
)
const CameraPresetController = lazy(() =>
  import('./camera-preset-controller').then((mod) => ({ default: mod.CameraPresetController })),
)
const AutoTourController = lazy(() =>
  import('./auto-tour-controller').then((mod) => ({ default: mod.AutoTourController })),
)
const ZoomController = lazy(() =>
  import('./zoom-controller').then((mod) => ({ default: mod.ZoomController })),
)

// ============================================
// TYPES
// ============================================

export type { ModelMetadata }

export interface ModelViewerProps {
  /** URL to the .glb or .gltf model file */
  modelUrl: string
  /** Optional poster/thumbnail while loading */
  poster?: string
  /** Initial camera position [x, y, z] */
  cameraPosition?: [number, number, number]
  /** Model scale multiplier */
  scale?: number
  /** Enable auto-rotation */
  autoRotate?: boolean
  /** Background color or 'transparent' */
  background?: string
  /** CSS class for container */
  className?: string
  /** Height of the viewer */
  height?: string | number
  /** Callback when model metadata is extracted */
  onMetadataExtracted?: (metadata: ModelMetadata) => void
  /** Enable pan mode (pan only, no rotation) */
  enablePan?: boolean
  /** Camera preset to apply */
  cameraPreset?: 'front' | 'back' | 'left' | 'right' | 'top' | 'perspective' | null
  /** Enable auto tour animation */
  autoTourActive?: boolean
  /** Visible layers for filtering model parts */
  visibleLayers?: {
    structure: boolean
    furniture: boolean
    vegetation: boolean
    lighting: boolean
  }
  /** Callback when camera preset is applied */
  onCameraPresetApplied?: () => void
  /** Trigger to reset camera to initial position */
  resetTrigger?: number
  /** Zoom level (10-200) to control camera distance */
  zoomLevel?: number
  /** LOD (Level of Detail) URLs for progressive loading */
  lodUrls?: {
    low?: string
    medium?: string
    high?: string
  }
  /** Callback when model quality changes */
  onQualityChange?: (quality: ModelQuality) => void
}

// ============================================
// LOADING FALLBACK
// ============================================

function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * Interactive 3D Model Viewer with Progressive Loading
 *
 * Displays .glb/.gltf models with orbit controls, environment lighting,
 * and progressive streaming support for large files.
 *
 * @example
 * ```tsx
 * <ModelViewer
 *   modelUrl="/models/project/model.glb"
 *   height="500px"
 *   autoRotate
 * />
 * ```
 */
export function ModelViewer({
  modelUrl,
  poster,
  cameraPosition = [5, 5, 10],
  scale = 1,
  autoRotate = false,
  background = 'transparent',
  className = '',
  height = '500px',
  onMetadataExtracted,
  enablePan = false,
  cameraPreset = null,
  autoTourActive = false,
  visibleLayers = { structure: true, furniture: true, vegetation: true, lighting: true },
  onCameraPresetApplied,
  resetTrigger = 0,
  zoomLevel = 50,
  lodUrls,
  onQualityChange,
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [canvasReady, setCanvasReady] = useState(false)
  const [hasTimeout, setHasTimeout] = useState(false)

  // Progressive model loading with LOD support
  const { currentUrl, quality } = useProgressiveModel({
    lowUrl: lodUrls?.low,
    mediumUrl: lodUrls?.medium,
    highUrl: lodUrls?.high,
    fallbackUrl: modelUrl,
  })

  // Report quality changes
  useEffect(() => {
    onQualityChange?.(quality)
  }, [quality, onQualityChange])

  // Simulate initial loading progress for immediate feedback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadProgress < 10) {
        setLoadProgress(10)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [loadProgress])

  // Timeout if model takes too long (60 seconds)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading && loadProgress < 100) {
        console.error('Model loading timeout after 60 seconds')
        setHasTimeout(true)
        setIsLoading(false)
      }
    }, 60000)

    return () => clearTimeout(timeout)
  }, [isLoading, loadProgress])

  // Hide loading overlay when both canvas and model are ready
  useEffect(() => {
    if (canvasReady && loadProgress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [canvasReady, loadProgress])

  const handleProgress = (progress: number) => {
    setLoadProgress(Math.min(progress, 100))
  }

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-border ${className}`}
      style={{
        height,
        background: background === 'transparent' ? 'var(--color-secondary)' : background,
      }}
    >
      {/* Timeout Error */}
      {hasTimeout && (
        <ErrorFallback
          error={
            new Error('O modelo demorou muito para carregar. O arquivo pode ser muito grande.')
          }
          resetError={() => {
            setHasTimeout(false)
            setIsLoading(true)
            setLoadProgress(0)
            window.location.reload()
          }}
        />
      )}

      {/* Loading Overlay with Progress */}
      {isLoading && !hasTimeout && <LoadingOverlay progress={loadProgress} />}

      {/* Poster Image (shown while loading) */}
      {poster && isLoading && !hasTimeout && (
        <img
          src={poster}
          alt="Preview do modelo 3D"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}

      {/* 3D Canvas with Error Boundary */}
      <ErrorBoundary
        fallback={(error, reset) => <ErrorFallback error={error} resetError={reset} />}
      >
        <Canvas
          camera={{ position: cameraPosition, fov: 45 }}
          gl={{
            antialias: true,
            alpha: background === 'transparent',
            powerPreference: 'high-performance',
          }}
          onCreated={() => {
            setCanvasReady(true)
            setLoadProgress((prev) => Math.max(prev, 20))
          }}
          style={{ background: background === 'transparent' ? 'transparent' : background }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

          {/* Environment for realistic reflections */}
          <Environment preset="city" background={false} />

          {/* Model with Suspense and Progressive Loading */}
          <Suspense fallback={<LoadingBox />}>
            <Model
              url={currentUrl}
              scale={scale}
              onProgress={handleProgress}
              onMetadataExtracted={onMetadataExtracted}
              visibleLayers={visibleLayers}
            />
          </Suspense>

          {/* Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate && !autoTourActive}
            autoRotateSpeed={0.5}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.5}
            zoomToCursor={true}
            zoomSpeed={1.2}
            rotateSpeed={0.8}
            panSpeed={0.8}
            enableDamping={true}
            dampingFactor={0.05}
            mouseButtons={{
              LEFT: enablePan ? 2 : 0, // Pan with left when pan mode active, rotate otherwise
              MIDDLE: 1, // Zoom with middle button
              RIGHT: 2, // Pan with right click
            }}
            touches={{
              ONE: enablePan ? 2 : 0, // Pan with one finger when pan mode is on, rotate otherwise
              TWO: 1, // Zoom/pan with two fingers (pinch to zoom, drag to pan)
            }}
            touchRotateSpeed={0.5}
            touchPanSpeed={0.5}
            touchZoomSpeed={1.0}
          />

          {/* Camera Reset Controller (lazy loaded) */}
          {resetTrigger > 0 && (
            <Suspense fallback={null}>
              <CameraResetController
                trigger={resetTrigger}
                initialPosition={cameraPosition}
                controlsRef={controlsRef}
              />
            </Suspense>
          )}

          {/* Camera Preset Controller (lazy loaded) */}
          {cameraPreset && (
            <Suspense fallback={null}>
              <CameraPresetController
                preset={cameraPreset}
                controlsRef={controlsRef}
                onApplied={onCameraPresetApplied}
              />
            </Suspense>
          )}

          {/* Auto Tour Controller (lazy loaded) */}
          {autoTourActive && (
            <Suspense fallback={null}>
              <AutoTourController controlsRef={controlsRef} />
            </Suspense>
          )}

          {/* Zoom Controller (lazy loaded) */}
          <Suspense fallback={null}>
            <ZoomController
              zoomLevel={zoomLevel}
              controlsRef={controlsRef}
              initialPosition={cameraPosition}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}

// Preload helper for better performance
export { preloadModel } from './model'
