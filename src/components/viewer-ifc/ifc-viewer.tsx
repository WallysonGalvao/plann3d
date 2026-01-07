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
  const initializingRef = useRef(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const setMounted = useIFCViewerStore((state) => state.setMounted)
  const setModelUrl = useIFCViewerStore((state) => state.setModelUrl)

  // Initialize ThatOpen Components
  const initializeViewer = useCallback(async () => {
    if (!containerRef.current || initializingRef.current) return
    initializingRef.current = true

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

      // Setup scene FIRST
      world.scene = new OBC.SimpleScene(components)
      world.scene.setup()
      world.scene.three.background = new THREE.Color(0x1a1a2e)

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      world.scene.three.add(ambientLight)

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
      directionalLight.position.set(50, 50, 50)
      world.scene.three.add(directionalLight)

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight2.position.set(-50, 30, -50)
      world.scene.three.add(directionalLight2)

      // Setup renderer SECOND
      world.renderer = new OBC.SimpleRenderer(components, containerRef.current)

      // Setup camera THIRD
      world.camera = new OBC.OrthoPerspectiveCamera(components)
      await world.camera.controls.setLookAt(30, 30, 30, 0, 0, 0)

      // Initialize components (starts the render loop)
      components.init()

      // Add grid
      const grids = components.get(OBC.Grids)
      const grid = grids.create(world)
      grid.visible = true

      console.log('[IFCViewer] Scene, renderer, camera ready. Setting up loaders...')

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

      console.log('[IFCViewer] IFC Loader configured with WASM')

      // Setup Fragments Manager
      const fragments = components.get(OBC.FragmentsManager)
      const workerUrl = 'https://thatopen.github.io/engine_fragment/resources/worker.mjs'
      fragments.init(workerUrl)

      // Handle when model is added to fragments list
      fragments.list.onItemSet.add(({ value: model }) => {
        console.log('[IFCViewer] Model added to fragments list:', model)

        if (world.camera && model) {
          model.useCamera(world.camera.three)
          world.scene.three.add(model.object)

          // Fit camera to model after a brief delay
          setTimeout(async () => {
            try {
              if (world.camera) {
                await world.camera.controls.fitToSphere(model.object, true)
                console.log('[IFCViewer] Camera fitted to model')
              }
            } catch (e) {
              console.log('[IFCViewer] Camera fit error, using fallback:', e)
              if (world.camera) {
                await world.camera.controls.setLookAt(50, 50, 50, 0, 0, 0)
              }
            }
          }, 300)
        }

        // Dismiss loading overlay
        setIsLoading(false)
        onLoad?.()
      })

      // Handle fragment updates on camera rest
      world.camera.controls.addEventListener('rest', () => {
        fragments.core.update(true)
      })

      console.log('[IFCViewer] FragmentsManager initialized, loading IFC file...')

      // Load the IFC file
      const response = await fetch(modelUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch IFC file: ${response.statusText}`)
      }

      const data = await response.arrayBuffer()
      const buffer = new Uint8Array(data)

      console.log('[IFCViewer] Fetched IFC file, size:', buffer.length, 'bytes')

      // Load the model - this will trigger onItemSet when complete
      await ifcLoader.load(buffer, false, 'model', {
        processData: {
          progressCallback: (progress) => {
            const pct = Math.round(progress * 100)
            setLoadingProgress(pct)
            if (pct % 20 === 0) {
              console.log(`[IFCViewer] Loading progress: ${pct}%`)
            }
          },
        },
      })

      console.log('[IFCViewer] ifcLoader.load() promise resolved')

      // Safety timeout - dismiss loading after 5 seconds even if event didn't fire
      setTimeout(() => {
        setIsLoading(prev => {
          if (prev) {
            console.log('[IFCViewer] Safety timeout: dismissing loading overlay')
            onLoad?.()
          }
          return false
        })
      }, 5000)

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
    initializingRef.current = false
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
      {/* 3D Viewer Container */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ touchAction: 'none' }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1a1a2e]/90 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-white text-sm font-medium">Carregando modelo IFC...</span>
            <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-white/60 text-xs">{loadingProgress}%</span>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1a1a2e]/95">
          <div className="flex flex-col items-center gap-4 text-center p-6">
            <div className="text-5xl">⚠️</div>
            <span className="text-red-400 font-medium text-lg">Erro ao carregar modelo</span>
            <span className="text-gray-400 text-sm max-w-md">{error}</span>
          </div>
        </div>
      )}

      {/* Navigation cube */}
      <div className="absolute top-4 right-4 size-16 bg-white/10 backdrop-blur border border-white/20 rounded-lg flex items-center justify-center shadow-xl cursor-pointer hover:bg-white/20 transition-all z-20">
        <div className="size-8 border-2 border-white/40 transform rotate-45 flex items-center justify-center rounded-sm">
          <span className="text-[8px] font-bold text-white/80 transform -rotate-45">TOP</span>
        </div>
      </div>
    </div>
  )
}
