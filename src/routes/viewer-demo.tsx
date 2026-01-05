import { createFileRoute } from '@tanstack/react-router'
import { Suspense, lazy, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PageLayout } from '@/components/page-layout'

// Lazy load the 3D viewer for better initial page load
const ModelViewer = lazy(() =>
  import('@/components/viewer-3d').then((m) => ({ default: m.ModelViewer })),
)

export const Route = createFileRoute('/viewer-demo')({
  component: ViewerDemoPage,
})

// Public GLB models for demonstration (from Khronos glTF Sample Models)
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

function ViewerDemoPage() {
  const { t } = useTranslation()
  const [selectedModel, setSelectedModel] = useState(DEMO_MODELS[0])

  return (
    <PageLayout>
      <div className="min-h-screen py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-primary mb-4">
              Demo
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6">
              Viewer 3D <span className="text-primary">Interativo</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore modelos 3D diretamente no navegador. Arraste para rotacionar,
              use o scroll para zoom e teclas para navegar.
            </p>
          </div>

          {/* Model Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {DEMO_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${selectedModel.id === model.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary/50 border-border hover:border-primary/50'
                  }`}
              >
                {model.name}
              </button>
            ))}
          </div>

          {/* Model Info */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">{selectedModel.name}</h2>
            <p className="text-muted-foreground">{selectedModel.description}</p>
          </div>

          {/* 3D Viewer */}
          <div className="max-w-4xl mx-auto">
            <Suspense
              fallback={
                <div className="h-[500px] rounded-2xl bg-secondary/50 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-muted-foreground">Carregando viewer 3D...</span>
                  </div>
                </div>
              }
            >
              <ModelViewer
                key={selectedModel.id}
                modelUrl={selectedModel.url}
                height="500px"
                scale={selectedModel.scale}
                cameraPosition={selectedModel.cameraPosition}
                autoRotate={true}
              />
            </Suspense>
          </div>

          {/* Instructions */}
          <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-secondary/30 border border-border">
              <div className="text-3xl mb-3">🖱️</div>
              <h3 className="font-semibold mb-2">Rotacionar</h3>
              <p className="text-sm text-muted-foreground">
                Clique e arraste para girar o modelo
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-secondary/30 border border-border">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold mb-2">Zoom</h3>
              <p className="text-sm text-muted-foreground">
                Use o scroll do mouse ou pinça no touch
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-secondary/30 border border-border">
              <div className="text-3xl mb-3">⛶</div>
              <h3 className="font-semibold mb-2">Tela Cheia</h3>
              <p className="text-sm text-muted-foreground">
                Clique no ícone para expandir
              </p>
            </div>
          </div>

          {/* Technical Info */}
          <div className="max-w-2xl mx-auto mt-12 p-6 rounded-2xl bg-secondary/20 border border-border">
            <h3 className="font-semibold mb-4">🔧 Informações Técnicas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Formato:</strong> glTF 2.0 / GLB (Binary)
              </li>
              <li>
                <strong className="text-foreground">Engine:</strong> Three.js + React Three Fiber
              </li>
              <li>
                <strong className="text-foreground">Softwares compatíveis:</strong> SketchUp, Blender, Twinmotion, Tekla
              </li>
              <li>
                <strong className="text-foreground">Renderização:</strong> WebGL com ambiente HDR
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
