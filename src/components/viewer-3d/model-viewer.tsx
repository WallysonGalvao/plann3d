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
// MODEL COMPONENT
// ============================================

interface ModelProps {
  url: string
  scale?: number
}

function Model({ url, scale = 1 }: ModelProps) {
  const { scene } = useGLTF(url)

  return (
    <Center>
      <primitive
        object={scene}
        scale={scale}
        dispose={null}
      />
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
// VIEWER CONTROLS UI
// ============================================

interface ViewerControlsProps {
  onReset: () => void
  onFullscreen: () => void
  isFullscreen: boolean
}

function ViewerControlsUI({ onReset, onFullscreen, isFullscreen }: ViewerControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2 z-10">
      <button
        onClick={onReset}
        className="p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border hover:bg-secondary transition-colors"
        aria-label="Resetar câmera"
        title="Resetar câmera"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
      <button
        onClick={onFullscreen}
        className="p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border hover:bg-secondary transition-colors"
        aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
        title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
      >
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        )}
      </button>
    </div>
  )
}

// ============================================
// LOADING OVERLAY
// ============================================

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Carregando modelo 3D...</span>
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * Interactive 3D Model Viewer
 * 
 * Displays .glb/.gltf models with orbit controls, environment lighting,
 * and fullscreen support.
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
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Reset camera to initial position
  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  // Toggle fullscreen mode
  const handleFullscreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-border ${className}`}
      style={{ height, background: background === 'transparent' ? 'var(--color-secondary)' : background }}
    >
      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}

      {/* Poster Image (shown while loading) */}
      {poster && isLoading && (
        <img
          src={poster}
          alt="Preview do modelo 3D"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Controls UI */}
      <ViewerControlsUI
        onReset={handleReset}
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-xs text-muted-foreground bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded-lg z-10">
        🖱️ Arraste para rotacionar • Scroll para zoom
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{
          antialias: true,
          alpha: background === 'transparent',
          powerPreference: 'high-performance',
        }}
        onCreated={() => setIsLoading(false)}
        style={{ background: background === 'transparent' ? 'transparent' : background }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        {/* Environment for realistic reflections */}
        <Environment preset="city" background={false} />

        {/* Model with Suspense */}
        <Suspense fallback={<LoadingBox />}>
          <Model url={modelUrl} scale={scale} />
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
