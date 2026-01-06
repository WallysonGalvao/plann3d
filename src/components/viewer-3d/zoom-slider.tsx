import { useState, useRef, useEffect } from 'react'
import { ZoomIn, ZoomOut } from 'lucide-react'

interface ZoomSliderProps {
  /** Current zoom value (0-100) */
  value: number
  /** Callback when zoom value changes */
  onChange: (value: number) => void
  /** Minimum zoom value */
  min?: number
  /** Maximum zoom value */
  max?: number
}

/**
 * Vertical Zoom Slider
 *
 * Allows users to control camera zoom by dragging a slider up/down
 */
export function ZoomSlider({ value, onChange, min = 0, max = 100 }: ZoomSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Calculate percentage from pixel position
  const getValueFromPosition = (clientY: number): number => {
    if (!sliderRef.current) return value

    const rect = sliderRef.current.getBoundingClientRect()
    const trackHeight = rect.height
    const offsetY = clientY - rect.top

    // Invert: top = max, bottom = min
    const percentage = 1 - (offsetY / trackHeight)
    const clampedPercentage = Math.max(0, Math.min(1, percentage))

    return min + clampedPercentage * (max - min)
  }

  // Handle mouse/touch drag
  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return
    const newValue = getValueFromPosition(clientY)
    onChange(Math.round(newValue))
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Mouse events
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

  // Touch events
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

  // Calculate thumb position (0-100%)
  const thumbPosition = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Zoom In Icon */}
      <button
        onClick={() => onChange(Math.min(max, value + 10))}
        className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/50 transition-all"
        aria-label="Aumentar zoom"
      >
        <ZoomIn size={16} className="text-foreground" />
      </button>

      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="relative h-48 w-2 bg-muted/30 backdrop-blur-sm border border-border rounded-full cursor-pointer"
        onMouseDown={(e) => {
          handleDragStart()
          const newValue = getValueFromPosition(e.clientY)
          onChange(Math.round(newValue))
        }}
        onTouchStart={(e) => {
          handleDragStart()
          if (e.touches.length > 0) {
            const newValue = getValueFromPosition(e.touches[0].clientY)
            onChange(Math.round(newValue))
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
          className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-primary border-2 border-background rounded-full shadow-lg transition-all duration-150 ${
            isDragging ? 'scale-125' : 'scale-100'
          }`}
          style={{ bottom: `calc(${thumbPosition}% - 10px)` }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full" />
          </div>
        </div>

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => (
          <div
            key={tick}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-px bg-border"
            style={{ bottom: `${tick}%` }}
          />
        ))}
      </div>

      {/* Zoom Out Icon */}
      <button
        onClick={() => onChange(Math.max(min, value - 10))}
        className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/50 transition-all"
        aria-label="Diminuir zoom"
      >
        <ZoomOut size={16} className="text-foreground" />
      </button>

      {/* Zoom Value Display */}
      <div className="w-16 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border rounded text-xs font-mono text-foreground text-center">
        {Math.round(value)}%
      </div>
    </div>
  )
}
