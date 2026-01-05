import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Suspense, lazy, useState } from 'react'

import { getProjectById } from '@/data/projects'
import logo from '@/assets/logo.svg'

// Lazy load the 3D viewer for better initial page load
const ModelViewer = lazy(() =>
  import('@/components/viewer-3d').then((m) => ({ default: m.ModelViewer })),
)

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
}

export const Route = createFileRoute('/projects/$projectId_/viewer')({
  component: ProjectViewerPage,
})

function ProjectViewerPage() {
  const { projectId } = Route.useParams()
  const [showSpecs, setShowSpecs] = useState(true)
  const [modelMetadata, setModelMetadata] = useState<ModelMetadata | null>(null)
  const project = getProjectById(projectId, 'pt')

  // If project doesn't have a 3D model configured, show error
  if (!project?.model3d) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#101622]">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-4">Modelo 3D não disponível</h1>
          <p className="text-gray-400 mb-6">Este projeto não possui um modelo 3D configurado.</p>
          <Link
            to="/projects/$projectId"
            params={{ projectId }}
            className="text-primary hover:underline"
          >
            Voltar ao projeto
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-[#101622] overflow-hidden antialiased">
      {/* Header */}
      <header className="h-16 border-b border-[#232f48] bg-[#111722] flex items-center justify-between px-6 lg:px-10 shrink-0 z-50 relative shadow-lg">
        <div className="flex items-center gap-4">
          <Link
            to="/projects/$projectId"
            params={{ projectId }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Voltar ao Projeto</span>
          </Link>
        </div>
        <Link
          to="/"
          className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity duration-300"
        >
          <img src={logo} alt="Plann3d Logo" className="h-8 w-auto" />
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight uppercase">
            Plann3d
          </h2>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 w-full h-full bg-[#050505] overflow-hidden">
        {/* 3D Model Viewer */}
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center bg-[#050505]">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span className="text-gray-400">Carregando viewer 3D...</span>
                </div>
              </div>
            }
          >
            <ModelViewer
              modelUrl={project.model3d.src}
              poster={project.model3d.thumbnail}
              height="100%"
              scale={project.model3d.scale}
              cameraPosition={project.model3d.cameraPosition}
              autoRotate={project.model3d.autoRotate}
              onMetadataExtracted={setModelMetadata}
            />
          </Suspense>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-[#232f48] z-50">
          <div className="h-full bg-primary w-[85%] shadow-[0_0_10px_#135bec]" />
        </div>

        {/* Project Info Card - Top Left */}
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 max-w-lg animate-fade-in">
          <div className="glass-panel p-6 rounded-xl shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex size-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">
                VISUALIZAÇÃO 3D
              </span>
            </div>
            <h1 className="text-white text-4xl font-bold leading-tight tracking-tight mb-2">
              {project.title} <span className="text-gray-500 font-light">| 3D Viewer</span>
            </h1>
            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
              <span>Ref: {projectId.toUpperCase()}</span>
              <span className="w-px h-3 bg-gray-700" />
              <span>Localização: {project.location}</span>
            </div>
          </div>
        </div>

        {/* Specifications Panel - Right Side */}
        <aside
          className={`absolute top-6 bottom-20 right-6 w-96 glass-panel flex flex-col rounded-xl z-20 shadow-2xl border border-white/10 transition-transform duration-300 ${
            showSpecs ? 'translate-x-0' : 'translate-x-[calc(100%+1.5rem)]'
          }`}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 rounded-t-xl">
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
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Especificações Chave
              </h3>
            </div>
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar painel de especificações"
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

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {/* Project Info */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white uppercase tracking-wide">
                Informações do Projeto
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 p-3 bg-[#1e293b] rounded-lg border border-[#232f48]">
                  <span className="text-xs text-gray-400 uppercase font-mono tracking-wider">
                    Projeto
                  </span>
                  <span className="text-lg font-bold text-white">{project.title}</span>
                </div>
                {project.specs && (
                  <div className="flex flex-col gap-2 p-3 bg-[#1e293b] rounded-lg border border-[#232f48]">
                    <span className="text-xs text-gray-400 uppercase font-mono tracking-wider">
                      Localização
                    </span>
                    <span className="text-lg font-bold text-white">{project.specs.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Model Specifications - Dynamic from 3D Model */}
            {modelMetadata && (
              <>
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white uppercase tracking-wide">
                    Especificações do Modelo 3D
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <SpecCard
                      icon={<CubeIcon />}
                      title="Objetos"
                      value={modelMetadata.objects.toLocaleString('pt-BR')}
                      description="Meshes no modelo"
                    />
                    <SpecCard
                      icon={<TriangleIcon />}
                      title="Triângulos"
                      value={modelMetadata.triangles.toLocaleString('pt-BR')}
                      description="Polígonos renderizados"
                    />
                    <SpecCard
                      icon={<GridIcon />}
                      title="Vértices"
                      value={modelMetadata.vertices.toLocaleString('pt-BR')}
                      description="Pontos 3D"
                    />
                    <SpecCard
                      icon={<PaletteIcon />}
                      title="Materiais"
                      value={modelMetadata.materials.toString()}
                      description="Texturas e shaders"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white uppercase tracking-wide">
                    Dimensões do Modelo
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <DimensionCard
                      label="Largura"
                      value={modelMetadata.dimensions.width}
                      unit="m"
                    />
                    <DimensionCard
                      label="Altura"
                      value={modelMetadata.dimensions.height}
                      unit="m"
                    />
                    <DimensionCard
                      label="Profundidade"
                      value={modelMetadata.dimensions.depth}
                      unit="m"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Loading state while metadata is being extracted */}
            {!modelMetadata && (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-sm text-gray-400">Analisando modelo 3D...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Bottom Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-75 hover:opacity-100 transition-opacity duration-300">
          <div className="glass-panel p-2 rounded-full flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <ControlButton
              icon="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              label="Resetar Câmera"
            />
            <ControlButton
              icon="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              label="Tela Cheia"
            />
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="size-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all relative group"
              aria-label="Alternar especificações"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-black text-xs rounded whitespace-nowrap">
                Especificações
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 bg-[#111722] border-t border-[#232f48] flex items-center justify-between px-6 lg:px-10 shrink-0 z-50 text-xs text-gray-500 font-mono">
        <div className="flex items-center gap-4">
          <span>© 2024 Plann3d Inc.</span>
          <span className="hidden md:inline-block w-px h-3 bg-gray-700" />
          <span className="hidden md:inline-block">v4.2.0 (Build 9928)</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="size-2 bg-green-500 rounded-full" />
            <span className="text-gray-400">Servidor Online</span>
          </div>
        </div>
      </footer>
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

// Helper Components
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
    <div className="p-3 bg-[#1e293b] rounded-lg border border-[#232f48] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="shrink-0">{icon}</div>
        <span className="text-xs text-gray-400 uppercase font-mono tracking-wider">{title}</span>
      </div>
      <span className="text-2xl font-bold text-white">{value}</span>
      <p className="text-gray-400 text-xs">{description}</p>
    </div>
  )
}

function DimensionCard({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="p-3 bg-[#1e293b] rounded-lg border border-[#232f48] flex flex-col gap-1">
      <span className="text-xs text-gray-400 uppercase font-mono tracking-wider">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-white">{value.toFixed(2)}</span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  )
}

function ControlButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      className="size-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all relative group"
      aria-label={label}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-black text-xs rounded whitespace-nowrap">
        {label}
      </span>
    </button>
  )
}
