import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Suspense, lazy, useState } from 'react'

import { getProjectById } from '@/data/projects'

// Lazy load the 3D viewer for better initial page load
const ModelViewer = lazy(() =>
  import('@/components/viewer-3d').then((m) => ({ default: m.ModelViewer })),
)

export const Route = createFileRoute('/projects/$projectId_/viewer')({
  component: ProjectViewerPage,
})

// Demo 3D models for interactive demonstration
const DEMO_MODELS = [
  {
    id: 'helmet',
    name: 'Capacete Sci-Fi',
    description: 'Modelo de exemplo do Khronos Group',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    scale: 2,
    cameraPosition: [0, 0, 3] as [number, number, number],
  },
  {
    id: 'avocado',
    name: 'Abacate',
    description: 'Modelo simples com texturas PBR',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Avocado/glTF-Binary/Avocado.glb',
    scale: 30,
    cameraPosition: [0, 0.5, 1] as [number, number, number],
  },
  {
    id: 'duck',
    name: 'Pato',
    description: 'Clássico modelo de teste 3D',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
    scale: 0.01,
    cameraPosition: [0, 1, 3] as [number, number, number],
  },
]

function ProjectViewerPage() {
  const { projectId } = Route.useParams()
  const project = getProjectById(projectId, 'pt')
  const [showSpecs, setShowSpecs] = useState(true)
  const [selectedModel, setSelectedModel] = useState(DEMO_MODELS[0])

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
          <div className="h-6 w-px bg-[#232f48]" />
          <Link to="/" className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity duration-300">
            <div className="size-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                  fill="currentColor"
                />
                <path
                  clipRule="evenodd"
                  d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight uppercase">
              Plann3d
            </h2>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <button className="relative text-gray-300 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 size-2 bg-primary rounded-full" />
            </button>
            <div className="size-8 rounded-full bg-gradient-to-br from-primary to-blue-400 p-[1px] cursor-pointer">
              <div className="w-full h-full rounded-full bg-[#111722] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </nav>
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
              key={selectedModel.id}
              modelUrl={selectedModel.url}
              height="100%"
              scale={selectedModel.scale}
              cameraPosition={selectedModel.cameraPosition}
              autoRotate={true}
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
              {project?.title || 'Projeto'} <span className="text-gray-500 font-light">| 3D Viewer</span>
            </h1>
            <p className="text-gray-300 text-sm mb-4">
              {selectedModel.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
              <span>Ref: {projectId.toUpperCase()}</span>
              <span className="w-px h-3 bg-gray-700" />
              <span>Modelo: {selectedModel.name}</span>
            </div>
          </div>
        </div>

        {/* Specifications Panel - Right Side */}
        <aside
          className={`absolute top-6 bottom-20 right-6 w-96 glass-panel flex flex-col rounded-xl z-20 shadow-2xl border border-white/10 transition-transform duration-300 ${showSpecs ? 'translate-x-0' : 'translate-x-[calc(100%+1.5rem)]'
            }`}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 rounded-t-xl">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {/* Model Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Modelos Disponíveis
              </h4>
              <div className="flex flex-col gap-2">
                {DEMO_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`px-4 py-2 rounded-lg text-left text-sm font-medium transition-all ${selectedModel.id === model.id
                        ? 'bg-primary text-white'
                        : 'bg-[#1e293b] hover:bg-[#2d3a4f] text-gray-300'
                      }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Info */}
            {project && (
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
            )}

            {/* Estrutura Principal */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white uppercase tracking-wide">
                Estrutura Principal
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <StructureCard
                  icon={<FenceIcon />}
                  title="Fundação"
                  description="Radier em concreto armado H30."
                />
                <StructureCard
                  icon={<ArchitectureIcon />}
                  title="Paredes"
                  description="Alvenaria estrutural em blocos cerâmicos."
                />
                <StructureCard
                  icon={<RoofingIcon />}
                  title="Cobertura"
                  description="Laje impermeabilizada com manta asfáltica."
                />
                <StructureCard
                  icon={<WindowIcon />}
                  title="Esquadrias"
                  description="Alumínio anodizado preto com vidro duplo."
                />
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-[#111722]/50 rounded-b-xl">
            <button className="w-full py-2 bg-primary hover:bg-blue-600 text-white text-xs font-bold rounded uppercase tracking-wider transition-colors">
              Download Detalhes CAD
            </button>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
function FenceIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  )
}

function ArchitectureIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function RoofingIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function WindowIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  )
}

// Helper Components
function StructureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-3 bg-[#1e293b] rounded-lg border border-[#232f48] flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <span className="text-sm font-bold text-white block">{title}</span>
        <p className="text-gray-300 text-xs leading-relaxed">{description}</p>
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
