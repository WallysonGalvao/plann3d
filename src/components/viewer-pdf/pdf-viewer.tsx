'use client'

/**
 * PDF Viewer Component
 * Technical drawing viewer with zoom, pan, and navigation
 * Based on reference design (ViewerIFC/code.html)
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'

// ============================================
// TYPES
// ============================================

interface PDFViewerProps {
  pdfUrl?: string
  className?: string
}

// ============================================
// TOOLBAR BUTTON
// ============================================

interface ToolbarButtonProps {
  icon: string
  title: string
  isActive?: boolean
  onClick: () => void
}

function ToolbarButton({ icon, title, isActive, onClick }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-sm transition-colors ${isActive
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
// MAIN COMPONENT
// ============================================

export function PDFViewer({ pdfUrl, className = '' }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [isPanning, setIsPanning] = useState(false)

  const setTotalPdfPages = useIFCViewerStore((state) => state.setTotalPdfPages)
  // These will be used when implementing real PDF loading
  // const currentPage = useIFCViewerStore((state) => state.currentPdfPage)
  // const totalPages = useIFCViewerStore((state) => state.totalPdfPages)
  // const setPdfPage = useIFCViewerStore((state) => state.setPdfPage)

  // Initialize with demo pages
  useEffect(() => {
    setTotalPdfPages(1)
  }, [setTotalPdfPages])

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }, [])

  const handleResetView = useCallback(() => {
    setZoom(1)
  }, [])

  return (
    <section className={`flex flex-col border-r border-gray-200 bg-white relative group ${className}`}>
      {/* Toolbar Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-white border border-gray-200 shadow-lg rounded-sm p-1.5">
        <ToolbarButton
          icon="add"
          title="Zoom In"
          onClick={handleZoomIn}
        />
        <ToolbarButton
          icon="remove"
          title="Zoom Out"
          onClick={handleZoomOut}
        />
        <ToolbarButton
          icon="pan_tool"
          title="Pan"
          isActive={isPanning}
          onClick={() => setIsPanning(!isPanning)}
        />
        <div className="h-px w-full bg-gray-200 my-1" />
        <ToolbarButton
          icon="center_focus_strong"
          title="Reset View"
          onClick={handleResetView}
        />
      </div>

      {/* Sheet Info */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur border border-gray-200 shadow-sm rounded-sm px-3 py-2 text-xs font-mono text-gray-500">
        S-101 • PLANTA BAIXA NÍVEL 1
      </div>

      {/* 2D Canvas / Drawing Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative flex items-center justify-center p-10"
        style={{
          cursor: isPanning ? 'grab' : 'default',
          backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        {/* Drawing Container */}
        <div
          className="relative bg-white shadow-2xl border border-gray-300 p-8 select-none transition-transform duration-200"
          style={{
            width: 600 * zoom,
            height: 800 * zoom,
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Drawing Header */}
          <div className="absolute bottom-4 right-4 border-2 border-black p-2 w-48">
            <div className="text-[8px] uppercase font-bold tracking-widest border-b border-black pb-1 mb-1">
              PLANN3D ENGINEERING
            </div>
            <div className="text-[10px] font-bold">DETALHE ESTRUTURAL</div>
            <div className="text-[8px] text-gray-500">ESCADA E-04</div>
          </div>

          {/* SVG Blueprint Placeholder */}
          <svg
            className="w-full h-full stroke-black stroke-[1.5px] fill-none"
            viewBox="0 0 400 600"
          >
            {/* Grid lines */}
            <line
              x1="20" y1="20" x2="20" y2="580"
              className="stroke-gray-300 stroke-1"
              strokeDasharray="5,5"
            />
            <line
              x1="380" y1="20" x2="380" y2="580"
              className="stroke-gray-300 stroke-1"
              strokeDasharray="5,5"
            />

            {/* Staircase Plan View */}
            <rect x="100" y="100" width="200" height="300" className="stroke-2" />

            {/* Steps */}
            <line x1="100" y1="130" x2="300" y2="130" />
            <line x1="100" y1="160" x2="300" y2="160" />
            <line x1="100" y1="190" x2="300" y2="190" />
            <line x1="100" y1="220" x2="300" y2="220" />

            {/* Landing */}
            <rect
              x="100" y="250"
              width="200" height="60"
              fill="url(#hatch)"
              opacity="0.1"
            />
            <defs>
              <pattern
                id="hatch"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="10" stroke="#000" strokeWidth="1" />
              </pattern>
            </defs>

            <line x1="100" y1="310" x2="300" y2="310" />
            <line x1="100" y1="340" x2="300" y2="340" />
            <line x1="100" y1="370" x2="300" y2="370" />

            {/* Section A-A Mark */}
            <g className="cursor-pointer hover:stroke-primary">
              <line
                x1="50" y1="250" x2="350" y2="250"
                strokeDasharray="10,5"
                className="stroke-black hover:stroke-primary transition-colors"
              />
              <circle cx="50" cy="250" r="8" className="fill-white stroke-2" />
              <text
                x="50" y="253"
                textAnchor="middle"
                fontSize="8"
                className="fill-black stroke-none"
              >
                A
              </text>
              <circle cx="350" cy="250" r="8" className="fill-white stroke-2" />
              <text
                x="350" y="253"
                textAnchor="middle"
                fontSize="8"
                className="fill-black stroke-none"
              >
                A
              </text>
            </g>

            {/* Detail Callout */}
            <g className="cursor-pointer">
              <circle
                cx="300" cy="130"
                r="15"
                className="stroke-primary stroke-2 fill-primary/5 animate-pulse"
                strokeDasharray="2,2"
              />
              <line x1="312" y1="120" x2="340" y2="100" className="stroke-primary" />
              <rect x="340" y="90" width="40" height="20" className="fill-white stroke-primary" />
              <text
                x="360" y="103"
                textAnchor="middle"
                fontSize="8"
                className="fill-primary stroke-none font-bold"
              >
                DET. 1
              </text>
            </g>

            {/* Dimensions */}
            <line
              x1="80" y1="100" x2="80" y2="400"
              className="stroke-gray-500 stroke-[0.5px]"
            />
            <line
              x1="75" y1="100" x2="85" y2="100"
              className="stroke-gray-500 stroke-[0.5px]"
            />
            <line
              x1="75" y1="400" x2="85" y2="400"
              className="stroke-gray-500 stroke-[0.5px]"
            />
            <text
              x="70" y="250"
              textAnchor="middle"
              fontSize="10"
              transform="rotate(-90, 70, 250)"
              className="fill-gray-600 stroke-none"
            >
              4200
            </text>
          </svg>
        </div>
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
