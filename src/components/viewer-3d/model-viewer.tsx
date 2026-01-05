'use client'

import { Center, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
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
  fileSize?: string
  format?: string
  textures?: number
  animations?: number
  area?: number
  volume?: number
  detailLevel?: 'Low' | 'Medium' | 'High' | 'Ultra'
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
}

// ============================================
// CAMERA PRESET POSITIONS
// ============================================

const CAMERA_PRESETS: Record<
  'front' | 'back' | 'left' | 'right' | 'top' | 'perspective',
  { position: [number, number, number]; target: [number, number, number] }
> = {
  front: { position: [0, 3, 15], target: [0, 0, 0] },
  back: { position: [0, 3, -15], target: [0, 0, 0] },
  left: { position: [-15, 3, 0], target: [0, 0, 0] },
  right: { position: [15, 3, 0], target: [0, 0, 0] },
  top: { position: [0, 20, 0], target: [0, 0, 0] },
  perspective: { position: [12, 12, 12], target: [0, 0, 0] },
}

// ============================================
// CAMERA RESET CONTROLLER
// ============================================

interface CameraResetControllerProps {
  trigger: number
  initialPosition: [number, number, number]
  controlsRef: React.RefObject<any>
}

function CameraResetController({
  trigger,
  initialPosition,
  controlsRef,
}: CameraResetControllerProps) {
  const { camera } = useThree()

  useEffect(() => {
    if (trigger === 0 || !controlsRef.current) return

    const startPosition = camera.position.clone()
    const startTarget = controlsRef.current.target.clone()
    const endPosition = new THREE.Vector3(...initialPosition)
    const endTarget = new THREE.Vector3(0, 0, 0)

    let progress = 0
    const duration = 800 // 0.8 seconds animation
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      progress = Math.min(elapsed / duration, 1)

      // Ease-in-out animation
      const eased =
        progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

      // Interpolate camera position
      camera.position.lerpVectors(startPosition, endPosition, eased)

      // Interpolate camera target to origin
      const newTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, eased)
      controlsRef.current.target.copy(newTarget)

      controlsRef.current.update()

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [trigger, camera, controlsRef, initialPosition])

  return null
}

// ============================================
// CAMERA PRESET CONTROLLER
// ============================================

interface CameraPresetControllerProps {
  preset: 'front' | 'back' | 'left' | 'right' | 'top' | 'perspective'
  controlsRef: React.RefObject<any>
  onApplied?: () => void
}

function CameraPresetController({ preset, controlsRef, onApplied }: CameraPresetControllerProps) {
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return

    const targetPreset = CAMERA_PRESETS[preset]
    const startPosition = camera.position.clone()
    const startTarget = controlsRef.current.target.clone()
    const endPosition = new THREE.Vector3(...targetPreset.position)
    const endTarget = new THREE.Vector3(...targetPreset.target)

    let progress = 0
    const duration = 1000 // 1 second animation
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      progress = Math.min(elapsed / duration, 1)

      // Ease-in-out animation
      const eased =
        progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

      // Interpolate camera position
      camera.position.lerpVectors(startPosition, endPosition, eased)

      // Interpolate camera target
      const newTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, eased)
      controlsRef.current.target.copy(newTarget)

      controlsRef.current.update()

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else if (onApplied) {
        onApplied()
      }
    }

    animate()
  }, [preset, camera, controlsRef, onApplied])

  return null
}

// ============================================
// AUTO TOUR CONTROLLER
// ============================================

interface AutoTourControllerProps {
  controlsRef: React.RefObject<any>
}

function AutoTourController({ controlsRef }: AutoTourControllerProps) {
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return

    const presets = Object.values(CAMERA_PRESETS)
    let currentIndex = 0
    const intervalDuration = 4000 // 4 seconds per preset

    const rotateCamera = () => {
      const targetPreset = presets[currentIndex]
      const startPosition = camera.position.clone()
      const startTarget = controlsRef.current.target.clone()
      const endPosition = new THREE.Vector3(...targetPreset.position)
      const endTarget = new THREE.Vector3(...targetPreset.target)

      let progress = 0
      const duration = 1500 // 1.5 seconds animation
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        progress = Math.min(elapsed / duration, 1)

        const eased =
          progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

        camera.position.lerpVectors(startPosition, endPosition, eased)
        const newTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, eased)
        controlsRef.current.target.copy(newTarget)
        controlsRef.current.update()

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
      currentIndex = (currentIndex + 1) % presets.length
    }

    // Start tour
    rotateCamera()
    const interval = setInterval(rotateCamera, intervalDuration)

    return () => clearInterval(interval)
  }, [camera, controlsRef])

  return null
}

// ============================================
// MODEL COMPONENT WITH PROGRESSIVE LOADING
// ============================================

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

function Model({
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

      // @ts-ignore - Check for animations in the gltf
      if (scene.animations) {
        // @ts-ignore
        animations = scene.animations.length
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
        const name = child.name.toLowerCase()

        // Simple name-based layer detection
        // You may need to adjust these patterns based on your actual model structure
        if (
          name.includes('structure') ||
          name.includes('wall') ||
          name.includes('floor') ||
          name.includes('ceiling')
        ) {
          child.visible = visibleLayers.structure
        } else if (
          name.includes('furniture') ||
          name.includes('chair') ||
          name.includes('table') ||
          name.includes('desk')
        ) {
          child.visible = visibleLayers.furniture
        } else if (
          name.includes('vegetation') ||
          name.includes('tree') ||
          name.includes('plant') ||
          name.includes('grass')
        ) {
          child.visible = visibleLayers.vegetation
        } else if (name.includes('light') || name.includes('lamp') || name.includes('bulb')) {
          child.visible = visibleLayers.lighting
        }
      }
    })
  }, [scene, visibleLayers])

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
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
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
              visibleLayers={visibleLayers}
            />
          </Suspense>

          {/* Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            enablePan={enablePan}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate && !autoTourActive}
            autoRotateSpeed={0.5}
            minDistance={2}
            maxDistance={50}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.5}
          />

          {/* Camera Reset Controller */}
          <CameraResetController
            trigger={resetTrigger}
            initialPosition={cameraPosition}
            controlsRef={controlsRef}
          />

          {/* Camera Preset Controller */}
          {cameraPreset && (
            <CameraPresetController
              preset={cameraPreset}
              controlsRef={controlsRef}
              onApplied={onCameraPresetApplied}
            />
          )}

          {/* Auto Tour Controller */}
          {autoTourActive && <AutoTourController controlsRef={controlsRef} />}
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}

// Preload helper for better performance
export function preloadModel(url: string) {
  useGLTF.preload(url)
}
