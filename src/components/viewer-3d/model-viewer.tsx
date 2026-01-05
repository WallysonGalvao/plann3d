'use client'

import { Center, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
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

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-border ${className}`}
      style={{
        height,
        background: background === 'transparent' ? 'var(--color-secondary)' : background,
      }}
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
