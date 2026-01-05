'use client'

import { Center, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Component, Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// ============================================
// TYPES
// ============================================

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
}

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
}

// ============================================
// MODEL COMPONENT WITH PROGRESSIVE LOADING
// ============================================

interface ModelProps {
  url: string
  scale?: number
  onProgress?: (progress: number) => void
  onMetadataExtracted?: (metadata: ModelMetadata) => void
}

function Model({ url, scale = 1, onProgress, onMetadataExtracted }: ModelProps) {
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
      }

      onMetadataExtracted(metadata)
    }
  }, [scene, onProgress, onMetadataExtracted])

  return (
    <Center>
      <primitive object={scene} scale={scale} dispose={null} />
    </Center>
  )
}

// ============================================
// LOADING FALLBACK
// ============================================

function LoadingBox() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

// ============================================
// ERROR BOUNDARY
// ============================================

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback: (error: Error, reset: () => void) => React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Model viewer error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error, this.resetError)
    }

    return this.props.children
  }
}

function ErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
      <div className="flex flex-col items-center gap-4 max-w-md text-center p-6">
        <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg
            className="size-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Erro ao carregar modelo 3D</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error.message || 'Não foi possível carregar o modelo 3D. Tente novamente.'}
          </p>
        </div>
        <button
          onClick={resetError}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  )
}

// ============================================
// LOADING OVERLAY WITH PROGRESS
// ============================================

interface LoadingOverlayProps {
  progress: number
}

function LoadingOverlay({ progress }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32">
          {/* Progress Circle */}
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-primary/20"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
              className="text-primary transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">Carregando modelo 3D...</span>
        <div className="w-64 h-1 bg-primary/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
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
  cameraPosition = [0, 2, 5],
  scale = 1,
  autoRotate = false,
  background = 'transparent',
  className = '',
  height = '500px',
  onMetadataExtracted,
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [canvasReady, setCanvasReady] = useState(false)
  const [hasTimeout, setHasTimeout] = useState(false)

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
              url={modelUrl}
              scale={scale}
              onProgress={handleProgress}
              onMetadataExtracted={onMetadataExtracted}
            />
          </Suspense>

          {/* Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minDistance={1}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}

// Preload helper for better performance
export function preloadModel(url: string) {
  useGLTF.preload(url)
}
