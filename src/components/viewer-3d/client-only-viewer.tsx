'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import type { ModelViewerProps } from './model-viewer'

const ModelViewer = lazy(() => import('./model-viewer').then((m) => ({ default: m.ModelViewer })))

export function ClientOnlyModelViewer(props: ModelViewerProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Only render on client side after mount
  if (!isMounted) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-gray-400">Carregando...</span>
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-gray-400">Carregando modelo 3D...</span>
          </div>
        </div>
      }
    >
      <ModelViewer {...props} />
    </Suspense>
  )
}
