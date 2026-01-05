import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getProjectById } from '@/data/projects'
import { ClientOnlyModelViewer } from '@/components/viewer-3d'
import logo from '@/assets/logo.svg'

// Import type separately (not lazy loaded)
type ModelMetadata = {
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

export const Route = createFileRoute('/projects/$projectId_/viewer')({
  component: ProjectViewerPage,
})

function ProjectViewerPage() {
  const { projectId } = Route.useParams()
  const { t, i18n } = useTranslation()

  // Client-side mount detection to prevent SSR hydration mismatch
  const [isMounted, setIsMounted] = useState(false)

  // ALL hooks must be called before ANY conditional logic or early returns
  const [showSpecs, setShowSpecs] = useState(true)
  const [modelMetadata, setModelMetadata] = useState<ModelMetadata | null>(null)
  const [isPanMode, setIsPanMode] = useState(false)
  const [isAutoTour, setIsAutoTour] = useState(false)
  const [visibleLayers, setVisibleLayers] = useState({
    structure: true,
    furniture: true,
    vegetation: true,
    lighting: true,
  })
  const [showLayers, setShowLayers] = useState(false)
  const [showPresets, setShowPresets] = useState(false)
  const [activeCameraPreset, setActiveCameraPreset] = useState<
    'front' | 'back' | 'left' | 'right' | 'top' | 'perspective' | null
  >(null)
  const [resetTrigger, setResetTrigger] = useState(0)
  const [isKeyPanActive, setIsKeyPanActive] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Effect for client-side mount detection
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Effect to handle Cmd/Ctrl key for temporary pan mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !isKeyPanActive) {
        setIsKeyPanActive(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey && isKeyPanActive) {
        setIsKeyPanActive(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isKeyPanActive])

  const languageCode = i18n.language ? i18n.language.split('-')[0] : 'pt'
  const locale = languageCode === 'en' ? 'en' : 'pt'
  const project = getProjectById(projectId, locale)

  // Show loading state during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex flex-col h-screen bg-background overflow-hidden antialiased">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-muted-foreground">
              {t('viewer3d.loading') || 'Carregando...'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Handlers for control buttons
  const handleResetCamera = () => {
    setResetTrigger((prev) => prev + 1)
  }

  const handleFullscreen = () => {
    const element = document.documentElement
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const handlePanToggle = () => {
    setIsPanMode(!isPanMode)
  }

  const handleAutoTour = () => {
    setIsAutoTour(!isAutoTour)
  }

  const handleCameraPreset = (
    preset: 'front' | 'back' | 'left' | 'right' | 'top' | 'perspective',
  ) => {
    setActiveCameraPreset(preset)
    setShowPresets(false)
  }

  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers((prev) => ({ ...prev, [layer]: !prev[layer] }))
  }

  // No early return - use conditional rendering instead
  const hasModel = !!project?.model3d

  return hasModel && project.model3d ? (
    <div className="flex flex-col h-screen bg-background overflow-hidden antialiased">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 lg:px-10 shrink-0 z-50 relative shadow-lg">
        <div className="flex items-center gap-4">
          <Link
            to="/projects/$projectId"
            params={{ projectId }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">{t('viewer3d.backToProject')}</span>
          </Link>
        </div>
        <Link
          to="/"
          className="flex items-center gap-3 text-foreground hover:opacity-80 transition-opacity duration-300"
        >
          <img src={logo} alt="Plann3d Logo" className="h-8 w-auto" />
          <h2 className="text-foreground text-xl font-bold leading-tight tracking-tight uppercase">
            Plann3d
          </h2>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 w-full h-full bg-background overflow-hidden">
        {/* 3D Model Viewer */}
        <div
          className="absolute inset-0 z-0"
          style={{
            cursor:
              isDragging && (isPanMode || isKeyPanActive)
                ? 'grabbing'
                : isPanMode || isKeyPanActive
                  ? 'grab'
                  : 'default',
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <ClientOnlyModelViewer
            modelUrl={project.model3d.src}
            poster={project.model3d.thumbnail}
            height="100%"
            scale={project.model3d.scale}
            cameraPosition={project.model3d.cameraPosition}
            autoRotate={project.model3d.autoRotate}
            onMetadataExtracted={setModelMetadata}
            enablePan={isPanMode || isKeyPanActive}
            cameraPreset={activeCameraPreset}
            autoTourActive={isAutoTour}
            visibleLayers={visibleLayers}
            onCameraPresetApplied={() => setActiveCameraPreset(null)}
            resetTrigger={resetTrigger}
          />
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-border z-50">
          <div className="h-full bg-primary w-[85%] shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
        </div>

        {/* Project Info Card - Top Left */}
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 max-w-lg animate-fade-in">
          <div className="glass-panel p-6 rounded-xl shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex size-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold text-primary tracking-wider uppercase">
                {t('viewer3d.title')}
              </span>
            </div>
            <h1 className="text-foreground text-4xl font-bold leading-tight tracking-tight mb-2">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
              <span>Ref: {projectId.toUpperCase()}</span>
              <span className="w-px h-3 bg-gray-700" />
              <span>
                {t('viewer3d.location')}: {project.location}
              </span>
            </div>
          </div>
        </div>

        {/* Specifications Panel - Right Side */}
        <aside
          className={`absolute top-6 bottom-20 right-6 w-96 glass-panel flex flex-col rounded-xl z-20 shadow-2xl border border-border transition-transform duration-300 ${
            showSpecs ? 'translate-x-0' : 'translate-x-[calc(100%+1.5rem)]'
          }`}
        >
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/5 rounded-t-xl">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                {t('viewer3d.keySpecs')}
              </h3>
            </div>
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t('viewer3d.closePanel')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Model Specifications - Dynamic from 3D Model */}
            {modelMetadata && (
              <>
                {/* Geometria Section */}
                <div className="space-y-3">
                  <SectionHeader icon={<CubeIcon />} title={t('viewer3d.geometry')} />
                  <div className="grid grid-cols-2 gap-3">
                    <SpecCard
                      icon={<TriangleIcon />}
                      title={t('viewer3d.triangles')}
                      value={modelMetadata.triangles.toLocaleString(
                        locale === 'pt' ? 'pt-BR' : 'en-US',
                      )}
                      description={t('viewer3d.polygons')}
                    />
                    <SpecCard
                      icon={<GridIcon />}
                      title={t('viewer3d.vertices')}
                      value={modelMetadata.vertices.toLocaleString(
                        locale === 'pt' ? 'pt-BR' : 'en-US',
                      )}
                      description={t('viewer3d.points3d')}
                    />
                    <SpecCard
                      icon={<LayersIcon />}
                      title={t('viewer3d.objects')}
                      value={modelMetadata.objects.toLocaleString(
                        locale === 'pt' ? 'pt-BR' : 'en-US',
                      )}
                      description={t('viewer3d.meshes')}
                    />
                    {modelMetadata.detailLevel && (
                      <SpecCard
                        icon={<ZapIcon />}
                        title={t('viewer3d.detailLevel')}
                        value={modelMetadata.detailLevel}
                        description={t('viewer3d.polygonDensity')}
                      />
                    )}
                  </div>
                </div>

                {/* Recursos Section */}
                <div className="space-y-3">
                  <SectionHeader icon={<PaletteIcon />} title={t('viewer3d.resources')} />
                  <div className="grid grid-cols-2 gap-3">
                    <SpecCard
                      icon={<PaletteIcon />}
                      title={t('viewer3d.materials')}
                      value={modelMetadata.materials.toString()}
                      description={t('viewer3d.texturesShaders')}
                    />
                    {modelMetadata.textures !== undefined && modelMetadata.textures > 0 && (
                      <SpecCard
                        icon={<ImageIcon />}
                        title={t('viewer3d.textures')}
                        value={modelMetadata.textures.toString()}
                        description={t('viewer3d.textureMaps')}
                      />
                    )}
                    {modelMetadata.animations !== undefined && modelMetadata.animations > 0 && (
                      <SpecCard
                        icon={<PlayIcon />}
                        title={t('viewer3d.animations')}
                        value={modelMetadata.animations.toString()}
                        description={t('viewer3d.animationClips')}
                      />
                    )}
                  </div>
                </div>

                {/* Medidas Físicas Section */}
                <div className="space-y-3">
                  <SectionHeader icon={<RulerIcon />} title={t('viewer3d.physicalMeasures')} />
                  <div className="grid grid-cols-3 gap-3">
                    <DimensionCard
                      label={t('viewer3d.width')}
                      value={modelMetadata.dimensions.width}
                      unit="m"
                    />
                    <DimensionCard
                      label={t('viewer3d.height')}
                      value={modelMetadata.dimensions.height}
                      unit="m"
                    />
                    <DimensionCard
                      label={t('viewer3d.depth')}
                      value={modelMetadata.dimensions.depth}
                      unit="m"
                    />
                  </div>
                  {modelMetadata.area !== undefined && modelMetadata.volume !== undefined && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <SpecCard
                        icon={<SquareIcon />}
                        title="Área Total"
                        value={modelMetadata.area.toLocaleString(
                          locale === 'pt' ? 'pt-BR' : 'en-US',
                        )}
                        description="m² (largura × profundidade)"
                      />
                      <SpecCard
                        icon={<BoxIcon />}
                        title={t('viewer3d.volume')}
                        value={modelMetadata.volume.toLocaleString(
                          locale === 'pt' ? 'pt-BR' : 'en-US',
                        )}
                        description="m³ (l × a × p)"
                      />
                    </div>
                  )}
                </div>

                {/* Arquivo Section */}
                {modelMetadata.format && (
                  <div className="space-y-3">
                    <SectionHeader icon={<FileIcon />} title={t('viewer3d.file')} />
                    <div className="grid grid-cols-2 gap-3">
                      <SpecCard
                        icon={<FileIcon />}
                        title={t('viewer3d.format')}
                        value={modelMetadata.format}
                        description={t('viewer3d.fileType')}
                      />
                      {modelMetadata.fileSize && (
                        <SpecCard
                          icon={<DatabaseIcon />}
                          title={t('viewer3d.fileSize')}
                          value={modelMetadata.fileSize}
                          description={t('viewer3d.fileSizeDesc')}
                        />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Loading state while metadata is being extracted */}
            {!modelMetadata && (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-sm text-muted-foreground">{t('viewer3d.analyzing')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Bottom Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
          {/* Keyboard Pan Indicator */}
          {isKeyPanActive && (
            <div className="glass-panel px-4 py-2 rounded-lg animate-fade-in opacity-75 hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2 text-sm text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
                <span className="font-medium">{t('viewer3d.panModeActive')} (⌘/Ctrl)</span>
              </div>
            </div>
          )}

          {/* Controls Bar */}
          <div className="opacity-75 hover:opacity-100 transition-opacity duration-300">
          <div className="glass-panel p-2 rounded-full flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {/* Pan Mode */}
            <ControlButton
              icon="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
              label="Pan"
              onClick={handlePanToggle}
              isActive={isPanMode || isKeyPanActive}
            />
            {/* Camera Presets */}
            <ControlButton
              icon="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              label="Vistas"
              onClick={() => setShowPresets(!showPresets)}
              isActive={showPresets}
            />
            {/* Auto Tour */}
            <ControlButton
              icon="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              label="Tour Auto"
              onClick={handleAutoTour}
              isActive={isAutoTour}
            />
            {/* Layers */}
            <ControlButton
              icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              label="Camadas"
              onClick={() => setShowLayers(!showLayers)}
              isActive={showLayers}
            />
            {/* Reset Camera */}
            <ControlButton
              icon="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              label={t('viewer3d.resetCamera')}
              onClick={handleResetCamera}
            />
            {/* Fullscreen */}
            <ControlButton
              icon="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              label={t('viewer3d.fullscreen')}
              onClick={handleFullscreen}
            />
            {/* Toggle Specs */}
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className={`size-10 rounded-full flex items-center justify-center transition-all relative group ${
                showSpecs
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
              aria-label={t('viewer3d.toggleSpecs')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-popover text-popover-foreground text-xs rounded whitespace-nowrap border border-border">
                {t('viewer3d.toggleSpecs')}
              </span>
            </button>
          </div>
          </div>
        </div>

        {/* Camera Presets Popup */}
        {showPresets && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30">
            <div className="glass-panel p-3 rounded-xl shadow-2xl">
              <div className="grid grid-cols-3 gap-2">
                <PresetButton label="Frontal" onClick={() => handleCameraPreset('front')} />
                <PresetButton label="Traseira" onClick={() => handleCameraPreset('back')} />
                <PresetButton label="Esquerda" onClick={() => handleCameraPreset('left')} />
                <PresetButton label="Direita" onClick={() => handleCameraPreset('right')} />
                <PresetButton label="Superior" onClick={() => handleCameraPreset('top')} />
                <PresetButton
                  label="Perspectiva"
                  onClick={() => handleCameraPreset('perspective')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Layers Popup */}
        {showLayers && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30">
            <div className="glass-panel p-4 rounded-xl shadow-2xl w-64">
              <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                Camadas
              </h4>
              <div className="space-y-2">
                <LayerToggle
                  label="Estrutura"
                  checked={visibleLayers.structure}
                  onChange={() => toggleLayer('structure')}
                />
                <LayerToggle
                  label="Mobiliário"
                  checked={visibleLayers.furniture}
                  onChange={() => toggleLayer('furniture')}
                />
                <LayerToggle
                  label="Vegetação"
                  checked={visibleLayers.vegetation}
                  onChange={() => toggleLayer('vegetation')}
                />
                <LayerToggle
                  label="Iluminação"
                  checked={visibleLayers.lighting}
                  onChange={() => toggleLayer('lighting')}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="h-10 bg-card border-t border-border flex items-center justify-center px-6 lg:px-10 shrink-0 z-50 text-xs text-muted-foreground">
        <span>© 2026 PLANN3D</span>
      </footer>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <h1 className="text-foreground text-2xl font-bold mb-4">
          {t('viewer3d.modelNotAvailable')}
        </h1>
        <p className="text-muted-foreground mb-6">{t('viewer3d.modelNotConfigured')}</p>
        <Link
          to="/projects/$projectId"
          params={{ projectId }}
          className="text-primary hover:underline"
        >
          {t('viewer3d.backToProject')}
        </Link>
      </div>
    </div>
  )
}

// Icon Components
function CubeIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  )
}

function TriangleIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
      />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  )
}

function RulerIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  )
}

function SquareIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
      />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  )
}

function DatabaseIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  )
}

// Helper Components
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 pb-2">
      <div className="shrink-0 opacity-70">{icon}</div>
      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">{title}</h4>
    </div>
  )
}

function SpecCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode
  title: string
  value: string
  description: string
}) {
  return (
    <div className="p-3 bg-card rounded-lg border border-border flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="shrink-0">{icon}</div>
        <span className="text-xs text-muted-foreground uppercase font-mono tracking-wider">
          {title}
        </span>
      </div>
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  )
}

function DimensionCard({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="p-3 bg-card rounded-lg border border-border flex flex-col gap-1">
      <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wide wrap-break-word">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-foreground">{value.toFixed(2)}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}

function ControlButton({
  icon,
  label,
  onClick,
  isActive = false,
}: {
  icon: string
  label: string
  onClick?: () => void
  isActive?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`size-10 rounded-full flex items-center justify-center transition-all relative group ${
        isActive
          ? 'bg-primary/20 text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
      }`}
      aria-label={label}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-popover text-popover-foreground text-xs rounded whitespace-nowrap border border-border">
        {label}
      </span>
    </button>
  )
}

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 text-xs text-foreground bg-muted/10 hover:bg-muted/20 rounded-lg transition-colors font-medium"
    >
      {label}
    </button>
  )
}

function LayerToggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary/50"
      />
    </label>
  )
}
