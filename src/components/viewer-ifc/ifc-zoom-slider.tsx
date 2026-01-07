'use client'

/**
 * IFC Zoom Slider
 * Vertical zoom control - re-exports from viewer-3d with IFC context integration
 */

import { ZoomIn, ZoomOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'

interface IFCZoomSliderProps {
  min?: number
  max?: number
}

export function IFCZoomSlider({ min = 10, max = 200 }: IFCZoomSliderProps) {
  const zoomLevel = useIFCViewerStore((state) => state.zoomLevel)
  const setZoomLevel = useIFCViewerStore((state) => state.setZoomLevel)

  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const getValueFromPosition = (clientY: number): number => {
    if (!sliderRef.current) return zoomLevel

    const rect = sliderRef.current.getBoundingClientRect()
    const trackHeight = rect.height
    const offsetY = clientY - rect.top

    const percentage = 1 - (offsetY / trackHeight)
    const clampedPercentage = Math.max(0, Math.min(1, percentage))

    return min + clampedPercentage * (max - min)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return
    const newValue = getValueFromPosition(clientY)
    setZoomLevel(Math.round(newValue))
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY)
    }

    const handleMouseUp = () => {
      handleDragEnd()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  useEffect(() => {
    if (!isDragging) return

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDragMove(e.touches[0].clientY)
      }
    }

    const handleTouchEnd = () => {
      handleDragEnd()
    }

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  const thumbPosition = ((zoomLevel - min) / (max - min)) * 100

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Zoom In */}
      <button
        onClick={() => setZoomLevel(Math.min(max, zoomLevel + 10))}
        className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/50 transition-all"
        aria-label="Aumentar zoom"
      >
        <ZoomIn size={16} className="text-foreground" />
      </button>

      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="relative h-40 w-2 bg-muted/30 backdrop-blur-sm border border-border rounded-full cursor-pointer"
        onMouseDown={(e) => {
          handleDragStart()
          const newValue = getValueFromPosition(e.clientY)
          setZoomLevel(Math.round(newValue))
        }}
        onTouchStart={(e) => {
          handleDragStart()
          if (e.touches.length > 0) {
            const newValue = getValueFromPosition(e.touches[0].clientY)
            setZoomLevel(Math.round(newValue))
          }
        }}
      >
        {/* Track Fill */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-primary/30 rounded-full transition-all duration-150"
          style={{ height: `${thumbPosition}%` }}
        />

        {/* Thumb */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-2 border-background rounded-full shadow-lg transition-all duration-150 ${isDragging ? 'scale-125' : 'scale-100'
            }`}
          style={{ bottom: `calc(${thumbPosition}% - 8px)` }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-background rounded-full" />
          </div>
        </div>

        {/* Tick marks */}
        {[0, 50, 100].map((tick) => (
          <div
            key={tick}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-px bg-border"
            style={{ bottom: `${tick}%` }}
          />
        ))}
      </div>

      {/* Zoom Out */}
      <button
        onClick={() => setZoomLevel(Math.max(min, zoomLevel - 10))}
        className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/50 transition-all"
        aria-label="Diminuir zoom"
      >
        <ZoomOut size={16} className="text-foreground" />
      </button>

      {/* Zoom Value */}
      <div className="w-14 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border rounded text-xs font-mono text-foreground text-center">
        {Math.round(zoomLevel)}%
      </div>
    </div>
  )
}
