'use client'

import { Center, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'

// ============================================
// TYPES
// ============================================

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
}

// ============================================
// MODEL COMPONENT WITH PROGRESSIVE LOADING
// ============================================

interface ModelProps {
  url: string
  scale?: number
  onProgress?: (progress: number) => void
}

function Model({ url, scale = 1, onProgress }: ModelProps) {
  const { scene } = useGLTF(url, true, true, (loader) => {
    // Configure loader for streaming
    loader.manager.onProgress = (url, loaded, total) => {
      const progress = (loaded / total) * 100
      onProgress?.(progress)
    }
  })

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
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [canvasReady, setCanvasReady] = useState(false)

  // Simulate initial loading progress for immediate feedback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadProgress < 10) {
        setLoadProgress(10)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

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
      {/* Loading Overlay with Progress */}
      {isLoading && <LoadingOverlay progress={loadProgress} />}

      {/* Poster Image (shown while loading) */}
      {poster && isLoading && (
        <img
          src={poster}
          alt="Preview do modelo 3D"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}

      {/* 3D Canvas */}
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
          <Model url={modelUrl} scale={scale} onProgress={handleProgress} />
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
    </div>
  )
}

// Preload helper for better performance
export function preloadModel(url: string) {
  useGLTF.preload(url)
}
