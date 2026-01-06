import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { ModelMetadata } from '@/components/viewer-3d/specifications-panel'
import { getProjectById } from '@/data/projects'
import { ClientOnlyModelViewer } from '@/components/viewer-3d'
import { SpecificationsPanel } from '@/components/viewer-3d/specifications-panel'
import { ZoomSlider } from '@/components/viewer-3d/zoom-slider'
import { type ModelQuality } from '@/hooks/useProgressiveModel'
import logo from '@/assets/logo.svg'

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
  const [isAutoRotate, setIsAutoRotate] = useState(true) // Start with rotation enabled
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
  const [zoomLevel, setZoomLevel] = useState(50) // 0-100 zoom level

  // LOD Quality state
  const [currentQuality, setCurrentQuality] = useState<ModelQuality>('low')
  const [qualityStatus, setQualityStatus] = useState<Record<ModelQuality, { available: boolean; loading: boolean; loaded: boolean }>>({
    low: { available: false, loading: false, loaded: false },
    medium: { available: false, loading: false, loaded: false },
    high: { available: false, loading: false, loaded: false },
  })
  const [lodProgress, setLodProgress] = useState(0)
  const [forceQuality, setForceQuality] = useState<ModelQuality | undefined>(undefined)

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
            <span className="text-muted-foreground">{t('viewer3d.loading')}</span>
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

  const handleAutoRotateToggle = () => {
    setIsAutoRotate(!isAutoRotate)
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
            cameraPosition={
              project.model3d.cameraPosition?.map((val) => val * 0.05) as [number, number, number] | undefined
            }
            autoRotate={isAutoRotate}
            onMetadataExtracted={setModelMetadata}
            enablePan={isPanMode || isKeyPanActive}
            cameraPreset={activeCameraPreset}
            autoTourActive={isAutoTour}
            visibleLayers={visibleLayers}
            onCameraPresetApplied={() => setActiveCameraPreset(null)}
            resetTrigger={resetTrigger}
            zoomLevel={zoomLevel}
            lodUrls={project.model3d.lod}
            onQualityChange={setCurrentQuality}
            onQualityStatusChange={setQualityStatus}
            onLodProgress={setLodProgress}
            forceQuality={forceQuality}
          />
        </div>

        {/* Progress Bar - Reflects LOD Loading */}
        <div className="absolute top-0 left-0 w-full h-1 bg-border z-50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            style={{ width: `${lodProgress}%` }}
          />
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
        <SpecificationsPanel
          metadata={modelMetadata}
          locale={locale}
          isVisible={showSpecs}
          onToggleVisibility={() => setShowSpecs(!showSpecs)}
        />

        {/* Zoom Slider - Right Side (positioned relative to specs panel) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${showSpecs ? 'right-104' : 'right-6'}`}
        >
          <div className="glass-panel rounded-2xl shadow-2xl border border-border">
            <ZoomSlider value={zoomLevel} onChange={setZoomLevel} min={10} max={200} />
          </div>
        </div>

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
          <div className="opacity-90 hover:opacity-100 transition-opacity duration-300">
            <div className="glass-panel p-2 rounded-full flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {/* Quality Selector - Inline */}
              {project.model3d.lod && (
                <div className="flex items-center gap-3 px-2 border-r border-border mr-1">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest hidden sm:block">
                    {t('viewer3d.qualitySelector.label')}
                  </span>
                  <div className="flex bg-muted/30 dark:bg-muted/20 rounded-lg p-0.5 border border-border">
                    <button
                      onClick={() => setForceQuality('low')}
                      disabled={!qualityStatus.low.loaded}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${currentQuality === 'low'
                        ? 'text-primary-foreground bg-primary shadow-lg shadow-primary/20'
                        : qualityStatus.low.loaded
                          ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          : 'text-muted-foreground/30 cursor-not-allowed'
                        }`}
                    >
                      {qualityStatus.low.loading ? t('viewer3d.qualitySelector.loading') : t('viewer3d.qualitySelector.low')}
                    </button>
                    <button
                      onClick={() => setForceQuality('medium')}
                      disabled={!qualityStatus.medium.loaded}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${currentQuality === 'medium'
                        ? 'text-primary-foreground bg-primary shadow-lg shadow-primary/20'
                        : qualityStatus.medium.loaded
                          ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          : 'text-muted-foreground/30 cursor-not-allowed'
                        }`}
                    >
                      {qualityStatus.medium.loading ? t('viewer3d.qualitySelector.loading') : t('viewer3d.qualitySelector.medium')}
                    </button>
                    <button
                      onClick={() => setForceQuality('high')}
                      disabled={!qualityStatus.high.loaded}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${currentQuality === 'high'
                        ? 'text-primary-foreground bg-primary shadow-lg shadow-primary/20'
                        : qualityStatus.high.loaded
                          ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          : 'text-muted-foreground/30 cursor-not-allowed'
                        }`}
                    >
                      {qualityStatus.high.loading ? t('viewer3d.qualitySelector.loading') : t('viewer3d.qualitySelector.high')}
                    </button>
                  </div>
                  <div className="w-px h-6 bg-border" />
                </div>
              )}

              {/* Pan Mode */}
              <ControlButton
                icon="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                label={t('viewer3d.controls.pan')}
                onClick={handlePanToggle}
                isActive={isPanMode || isKeyPanActive}
              />
              {/* Camera Presets */}
              <ControlButton
                icon="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                label={t('viewer3d.controls.views')}
                onClick={() => setShowPresets(!showPresets)}
                isActive={showPresets}
              />
              {/* Auto Tour */}
              <ControlButton
                icon="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                label={t('viewer3d.controls.autoTour')}
                onClick={handleAutoTour}
                isActive={isAutoTour}
              />
              {/* Auto Rotate */}
              <ControlButton
                icon="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                label={isAutoRotate ? t('viewer3d.controls.pause') : t('viewer3d.controls.rotation')}
                onClick={handleAutoRotateToggle}
                isActive={isAutoRotate}
              />
              {/* Layers */}
              <ControlButton
                icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                label={t('viewer3d.controls.layers')}
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
                className={`size-10 rounded-full flex items-center justify-center transition-all relative group ${showSpecs
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
                <PresetButton
                  label={t('viewer3d.presets.front')}
                  onClick={() => handleCameraPreset('front')}
                />
                <PresetButton
                  label={t('viewer3d.presets.back')}
                  onClick={() => handleCameraPreset('back')}
                />
                <PresetButton
                  label={t('viewer3d.presets.left')}
                  onClick={() => handleCameraPreset('left')}
                />
                <PresetButton
                  label={t('viewer3d.presets.right')}
                  onClick={() => handleCameraPreset('right')}
                />
                <PresetButton
                  label={t('viewer3d.presets.top')}
                  onClick={() => handleCameraPreset('top')}
                />
                <PresetButton
                  label={t('viewer3d.presets.perspective')}
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
                {t('viewer3d.layers.title')}
              </h4>
              <div className="space-y-2">
                <LayerToggle
                  label={t('viewer3d.layers.structure')}
                  checked={visibleLayers.structure}
                  onChange={() => toggleLayer('structure')}
                />
                <LayerToggle
                  label={t('viewer3d.layers.furniture')}
                  checked={visibleLayers.furniture}
                  onChange={() => toggleLayer('furniture')}
                />
                <LayerToggle
                  label={t('viewer3d.layers.vegetation')}
                  checked={visibleLayers.vegetation}
                  onChange={() => toggleLayer('vegetation')}
                />
                <LayerToggle
                  label={t('viewer3d.layers.lighting')}
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

// Helper Components
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
      className={`size-10 rounded-full flex items-center justify-center transition-all relative group ${isActive
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
