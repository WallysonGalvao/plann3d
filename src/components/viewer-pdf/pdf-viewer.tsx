'use client'

/**
 * PDF Viewer Component
 * Real PDF viewer with zoom, pan, and navigation using PDF.js
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'
import * as pdfjsLib from 'pdfjs-dist'
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

// ============================================
// TYPES
// ============================================

interface PDFViewerProps {
  pdfUrl?: string
  className?: string
}

interface ToolbarButtonProps {
  icon: string
  title: string
  isActive?: boolean
  disabled?: boolean
  onClick: () => void
}

// ============================================
// TOOLBAR BUTTON
// ============================================

function ToolbarButton({ icon, title, isActive, disabled, onClick }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-sm transition-colors ${disabled
        ? 'opacity-50 cursor-not-allowed text-gray-400'
        : isActive
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-gray-100 text-gray-600'
        }`}
      title={title}
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </button>
  )
}

// ============================================
// LOADING SPINNER
// ============================================

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
      <span className="text-gray-500 text-sm">Carregando PDF...</span>
    </div>
  )
}

// ============================================
// ERROR STATE
// ============================================

function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
      <span className="material-symbols-outlined text-[48px] text-red-400">error</span>
      <div>
        <p className="text-gray-700 font-medium">Erro ao carregar PDF</p>
        <p className="text-gray-500 text-sm mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function PDFViewer({ pdfUrl, className = '' }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // PDF State
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // View State
  const [zoom, setZoom] = useState(1)
  const [isPanning, setIsPanning] = useState(false)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Store integration
  const setTotalPdfPages = useIFCViewerStore((state) => state.setTotalPdfPages)
  const setPdfPage = useIFCViewerStore((state) => state.setPdfPage)

  // ============================================
  // LOAD PDF
  // ============================================

  const loadPdf = useCallback(async () => {
    if (!pdfUrl) {
      setError('Nenhum URL de PDF fornecido')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl)
      const pdf = await loadingTask.promise

      setPdfDoc(pdf)
      setTotalPages(pdf.numPages)
      setTotalPdfPages(pdf.numPages)
      setCurrentPage(1)
    } catch (err) {
      console.error('[PDFViewer] Error loading PDF:', err)
      setError(err instanceof Error ? err.message : 'Falha ao carregar o PDF')
    } finally {
      setIsLoading(false)
    }
  }, [pdfUrl, setTotalPdfPages])

  // Load PDF on mount or URL change
  useEffect(() => {
    loadPdf()

    return () => {
      pdfDoc?.destroy()
    }
  }, [pdfUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  // ============================================
  // RENDER PAGE
  // ============================================

  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return

    try {
      const page: PDFPageProxy = await pdfDoc.getPage(pageNum)
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      if (!context) return

      // Calculate scale for high DPI displays
      const devicePixelRatio = window.devicePixelRatio || 1
      const baseScale = 1.5 // Base scale for quality
      const scale = baseScale * zoom * devicePixelRatio

      const viewport = page.getViewport({ scale })

      // Set canvas dimensions
      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.style.width = `${viewport.width / devicePixelRatio}px`
      canvas.style.height = `${viewport.height / devicePixelRatio}px`

      // Render page
      await page.render({
        canvasContext: context,
        viewport: viewport,
        canvas: canvas,
      }).promise

      // Update store
      setPdfPage(pageNum)
    } catch (err) {
      console.error('[PDFViewer] Error rendering page:', err)
    }
  }, [pdfDoc, zoom, setPdfPage])

  // Render current page when it changes or zoom changes
  useEffect(() => {
    if (pdfDoc && currentPage > 0) {
      renderPage(currentPage)
    }
  }, [pdfDoc, currentPage, zoom, renderPage])

  // ============================================
  // NAVIGATION
  // ============================================

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  // ============================================
  // ZOOM CONTROLS
  // ============================================

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }, [])

  const handleResetView = useCallback(() => {
    setZoom(1)
    setPanOffset({ x: 0, y: 0 })
  }, [])

  // ============================================
  // PAN CONTROLS
  // ============================================

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
  }, [isPanning, panOffset])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // ============================================
  // RENDER
  // ============================================

  return (
    <section className={`flex flex-col border-r border-gray-200 bg-white relative group ${className}`}>
      {/* Toolbar Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-white border border-gray-200 shadow-lg rounded-sm p-1.5">
        <ToolbarButton
          icon="add"
          title="Zoom In"
          onClick={handleZoomIn}
          disabled={isLoading || !!error}
        />
        <ToolbarButton
          icon="remove"
          title="Zoom Out"
          onClick={handleZoomOut}
          disabled={isLoading || !!error}
        />
        <ToolbarButton
          icon="pan_tool"
          title="Pan"
          isActive={isPanning}
          disabled={isLoading || !!error}
          onClick={() => setIsPanning(!isPanning)}
        />
        <div className="h-px w-full bg-gray-200 my-1" />
        <ToolbarButton
          icon="center_focus_strong"
          title="Reset View"
          onClick={handleResetView}
          disabled={isLoading || !!error}
        />
      </div>

      {/* Page Navigation */}
      {totalPages > 1 && !isLoading && !error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-sm px-2 py-1">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            title="Página anterior"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <span className="text-sm font-mono text-gray-600 min-w-[60px] text-center">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            title="Próxima página"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      )}

      {/* Sheet Info */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur border border-gray-200 shadow-sm rounded-sm px-3 py-2 text-xs font-mono text-gray-500">
        {totalPages > 0 ? `Página ${currentPage} de ${totalPages}` : 'Carregando...'}
      </div>

      {/* PDF Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative flex items-center justify-center"
        style={{
          cursor: isPanning ? (isDragging ? 'grabbing' : 'grab') : 'default',
          backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Loading State */}
        {isLoading && <LoadingSpinner />}

        {/* Error State */}
        {error && !isLoading && <ErrorState message={error} onRetry={loadPdf} />}

        {/* PDF Canvas */}
        {!isLoading && !error && pdfDoc && (
          <div
            className="relative bg-white shadow-2xl"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            <canvas ref={canvasRef} className="block" />
          </div>
        )}

        {/* No PDF placeholder */}
        {!isLoading && !error && !pdfDoc && !pdfUrl && (
          <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
            <span className="material-symbols-outlined text-[48px] text-gray-300">picture_as_pdf</span>
            <p className="text-gray-500">Nenhum PDF selecionado</p>
          </div>
        )}
      </div>

      {/* Sync Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <button className="bg-[#111718] text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm font-bold hover:bg-black transition-transform hover:-translate-y-1">
          <span className="material-symbols-outlined text-[18px]">sync_alt</span>
          Sincronizar Vistas
        </button>
      </div>
    </section>
  )
}
