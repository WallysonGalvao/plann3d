/**
 * IFC Viewer Route
 * Split-view BIM viewer with PDF (2D) and IFC model (3D)
 * Based on design reference: ViewerIFC/code.html and ViewerIFC/screen.png
 */

import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { getProjectById } from '@/data/projects'
import {
  IFCViewer,
  IFCViewerHeader,
  IFCViewerFooter,
  IFCPropertiesPanel,
  ClippingPlaneControls,
} from '@/components/viewer-ifc'
import { PDFViewer } from '@/components/viewer-pdf'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'
import { useEffect } from 'react'

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

  const project = getProjectById(projectId, 'pt')

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
    <div className="flex flex-col h-screen bg-white overflow-hidden antialiased">
      {/* Header */}
      <IFCViewerHeader
        projectName={project.title}
        projectCode={project.id.toUpperCase()}
        projectId={projectId}
      />

      {/* Main Content */}
      <IFCViewerContent ifcModelUrl={ifcModelUrl} pdfUrl={pdfUrl} />

      {/* Footer */}
      <IFCViewerFooter />
    </div>
  )
}

// ============================================
// VIEWER CONTENT (Split View)
// ============================================

interface IFCViewerContentProps {
  ifcModelUrl: string
  pdfUrl: string
}

function IFCViewerContent({ ifcModelUrl, pdfUrl }: IFCViewerContentProps) {
  const viewMode = useIFCViewerStore((state) => state.viewMode)

  return (
    <main className="flex-1 flex overflow-hidden relative">
      {/* Left Panel: 2D PDF Viewer */}
      {(viewMode === '2d' || viewMode === 'split') && (
        <PDFViewer pdfUrl={pdfUrl} className={viewMode === 'split' ? 'w-1/2' : 'w-full'} />
      )}

      {/* Right Panel: 3D IFC Viewer */}
      {(viewMode === '3d' || viewMode === 'split') && (
        <section
          className={`flex flex-col bg-[#f0f2f5] relative overflow-hidden ${viewMode === 'split' ? 'w-1/2' : 'w-full'
            }`}
        >
          <IFCViewer
            modelUrl={ifcModelUrl}
            className="flex-1"
            onLoad={() => console.log('[IFCViewerPage] Model loaded')}
            onError={(err: Error) => console.error('[IFCViewerPage] Model error:', err)}
          />

          {/* Properties Panel */}
          <IFCPropertiesPanel />

          {/* 3D Controls */}
          <ClippingPlaneControls />
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
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Projeto não encontrado</h1>
        <p className="text-gray-600 mb-6">
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
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center max-w-md">
        <span className="material-symbols-outlined text-[64px] text-gray-300 mb-4 block">view_in_ar</span>
        <h1 className="text-2xl font-bold mb-4 text-gray-900">BIM Viewer não disponível</h1>
        <p className="text-gray-600 mb-6">
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
