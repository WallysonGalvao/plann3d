/**
 * IFC Viewer Route
 * Split-view BIM viewer with PDF (2D) and IFC model (3D)
 * Based on design reference: ViewerIFC/code.html and viewer-3d patterns
 */

import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getProjectById } from '@/data/projects'
import {
  IFCViewer,
  IFCViewerHeader,
  IFCViewerFooter,
  IFCPropertiesPanel,
  ClippingPlaneControls,
  IFCInfoCard,
  IFCControlsBar,
  IFCZoomSlider,
} from '@/components/viewer-ifc'
import { PDFViewer } from '@/components/viewer-pdf'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useEffect, useState } from 'react'

// ============================================
// ROUTE DEFINITION
// ============================================

export const Route = createFileRoute('/projects/$projectId_/ifc-viewer')({
  component: IFCViewerPage,
})

// ============================================
// MAIN PAGE COMPONENT
// ============================================

function IFCViewerPage() {
  // Use generic params hook to avoid type issues
  const params = useParams({ strict: false })
  const projectId = (params as { projectId?: string }).projectId ?? ''

  const { i18n } = useTranslation()
  const languageCode = i18n.language ? i18n.language.split('-')[0] : 'pt'
  const locale = languageCode === 'en' ? 'en' : 'pt'
  const project = getProjectById(projectId, locale)

  // Reset store on mount
  const reset = useIFCViewerStore((state) => state.reset)
  useEffect(() => {
    return () => reset()
  }, [reset])

  // If no project found
  if (!project) {
    return <ProjectNotFound projectId={projectId} />
  }

  // If project doesn't have BIM viewer configured
  if (!project.bimViewer) {
    return <NoBIMViewer projectId={projectId} projectTitle={project.title} />
  }

  // Use the project's BIM viewer configuration
  const ifcModelUrl = project.bimViewer.ifcUrl
  const pdfUrl = project.bimViewer.pdfUrl

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden antialiased">
      {/* Header */}
      <IFCViewerHeader
        projectName={project.title}
        projectCode={project.id.toUpperCase()}
        projectId={projectId}
      />

      {/* Main Content */}
      <IFCViewerContent
        project={project}
        projectId={projectId}
        ifcModelUrl={ifcModelUrl}
        pdfUrl={pdfUrl}
      />

      {/* Footer */}
      <IFCViewerFooter />
    </div>
  )
}

// ============================================
// VIEWER CONTENT (Split View)
// ============================================

interface IFCViewerContentProps {
  project: NonNullable<ReturnType<typeof getProjectById>>
  projectId: string
  ifcModelUrl: string
  pdfUrl: string
}

function IFCViewerContent({ project, projectId, ifcModelUrl, pdfUrl }: IFCViewerContentProps) {
  const { isMobile } = useMediaQuery()
  const viewMode = useIFCViewerStore((state) => state.viewMode)
  const showPropertiesPanel = useIFCViewerStore((state) => state.showPropertiesPanel)

  // Simulated loading progress
  const [loadingProgress, setLoadingProgress] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="relative flex-1 flex overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-border z-50 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
          style={{ width: `${Math.min(loadingProgress, 100)}%` }}
        />
      </div>

      {/* Left Panel: 2D PDF Viewer */}
      {(viewMode === '2d' || viewMode === 'split') && (
        <PDFViewer pdfUrl={pdfUrl} className={viewMode === 'split' ? 'w-1/2' : 'w-full'} />
      )}

      {/* Right Panel: 3D IFC Viewer */}
      {(viewMode === '3d' || viewMode === 'split') && (
        <section
          className={`flex flex-col bg-muted relative overflow-hidden ${viewMode === 'split' ? 'w-1/2' : 'w-full'
            }`}
        >
          {/* Project Info Card - Top Left */}
          <IFCInfoCard project={project} projectId={projectId} />

          {/* IFC 3D Viewer */}
          <IFCViewer
            modelUrl={ifcModelUrl}
            className="flex-1"
            onLoad={() => setLoadingProgress(100)}
            onError={(err: Error) => console.error('[IFCViewerPage] Model error:', err)}
          />

          {/* Properties Panel */}
          <IFCPropertiesPanel />

          {/* Clipping Controls */}
          <ClippingPlaneControls />

          {/* Zoom Slider - Right Side (desktop only) */}
          {!isMobile && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${showPropertiesPanel ? 'right-80' : 'right-4'
                }`}
            >
              <div className="glass-panel rounded-2xl shadow-2xl border border-border">
                <IFCZoomSlider />
              </div>
            </div>
          )}

          {/* Bottom Controls */}
          <IFCControlsBar />
        </section>
      )}
    </main>
  )
}

// ============================================
// PROJECT NOT FOUND
// ============================================

function ProjectNotFound({ projectId }: { projectId: string }) {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Projeto não encontrado</h1>
        <p className="text-muted-foreground mb-6">
          O projeto "{projectId}" não existe ou não está configurado para o visualizador IFC.
        </p>
        <Link
          to="/projects/$projectId"
          params={{ projectId }}
          className="text-primary hover:underline"
        >
          ← Voltar para o projeto
        </Link>
      </div>
    </div>
  )
}

// ============================================
// NO BIM VIEWER CONFIGURED
// ============================================

function NoBIMViewer({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center max-w-md">
        <span className="material-symbols-outlined text-[64px] text-muted-foreground/50 mb-4 block">view_in_ar</span>
        <h1 className="text-2xl font-bold mb-4 text-foreground">BIM Viewer não disponível</h1>
        <p className="text-muted-foreground mb-6">
          O projeto "{projectTitle}" não possui arquivos IFC/PDF configurados para visualização BIM.
        </p>
        <Link
          to="/projects/$projectId"
          params={{ projectId }}
          className="text-primary hover:underline"
        >
          ← Voltar para o projeto
        </Link>
      </div>
    </div>
  )
}
