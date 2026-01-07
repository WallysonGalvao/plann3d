'use client'

/**
 * IFC Viewer Component - Using @thatopen/components
 * Modern BIM viewer with improved IFC geometry support
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import * as OBC from '@thatopen/components'
import * as THREE from 'three'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'

// ============================================
// TYPES
// ============================================

interface IFCViewerProps {
  modelUrl: string
  className?: string
  onLoad?: () => void
  onError?: (error: Error) => void
}

// ============================================
// MAIN COMPONENT
// ============================================

export function IFCViewer({ modelUrl, className = '', onLoad, onError }: IFCViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const componentsRef = useRef<OBC.Components | null>(null)
  const worldRef = useRef<OBC.World | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const setMounted = useIFCViewerStore((state) => state.setMounted)
  const setModelUrl = useIFCViewerStore((state) => state.setModelUrl)
  // selectElement will be used when implementing element picking
  // const selectElement = useIFCViewerStore((state) => state.selectElement)

  // Initialize ThatOpen Components
  const initializeViewer = useCallback(async () => {
    if (!containerRef.current) return

    try {
      console.log('[IFCViewer] Initializing ThatOpen Components...')

      // Create components instance
      const components = new OBC.Components()
      componentsRef.current = components

      // Create world
      const worlds = components.get(OBC.Worlds)
      const world = worlds.create<
        OBC.SimpleScene,
        OBC.OrthoPerspectiveCamera,
        OBC.SimpleRenderer
      >()
      worldRef.current = world

      // Setup scene
      world.scene = new OBC.SimpleScene(components)
      world.scene.setup()
      world.scene.three.background = new THREE.Color(0xf0f2f5)

      // Setup renderer
      world.renderer = new OBC.SimpleRenderer(components, containerRef.current)

      // Setup camera
      world.camera = new OBC.OrthoPerspectiveCamera(components)
      await world.camera.controls.setLookAt(30, 30, 30, 0, 0, 0)

      // Initialize components
      components.init()

      // Add grid
      const grids = components.get(OBC.Grids)
      grids.create(world)

      console.log('[IFCViewer] Components initialized, loading model...')

      // Setup IFC Loader
      const ifcLoader = components.get(OBC.IfcLoader)

      // Configure WASM path
      await ifcLoader.setup({
        autoSetWasm: false,
        wasm: {
          path: '/wasm/',
          absolute: false,
        },
      })

      // Setup Fragments Manager - MUST call init() before using
      const fragments = components.get(OBC.FragmentsManager)
      const workerUrl = 'https://thatopen.github.io/engine_fragment/resources/worker.mjs'
      fragments.init(workerUrl)

      // Update fragments when camera stops
      world.camera.controls.addEventListener('rest', () => {
        fragments.core.update(true)
      })

      // Handle model loaded
      fragments.list.onItemSet.add(({ value: model }) => {
        console.log('[IFCViewer] Model loaded into fragments')
        model.useCamera(world.camera.three)
        world.scene.three.add(model.object)

        // Fit camera to model - auto-fits to scene content
        setTimeout(async () => {
          try {
            await world.camera.controls.fitToSphere(model.object, true)
          } catch (e) {
            console.log('[IFCViewer] Camera fit fallback')
          }
        }, 100)

        setIsLoading(false)
        onLoad?.()
      })

      // Load the IFC file
      const response = await fetch(modelUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch IFC file: ${response.statusText}`)
      }

      const data = await response.arrayBuffer()
      const buffer = new Uint8Array(data)

      await ifcLoader.load(buffer, false, 'model', {
        processData: {
          progressCallback: (progress) => {
            console.log(`[IFCViewer] Loading progress: ${(progress * 100).toFixed(1)}%`)
          },
        },
      })

      console.log('[IFCViewer] IFC file loaded successfully')

    } catch (err) {
      console.error('[IFCViewer] Error:', err)
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error.message)
      setIsLoading(false)
      onError?.(error)
    }
  }, [modelUrl, onLoad, onError])

  // Cleanup function
  const cleanup = useCallback(() => {
    if (componentsRef.current) {
      componentsRef.current.dispose()
      componentsRef.current = null
    }
    worldRef.current = null
  }, [])

  // Initialize on mount
  useEffect(() => {
    setMounted()
    setModelUrl(modelUrl)

    initializeViewer()

    return () => {
      cleanup()
    }
  }, [setMounted, setModelUrl, modelUrl, initializeViewer, cleanup])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (worldRef.current?.renderer && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        worldRef.current.renderer.resize(new THREE.Vector2(rect.width, rect.height))
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Technical grid background */}
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* 3D Viewer Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10"
        style={{ touchAction: 'none' }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-muted-foreground text-sm">Carregando modelo IFC...</span>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80">
          <div className="flex flex-col items-center gap-4 text-center p-6">
            <div className="text-4xl">⚠️</div>
            <span className="text-destructive font-medium">Erro ao carregar modelo</span>
            <span className="text-muted-foreground text-sm max-w-md">{error}</span>
          </div>
        </div>
      )}

      {/* Navigation cube placeholder */}
      <div className="absolute top-4 right-4 size-16 bg-white/10 backdrop-blur border border-gray-300 rounded-sm flex items-center justify-center shadow-lg cursor-pointer hover:bg-white/20 transition-all z-20">
        <div className="size-8 border-2 border-gray-600 transform rotate-45 flex items-center justify-center">
          <span className="text-[8px] font-bold text-gray-700 transform -rotate-45">TOP</span>
        </div>
      </div>
    </div>
  )
}
