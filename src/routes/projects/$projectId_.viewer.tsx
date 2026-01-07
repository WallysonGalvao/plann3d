import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { getProjectById } from '@/data/projects'
import { ClientOnlyModelViewer } from '@/components/viewer-3d'
import { SpecificationsPanel } from '@/components/viewer-3d/specifications-panel'
import { ZoomSlider } from '@/components/viewer-3d/zoom-slider'
import { TouchHelpOverlay } from '@/components/viewer-3d/touch-help-overlay'
import { ViewerHeader } from '@/components/viewer-3d/viewer-header'
import { ViewerInfoCard } from '@/components/viewer-3d/viewer-info-card'
import { ViewerControlsBar } from '@/components/viewer-3d/viewer-controls-bar'
import {
  ViewerContextProvider,
  useViewerContext,
} from '@/contexts/viewer-context'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const Route = createFileRoute('/projects/$projectId_/viewer')({
  component: ProjectViewerPage,
})

function ProjectViewerPage() {
  const { projectId } = Route.useParams()
  const { i18n } = useTranslation()

  const languageCode = i18n.language ? i18n.language.split('-')[0] : 'pt'
  const locale = languageCode === 'en' ? 'en' : 'pt'
  const project = getProjectById(projectId, locale)

  // Render not available if no model
  if (!project?.model3d) {
    return <ProjectNotAvailable projectId={projectId} />
  }

  return (
    <ViewerContextProvider>
      <ViewerContent project={project} projectId={projectId} locale={locale} />
    </ViewerContextProvider>
  )
}

// ============================================
// VIEWER CONTENT (inside context)
// ============================================

interface ViewerContentProps {
  project: NonNullable<ReturnType<typeof getProjectById>>
  projectId: string
  locale: 'en' | 'pt'
}

function ViewerContent({ project, projectId, locale }: ViewerContentProps) {
  const { t } = useTranslation()
  const { state, actions } = useViewerContext()
  const { isMobile, isTouchDevice } = useMediaQuery()

  // SSR loading state - wait for mount
  if (!state.isMounted) {
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

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden antialiased">
      {/* Header */}
      <ViewerHeader projectId={projectId} />

      {/* Main Content */}
      <main className="relative flex-1 w-full h-full bg-background overflow-hidden">
        {/* 3D Model Viewer */}
        <div
          className="absolute inset-0 z-0"
          style={{
            cursor:
              state.isDragging && (state.isPanMode || state.isKeyPanActive)
                ? 'grabbing'
                : state.isPanMode || state.isKeyPanActive
                  ? 'grab'
                  : 'default',
            touchAction: 'none', // Prevent browser gesture interference
          }}
          onMouseDown={() => actions.setDragging(true)}
          onMouseUp={() => actions.setDragging(false)}
          onMouseLeave={() => actions.setDragging(false)}
        >
          <ClientOnlyModelViewer
            modelUrl={project.model3d.src}
            poster={project.model3d.thumbnail}
            height="100%"
            scale={project.model3d.scale}
            cameraPosition={
              project.model3d.cameraPosition?.map((val) => val * 0.05) as
              | [number, number, number]
              | undefined
            }
            autoRotate={state.isAutoRotate}
            onMetadataExtracted={actions.setModelMetadata}
            enablePan={state.isPanMode || state.isKeyPanActive}
            cameraPreset={state.activeCameraPreset}
            autoTourActive={state.isAutoTour}
            visibleLayers={state.visibleLayers}
            onCameraPresetApplied={() => actions.setCameraPreset(null)}
            resetTrigger={state.resetTrigger}
            zoomLevel={state.zoomLevel}
            lodUrls={project.model3d.lod}
            onQualityChange={actions.setCurrentQuality}
            onQualityStatusChange={actions.setQualityStatus}
            onLodProgress={actions.setLodProgress}
            forceQuality={state.forceQuality}
          />
        </div>

        {/* Progress Bar - Reflects LOD Loading */}
        <div className="absolute top-0 left-0 w-full h-1 bg-border z-50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            style={{ width: `${state.lodProgress}%` }}
          />
        </div>

        {/* Project Info Card - Top Left */}
        <ViewerInfoCard project={project} projectId={projectId} />

        {/* Touch Help Overlay - Mobile only */}
        {isTouchDevice && <TouchHelpOverlay />}

        {/* Specifications Panel - Right Side (desktop) or Bottom (mobile) */}
        <SpecificationsPanel
          metadata={state.modelMetadata}
          locale={locale}
          isVisible={state.showSpecs}
          onToggleVisibility={actions.toggleSpecs}
          variant={isMobile ? 'bottom-sheet' : 'side-panel'}
        />

        {/* Zoom Slider - Right Side, hidden on mobile (use pinch-to-zoom) */}
        {!isMobile && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${state.showSpecs ? 'right-104' : 'right-6'
              }`}
          >
            <div className="glass-panel rounded-2xl shadow-2xl border border-border">
              <ZoomSlider
                value={state.zoomLevel}
                onChange={actions.setZoomLevel}
                min={10}
                max={200}
              />
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <ViewerControlsBar hasLod={!!project.model3d.lod} />
      </main>

      {/* Footer */}
      <footer className="h-8 md:h-10 bg-card border-t border-border flex items-center justify-center px-4 md:px-6 lg:px-10 shrink-0 z-50 text-xs text-muted-foreground">
        <span>© 2026 PLANN3D</span>
      </footer>
    </div>
  )
}

// ============================================
// PROJECT NOT AVAILABLE
// ============================================

function ProjectNotAvailable({ projectId }: { projectId: string }) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <h1 className="text-foreground text-2xl font-bold mb-4">
          {t('viewer3d.modelNotAvailable')}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t('viewer3d.modelNotConfigured')}
        </p>
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
